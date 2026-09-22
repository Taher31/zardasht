import contactData from './data/contact.json';
import productsData from './data/products.json';

export type LanguageCode = "en" | "fa" | "ar" | "ru";

export interface Translation {
  lang: LanguageCode;
  dir: 'ltr' | 'rtl';
  labels: {
    brand: string;
    /**
     * Short brand form used only as the <title> suffix. The full brand costs
     * 28-33 characters, which leaves no room for a page title inside the ~60
     * Google renders; this keeps the site identifiable without eating the
     * whole line. Everything visible on the page still uses `brand`.
     */
    brandShort: string;
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
      chemicalsPetrochemicals: string;
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
      rail: { eyebrow: string; title: string; body: string };
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
    brandShort: 'Zardasht Trading',
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
      tagline: 'International Commodity Trading · Sourced at Origin · Delivered at Destination',
      inquiry: 'Send Trade Inquiry',
      productGroups: 'Product Groups',
      viewAllProducts: 'View all products',
      downloadCatalog: 'Download Product Catalog (PDF)',
      energyBitumen: 'Energy & Bitumen',
      metalsSteel: 'Metals & Steel',
      agriculturalCommodities: 'Agricultural Commodities',
      textileRawMaterials: 'Textile Raw Materials',
      chemicalsPetrochemicals: 'Chemicals & Petrochemicals',
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
      eyebrow: 'International raw material supply for manufacturers and wholesale buyers',
      heroTitle: 'Raw materials sourced at origin, delivered to your door',
      heroSubtitle: 'We buy at origin and deliver to your door — freight, customs and payment included. What you take delivery of is the cargo, not a stack of paperwork to sort out yourself.',
      heroImageAlt: 'International commodity trade and logistics operations',
      ctaPrimary: 'Send Trade Inquiry',
      ctaSecondary: 'Explore Products',
      stats: [
        { label: 'Service', value: 'Sourcing to delivery' },
        { label: 'Buyers', value: 'Manufacturers & wholesalers' },
        { label: 'Commodity groups', value: '5 core groups' },
        { label: 'Experience', value: '20+ years' },
      ],
      trustTitle: 'Why buyers work with us',
      trustBadges: [
        { title: 'Straight from the producer', description: 'We deal with the mills themselves, not a middleman.' },
        { title: 'Checked before it moves', description: 'We stand at the loading ourselves and check the packing.' },
        { title: 'Payment sorted', description: 'We find a way to pay even where the banking is difficult.' },
      ],
      featuredTitle: 'Real trade flows, not a single-product catalog',
      featuredList: [
        'Bitumen exports to Uzbekistan.',
        'Barley imports from Russia and steel exports to Central Asia.',
        'Silk yarn imports alongside agricultural and industrial commodities.',
      ],
      categoriesTitle: 'What we trade',
      categoriesIntro: 'Five groups of raw materials for production.',
      categories: [
        { name: 'Agricultural Commodities', description: 'Barley, pulses and grains.', badge: 'AG', href: '/products/agricultural-commodities' },
        { name: 'Chemicals & Petrochemicals', description: 'Supplied to a confirmed technical specification.', badge: 'CP', href: '/products/chemicals-petrochemicals' },
        { name: 'Energy & Bitumen', description: 'Bitumen for export, primarily to Uzbekistan.', badge: 'EB', href: '/products/energy-bitumen' },
        { name: 'Metals & Steel', description: 'Iron and steel for Central Asian buyers.', badge: 'MS', href: '/products/metals-steel' },
        { name: 'Textile Raw Materials', description: 'Silk yarn and specification-based sourcing.', badge: 'TX', href: '/products/textile-raw-materials' },
      ],
      marketsTitle: 'Countries we work with',
      marketsIntro: 'Select a flag to see what we move in and out of that market.',
      marketsHomeLabel: 'Iran · Home base',
      countersTitle: 'Two decades of cross-border trade',
      countersIntro: 'Earned on real shipments, not a catalogue.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'Years of trading experience' },
        { key: 'groups', value: 5, suffix: '', label: 'Commodity groups' },
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
      faqIntro: 'What buyers usually ask first.',
      faq: [
        { question: 'Do you handle freight and customs clearance?', answer: 'Yes — we deliver to the agreed destination, not just to the port.' },
        { question: 'How are payments arranged?', answer: 'Deal by deal, including markets where the usual banking channels are difficult. We put the terms in writing before anything moves.' },
        { question: 'What should I include in an inquiry?', answer: 'Commodity, specification, quantity, destination and your target timeline.' },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'Commodity groups for regional trade',
      intro: 'Agricultural, chemical, energy, metal and textile raw materials. Specification and terms are confirmed per order.',
      cta: 'Send Trade Inquiry',
      sections: productsData.en,
    },
    solutions: {
      eyebrow: 'Trade & Logistics',
      title: 'From the producing country to your delivery point',
      intro: 'One counterparty for the whole chain, from purchase at origin to delivery at destination.',
      rail: {
        eyebrow: 'Rail Freight',
        title: 'Bulk cargo by rail',
        body: 'Bulk volumes move the Iran, Central Asia and Russia corridors under a single contract.',
      },
      solutions: [
        { title: 'Sourcing at origin', description: 'Bought direct from producers on quality, price and lead time.', tags: ['Sourcing', 'Producers', 'Price'] },
        { title: 'Pre-shipment inspection', description: 'We attend loading and check packing against the specification.', tags: ['Inspection', 'Packing', 'Loading'] },
        { title: 'Freight & vehicle selection', description: 'Route and vehicle chosen for the commodity — road, rail or multimodal.', tags: ['Road', 'Rail', 'Multimodal'] },
        { title: 'Customs clearance', description: 'Export and import formalities handled on your behalf.', tags: ['Customs', 'Documents', 'Compliance'] },
        { title: 'Delivery at destination', description: 'Followed through to the agreed delivery point.', tags: ['Delivery', 'Destination', 'Handover'] },
        { title: 'Payment & settlement', description: 'Arranged per transaction, including hard-to-bank markets.', tags: ['Payment', 'Settlement', 'Terms'] },
      ],
      outcomesTitle: 'How a trade starts',
      outcomes: [
        { title: '1) Requirement', description: 'You send the commodity, specification, quantity and destination.' },
        { title: '2) Sourcing & quote', description: 'We find the supply and quote a delivered price.' },
        { title: '3) Terms', description: 'Price, payment and delivery terms agreed in writing.' },
        { title: '4) Loading & transport', description: 'Loading inspected at origin, transport booked.' },
        { title: '5) Clearance & delivery', description: 'Cleared through customs and handed over at destination.' },
      ],
    },
    resources: {
      eyebrow: 'Markets',
      title: 'Regional markets and trade corridors',
      intro: 'Built on specific origin and destination relationships, not a generic global catalogue.',
      cards: [
        { title: 'Uzbekistan', description: 'Destination market for our bitumen exports.', badge: 'UZ' },
        { title: 'Russia', description: 'Sourcing market for barley and agricultural commodities.', badge: 'RU' },
        { title: 'Central Asia', description: 'Destination for iron and steel exports.', badge: 'CA' },
        { title: 'Other Regional Markets', description: 'Evaluated case by case on product, route and terms.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'About us',
      title: 'About Zardasht Mahd Binaloud Trading',
      intro: 'An Iran-based trading company supplying raw materials to manufacturers and wholesale buyers abroad.',
      missionTitle: 'Mission',
      missionBody: 'Deliver the commodity ordered — at assured quality, a fair price and the lowest total cost — and carry the execution risk in between.',
      storyTitle: 'What we do',
      storyBody: 'We buy at origin, arrange freight, clear customs and deliver at destination.',
      valuesTitle: 'How we operate',
      values: [
        'Specifications confirmed in writing before commitment.',
        'Direct relationships with producers in each sector.',
        'Inspection at loading, not on arrival.',
        'Payment and settlement arranged for each transaction.',
        'Long-term trading relationships over single deals.',
      ],
      leadershipTitle: 'Markets & network',
      leadershipBody: 'Twenty years of trading has built a network of producers, freight partners and clearing agents — the reason we can quote a delivered price and hold to it.',
      metrics: [
        { label: 'Service', value: 'Sourcing to delivery' },
        { label: 'Buyers', value: 'Manufacturers & wholesalers' },
        { label: 'Portfolio', value: 'Agricultural, chemical, petrochemical' },
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
      intro: 'Quality is decided at origin, not on arrival.',
      pillars: [
        { title: 'Specification agreed first', description: 'Grade, purity and packaging confirmed in writing before we commit to a supplier.', badge: '01' },
        { title: 'Inspection at loading', description: 'We attend loading and check packing against the specification.', badge: '02' },
        { title: 'Transport chosen for the cargo', description: 'Vehicle and route selected to suit the commodity.', badge: '03' },
      ],
      processTitle: 'Our quality process',
      process: [
        { title: '1) Specification', description: 'Grade, purity and packaging confirmed against your inquiry.' },
        { title: '2) Supplier selection', description: 'Producers compared on quality, price and lead time.' },
        { title: '3) Loading & inspection', description: 'Packing and vehicle checked at origin before departure.' },
        { title: '4) Documents & delivery', description: 'Clearance documents prepared and the shipment followed to delivery.' },
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
    brandShort: 'زردشت مهد بینالود',
    subbrand: 'بازرگانی بین‌المللی',
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
      tagline: 'تأمین، تجارت و لجستیک بین‌المللی',
      inquiry: 'ارسال درخواست تجاری',
      productGroups: 'گروه‌های کالایی',
      viewAllProducts: 'مشاهده همه محصولات',
      downloadCatalog: 'دانلود کاتالوگ محصولات (PDF)',
      energyBitumen: 'انرژی و قیر',
      metalsSteel: 'فلزات و فولاد',
      agriculturalCommodities: 'محصولات کشاورزی',
      textileRawMaterials: 'مواد اولیه نساجی',
      chemicalsPetrochemicals: 'مواد شیمیایی و پتروشیمی',
    },
    footer: {
      company: 'شرکت',
      support: 'پشتیبانی',
      contact: 'تماس',
      tradeMap: 'نقشه تجارت',
      copyright: 'بازرگانی زردشت مهد بینالود. تمامی حقوق محفوظ است.',
      privacy: 'حریم خصوصی',
      terms: 'شرایط استفاده',
    },
  },
  pages: {
    home: {
      title: 'بازرگانی بین‌المللی',
      eyebrow: 'تأمین بین‌المللی مواد اولیه و کالاهای خام',
      heroTitle: 'مواد اولیه را از مبدأ می‌خریم، درِ انبار شما تحویل می‌دهیم',
      heroSubtitle: 'از پیدا کردن تأمین‌کننده و خرید تا حمل، ترخیص و تسویه، همه‌اش با ماست. چیزی که تحویل می‌گیرید بار است، نه یک پرونده کاغذ که خودتان باید حلش کنید.',
      heroImageAlt: 'عملیات تجارت و لجستیک بین‌المللی کالا',
      ctaPrimary: 'ارسال درخواست تجاری',
      ctaSecondary: 'مشاهده محصولات',
      stats: [
        { label: 'خدمات', value: 'از تأمین تا تحویل' },
        { label: 'مشتریان', value: 'تولیدکنندگان و عمده‌فروشان' },
        { label: 'گروه‌های کالایی', value: '۵ گروه اصلی' },
        { label: 'تجربه', value: 'بیش از ۲۰ سال' },
      ],
      trustTitle: 'چرا با ما کار می‌کنند',
      trustBadges: [
        { title: 'خرید مستقیم از تولیدکننده', description: 'با خودِ کارخانه طرفیم، نه با واسطه.' },
        { title: 'کنترل قبل از حرکت بار', description: 'موقع بارگیری خودمان سرِ بار هستیم و بسته‌بندی را چک می‌کنیم.' },
        { title: 'پرداخت و تسویه', description: 'حتی جایی که کار با بانک سخت است، راه پرداخت را پیدا می‌کنیم.' },
      ],
      featuredTitle: 'یک طرف قرارداد برای کل مسیر',
      featuredList: [
        'خرید مستقیم از تولیدکننده، بدون واسطه.',
        'حمل، ترخیص و تحویل متناسب با نوع بار و مقصد.',
        'بازرسی، اسناد و پرداخت، همه زیر یک قرارداد.',
      ],
      categoriesTitle: 'چه کالاهایی کار می‌کنیم',
      categoriesIntro: 'پنج گروه کالا که خط تولید مشتری‌های ما با آن‌ها کار می‌کند.',
      categories: [
        { name: 'کالاهای کشاورزی', description: 'غلات، حبوبات و سایر مواد اولیه و محصولات کشاورزی.', badge: 'AG', href: '/products/agricultural-commodities' },
        { name: 'مواد شیمیایی و پتروشیمی', description: 'تأمین بر اساس مشخصات فنی، کیفیت و شرایط موردنظر خریدار.', badge: 'CP', href: '/products/chemicals-petrochemicals' },
        { name: 'انرژی و قیر', description: 'تجارت محصولات انرژی و فرآورده‌های مرتبط بر اساس نیاز بازار.', badge: 'EB', href: '/products/energy-bitumen' },
        { name: 'فلزات و فولاد', description: 'تأمین و تجارت محصولات فلزی و فولادی برای مصارف صنعتی و تجاری.', badge: 'MS', href: '/products/metals-steel' },
        { name: 'مواد اولیه نساجی', description: 'تأمین مواد اولیه نساجی مطابق مشخصات و حجم سفارش.', badge: 'TX', href: '/products/textile-raw-materials' },
      ],
      marketsTitle: 'بازارها و مسیرهای تجاری',
      marketsIntro: 'روی پرچم هر کشور بزنید تا ببینید چه چیزی به آنجا می‌فرستیم و چه چیزی از آنجا می‌آوریم.',
      marketsHomeLabel: 'ایران · دفتر مرکزی',
      countersTitle: 'دو دهه کار در تجارت فرامرزی',
      countersIntro: 'تجربه‌ای که از کار واقعی واردات و صادرات به دست آمده، نه از یک کاتالوگ.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'سال تجربه تجاری' },
        { key: 'groups', value: 5, suffix: '', label: 'گروه کالایی' },
        { key: 'lanes', value: 4, suffix: '', label: 'مسیر اصلی تجارت' },
        { key: 'markets', value: 2, suffix: '', label: 'بازار فعال' },
      ],
      industriesTitle: 'حوزه‌های اصلی فعالیت',
      industriesIntro: 'خدمات بازرگانی ما متناسب با نیاز مشتری، نوع کالا و شرایط بازار در حوزه‌های مختلف ارائه می‌شود.',
      industries: [
        { name: 'تأمین و صادرات مواد اولیه', description: 'تأمین کالا از منابع معتبر و مدیریت فرآیند صادرات بر اساس مشخصات و شرایط توافق‌شده.' },
        { name: 'واردات مواد مورد نیاز تولید', description: 'شناسایی منابع تأمین، خرید و واردات مواد اولیه متناسب با نیاز تولیدکنندگان.' },
        { name: 'تجارت کالاهای کشاورزی و صنعتی', description: 'مدیریت معاملات عمده با تمرکز بر کیفیت، قیمت، زمان‌بندی و تحویل مناسب.' },
        { name: 'تجارت مواد شیمیایی و پتروشیمی', description: 'تأمین و مبادله محصولات بر پایه مشخصات فنی، الزامات تجاری و شرایط بازار.' },
      ],
      faqTitle: 'سوال‌هایی که زیاد می‌پرسند',
      faqIntro: 'چیزهایی که معمولاً قبل از استعلام قیمت می‌خواهند بدانند.',
      faq: [
        { question: 'حمل و ترخیص را هم خودتان انجام می‌دهید؟', answer: 'بله. بار را تا مقصدی که توافق کرده‌ایم می‌رسانیم، نه فقط تا بندر.' },
        { question: 'پرداخت چطور انجام می‌شود؟', answer: 'برای هر معامله جداگانه، حتی در بازارهایی که کار با بانک سخت است. شرایطش را از قبل مکتوب می‌کنیم.' },
        { question: 'برای استعلام چه اطلاعاتی بفرستیم؟', answer: 'نام کالا، مشخصات، مقدار، مقصد و اینکه تا چه زمانی بار را لازم دارید.' },
      ],
    },
    products: {
      eyebrow: 'محصولات',
      title: 'گروه‌های کالایی و مواد اولیه',
      intro: 'مواد اولیه کشاورزی، شیمیایی، پتروشیمی، انرژی، فلزی و نساجی. مشخصات و شرایط تحویل را برای هر سفارش جدا توافق می‌کنیم.',
      cta: 'ارسال درخواست تجاری',
      sections: productsData.fa,
    },
    solutions: {
      eyebrow: 'تجارت و لجستیک',
      title: 'از تأمین در مبدأ تا تحویل در مقصد',
      intro: 'مدیریت یکپارچه زنجیره تجارت؛ از انتخاب تأمین‌کننده و خرید تا حمل، ترخیص، تسویه و تحویل کالا.',
      rail: {
        eyebrow: 'حمل ریلی',
        title: 'راهکارهای حمل ریلی',
        body: 'برای محموله‌های عمده، مسیر حمل بر اساس نوع کالا، مقصد، زمان‌بندی و صرفه اقتصادی انتخاب و مدیریت می‌شود.',
      },
      solutions: [
        { title: 'تأمین از مبدأ', description: 'شناسایی و انتخاب تولیدکننده یا تأمین‌کننده مناسب بر اساس کیفیت، قیمت و زمان تحویل.', tags: ['تأمین', 'تولیدکننده', 'قیمت'] },
        { title: 'بازرسی پیش از حمل', description: 'کنترل بارگیری، بسته‌بندی و انطباق کالا با مشخصات توافق‌شده پیش از ارسال.', tags: ['بازرسی', 'بسته‌بندی', 'بارگیری'] },
        { title: 'حمل و انتخاب روش مناسب', description: 'انتخاب مسیر و روش حمل متناسب با نوع کالا، مقصد و شرایط معامله؛ جاده‌ای، ریلی یا ترکیبی.', tags: ['جاده', 'ریل', 'ترکیبی'] },
        { title: 'ترخیص گمرکی', description: 'هماهنگی اسناد و تشریفات گمرکی مورد نیاز برای صادرات یا واردات کالا.', tags: ['گمرک', 'اسناد', 'انطباق'] },
        { title: 'تحویل در مقصد', description: 'پیگیری محموله تا نقطه تحویل توافق‌شده و هماهنگی مراحل نهایی تحویل.', tags: ['تحویل', 'مقصد', 'تحویل‌گیری'] },
        { title: 'پرداخت و تسویه', description: 'هماهنگی روش‌های پرداخت و تسویه متناسب با شرایط هر معامله و الزامات طرفین.', tags: ['پرداخت', 'تسویه', 'شرایط'] },
      ],
      outcomesTitle: 'فرآیند شروع همکاری',
      outcomes: [
        { title: '۱) اعلام نیاز', description: 'کالا، مشخصات، مقدار، مبدأ یا مقصد و زمان‌بندی موردنظر را اعلام کنید.' },
        { title: '۲) بررسی تأمین و قیمت', description: 'منابع مناسب بررسی و پیشنهاد تجاری متناسب با درخواست شما ارائه می‌شود.' },
        { title: '۳) توافق شرایط', description: 'قیمت، روش پرداخت، زمان‌بندی و شرایط تحویل به‌صورت شفاف توافق می‌شود.' },
        { title: '۴) بارگیری و حمل', description: 'بارگیری کنترل و روش حمل مناسب برای اجرای سفارش هماهنگ می‌شود.' },
        { title: '۵) ترخیص و تحویل', description: 'مراحل ترخیص پیگیری و کالا در نقطه توافق‌شده تحویل می‌شود.' },
      ],
    },
    resources: {
      eyebrow: 'بازارها',
      title: 'بازارها و مسیرهای تجاری منطقه‌ای',
      intro: 'هر فرصت تجاری بر اساس نوع کالا، مبدأ، مقصد، الزامات اجرایی و شرایط بازار به‌صورت جداگانه ارزیابی می‌شود.',
      cards: [
        { title: 'ازبکستان', description: 'بررسی فرصت‌های تأمین، صادرات و همکاری تجاری بر اساس نوع کالا و شرایط معامله.', badge: 'UZ' },
        { title: 'روسیه', description: 'بررسی منابع تأمین و فرصت‌های تجاری متناسب با نیاز مشتریان و شرایط بازار.', badge: 'RU' },
        { title: 'آسیای مرکزی', description: 'فعالیت و توسعه مسیرهای تجاری متناسب با کالا، مقصد و نیاز خریداران منطقه.', badge: 'CA' },
        { title: 'سایر بازارهای منطقه', description: 'امکان همکاری در سایر بازارها بر اساس کالا، مسیر، مقررات و شرایط معامله بررسی می‌شود.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'درباره ما',
      title: 'درباره بازرگانی زردشت مهد بینالود',
      intro: 'یک مجموعه بازرگانی بین‌المللی مستقر در ایران، فعال در تأمین، واردات و صادرات مواد اولیه و کالاهای مورد نیاز تولیدکنندگان، عمده‌فروشان و خریداران تجاری.',
      missionTitle: 'ماموریت ما',
      missionBody: 'ایجاد مسیری مطمئن، شفاف و کارآمد برای تأمین و تجارت کالا؛ با تمرکز بر کیفیت مورد انتظار، قیمت رقابتی، زمان‌بندی مناسب و مدیریت دقیق فرآیند اجرا.',
      storyTitle: 'چه کاری انجام می‌دهیم',
      storyBody: 'از شناسایی و خرید از منبع تأمین تا بازرسی، حمل، ترخیص، تسویه و تحویل در مقصد، مراحل اصلی معامله را هماهنگ و مدیریت می‌کنیم.',
      valuesTitle: 'اصول کاری ما',
      values: [
        'توافق شفاف بر مشخصات، قیمت و شرایط معامله پیش از اجرا.',
        'ارتباط مؤثر با تولیدکنندگان و تأمین‌کنندگان هر حوزه.',
        'کنترل بارگیری و بسته‌بندی پیش از ارسال محموله.',
        'هماهنگی اسناد، پرداخت و تسویه متناسب با شرایط هر معامله.',
        'تمرکز بر اعتماد، پاسخ‌گویی و همکاری‌های تجاری بلندمدت.',
      ],
      leadershipTitle: 'شبکه و توان اجرایی',
      leadershipBody: 'تجربه تیم و شبکه بین‌المللی تأمین، حمل و خدمات تجاری به ما کمک می‌کند تا برای هر سفارش، راهکاری متناسب با کالا، مسیر، زمان‌بندی و شرایط معامله ارائه کنیم.',
      metrics: [
        { label: 'خدمات', value: 'از تأمین تا تحویل' },
        { label: 'مشتریان', value: 'تولیدکنندگان و عمده‌فروشان' },
        { label: 'حوزه فعالیت', value: 'مواد اولیه و کالاهای تجاری' },
      ],
      cta: 'ارسال درخواست تجاری',
      mapTitle: 'موقعیت ما در ایران', mapAddress: 'بازرگانی زردشت مهد بینالود، ایران', mapCta: 'مشاهده در Google Maps', mapZoomIn: 'بزرگ‌نمایی', mapZoomOut: 'کوچک‌نمایی',
    },
    contact: {
      eyebrow: 'درخواست تجاری',
      title: 'نیاز تجاری خود را با ما در میان بگذارید',
      intro: 'اطلاعات کالا، مشخصات، مقدار، مبدأ یا مقصد و شرایط تحویل موردنظر را ارسال کنید تا تیم بازرگانی امکان تأمین یا انجام معامله را بررسی کند.',
      ...contactData.fa,
      quickLinks: ['ارسال درخواست تجاری', 'مشاهده محصولات', 'مشاهده نقشه تجارت'],
      whatsappIntro: 'سلام، برای بررسی یک درخواست تجاری در ارتباط هستم.',
      whatsappGreeting: 'سلام، از طریق وب‌سایت بازرگانی زردشت مهد بینالود با شما در تماس هستم.',
      form: {
        name: 'نام و نام خانوادگی', company: 'نام شرکت', country: 'کشور', email: 'ایمیل کاری', phone: 'تلفن / واتساپ',
        product: 'نام کالا و مشخصات', quantity: 'مقدار', destination: 'مبدأ / مقصد', incoterms: 'شرایط تحویل ترجیحی',
        message: 'توضیحات و الزامات', submit: 'ارسال درخواست',
      },
    },
    quality: {
      eyebrow: 'کیفیت',
      title: 'چگونه کیفیت را مدیریت می‌کنیم',
      intro: 'کنترل کیفیت از پیش از خرید آغاز می‌شود و تا زمان بارگیری و تحویل ادامه دارد.',
      pillars: [
        { title: 'توافق بر مشخصات پیش از خرید', description: 'مشخصات فنی، کیفیت، گرید و نوع بسته‌بندی پیش از ثبت سفارش به‌صورت شفاف تعیین می‌شود.', badge: '01' },
        { title: 'کنترل هنگام بارگیری', description: 'بارگیری، بسته‌بندی و وضعیت محموله پیش از ارسال بر اساس شرایط توافق‌شده بررسی می‌شود.', badge: '02' },
        { title: 'انتخاب روش حمل متناسب با کالا', description: 'وسیله، مسیر و شرایط حمل با توجه به ماهیت کالا، مقصد و الزامات سفارش انتخاب می‌شود.', badge: '03' },
      ],
      processTitle: 'فرآیند کنترل کیفیت',
      process: [
        { title: '۱) تعیین مشخصات', description: 'مشخصات فنی، کیفیت و بسته‌بندی مورد انتظار پیش از خرید تأیید می‌شود.' },
        { title: '۲) انتخاب تأمین‌کننده', description: 'منابع تأمین از نظر کیفیت، قیمت، سابقه و توان تحویل بررسی و مقایسه می‌شوند.' },
        { title: '۳) بارگیری و بازرسی', description: 'بسته‌بندی، بارگیری و شرایط حمل پیش از حرکت محموله کنترل می‌شود.' },
        { title: '۴) اسناد و تحویل', description: 'اسناد مورد نیاز هماهنگ و وضعیت محموله تا رسیدن به مقصد پیگیری می‌شود.' },
      ],
    },
    news: {
      eyebrow: 'اخبار',
      title: 'اخبار و رویدادهای شرکت',
      intro: 'آخرین اخبار، دیدارها، بازدیدها و رویدادهای مرتبط با فعالیت‌های تجاری و توسعه همکاری‌های بین‌المللی.',
      homeTitle: 'آخرین اخبار',
      homeIntro: 'تازه‌ترین اخبار و رویدادهای مرتبط با فعالیت‌های شرکت.',
      readMore: 'ادامه مطلب',
      allNews: 'همه اخبار',
      back: 'بازگشت به اخبار',
      empty: 'در حال حاضر خبری منتشر نشده است.',
    },
    tradeMap: {
      title: 'نقشه تجارت',
      intro: 'بازارها و مسیرهای تجاری فعال را مشاهده کنید و برای آشنایی بیشتر با هر بازار، کشور موردنظر را انتخاب کنید.',
      highlightLegend: 'برجسته = بازار فعال',
      greyLegend: 'خاکستری = بدون فعالیت ثبت‌شده',
      activeCountLabel: 'بازار فعال',
      statusTraded: 'فعال',
      statusNotTraded: 'غیرفعال',
      statusLabel: 'وضعیت',
      capitalLabel: 'پایتخت',
      currencyLabel: 'واحد پول',
      fxTitle: 'نرخ ارز',
      fxBaseLabel: 'ارز مبنا',
      fxUpdatedLabel: 'آخرین به‌روزرسانی',
      fxLoading: 'در حال دریافت نرخ‌ها...',
      fxError: 'نرخ‌ها در دسترس نیستند',
      dealsLabel: 'معاملات',
      totalLabel: 'ارزش کل',
      lastDealLabel: 'آخرین معامله',
      summaryTitle: 'خلاصه بازار',
      complianceLabel: 'الزامات و انطباق',
      shipTitle: 'اقلام صادراتی',
      importsTitle: 'اقلام وارداتی',
      projectsTitle: 'فرصت‌ها و بازارهای کلیدی',
      projectsEmpty: 'در حال حاضر جزئیاتی ثبت نشده است.',
      selectPrompt: 'یک کشور را انتخاب کنید',
      ctaBack: 'بازگشت به نقشه',
    },
  },
};



const ar: Omit<Translation, 'lang' | 'dir'> = {
  labels: {
    brand: 'زردشت مهد بينالود للتجارة',
    brandShort: 'زردشت مهد بينالود',
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
      tagline: 'تجارة السلع الدولية · التوريد من المنشأ · التسليم في الوجهة',
      inquiry: 'إرسال استفسار تجاري',
      productGroups: 'فئات المنتجات',
      viewAllProducts: 'عرض جميع المنتجات',
      downloadCatalog: 'تنزيل كتالوج المنتجات (PDF)',
      energyBitumen: 'الطاقة والبيتومين',
      metalsSteel: 'المعادن والصلب',
      agriculturalCommodities: 'السلع الزراعية',
      textileRawMaterials: 'المواد الخام النسيجية',
      chemicalsPetrochemicals: 'المواد الكيميائية والبتروكيماوية',
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
      eyebrow: 'توريد دولي للمواد الخام للمصانع والمشترين بالجملة',
      heroTitle: 'مواد خام تُشترى من المنشأ وتُسلَّم إلى بابكم',
      heroSubtitle: 'نشتري المواد الخام من المنشأ ونسلّمها إلى بابكم — الشحن والتخليص والتسوية علينا.',
      heroImageAlt: 'عمليات تجارة ولوجستيات السلع الدولية',
      ctaPrimary: 'إرسال استفسار تجاري',
      ctaSecondary: 'استعراض المنتجات',
      stats: [
        { label: 'الخدمة', value: 'من التوريد إلى التسليم' },
        { label: 'المشترون', value: 'مصانع وتجار جملة' },
        { label: 'مجموعات السلع', value: '5 مجموعات رئيسية' },
        { label: 'الخبرة', value: 'أكثر من 20 عامًا' },
      ],
      trustTitle: 'لماذا يتعامل المشترون معنا',
      trustBadges: [
        { title: 'علاقة مباشرة بالمنتجين', description: 'نشتري من المنتج مباشرة، دون وسطاء.' },
        { title: 'رقابة قبل الشحن', description: 'نحضر التحميل ونفحص التعبئة في المنشأ.' },
        { title: 'إدارة الدفع', description: 'تسوية حتى في الأسواق ذات القنوات المصرفية المحدودة.' },
      ],
      featuredTitle: 'تدفقات تجارية حقيقية، لا كتالوج لمنتج واحد',
      featuredList: [
        'تصدير البيتومين إلى أوزبكستان.',
        'استيراد الشعير من روسيا وتصدير الحديد والصلب إلى آسيا الوسطى.',
        'استيراد خيوط الحرير إلى جانب السلع الزراعية والصناعية.',
      ],
      categoriesTitle: 'ما الذي نتاجر به',
      categoriesIntro: 'خمس مجموعات من المواد الخام للإنتاج.',
      categories: [
        { name: 'السلع الزراعية', description: 'الشعير والبقول والحبوب.', badge: 'AG', href: '/products/agricultural-commodities' },
        { name: 'المواد الكيميائية والبتروكيماوية', description: 'وفق مواصفات فنية مؤكدة.', badge: 'CP', href: '/products/chemicals-petrochemicals' },
        { name: 'الطاقة والبيتومين', description: 'بيتومين للتصدير، أساسًا إلى أوزبكستان.', badge: 'EB', href: '/products/energy-bitumen' },
        { name: 'المعادن والصلب', description: 'حديد وصلب لمشتري آسيا الوسطى.', badge: 'MS', href: '/products/metals-steel' },
        { name: 'المواد الخام للنسيج', description: 'خيوط الحرير وتوريد وفق المواصفات.', badge: 'TX', href: '/products/textile-raw-materials' },
      ],
      marketsTitle: 'الدول التي نعمل معها',
      marketsIntro: 'اضغط على أي علم لعرض ما نصدره ونستورده مع ذلك السوق.',
      marketsHomeLabel: 'إيران · المقر الرئيسي',
      countersTitle: 'عقدان من التجارة العابرة للحدود',
      countersIntro: 'مبنية على نشاط استيراد وتصدير فعلي.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'سنة من الخبرة التجارية' },
        { key: 'groups', value: 5, suffix: '', label: 'مجموعات سلعية' },
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
      faqIntro: 'ما يسأل عنه المشترون عادةً أولًا.',
      faq: [
        { question: 'هل تتولون الشحن والتخليص الجمركي؟', answer: 'نعم — نسلّم في الوجهة المتفق عليها، لا عند الميناء فحسب.' },
        { question: 'كيف تُرتَّب المدفوعات؟', answer: 'لكل صفقة، بما في ذلك الأسواق ذات القنوات المصرفية المحدودة. وتُتفق الشروط كتابةً مسبقًا.' },
        { question: 'ما المعلومات المطلوبة في الاستفسار؟', answer: 'السلعة والمواصفات والكمية والوجهة والجدول الزمني المستهدف.' },
      ],
    },
    products: {
      eyebrow: 'المنتجات', title: 'مجموعات سلعية للتجارة الإقليمية',
      intro: 'مواد خام زراعية وكيميائية وطاقة ومعادن ونسيج. تُؤكَّد المواصفات والشروط لكل طلب.',
      cta: 'إرسال استفسار تجاري',
      sections: productsData.ar,
    },
    solutions: {
      eyebrow: 'التجارة واللوجستيات', title: 'من بلد المنشأ إلى نقطة التسليم لديكم',
      intro: 'طرف واحد للسلسلة كاملة، من الشراء في المنشأ إلى التسليم في الوجهة.',
      rail: {
        eyebrow: 'الشحن بالسكك',
        title: 'شحن سائب بالسكك',
        body: 'كميات كبيرة عبر ممرات إيران وآسيا الوسطى وروسيا، ضمن عقد واحد.',
      },
      solutions: [
        { title: 'التوريد من المنشأ', description: 'شراء مباشر من المنتج على أساس الجودة والسعر ومدة التنفيذ.', tags: ['توريد', 'منتجون', 'سعر'] },
        { title: 'المعاينة قبل الشحن', description: 'نحضر التحميل ونفحص التعبئة وفق المواصفات.', tags: ['معاينة', 'تعبئة', 'تحميل'] },
        { title: 'الشحن واختيار المركبة', description: 'المسار والمركبة حسب طبيعة السلعة: بري أو سككي أو متعدد الوسائط.', tags: ['طريق', 'سكك', 'متعدد الوسائط'] },
        { title: 'التخليص الجمركي', description: 'إجراءات التصدير والاستيراد تُنجَز نيابةً عنكم.', tags: ['جمارك', 'مستندات', 'امتثال'] },
        { title: 'التسليم في الوجهة', description: 'متابعة حتى نقطة التسليم المتفق عليها.', tags: ['تسليم', 'وجهة', 'استلام'] },
        { title: 'الدفع والتسوية', description: 'لكل صفقة، بما في ذلك الأسواق ذات القنوات المصرفية المحدودة.', tags: ['دفع', 'تسوية', 'شروط'] },
      ],
      outcomesTitle: 'كيف تبدأ الصفقة',
      outcomes: [
        { title: '1) المتطلبات', description: 'أرسل السلعة والمواصفات والكمية والوجهة.' },
        { title: '2) التوريد والعرض', description: 'نجد التوريد ونقدم سعر التسليم في الوجهة.' },
        { title: '3) الشروط', description: 'يُتفق كتابةً على السعر والدفع وشروط التسليم.' },
        { title: '4) التحميل والنقل', description: 'يُعايَن التحميل في المنشأ ويُحجَز النقل.' },
        { title: '5) التخليص والتسليم', description: 'يُنجَز التخليص وتُسلَّم الشحنة في الوجهة.' },
      ],
    },
    resources: {
      eyebrow: 'الأسواق', title: 'الأسواق الإقليمية وممرات التجارة',
      intro: 'قائم على علاقات منشأ ووجهة محددة، لا على كتالوج عالمي عام.',
      cards: [
        { title: 'أوزبكستان', description: 'سوق وجهة لصادرات البيتومين.', badge: 'UZ' },
        { title: 'روسيا', description: 'سوق توريد الشعير والسلع الزراعية.', badge: 'RU' },
        { title: 'آسيا الوسطى', description: 'وجهة صادرات الحديد والصلب.', badge: 'CA' },
        { title: 'أسواق إقليمية أخرى', description: 'تُقيَّم حسب المنتج والمسار والشروط.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'من نحن', title: 'عن شركة زردشت مهد بينالود التجارية',
      intro: 'شركة تجارة مقرها إيران، تورّد المواد الخام للمصانع والمشترين بالجملة في الخارج.',
      missionTitle: 'المهمة', missionBody: 'تسليم السلعة المطلوبة — بجودة مضمونة وسعر منصف وأقل تكلفة إجمالية — وتحمّل مخاطر التنفيذ بينهما.',
      storyTitle: 'ما الذي نقوم به', storyBody: 'نشتري من المنشأ، وننظّم الشحن، ونتولى التخليص، ونسلّم في الوجهة.',
      valuesTitle: 'طريقة عملنا', values: [
        'تأكيد المواصفات كتابةً قبل أي التزام.',
        'علاقات مباشرة مع المنتجين في كل قطاع.',
        'المعاينة عند التحميل لا عند الوصول.',
        'ترتيب الدفع والتسوية لكل صفقة.',
        'تفضيل العلاقات طويلة الأجل على الصفقات المنفردة.',
      ],
      leadershipTitle: 'الأسواق والشبكة', leadershipBody: 'عشرون عامًا من العمل بنت شبكة من المنتجين وشركاء الشحن ووكلاء التخليص — لذلك نقدّم سعر تسليم في الوجهة ونلتزم به.',
      metrics: [
        { label: 'الخدمة', value: 'من التوريد إلى التسليم' },
        { label: 'المشترون', value: 'مصانع وتجار جملة' },
        { label: 'المحفظة', value: 'زراعية، كيميائية، بتروكيماوية' },
      ],
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
      intro: 'تتحدد الجودة في المنشأ لا عند الوصول.',
      pillars: [
        { title: 'الاتفاق على المواصفات أولًا', description: 'تُؤكَّد الدرجة والنقاء والتعبئة كتابةً قبل الالتزام تجاه المورد.', badge: '01' },
        { title: 'المعاينة عند التحميل', description: 'نحضر التحميل ونفحص التعبئة وفق المواصفات.', badge: '02' },
        { title: 'وسيلة نقل تناسب البضاعة', description: 'تُختار المركبة والمسار بما يلائم طبيعة السلعة.', badge: '03' },
      ],
      processTitle: 'عملية الجودة لدينا',
      process: [
        { title: '1) المواصفات', description: 'تُؤكَّد الدرجة والنقاء والتعبئة وفق استفساركم.' },
        { title: '2) اختيار المورد', description: 'تُقارَن المصانع من حيث الجودة والسعر ومدة التنفيذ.' },
        { title: '3) التحميل والمعاينة', description: 'تُفحَص التعبئة والمركبة في المنشأ قبل المغادرة.' },
        { title: '4) المستندات والتسليم', description: 'تُجهَّز مستندات التخليص وتُتابَع الشحنة حتى التسليم.' },
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
    brandShort: 'Zardasht Trading',
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
      tagline: 'Международная торговля · Закупка у источника · Доставка до места назначения',
      inquiry: 'Отправить торговый запрос',
      productGroups: 'Товарные группы',
      viewAllProducts: 'Все продукты',
      downloadCatalog: 'Скачать каталог продукции (PDF)',
      energyBitumen: 'Энергия и битум',
      metalsSteel: 'Металлы и сталь',
      agriculturalCommodities: 'Сельхозпродукция',
      textileRawMaterials: 'Текстильное сырьё',
      chemicalsPetrochemicals: 'Химия и нефтехимия',
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
      eyebrow: 'Международные поставки сырья производителям и оптовым покупателям',
      heroTitle: 'Сырьё, закупленное у производителя и доставленное к вашим воротам',
      heroSubtitle: 'Закупаем сырьё у производителя и доставляем до ваших ворот — перевозка, таможня и расчёты на нас.',
      heroImageAlt: 'Международная торговля сырьевыми товарами и логистика',
      ctaPrimary: 'Отправить торговый запрос', ctaSecondary: 'Смотреть товары',
      stats: [
        { label: 'Услуга', value: 'От закупки до поставки' },
        { label: 'Покупатели', value: 'Производители и оптовики' },
        { label: 'Товарные группы', value: '5 основных групп' },
        { label: 'Опыт', value: 'Более 20 лет' },
      ],
      trustTitle: 'Почему покупатели работают с нами',
      trustBadges: [
        { title: 'Прямая сеть производителей', description: 'Закупаем напрямую у производителя, без посредников.' },
        { title: 'Контроль до отгрузки', description: 'Присутствуем при погрузке и проверяем упаковку на месте.' },
        { title: 'Платежи и расчёты', description: 'Расчёты даже там, где банковские каналы ограничены.' },
      ],
      featuredTitle: 'Реальные торговые потоки, а не каталог одного товара',
      featuredList: ['Экспорт битума в Узбекистан.', 'Импорт ячменя из России и экспорт железа и стали в Центральную Азию.', 'Импорт шелковой пряжи наряду с сельскохозяйственными и промышленными товарами.'],
      categoriesTitle: 'Чем мы торгуем', categoriesIntro: 'Пять групп сырья для производства.',
      categories: [
        { name: 'Сельхозтовары', description: 'Ячмень, бобовые и зерновые.', badge: 'AG', href: '/products/agricultural-commodities' },
        { name: 'Химия и нефтехимия', description: 'По подтверждённой технической спецификации.', badge: 'CP', href: '/products/chemicals-petrochemicals' },
        { name: 'Энергетика и битум', description: 'Битум на экспорт, прежде всего в Узбекистан.', badge: 'EB', href: '/products/energy-bitumen' },
        { name: 'Металлы и сталь', description: 'Железо и сталь для покупателей Центральной Азии.', badge: 'MS', href: '/products/metals-steel' },
        { name: 'Текстильное сырьё', description: 'Шелковая пряжа и поставки по спецификации.', badge: 'TX', href: '/products/textile-raw-materials' },
      ],
      marketsTitle: 'Страны, с которыми мы работаем',
      marketsIntro: 'Нажмите на флаг, чтобы увидеть, что мы поставляем на этот рынок и закупаем на нём.',
      marketsHomeLabel: 'Иран · Головной офис',
      countersTitle: 'Два десятилетия трансграничной торговли',
      countersIntro: 'Построено на реальной импортно-экспортной деятельности.',
      counters: [
        { key: 'years', value: 20, suffix: '+', label: 'Лет торгового опыта' },
        { key: 'groups', value: 5, suffix: '', label: 'Товарные группы' },
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
      faqTitle: 'Вопросы о торговле', faqIntro: 'О чём покупатели спрашивают в первую очередь.',
      faq: [
        { question: 'Берёте ли вы на себя перевозку и таможню?', answer: 'Да — доставляем в согласованный пункт, а не только до порта.' },
        { question: 'Как организуются платежи?', answer: 'По каждой сделке, в том числе на рынках с ограниченными банковскими каналами. Условия согласуются письменно заранее.' },
        { question: 'Что указать в запросе?', answer: 'Товар, спецификацию, объём, пункт назначения и желаемые сроки.' },
      ],
    },
    products: {
      eyebrow: 'Товары', title: 'Товарные группы для региональной торговли',
      intro: 'Сельскохозяйственное, химическое, энергетическое, металлургическое и текстильное сырьё. Спецификация и условия подтверждаются по каждому заказу.', cta: 'Отправить торговый запрос',
      sections: productsData.ru,
    },
    solutions: {
      eyebrow: 'Торговля и логистика', title: 'От страны-производителя до вашего пункта приёмки',
      intro: 'Один контрагент на всю цепочку — от закупки у источника до доставки в пункт назначения.',
      rail: {
        eyebrow: 'Ж/д перевозки',
        title: 'Навалочные грузы по ж/д',
        body: 'Крупные партии по коридорам Ирана, Центральной Азии и России — по одному договору.',
      },
      solutions: [
        { title: 'Закупка у источника', description: 'Напрямую у производителя — по качеству, цене и срокам.', tags: ['Закупка', 'Производители', 'Цена'] },
        { title: 'Контроль до отгрузки', description: 'Присутствуем при погрузке и проверяем упаковку по спецификации.', tags: ['Контроль', 'Упаковка', 'Погрузка'] },
        { title: 'Перевозка и выбор транспорта', description: 'Маршрут и транспорт под товар: авто, ж/д или мультимодально.', tags: ['Авто', 'Ж/д', 'Мультимодально'] },
        { title: 'Таможенное оформление', description: 'Экспорт и импорт оформляем за вас.', tags: ['Таможня', 'Документы', 'Соответствие'] },
        { title: 'Доставка в пункт назначения', description: 'Сопровождаем до согласованного пункта приёмки.', tags: ['Доставка', 'Назначение', 'Передача'] },
        { title: 'Платежи и расчёты', description: 'По каждой сделке, включая рынки с ограниченными банковскими каналами.', tags: ['Оплата', 'Расчёты', 'Условия'] },
      ],
      outcomesTitle: 'Как начинается сделка', outcomes: [
        { title: '1) Потребность', description: 'Вы сообщаете товар, спецификацию, объём и пункт назначения.' },
        { title: '2) Сорсинг и предложение', description: 'Мы находим поставку и даём цену с доставкой.' },
        { title: '3) Условия', description: 'Цена, оплата и условия поставки согласуются письменно.' },
        { title: '4) Погрузка и перевозка', description: 'Погрузка контролируется на месте, транспорт бронируется.' },
        { title: '5) Оформление и доставка', description: 'Таможня пройдена, груз передан в пункте назначения.' },
      ],
    },
    resources: {
      eyebrow: 'Рынки', title: 'Региональные рынки и торговые коридоры',
      intro: 'Строится на конкретных связях между рынками, а не на общем каталоге.',
      cards: [
        { title: 'Узбекистан', description: 'Рынок назначения для экспорта битума.', badge: 'UZ' },
        { title: 'Россия', description: 'Рынок закупки ячменя и сельхозтоваров.', badge: 'RU' },
        { title: 'Центральная Азия', description: 'Назначение для экспорта железа и стали.', badge: 'CA' },
        { title: 'Другие рынки региона', description: 'Оцениваются по товару, маршруту и условиям.', badge: 'REG' },
      ],
    },
    about: {
      eyebrow: 'О компании', title: 'Zardasht Mahd Binaloud Trading',
      intro: 'Иранская торговая компания, поставляющая сырьё производителям и оптовым покупателям за рубежом.',
      missionTitle: 'Миссия', missionBody: 'Доставить именно заказанный товар — с гарантированным качеством, по справедливой цене и с наименьшими затратами — приняв на себя риски исполнения.',
      storyTitle: 'Чем мы занимаемся', storyBody: 'Закупаем у источника, организуем перевозку, проходим таможню и передаём груз в пункте назначения.',
      valuesTitle: 'Как мы работаем', values: [
        'Спецификация подтверждается письменно до обязательств.',
        'Прямые отношения с производителями в каждом секторе.',
        'Контроль при погрузке, а не по прибытии.',
        'Оплата и расчёты организуются по каждой сделке.',
        'Долгосрочные отношения важнее разовой сделки.',
      ],
      leadershipTitle: 'Рынки и сеть', leadershipBody: 'Двадцать лет торговли создали сеть производителей, перевозчиков и таможенных представителей — поэтому мы можем назвать цену с доставкой и выдержать её.',
      metrics: [
        { label: 'Услуга', value: 'От закупки до поставки' },
        { label: 'Покупатели', value: 'Производители и оптовики' },
        { label: 'Портфель', value: 'Сельхоз, химия, нефтехимия' },
      ],
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
      intro: 'Качество определяется в стране происхождения, а не по прибытии.',
      pillars: [
        { title: 'Спецификация согласована заранее', description: 'Марка, чистота и упаковка подтверждаются письменно до обязательств перед поставщиком.', badge: '01' },
        { title: 'Контроль при погрузке', description: 'Присутствуем при погрузке и проверяем упаковку по спецификации.', badge: '02' },
        { title: 'Транспорт под характер груза', description: 'Транспорт и маршрут подбираются под товар.', badge: '03' },
      ],
      processTitle: 'Наш процесс контроля качества',
      process: [
        { title: '1) Спецификация', description: 'Марка, чистота и упаковка подтверждаются по вашему запросу.' },
        { title: '2) Выбор поставщика', description: 'Производители сравниваются по качеству, цене и срокам.' },
        { title: '3) Погрузка и контроль', description: 'Упаковка и транспорт проверяются до отправки.' },
        { title: '4) Документы и доставка', description: 'Таможенные документы готовятся, отгрузка сопровождается до доставки.' },
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

