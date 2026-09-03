import type { LanguageCode } from '../i18n';

/**
 * Incoterms 2020 reference for the trade map page.
 *
 * Every description here is written in our own words on purpose. The official
 * rule texts are published by the ICC and are copyrighted, so nothing in this
 * file is lifted from them — it is a plain-language summary of who does what,
 * which is what a buyer actually wants to know before asking for a price.
 *
 * `risk` is the point on the journey where risk moves from us to the buyer,
 * expressed 0–100 so the bar in the UI can be drawn from one number.
 */
export interface IncotermEntry {
  code: string;
  /** Full name of the rule, e.g. "Free on Board". */
  name: string;
  /** One line: what it means in practice. */
  summary: string;
  /** Where risk passes, as a percentage along the origin → destination line. */
  risk: number;
  /** Short label for the hand-over point, shown on the bar. */
  point: string;
  seller: string[];
  buyer: string[];
  /**
   * Who carries each duty, in the same order as `dutyColumns`:
   * 'S' = us (seller), 'B' = you (buyer), '-' = the rule does not require it.
   * Insurance is only mandatory under CIP and CIF; everywhere else whoever
   * carries the risk decides for themselves, so it is marked '-' rather than
   * pinned on either side.
   */
  duties: string[];
}

export interface IncotermsPack {
  eyebrow: string;
  title: string;
  intro: string;
  multimodalTitle: string;
  multimodalNote: string;
  seaTitle: string;
  seaNote: string;
  sellerLabel: string;
  buyerLabel: string;
  riskLabel: string;
  originLabel: string;
  destinationLabel: string;
  disclaimer: string;
  matrixTitle: string;
  matrixNote: string;
  termColumn: string;
  dutyColumns: string[];
  legendSeller: string;
  legendBuyer: string;
  legendNone: string;
  multimodal: IncotermEntry[];
  sea: IncotermEntry[];
}

