
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
    };
    footer: {
      company: string;
      support: string;
      contact: string;
      tradeMap: string;
      copyright: string;
      privacy: string;
      terms: string;
      social: string[];
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
      phone: string;
      email: string;
      quickLinks: string[];
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
    subbrand: 'Pulses & Legumes Exporters',
    nav: {
      home: 'Home',
      products: 'Products',
      solutions: 'Logistics & Export',
      resources: 'Quality & Compliance',
      about: 'About Us',
      contact: 'Contact',
      tradeMap: 'Trade Map',
    },
    footer: {
      company: 'Company',
      support: 'Support',
      contact: 'Contact',
      copyright: 'Zardasht Mahd Binaloud Trading. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      social: ['LinkedIn', 'WhatsApp', 'Email', 'Instagram'],
    },
  },
  pages: {
    home: {
      title: 'Home',
      eyebrow: 'Iran-based pulses exporter',
      heroTitle: 'Export-ready in Iran',
      heroSubtitle:
        'Zardasht Mahd Binaloud Trading .',
      heroImageAlt: 'Bags of legumes and chickpeas stacked for export',
      ctaPrimary: 'Request a Quote',
      ctaSecondary: 'Download Product Specs',
      stats: [
        { label: 'Lead time', value: '2–4 weeks' },
        { label: 'QC checkpoints', value: '3-stage' },
        { label: 'Incoterms', value: 'EXW | FOB | CFR | CIF' },
        { label: 'Supply regions', value: 'Iran + region' },
      ],
      trustTitle: 'Trust elements',
      trustBadges: [
        { title: 'Quality First', description: 'Screening, grading, and moisture control for every lot.' },
        { title: 'On-Time Shipment', description: 'Milestone updates from booking to vessel departure.' },
        { title: 'Transparent Documentation', description: 'Draft documents shared before final release.' },
      ],
      featuredTitle: 'Why buyers choose us',
      featuredList: [
        'Consistent sizing, colour sorting, and low moisture tailored to your specs.',
        'Containerised or bulk shipments with stuffing photos and weight checks.',
        'Full document pack: invoice, packing list, certificate of origin, phytosanitary (on request).',
      ],
      categoriesTitle: 'Core products',
      categoriesIntro: 'Grade-tailored pulses ready for packing, canning, or processing.',
      categories: [
        { name: 'Chickpeas', description: 'Kabuli 7–9 mm, machine cleaned and size-sorted for uniform cooking.', badge: 'CH', href: '/products#chickpeas' },
        { name: 'Lentils', description: 'Red split and whole green lentils with colour sorting and low FM.', badge: 'LE', href: '/products#lentils' },
        { name: 'Beans', description: 'Light speckled kidney, pinto, and white/navy beans for retail or industry.', badge: 'BE', href: '/products#beans' },
        { name: 'Peas', description: 'Whole and split green/yellow peas with controlled moisture.', badge: 'PE', href: '/products#peas' },
      ],
      industriesTitle: 'Industries we serve',
      industriesIntro: 'Serving importers, wholesalers, packers, and food manufacturers across the Middle East, Asia, and Africa.',
      industries: [
        { name: 'Importers & traders', description: 'Container or bulk orders with flexible incoterms and quick quotes.' },
        { name: 'Retail packers & private label', description: 'Bag, pouch, or big-bag formats with consistent sizing.' },
        { name: 'Canneries & hummus makers', description: 'Moisture-controlled pulses ready for industrial cooking lines.' },
        { name: 'Foodservice distributors', description: 'Reliable replenishment schedules and mixed-load options.' },
      ],
      faqTitle: 'FAQ',
      faqIntro: 'Straight answers to common procurement questions.',
      faq: [
        { question: 'What is your minimum order quantity?', answer: 'Standard MOQ is one 20-foot container per SKU; mixed loads are possible when specs align.' },
        { question: 'Which payment terms do you support?', answer: '30% advance with balance against copy documents; LC at sight available for qualified buyers.' },
        { question: 'How do you package the pulses?', answer: '25kg or 50kg PP bags, 1MT jumbo bags, or buyer-branded options; pallets on request.' },
        { question: 'Which shipping documents do you provide?', answer: 'Commercial invoice, packing list, certificate of origin, and phytosanitary or fumigation certificates when required.' },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'Legumes tailored to your specs',
      intro: 'Chickpeas, lentils, beans, and peas from Iran with consistent grading, moisture control, and export-ready packaging.',
      cta: 'Talk to Sales',
      sections: [
        {
          id: 'chickpeas',
          badge: 'CH',
          title: 'Chickpeas',
          description: 'Kabuli focus with size calibration and colour sorting for fast hydration.',
          products: [
            { name: 'Grade options', description: 'Kabuli 7–8mm and 8–9mm; Desi on request; machine cleaned and size-sorted.', tag: 'Grades' },
            { name: 'Packaging', description: '25kg/50kg PP bags or 1MT jumbo bags; custom printing with lead time.', tag: 'Packaging' },
            { name: 'Origin & specs', description: 'Iran origin; moisture =13%, admixture =0.5%, broken =2%.', tag: 'Specs' },
            { name: 'MOQ & supply', description: 'MOQ one 20ft (~24–26MT). Annual contracts and spot containers available.', tag: 'MOQ' },
          ],
        },
        {
          id: 'lentils',
          badge: 'LE',
          title: 'Lentils',
          description: 'Red split and whole green lentils with colour sorting and polishing options.',
          products: [
            { name: 'Grade options', description: 'Red split (football), whole green, and polished red; screen-cleaned.', tag: 'Grades' },
            { name: 'Packaging', description: '25kg/50kg PP bags; retail-pack ready on request.', tag: 'Packaging' },
            { name: 'Origin & specs', description: 'Iran origin with <0.5% foreign matter; moisture 12–13%; uniform kernel size.', tag: 'Specs' },
            { name: 'MOQ & supply', description: 'MOQ one 20ft (~24MT). Mixed SKUs possible if specs align.', tag: 'MOQ' },
          ],
        },
        {
          id: 'beans',
          badge: 'BE',
          title: 'Beans',
          description: 'Light speckled kidney, pinto, and white/navy beans for retail and foodservice.',
          products: [
            { name: 'Grade options', description: 'LSKB (speckled), pinto, and white/navy beans; handpicked or machine-cleaned.', tag: 'Grades' },
            { name: 'Packaging', description: '25kg/50kg PP bags; bulk bags for processors and canneries.', tag: 'Packaging' },
            { name: 'Origin & specs', description: 'Iran origin; moisture 14% max; defect and foreign matter per agreed tolerance.', tag: 'Specs' },
            { name: 'MOQ & supply', description: 'MOQ one 20ft. Split shipments or staggered deliveries available.', tag: 'MOQ' },
          ],
        },
        {
          id: 'peas',
          badge: 'PE',
          title: 'Peas',
          description: 'Green and yellow peas, whole and split, for packing and industrial use.',
          products: [
            { name: 'Grade options', description: 'Whole green/yellow and split peas; screen-graded for uniformity.', tag: 'Grades' },
            { name: 'Packaging', description: '25kg/50kg bags or 1MT bulk bags; fumigation available when required.', tag: 'Packaging' },
            { name: 'Origin & specs', description: 'Iran origin; moisture 13% max; foreign matter <1%; size-sorted.', tag: 'Specs' },
            { name: 'MOQ & supply', description: 'MOQ one 20ft. Lead time 2–4 weeks depending on vessel schedule.', tag: 'MOQ' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: 'Logistics & Export',
      title: 'Logistics & Export',
      intro: 'We manage container bookings, export paperwork, and milestone updates from Iran to your destination port.',
      solutions: [
        { title: 'Incoterms support', description: 'Quote EXW Tehran/Arak, FOB Bandar Abbas, or CFR/CIF to key Middle East, Asia, and Africa ports.', tags: ['EXW', 'FOB', 'CFR/CIF'] },
        { title: 'Shipment modes', description: '20ft and 40ft dry containers, bulk (where available), liners, and cross-stuffing with fumigation on request.', tags: ['Container', 'Bulk', 'Liners'] },
        { title: 'Lead times & scheduling', description: 'Typical dispatch 2–4 weeks after PO; stuffing photos and weight tickets shared at loading.', tags: ['2–4 weeks', 'Milestones', 'Photos'] },
        { title: 'Port handling & insurance', description: 'Port handling arranged; SGS/third-party inspection and cargo insurance available per your policy.', tags: ['Inspection', 'Insurance', 'PHC'] },
      ],
      outcomesTitle: 'Export process',
      outcomes: [
        { title: '1) Spec & quote', description: 'Share specs, destination port, and incoterm; we quote within 24–48 hours.' },
        { title: '2) Contract & payment', description: 'Confirm PI/PO, agree payment terms, and secure a booking window.' },
        { title: '3) QC & prep', description: 'Sorting, grading, moisture checks, and packaging completed; samples/photos shared.' },
        { title: '4) Stuffing & docs', description: 'Container stuffing with photos, weight tickets, and seals; draft docs for approval.' },
        { title: '5) Vessel & follow-up', description: 'BL and final documents released as agreed; post-arrival support as needed.' },
      ],
    },
    resources: {
      eyebrow: 'Quality & Compliance',
      title: 'Quality assurance for every lot',
      intro: 'Control points from intake to loading with full documentation and traceability.',
      cards: [
        { title: 'Sorting & grading', description: 'Colour sorting, sieving, and calibration to minimise defects and keep sizing consistent.', badge: 'QC' },
        { title: 'Moisture & cleanliness', description: 'Moisture targets 12–14% depending on crop; foreign matter and broken kernels within agreed limits.', badge: 'Testing' },
        { title: 'Documentation pack', description: 'Commercial invoice, packing list, certificate of origin; phytosanitary and fumigation certificates when needed.', badge: 'Docs' },
        { title: 'Traceability & sampling', description: 'Lot codes and retained samples until delivery confirmation; optional third-party inspection.', badge: 'Trace' },
      ],
    },
    about: {
      eyebrow: 'About us',
      title: 'About Zardasht Mahd Binaloud Trading',
      intro: 'Iran-based trading company specialising in sourcing and exporting legumes with reliable grading and documentation.',
      missionTitle: 'Mission',
      missionBody: 'Make Iranian pulses easy to import through consistent quality, transparent paperwork, and dependable schedules.',
      storyTitle: 'Our story',
      storyBody: 'We were founded to bridge Iranian growers and packhouses with regional buyers. Our team blends procurement, inspection, and logistics experience to move pulses efficiently from farm to port.',
      valuesTitle: 'Values',
      values: ['Quality first, every container.', 'On-time shipment with proactive updates.', 'Transparent documentation and compliance.', 'Long-term partnerships over one-off trades.', 'Responsive communication across time zones.'],
      leadershipTitle: 'Markets & team',
      leadershipBody: 'Based in Iran with partners across key origin hubs, serving importers, wholesalers, and food manufacturers in the Middle East, Asia, and Africa.',
      metrics: [
        { label: 'Core products', value: 'Chickpeas, lentils, beans, peas' },
        { label: 'Markets served', value: 'Middle East, Asia, Africa' },
        { label: 'Typical lead time', value: '2–4 weeks' },
      ],
      cta: 'Talk to sales',
      mapTitle: 'Find us in Iran',
      mapAddress: 'Zardasht Mahd Binaloud Trading, Iran',
      mapCta: 'Open in Google Maps',
      mapZoomIn: 'Zoom in',
      mapZoomOut: 'Zoom out',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Request a quote',
      intro: 'Share your requirements and we will reply with pricing, specs, and timelines within 24–48 hours.',
      address: 'Razavi Khorasan Province, Mashhad, District 1, Sanabad St, No. 32, Iran',
      phone: '+98 (0) 000-000-0000',
      email: 'sales@Zardasht.com',
      quickLinks: ['Talk to Sales', 'Request a Quote', 'Download Product Specs'],
      form: {
        name: 'Full name',
        company: 'Company name',
        country: 'Country',
        email: 'Work email',
        phone: 'Phone / WhatsApp',
        product: 'Product & grade',
        quantity: 'Quantity (MT)',
        destination: 'Destination port',
        incoterms: 'Preferred incoterms',
        message: 'Notes / specs',
        submit: 'Submit request',
      },
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
    subbrand: 'صادرکننده حبوبات',
    nav: {
      home: 'صفحه اصلی',
      products: 'محصولات',
      solutions: 'لجستیک و صادرات',
      resources: 'کیفیت و انطباق',
      about: 'درباره ما',
      contact: 'تماس',
      tradeMap: 'نقشه تجارت',
    },
    footer: {
      company: 'شرکت',
      support: 'پشتیبانی',
      contact: 'تماس',
      copyright: 'بازرگانی زردشت مهد بینالود. تمامی حقوق محفوظ است.',
      privacy: 'حریم خصوصی',
      terms: 'شرایط خدمات',
      social: ['لینکدین', 'واتساپ', 'ایمیل', 'اینستاگرام'],
    },
  },
  pages: {
    home: {
      title: 'صفحه اصلی',
      eyebrow: 'صادرکننده حبوبات مستقر در ایران',
      heroTitle: 'نخود، عدس در ایران',
      heroSubtitle:
        'بازرگانی زردشت مهد بینالود',
      heroImageAlt: 'کیسه‌های حبوبات آماده صادرات',
      ctaPrimary: 'درخواست قیمت',
      ctaSecondary: 'دانلود مشخصات محصول',
      stats: [
        { label: 'زمان تحویل', value: '۲–۴ هفته' },
        { label: 'نقاط کنترل کیفیت', value: '۳ مرحله' },
        { label: 'اینکوترمز', value: 'EXW | FOB | CFR | CIF' },
        { label: 'مناطق تأمین', value: 'ایران + منطقه' },
      ],
      trustTitle: 'عناصر اعتماد',
      trustBadges: [
        { title: 'کیفیت اول', description: 'غربال‌گری، درجه‌بندی و کنترل رطوبت برای هر محموله.' },
        { title: 'ارسال به‌موقع', description: 'گزارش مراحل از رزرو تا حرکت کشتی.' },
        { title: 'اسناد شفاف', description: 'ارسال پیش‌نویس اسناد قبل از صدور نهایی.' },
      ],
      featuredTitle: 'چرا خریداران ما را انتخاب می‌کنند',
      featuredList: [
        'سایزبندی یکنواخت، سورت رنگ و رطوبت پایین مطابق مشخصات شما.',
        'ارسال کانتینری یا فله با عکس‌های بارگیری و کنترل وزن.',
        'پک کامل اسناد: فاکتور، لیست بسته‌بندی، گواهی مبدأ و گواهی بهداشت گیاهی (در صورت نیاز).',
      ],
      categoriesTitle: 'محصولات اصلی',
      categoriesIntro: 'حبوبات درجه‌بندی‌شده برای بسته‌بندی، کنسرو یا فرآوری.',
      categories: [
        { name: 'نخود', description: 'کابلی ۷–۹ میلی‌متر، تمیزشده ماشینی و سایز‌بندی برای پخت یکنواخت.', badge: 'CH', href: '/products#chickpeas' },
        { name: 'عدس', description: 'عدس قرمز لپه و عدس سبز کامل با سورت رنگ و درصد ناخالصی پایین.', badge: 'LE', href: '/products#lentils' },
        { name: 'لوبیا', description: 'لوبیا چیتی روشن، پینتو و سفید/ناوی برای خرده‌فروشی یا صنعت.', badge: 'BE', href: '/products#beans' },
        { name: 'نخودفرنگی', description: 'نخودفرنگی سبز و زرد، کامل یا لپه، با کنترل رطوبت.', badge: 'PE', href: '/products#peas' },
      ],
      industriesTitle: 'صنایعی که خدمت می‌دهیم',
      industriesIntro: 'خدمت‌رسانی به واردکنندگان، عمده‌فروشان، بسته‌بندان و تولیدکنندگان غذایی در خاورمیانه، آسیا و آفریقا.',
      industries: [
        { name: 'واردکنندگان و بازرگانان', description: 'سفارش‌های کانتینری یا فله با اینکوترمز منعطف و قیمت‌دهی سریع.' },
        { name: 'بسته‌بندان خرده‌فروشی و برند خصوصی', description: 'کیسه، پاکت یا جامبوبگ با سایزبندی ثابت.' },
        { name: 'کنسروسازان و تولیدکنندگان حمص', description: 'حبوبات با رطوبت کنترل‌شده مناسب خطوط پخت صنعتی.' },
        { name: 'توزیع‌کنندگان خدمات غذایی', description: 'برنامه تأمین منظم و امکان بارهای ترکیبی.' },
      ],
      faqTitle: 'سوالات متداول',
      faqIntro: 'پاسخ‌های شفاف به سوالات رایج تأمین.',
      faq: [
        { question: 'حداقل مقدار سفارش چقدر است؟', answer: 'حداقل سفارش استاندارد یک کانتینر ۲۰ فوت برای هر SKU است؛ در صورت هماهنگی مشخصات، امکان بار ترکیبی وجود دارد.' },
        { question: 'چه شرایط پرداختی دارید؟', answer: '۳۰٪ پیش‌پرداخت و تسویه با ارائه اسناد؛ LC دیداری برای خریداران واجد شرایط.' },
        { question: 'بسته‌بندی چگونه است؟', answer: 'کیسه‌های PP ۲۵ یا ۵۰ کیلوگرمی، جامبوبگ ۱ تنی یا بسته‌بندی با برند خریدار؛ پالت‌بندی در صورت درخواست.' },
        { question: 'چه اسنادی ارائه می‌دهید؟', answer: 'فاکتور تجاری، لیست بسته‌بندی، گواهی مبدأ و گواهی‌های بهداشت گیاهی یا ضدعفونی در صورت نیاز.' },
      ],
    },
    products: {
      eyebrow: 'محصولات',
      title: 'حبوبات مطابق مشخصات شما',
      intro: 'نخود، عدس، لوبیا و نخودفرنگی از ایران با درجه‌بندی یکنواخت، کنترل رطوبت و بسته‌بندی صادراتی.',
      cta: 'گفت‌وگو با فروش',
      sections: [
        {
          id: 'chickpeas',
          badge: 'CH',
          title: 'نخود',
          description: 'تمرکز بر نخود کابلی با کالیبراسیون سایز و سورت رنگ برای آب‌گیری سریع.',
          products: [
            { name: 'گزینه‌های درجه', description: 'کابلی ۷–۸ و ۸–۹ میلی‌متر؛ دسی در صورت درخواست؛ تمیزشده و سایز‌بندی‌شده ماشینی.', tag: 'درجه' },
            { name: 'بسته‌بندی', description: 'کیسه PP ۲۵/۵۰ کیلو یا جامبوبگ ۱ تنی؛ چاپ سفارشی با زمان تحویل.', tag: 'بسته‌بندی' },
            { name: 'مبدأ و مشخصات', description: 'مبدأ ایران؛ رطوبت ≤۱۳٪، ناخالصی ≤۰٫۵٪، شکستگی ≤۲٪.', tag: 'مشخصات' },
            { name: 'MOQ و تأمین', description: 'MOQ یک کانتینر ۲۰ فوت (~۲۴–۲۶ تن). قرارداد سالانه و محموله اسپات.', tag: 'MOQ' },
          ],
        },
        {
          id: 'lentils',
          badge: 'LE',
          title: 'عدس',
          description: 'عدس قرمز لپه و عدس سبز کامل با سورت رنگ و پولیش اختیاری.',
          products: [
            { name: 'گزینه‌های درجه', description: 'عدس قرمز لپه (فوتبالی)، عدس سبز کامل و قرمز پولیشی؛ تمیزشده با الک.', tag: 'درجه' },
            { name: 'بسته‌بندی', description: 'کیسه PP ۲۵/۵۰ کیلو؛ آماده بسته‌بندی خرده‌فروشی در صورت درخواست.', tag: 'بسته‌بندی' },
            { name: 'مبدأ و مشخصات', description: 'مبدأ ایران با ناخالصی <۰٫۵٪؛ رطوبت ۱۲–۱۳٪؛ اندازه یکنواخت.', tag: 'مشخصات' },
            { name: 'MOQ و تأمین', description: 'MOQ یک کانتینر ۲۰ فوت (~۲۴ تن). امکان ترکیب SKU در صورت تطابق مشخصات.', tag: 'MOQ' },
          ],
        },
        {
          id: 'beans',
          badge: 'BE',
          title: 'لوبیا',
          description: 'لوبیا چیتی روشن، پینتو و سفید/ناوی برای خرده‌فروشی و فودسرویس.',
          products: [
            { name: 'گزینه‌های درجه', description: 'چیتی روشن (LSKB)، پینتو و سفید/ناوی؛ سورت دستی یا تمیزشده ماشینی.', tag: 'درجه' },
            { name: 'بسته‌بندی', description: 'کیسه PP ۲۵/۵۰ کیلو؛ جامبوبگ برای کارخانه‌ها و کنسروسازی‌ها.', tag: 'بسته‌بندی' },
            { name: 'مبدأ و مشخصات', description: 'مبدأ ایران؛ رطوبت حداکثر ۱۴٪؛ عیب و ناخالصی طبق توافق.', tag: 'مشخصات' },
            { name: 'MOQ و تأمین', description: 'MOQ یک کانتینر ۲۰ فوت. امکان ارسال مرحله‌ای.', tag: 'MOQ' },
          ],
        },
        {
          id: 'peas',
          badge: 'PE',
          title: 'نخودفرنگی',
          description: 'نخودفرنگی سبز و زرد، کامل و لپه، برای بسته‌بندی و مصرف صنعتی.',
          products: [
            { name: 'گزینه‌های درجه', description: 'نخودفرنگی سبز/زرد کامل و لپه؛ الک‌شده برای یکنواختی.', tag: 'درجه' },
            { name: 'بسته‌بندی', description: 'کیسه ۲۵/۵۰ کیلو یا جامبوبگ ۱ تنی؛ ضدعفونی در صورت نیاز.', tag: 'بسته‌بندی' },
            { name: 'مبدأ و مشخصات', description: 'مبدأ ایران؛ رطوبت حداکثر ۱۳٪؛ ناخالصی <۱٪؛ سایزبندی‌شده.', tag: 'مشخصات' },
            { name: 'MOQ و تأمین', description: 'MOQ یک کانتینر ۲۰ فوت. زمان آماده‌سازی ۲–۴ هفته بسته به برنامه کشتی.', tag: 'MOQ' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: 'لجستیک و صادرات',
      title: 'لجستیک و صادرات',
      intro: 'رزرو کانتینر، مدارک صادرات و به‌روزرسانی مراحل از ایران تا بندر مقصد را مدیریت می‌کنیم.',
      solutions: [
        { title: 'پشتیبانی اینکوترمز', description: 'قیمت‌گذاری EXW تهران/اراک، FOB بندرعباس یا CFR/CIF به بنادر اصلی خاورمیانه، آسیا و آفریقا.', tags: ['EXW', 'FOB', 'CFR/CIF'] },
        { title: 'روش‌های حمل', description: 'کانتینر خشک ۲۰ و ۴۰ فوت، حمل فله (در صورت امکان)، لاینر و کراس‌استافینگ با ضدعفونی در صورت درخواست.', tags: ['کانتینر', 'فله', 'لاینر'] },
        { title: 'زمان تحویل و برنامه‌ریزی', description: 'ارسال معمول ۲–۴ هفته پس از PO؛ عکس‌های بارگیری و باسکول در زمان لودینگ.', tags: ['۲–۴ هفته', 'مراحل', 'عکس'] },
        { title: 'امور بندری و بیمه', description: 'هماهنگی امور بندری؛ بازرسی SGS/شخص ثالث و بیمه محموله بنا به سیاست شما.', tags: ['بازرسی', 'بیمه', 'PHC'] },
      ],
      outcomesTitle: 'فرآیند صادرات',
      outcomes: [
        { title: '۱) مشخصات و قیمت', description: 'مشخصات، بندر مقصد و اینکوترمز را ارسال کنید؛ طی ۲۴–۴۸ ساعت قیمت ارائه می‌شود.' },
        { title: '۲) قرارداد و پرداخت', description: 'پیش‌فاکتور/سفارش را تأیید کرده، شرایط پرداخت و بازه بارگیری را نهایی می‌کنیم.' },
        { title: '۳) کنترل کیفیت و آماده‌سازی', description: 'سورت، درجه‌بندی، کنترل رطوبت و بسته‌بندی؛ نمونه/عکس‌ها ارسال می‌شود.' },
        { title: '۴) بارگیری و اسناد', description: 'بارگیری کانتینر با عکس و پلمب؛ پیش‌نویس اسناد برای تأیید.' },
        { title: '۵) حرکت کشتی و پیگیری', description: 'بارنامه و اسناد نهایی طبق توافق ارسال می‌شود؛ پشتیبانی پس از ورود.' },
      ],
    },
    resources: {
      eyebrow: 'کیفیت و انطباق',
      title: 'تضمین کیفیت برای هر محموله',
      intro: 'کنترل‌ها از دریافت تا بارگیری با اسناد کامل و قابلیت رهگیری.',
      cards: [
        { title: 'سورت و درجه‌بندی', description: 'سورت رنگ، الک و کالیبراسیون برای کاهش عیوب و یکنواختی اندازه.', badge: 'QC' },
        { title: 'رطوبت و پاکیزگی', description: 'هدف رطوبت ۱۲–۱۴٪ بسته به محصول؛ ناخالصی و شکستگی در محدوده توافق‌شده.', badge: 'آزمایش' },
        { title: 'بسته اسناد', description: 'فاکتور تجاری، لیست بسته‌بندی، گواهی مبدأ؛ گواهی بهداشت گیاهی و ضدعفونی در صورت نیاز.', badge: 'اسناد' },
        { title: 'رهگیری و نمونه‌برداری', description: 'کدگذاری هر محموله و نگهداری نمونه تا تأیید تحویل؛ بازرسی شخص ثالث اختیاری.', badge: 'رهگیری' },
      ],
    },
    about: {
      eyebrow: 'درباره ما',
      title: 'درباره بازرگانی زردشت مهد بینالود',
      intro: 'شرکت بازرگانی مستقر در ایران با تمرکز بر تأمین و صادرات حبوبات با درجه‌بندی و اسناد قابل اتکا.',
      missionTitle: 'ماموریت',
      missionBody: 'تسهیل واردات حبوبات ایرانی با کیفیت یکنواخت، اسناد شفاف و زمان‌بندی قابل اعتماد.',
      storyTitle: 'داستان ما',
      storyBody: 'ما برای اتصال کشاورزان و بسته‌بندی‌کنندگان ایرانی به خریداران منطقه‌ای شکل گرفتیم. تیم ما تجربه تامین، بازرسی و لجستیک را برای جابجایی کارآمد از مزرعه تا بندر به کار می‌گیرد.',
      valuesTitle: 'ارزش‌ها',
      values: ['کیفیت اول، در هر کانتینر.', 'ارسال به‌موقع با اطلاع‌رسانی فعال.', 'اسناد شفاف و انطباق کامل.', 'شراکت بلندمدت به‌جای معاملات مقطعی.', 'ارتباط سریع و پاسخ‌گو در مناطق زمانی مختلف.'],
      leadershipTitle: 'بازارها و تیم',
      leadershipBody: 'مستقر در ایران با همکاران محلی در مراکز اصلی تأمین، خدمت‌رسان واردکنندگان، عمده‌فروشان و تولیدکنندگان غذایی در خاورمیانه، آسیا و آفریقا.',
      metrics: [
        { label: 'محصولات اصلی', value: 'نخود، عدس، لوبیا، نخودفرنگی' },
        { label: 'بازارهای هدف', value: 'خاورمیانه، آسیا، آفریقا' },
        { label: 'زمان تحویل معمول', value: '۲–۴ هفته' },
      ],
      cta: 'گفت‌وگو با فروش',
      mapTitle: 'ما را در ایران پیدا کنید',
      mapAddress: 'بازرگانی زردشت مهد بینالود، ایران',
      mapCta: 'باز کردن در گوگل مپس',
      mapZoomIn: 'بزرگ‌نمایی',
      mapZoomOut: 'کوچک‌نمایی',
    },
    contact: {
      eyebrow: 'تماس',
      title: 'درخواست قیمت',
      intro: 'نیاز خود را اعلام کنید تا ظرف ۲۴–۴۸ ساعت قیمت، مشخصات و زمان‌بندی ارسال شود.',
      address: 'استان خراسان رضوی، مشهد، ناحیه ۱، سنبد شنبه، پلاک ۳۲، ایران',
      phone: '+98 (0) 000-000-0000',
      email: 'sales@zardoshtmehdbinalud.com',
      quickLinks: ['گفت‌وگو با فروش', 'درخواست قیمت', 'دانلود مشخصات محصول'],
      form: {
        name: 'نام و نام خانوادگی',
        company: 'نام شرکت',
        country: 'کشور',
        email: 'ایمیل کاری',
        phone: 'تلفن / واتساپ',
        product: 'محصول و درجه',
        quantity: 'مقدار (تن)',
        destination: 'بندر مقصد',
        incoterms: 'اینکوترمز ترجیحی',
        message: 'توضیحات / مشخصات',
        submit: 'ارسال درخواست',
      },
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
    subbrand: 'مصدّرو البقوليات',
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      solutions: 'الخدمات اللوجستية والتصدير',
      resources: 'الجودة والامتثال',
      about: 'من نحن',
      contact: 'اتصل بنا',
      tradeMap: 'خريطة التجارة',
    },
    footer: {
      company: 'الشركة',
      support: 'الدعم',
      contact: 'التواصل',
      copyright: 'زردشت مهد بينالود للتجارة. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      social: ['لينكدإن', 'واتساب', 'البريد', 'إنستغرام'],
    },
  },
  pages: {
    home: {
      title: 'الرئيسية',
      eyebrow: 'مصدّر بقوليات مقره إيران',
      heroTitle: 'حمص وعدس وفاصوليا وبازلاء جاهزة للتصدير — توريد وفرز في إيران',
      heroSubtitle:
        'تزوّد زردشت مهد بينالود للتجارة بقوليات عالية الجودة للمستوردين وتجار الجملة ومصنّعي الأغذية في الشرق الأوسط وآسيا وأفريقيا، مع ضبط جودة شامل ووثائق كاملة وشحنات في الوقت المحدد.',
      heroImageAlt: 'أكياس بقوليات جاهزة للتصدير',
      ctaPrimary: 'اطلب عرض سعر',
      ctaSecondary: 'تنزيل مواصفات المنتج',
      stats: [
        { label: 'مدة التسليم', value: '2–4 أسابيع' },
        { label: 'نقاط فحص الجودة', value: '3 مراحل' },
        { label: 'الإنكوترمز', value: 'EXW | FOB | CFR | CIF' },
        { label: 'مناطق التوريد', value: 'إيران + المنطقة' },
      ],
      trustTitle: 'عناصر الثقة',
      trustBadges: [
        { title: 'الجودة أولاً', description: 'غربلة وفرز وتحكم بالرطوبة لكل شحنة.' },
        { title: 'شحن في الوقت المحدد', description: 'تحديثات مرحلية من الحجز حتى إبحار السفينة.' },
        { title: 'وثائق شفافة', description: 'مشاركة المسودات قبل الإصدار النهائي.' },
      ],
      featuredTitle: 'لماذا يختارنا المشترون',
      featuredList: [
        'معايرة حجم ثابتة وفرز لوني ورطوبة منخفضة وفق مواصفاتك.',
        'شحنات حاويات أو سائبة مع صور التعبئة وفحوصات الوزن.',
        'حزمة وثائق كاملة: فاتورة، قائمة تعبئة، شهادة منشأ، وشهادة صحية نباتية عند الطلب.',
      ],
      categoriesTitle: 'المنتجات الأساسية',
      categoriesIntro: 'بقوليات مُصنّفة جاهزة للتعبئة أو التعليب أو المعالجة.',
      categories: [
        { name: 'الحمص', description: 'كابولي 7–9 مم، تنظيف آلي وفرز بالحجم لطهي متجانس.', badge: 'CH', href: '/products#chickpeas' },
        { name: 'العدس', description: 'عدس أحمر مجروش وعدس أخضر كامل مع فرز لوني ونسبة شوائب منخفضة.', badge: 'LE', href: '/products#lentils' },
        { name: 'الفاصوليا', description: 'فاصوليا منقطة فاتحة وبنتو وبيضاء/نافي للاستخدام التجاري أو الصناعي.', badge: 'BE', href: '/products#beans' },
        { name: 'البازلاء', description: 'بازلاء خضراء وصفراء كاملة أو مجروشة مع تحكم بالرطوبة.', badge: 'PE', href: '/products#peas' },
      ],
      industriesTitle: 'القطاعات التي نخدمها',
      industriesIntro: 'نخدم المستوردين وتجار الجملة والمعبّئين ومصنّعي الأغذية في الشرق الأوسط وآسيا وأفريقيا.',
      industries: [
        { name: 'المستوردون والتجار', description: 'طلبات حاويات أو سائب مع إنكوترمز مرنة وعروض سريعة.' },
        { name: 'معبئو التجزئة والعلامات الخاصة', description: 'أكياس أو عبوات أو جامبو مع أحجام ثابتة.' },
        { name: 'مصانع التعليب وصانعي الحمص', description: 'بقوليات برطوبة مضبوطة لخطوط الطهي الصناعية.' },
        { name: 'موزعو خدمات الطعام', description: 'جداول توريد موثوقة وإمكانية شحنات مختلطة.' },
      ],
      faqTitle: 'الأسئلة الشائعة',
      faqIntro: 'إجابات واضحة على أسئلة التوريد.',
      faq: [
        { question: 'ما الحد الأدنى للطلب؟', answer: 'الحد الأدنى القياسي هو حاوية 20 قدم لكل SKU؛ ويمكن الشحن المختلط إذا تطابقت المواصفات.' },
        { question: 'ما هي شروط الدفع؟', answer: '30% مقدماً والباقي مقابل نسخ المستندات؛ اعتماد مستندي عند الاطلاع متاح للمشترين المؤهلين.' },
        { question: 'كيف تكون التعبئة؟', answer: 'أكياس PP بوزن 25 أو 50 كجم، أو جامبو 1 طن، أو تعبئة بعلامة المشتري؛ منصات عند الطلب.' },
        { question: 'ما هي مستندات الشحن التي توفرونها؟', answer: 'فاتورة تجارية، قائمة تعبئة، شهادة منشأ، وشهادات صحية نباتية أو تبخير عند الحاجة.' },
      ],
    },
    products: {
      eyebrow: 'المنتجات',
      title: 'بقوليات بحسب مواصفاتك',
      intro: 'حمص وعدس وفاصوليا وبازلاء من إيران مع فرز ثابت وتحكم بالرطوبة وتعبئة مهيأة للتصدير.',
      cta: 'تواصل مع المبيعات',
      sections: [
        {
          id: 'chickpeas',
          badge: 'CH',
          title: 'الحمص',
          description: 'تركيز على الحمص الكابولي مع معايرة الحجم وفرز اللون لامتصاص سريع.',
          products: [
            { name: 'خيارات الدرجة', description: 'كابولي 7–8 و8–9 مم؛ ديسي عند الطلب؛ تنظيف آلي وفرز بالحجم.', tag: 'الدرجات' },
            { name: 'التعبئة', description: 'أكياس PP 25/50 كجم أو جامبو 1 طن؛ طباعة مخصصة بمهلة.', tag: 'التعبئة' },
            { name: 'المنشأ والمواصفات', description: 'منشأ إيران؛ رطوبة ≤13٪، شوائب ≤0.5٪، كسر ≤2٪.', tag: 'المواصفات' },
            { name: 'الحد الأدنى والتوريد', description: 'MOQ حاوية 20 قدم (~24–26 طن). عقود سنوية وشحنات فورية متاحة.', tag: 'MOQ' },
          ],
        },
        {
          id: 'lentils',
          badge: 'LE',
          title: 'العدس',
          description: 'عدس أحمر مجروش وعدس أخضر كامل مع فرز لوني وخيار تلميع.',
          products: [
            { name: 'خيارات الدرجة', description: 'عدس أحمر مجروش (فوتبول)، أخضر كامل، وأحمر مُلمّع؛ تنظيف بالغربال.', tag: 'الدرجات' },
            { name: 'التعبئة', description: 'أكياس PP 25/50 كجم؛ تجهيز للتجزئة عند الطلب.', tag: 'التعبئة' },
            { name: 'المنشأ والمواصفات', description: 'منشأ إيران مع شوائب <0.5٪؛ رطوبة 12–13٪؛ حجم حبة متجانس.', tag: 'المواصفات' },
            { name: 'الحد الأدنى والتوريد', description: 'MOQ حاوية 20 قدم (~24 طن). شحنات مختلطة ممكنة إذا تطابقت المواصفات.', tag: 'MOQ' },
          ],
        },
        {
          id: 'beans',
          badge: 'BE',
          title: 'الفاصوليا',
          description: 'فاصوليا منقطة فاتحة وبنتو وبيضاء/نافي للتجزئة وخدمات الطعام.',
          products: [
            { name: 'خيارات الدرجة', description: 'LSKB (منقطة)، بنتو، وبيضاء/نافي؛ فرز يدوي أو تنظيف آلي.', tag: 'الدرجات' },
            { name: 'التعبئة', description: 'أكياس PP 25/50 كجم؛ أكياس جامبو للمصانع والتعليب.', tag: 'التعبئة' },
            { name: 'المنشأ والمواصفات', description: 'منشأ إيران؛ رطوبة حتى 14٪؛ العيوب والشوائب حسب الاتفاق.', tag: 'المواصفات' },
            { name: 'الحد الأدنى والتوريد', description: 'MOQ حاوية 20 قدم. إمكانية شحن على دفعات.', tag: 'MOQ' },
          ],
        },
        {
          id: 'peas',
          badge: 'PE',
          title: 'البازلاء',
          description: 'بازلاء خضراء وصفراء كاملة أو مجروشة للتعبئة والاستخدام الصناعي.',
          products: [
            { name: 'خيارات الدرجة', description: 'بازلاء خضراء/صفراء كاملة ومجروشة؛ فرز بالغربال للتجانس.', tag: 'الدرجات' },
            { name: 'التعبئة', description: 'أكياس 25/50 كجم أو جامبو 1 طن؛ تبخير عند الحاجة.', tag: 'التعبئة' },
            { name: 'المنشأ والمواصفات', description: 'منشأ إيران؛ رطوبة حتى 13٪؛ شوائب <1٪؛ فرز بالحجم.', tag: 'المواصفات' },
            { name: 'الحد الأدنى والتوريد', description: 'MOQ حاوية 20 قدم. مهلة تجهيز 2–4 أسابيع حسب جدول السفن.', tag: 'MOQ' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: 'الخدمات اللوجستية والتصدير',
      title: 'الخدمات اللوجستية والتصدير',
      intro: 'ندير حجز الحاويات وأوراق التصدير وتحديثات المراحل من إيران إلى ميناء الوجهة.',
      solutions: [
        { title: 'دعم الإنكوترمز', description: 'تسعير EXW طهران/أراك، FOB بندر عباس، أو CFR/CIF إلى موانئ الشرق الأوسط وآسيا وأفريقيا.', tags: ['EXW', 'FOB', 'CFR/CIF'] },
        { title: 'طرق الشحن', description: 'حاويات جافة 20 و40 قدم، شحن سائب (عند توفره)، بطانات ولينر، وتفريغ/إعادة تحميل مع تبخير عند الطلب.', tags: ['حاويات', 'سائب', 'بطانات'] },
        { title: 'المهل والجدولة', description: 'الإرسال المعتاد 2–4 أسابيع بعد أمر الشراء؛ صور التعبئة وميزان الوزن أثناء التحميل.', tags: ['2–4 أسابيع', 'مراحل', 'صور'] },
        { title: 'المناولة والتأمين', description: 'تنسيق المناولة بالميناء؛ فحص SGS/طرف ثالث وتأمين الشحنة بحسب سياستك.', tags: ['فحص', 'تأمين', 'PHC'] },
      ],
      outcomesTitle: 'عملية التصدير',
      outcomes: [
        { title: '1) المواصفات وعرض السعر', description: 'أرسل المواصفات وميناء الوجهة والإنكوترمز؛ نرد بعرض خلال 24–48 ساعة.' },
        { title: '2) العقد والدفع', description: 'تأكيد PI/PO، الاتفاق على شروط الدفع وتثبيت نافذة الحجز.' },
        { title: '3) الجودة والتجهيز', description: 'فرز وتصنيف وفحص رطوبة وتعبئة؛ مشاركة عينات/صور.' },
        { title: '4) التحميل والمستندات', description: 'تحميل الحاوية مع صور وأختام وتذاكر الوزن؛ مسودات مستندات للمراجعة.' },
        { title: '5) الإبحار والمتابعة', description: 'إصدار بوليصة الشحن والمستندات النهائية وفق الاتفاق؛ دعم بعد الوصول.' },
      ],
    },
    resources: {
      eyebrow: 'الجودة والامتثال',
      title: 'ضمان الجودة لكل شحنة',
      intro: 'نقاط تحكم من الاستلام حتى التحميل مع وثائق كاملة وإمكانية تتبع.',
      cards: [
        { title: 'الفرز والتصنيف', description: 'فرز لوني وغربلة ومعايرة لتقليل العيوب وتوحيد الأحجام.', badge: 'QC' },
        { title: 'الرطوبة والنظافة', description: 'مستهدف رطوبة 12–14٪ حسب المحصول؛ شوائب وكسر ضمن الحدود المتفق عليها.', badge: 'اختبار' },
        { title: 'حزمة المستندات', description: 'فاتورة تجارية، قائمة تعبئة، شهادة منشأ؛ وشهادة صحية نباتية وتبخير عند الحاجة.', badge: 'مستندات' },
        { title: 'التتبع والعينات', description: 'ترميز الدُفعات والاحتفاظ بعينات حتى تأكيد التسليم؛ فحص طرف ثالث اختياري.', badge: 'تتبع' },
      ],
    },
    about: {
      eyebrow: 'من نحن',
      title: 'عن زردشت مهد بينالود للتجارة',
      intro: 'شركة تجارة مقرها إيران متخصصة في توريد وتصدير البقوليات مع فرز موثوق ووثائق دقيقة.',
      missionTitle: 'المهمة',
      missionBody: 'تسهيل استيراد البقوليات الإيرانية عبر جودة ثابتة ووثائق شفافة وجداول يمكن الاعتماد عليها.',
      storyTitle: 'قصتنا',
      storyBody: 'تأسسنا لربط المزارعين ومراكز التعبئة في إيران بالمشترين الإقليميين. يجمع فريقنا خبرة التوريد والفحص واللوجستيات لنقل البقوليات بكفاءة من المزرعة إلى الميناء.',
      valuesTitle: 'القيم',
      values: ['الجودة أولاً في كل حاوية.', 'شحن في الوقت المحدد مع تحديثات استباقية.', 'وثائق شفافة وامتثال كامل.', 'شراكات طويلة الأمد بدلاً من الصفقات العابرة.', 'تواصل سريع عبر المناطق الزمنية.'],
      leadershipTitle: 'الأسواق والفريق',
      leadershipBody: 'مقرنا في إيران مع شركاء في مناطق المنشأ الرئيسية، ونخدم المستوردين وتجار الجملة ومصنّعي الأغذية في الشرق الأوسط وآسيا وأفريقيا.',
      metrics: [
        { label: 'المنتجات الأساسية', value: 'حمص، عدس، فاصوليا، بازلاء' },
        { label: 'الأسواق المستهدفة', value: 'الشرق الأوسط، آسيا، أفريقيا' },
        { label: 'مدة التسليم المعتادة', value: '2–4 أسابيع' },
      ],
      cta: 'تواصل مع المبيعات',
      mapTitle: 'موقعنا في إيران',
      mapAddress: 'شركة زردشت مهد بينالود للتجارة، إيران',
      mapCta: 'فتح في خرائط Google',
      mapZoomIn: 'تكبير الخريطة',
      mapZoomOut: 'تصغير الخريطة',
    },
    contact: {
      eyebrow: 'التواصل',
      title: 'اطلب عرض سعر',
      intro: 'شارك متطلباتك وسنعود إليك بالسعر والمواصفات والجدول الزمني خلال 24–48 ساعة.',
      address: 'طهران، إيران (المقر) | العمليات قرب مراكز التعبئة',
      phone: '+98 (0) 000-000-0000',
      email: 'sales@asperlosgostar.com',
      quickLinks: ['تواصل مع المبيعات', 'اطلب عرض سعر', 'تنزيل مواصفات المنتج'],
      form: {
        name: 'الاسم الكامل',
        company: 'اسم الشركة',
        country: 'الدولة',
        email: 'البريد المهني',
        phone: 'الهاتف / واتساب',
        product: 'المنتج والدرجة',
        quantity: 'الكمية (طن)',
        destination: 'ميناء الوجهة',
        incoterms: 'الإنكوترمز المفضلة',
        message: 'ملاحظات / مواصفات',
        submit: 'إرسال الطلب',
      },
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
    subbrand: 'Экспортеры бобовых культур',
    nav: {
      home: 'Главная',
      products: 'Продукция',
      solutions: 'Логистика и экспорт',
      resources: 'Качество и соответствие',
      about: 'О нас',
      contact: 'Контакты',
      tradeMap: 'Карта торговли',
    },
    footer: {
      company: 'Компания',
      support: 'Поддержка',
      contact: 'Контакты',
      copyright: 'Zardasht Mahd Binaloud Trading. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия обслуживания',
      social: ['LinkedIn', 'WhatsApp', 'Email', 'Instagram'],
    },
  },
  pages: {
    home: {
      title: 'Главная',
      eyebrow: 'Экспортер бобовых из Ирана',
      heroTitle: 'Нут, чечевица, фасоль и горох для экспорта — отбор и сортировка в Иране',
      heroSubtitle:
        'Компания Zardasht Mahd Binaloud Trading поставляет бобовые высокого качества импортерам, оптовикам и производителям продуктов питания в странах Ближнего Востока, Азии и Африки с полным контролем качества, документацией и своевременными отгрузками.',
      heroImageAlt: 'Мешки бобовых, готовые к экспорту',
      ctaPrimary: 'Запросить цену',
      ctaSecondary: 'Скачать спецификации',
      stats: [
        { label: 'Срок поставки', value: '2–4 недели' },
        { label: 'Этапы контроля качества', value: '3 этапа' },
        { label: 'Инкотермс', value: 'EXW | FOB | CFR | CIF' },
        { label: 'Регионы поставок', value: 'Иран + регион' },
      ],
      trustTitle: 'Элементы доверия',
      trustBadges: [
        { title: 'Качество прежде всего', description: 'Просеивание, сортировка и контроль влажности для каждой партии.' },
        { title: 'Отгрузка вовремя', description: 'Этапные обновления от бронирования до выхода судна.' },
        { title: 'Прозрачные документы', description: 'Черновики документов предоставляем до финальной выдачи.' },
      ],
      featuredTitle: 'Почему нас выбирают',
      featuredList: [
        'Стабильная калибровка размера, сортировка по цвету и низкая влажность под ваши спецификации.',
        'Контейнерные или навалочные отгрузки с фото загрузки и контролем веса.',
        'Полный пакет документов: инвойс, упаковочный лист, сертификат происхождения и фитосанитарный (по запросу).',
      ],
      categoriesTitle: 'Основные продукты',
      categoriesIntro: 'Бобовые, подготовленные для фасовки, консервирования или переработки.',
      categories: [
        { name: 'Нут', description: 'Кабули 7–9 мм, машинная очистка и сортировка по размеру для равномерного приготовления.', badge: 'CH', href: '/products#chickpeas' },
        { name: 'Чечевица', description: 'Красная дробленая и цельная зеленая чечевица с сортировкой по цвету и низкими примесями.', badge: 'LE', href: '/products#lentils' },
        { name: 'Фасоль', description: 'Светлая пестрая, пинто и белая/нейви для розницы или промышленности.', badge: 'BE', href: '/products#beans' },
        { name: 'Горох', description: 'Зеленый и желтый горох, целый или колотый, с контролем влажности.', badge: 'PE', href: '/products#peas' },
      ],
      industriesTitle: 'Отрасли, которым мы поставляем',
      industriesIntro: 'Работаем с импортерами, оптовиками, фасовщиками и производителями продуктов питания в странах Ближнего Востока, Азии и Африки.',
      industries: [
        { name: 'Импортеры и трейдеры', description: 'Контейнерные или навалочные партии, гибкие инкотермс и быстрые котировки.' },
        { name: 'Фасовщики и private label', description: 'Мешки, пакеты или биг-бэги со стабильной калибровкой.' },
        { name: 'Консервные заводы и производители хумуса', description: 'Бобовые с контролируемой влажностью для промышленных линий варки.' },
        { name: 'Дистрибьюторы общепита', description: 'Надежные графики пополнения и возможность смешанных поставок.' },
      ],
      faqTitle: 'Часто задаваемые вопросы',
      faqIntro: 'Короткие ответы на ключевые вопросы закупки.',
      faq: [
        { question: 'Каков минимальный объем заказа?', answer: 'Стандартный MOQ — один 20-футовый контейнер на SKU; смешанные загрузки возможны при совпадении спецификаций.' },
        { question: 'Какие условия оплаты вы предлагаете?', answer: '30% предоплата и остаток по копиям документов; аккредитив по предъявлении для квалифицированных покупателей.' },
        { question: 'Какая упаковка доступна?', answer: 'ПП мешки 25 или 50 кг, биг-бэг 1 т или брендированная упаковка; паллетирование по запросу.' },
        { question: 'Какие отгрузочные документы вы предоставляете?', answer: 'Коммерческий инвойс, упаковочный лист, сертификат происхождения и фитосанитарные или фумигационные сертификаты при необходимости.' },
      ],
    },
    products: {
      eyebrow: 'Продукция',
      title: 'Бобовые по вашим спецификациям',
      intro: 'Нут, чечевица, фасоль и горох из Ирана с единым стандартом сортировки, контролем влажности и экспортной упаковкой.',
      cta: 'Связаться с продажами',
      sections: [
        {
          id: 'chickpeas',
          badge: 'CH',
          title: 'Нут',
          description: 'Фокус на нуте кабули с калибровкой размера и сортировкой по цвету для быстрого набухания.',
          products: [
            { name: 'Варианты сорта', description: 'Кабули 7–8 и 8–9 мм; дези по запросу; машинная очистка и сортировка по размеру.', tag: 'Сорта' },
            { name: 'Упаковка', description: 'ПП мешки 25/50 кг или биг-бэг 1 т; индивидуальная печать с учетом сроков.', tag: 'Упаковка' },
            { name: 'Происхождение и спецификации', description: 'Происхождение Иран; влажность ≤13%, примеси ≤0,5%, дробленые ≤2%.', tag: 'Спецификации' },
            { name: 'MOQ и поставки', description: 'MOQ один 20-футовый контейнер (~24–26 т). Годовые контракты и спотовые партии доступны.', tag: 'MOQ' },
          ],
        },
        {
          id: 'lentils',
          badge: 'LE',
          title: 'Чечевица',
          description: 'Красная дробленая и цельная зеленая чечевица с сортировкой по цвету и полировкой по запросу.',
          products: [
            { name: 'Варианты сорта', description: 'Красная дробленая (football), цельная зеленая и полированная красная; очистка через сита.', tag: 'Сорта' },
            { name: 'Упаковка', description: 'ПП мешки 25/50 кг; фасовка для розницы по запросу.', tag: 'Упаковка' },
            { name: 'Происхождение и спецификации', description: 'Происхождение Иран с примесями <0,5%; влажность 12–13%; равномерный размер зерна.', tag: 'Спецификации' },
            { name: 'MOQ и поставки', description: 'MOQ один 20-футовый контейнер (~24 т). Смешанные SKU возможны при совпадении спецификаций.', tag: 'MOQ' },
          ],
        },
        {
          id: 'beans',
          badge: 'BE',
          title: 'Фасоль',
          description: 'Светлая пестрая, пинто и белая/нейви фасоль для розницы и фудсервиса.',
          products: [
            { name: 'Варианты сорта', description: 'Светлая пестрая (LSKB), пинто и белая/нейви; ручной отбор или машинная очистка.', tag: 'Сорта' },
            { name: 'Упаковка', description: 'ПП мешки 25/50 кг; биг-бэги для переработчиков и консервных заводов.', tag: 'Упаковка' },
            { name: 'Происхождение и спецификации', description: 'Происхождение Иран; влажность максимум 14%; дефекты и примеси по согласованию.', tag: 'Спецификации' },
            { name: 'MOQ и поставки', description: 'MOQ один 20-футовый контейнер. Возможны разделенные отгрузки.', tag: 'MOQ' },
          ],
        },
        {
          id: 'peas',
          badge: 'PE',
          title: 'Горох',
          description: 'Зеленый и желтый горох, целый и колотый, для фасовки и промышленного использования.',
          products: [
            { name: 'Варианты сорта', description: 'Зеленый/желтый горох целый и колотый; сортировка через сита для однородности.', tag: 'Сорта' },
            { name: 'Упаковка', description: 'Мешки 25/50 кг или биг-бэг 1 т; фумигация при необходимости.', tag: 'Упаковка' },
            { name: 'Происхождение и спецификации', description: 'Происхождение Иран; влажность ≤13%; примеси <1%; сортировка по размеру.', tag: 'Спецификации' },
            { name: 'MOQ и поставки', description: 'MOQ один 20-футовый контейнер. Подготовка 2–4 недели в зависимости от расписания судов.', tag: 'MOQ' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: 'Логистика и экспорт',
      title: 'Логистика и экспорт',
      intro: 'Мы организуем бронирование контейнеров, экспортные документы и обновления этапов от Ирана до вашего порта назначения.',
      solutions: [
        { title: 'Поддержка инкотермс', description: 'Цены EXW Тегеран/Арак, FOB Бандар-Аббас или CFR/CIF до ключевых портов Ближнего Востока, Азии и Африки.', tags: ['EXW', 'FOB', 'CFR/CIF'] },
        { title: 'Форматы отгрузки', description: 'Контейнеры 20 и 40 футов, навал (где доступно), лайнеры и кросс-стаффинг с фумигацией по запросу.', tags: ['Контейнер', 'Навал', 'Лайнеры'] },
        { title: 'Сроки и графики', description: 'Обычно отгрузка через 2–4 недели после PO; фото загрузки и весовые талоны при погрузке.', tags: ['2–4 недели', 'Этапы', 'Фото'] },
        { title: 'Портовые услуги и страхование', description: 'Организуем портовую обработку; инспекция SGS/третьей стороной и страхование груза по вашей политике.', tags: ['Инспекция', 'Страхование', 'PHC'] },
      ],
      outcomesTitle: 'Процесс экспорта',
      outcomes: [
        { title: '1) Спецификации и цена', description: 'Пришлите спецификации, порт назначения и инкотермс; ответим в течение 24–48 часов.' },
        { title: '2) Контракт и оплата', description: 'Подтверждаем PI/PO, согласуем условия оплаты и окно бронирования.' },
        { title: '3) Контроль качества и подготовка', description: 'Сортировка, калибровка, контроль влажности и упаковка; делимся образцами/фото.' },
        { title: '4) Погрузка и документы', description: 'Погрузка контейнера с фото, весовыми талонами и пломбами; черновики документов для согласования.' },
        { title: '5) Отправка и сопровождение', description: 'Выпуск коносамента и финальных документов согласно договоренностям; поддержка после прибытия.' },
      ],
    },
    resources: {
      eyebrow: 'Качество и соответствие',
      title: 'Гарантия качества для каждой партии',
      intro: 'Контроль от приемки до погрузки с полным пакетом документов и трассируемостью.',
      cards: [
        { title: 'Сортировка и калибровка', description: 'Цветовая сортировка, просеивание и калибровка для снижения дефектов и стабильного размера.', badge: 'QC' },
        { title: 'Влажность и чистота', description: 'Целевые значения влажности 12–14% в зависимости от культуры; примеси и битые в пределах согласованных норм.', badge: 'Тесты' },
        { title: 'Пакет документов', description: 'Коммерческий инвойс, упаковочный лист, сертификат происхождения; фитосанитарные и фумигационные сертификаты при необходимости.', badge: 'Документы' },
        { title: 'Трассируемость и образцы', description: 'Коды партий и хранение образцов до подтверждения доставки; опциональная инспекция третьей стороны.', badge: 'Трасс' },
      ],
    },
    about: {
      eyebrow: 'О нас',
      title: 'О компании Zardasht Mahd Binaloud Trading',
      intro: 'Торговая компания из Ирана, специализирующаяся на закупке и экспорте бобовых с надежной сортировкой и документами.',
      missionTitle: 'Миссия',
      missionBody: 'Упростить импорт иранских бобовых через стабильное качество, прозрачные документы и надежные сроки.',
      storyTitle: 'Наша история',
      storyBody: 'Мы были основаны, чтобы соединить иранских производителей и фасовщиков с региональными покупателями. Наша команда сочетает опыт закупок, инспекции и логистики, чтобы эффективно доставлять бобовые от фермы до порта.',
      valuesTitle: 'Ценности',
      values: ['Качество прежде всего — в каждом контейнере.', 'Отгрузка вовремя с проактивными обновлениями.', 'Прозрачные документы и полное соответствие.', 'Долгосрочные партнерства вместо разовых сделок.', 'Оперативная коммуникация в разных часовых поясах.'],
      leadershipTitle: 'Рынки и команда',
      leadershipBody: 'Мы базируемся в Иране и работаем с партнерами в ключевых регионах происхождения, обслуживая импортеров, оптовиков и производителей продуктов питания на Ближнем Востоке, в Азии и Африке.',
      metrics: [
        { label: 'Основные продукты', value: 'Нут, чечевица, фасоль, горох' },
        { label: 'Рынки присутствия', value: 'Ближний Восток, Азия, Африка' },
        { label: 'Типичный срок поставки', value: '2–4 недели' },
      ],
      cta: 'Связаться с продажами',
      mapTitle: 'Найдите нас в Иране',
      mapAddress: 'Zardasht Mahd Binaloud Trading, Иран',
      mapCta: 'Открыть в Google Картах',
      mapZoomIn: 'Увеличить масштаб',
      mapZoomOut: 'Уменьшить масштаб',
    },
    contact: {
      eyebrow: 'Контакты',
      title: 'Запросить цену',
      intro: 'Сообщите ваши требования, и мы ответим с ценой, спецификациями и сроками в течение 24–48 часов.',
      address: 'Тегеран, Иран (HQ) | Операции рядом с ключевыми фасовочными площадками',
      phone: '+98 (0) 000-000-0000',
      email: 'sales@asperlosgostar.com',
      quickLinks: ['Связаться с продажами', 'Запросить цену', 'Скачать спецификации'],
      form: {
        name: 'Полное имя',
        company: 'Название компании',
        country: 'Страна',
        email: 'Рабочий email',
        phone: 'Телефон / WhatsApp',
        product: 'Продукт и сорт',
        quantity: 'Количество (т)',
        destination: 'Порт назначения',
        incoterms: 'Предпочтительные инкотермс',
        message: 'Примечания / требования',
        submit: 'Отправить запрос',
      },
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

