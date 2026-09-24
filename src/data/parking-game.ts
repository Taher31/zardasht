import type { LanguageCode } from '../i18n';
import type { Fleet, LevelId } from '../utils/parking-engine';

/**
 * Copy for the parking game on the 404 page. Kept out of i18n.ts, the way
 * Header.astro keeps its own chrome, since no other page uses it; the
 * component hands the one language it needs to the browser as JSON.
 *
 * `levels` is keyed by the level ids in utils/parking-engine.ts, so the type
 * checker catches a level added there without a name here. `{t}` and `{n}`
 * are filled in with localized numbers.
 */
export interface ParkingStrings {
  title: string;
  subtitle: string;
  intro: string;
  canvasLabel: string;
  fleets: Record<Fleet, string>;
  start: string;
  retry: string;
  next: string;
  replay: string;
  resume: string;
  level: string;
  time: string;
  best: string;
  sound: string;
  fullscreen: string;
  exitFullscreen: string;
  keys: string;
  steerLeft: string;
  steerRight: string;
  forward: string;
  reverse: string;
  crashTitle: string;
  crash: string;
  crashShip: string;
  jackknifeTitle: string;
  jackknife: string;
  parked: string;
  result: string;
  berthed: string;
  berthResult: string;
  newBest: string;
  stars: string;
  tipFacing: string;
  tipInside: string;
  tipStraight: string;
  paused: string;
  pausedBody: string;
  doneTitle: string;
  doneBody: string;
  levels: Record<LevelId, { name: string; hint: string }>;
}

