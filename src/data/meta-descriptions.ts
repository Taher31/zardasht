import type { LanguageCode } from '../i18n';

/**
 * Meta descriptions, written for the search result rather than for the page.
 *
 * These are deliberately separate from each page's `intro`. The intro is
 * visible copy and is often short on purpose — "Quality is decided at origin,
 * not on arrival." works as an opening line and would be spoiled by padding.
 * A meta description has a different job: it has roughly 120-160 characters
 * of a search result to earn a click, and nobody reads it on the page.
 *
 * Every line here is held to that 120-160 window, counted in characters (not
 * bytes), and restates something the page already says. Nothing is claimed
 * that is not backed by the page's own copy.
 *
 * A page with no entry falls back to its `intro` (see each page's Layout
 * call), so this file only needs the ones worth lengthening.
 */

type PageKey = 'home' | 'contact' | 'products' | 'solutions' | 'about' | 'quality' | 'news' | 'tradeMap';

export const metaDescriptions: Record<PageKey, Record<LanguageCode, string>> = {
  home: {
    en: 'We buy raw materials at origin and deliver to your door: freight, customs clearance and settlement included, across Central Asia, Russia and the Gulf.',
    fa: 'مواد اولیه را از مبدأ می‌خریم و درب انبار شما تحویل می‌دهیم: حمل، ترخیص گمرکی و تسویه بر عهده ما؛ در آسیای مرکزی، روسیه و خلیج فارس.',
    ar: 'نشتري المواد الخام من المنشأ ونسلّمها إلى بابكم: الشحن والتخليص الجمركي والتسوية علينا، في آسيا الوسطى وروسيا والخليج والأسواق المجاورة.',
    ru: 'Закупаем сырьё у производителя и доставляем до ваших ворот: перевозка, таможня и расчёты на нас — Центральная Азия, Россия и Залив.',
  },
  contact: {
    en: 'Send the commodity, specification, quantity, origin or destination and preferred delivery terms, and our trade desk will price the shipment for you.',
    fa: 'کالا، مشخصات، مقدار، مبدأ یا مقصد و شرایط تحویل موردنظر خود را بفرستید تا تیم بازرگانی ما فرصت را بررسی و محموله را قیمت‌گذاری کند.',
    ar: 'أرسل السلعة والمواصفات والكمية والمنشأ أو الوجهة وشروط التسليم المفضلة، وسيقيّم فريقنا التجاري الفرصة ويسعّر الشحنة لكم.',
    ru: 'Отправьте товар, спецификацию, объём, происхождение или назначение и желаемые условия поставки — мы рассчитаем цену отгрузки.',
  },
  products: {
    en: 'Agricultural, chemical, energy, metal and textile raw materials for manufacturers and wholesale buyers. Specification and terms confirmed per order.',
    fa: 'مواد اولیه کشاورزی، شیمیایی و پتروشیمی، انرژی، فلزی و نساجی برای تولیدکنندگان و خریداران عمده. مشخصات و شرایط برای هر سفارش تأیید می‌شود.',
    ar: 'مواد خام زراعية وكيميائية وبتروكيماوية وطاقية ومعدنية ونسيجية، تُورَّد للمصنّعين ومشتري الجملة. تُؤكَّد المواصفات والشروط لكل طلب على حدة.',
    ru: 'Сельскохозяйственное, химическое, энергетическое, металлическое и текстильное сырьё для производителей и оптовых покупателей. Условия — по каждому заказу.',
  },
  solutions: {
    en: 'One counterparty for the whole chain: purchase at origin, inspection at loading, freight by road or rail, customs clearance, and delivery at destination.',
    fa: 'یک طرف قرارداد برای کل زنجیره: خرید از مبدأ، بازرسی هنگام بارگیری، حمل جاده‌ای یا ریلی، ترخیص گمرکی در دو سوی مرز و تحویل در مقصد شما.',
    ar: 'طرف واحد للسلسلة كاملة: الشراء من المنشأ، والمعاينة عند التحميل، والشحن براً أو بالسكك، والتخليص الجمركي، والتسليم في وجهتكم.',
    ru: 'Один контрагент на всю цепочку: закупка у источника, контроль при погрузке, перевозка авто или ж/д, таможенное оформление и доставка на место.',
  },
  about: {
    en: 'An Iran-based trading company supplying raw materials to manufacturers and wholesale buyers across Central Asia, Russia and neighbouring markets.',
    fa: 'شرکتی بازرگانی مستقر در ایران که مواد اولیه را به تولیدکنندگان و خریداران عمده در آسیای مرکزی، روسیه و بازارهای همجوار عرضه می‌کند.',
    ar: 'شركة تجارية مقرها إيران تورّد المواد الخام للمصنّعين ومشتري الجملة في آسيا الوسطى وروسيا والأسواق المجاورة، بخبرة تتجاوز عشرين عامًا.',
    ru: 'Иранская торговая компания: поставки сырья производителям и оптовым покупателям в Центральной Азии, России и соседних странах.',
  },
  quality: {
    en: 'Quality is decided at origin, not on arrival. We attend loading, inspect packaging and covering, and choose transport suited to the cargo.',
    fa: 'کیفیت در مبدأ تعیین می‌شود، نه هنگام رسیدن. ما در بارگیری حاضریم، بسته‌بندی و پوشش بار را بازرسی می‌کنیم و وسیله حمل متناسب را انتخاب می‌کنیم.',
    ar: 'تتحدد الجودة في المنشأ لا عند الوصول: نحضر التحميل، ونفحص التعبئة والتغطية قبل مغادرة المركبة، ونختار وسيلة النقل المناسبة للبضاعة.',
    ru: 'Качество определяется в стране происхождения. Мы присутствуем при погрузке, проверяем упаковку и укрытие и подбираем транспорт под груз.',
  },
  news: {
    en: 'Meetings, delegation visits and trade events across Central Asia and Russia, with guides on shipping terms and documentation for buyers.',
    fa: 'نشست‌ها، سفرهای هیئت تجاری و رویدادهای بازرگانی ما در آسیای مرکزی و روسیه، در کنار راهنماهایی درباره شرایط حمل و اسناد موردنیاز خریداران.',
    ar: 'اجتماعات وزيارات وفود وفعاليات تجارية من نشاطنا في آسيا الوسطى وروسيا، إلى جانب أدلة حول شروط الشحن والمستندات التي يحتاجها المشترون.',
    ru: 'Встречи, визиты делегаций и торговые события в Центральной Азии и России, а также руководства по условиям поставки и документам.',
  },
  tradeMap: {
    en: 'The markets we actively trade with across Central Asia, Russia and the Gulf. Open a country for the commodities we move there and our terms.',
    fa: 'بازارهایی که فعالانه با آن‌ها تجارت می‌کنیم: آسیای مرکزی، روسیه، خلیج فارس و فراتر. هر کشور را باز کنید تا کالاها و شرایط کار را ببینید.',
    ar: 'الأسواق التي نتاجر معها فعليًا في آسيا الوسطى وروسيا والخليج وما بعدها. افتح أي دولة لتطّلع على السلع التي ننقلها والشروط التي نعمل بها.',
    ru: 'Рынки, с которыми мы реально работаем: Центральная Азия, Россия и Персидский залив. Откройте страну — увидите товары и условия работы.',
  },
};

