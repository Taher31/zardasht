import { buildKnowledge, detectLanguage } from './knowledge';
import type { LanguageCode } from '../../src/i18n';

/**
 * Offline check of everything that does not need an API key: that the
 * reference assembles for each language, how big it is, and that the language
 * guess behaves. Run with:  npx tsx bot/src/inspect.ts
 */

const LANGS: LanguageCode[] = ['en', 'fa', 'ar', 'ru'];

console.log('Reference size per language\n');
console.log('lang   characters   ~tokens   sections');
for (const lang of LANGS) {
  const text = buildKnowledge(lang);
  const chars = [...text].length;
  const sections = (text.match(/^## /gm) ?? []).length;
  // ~3.2 chars/token is a rough average across these scripts; the real number
  // comes from the API's count_tokens endpoint.
  const tokens = Math.round(chars / 3.2);
  console.log(
    `${lang.padEnd(6)} ${String(chars).padStart(10)} ${String(tokens).padStart(9)} ${String(sections).padStart(10)}`,
  );
}

console.log('\nSection headings (en):');
for (const heading of buildKnowledge('en').match(/^## .*/gm) ?? []) {
  console.log('  ' + heading.replace('## ', ''));
}

console.log('\nLanguage detection:');
const samples: Array<[string, LanguageCode]> = [
  ['Do you export bitumen to Uzbekistan?', 'en'],
  ['قیمت قیر ۶۰/۷۰ چنده؟', 'fa'],
  ['هل تصدرون البيتومين إلى أوزبكستان؟', 'ar'],
  ['Вы поставляете битум в Узбекистан?', 'ru'],
  ['سلام، جو روسی دارید؟', 'fa'],
  ['ما هي شروط التسليم؟', 'ar'],
];
let failures = 0;
for (const [text, expected] of samples) {
  const got = detectLanguage(text);
  const ok = got === expected;
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${expected} -> ${got}   ${text}`);
}

console.log(`\n${failures === 0 ? 'all detection samples passed' : failures + ' detection failures'}`);

// A spot check that real facts made it in, rather than an empty template.
const en = buildKnowledge('en');
const mustContain = ['Incoterms', 'FCA', 'CIF', 'Uzbekistan', 'bitumen', 'barley'];
console.log('\nFact spot-check (en):');
for (const needle of mustContain) {
  const present = en.toLowerCase().includes(needle.toLowerCase());
  console.log(`  ${present ? 'present ' : 'MISSING '} ${needle}`);
}