export const parkingStrings: Record<LanguageCode, ParkingStrings> = {
  en: {
    title: 'Bay 404 is free',
    subtitle: 'While you are here, see whether you can park the truck.',
    intro: 'Park the ZMB truck, trailer or ship inside the gold lines, lined up straight and stopped. Pick a fleet above; each has its own bays, from easy to hard.',
    canvasLabel: 'Parking game. Park the truck, trailer or ship in the gold bay.',
    fleets: { truck: 'Truck', trailer: 'Trailer', ship: 'Ship' },
    start: 'Start',
    retry: 'Try again',
    next: 'Next bay',
    replay: 'Play again',
    resume: 'Resume',
    level: 'Level',
    time: 'Time',
    best: 'Best',
    sound: 'Sound',
    fullscreen: 'Full screen',
    exitFullscreen: 'Exit full screen',
    keys: 'Arrow keys or WASD to drive · R restarts · H sounds the horn',
    steerLeft: 'Steer left',
    steerRight: 'Steer right',
    forward: 'Drive forward',
    reverse: 'Reverse',
    crashTitle: 'Contact!',
    crash: 'The truck touched an obstacle. Take it slower and try again.',
    crashShip: 'The hull touched something. Come in slower: a ship takes far longer to stop than a truck.',
    jackknifeTitle: 'Jackknifed!',
    jackknife: 'The trailer folded against the cab. Small steering corrections work best when reversing.',
    parked: 'Parked',
    result: 'Parked in {t} s',
    berthed: 'Alongside',
    berthResult: 'Alongside in {t} s',
    newBest: 'New best time',
    stars: 'Rating: {n} of 3',
    tipFacing: 'Wrong way round: this bay is backed into, rear first.',
    tipInside: 'Nearly: the whole load has to be inside the lines.',
    tipStraight: 'Nearly: straighten up in the bay.',
    paused: 'Paused',
    pausedBody: 'The engine is idling. Resume when you are ready.',
    doneTitle: 'Every load delivered',
    doneBody: 'Every bay is filled and every ship alongside. For real shipments, our logistics team takes it from here.',
    levels: {
      'truck-1': { name: 'Straight in', hint: 'Drive forward into the gold bay and stop inside the lines.' },
      'truck-2': { name: 'Turn in', hint: 'Swing into the free bay between the parked trucks.' },
      'truck-3': { name: 'Loading dock', hint: 'Reverse into the dock so the rear of the truck faces the door.' },
      'truck-4': { name: 'Parallel', hint: 'Pull up beside the truck ahead, then reverse into the gap along the kerb.' },
      'truck-5': { name: 'Container yard', hint: 'Weave between the container stacks to the bay at the far end.' },
      'truck-6': { name: 'Weighbridge', hint: 'Line up with the narrow lane and stop square on the steel plate.' },
      'truck-7': { name: 'Three-point turn', hint: 'Turn round in the narrow street and park in the gold bay facing out.' },
      'trailer-1': { name: 'Pull-through', hint: 'Swing wide so the trailer clears the corner, then drive it into the stall.' },
      'trailer-2': { name: 'Straight back', hint: 'Reverse the trailer square onto the dock, with small corrections only.' },
      'trailer-3': { name: 'Offset dock', hint: 'Back the trailer into the dock without jackknifing it.' },
      'trailer-4': { name: 'Alley dock', hint: 'Back the trailer into the dock at a right angle: the classic driving-test manoeuvre.' },
      'ship-1': { name: 'Alongside', hint: 'A ship carries its way: ease off early, use astern to stop, and lie alongside the quay.' },
      'ship-2': { name: 'Between two ships', hint: 'Slip into the berth between the two moored ships without touching either.' },
      'ship-3': { name: 'Crosscurrent', hint: 'The river runs south: aim upstream of the berth and let the current carry you in.' },
      'ship-4': { name: 'Harbour basin', hint: 'Come in through the gap in the breakwater, then turn for the quay.' },
    },
  },
  fa: {
    title: 'جایگاه ۴۰۴ خالی است',
    subtitle: 'حالا که اینجا هستید، ببینید می‌توانید کامیون را پارک کنید.',
    intro: 'کامیون، تریلی یا کشتی ZMB را داخل خطوط طلایی، صاف و متوقف پارک کنید. از بالا یک ناوگان انتخاب کنید؛ هر کدام جایگاه‌های خودش را دارد، از آسان تا سخت.',
    canvasLabel: 'بازی پارک. کامیون، تریلی یا کشتی را در جایگاه طلایی پارک کنید.',
    fleets: { truck: 'کامیون', trailer: 'تریلی', ship: 'کشتی' },
    start: 'شروع',
    retry: 'تلاش دوباره',
    next: 'جایگاه بعدی',
    replay: 'بازی دوباره',
    resume: 'ادامه',
    level: 'مرحله',
    time: 'زمان',
    best: 'بهترین',
    sound: 'صدا',
    fullscreen: 'تمام‌صفحه',
    exitFullscreen: 'خروج از تمام‌صفحه',
    keys: 'کلیدهای جهت‌نما یا WASD برای رانندگی · R برای شروع دوباره · H برای بوق',
    steerLeft: 'فرمان به چپ',
    steerRight: 'فرمان به راست',
    forward: 'حرکت به جلو',
    reverse: 'دنده عقب',
    crashTitle: 'برخورد!',
    crash: 'کامیون به مانع برخورد کرد. آرام‌تر برانید و دوباره تلاش کنید.',
    crashShip: 'بدنهٔ کشتی به جایی خورد. آرام‌تر نزدیک شوید؛ کشتی خیلی دیرتر از کامیون می‌ایستد.',
    jackknifeTitle: 'تریلی تا شد!',
    jackknife: 'تریلی نسبت به کشنده بیش از حد چرخید. هنگام دنده عقب، فرمان را کم و تدریجی بچرخانید.',
    parked: 'پارک شد',
    result: 'زمان پارک: {t} ثانیه',
    berthed: 'پهلو گرفت',
    berthResult: 'زمان پهلوگیری: {t} ثانیه',
    newBest: 'رکورد جدید',
    stars: 'امتیاز: {n} از ۳',
    tipFacing: 'جهت برعکس است: در این جایگاه باید با دنده عقب وارد شوید.',
    tipInside: 'نزدیک است: همهٔ بار باید داخل خطوط باشد.',
    tipStraight: 'نزدیک است: در جایگاه صاف بایستید.',
    paused: 'توقف',
    pausedBody: 'موتور روشن است. هر وقت آماده بودید ادامه دهید.',
    doneTitle: 'همهٔ محموله‌ها تحویل شد',
    doneBody: 'همهٔ جایگاه‌ها پر شد و همهٔ کشتی‌ها پهلو گرفتند. برای محموله‌های واقعی، تیم لجستیک ما آماده است.',
    levels: {
      'truck-1': { name: 'مستقیم', hint: 'به جلو برانید و داخل خطوط جایگاه طلایی توقف کنید.' },
      'truck-2': { name: 'ورود با گردش', hint: 'به جایگاه خالی میان کامیون‌های پارک‌شده بپیچید.' },
      'truck-3': { name: 'سکوی بارگیری', hint: 'با دنده عقب وارد سکو شوید تا عقب کامیون رو به درِ انبار باشد.' },
      'truck-4': { name: 'پارک دوبل', hint: 'کنار کامیون جلویی بایستید، سپس با دنده عقب وارد فضای کنار جدول شوید.' },
      'truck-5': { name: 'محوطهٔ کانتینر', hint: 'از میان ردیف‌های کانتینر عبور کنید و به جایگاه انتهایی برسید.' },
      'truck-6': { name: 'باسکول', hint: 'با مسیر باریک هم‌راستا شوید و درست روی صفحهٔ فلزی باسکول بایستید.' },
      'truck-7': { name: 'دور زدن سه‌مرحله‌ای', hint: 'در کوچهٔ باریک دور بزنید و رو به بیرون در جایگاه طلایی پارک کنید.' },
      'trailer-1': { name: 'جایگاه عبوری', hint: 'دور را باز بگیرید تا تریلی به گوشه نخورد، سپس آن را وارد جایگاه کنید.' },
      'trailer-2': { name: 'عقب مستقیم', hint: 'تریلی را با دنده عقب، صاف روی سکو ببرید؛ فقط با اصلاح‌های کوچک.' },
      'trailer-3': { name: 'سکوی کناری', hint: 'تریلی را با دنده عقب وارد سکو کنید، بدون آنکه تا شود.' },
      'trailer-4': { name: 'سکوی نود درجه', hint: 'تریلی را با زاویهٔ نود درجه و دنده عقب وارد سکو کنید؛ آزمون کلاسیک رانندگان کامیون.' },
      'ship-1': { name: 'پهلوگیری', hint: 'کشتی سنگین است و دیر می‌ایستد: زود سرعت را کم کنید، با دندهٔ عقب ترمز کنید و کنار اسکله پهلو بگیرید.' },
      'ship-2': { name: 'میان دو کشتی', hint: 'بدون برخورد با دو کشتی پهلوگرفته، وارد جایگاه میان آن‌ها شوید.' },
      'ship-3': { name: 'جریان عرضی', hint: 'آب رودخانه به سمت جنوب می‌رود: بالادستِ جایگاه را نشانه بگیرید و بگذارید جریان شما را برساند.' },
      'ship-4': { name: 'حوضچهٔ بندر', hint: 'از دهانهٔ موج‌شکن وارد شوید، سپس به سمت اسکله بپیچید.' },
    },
  },
  ar: {
    title: 'الموقف 404 شاغر',
    subtitle: 'ما دمت هنا، جرّب أن تركن الشاحنة.',
    intro: 'اركن شاحنة ZMB أو مقطورتها أو سفينتها داخل الخطوط الذهبية، مستقيمةً ومتوقفة. اختر أسطولًا من الأعلى؛ لكلٍّ منها مواقفه، من السهل إلى الصعب.',
    canvasLabel: 'لعبة الركن. اركن الشاحنة أو المقطورة أو السفينة في الموقف الذهبي.',
    fleets: { truck: 'شاحنة', trailer: 'مقطورة', ship: 'سفينة' },
    start: 'ابدأ',
    retry: 'حاول مجددًا',
    next: 'الموقف التالي',
    replay: 'العب مجددًا',
    resume: 'متابعة',
    level: 'المرحلة',
    time: 'الوقت',
    best: 'الأفضل',
    sound: 'الصوت',
    fullscreen: 'ملء الشاشة',
    exitFullscreen: 'الخروج من ملء الشاشة',
    keys: 'مفاتيح الأسهم أو WASD للقيادة · R لإعادة المرحلة · H للبوق',
    steerLeft: 'توجيه إلى اليسار',
    steerRight: 'توجيه إلى اليمين',
    forward: 'تقدّم',
    reverse: 'رجوع إلى الخلف',
    crashTitle: 'اصطدام!',
    crash: 'لامست الشاحنة عائقًا. خفّف السرعة وحاول مجددًا.',
    crashShip: 'لامس بدن السفينة عائقًا. اقترب ببطء أكبر؛ فالسفينة تحتاج إلى مسافة أطول بكثير من الشاحنة كي تتوقف.',
    jackknifeTitle: 'انطوت المقطورة!',
    jackknife: 'انثنت المقطورة نحو المقصورة. عند الرجوع إلى الخلف، تنفع التصحيحات الصغيرة في التوجيه.',
    parked: 'تم الركن',
    result: 'زمن الركن: {t} ث',
    berthed: 'رست السفينة',
    berthResult: 'زمن الرسو: {t} ث',
    newBest: 'أفضل زمن جديد',
    stars: 'التقييم: {n} من 3',
    tipFacing: 'الاتجاه معكوس: يُدخَل هذا الموقف بالرجوع إلى الخلف، المؤخرة أولًا.',
    tipInside: 'اقتربت: يجب أن تكون الحمولة كلها داخل الخطوط.',
    tipStraight: 'اقتربت: اعتدل داخل الموقف.',
    paused: 'متوقف مؤقتًا',
    pausedBody: 'المحرك يعمل. تابع متى كنت مستعدًا.',
    doneTitle: 'تم تسليم جميع الشحنات',
    doneBody: 'امتلأت المواقف كلها ورست السفن جميعًا. أما الشحنات الحقيقية، فيتولاها فريق الخدمات اللوجستية لدينا.',
    levels: {
      'truck-1': { name: 'مباشرة', hint: 'تقدّم إلى الموقف الذهبي وتوقّف داخل الخطوط.' },
      'truck-2': { name: 'انعطاف', hint: 'انعطف إلى الموقف الشاغر بين الشاحنات المتوقفة.' },
      'truck-3': { name: 'رصيف التحميل', hint: 'ارجع إلى الرصيف بحيث تكون مؤخرة الشاحنة مقابل الباب.' },
      'truck-4': { name: 'ركن موازٍ', hint: 'توقّف بمحاذاة الشاحنة الأمامية، ثم ارجع إلى الفراغ المحاذي لحافة الطريق.' },
      'truck-5': { name: 'ساحة الحاويات', hint: 'تنقّل بين أكوام الحاويات حتى الموقف في الطرف البعيد.' },
      'truck-6': { name: 'ميزان الشاحنات', hint: 'حاذِ الممر الضيق وتوقّف تمامًا فوق لوح الميزان الفولاذي.' },
      'truck-7': { name: 'الدوران بثلاث حركات', hint: 'استدر في الشارع الضيق واركن في الموقف الذهبي متجهًا إلى الخارج.' },
      'trailer-1': { name: 'موقف عبور', hint: 'انعطف انعطافًا واسعًا كي لا تصطدم المقطورة بالزاوية، ثم أدخلها في الموقف.' },
      'trailer-2': { name: 'رجوع مستقيم', hint: 'أرجِع المقطورة مستقيمةً إلى الرصيف، بتصحيحات صغيرة فقط.' },
      'trailer-3': { name: 'رصيف جانبي', hint: 'أرجِع المقطورة إلى الرصيف دون أن تنطوي.' },
      'trailer-4': { name: 'رصيف بزاوية قائمة', hint: 'أرجِع المقطورة إلى الرصيف بزاوية قائمة؛ الاختبار الكلاسيكي لسائقي الشاحنات.' },
      'ship-1': { name: 'الرسو', hint: 'السفينة ثقيلة وتتوقف متأخرة: خفّف السرعة مبكرًا، واستخدم الرجوع للكبح، وارسُ بمحاذاة الرصيف.' },
      'ship-2': { name: 'بين سفينتين', hint: 'ادخل المرسى بين السفينتين الراسيتين دون أن تلامس أيًّا منهما.' },
      'ship-3': { name: 'تيار جانبي', hint: 'مياه النهر تجري جنوبًا: صوّب أعلى المرسى ودع التيار يحملك إليه.' },
      'ship-4': { name: 'حوض الميناء', hint: 'ادخل من فتحة كاسر الأمواج، ثم استدر نحو الرصيف.' },
    },
  },
  ru: {
    title: 'Место 404 свободно',
    subtitle: 'Раз уж вы здесь — попробуйте припарковать грузовик.',
    intro: 'Поставьте грузовик, автопоезд или судно ZMB внутри золотой разметки — ровно и без движения. Выберите флот вверху: у каждого свои места, от простых к сложным.',
    canvasLabel: 'Игра «Парковка». Поставьте грузовик, автопоезд или судно на золотое место.',
    fleets: { truck: 'Грузовик', trailer: 'Автопоезд', ship: 'Судно' },
    start: 'Поехали',
    retry: 'Ещё раз',
    next: 'Следующее место',
    replay: 'Играть снова',
    resume: 'Продолжить',
    level: 'Уровень',
    time: 'Время',
    best: 'Рекорд',
    sound: 'Звук',
    fullscreen: 'Во весь экран',
    exitFullscreen: 'Выйти из полноэкранного режима',
    keys: 'Стрелки или WASD — движение · R — заново · H — сигнал',
    steerLeft: 'Руль влево',
    steerRight: 'Руль вправо',
    forward: 'Вперёд',
    reverse: 'Задний ход',
    crashTitle: 'Касание!',
    crash: 'Грузовик задел препятствие. Сбавьте скорость и попробуйте снова.',
    crashShip: 'Корпус задел препятствие. Подходите медленнее: судно останавливается гораздо дольше грузовика.',
    jackknifeTitle: 'Складывание!',
    jackknife: 'Прицеп сложился относительно тягача. При движении задним ходом лучше подруливать понемногу.',
    parked: 'Припарковано',
    result: 'Время парковки: {t} с',
    berthed: 'Ошвартовано',
    berthResult: 'Время швартовки: {t} с',
    newBest: 'Новый рекорд',
    stars: 'Оценка: {n} из 3',
    tipFacing: 'Не той стороной: на это место заезжают задним ходом.',
    tipInside: 'Почти: весь груз должен быть внутри разметки.',
    tipStraight: 'Почти: встаньте ровно.',
    paused: 'Пауза',
    pausedBody: 'Двигатель работает на холостых. Продолжайте, когда будете готовы.',
    doneTitle: 'Все грузы доставлены',
    doneBody: 'Все места заняты, все суда у причала. Реальные поставки наша логистическая команда возьмёт на себя.',
    levels: {
      'truck-1': { name: 'Прямо', hint: 'Заезжайте вперёд на золотое место и остановитесь внутри разметки.' },
      'truck-2': { name: 'С поворотом', hint: 'Поверните на свободное место между припаркованными грузовиками.' },
      'truck-3': { name: 'Погрузочная рампа', hint: 'Сдайте задом к рампе, чтобы кузов смотрел на ворота склада.' },
      'truck-4': { name: 'Параллельная парковка', hint: 'Встаньте рядом с передним грузовиком и сдайте задом в просвет у бордюра.' },
      'truck-5': { name: 'Контейнерная площадка', hint: 'Проедьте между штабелями контейнеров к месту в дальнем конце.' },
      'truck-6': { name: 'Весовая', hint: 'Выровняйтесь по узкому проезду и остановитесь точно на весовой платформе.' },
      'truck-7': { name: 'Разворот в три приёма', hint: 'Развернитесь на узкой улице и встаньте на золотое место носом к выезду.' },
      'trailer-1': { name: 'Сквозной заезд', hint: 'Входите в поворот широко, чтобы прицеп не срезал угол, и заведите его на место.' },
      'trailer-2': { name: 'Прямо назад', hint: 'Сдайте полуприцеп ровно к рампе, лишь слегка подруливая.' },
      'trailer-3': { name: 'Рампа со смещением', hint: 'Загоните полуприцеп задним ходом к рампе, не сложив его.' },
      'trailer-4': { name: 'Под прямым углом', hint: 'Заведите полуприцеп к рампе задним ходом под прямым углом — классический экзамен водителя.' },
      'ship-1': { name: 'Швартовка', hint: 'Судно идёт по инерции: сбавляйте ход заранее, тормозите задним и встаньте вдоль причала.' },
      'ship-2': { name: 'Между двух судов', hint: 'Войдите на место между двумя ошвартованными судами, не задев ни одно.' },
      'ship-3': { name: 'Боковое течение', hint: 'Река течёт на юг: держитесь выше причала, и течение само поднесёт судно.' },
      'ship-4': { name: 'Портовый бассейн', hint: 'Войдите через проход в волноломе и разверните судно к причалу.' },
    },
  },
};