/** Search description for a page, or `undefined` to fall back to its intro. */
export const metaDescription = (lang: LanguageCode, page: PageKey): string | undefined =>
  metaDescriptions[page]?.[lang];

/**
 * Commodity group pages. Same reasoning as above: `description` in
 * products.json is the blurb printed under the group title and is kept short
 * on purpose, so the search copy lives here instead. Each line draws on the
 * four offerings already listed on that group's page.
 */
export const groupMetaDescriptions: Record<string, Record<LanguageCode, string>> = {
  'energy-bitumen': {
    en: 'Bitumen export supply from Iran, focused on Uzbekistan and qualified regional buyers. Grade, packaging and delivery terms confirmed before shipment.',
    fa: 'تأمین و صادرات قیر از ایران، با تمرکز فعلی بر ازبکستان و خریداران واجد شرایط منطقه. گرید، بسته‌بندی و شرایط تحویل پیش از هر محموله تأیید می‌شود.',
    ar: 'توريد وتصدير البيتومين من إيران، مع تركيز حالي على أوزبكستان ومشتري المنطقة المؤهلين. تُؤكَّد الدرجة والتعبئة وشروط التسليم قبل كل شحنة.',
    ru: 'Поставка битума на экспорт из Ирана: Узбекистан и покупатели региона. Марка, упаковка и условия поставки согласуются до каждой отгрузки.',
  },
  'metals-steel': {
    en: 'Iron and steel products for buyers across Central Asian markets. Dimensions, grade, standard and quantity aligned with the supplier before order.',
    fa: 'آهن و محصولات فولادی برای خریداران بازارهای آسیای مرکزی. ابعاد، گرید، استاندارد و مقدار پیش از تأیید سفارش با تأمین‌کننده تطبیق داده می‌شود.',
    ar: 'منتجات الحديد والصلب للمشترين في أسواق آسيا الوسطى. تُطابَق الأبعاد والدرجة والمواصفة والكمية مع المورد قبل تأكيد الطلب.',
    ru: 'Железо и стальная продукция для покупателей на рынках Центральной Азии. Размеры, марка, стандарт и объём согласуются до подтверждения заказа.',
  },
  'agricultural-commodities': {
    en: 'Barley from Russia alongside pulses, grains and selected agricultural commodities. Specifications and inspection agreed before the cargo moves.',
    fa: 'جو از روسیه در کنار حبوبات، غلات و کالاهای کشاورزی منتخب. مشخصات تجاری و الزامات بازرسی پیش از حرکت بار به‌صورت مکتوب توافق می‌شود.',
    ar: 'الشعير من روسيا إلى جانب البقول والحبوب والسلع الزراعية المختارة. تُتفق المواصفات التجارية ومتطلبات المعاينة قبل تحرك البضاعة.',
    ru: 'Ячмень из России, а также бобовые, зерновые и отдельные сельхозтовары. Спецификации и требования к контролю согласуются до отгрузки.',
  },
  'textile-raw-materials': {
    en: 'Silk yarn imports and specification-led sourcing of textile raw materials. Count, quality and packaging matched to the buyer before supply.',
    fa: 'واردات نخ ابریشم و تأمین مواد اولیه نساجی بر مبنای مشخصات. نمره، کیفیت و بسته‌بندی پیش از تأیید تأمین با نیاز خریدار تطبیق داده می‌شود.',
    ar: 'استيراد خيوط الحرير وتوريد المواد الخام للنسيج وفق المواصفات. تُطابَق النمرة والجودة والتعبئة مع طلب المشتري قبل تأكيد التوريد.',
    ru: 'Импорт шёлковой пряжи и подбор текстильного сырья по спецификации. Номер, качество и упаковка подбираются под требование покупателя.',
  },
  'chemicals-petrochemicals': {
    en: 'Polymer grades, base chemicals and industrial feedstock sourced direct from producing plants, against a technical data sheet and certificate of analysis.',
    fa: 'گریدهای پلیمری، مواد شیمیایی پایه و خوراک صنعتی، مستقیم از واحدهای تولیدی تأمین می‌شود؛ همراه با برگه مشخصات فنی و گواهی آنالیز تأییدشده.',
    ar: 'درجات البوليمر والمواد الكيميائية الأساسية واللقيم الصناعي، تُورَّد مباشرة من مصانع الإنتاج مع ورقة بيانات فنية وشهادة تحليل مؤكَّدة.',
    ru: 'Марки полимеров, базовая химия и промышленное сырьё напрямую с заводов, с подтверждённым техпаспортом и сертификатом анализа.',
  },
};

/** Search description for a commodity group page, if one is written. */
export const groupMetaDescription = (lang: LanguageCode, id: string): string | undefined =>
  groupMetaDescriptions[id]?.[lang];
