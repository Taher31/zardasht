import { getTranslation, type LanguageCode } from '../../src/i18n';
import { getIncoterms } from '../../src/data/incoterms';
import { getNewsPosts } from '../../src/data/news';
import { localizedCountryName } from '../../src/data/country-locale';
import productsData from '../../src/data/products.json';
import contactData from '../../src/data/contact.json';
import tradeCountries from '../../public/data/trade-countries.json';

/**
 * The grounding context the assistant answers from.
 *
 * It is assembled from the same files that build the website, so there is no
 * second copy of the facts to drift out of date: fix a product description or
 * add a country to trade-countries.json and the assistant's answers change on
 * the next restart.
 *
 * The whole corpus is ~40k tokens across four languages. Filtered to one
 * language it lands around 10-15k, which fits comfortably in the context
 * window — so this is a plain prompt, not a retrieval system. No embeddings,
 * no vector store, nothing to keep in sync.
 *
 * The text is deliberately stable per language: it is sent as a cached prefix
 * (see reply.ts), and any change to it invalidates that cache.
 */

interface TradeCountry {
  country_code: string;
  country_name: string;
  status: boolean;
  notes?: string;
  capital?: string;
  currency?: string;
  main_exports?: string[];
  main_imports?: string[];
  compliance_notes?: string;
}

const section = (heading: string, body: string) => `## ${heading}\n${body.trim()}\n`;

const buildCompany = (lang: LanguageCode): string => {
  const t = getTranslation(lang);
  const contact = contactData[lang] ?? contactData.en;
  return section(
    'The company',
    [
      `${t.labels.brand} — ${t.labels.subbrand}`,
      t.pages.about.intro,
      t.pages.about.missionBody,
      t.pages.about.storyBody,
      `${t.pages.contact.addressLabel}: ${contact.address}`,
      `Email: ${contact.email}`,
      `Phone / WhatsApp: ${contact.phone}`,
    ].join('\n'),
  );
};

const buildProducts = (lang: LanguageCode): string => {
  const sections = (productsData as Record<string, unknown>)[lang] ?? productsData.en;
  const body = (sections as Array<{
    id: string;
    title: string;
    description: string;
    products: Array<{ name: string; description: string }>;
  }>)
    .map((group) => {
      const items = group.products.map((p) => `  - ${p.name}: ${p.description}`).join('\n');
      return `### ${group.title}  (/products/${group.id})\n${group.description}\n${items}`;
    })
    .join('\n\n');
  return section('Commodity groups we trade', body);
};

const buildMarkets = (lang: LanguageCode): string => {
  const active = (tradeCountries as TradeCountry[]).filter((c) => c.status);
  const body = active
    .map((c) => {
      const name = localizedCountryName(lang, c.country_code, c.country_name);
      const lines = [`### ${name} (${c.country_code})`];
      if (c.notes) lines.push(c.notes);
      if (c.main_exports?.length) lines.push(`We ship there: ${c.main_exports.join(', ')}`);
      if (c.main_imports?.length) lines.push(`We buy from there: ${c.main_imports.join(', ')}`);
      if (c.compliance_notes) lines.push(`Note: ${c.compliance_notes}`);
      return lines.join('\n');
    })
    .join('\n\n');
  return section(`Markets we actively trade with (${active.length})`, body);
};

const buildIncoterms = (lang: LanguageCode): string => {
  const pack = getIncoterms(lang);
  const render = (title: string, note: string, terms: typeof pack.multimodal) =>
    `### ${title}\n${note}\n` +
    terms
      .map(
        (term) =>
          `- **${term.code}** (${term.name}): ${term.summary} ` +
          `Risk passes: ${term.point}. ` +
          `Seller: ${term.seller.join('; ')}. Buyer: ${term.buyer.join('; ')}.`,
      )
      .join('\n');

  return section(
    'Incoterms 2020',
    [
      pack.intro,
      render(pack.multimodalTitle, pack.multimodalNote, pack.multimodal),
      render(pack.seaTitle, pack.seaNote, pack.sea),
      pack.disclaimer,
    ].join('\n\n'),
  );
};

const buildGuides = (lang: LanguageCode): string => {
  const guides = getNewsPosts(lang).filter((post) => post.kind === 'guide');
  const body = guides
    .map((g) => `### ${g.title}  (/news/${g.slug})\n${g.excerpt}\n\n${g.body.join('\n\n')}`)
    .join('\n\n');
  return section('Reference guides published on the site', body);
};

const buildFaq = (lang: LanguageCode): string => {
  const t = getTranslation(lang);
  const body = t.pages.home.faq.map((item) => `**${item.question}**\n${item.answer}`).join('\n\n');
  return section('Frequently asked questions', body);
};

/**
 * The full grounding text for one language. Stable for a given build — call it
 * once at startup and reuse the string so the prompt cache keeps hitting.
 */
export const buildKnowledge = (lang: LanguageCode): string =>
  [
    buildCompany(lang),
    buildProducts(lang),
    buildMarkets(lang),
    buildIncoterms(lang),
    buildGuides(lang),
    buildFaq(lang),
  ].join('\n');

/** Built once per language, on first use. */
const cache = new Map<LanguageCode, string>();

export const knowledgeFor = (lang: LanguageCode): string => {
  const hit = cache.get(lang);
  if (hit) return hit;
  const built = buildKnowledge(lang);
  cache.set(lang, built);
  return built;
};

/**
 * Which language to answer in, guessed from the message itself.
 *
 * Persian and Arabic share a script, so the Arabic-script branch looks for the
 * four letters Persian adds (پ چ ژ گ) plus the Persian yeh/keheh, which Arabic
 * does not use. A message with neither is treated as Arabic. This is a guess:
 * the assistant is also told to follow the customer's language if it differs,
 * so a wrong guess costs relevance in the grounding text, not the reply.
 */
const CYRILLIC = /[Ѐ-ԯ]/;
// Arabic block, Arabic Supplement, and the two presentation-forms blocks.
const ARABIC_SCRIPT = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
// Letters Persian adds to the Arabic alphabet, plus the Persian yeh and keheh.
const PERSIAN_ONLY = /[پچژگکی]/;

export const detectLanguage = (text: string): LanguageCode => {
  if (CYRILLIC.test(text)) return 'ru';
  if (ARABIC_SCRIPT.test(text)) return PERSIAN_ONLY.test(text) ? 'fa' : 'ar';
  return 'en';
};
