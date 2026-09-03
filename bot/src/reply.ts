import Anthropic from '@anthropic-ai/sdk';
import type { LanguageCode } from '../../src/i18n';
import { knowledgeFor, detectLanguage } from './knowledge';

/**
 * The reply engine.
 *
 * Channel-independent on purpose: it takes a conversation and returns either a
 * reply to send or a request to hand the customer to a person. WhatsApp is one
 * caller; anything else (a web widget, a test CLI) can call it the same way.
 *
 * The commercial boundary is enforced with a tool rather than an instruction.
 * "Never quote a price" in a system prompt is a request; a model that has no
 * way to answer a pricing question except by calling `escalate_to_trade_desk`
 * has a much harder time inventing one. The tool is also what produces the
 * structured inquiry the trade desk actually needs.
 */

const MODEL = 'claude-opus-5';

export interface ConversationTurn {
  role: 'user' | 'assistant';
  text: string;
}

export type ReplyResult =
  | { kind: 'reply'; language: LanguageCode; text: string }
  | {
      kind: 'escalate';
      language: LanguageCode;
      /** What to send the customer while a person picks it up. */
      text: string;
      /** Structured summary for the trade desk. */
      inquiry: {
        reason: string;
        commodity?: string;
        quantity?: string;
        destination?: string;
        incoterm?: string;
        contact?: string;
        summary: string;
      };
    };

/**
 * What the assistant is allowed to do, and — more to the point — what it is
 * not. Every deal here is negotiated per shipment, so anything that sounds
 * like a commitment has to come from a person.
 */
const behaviour = `
You answer WhatsApp messages for an international commodity trading company.
Everything you know about the company is in the reference below. It is drawn
from the company's own website.

WHAT YOU DO
- Explain what the company trades, which markets it works with, and how a
  shipment is handled from purchase to delivery.
- Explain trade concepts from the reference: Incoterms rules, bitumen
  penetration grades, how to specify barley, which documents travel with a
  shipment.
- Ask the questions needed to understand an enquiry.

WHAT YOU NEVER DO
- Never state a price, a discount, or any commercial term.
- Never confirm that something is in stock or available.
- Never promise a delivery date, transit time, or capacity.
- Never state the customs or import requirements of a specific country for a
  specific shipment. Requirements vary by destination and change; the
  reference guides describe what each document is for, not what any given
  border will demand today.
- Never invent a specification, certificate, or figure that is not in the
  reference.

When a message needs any of those, call escalate_to_trade_desk instead of
answering. Collect whatever details the customer has already given first —
commodity, quantity, destination, delivery terms — but do not interrogate
them; one round of questions is enough before escalating.

STYLE
- Reply in the customer's language. If they switch, switch with them.
- Short messages. This is WhatsApp, not a brochure. Two or three sentences
  usually. No markdown headings, no bullet lists unless genuinely listing.
- Never claim to be a person. If asked, say you are the company's assistant
  and can bring in a colleague.
`.trim();

const escalateTool: Anthropic.Tool = {
  name: 'escalate_to_trade_desk',
  description:
    'Hand the conversation to a human colleague. Call this for anything ' +
    'commercial — price, availability, lead time, capacity, a specific ' +
    "country's customs requirements, contract terms — or when the customer " +
    'asks for a person. Collect the enquiry details you already have.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      reason: {
        type: 'string',
        enum: ['pricing', 'availability', 'lead_time', 'customs', 'contract', 'human_requested', 'other'],
        description: 'Why this needs a person.',
      },
      commodity: { type: 'string', description: 'What they want to buy or sell, if stated.' },
      quantity: { type: 'string', description: 'Volume or tonnage, if stated.' },
      destination: { type: 'string', description: 'Destination country or port, if stated.' },
      incoterm: { type: 'string', description: 'Delivery term they asked for, if stated.' },
      contact: { type: 'string', description: 'Any name or company they gave.' },
      summary: {
        type: 'string',
        description: 'One or two sentences a colleague can act on without reading the thread.',
      },
    },
    required: ['reason', 'summary'],
  },
  strict: true,
};

/** Sent while a colleague picks the conversation up. */
const handoffMessage: Record<LanguageCode, string> = {
  en: 'Let me put you in touch with our trade desk — a colleague will follow up here shortly with the details.',
  fa: 'شما را به تیم بازرگانی وصل می‌کنم؛ همکار ما به‌زودی همین‌جا جزئیات را پیگیری می‌کند.',
  ar: 'سأحوّلك إلى فريق التجارة لدينا؛ سيتابع أحد الزملاء التفاصيل معك هنا قريباً.',
  ru: 'Передаю вас нашему торговому отделу — коллега свяжется здесь в ближайшее время с деталями.',
};

export interface ReplyOptions {
  client: Anthropic;
  turns: ConversationTurn[];
  /** Overrides the guess from the message text. */
  language?: LanguageCode;
}

export async function generateReply({ client, turns, language }: ReplyOptions): Promise<ReplyResult> {
  const lastUser = [...turns].reverse().find((t) => t.role === 'user');
  const lang = language ?? detectLanguage(lastUser?.text ?? '');

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'low' },
    // The reference is the same on every message in a language, so it is the
    // cached prefix. The conversation, which changes every turn, follows it.
    system: [
      { type: 'text', text: behaviour },
      {
        type: 'text',
        text: `# Reference\n\n${knowledgeFor(lang)}`,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [escalateTool],
    messages: turns.map((turn) => ({ role: turn.role, content: turn.text })),
  });

  const escalation = response.content.find(
    (block): block is Anthropic.ToolUseBlock =>
      block.type === 'tool_use' && block.name === 'escalate_to_trade_desk',
  );

  if (escalation) {
    // Tool input arrives as unknown JSON; `strict: true` guarantees it matches
    // the schema, but the SDK still types it as `unknown`.
    const input = escalation.input as Record<string, string | undefined>;
    return {
      kind: 'escalate',
      language: lang,
      text: handoffMessage[lang] ?? handoffMessage.en,
      inquiry: {
        reason: String(input.reason ?? 'other'),
        commodity: input.commodity,
        quantity: input.quantity,
        destination: input.destination,
        incoterm: input.incoterm,
        contact: input.contact,
        summary: String(input.summary ?? ''),
      },
    };
  }

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  return { kind: 'reply', language: lang, text };
}