const en: IncotermsPack = {
  eyebrow: 'Delivery terms',
  title: 'Incoterms 2020, in plain language',
  intro:
    'Every quote we send is tied to one of these rules. They settle who pays for what, and — more importantly — the exact point where the risk stops being ours and starts being yours.',
  multimodalTitle: 'Any mode of transport',
  multimodalNote: 'Road, rail, air, sea, or a mix of them. These seven cover most of what we move.',
  seaTitle: 'Sea and inland waterway only',
  seaNote: 'Use these when the cargo goes on a vessel and the hand-over happens at the port itself.',
  sellerLabel: 'On us',
  buyerLabel: 'On you',
  riskLabel: 'Risk passes to you at',
  originLabel: 'Origin',
  destinationLabel: 'Your door',
  matrixTitle: 'The whole set, side by side',
  matrixNote: 'Who carries each duty under every rule. Scroll sideways if your screen is narrow.',
  termColumn: 'Rule',
  dutyColumns: ['Loading at origin', 'Export clearance', 'Main carriage', 'Insurance', 'Import clearance', 'Delivery to you'],
  legendSeller: 'On us',
  legendBuyer: 'On you',
  legendNone: 'Not required by the rule',
  disclaimer:
    'This is a working summary, not legal advice. Incoterms rules cover delivery, cost and risk — they say nothing about who owns the goods or when you have to pay, which stays in the sales contract. The official rules are published by the International Chamber of Commerce. Whatever we agree in writing on the contract is what counts.',
  multimodal: [
    {
      code: 'EXW',
      duties: ['B','B','B','-','B','B'],
      name: 'Ex Works',
      summary: 'You collect from the seller’s gate. Everything after that is yours.',
      risk: 4,
      point: 'Seller’s premises',
      seller: ['Have the goods packed and ready on the agreed date', 'Hand over at our premises'],
      buyer: ['Loading', 'Export clearance', 'All freight and insurance', 'Import clearance and delivery'],
    },
    {
      code: 'FCA',
      duties: ['S','S','B','-','B','B'],
      name: 'Free Carrier',
      summary: 'We hand the goods to your carrier, cleared for export. From there it is on you.',
      risk: 20,
      point: 'Named place at origin',
      seller: ['Export clearance', 'Delivery to the carrier you name', 'Loading where it happens at our premises'],
      buyer: ['Main freight', 'Insurance', 'Import clearance and delivery'],
    },
    {
      code: 'CPT',
      duties: ['S','S','S','-','B','B'],
      name: 'Carriage Paid To',
      summary: 'We book and pay the freight, but risk moves to you as soon as the first carrier takes the cargo.',
      risk: 22,
      point: 'First carrier at origin',
      seller: ['Export clearance', 'Freight to the named destination'],
      buyer: ['Risk during the main carriage', 'Insurance', 'Import clearance and delivery'],
    },
    {
      code: 'CIP',
      duties: ['S','S','S','S','B','B'],
      name: 'Carriage and Insurance Paid To',
      summary: 'Same as CPT, but we also take out the insurance for the journey.',
      risk: 22,
      point: 'First carrier at origin',
      seller: ['Export clearance', 'Freight to destination', 'Insurance cover for the journey'],
      buyer: ['Risk during the main carriage', 'Import clearance and delivery'],
    },
    {
      code: 'DAP',
      duties: ['S','S','S','-','B','S'],
      name: 'Delivered at Place',
      summary: 'We bring it to the address you name. You handle the import side.',
      risk: 82,
      point: 'Named place, ready for unloading',
      seller: ['Export clearance', 'All freight to the named place', 'Risk the whole way there'],
      buyer: ['Unloading', 'Import duties and clearance'],
    },
    {
      code: 'DPU',
      duties: ['S','S','S','-','B','S'],
      name: 'Delivered at Place Unloaded',
      summary: 'Like DAP, except we also unload it for you. The only rule where we do.',
      risk: 88,
      point: 'Named place, unloaded',
      seller: ['Export clearance', 'Freight to the named place', 'Unloading'],
      buyer: ['Import duties and clearance'],
    },
    {
      code: 'DDP',
      duties: ['S','S','S','-','S','S'],
      name: 'Delivered Duty Paid',
      summary: 'Door to door with duties paid. The most we can take on, and what most of our buyers ask for.',
      risk: 97,
      point: 'Your door, duties paid',
      seller: ['Export clearance', 'All freight', 'Import duties and clearance', 'Delivery to your address'],
      buyer: ['Unloading on arrival'],
    },
  ],
  sea: [
    {
      code: 'FAS',
      duties: ['B','S','B','-','B','B'],
      name: 'Free Alongside Ship',
      summary: 'We place the cargo on the quay next to your vessel. Loading it is your call.',
      risk: 26,
      point: 'Alongside the vessel',
      seller: ['Export clearance', 'Delivery alongside the ship at the named port'],
      buyer: ['Loading onto the vessel', 'Sea freight and insurance', 'Import clearance and delivery'],
    },
    {
      code: 'FOB',
      duties: ['S','S','B','-','B','B'],
      name: 'Free on Board',
      summary: 'Risk changes hands the moment the goods are on board. The classic bulk term.',
      risk: 32,
      point: 'On board at the port of shipment',
      seller: ['Export clearance', 'Loading onto the vessel you nominate'],
      buyer: ['Sea freight', 'Insurance', 'Import clearance and delivery'],
    },
    {
      code: 'CFR',
      duties: ['S','S','S','-','B','B'],
      name: 'Cost and Freight',
      summary: 'We pay the sea freight to your port, but risk is already yours once it is loaded.',
      risk: 32,
      point: 'On board at the port of shipment',
      seller: ['Export clearance', 'Loading', 'Sea freight to the destination port'],
      buyer: ['Risk from loading onward', 'Insurance', 'Import clearance and delivery'],
    },
    {
      code: 'CIF',
      duties: ['S','S','S','S','B','B'],
      name: 'Cost, Insurance and Freight',
      summary: 'CFR with insurance added. Common on letters of credit.',
      risk: 32,
      point: 'On board at the port of shipment',
      seller: ['Export clearance', 'Loading', 'Sea freight', 'Insurance to the destination port'],
      buyer: ['Risk from loading onward', 'Import clearance and delivery'],
    },
  ],
};

