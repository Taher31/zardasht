import contactData from './data/contact.json';
import productsData from './data/products.json';

export type LanguageCode = "en" | "fa" | "ar" | "ru";

export interface Translation {
  lang: LanguageCode;
  dir: 'ltr' | 'rtl';
  labels: {
    brand: string;
    subbrand: string;
    nav: {
      home: string;
      products: string;
      solutions: string;
      resources: string;
      about: string;
      contact: string;
      tradeMap: string;
      quality: string;
      news: string;
    };
    trade: {
      tagline: string;
      inquiry: string;
      productGroups: string;
      viewAllProducts: string;
      downloadCatalog: string;
      energyBitumen: string;
      metalsSteel: string;
      agriculturalCommodities: string;
      textileRawMaterials: string;
    };
    footer: {
      company: string;
      support: string;
      contact: string;
      tradeMap: string;
      copyright: string;
      privacy: string;
      terms: string;
    };
  };
  pages: {
    home: {
      title: string;
      eyebrow: string;
      heroTitle: string;
      heroSubtitle: string;
      heroImageAlt: string;
      ctaPrimary: string;
      ctaSecondary: string;
      stats: { label: string; value: string }[];
      trustTitle: string;
      trustBadges: { title: string; description: string }[];
      featuredTitle: string;
      featuredList: string[];
      categoriesTitle: string;
      categoriesIntro: string;
      categories: { name: string; description: string; badge: string; href: string }[];
      marketsTitle: string;
      marketsIntro: string;
      marketsHomeLabel: string;
      countersTitle: string;
      countersIntro: string;
      // `key` lets the homepage derive live values from real data (see index.astro);
      // `value` is the fallback used when a key has no derived source.
      counters: { key: 'years' | 'groups' | 'lanes' | 'markets'; value: number; suffix: string; label: string }[];
      industriesTitle: string;
      industriesIntro: string;
      industries: { name: string; description: string }[];
      faqTitle: string;
      faqIntro: string;
      faq: { question: string; answer: string }[];
    };
    products: {
      eyebrow: string;
      title: string;
      intro: string;
      cta: string;
      sections: {
        id: string;
        badge: string;
        title: string;
        description: string;
        products: { name: string; description: string; tag: string }[];
      }[];
    };
    solutions: {
      eyebrow: string;
      title: string;
      intro: string;
      partners: { eyebrow: string; title: string };
      solutions: { title: string; description: string; tags: string[] }[];
      outcomesTitle: string;
      outcomes: { title: string; description: string }[];
    };
    resources: {
      eyebrow: string;
      title: string;
      intro: string;
      cards: { title: string; description: string; badge: string }[];
    };
    about: {
      eyebrow: string;
      title: string;
      intro: string;
      missionTitle: string;
      missionBody: string;
      storyTitle: string;
      storyBody: string;
      valuesTitle: string;
      values: string[];
      leadershipTitle: string;
      leadershipBody: string;
      metrics: { label: string; value: string }[];
      cta: string;
      mapTitle: string;
      mapAddress: string;
      mapCta: string;
      mapZoomIn: string;
      mapZoomOut: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      intro: string;
      address: string;
      addressLabel: string;
      phone: string;
      email: string;
      quickLinks: string[];
      whatsappIntro: string;
      whatsappGreeting: string;
      form: {
        name: string;
        company: string;
        country: string;
        email: string;
        phone: string;
        product: string;
        quantity: string;
        destination: string;
        incoterms: string;
        message: string;
        submit: string;
      };
    };
    quality: {
      eyebrow: string;
      title: string;
      intro: string;
      pillars: { title: string; description: string; badge: string }[];
      processTitle: string;
      process: { title: string; description: string }[];
    };
    news: {
      eyebrow: string;
      title: string;
      intro: string;
      homeTitle: string;
      homeIntro: string;
      readMore: string;
      allNews: string;
      back: string;
      empty: string;
    };
    tradeMap: {
      title: string;
      intro: string;
      highlightLegend: string;
      greyLegend: string;
      activeCountLabel: string;
      statusTraded: string;
      statusNotTraded: string;
      statusLabel: string;
      capitalLabel: string;
      currencyLabel: string;
      fxTitle: string;
      fxBaseLabel: string;
      fxUpdatedLabel: string;
      fxLoading: string;
      fxError: string;
      dealsLabel: string;
      totalLabel: string;
      lastDealLabel: string;
      summaryTitle: string;
      complianceLabel: string;
      shipTitle: string;
      importsTitle: string;
      projectsTitle: string;
      projectsEmpty: string;
      selectPrompt: string;
      ctaBack: string;
    };
  };
}

export const languages: { code: LanguageCode; name: string; nativeName: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
];




export const defaultLang: LanguageCode = 'en';

