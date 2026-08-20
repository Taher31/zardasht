import type { LanguageCode } from '../i18n';

/**
 * Localized country copy for the Trade Map.
 *
 * To add a country to the map:
 *   1. Add an entry to public/data/trade-countries.json (status: true).
 *   2. Add its ISO 3166-1 alpha-2 code to `names` + `notes` for fa / ar / ru below.
 *   3. Any new commodity or compliance string also needs an `items` / `compliance` entry.
 * English needs no entry here — it falls back to the JSON values.
 */
export interface CountryLocalePack {
  names: Record<string, string>;
  notes: Record<string, string>;
  items: Record<string, string>;
  compliance: Record<string, string>;
}

export const countryLocale: Partial<Record<LanguageCode, CountryLocalePack>> = {
  fa: {
    names: {
      UZ: 'ازبکستان',
      RU: 'روسیه',
      IQ: 'عراق',
      KZ: 'قزاقستان',
      TM: 'ترکمنستان',
      TJ: 'تاجیکستان',
      KG: 'قرقیزستان',
    },
    notes: {
      UZ: 'صادرات قیر و واردات نخ ابریشم بر اساس مشخصات و شرایط تحویل توافق‌شده.',
      RU: 'تأمین جو برای واردات در چارچوب سبد کالاهای کشاورزی.',
      IQ: 'مقصد صادرات قیر بر اساس مشخصات و شرایط تحویل توافق‌شده.',
      KZ: 'مقصد صادرات آهن و محصولات فولادی در بازارهای آسیای مرکزی.',
      TM: 'مقصد صادرات آهن و محصولات فولادی در بازارهای آسیای مرکزی.',
      TJ: 'مقصد صادرات آهن و محصولات فولادی در بازارهای آسیای مرکزی.',
      KG: 'مقصد صادرات آهن و محصولات فولادی در بازارهای آسیای مرکزی.',
    },
    items: {
      Bitumen: 'قیر',
      'Silk yarn': 'نخ ابریشم',
      Barley: 'جو',
      'Iron and steel products': 'آهن و محصولات فولادی',
    },
    compliance: {
      'Export and import documentation confirmed per shipment.': 'مدارک صادرات و واردات برای هر محموله تأیید می‌شود.',
      'Quality specification and shipping documentation confirmed per shipment.':
        'مشخصات کیفی و مدارک حمل برای هر محموله تأیید می‌شود.',
      'Export documentation confirmed per shipment.': 'مدارک صادرات برای هر محموله تأیید می‌شود.',
    },
  },
  ar: {
    names: {
      UZ: 'أوزبكستان',
      RU: 'روسيا',
      IQ: 'العراق',
      KZ: 'كازاخستان',
      TM: 'تركمانستان',
      TJ: 'طاجيكستان',
      KG: 'قيرغيزستان',
    },
    notes: {
      UZ: 'تصدير البيتومين واستيراد خيوط الحرير وفق المواصفات وشروط التسليم المتفق عليها.',
      RU: 'توريد الشعير للاستيراد ضمن محفظة السلع الزراعية.',
      IQ: 'وجهة لتصدير البيتومين وفق المواصفات وشروط التسليم المتفق عليها.',
      KZ: 'وجهة لتصدير منتجات الحديد والصلب في أسواق آسيا الوسطى.',
      TM: 'وجهة لتصدير منتجات الحديد والصلب في أسواق آسيا الوسطى.',
      TJ: 'وجهة لتصدير منتجات الحديد والصلب في أسواق آسيا الوسطى.',
      KG: 'وجهة لتصدير منتجات الحديد والصلب في أسواق آسيا الوسطى.',
    },
    items: {
      Bitumen: 'البيتومين',
      'Silk yarn': 'خيوط الحرير',
      Barley: 'الشعير',
      'Iron and steel products': 'منتجات الحديد والصلب',
    },
    compliance: {
      'Export and import documentation confirmed per shipment.': 'تُؤكَّد مستندات التصدير والاستيراد لكل شحنة.',
      'Quality specification and shipping documentation confirmed per shipment.':
        'تُؤكَّد مواصفات الجودة ومستندات الشحن لكل شحنة.',
      'Export documentation confirmed per shipment.': 'تُؤكَّد مستندات التصدير لكل شحنة.',
    },
  },
  ru: {
    names: {
      UZ: 'Узбекистан',
      RU: 'Россия',
      IQ: 'Ирак',
      KZ: 'Казахстан',
      TM: 'Туркменистан',
      TJ: 'Таджикистан',
      KG: 'Кыргызстан',
    },
    notes: {
      UZ: 'Экспорт битума и импорт шёлковой пряжи по согласованным спецификациям и условиям поставки.',
      RU: 'Закупка ячменя для импорта в рамках сельскохозяйственного портфеля.',
      IQ: 'Направление экспорта битума по согласованным спецификациям и условиям поставки.',
      KZ: 'Направление экспорта железа и стальной продукции на рынки Центральной Азии.',
      TM: 'Направление экспорта железа и стальной продукции на рынки Центральной Азии.',
      TJ: 'Направление экспорта железа и стальной продукции на рынки Центральной Азии.',
      KG: 'Направление экспорта железа и стальной продукции на рынки Центральной Азии.',
    },
    items: {
      Bitumen: 'Битум',
      'Silk yarn': 'Шёлковая пряжа',
      Barley: 'Ячмень',
      'Iron and steel products': 'Железо и стальная продукция',
    },
    compliance: {
      'Export and import documentation confirmed per shipment.': 'Документы на экспорт и импорт подтверждаются по каждой поставке.',
      'Quality specification and shipping documentation confirmed per shipment.':
        'Спецификация качества и отгрузочные документы подтверждаются по каждой поставке.',
      'Export documentation confirmed per shipment.': 'Экспортные документы подтверждаются по каждой поставке.',
    },
  },
};

/**
 * ISO codes are compared upper-cased everywhere. The world geojson uses uppercase,
 * so a lowercase `country_code` in trade-countries.json would otherwise fail to
 * match and the country would never highlight on the map.
 */
export const normalizeCountryCode = (code: string) => String(code || '').trim().toUpperCase();

/** Country name in the active language, falling back to the English JSON value. */
export const localizedCountryName = (lang: LanguageCode, code: string, fallback: string) =>
  countryLocale[lang]?.names?.[normalizeCountryCode(code)] ?? fallback;