const fa: IncotermsPack = {
  eyebrow: 'شرایط تحویل',
  title: 'اینکوترمز ۲۰۲۰، به زبان ساده',
  intro:
    'هر پیش‌فاکتوری که می‌فرستیم روی یکی از این قاعده‌هاست. تکلیف هزینه‌ها را روشن می‌کند و مهم‌تر از آن، دقیقاً می‌گوید ریسک از کجا از گردن ما برمی‌دارد و می‌افتد گردن شما.',
  multimodalTitle: 'همه روش‌های حمل',
  multimodalNote: 'جاده‌ای، ریلی، هوایی، دریایی یا ترکیبی. بیشتر بارهایی که جابه‌جا می‌کنیم زیر همین هفت‌تاست.',
  seaTitle: 'فقط دریایی و آبراه داخلی',
  seaNote: 'وقتی بار سوار کشتی می‌شود و تحویل خودِ بندر انجام می‌شود، سراغ این چهارتا بروید.',
  sellerLabel: 'با ما',
  buyerLabel: 'با شما',
  riskLabel: 'ریسک از این نقطه با شماست',
  originLabel: 'مبدأ',
  destinationLabel: 'درِ انبار شما',
  matrixTitle: 'همه ترم‌ها، کنار هم',
  matrixNote: 'در هر قاعده چه کاری با کیست. اگر صفحه‌تان باریک است، جدول را افقی بکشید.',
  termColumn: 'ترم',
  dutyColumns: ['بارگیری در مبدأ', 'ترخیص صادرات', 'حمل اصلی', 'بیمه', 'ترخیص واردات', 'تحویل به شما'],
  legendSeller: 'با ما',
  legendBuyer: 'با شما',
  legendNone: 'قاعده الزامی نکرده',
  disclaimer:
    'این یک خلاصه کاربردی است، نه مشاوره حقوقی. اینکوترمز فقط تکلیف تحویل، هزینه و ریسک را روشن می‌کند؛ درباره مالکیت کالا و زمان پرداخت چیزی نمی‌گوید — آن‌ها در قرارداد فروش مشخص می‌شوند. متن رسمی این قواعد را اتاق بازرگانی بین‌المللی (ICC) منتشر می‌کند. در نهایت آنچه در قرارداد مکتوب توافق کنیم، ملاک است.',
  multimodal: [
    {
      code: 'EXW',
      duties: ['B','B','B','-','B','B'],
      name: 'تحویل در محل کار',
      summary: 'بار را از درِ انبار فروشنده تحویل می‌گیرید. از آن به بعد همه‌چیز با شماست.',
      risk: 4,
      point: 'انبار فروشنده',
      seller: ['آماده و بسته‌بندی‌شده تحویل دادن بار در تاریخ توافقی', 'تحویل در محل ما'],
      buyer: ['بارگیری', 'ترخیص صادرات', 'کل حمل و بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'FCA',
      duties: ['S','S','B','-','B','B'],
      name: 'تحویل به حمل‌کننده',
      summary: 'بار را با ترخیص صادراتی به حمل‌کننده شما می‌دهیم. از آنجا به بعد با شماست.',
      risk: 20,
      point: 'محل توافق‌شده در مبدأ',
      seller: ['ترخیص صادرات', 'تحویل به حمل‌کننده‌ای که معرفی می‌کنید', 'بارگیری، اگر در محل ما انجام شود'],
      buyer: ['حمل اصلی', 'بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'CPT',
      duties: ['S','S','S','-','B','B'],
      name: 'کرایه حمل پرداخت‌شده تا',
      summary: 'کرایه را ما می‌دهیم، ولی ریسک به‌محض تحویل به اولین حمل‌کننده می‌افتد گردن شما.',
      risk: 22,
      point: 'اولین حمل‌کننده در مبدأ',
      seller: ['ترخیص صادرات', 'کرایه حمل تا مقصد توافق‌شده'],
      buyer: ['ریسک در طول مسیر اصلی', 'بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'CIP',
      duties: ['S','S','S','S','B','B'],
      name: 'کرایه و بیمه پرداخت‌شده تا',
      summary: 'همان CPT، با این تفاوت که بیمه مسیر را هم ما می‌گیریم.',
      risk: 22,
      point: 'اولین حمل‌کننده در مبدأ',
      seller: ['ترخیص صادرات', 'کرایه حمل تا مقصد', 'بیمه مسیر'],
      buyer: ['ریسک در طول مسیر اصلی', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'DAP',
      duties: ['S','S','S','-','B','S'],
      name: 'تحویل در محل مقرر',
      summary: 'تا آدرسی که می‌دهید می‌آوریم. کارهای واردات با شماست.',
      risk: 82,
      point: 'محل مقرر، آماده تخلیه',
      seller: ['ترخیص صادرات', 'کل حمل تا محل مقرر', 'ریسک تا همان‌جا'],
      buyer: ['تخلیه بار', 'عوارض و ترخیص واردات'],
    },
    {
      code: 'DPU',
      duties: ['S','S','S','-','B','S'],
      name: 'تحویل در محل مقرر پس از تخلیه',
      summary: 'مثل DAP، با این فرق که تخلیه را هم ما انجام می‌دهیم. تنها قاعده‌ای که این کار با فروشنده است.',
      risk: 88,
      point: 'محل مقرر، پس از تخلیه',
      seller: ['ترخیص صادرات', 'حمل تا محل مقرر', 'تخلیه'],
      buyer: ['عوارض و ترخیص واردات'],
    },
    {
      code: 'DDP',
      duties: ['S','S','S','-','S','S'],
      name: 'تحویل با عوارض پرداخت‌شده',
      summary: 'درب‌به‌درب با عوارض پرداخت‌شده. بیشترین کاری که از ما برمی‌آید و همان چیزی که اغلب مشتری‌ها می‌خواهند.',
      risk: 97,
      point: 'درِ انبار شما، با عوارض پرداخت‌شده',
      seller: ['ترخیص صادرات', 'کل حمل', 'عوارض و ترخیص واردات', 'تحویل در آدرس شما'],
      buyer: ['تخلیه هنگام رسیدن بار'],
    },
  ],
  sea: [
    {
      code: 'FAS',
      duties: ['B','S','B','-','B','B'],
      name: 'تحویل در کنار کشتی',
      summary: 'بار را روی اسکله کنار کشتی شما می‌گذاریم. بارگیری‌اش با خودتان.',
      risk: 26,
      point: 'کنار کشتی',
      seller: ['ترخیص صادرات', 'تحویل کنار کشتی در بندر توافق‌شده'],
      buyer: ['بارگیری روی کشتی', 'کرایه دریایی و بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'FOB',
      duties: ['S','S','B','-','B','B'],
      name: 'تحویل روی عرشه',
      summary: 'به‌محض اینکه بار روی عرشه رفت، ریسک با شماست. ترم کلاسیک بارهای فله.',
      risk: 32,
      point: 'روی عرشه در بندر بارگیری',
      seller: ['ترخیص صادرات', 'بارگیری روی کشتی‌ای که معرفی می‌کنید'],
      buyer: ['کرایه دریایی', 'بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'CFR',
      duties: ['S','S','S','-','B','B'],
      name: 'هزینه و کرایه حمل',
      summary: 'کرایه دریایی تا بندر شما را ما می‌دهیم، ولی ریسک از لحظه بارگیری با شماست.',
      risk: 32,
      point: 'روی عرشه در بندر بارگیری',
      seller: ['ترخیص صادرات', 'بارگیری', 'کرایه دریایی تا بندر مقصد'],
      buyer: ['ریسک از لحظه بارگیری', 'بیمه', 'ترخیص واردات و تحویل'],
    },
    {
      code: 'CIF',
      duties: ['S','S','S','S','B','B'],
      name: 'هزینه، بیمه و کرایه حمل',
      summary: 'همان CFR به‌علاوه بیمه. روی اعتبار اسنادی زیاد استفاده می‌شود.',
      risk: 32,
      point: 'روی عرشه در بندر بارگیری',
      seller: ['ترخیص صادرات', 'بارگیری', 'کرایه دریایی', 'بیمه تا بندر مقصد'],
      buyer: ['ریسک از لحظه بارگیری', 'ترخیص واردات و تحویل'],
    },
  ],
};

const ar: IncotermsPack = {
  eyebrow: 'شروط التسليم',
  title: 'إنكوترمز 2020 بلغة واضحة',
  intro:
    'كل عرض سعر نرسله مبني على واحدة من هذه القواعد. تحدد من يدفع ماذا، والأهم: النقطة التي تنتقل عندها المخاطر من عهدتنا إلى عهدتكم.',
  multimodalTitle: 'كل وسائل النقل',
  multimodalNote: 'براً أو سككاً أو جواً أو بحراً أو مزيجاً منها. معظم ما ننقله يقع ضمن هذه السبع.',
  seaTitle: 'النقل البحري والنهري فقط',
  seaNote: 'استخدموها عندما تُشحن البضاعة على سفينة ويتم التسليم في الميناء نفسه.',
  sellerLabel: 'علينا',
  buyerLabel: 'عليكم',
  riskLabel: 'تنتقل المخاطر إليكم عند',
  originLabel: 'المنشأ',
  destinationLabel: 'باب مستودعكم',
  matrixTitle: 'كل القواعد جنباً إلى جنب',
  matrixNote: 'من يتحمل كل التزام في كل قاعدة. اسحب الجدول أفقياً إن كانت الشاشة ضيقة.',
  termColumn: 'القاعدة',
  dutyColumns: ['التحميل في المنشأ', 'تخليص التصدير', 'النقل الرئيسي', 'التأمين', 'تخليص الاستيراد', 'التسليم إليكم'],
  legendSeller: 'علينا',
  legendBuyer: 'عليكم',
  legendNone: 'غير مُلزَم بالقاعدة',
  disclaimer:
    'هذا ملخص عملي وليس استشارة قانونية. قواعد إنكوترمز تنظّم التسليم والتكلفة والمخاطر فقط، ولا تتناول ملكية البضاعة ولا موعد الدفع — وهذان يبقيان في عقد البيع. النص الرسمي للقواعد تصدره غرفة التجارة الدولية. وما نتفق عليه كتابةً في العقد هو المرجع.',
  multimodal: [
    {
      code: 'EXW',
      duties: ['B','B','B','-','B','B'],
      name: 'التسليم في المصنع',
      summary: 'تستلمون البضاعة من باب البائع، وكل ما بعد ذلك عليكم.',
      risk: 4,
      point: 'مقر البائع',
      seller: ['تجهيز البضاعة معبأة في الموعد المتفق عليه', 'التسليم في مقرنا'],
      buyer: ['التحميل', 'تخليص التصدير', 'الشحن والتأمين بالكامل', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'FCA',
      duties: ['S','S','B','-','B','B'],
      name: 'التسليم إلى الناقل',
      summary: 'نسلّم البضاعة مخلَّصة للتصدير إلى ناقلكم، ومن هناك تصبح عليكم.',
      risk: 20,
      point: 'المكان المتفق عليه في المنشأ',
      seller: ['تخليص التصدير', 'التسليم إلى الناقل الذي تحددونه', 'التحميل إن تم في مقرنا'],
      buyer: ['الشحن الرئيسي', 'التأمين', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'CPT',
      duties: ['S','S','S','-','B','B'],
      name: 'أجرة النقل مدفوعة حتى',
      summary: 'ندفع أجرة النقل، لكن المخاطر تنتقل إليكم بمجرد تسليم البضاعة لأول ناقل.',
      risk: 22,
      point: 'أول ناقل في المنشأ',
      seller: ['تخليص التصدير', 'أجرة النقل حتى الوجهة المتفق عليها'],
      buyer: ['المخاطر أثناء النقل الرئيسي', 'التأمين', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'CIP',
      duties: ['S','S','S','S','B','B'],
      name: 'أجرة النقل والتأمين مدفوعة حتى',
      summary: 'مثل CPT، مع إضافة التأمين على الرحلة من جانبنا.',
      risk: 22,
      point: 'أول ناقل في المنشأ',
      seller: ['تخليص التصدير', 'أجرة النقل حتى الوجهة', 'التأمين على الرحلة'],
      buyer: ['المخاطر أثناء النقل الرئيسي', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'DAP',
      duties: ['S','S','S','-','B','S'],
      name: 'التسليم في مكان محدد',
      summary: 'نوصلها إلى العنوان الذي تحددونه، وإجراءات الاستيراد عليكم.',
      risk: 82,
      point: 'المكان المحدد، جاهزة للتفريغ',
      seller: ['تخليص التصدير', 'كامل النقل حتى المكان المحدد', 'المخاطر حتى هناك'],
      buyer: ['التفريغ', 'الرسوم وتخليص الاستيراد'],
    },
    {
      code: 'DPU',
      duties: ['S','S','S','-','B','S'],
      name: 'التسليم في مكان محدد بعد التفريغ',
      summary: 'مثل DAP لكننا نتولى التفريغ أيضاً. القاعدة الوحيدة التي يقع فيها التفريغ على البائع.',
      risk: 88,
      point: 'المكان المحدد، بعد التفريغ',
      seller: ['تخليص التصدير', 'النقل حتى المكان المحدد', 'التفريغ'],
      buyer: ['الرسوم وتخليص الاستيراد'],
    },
    {
      code: 'DDP',
      duties: ['S','S','S','-','S','S'],
      name: 'التسليم مع دفع الرسوم',
      summary: 'من الباب إلى الباب مع دفع الرسوم. أقصى ما نتحمله، وهو ما يطلبه معظم مشترينا.',
      risk: 97,
      point: 'باب مستودعكم، الرسوم مدفوعة',
      seller: ['تخليص التصدير', 'كامل النقل', 'الرسوم وتخليص الاستيراد', 'التسليم إلى عنوانكم'],
      buyer: ['التفريغ عند الوصول'],
    },
  ],
  sea: [
    {
      code: 'FAS',
      duties: ['B','S','B','-','B','B'],
      name: 'التسليم بجانب السفينة',
      summary: 'نضع البضاعة على الرصيف بجانب سفينتكم، والتحميل عليكم.',
      risk: 26,
      point: 'بجانب السفينة',
      seller: ['تخليص التصدير', 'التسليم بجانب السفينة في الميناء المتفق عليه'],
      buyer: ['التحميل على السفينة', 'الشحن البحري والتأمين', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'FOB',
      duties: ['S','S','B','-','B','B'],
      name: 'التسليم على ظهر السفينة',
      summary: 'تنتقل المخاطر لحظة وصول البضاعة إلى ظهر السفينة. القاعدة الكلاسيكية للبضائع السائبة.',
      risk: 32,
      point: 'على ظهر السفينة في ميناء الشحن',
      seller: ['تخليص التصدير', 'التحميل على السفينة التي تحددونها'],
      buyer: ['الشحن البحري', 'التأمين', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'CFR',
      duties: ['S','S','S','-','B','B'],
      name: 'التكلفة وأجرة الشحن',
      summary: 'ندفع الشحن البحري حتى ميناءكم، لكن المخاطر عليكم منذ لحظة التحميل.',
      risk: 32,
      point: 'على ظهر السفينة في ميناء الشحن',
      seller: ['تخليص التصدير', 'التحميل', 'الشحن البحري حتى ميناء الوجهة'],
      buyer: ['المخاطر من لحظة التحميل', 'التأمين', 'تخليص الاستيراد والتسليم'],
    },
    {
      code: 'CIF',
      duties: ['S','S','S','S','B','B'],
      name: 'التكلفة والتأمين وأجرة الشحن',
      summary: 'نفس CFR مع التأمين. شائعة في الاعتمادات المستندية.',
      risk: 32,
      point: 'على ظهر السفينة في ميناء الشحن',
      seller: ['تخليص التصدير', 'التحميل', 'الشحن البحري', 'التأمين حتى ميناء الوجهة'],
      buyer: ['المخاطر من لحظة التحميل', 'تخليص الاستيراد والتسليم'],
    },
  ],
};

const ru: IncotermsPack = {
  eyebrow: 'Условия поставки',
  title: 'Инкотермс 2020 простыми словами',
  intro:
    'Каждое наше предложение привязано к одному из этих правил. Они определяют, кто за что платит, и главное — в какой именно точке риск переходит с нас на вас.',
  multimodalTitle: 'Любой вид транспорта',
  multimodalNote: 'Авто, ж/д, авиа, море или их сочетание. Большая часть наших отгрузок идёт по этим семи.',
  seaTitle: 'Только море и внутренние водные пути',
  seaNote: 'Используйте их, когда груз идёт на судне, а передача происходит в самом порту.',
  sellerLabel: 'На нас',
  buyerLabel: 'На вас',
  riskLabel: 'Риск переходит к вам в точке',
  originLabel: 'Отправление',
  destinationLabel: 'Ваш склад',
  matrixTitle: 'Все правила рядом',
  matrixNote: 'Кто несёт каждую обязанность по каждому правилу. На узком экране таблица прокручивается вбок.',
  termColumn: 'Правило',
  dutyColumns: ['Погрузка в отправлении', 'Экспортное оформление', 'Основная перевозка', 'Страхование', 'Импортное оформление', 'Доставка вам'],
  legendSeller: 'На нас',
  legendBuyer: 'На вас',
  legendNone: 'Правилом не требуется',
  disclaimer:
    'Это рабочая сводка, а не юридическая консультация. Инкотермс регулирует поставку, расходы и риск — но ничего не говорит о праве собственности на товар и сроках оплаты, это остаётся в договоре купли-продажи. Официальные тексты правил издаёт Международная торговая палата. Решающим является то, что мы письменно согласовали в договоре.',
  multimodal: [
    {
      code: 'EXW',
      duties: ['B','B','B','-','B','B'],
      name: 'Франко завод',
      summary: 'Вы забираете груз от ворот продавца. Всё, что дальше, — на вас.',
      risk: 4,
      point: 'Склад продавца',
      seller: ['Подготовить и упаковать груз к согласованной дате', 'Передать на нашей территории'],
      buyer: ['Погрузка', 'Экспортное оформление', 'Вся перевозка и страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'FCA',
      duties: ['S','S','B','-','B','B'],
      name: 'Франко перевозчик',
      summary: 'Передаём груз вашему перевозчику с экспортным оформлением. Дальше — ваша зона.',
      risk: 20,
      point: 'Согласованное место в стране отправления',
      seller: ['Экспортное оформление', 'Передача указанному вами перевозчику', 'Погрузка, если она на нашей территории'],
      buyer: ['Основная перевозка', 'Страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'CPT',
      duties: ['S','S','S','-','B','B'],
      name: 'Перевозка оплачена до',
      summary: 'Фрахт оплачиваем мы, но риск переходит к вам сразу при передаче первому перевозчику.',
      risk: 22,
      point: 'Первый перевозчик в стране отправления',
      seller: ['Экспортное оформление', 'Фрахт до согласованного пункта'],
      buyer: ['Риск в основной перевозке', 'Страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'CIP',
      duties: ['S','S','S','S','B','B'],
      name: 'Перевозка и страхование оплачены до',
      summary: 'То же, что CPT, но страхование рейса мы тоже берём на себя.',
      risk: 22,
      point: 'Первый перевозчик в стране отправления',
      seller: ['Экспортное оформление', 'Фрахт до пункта назначения', 'Страхование рейса'],
      buyer: ['Риск в основной перевозке', 'Импортное оформление и доставка'],
    },
    {
      code: 'DAP',
      duties: ['S','S','S','-','B','S'],
      name: 'Поставка в месте назначения',
      summary: 'Довозим до указанного вами адреса. Импортная часть — на вас.',
      risk: 82,
      point: 'Указанное место, готово к разгрузке',
      seller: ['Экспортное оформление', 'Вся перевозка до указанного места', 'Риск на всём пути туда'],
      buyer: ['Разгрузка', 'Пошлины и импортное оформление'],
    },
    {
      code: 'DPU',
      duties: ['S','S','S','-','B','S'],
      name: 'Поставка в месте назначения с разгрузкой',
      summary: 'Как DAP, но разгрузку делаем мы. Единственное правило, где это на продавце.',
      risk: 88,
      point: 'Указанное место, после разгрузки',
      seller: ['Экспортное оформление', 'Перевозка до указанного места', 'Разгрузка'],
      buyer: ['Пошлины и импортное оформление'],
    },
    {
      code: 'DDP',
      duties: ['S','S','S','-','S','S'],
      name: 'Поставка с оплатой пошлин',
      summary: 'От двери до двери с оплаченными пошлинами. Максимум, что мы берём на себя, и то, что чаще всего просят.',
      risk: 97,
      point: 'Ваш адрес, пошлины оплачены',
      seller: ['Экспортное оформление', 'Вся перевозка', 'Пошлины и импортное оформление', 'Доставка по вашему адресу'],
      buyer: ['Разгрузка по прибытии'],
    },
  ],
  sea: [
    {
      code: 'FAS',
      duties: ['B','S','B','-','B','B'],
      name: 'Свободно вдоль борта судна',
      summary: 'Ставим груз на причал рядом с вашим судном. Погрузка — ваша забота.',
      risk: 26,
      point: 'Вдоль борта судна',
      seller: ['Экспортное оформление', 'Доставка к борту судна в согласованном порту'],
      buyer: ['Погрузка на судно', 'Морской фрахт и страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'FOB',
      duties: ['S','S','B','-','B','B'],
      name: 'Свободно на борту',
      summary: 'Риск переходит в момент, когда груз оказывается на борту. Классика для навалочных грузов.',
      risk: 32,
      point: 'На борту в порту отгрузки',
      seller: ['Экспортное оформление', 'Погрузка на указанное вами судно'],
      buyer: ['Морской фрахт', 'Страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'CFR',
      duties: ['S','S','S','-','B','B'],
      name: 'Стоимость и фрахт',
      summary: 'Морской фрахт до вашего порта оплачиваем мы, но риск уже ваш с момента погрузки.',
      risk: 32,
      point: 'На борту в порту отгрузки',
      seller: ['Экспортное оформление', 'Погрузка', 'Морской фрахт до порта назначения'],
      buyer: ['Риск с момента погрузки', 'Страхование', 'Импортное оформление и доставка'],
    },
    {
      code: 'CIF',
      duties: ['S','S','S','S','B','B'],
      name: 'Стоимость, страхование и фрахт',
      summary: 'CFR плюс страхование. Часто встречается в аккредитивах.',
      risk: 32,
      point: 'На борту в порту отгрузки',
      seller: ['Экспортное оформление', 'Погрузка', 'Морской фрахт', 'Страхование до порта назначения'],
      buyer: ['Риск с момента погрузки', 'Импортное оформление и доставка'],
    },
  ],
};

const packs: Record<LanguageCode, IncotermsPack> = { en, fa, ar, ru };

export function getIncoterms(lang: LanguageCode): IncotermsPack {
  return packs[lang] ?? packs.en;
}