const en: Omit<Translation, 'lang' | 'dir'> = {
  labels: {
    brand: 'Zardasht Mahd Binaloud Trading',
    subbrand: 'International Commodity Trading',
    nav: {
      home: 'Home',
      products: 'Products',
      solutions: 'Trade & Logistics',
      resources: 'Markets',
      about: 'About Us',
      contact: 'Contact',
      tradeMap: 'Trade Map',
      quality: 'Quality',
      news: 'News',
    },
    trade: {
      tagline: 'International Commodity Trading · Central Asia · Russia',
      inquiry: 'Send Trade Inquiry',
      productGroups: 'Product Groups',
      viewAllProducts: 'View all products',
      downloadCatalog: 'Download Product Catalog (PDF)',
      energyBitumen: 'Energy & Bitumen',
      metalsSteel: 'Metals & Steel',
      agriculturalCommodities: 'Agricultural Commodities',
      textileRawMaterials: 'Textile Raw Materials',
    },
    footer: {
      company: 'Company',
      support: 'Support',
      contact: 'Contact',
      tradeMap: 'Trade Map',
      copyright: 'Zardasht Mahd Binaloud Trading. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  pages: {
    home: {
      title: 'International Commodity Trading',
      eyebrow: 'International commodity trading across Central Asia and Russia',
      heroTitle: 'Connecting supply with markets across the region',
      heroSubtitle: 'We import and export industrial, agricultural, and textile commodities with a focus on practical cross-border execution.',
      heroImageAlt: 'International commodity trade and logistics operations',
      ctaPrimary: 'Send Trade Inquiry',
      ctaSecondary: 'Explore Products',
      stats: [
        { label: 'Trade model', value: 'Import & Export' },
        { label: 'Core regions', value: 'Central Asia + Russia' },
        { label: 'Commodity groups', value: '4 core groups' },
        { label: 'Execution', value: 'Sourcing to delivery' },
      ],
      trustTitle: 'How we work',
      trustBadges: [
        { title: 'Regional Market Knowledge', description: 'Commercial focus on Central Asia, Russia, and neighboring trade corridors.' },
        { title: 'Cross-Border Execution', description: 'Import and export transactions coordinated around product, route, and delivery terms.' },
        { title: 'Multi-Commodity Sourcing', description: 'Industrial, agricultural, and textile products handled through one trading relationship.' },
      ],
      featuredTitle: 'Real trade flows, not a single-product catalog',
      featuredList: [
        'Bitumen exports to Uzbekistan.',
        'Barley imports from Russia and steel exports to Central Asia.',
        'Silk yarn imports alongside agricultural and industrial commodities.',
      ],
      categoriesTitle: 'What we trade',
      categoriesIntro: 'Four commodity groups built around the company’s actual import and export activity.',
      categories: [
        { name: 'Energy & Bitumen', description: 'Bitumen export supply for Uzbekistan and other qualified regional opportunities.', badge: 'EB', href: '/products#energy-bitumen' },
        { name: 'Metals & Steel', description: 'Iron and steel products supplied to buyers across Central Asian markets.', badge: 'MS', href: '/products#metals-steel' },
        { name: 'Agricultural Commodities', description: 'Barley sourced from Russia plus pulses, grains, and selected agricultural products.', badge: 'AG', href: '/products#agricultural-commodities' },
        { name: 'Textile Raw Materials', description: 'Silk yarn imports and specification-based textile raw material sourcing.', badge: 'TX', href: '/products#textile-raw-materials' },
      ],
      marketsTitle: 'Countries we work with',
      marketsIntro: 'Select a flag to see what we move in and out of that market.',
      marketsHomeLabel: 'Iran · Home base',
      countersTitle: 'Two decades of cross-border trade',
      countersIntro: 'Experience built on real import and export activity, not a generic catalogue.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'Years of trading experience' },
        { key: 'groups', value: 4, suffix: '', label: 'Commodity groups' },
        { key: 'lanes', value: 4, suffix: '', label: 'Key trade lanes' },
        { key: 'markets', value: 2, suffix: '', label: 'Active markets' },
      ],
      industriesTitle: 'Key trade flows',
      industriesIntro: 'A clear view of the import and export lanes that define our current business.',
      industries: [
        { name: 'Bitumen → Uzbekistan', description: 'Exporting bitumen to buyers in Uzbekistan based on agreed specifications and commercial terms.' },
        { name: 'Barley ← Russia', description: 'Sourcing and importing barley from Russia as part of our agricultural commodity portfolio.' },
        { name: 'Steel → Central Asia', description: 'Exporting iron and steel products to customers across Central Asian markets.' },
        { name: 'Silk Yarn ← Import', description: 'Importing silk yarn as part of our textile raw materials business.' },
      ],
      faqTitle: 'Trade FAQ',
      faqIntro: 'The practical information buyers and suppliers usually need before starting a transaction.',
      faq: [
        { question: 'Which commodities do you trade?', answer: 'Our core groups are bitumen and energy-related products, iron and steel, agricultural commodities including barley and pulses, and textile raw materials including silk yarn.' },
        { question: 'Which markets do you focus on?', answer: 'Our current activity is centered on Central Asia and Russia, with additional regional opportunities evaluated by commodity and route.' },
        { question: 'Can you handle both imports and exports?', answer: 'Yes. The company operates on both sides of cross-border trade, including exports to Central Asia and imports from supplier markets such as Russia.' },
        { question: 'What should I include in a trade inquiry?', answer: 'Send the commodity, required specification, quantity, origin or destination, preferred delivery terms, and your target timeline.' },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'Commodity groups for regional trade',
      intro: 'Our portfolio spans industrial, agricultural, and textile commodities. Final specifications, origin, quantity, and delivery terms are confirmed for each transaction.',
      cta: 'Send Trade Inquiry',
      sections: productsData.en,
    },
    solutions: {
      eyebrow: 'Trade & Logistics',
      title: 'Cross-border trade from sourcing to delivery',
      intro: 'We coordinate the commercial and logistics steps required to move different commodities between supplier and destination markets.',
      partners: {
        eyebrow: 'Partners',
        title: 'Meeting partners in person',
      },
      solutions: [
        { title: 'International sourcing', description: 'Supplier options are evaluated against specification, availability, price, and delivery requirements.', tags: ['Sourcing', 'Suppliers', 'Specs'] },
        { title: 'Export execution', description: 'Export transactions are structured around destination, product specification, quantity, and agreed commercial terms.', tags: ['Export', 'Terms', 'Destination'] },
        { title: 'Import coordination', description: 'Imports are coordinated from supplier confirmation through shipping documentation and delivery planning.', tags: ['Import', 'Documents', 'Delivery'] },
        { title: 'Logistics planning', description: 'Transport routes and shipment modes are selected according to commodity, origin, destination, and volume.', tags: ['Road', 'Rail', 'Multimodal'] },
      ],
      outcomesTitle: 'How a trade starts',
      outcomes: [
        { title: '1) Requirement', description: 'Share the commodity, specification, quantity, origin or destination, and target timing.' },
        { title: '2) Sourcing & quote', description: 'We evaluate suitable supply and prepare the commercial offer.' },
        { title: '3) Terms', description: 'Specification, price, payment, delivery terms, and documentation are aligned.' },
        { title: '4) Execution', description: 'Supply, transport, and cross-border documentation are coordinated for the agreed route.' },
        { title: '5) Delivery follow-up', description: 'Transaction milestones are followed through to delivery and commercial closeout.' },
      ],
    },
    resources: {
      eyebrow: 'Markets',
      title: 'Regional markets and trade corridors',
      intro: 'Our business is built around specific origin and destination relationships rather than a generic global catalog.',
      cards: [
        { title: 'Uzbekistan', description: 'A current destination market for the company’s bitumen exports.', badge: 'UZ' },
        { title: 'Russia', description: 'A key sourcing market for barley imports and agricultural commodity opportunities.', badge: 'RU' },
        { title: 'Central Asia', description: 'A destination region for iron and steel exports and additional B2B trade opportunities.', badge: 'CA' },
        { title: 'Other Regional Markets', description: 'Additional opportunities are evaluated according to product, route, specification, and commercial fit.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'About us',
      title: 'About Zardasht Mahd Binaloud Trading',
      intro: 'An Iran-based international trading company active across industrial, agricultural, and textile commodity markets.',
      missionTitle: 'Mission',
      missionBody: 'Build reliable cross-border trade by connecting qualified supply with real market demand and managing each transaction with commercial discipline.',
      storyTitle: 'What we do',
      storyBody: 'Our activity spans both imports and exports: bitumen to Uzbekistan, iron and steel to Central Asia, barley from Russia, silk yarn imports, and broader commodity opportunities.',
      valuesTitle: 'How we operate',
      values: ['Clear specifications before commitment.', 'Commercial terms matched to each transaction.', 'Reliable supplier and buyer communication.', 'Practical logistics planning.', 'Long-term trading relationships.'],
      leadershipTitle: 'Markets & network',
      leadershipBody: 'Our commercial focus connects Iran with Central Asia, Russia, and neighboring markets through commodity-specific sourcing and sales relationships.',
      metrics: [
        { label: 'Trade model', value: 'Import & Export' },
        { label: 'Core regions', value: 'Central Asia + Russia' },
        { label: 'Portfolio', value: 'Industrial, agricultural, textile' },
      ],
      cta: 'Send Trade Inquiry',
      mapTitle: 'Find us in Iran',
      mapAddress: 'Zardasht Mahd Binaloud Trading, Iran',
      mapCta: 'Open in Google Maps',
      mapZoomIn: 'Zoom in',
      mapZoomOut: 'Zoom out',
    },
    contact: {
      eyebrow: 'Trade inquiry',
      title: 'Tell us what you need to buy or sell',
      intro: 'Share the commodity, specification, quantity, origin or destination, and preferred delivery terms so our trade team can evaluate the opportunity.',
      ...contactData.en,
      quickLinks: ['Send Trade Inquiry', 'Explore Products', 'View Trade Map'],
      whatsappIntro: 'Hello, I would like to discuss a commodity trade inquiry.',
      whatsappGreeting: "Hello, I'm contacting you from your website (Zardasht Mahd Binaloud Trading).",
      form: {
        name: 'Full name', company: 'Company name', country: 'Country', email: 'Work email', phone: 'Phone / WhatsApp',
        product: 'Commodity & specification', quantity: 'Quantity', destination: 'Origin / destination', incoterms: 'Preferred delivery terms',
        message: 'Notes / requirements', submit: 'Submit inquiry',
      },
    },
    quality: {
      eyebrow: 'Quality',
      title: 'How we assure quality',
      intro: 'Every shipment moves through the same specification, evaluation, and documentation steps before it leaves for its destination.',
      pillars: [
        { title: 'Specification confirmed upfront', description: 'Grade, packaging, and technical requirements are agreed and confirmed before any purchase is finalized.', badge: '01' },
        { title: 'Supplier evaluation', description: 'Supplier options are compared against specification, availability, and delivery requirements for every commodity group.', badge: '02' },
        { title: 'Documentation aligned to destination', description: "Export and import paperwork is prepared to match the requirements of the buyer's market before shipment.", badge: '03' },
      ],
      processTitle: 'Our quality process',
      process: [
        { title: '1) Specification', description: 'Grade, packaging, and commercial requirements are confirmed against each inquiry.' },
        { title: '2) Sourcing check', description: 'Supplier or buyer options are evaluated against the agreed specification and timeline.' },
        { title: '3) Documentation', description: 'Shipping and compliance documentation is prepared to match destination requirements.' },
        { title: '4) Delivery confirmation', description: 'Shipment details are confirmed against the agreed terms through to delivery.' },
      ],
    },
    news: {
      eyebrow: 'Newsroom',
      title: 'Company news',
      intro: 'Meetings, visits and events from our trade activity across the region.',
      homeTitle: 'Latest news',
      homeIntro: 'Recent meetings, visits and events.',
      readMore: 'Read more',
      allNews: 'All news',
      back: 'Back to news',
      empty: 'No news published yet.',
    },
    tradeMap: {
      title: 'Trade Map',
      intro: 'Explore our active export markets worldwide. Click a highlighted country for details.',
      highlightLegend: 'Highlighted = active markets',
      greyLegend: 'Grey = no activity yet',
      activeCountLabel: 'active countries',
      statusTraded: 'Active',
      statusNotTraded: 'Not active',
      statusLabel: 'Status',
      capitalLabel: 'Capital',
      currencyLabel: 'Currency',
      fxTitle: 'Live FX rates',
      fxBaseLabel: 'Base',
      fxUpdatedLabel: 'Updated',
      fxLoading: 'Loading rates...',
      fxError: 'Rates unavailable',
      dealsLabel: 'Deals',
      totalLabel: 'Total value',
      lastDealLabel: 'Last deal',
      summaryTitle: 'Summary',
      complianceLabel: 'Compliance',
      shipTitle: 'What we ship',
      importsTitle: 'What we import',
      projectsTitle: 'Market highlights',
      projectsEmpty: 'No details listed yet.',
      selectPrompt: 'Select a country',
      ctaBack: 'Back to map',
    },
  },
};
const fa: Omit<Translation, 'lang' | 'dir'> = {
  labels: {
    brand: 'بازرگانی زردشت مهد بینالود',
    subbrand: 'بازرگانی بین‌المللی کالا',
    nav: {
      home: 'صفحه اصلی',
      products: 'محصولات',
      solutions: 'تجارت و لجستیک',
      resources: 'بازارها',
      about: 'درباره ما',
      contact: 'تماس',
      tradeMap: 'نقشه تجارت',
      quality: 'کیفیت',
      news: 'اخبار',
    },
    trade: {
      tagline: 'بازرگانی بین‌المللی کالا · آسیای مرکزی · روسیه',
      inquiry: 'ارسال درخواست تجاری',
      productGroups: 'گروه‌های کالایی',
      viewAllProducts: 'مشاهده همه محصولات',
      downloadCatalog: 'دانلود کاتالوگ محصولات (PDF)',
      energyBitumen: 'انرژی و قیر',
      metalsSteel: 'فلزات و فولاد',
      agriculturalCommodities: 'محصولات کشاورزی',
      textileRawMaterials: 'مواد اولیه نساجی',
    },
    footer: {
      company: 'شرکت',
      support: 'پشتیبانی',
      contact: 'تماس',
      tradeMap: 'نقشه تجارت',
      copyright: 'بازرگانی زردشت مهد بینالود. تمامی حقوق محفوظ است.',
      privacy: 'حریم خصوصی',
      terms: 'شرایط خدمات',
    },
  },
  pages: {
    home: {
      title: 'بازرگانی بین‌المللی کالا',
      eyebrow: 'تجارت بین‌المللی کالا در آسیای مرکزی و روسیه',
      heroTitle: 'اتصال منابع تأمین به بازارهای منطقه',
      heroSubtitle: 'در حوزه کالاهای صنعتی، کشاورزی و مواد اولیه نساجی واردات و صادرات انجام می‌دهیم و روی اجرای عملی تجارت فرامرزی تمرکز داریم.',
      heroImageAlt: 'عملیات تجارت و لجستیک بین‌المللی کالا',
      ctaPrimary: 'ارسال درخواست تجاری',
      ctaSecondary: 'مشاهده محصولات',
      stats: [
        { label: 'مدل تجارت', value: 'واردات و صادرات' },
        { label: 'بازارهای اصلی', value: 'آسیای مرکزی + روسیه' },
        { label: 'گروه‌های کالایی', value: '۴ گروه اصلی' },
        { label: 'اجرا', value: 'از تأمین تا تحویل' },
      ],
      trustTitle: 'نحوه فعالیت ما',
      trustBadges: [
        { title: 'شناخت بازار منطقه', description: 'تمرکز تجاری بر آسیای مرکزی، روسیه و مسیرهای بازرگانی پیرامونی.' },
        { title: 'اجرای تجارت فرامرزی', description: 'هماهنگی معاملات وارداتی و صادراتی بر اساس کالا، مسیر و شرایط تحویل.' },
        { title: 'تأمین چندکالایی', description: 'مدیریت کالاهای صنعتی، کشاورزی و نساجی در قالب یک رابطه تجاری.' },
      ],
      featuredTitle: 'جریان واقعی تجارت، نه یک کاتالوگ تک‌محصولی',
      featuredList: [
        'صادرات قیر به ازبکستان.',
        'واردات جو از روسیه و صادرات آهن و فولاد به آسیای مرکزی.',
        'واردات نخ ابریشم در کنار کالاهای کشاورزی و صنعتی.',
      ],
      categoriesTitle: 'چه کالاهایی تجارت می‌کنیم',
      categoriesIntro: 'چهار گروه کالایی بر اساس فعالیت واقعی واردات و صادرات شرکت.',
      categories: [
        { name: 'انرژی و قیر', description: 'تأمین صادراتی قیر برای ازبکستان و فرصت‌های مناسب در بازارهای منطقه.', badge: 'EB', href: '/products#energy-bitumen' },
        { name: 'فلزات و فولاد', description: 'تأمین آهن و محصولات فولادی برای خریداران بازارهای آسیای مرکزی.', badge: 'MS', href: '/products#metals-steel' },
        { name: 'کالاهای کشاورزی', description: 'تأمین جو از روسیه به‌همراه حبوبات، غلات و کالاهای کشاورزی منتخب.', badge: 'AG', href: '/products#agricultural-commodities' },
        { name: 'مواد اولیه نساجی', description: 'واردات نخ ابریشم و تأمین مواد اولیه نساجی بر اساس مشخصات موردنیاز.', badge: 'TX', href: '/products#textile-raw-materials' },
      ],
      marketsTitle: 'کشورهایی که با آن‌ها کار می‌کنیم',
      marketsIntro: 'برای دیدن اقلام صادراتی و وارداتی هر بازار، روی پرچم آن کلیک کنید.',
      marketsHomeLabel: 'ایران · مرکز فعالیت',
      countersTitle: 'دو دهه تجارت فرامرزی',
      countersIntro: 'تجربه‌ای که بر پایه فعالیت واقعی واردات و صادرات بنا شده، نه یک کاتالوگ عمومی.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'سال تجربه تجاری' },
        { key: 'groups', value: 4, suffix: '', label: 'گروه کالایی' },
        { key: 'lanes', value: 4, suffix: '', label: 'مسیر اصلی تجارت' },
        { key: 'markets', value: 2, suffix: '', label: 'بازار فعال' },
      ],
      industriesTitle: 'جریان‌های اصلی تجارت',
      industriesIntro: 'تصویری روشن از مسیرهای واردات و صادراتی که فعالیت فعلی شرکت را شکل می‌دهند.',
      industries: [
        { name: 'صادرات قیر به ازبکستان', description: 'صادرات قیر به خریداران ازبکستان بر اساس مشخصات و شرایط تجاری توافق‌شده.' },
        { name: 'واردات جو از روسیه', description: 'تأمین و واردات جو از روسیه در چارچوب سبد کالاهای کشاورزی شرکت.' },
        { name: 'صادرات آهن و فولاد به آسیای مرکزی', description: 'صادرات آهن و محصولات فولادی به مشتریان بازارهای آسیای مرکزی.' },
        { name: 'واردات نخ ابریشم', description: 'واردات نخ ابریشم به‌عنوان بخشی از فعالیت شرکت در مواد اولیه نساجی.' },
      ],
      faqTitle: 'پرسش‌های تجاری',
      faqIntro: 'اطلاعات کاربردی که خریداران و تأمین‌کنندگان معمولاً پیش از شروع معامله نیاز دارند.',
      faq: [
        { question: 'چه کالاهایی تجارت می‌کنید؟', answer: 'گروه‌های اصلی ما شامل قیر و محصولات مرتبط، آهن و فولاد، کالاهای کشاورزی از جمله جو و حبوبات، و مواد اولیه نساجی از جمله نخ ابریشم است.' },
        { question: 'تمرکز بازار شما کجاست؟', answer: 'فعالیت فعلی ما بر آسیای مرکزی و روسیه متمرکز است و سایر فرصت‌های منطقه‌ای نیز بر اساس کالا و مسیر بررسی می‌شوند.' },
        { question: 'هم واردات انجام می‌دهید و هم صادرات؟', answer: 'بله. شرکت در هر دو سمت تجارت فرامرزی فعالیت می‌کند؛ از صادرات به آسیای مرکزی تا واردات از بازارهای تأمین مانند روسیه.' },
        { question: 'در درخواست تجاری چه اطلاعاتی ارسال کنم؟', answer: 'نام کالا، مشخصات موردنیاز، مقدار، مبدأ یا مقصد، شرایط تحویل ترجیحی و زمان‌بندی مدنظر را ارسال کنید.' },
      ],
    },
    products: {
      eyebrow: 'محصولات',
      title: 'گروه‌های کالایی برای تجارت منطقه‌ای',
      intro: 'سبد ما شامل کالاهای صنعتی، کشاورزی و مواد اولیه نساجی است. مشخصات نهایی، مبدأ، مقدار و شرایط تحویل برای هر معامله جداگانه تأیید می‌شود.',
      cta: 'ارسال درخواست تجاری',
      sections: productsData.fa,
    },
    solutions: {
      eyebrow: 'تجارت و لجستیک',
      title: 'تجارت فرامرزی از تأمین تا تحویل',
      intro: 'مراحل تجاری و لجستیکی لازم برای جابه‌جایی کالا میان بازار تأمین و مقصد را هماهنگ می‌کنیم.',
      partners: {
        eyebrow: 'شرکا',
        title: 'دیدار حضوری با شرکا',
      },
      solutions: [
        { title: 'تأمین بین‌المللی', description: 'گزینه‌های تأمین بر اساس مشخصات، موجودی، قیمت و الزامات تحویل ارزیابی می‌شوند.', tags: ['تأمین', 'فروشنده', 'مشخصات'] },
        { title: 'اجرای صادرات', description: 'معاملات صادراتی بر اساس مقصد، مشخصات کالا، مقدار و شرایط تجاری توافق‌شده تنظیم می‌شوند.', tags: ['صادرات', 'شرایط', 'مقصد'] },
        { title: 'هماهنگی واردات', description: 'واردات از تأیید تأمین‌کننده تا اسناد حمل و برنامه تحویل هماهنگ می‌شود.', tags: ['واردات', 'اسناد', 'تحویل'] },
        { title: 'برنامه‌ریزی لجستیک', description: 'مسیر و روش حمل بر اساس نوع کالا، مبدأ، مقصد و حجم انتخاب می‌شود.', tags: ['جاده', 'ریل', 'ترکیبی'] },
      ],
      outcomesTitle: 'شروع یک معامله چگونه است',
      outcomes: [
        { title: '۱) نیاز', description: 'کالا، مشخصات، مقدار، مبدأ یا مقصد و زمان‌بندی هدف را ارسال کنید.' },
        { title: '۲) تأمین و قیمت', description: 'گزینه مناسب تأمین بررسی و پیشنهاد تجاری آماده می‌شود.' },
        { title: '۳) شرایط', description: 'مشخصات، قیمت، پرداخت، شرایط تحویل و اسناد هماهنگ می‌شوند.' },
        { title: '۴) اجرا', description: 'تأمین، حمل و اسناد فرامرزی برای مسیر توافق‌شده هماهنگ می‌شود.' },
        { title: '۵) پیگیری تحویل', description: 'مراحل معامله تا تحویل و نهایی‌شدن تجاری پیگیری می‌شود.' },
      ],
    },
    resources: {
      eyebrow: 'بازارها',
      title: 'بازارهای منطقه و مسیرهای تجاری',
      intro: 'فعالیت ما بر روابط مشخص میان مبدأ و مقصد بنا شده، نه یک کاتالوگ عمومی جهانی.',
      cards: [
        { title: 'ازبکستان', description: 'یکی از بازارهای مقصد فعلی برای صادرات قیر شرکت.', badge: 'UZ' },
        { title: 'روسیه', description: 'بازار مهم تأمین برای واردات جو و فرصت‌های کالاهای کشاورزی.', badge: 'RU' },
        { title: 'آسیای مرکزی', description: 'منطقه مقصد برای صادرات آهن و فولاد و سایر فرصت‌های تجارت B2B.', badge: 'CA' },
        { title: 'سایر بازارهای منطقه', description: 'فرصت‌های دیگر بر اساس کالا، مسیر، مشخصات و تناسب تجاری بررسی می‌شوند.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'درباره ما',
      title: 'درباره بازرگانی زردشت مهد بینالود',
      intro: 'یک شرکت بازرگانی بین‌المللی مستقر در ایران با فعالیت در بازار کالاهای صنعتی، کشاورزی و مواد اولیه نساجی.',
      missionTitle: 'ماموریت',
      missionBody: 'ایجاد تجارت فرامرزی قابل‌اعتماد از طریق اتصال منابع تأمین مناسب به تقاضای واقعی بازار و مدیریت منظم هر معامله.',
      storyTitle: 'چه کاری انجام می‌دهیم',
      storyBody: 'فعالیت ما شامل واردات و صادرات است: قیر به ازبکستان، آهن و فولاد به آسیای مرکزی، جو از روسیه، واردات نخ ابریشم و فرصت‌های گسترده‌تر کالایی.',
      valuesTitle: 'شیوه کار ما',
      values: ['مشخصات روشن پیش از تعهد.', 'شرایط تجاری متناسب با هر معامله.', 'ارتباط قابل‌اعتماد با تأمین‌کننده و خریدار.', 'برنامه‌ریزی عملی لجستیک.', 'روابط تجاری بلندمدت.'],
      leadershipTitle: 'بازارها و شبکه',
      leadershipBody: 'تمرکز تجاری ما ایران را از طریق روابط تأمین و فروش کالامحور به آسیای مرکزی، روسیه و بازارهای پیرامونی متصل می‌کند.',
      metrics: [
        { label: 'مدل تجارت', value: 'واردات و صادرات' },
        { label: 'مناطق اصلی', value: 'آسیای مرکزی + روسیه' },
        { label: 'سبد کالا', value: 'صنعتی، کشاورزی، نساجی' },
      ],
      cta: 'ارسال درخواست تجاری',
      mapTitle: 'موقعیت ما در ایران', mapAddress: 'بازرگانی زردشت مهد بینالود، ایران', mapCta: 'باز کردن در Google Maps', mapZoomIn: 'بزرگ‌نمایی', mapZoomOut: 'کوچک‌نمایی',
    },
    contact: {
      eyebrow: 'درخواست تجاری',
      title: 'بگویید قصد خرید یا فروش چه کالایی را دارید',
      intro: 'نام کالا، مشخصات، مقدار، مبدأ یا مقصد و شرایط تحویل موردنظر را ارسال کنید تا تیم بازرگانی فرصت معامله را بررسی کند.',
      ...contactData.fa,
      quickLinks: ['ارسال درخواست تجاری', 'مشاهده محصولات', 'مشاهده نقشه تجارت'],
      whatsappIntro: 'سلام، مایل به بررسی یک درخواست تجاری کالا هستم.',
      whatsappGreeting: 'سلام، از طریق وب‌سایت شما (بازرگانی زردشت مهد بینالود) در تماس هستم.',
      form: {
        name: 'نام و نام خانوادگی', company: 'نام شرکت', country: 'کشور', email: 'ایمیل کاری', phone: 'تلفن / واتساپ',
        product: 'کالا و مشخصات', quantity: 'مقدار', destination: 'مبدأ / مقصد', incoterms: 'شرایط تحویل ترجیحی',
        message: 'توضیحات / الزامات', submit: 'ارسال درخواست',
      },
    },
    quality: {
      eyebrow: 'کیفیت',
      title: 'چگونه کیفیت را تضمین می‌کنیم',
      intro: 'هر محموله پیش از ارسال، مراحل یکسانی از تأیید مشخصات، ارزیابی و مستندسازی را طی می‌کند.',
      pillars: [
        { title: 'تأیید مشخصات از ابتدا', description: 'گرید، بسته‌بندی و الزامات فنی پیش از نهایی‌شدن هر خرید توافق و تأیید می‌شود.', badge: '01' },
        { title: 'ارزیابی تأمین‌کننده', description: 'گزینه‌های تأمین‌کننده برای هر گروه کالایی بر اساس مشخصات، موجودی و الزامات تحویل مقایسه می‌شوند.', badge: '02' },
        { title: 'مستندسازی متناسب با مقصد', description: 'مدارک صادرات و واردات پیش از حمل، مطابق با الزامات بازار خریدار آماده می‌شود.', badge: '03' },
      ],
      processTitle: 'فرآیند کیفیت ما',
      process: [
        { title: '۱) مشخصات', description: 'گرید، بسته‌بندی و الزامات تجاری برای هر درخواست تأیید می‌شود.' },
        { title: '۲) بررسی تأمین', description: 'گزینه‌های تأمین‌کننده یا خریدار بر اساس مشخصات و زمان‌بندی توافق‌شده ارزیابی می‌شوند.' },
        { title: '۳) مستندسازی', description: 'مدارک حمل و انطباق مطابق با الزامات مقصد آماده می‌شود.' },
        { title: '۴) تأیید تحویل', description: 'جزئیات محموله تا تحویل نهایی مطابق شرایط توافق‌شده تأیید می‌شود.' },
      ],
    },
    news: {
      eyebrow: 'اتاق خبر',
      title: 'اخبار شرکت',
      intro: 'دیدارها، بازدیدها و رویدادهای مرتبط با فعالیت تجاری ما در منطقه.',
      homeTitle: 'آخرین اخبار',
      homeIntro: 'دیدارها، بازدیدها و رویدادهای اخیر.',
      readMore: 'ادامه مطلب',
      allNews: 'همه اخبار',
      back: 'بازگشت به اخبار',
      empty: 'هنوز خبری منتشر نشده است.',
    },
    tradeMap: {
      title: 'نقشه تجارت',
      intro: 'بازارهای فعال صادراتی ما در سراسر جهان را ببینید. برای جزئیات روی کشورهای برجسته کلیک کنید.',
      highlightLegend: 'برجسته = بازارهای فعال',
      greyLegend: 'خاکستری = بدون فعالیت',
      activeCountLabel: 'کشور فعال',
      statusTraded: 'فعال',
      statusNotTraded: 'غیرفعال',
      statusLabel: 'وضعیت',
      capitalLabel: 'پایتخت',
      currencyLabel: 'واحد پول',
      fxTitle: 'نرخ ارز زنده',
      fxBaseLabel: 'مبنا',
      fxUpdatedLabel: 'به‌روزرسانی',
      fxLoading: 'در حال دریافت نرخ‌ها...',
      fxError: 'نرخ‌ها در دسترس نیست',
      dealsLabel: 'معاملات',
      totalLabel: 'ارزش کل',
      lastDealLabel: 'آخرین معامله',
      summaryTitle: 'خلاصه',
      complianceLabel: 'انطباق',
      shipTitle: 'اقلام ارسالی',
      importsTitle: 'اقلام وارداتی',
      projectsTitle: 'بازارهای کلیدی',
      projectsEmpty: 'هنوز جزئیاتی ثبت نشده است.',
      selectPrompt: 'یک کشور را انتخاب کنید',
      ctaBack: 'بازگشت به نقشه',
    },
  },
};


const ar: Omit<Translation, 'lang' | 'dir'> = {
  labels: {
    brand: 'زردشت مهد بينالود للتجارة',
    subbrand: 'تجارة السلع الدولية',
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      solutions: 'التجارة والخدمات اللوجستية',
      resources: 'الأسواق',
      about: 'من نحن',
      contact: 'اتصل بنا',
      tradeMap: 'خريطة التجارة',
      quality: 'الجودة',
      news: 'الأخبار',
    },
    trade: {
      tagline: 'تجارة السلع الدولية · آسيا الوسطى · روسيا',
      inquiry: 'إرسال استفسار تجاري',
      productGroups: 'فئات المنتجات',
      viewAllProducts: 'عرض جميع المنتجات',
      downloadCatalog: 'تنزيل كتالوج المنتجات (PDF)',
      energyBitumen: 'الطاقة والبيتومين',
      metalsSteel: 'المعادن والصلب',
      agriculturalCommodities: 'السلع الزراعية',
      textileRawMaterials: 'المواد الخام النسيجية',
    },
    footer: {
      company: 'الشركة',
      support: 'الدعم',
      contact: 'التواصل',
      tradeMap: 'خريطة التجارة',
      copyright: 'زردشت مهد بينالود للتجارة. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
    },
  },
  pages: {
    home: {
      title: 'تجارة السلع الدولية',
      eyebrow: 'تجارة السلع الدولية عبر آسيا الوسطى وروسيا',
      heroTitle: 'ربط مصادر التوريد بأسواق المنطقة',
      heroSubtitle: 'نستورد ونصدر السلع الصناعية والزراعية والمواد الخام للنسيج مع التركيز على التنفيذ العملي للتجارة العابرة للحدود.',
      heroImageAlt: 'عمليات تجارة ولوجستيات السلع الدولية',
      ctaPrimary: 'إرسال استفسار تجاري',
      ctaSecondary: 'استعراض المنتجات',
      stats: [
        { label: 'نموذج التجارة', value: 'استيراد وتصدير' },
        { label: 'المناطق الرئيسية', value: 'آسيا الوسطى + روسيا' },
        { label: 'مجموعات السلع', value: '4 مجموعات رئيسية' },
        { label: 'التنفيذ', value: 'من التوريد إلى التسليم' },
      ],
      trustTitle: 'كيف نعمل',
      trustBadges: [
        { title: 'معرفة الأسواق الإقليمية', description: 'تركيز تجاري على آسيا الوسطى وروسيا وممرات التجارة المجاورة.' },
        { title: 'تنفيذ التجارة العابرة للحدود', description: 'تنسيق معاملات الاستيراد والتصدير حسب السلعة والمسار وشروط التسليم.' },
        { title: 'توريد متعدد السلع', description: 'إدارة السلع الصناعية والزراعية والنسيجية ضمن علاقة تجارية واحدة.' },
      ],
      featuredTitle: 'تدفقات تجارية حقيقية، لا كتالوج لمنتج واحد',
      featuredList: [
        'تصدير البيتومين إلى أوزبكستان.',
        'استيراد الشعير من روسيا وتصدير الحديد والصلب إلى آسيا الوسطى.',
        'استيراد خيوط الحرير إلى جانب السلع الزراعية والصناعية.',
      ],
      categoriesTitle: 'ما الذي نتاجر به',
      categoriesIntro: 'أربع مجموعات سلعية تعكس نشاط الشركة الفعلي في الاستيراد والتصدير.',
      categories: [
        { name: 'الطاقة والبيتومين', description: 'توريد البيتومين للتصدير إلى أوزبكستان والفرص الإقليمية المؤهلة.', badge: 'EB', href: '/products#energy-bitumen' },
        { name: 'المعادن والصلب', description: 'توريد منتجات الحديد والصلب للمشترين في أسواق آسيا الوسطى.', badge: 'MS', href: '/products#metals-steel' },
        { name: 'السلع الزراعية', description: 'توريد الشعير من روسيا إلى جانب البقول والحبوب والسلع الزراعية المختارة.', badge: 'AG', href: '/products#agricultural-commodities' },
        { name: 'المواد الخام للنسيج', description: 'استيراد خيوط الحرير وتوريد المواد الخام للنسيج وفق المواصفات المطلوبة.', badge: 'TX', href: '/products#textile-raw-materials' },
      ],
      marketsTitle: 'الدول التي نعمل معها',
      marketsIntro: 'اضغط على أي علم لعرض ما نصدره ونستورده مع ذلك السوق.',
      marketsHomeLabel: 'إيران · المقر الرئيسي',
      countersTitle: 'عقدان من التجارة العابرة للحدود',
      countersIntro: 'خبرة مبنية على نشاط استيراد وتصدير فعلي، لا على كتالوج عام.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'سنة من الخبرة التجارية' },
        { key: 'groups', value: 4, suffix: '', label: 'مجموعات سلعية' },
        { key: 'lanes', value: 4, suffix: '', label: 'مسارات تجارية رئيسية' },
        { key: 'markets', value: 2, suffix: '', label: 'أسواق نشطة' },
      ],
      industriesTitle: 'تدفقات التجارة الرئيسية',
      industriesIntro: 'صورة واضحة لمسارات الاستيراد والتصدير التي تحدد نشاطنا الحالي.',
      industries: [
        { name: 'تصدير البيتومين إلى أوزبكستان', description: 'تصدير البيتومين إلى المشترين في أوزبكستان وفق المواصفات والشروط التجارية المتفق عليها.' },
        { name: 'استيراد الشعير من روسيا', description: 'توريد واستيراد الشعير من روسيا ضمن محفظة السلع الزراعية.' },
        { name: 'تصدير الصلب إلى آسيا الوسطى', description: 'تصدير منتجات الحديد والصلب إلى العملاء في أسواق آسيا الوسطى.' },
        { name: 'استيراد خيوط الحرير', description: 'استيراد خيوط الحرير كجزء من نشاطنا في المواد الخام للنسيج.' },
      ],
      faqTitle: 'أسئلة التجارة',
      faqIntro: 'المعلومات العملية التي يحتاجها المشترون والموردون عادة قبل بدء الصفقة.',
      faq: [
        { question: 'ما السلع التي تتاجرون بها؟', answer: 'تشمل مجموعاتنا الرئيسية البيتومين والمنتجات ذات الصلة، والحديد والصلب، والسلع الزراعية بما فيها الشعير والبقول، والمواد الخام للنسيج بما فيها خيوط الحرير.' },
        { question: 'ما الأسواق التي تركزون عليها؟', answer: 'يتركز نشاطنا الحالي على آسيا الوسطى وروسيا، مع تقييم فرص إقليمية أخرى حسب السلعة والمسار.' },
        { question: 'هل تعملون في الاستيراد والتصدير معًا؟', answer: 'نعم. تعمل الشركة على جانبي التجارة العابرة للحدود، من التصدير إلى آسيا الوسطى إلى الاستيراد من أسواق توريد مثل روسيا.' },
        { question: 'ما المعلومات المطلوبة في الاستفسار التجاري؟', answer: 'أرسل السلعة والمواصفات المطلوبة والكمية والمنشأ أو الوجهة وشروط التسليم المفضلة والجدول الزمني المستهدف.' },
      ],
    },
    products: {
      eyebrow: 'المنتجات', title: 'مجموعات سلعية للتجارة الإقليمية',
      intro: 'تشمل محفظتنا السلع الصناعية والزراعية والمواد الخام للنسيج. يتم تأكيد المواصفات النهائية والمنشأ والكمية وشروط التسليم لكل صفقة.',
      cta: 'إرسال استفسار تجاري',
      sections: productsData.ar,
    },
    solutions: {
      eyebrow: 'التجارة واللوجستيات', title: 'تجارة عابرة للحدود من التوريد إلى التسليم',
      intro: 'ننسق الخطوات التجارية واللوجستية المطلوبة لنقل السلع بين أسواق التوريد والوجهة.',
      partners: {
        eyebrow: 'الشركاء',
        title: 'لقاء الشركاء مباشرةً',
      },
      solutions: [
        { title: 'التوريد الدولي', description: 'تقييم خيارات الموردين وفق المواصفات والتوفر والسعر ومتطلبات التسليم.', tags: ['توريد', 'موردون', 'مواصفات'] },
        { title: 'تنفيذ التصدير', description: 'هيكلة معاملات التصدير حسب الوجهة والمواصفات والكمية والشروط المتفق عليها.', tags: ['تصدير', 'شروط', 'وجهة'] },
        { title: 'تنسيق الاستيراد', description: 'تنسيق الاستيراد من تأكيد المورد حتى مستندات الشحن وخطة التسليم.', tags: ['استيراد', 'مستندات', 'تسليم'] },
        { title: 'تخطيط اللوجستيات', description: 'اختيار المسار وطريقة النقل حسب السلعة والمنشأ والوجهة والحجم.', tags: ['طريق', 'سكك', 'متعدد الوسائط'] },
      ],
      outcomesTitle: 'كيف تبدأ الصفقة',
      outcomes: [
        { title: '1) المتطلبات', description: 'أرسل السلعة والمواصفات والكمية والمنشأ أو الوجهة والموعد المستهدف.' },
        { title: '2) التوريد والعرض', description: 'نقيّم التوريد المناسب ونعد العرض التجاري.' },
        { title: '3) الشروط', description: 'مواءمة المواصفات والسعر والدفع وشروط التسليم والمستندات.' },
        { title: '4) التنفيذ', description: 'تنسيق التوريد والنقل والمستندات العابرة للحدود للمسار المتفق عليه.' },
        { title: '5) متابعة التسليم', description: 'متابعة مراحل الصفقة حتى التسليم والإقفال التجاري.' },
      ],
    },
    resources: {
      eyebrow: 'الأسواق', title: 'الأسواق الإقليمية وممرات التجارة',
      intro: 'يعتمد نشاطنا على علاقات منشأ ووجهة محددة بدلًا من كتالوج عالمي عام.',
      cards: [
        { title: 'أوزبكستان', description: 'سوق وجهة حالي لصادرات الشركة من البيتومين.', badge: 'UZ' },
        { title: 'روسيا', description: 'سوق توريد رئيسي لواردات الشعير وفرص السلع الزراعية.', badge: 'RU' },
        { title: 'آسيا الوسطى', description: 'منطقة وجهة لصادرات الحديد والصلب وفرص تجارة B2B إضافية.', badge: 'CA' },
        { title: 'أسواق إقليمية أخرى', description: 'تُقيّم الفرص الأخرى حسب المنتج والمسار والمواصفات والملاءمة التجارية.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'من نحن', title: 'عن شركة زردشت مهد بينالود التجارية',
      intro: 'شركة تجارة دولية مقرها إيران ونشطة في أسواق السلع الصناعية والزراعية والمواد الخام للنسيج.',
      missionTitle: 'المهمة', missionBody: 'بناء تجارة عابرة للحدود موثوقة عبر ربط التوريد المؤهل بالطلب الحقيقي وإدارة كل صفقة بانضباط تجاري.',
      storyTitle: 'ما الذي نقوم به', storyBody: 'يشمل نشاطنا الاستيراد والتصدير: البيتومين إلى أوزبكستان، والحديد والصلب إلى آسيا الوسطى، والشعير من روسيا، واستيراد خيوط الحرير، وفرص سلعية أخرى.',
      valuesTitle: 'طريقة عملنا', values: ['مواصفات واضحة قبل الالتزام.', 'شروط تجارية مناسبة لكل صفقة.', 'تواصل موثوق مع المورد والمشتري.', 'تخطيط لوجستي عملي.', 'علاقات تجارية طويلة الأجل.'],
      leadershipTitle: 'الأسواق والشبكة', leadershipBody: 'يربط تركيزنا التجاري إيران بآسيا الوسطى وروسيا والأسواق المجاورة عبر علاقات توريد وبيع خاصة بكل سلعة.',
      metrics: [{ label: 'نموذج التجارة', value: 'استيراد وتصدير' }, { label: 'المناطق الرئيسية', value: 'آسيا الوسطى + روسيا' }, { label: 'المحفظة', value: 'صناعية، زراعية، نسيجية' }],
      cta: 'إرسال استفسار تجاري', mapTitle: 'موقعنا في إيران', mapAddress: 'زردشت مهد بينالود التجارية، إيران', mapCta: 'فتح في خرائط Google', mapZoomIn: 'تكبير', mapZoomOut: 'تصغير',
    },
    contact: {
      eyebrow: 'استفسار تجاري', title: 'أخبرنا بما تريد شراءه أو بيعه',
      intro: 'أرسل السلعة والمواصفات والكمية والمنشأ أو الوجهة وشروط التسليم المفضلة ليقيّم فريق التجارة الفرصة.',
      ...contactData.ar,
      quickLinks: ['إرسال استفسار تجاري', 'استعراض المنتجات', 'عرض خريطة التجارة'],
      whatsappIntro: 'مرحبًا، أرغب في مناقشة استفسار تجاري بخصوص سلعة.',
      whatsappGreeting: 'مرحبًا، أتواصل معكم من خلال موقعكم الإلكتروني (زردشت مهد بينالود للتجارة).',
      form: { name: 'الاسم الكامل', company: 'اسم الشركة', country: 'الدولة', email: 'البريد المهني', phone: 'الهاتف / واتساب', product: 'السلعة والمواصفات', quantity: 'الكمية', destination: 'المنشأ / الوجهة', incoterms: 'شروط التسليم المفضلة', message: 'ملاحظات / متطلبات', submit: 'إرسال الاستفسار' },
    },
    quality: {
      eyebrow: 'الجودة',
      title: 'كيف نضمن الجودة',
      intro: 'تمر كل شحنة بنفس خطوات تأكيد المواصفات والتقييم والتوثيق قبل مغادرتها إلى وجهتها.',
      pillars: [
        { title: 'تأكيد المواصفات مسبقًا', description: 'يتم الاتفاق على الدرجة والتعبئة والمتطلبات الفنية وتأكيدها قبل إتمام أي عملية شراء.', badge: '01' },
        { title: 'تقييم الموردين', description: 'تتم مقارنة خيارات الموردين وفق المواصفات والتوفر ومتطلبات التسليم لكل مجموعة سلعية.', badge: '02' },
        { title: 'توثيق يتماشى مع الوجهة', description: 'يتم إعداد مستندات التصدير والاستيراد لتتوافق مع متطلبات سوق المشتري قبل الشحن.', badge: '03' },
      ],
      processTitle: 'عملية الجودة لدينا',
      process: [
        { title: '1) المواصفات', description: 'تُؤكَّد الدرجة والتعبئة والمتطلبات التجارية لكل استفسار.' },
        { title: '2) فحص التوريد', description: 'تُقيَّم خيارات المورد أو المشتري وفق المواصفات المتفق عليها والجدول الزمني.' },
        { title: '3) التوثيق', description: 'تُعد مستندات الشحن والامتثال لتتوافق مع متطلبات الوجهة.' },
        { title: '4) تأكيد التسليم', description: 'تُؤكَّد تفاصيل الشحنة وفق الشروط المتفق عليها حتى التسليم.' },
      ],
    },
    news: {
      eyebrow: 'غرفة الأخبار',
      title: 'أخبار الشركة',
      intro: 'اجتماعات وزيارات وفعاليات من نشاطنا التجاري في المنطقة.',
      homeTitle: 'أحدث الأخبار',
      homeIntro: 'اجتماعات وزيارات وفعاليات حديثة.',
      readMore: 'اقرأ المزيد',
      allNews: 'كل الأخبار',
      back: 'العودة إلى الأخبار',
      empty: 'لم يتم نشر أي أخبار بعد.',
    },
    tradeMap: {
      title: 'خريطة التجارة',
      intro: 'استكشف أسواق التصدير النشطة حول العالم. اضغط على أي دولة مميزة لعرض التفاصيل.',
      highlightLegend: 'المميز = أسواق نشطة',
      greyLegend: 'الرمادي = لا نشاط بعد',
      activeCountLabel: 'دولة نشطة',
      statusTraded: 'نشط',
      statusNotTraded: 'غير نشط',
      statusLabel: 'الحالة',
      capitalLabel: 'العاصمة',
      currencyLabel: 'العملة',
      fxTitle: 'أسعار الصرف المباشرة',
      fxBaseLabel: 'الأساس',
      fxUpdatedLabel: 'آخر تحديث',
      fxLoading: 'جارٍ تحميل الأسعار...',
      fxError: 'الأسعار غير متاحة',
      dealsLabel: 'الصفقات',
      totalLabel: 'القيمة الإجمالية',
      lastDealLabel: 'آخر صفقة',
      summaryTitle: 'ملخص',
      complianceLabel: 'الامتثال',
      shipTitle: 'ما نشحنه',
      importsTitle: 'ما نستورده',
      projectsTitle: 'أبرز الأسواق',
      projectsEmpty: 'لا توجد تفاصيل بعد.',
      selectPrompt: 'اختر دولة',
      ctaBack: 'العودة إلى الخريطة',
    },
  },
};


const ru: Omit<Translation, 'lang' | 'dir'> = {
  labels: {
    brand: 'Zardasht Mahd Binaloud Trading',
    subbrand: 'Международная торговля сырьевыми товарами',
    nav: {
      home: 'Главная',
      products: 'Продукция',
      solutions: 'Торговля и логистика',
      resources: 'Рынки',
      about: 'О компании',
      contact: 'Контакты',
      tradeMap: 'Карта торговли',
      quality: 'Качество',
      news: 'Новости',
    },
    trade: {
      tagline: 'Международная торговля · Центральная Азия · Россия',
      inquiry: 'Отправить торговый запрос',
      productGroups: 'Товарные группы',
      viewAllProducts: 'Все продукты',
      downloadCatalog: 'Скачать каталог продукции (PDF)',
      energyBitumen: 'Энергия и битум',
      metalsSteel: 'Металлы и сталь',
      agriculturalCommodities: 'Сельхозпродукция',
      textileRawMaterials: 'Текстильное сырьё',
    },
    footer: {
      company: 'Компания',
      support: 'Поддержка',
      contact: 'Контакты',
      tradeMap: 'Карта торговли',
      copyright: 'Zardasht Mahd Binaloud Trading. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия обслуживания',
    },
  },
  pages: {
    home: {
      title: 'Международная торговля сырьевыми товарами',
      eyebrow: 'Международная торговля в Центральной Азии и России',
      heroTitle: 'Соединяем источники поставок с рынками региона',
      heroSubtitle: 'Мы импортируем и экспортируем промышленные, сельскохозяйственные и текстильные товары, уделяя основное внимание практической реализации трансграничных сделок.',
      heroImageAlt: 'Международная торговля сырьевыми товарами и логистика',
      ctaPrimary: 'Отправить торговый запрос', ctaSecondary: 'Смотреть товары',
      stats: [
        { label: 'Модель торговли', value: 'Импорт и экспорт' },
        { label: 'Основные регионы', value: 'Центральная Азия + Россия' },
        { label: 'Товарные группы', value: '4 основные группы' },
        { label: 'Исполнение', value: 'От закупки до поставки' },
      ],
      trustTitle: 'Как мы работаем',
      trustBadges: [
        { title: 'Знание региональных рынков', description: 'Коммерческий фокус на Центральной Азии, России и соседних торговых коридорах.' },
        { title: 'Трансграничное исполнение', description: 'Координация импортных и экспортных сделок с учетом товара, маршрута и условий поставки.' },
        { title: 'Многотоварный сорсинг', description: 'Промышленные, сельскохозяйственные и текстильные товары в рамках одного торгового партнерства.' },
      ],
      featuredTitle: 'Реальные торговые потоки, а не каталог одного товара',
      featuredList: ['Экспорт битума в Узбекистан.', 'Импорт ячменя из России и экспорт железа и стали в Центральную Азию.', 'Импорт шелковой пряжи наряду с сельскохозяйственными и промышленными товарами.'],
      categoriesTitle: 'Чем мы торгуем', categoriesIntro: 'Четыре товарные группы, основанные на реальной импортно-экспортной деятельности компании.',
      categories: [
        { name: 'Энергетика и битум', description: 'Экспортные поставки битума в Узбекистан и другие подходящие региональные рынки.', badge: 'EB', href: '/products#energy-bitumen' },
        { name: 'Металлы и сталь', description: 'Железо и стальная продукция для покупателей на рынках Центральной Азии.', badge: 'MS', href: '/products#metals-steel' },
        { name: 'Сельхозтовары', description: 'Ячмень из России, а также бобовые, зерновые и отдельные сельскохозяйственные товары.', badge: 'AG', href: '/products#agricultural-commodities' },
        { name: 'Текстильное сырье', description: 'Импорт шелковой пряжи и поставки текстильного сырья по требуемым спецификациям.', badge: 'TX', href: '/products#textile-raw-materials' },
      ],
      marketsTitle: 'Страны, с которыми мы работаем',
      marketsIntro: 'Нажмите на флаг, чтобы увидеть, что мы поставляем на этот рынок и закупаем на нём.',
      marketsHomeLabel: 'Иран · Головной офис',
      countersTitle: 'Два десятилетия трансграничной торговли',
      countersIntro: 'Опыт, построенный на реальной импортно-экспортной деятельности, а не на общем каталоге.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'Лет торгового опыта' },
        { key: 'groups', value: 4, suffix: '', label: 'Товарные группы' },
        { key: 'lanes', value: 4, suffix: '', label: 'Ключевые направления' },
        { key: 'markets', value: 2, suffix: '', label: 'Активные рынки' },
      ],
      industriesTitle: 'Ключевые торговые потоки', industriesIntro: 'Понятная картина импортных и экспортных направлений, формирующих текущий бизнес компании.',
      industries: [
        { name: 'Битум → Узбекистан', description: 'Экспорт битума покупателям в Узбекистане по согласованным спецификациям и коммерческим условиям.' },
        { name: 'Ячмень ← Россия', description: 'Закупка и импорт ячменя из России в рамках сельскохозяйственного портфеля.' },
        { name: 'Сталь → Центральная Азия', description: 'Экспорт железа и стальной продукции клиентам на рынках Центральной Азии.' },
        { name: 'Шелковая пряжа ← Импорт', description: 'Импорт шелковой пряжи как часть направления текстильного сырья.' },
      ],
      faqTitle: 'Вопросы о торговле', faqIntro: 'Практическая информация, которая обычно нужна покупателям и поставщикам до начала сделки.',
      faq: [
        { question: 'Какими товарами вы торгуете?', answer: 'Основные группы: битум и связанные товары, железо и сталь, сельхозтовары включая ячмень и бобовые, а также текстильное сырье включая шелковую пряжу.' },
        { question: 'На каких рынках вы сосредоточены?', answer: 'Текущая деятельность сосредоточена на Центральной Азии и России; другие региональные возможности оцениваются в зависимости от товара и маршрута.' },
        { question: 'Вы занимаетесь и импортом, и экспортом?', answer: 'Да. Компания работает с обеих сторон трансграничной торговли — от экспорта в Центральную Азию до импорта из рынков поставок, таких как Россия.' },
        { question: 'Что указать в торговом запросе?', answer: 'Укажите товар, требуемую спецификацию, объем, происхождение или назначение, предпочтительные условия поставки и желаемые сроки.' },
      ],
    },
    products: {
      eyebrow: 'Товары', title: 'Товарные группы для региональной торговли',
      intro: 'Наш портфель охватывает промышленные, сельскохозяйственные и текстильные товары. Финальные спецификации, происхождение, объем и условия поставки подтверждаются по каждой сделке.', cta: 'Отправить торговый запрос',
      sections: productsData.ru,
    },
    solutions: {
      eyebrow: 'Торговля и логистика', title: 'Трансграничная торговля от закупки до поставки',
      intro: 'Мы координируем коммерческие и логистические шаги, необходимые для перемещения товаров между рынками поставок и назначения.',
      partners: {
        eyebrow: 'Партнёры',
        title: 'Встречи с партнёрами лично',
      },
      solutions: [
        { title: 'Международный сорсинг', description: 'Поставщики оцениваются по спецификации, наличию, цене и требованиям к доставке.', tags: ['Сорсинг', 'Поставщики', 'Спецификация'] },
        { title: 'Экспортное исполнение', description: 'Экспортные сделки структурируются с учетом назначения, спецификации, объема и согласованных условий.', tags: ['Экспорт', 'Условия', 'Назначение'] },
        { title: 'Координация импорта', description: 'Импорт координируется от подтверждения поставщика до отгрузочных документов и доставки.', tags: ['Импорт', 'Документы', 'Доставка'] },
        { title: 'Логистическое планирование', description: 'Маршруты и виды транспорта выбираются с учетом товара, происхождения, назначения и объема.', tags: ['Авто', 'Ж/д', 'Мультимодально'] },
      ],
      outcomesTitle: 'Как начинается сделка', outcomes: [
        { title: '1) Потребность', description: 'Сообщите товар, спецификацию, объем, происхождение или назначение и желаемые сроки.' },
        { title: '2) Сорсинг и предложение', description: 'Мы оцениваем подходящий источник и готовим коммерческое предложение.' },
        { title: '3) Условия', description: 'Согласовываются спецификация, цена, оплата, условия поставки и документы.' },
        { title: '4) Исполнение', description: 'Координируются поставка, транспорт и трансграничные документы по согласованному маршруту.' },
        { title: '5) Контроль доставки', description: 'Этапы сделки отслеживаются до доставки и коммерческого закрытия.' },
      ],
    },
    resources: {
      eyebrow: 'Рынки', title: 'Региональные рынки и торговые коридоры',
      intro: 'Наш бизнес строится на конкретных связях между рынками происхождения и назначения, а не на абстрактном глобальном каталоге.',
      cards: [
        { title: 'Узбекистан', description: 'Текущий рынок назначения для экспорта битума компании.', badge: 'UZ' },
        { title: 'Россия', description: 'Ключевой рынок закупки ячменя и сельскохозяйственных возможностей.', badge: 'RU' },
        { title: 'Центральная Азия', description: 'Регион назначения для экспорта железа и стали и дополнительных B2B-возможностей.', badge: 'CA' },
        { title: 'Другие рынки региона', description: 'Дополнительные возможности оцениваются по товару, маршруту, спецификации и коммерческой целесообразности.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'О компании', title: 'Zardasht Mahd Binaloud Trading',
      intro: 'Иранская международная торговая компания, работающая с промышленными, сельскохозяйственными и текстильными товарами.',
      missionTitle: 'Миссия', missionBody: 'Создавать надежную трансграничную торговлю, соединяя квалифицированные источники поставок с реальным спросом и дисциплинированно управляя каждой сделкой.',
      storyTitle: 'Чем мы занимаемся', storyBody: 'Наша деятельность включает импорт и экспорт: битум в Узбекистан, железо и сталь в Центральную Азию, ячмень из России, импорт шелковой пряжи и другие товарные возможности.',
      valuesTitle: 'Как мы работаем', values: ['Четкие спецификации до обязательств.', 'Коммерческие условия под каждую сделку.', 'Надежная коммуникация с поставщиками и покупателями.', 'Практичное логистическое планирование.', 'Долгосрочные торговые отношения.'],
      leadershipTitle: 'Рынки и сеть', leadershipBody: 'Наш коммерческий фокус связывает Иран с Центральной Азией, Россией и соседними рынками через товарно-ориентированные отношения по закупке и продажам.',
      metrics: [{ label: 'Модель торговли', value: 'Импорт и экспорт' }, { label: 'Основные регионы', value: 'Центральная Азия + Россия' }, { label: 'Портфель', value: 'Промышленный, сельхоз, текстиль' }],
      cta: 'Отправить торговый запрос', mapTitle: 'Найти нас в Иране', mapAddress: 'Zardasht Mahd Binaloud Trading, Иран', mapCta: 'Открыть в Google Maps', mapZoomIn: 'Увеличить', mapZoomOut: 'Уменьшить',
    },
    contact: {
      eyebrow: 'Торговый запрос', title: 'Расскажите, что вы хотите купить или продать',
      intro: 'Укажите товар, спецификацию, объем, происхождение или назначение и предпочтительные условия поставки, чтобы наша торговая команда могла оценить возможность.',
      ...contactData.ru,
      quickLinks: ['Отправить торговый запрос', 'Смотреть товары', 'Карта торговли'],
      whatsappIntro: 'Здравствуйте, хочу обсудить торговый запрос по товару.',
      whatsappGreeting: 'Здравствуйте, я обращаюсь к вам через ваш сайт (Zardasht Mahd Binaloud Trading).',
      form: { name: 'Имя и фамилия', company: 'Компания', country: 'Страна', email: 'Рабочий email', phone: 'Телефон / WhatsApp', product: 'Товар и спецификация', quantity: 'Объем', destination: 'Происхождение / назначение', incoterms: 'Предпочтительные условия поставки', message: 'Примечания / требования', submit: 'Отправить запрос' },
    },
    quality: {
      eyebrow: 'Качество',
      title: 'Как мы обеспечиваем качество',
      intro: 'Каждая партия проходит одинаковые этапы согласования спецификации, оценки и оформления документов перед отправкой.',
      pillars: [
        { title: 'Спецификация согласуется заранее', description: 'Марка, упаковка и технические требования согласовываются и подтверждаются до завершения любой закупки.', badge: '01' },
        { title: 'Оценка поставщиков', description: 'Варианты поставщиков сравниваются по спецификации, наличию и требованиям к доставке для каждой товарной группы.', badge: '02' },
        { title: 'Документы под конкретное направление', description: 'Экспортные и импортные документы готовятся в соответствии с требованиями рынка покупателя перед отгрузкой.', badge: '03' },
      ],
      processTitle: 'Наш процесс контроля качества',
      process: [
        { title: '1) Спецификация', description: 'Марка, упаковка и коммерческие требования подтверждаются для каждого запроса.' },
        { title: '2) Проверка поставки', description: 'Варианты поставщика или покупателя оцениваются по согласованной спецификации и срокам.' },
        { title: '3) Документы', description: 'Отгрузочные и разрешительные документы готовятся в соответствии с требованиями направления.' },
        { title: '4) Подтверждение доставки', description: 'Детали поставки подтверждаются по согласованным условиям вплоть до доставки.' },
      ],
    },
    news: {
      eyebrow: 'Пресс-центр',
      title: 'Новости компании',
      intro: 'Встречи, визиты и события из нашей торговой деятельности в регионе.',
      homeTitle: 'Последние новости',
      homeIntro: 'Недавние встречи, визиты и события.',
      readMore: 'Подробнее',
      allNews: 'Все новости',
      back: 'Назад к новостям',
      empty: 'Новостей пока нет.',
    },
    tradeMap: {
      title: 'Карта торговли',
      intro: 'Посмотрите наши активные рынки по всему миру. Нажмите на выделенную страну, чтобы увидеть детали.',
      highlightLegend: 'Выделено = активные рынки',
      greyLegend: 'Серый = пока без активности',
      activeCountLabel: 'активных стран',
      statusTraded: 'Активно',
      statusNotTraded: 'Неактивно',
      statusLabel: 'Статус',
      capitalLabel: 'Столица',
      currencyLabel: 'Валюта',
      fxTitle: 'Актуальные курсы',
      fxBaseLabel: 'База',
      fxUpdatedLabel: 'Обновлено',
      fxLoading: 'Загрузка курсов...',
      fxError: 'Курсы недоступны',
      dealsLabel: 'Сделки',
      totalLabel: 'Общая сумма',
      lastDealLabel: 'Последняя сделка',
      summaryTitle: 'Сводка',
      complianceLabel: 'Соответствие',
      shipTitle: 'Что поставляем',
      importsTitle: 'Что импортируем',
      projectsTitle: 'Ключевые рынки',
      projectsEmpty: 'Пока нет деталей.',
      selectPrompt: 'Выберите страну',
      ctaBack: 'Назад к карте',
    },
  },
};


const translations: Record<LanguageCode, Translation> = {
  en: { lang: 'en', dir: 'ltr', ...en },
  fa: { lang: 'fa', dir: 'rtl', ...fa },
  ar: { lang: 'ar', dir: 'rtl', ...ar },
  ru: { lang: 'ru', dir: 'ltr', ...ru },
};

const languageCodes = languages.map(({ code }) => code) as LanguageCode[];

export const resolveLang = (lang?: string): LanguageCode =>
  lang && languageCodes.includes(lang as LanguageCode) ? (lang as LanguageCode) : defaultLang;

export const getTranslation = (lang?: string): Translation => translations[resolveLang(lang)];

export const localizedLanguages = languages.filter((language) => language.code !== defaultLang);

const normalizePath = (path = '/') => (path.startsWith('/') ? path : `/${path}`);

export const withLanguagePrefix = (lang: LanguageCode, path = '/') => {
  const normalizedPath = normalizePath(path);
  if (lang === defaultLang) {
    return normalizedPath;
  }
  return normalizedPath === '/' ? `/${lang}` : `/${lang}${normalizedPath}`;
};

export const stripLangFromPath = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && languageCodes.includes(segments[0] as LanguageCode)) {
    segments.shift();
  }
  const rebuilt = segments.join('/');
  return rebuilt ? `/${rebuilt}` : '/';
};

