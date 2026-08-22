import type { LanguageCode } from '../i18n';
import localeData from './country-locale.json';

/**
 * Localized country copy for the Trade Map.
 *
 * Content is managed through the admin panel (see admin/README-EXPORT.md) —
 * countryLocale is read from country-locale.json, which the admin panel's
 * export regenerates. English needs no entry — it falls back to the JSON
 * values in public/data/trade-countries.json.
 */
export interface CountryLocalePack {
  names: Record<string, string>;
  notes: Record<string, string>;
  items: Record<string, string>;
  compliance: Record<string, string>;
}

export const countryLocale: Partial<Record<LanguageCode, CountryLocalePack>> = localeData;

/**
 * ISO codes are compared upper-cased everywhere. The world geojson uses uppercase,
 * so a lowercase `country_code` in trade-countries.json would otherwise fail to
 * match and the country would never highlight on the map.
 */
export const normalizeCountryCode = (code: string) => String(code || '').trim().toUpperCase();

/** Country name in the active language, falling back to the English JSON value. */
export const localizedCountryName = (lang: LanguageCode, code: string, fallback: string) =>
  countryLocale[lang]?.names?.[normalizeCountryCode(code)] ?? fallback;
