import { BusinessModel, BonusItem, Promotion, GameEvent, MonthNews, CompetitorState, StaffMember } from '../types/game';

// Business Models
export const BUSINESS_MODELS: BusinessModel[] = [
  {
    id: 'classic',
    name: 'Klassik Kofexona',
    tagline: 'O‘rtacha narx, qulay shinam muhit va keng auditoriya',
    description: 'Barcha qatlam vakillari — talabalar, ishbilarmonlar va oilalar uchun mo‘ljallangan shinam qahvaxona. Barqaror talab va xavfsiz daromad.',
    pros: [
      'Bozor talabi barqaror va doimiy',
      'Xarajat va daromad muvozanatlashgan',
      'Mijozlar oqimi mavsumga kam bog‘liq'
    ],
    cons: [
      'Raqobat juda kuchli',
      'Sof foyda marjasi o‘rtacha (30-35%)'
    ],
    image: '/src/assets/images/cafe_model_classic_1793950470063.jpg',
    basePrice: 22000, // so'm per cup
    baseCostPerCup: 7500,
    initialReputation: 60,
    baseMonthlyDemand: 3600, // cups per month
    marginMultiplier: 1.0,
    capacitySensitivity: 1.0
  },
  {
    id: 'premium',
    name: 'Premium Kofexona',
    tagline: 'Oliy navli donlar, eksklyuziv interyer va yuqori chek',
    description: 'Termizning nufuzli mehmonlari, tadbirkorlar va estetika shinavandalari uchun mo‘ljallangan lyuks qahvaxona. Sifat va xizmat eng oliy darajada.',
    pros: [
      'Yuqori chek va katta marja (50-60%)',
      'Mijozlar juda sodiq va narxga chidamli',
      'Brend obro‘si tez o‘sadi'
    ],
    cons: [
      'Xodimlar va xomashyo talabi juda qattiq',
      'Mijozlar soni cheklangan, kichik xatolar qimmatga tushadi'
    ],
    image: '/src/assets/images/cafe_model_premium_1793950471368.jpg',
    basePrice: 38000,
    baseCostPerCup: 12000,
    initialReputation: 72,
    baseMonthlyDemand: 2200,
    marginMultiplier: 1.4,
    capacitySensitivity: 1.4
  },
  {
    id: 'fast',
    name: 'Tez va Arzon (Express)',
    tagline: 'Take-away, tezkor xizmat va ulkan mijozlar oqimi',
    description: 'Termiz markazidagi gavjum ko‘chada yoki universitet yaqinida joylashgan express-nuqta. Minimal kutish va arzon narxlar evaziga katta aylanma.',
    pros: [
      'Eng katta mijozlar oqimi',
      'O‘z-o‘zini tez qoplaydi',
      'Ko‘cha savdosi juda faol'
    ],
    cons: [
      'Kichik marja (20-25%)',
      'Xodimlarga katta yuklama va navbat paytida shikoyatlar ko‘payishi mumkin'
    ],
    image: '/src/assets/images/cafe_model_fast_1793950469643.jpg',
    basePrice: 15000,
    baseCostPerCup: 6500,
    initialReputation: 55,
    baseMonthlyDemand: 5400,
    marginMultiplier: 0.8,
    capacitySensitivity: 1.3
  },
  {
    id: 'subscription',
    name: 'Obuna Modeli (Coffee Pass)',
    tagline: 'Oylik a\'zolik, kafolatlangan doimiy tushum va sodiq hamjamiyat',
    description: 'Mijozlar har oy 250 000 – 350 000 so‘mlik obuna sotib oladi va har kuni o‘z sevimli kofesini oladi. Bashorat qilinadigan barqaror kassa.',
    pros: [
      'Kafolatlangan oylik kassa oqimi',
      'Mijozlarning 80% doimiy a\'zoga aylanadi',
      'Bozordagi eng yuqori mijoz sodiqligi'
    ],
    cons: [
      'Boshlang‘ich jalb qilish xarajati yuqori',
      'Obunachilar soni kam bo‘lsa, xarajatlar yuk bo‘ladi'
    ],
    image: '/src/assets/images/termiz_coffee_hero_1793950469298.jpg',
    basePrice: 20000,
    baseCostPerCup: 7000,
    initialReputation: 65,
    baseMonthlyDemand: 3400,
    marginMultiplier: 1.1,
    capacitySensitivity: 1.1
  }
];

// Initial Staff Base Setup
export const INITIAL_STAFF: StaffMember[] = [
  {
    role: 'barista',
    title: 'Professional Barista',
    count: 2,
    salary: 4500000, // 4.5 mln so'm/month
    capacityPerPerson: 1800, // handles up to 1,800 drinks per month
    description: 'Qahva tayyorlash tezligi, retseptura va ichimlik ta\'mi ustasi.',
    effect: '+1 800 ta ichimlik quvvati, sifat barqarorligi'
  },
  {
    role: 'cashier',
    title: 'Kassir-Operator',
    count: 1,
    salary: 3500000, // 3.5 mln so'm/month
    capacityPerPerson: 3600, // handles up to 3,600 checkouts per month
    description: 'Mijozlarga hisob-kitob qilish, tezkor to‘lov va buyurtma qabul qilish.',
    effect: '+3 600 ta buyurtma quvvati, navbatlarni kamaytiradi'
  },
  {
    role: 'cleaner',
    title: 'Xizmat va tozalik xodimi',
    count: 1,
    salary: 2800000, // 2.8 mln so'm/month
    capacityPerPerson: 4000,
    description: 'Zal tozaligi, qulaylik va sanitariya me\'yorlarini ta\'minlaydi.',
    effect: 'Mijoz mamnunligini +8% saqlaydi, SES xavfini pasaytiradi'
  },
  {
    role: 'manager',
    title: 'Operatsion Menejer',
    count: 0,
    salary: 6500000, // 6.5 mln so'm/month
    capacityPerPerson: 6000,
    description: 'Ta\'minot, xodimlar nazorati va jarayonlarni optimallashtirish.',
    effect: 'Operatsion xarajatlarni -10% kamaytiradi, biznes xavfini -1 ga tushiradi'
  }
];

// Unlockable Bonuses & Growth Options
export const BONUS_ITEMS: BonusItem[] = [
  {
    id: 'pastries',
    name: 'Yangi pishiriq va kruassanlar',
    category: 'menu',
    icon: 'croissant',
    cost: 8000000, // 8 mln
    monthlyExpense: 2500000,
    addedRevenuePerMonth: 6500000,
    minCapitalRequired: 20000000,
    minMonthlyProfitRequired: 5000000,
    minReputationRequired: 60,
    minCustomersRequired: 2500,
    description: 'Ertalabki kofe bilan yangi issiq kruassanlar. O‘rtacha chekni 25% ga oshiradi.',
    effectDescription: 'Oylik daromad +6.5 mln so‘m, xarajat +2.5 mln so‘m'
  },
  {
    id: 'cold_drinks',
    name: 'Muzli kofe va sovuq ichimliklar',
    category: 'menu',
    icon: 'ice-cream',
    cost: 12000000,
    monthlyExpense: 3000000,
    addedRevenuePerMonth: 11000000,
    minCapitalRequired: 25000000,
    minMonthlyProfitRequired: 8000000,
    minReputationRequired: 65,
    minCustomersRequired: 3000,
    description: 'Termizning issiq iqlimi uchun hayotiy zarur bo‘lgan muzli latte, boba va limonadlar.',
    effectDescription: 'Issiq oylarda daromadni 40% ga qadar oshiradi'
  },
  {
    id: 'specialty_tea',
    name: 'Elita choylar kolleksiyasi',
    category: 'menu',
    icon: 'cup-soda',
    cost: 6000000,
    monthlyExpense: 1500000,
    addedRevenuePerMonth: 4200000,
    minCapitalRequired: 15000000,
    minMonthlyProfitRequired: 3000000,
    minReputationRequired: 58,
    minCustomersRequired: 2000,
    description: 'Surxondaryoning an\'anaviy giyohli va xitoylik elita choylari kolleksiyasi.',
    effectDescription: 'Kofe ichmaydigan yangi auditoriyani jalb qiladi (+12% mijoz)'
  },
  {
    id: 'cakes',
    name: 'Tort va artisan shirinliklar',
    category: 'menu',
    icon: 'cake',
    cost: 15000000,
    monthlyExpense: 4500000,
    addedRevenuePerMonth: 12000000,
    minCapitalRequired: 35000000,
    minMonthlyProfitRequired: 10000000,
    minReputationRequired: 70,
    minCustomersRequired: 3500,
    description: 'Maxsus vitrina, San-Sebastyan, chizkeyklar va mahalliy anorli shirinliklar.',
    effectDescription: 'Kechki mijozlar soni va o‘rtacha chekni sezilarli oshiradi'
  },
  {
    id: 'loyalty_app',
    name: 'Raqamli sodiqlik dasturi (QR / Bot)',
    category: 'service',
    icon: 'qr-code',
    cost: 9000000,
    monthlyExpense: 1200000,
    addedRevenuePerMonth: 7500000,
    minCapitalRequired: 22000000,
    minMonthlyProfitRequired: 6000000,
    minReputationRequired: 62,
    minCustomersRequired: 2800,
    description: 'Har 6-kofe bepul va keshbek tizimi. Qaytuvchi mijozlar ulushini 70% ga chiqaradi.',
    effectDescription: 'Mijozlarning doimiy oqimi +18%, brend obro‘si +5'
  },
  {
    id: 'delivery',
    name: 'Ekspress yetkazib berish xizmati',
    category: 'service',
    icon: 'truck',
    cost: 14000000,
    monthlyExpense: 4000000,
    addedRevenuePerMonth: 13500000,
    minCapitalRequired: 30000000,
    minMonthlyProfitRequired: 9000000,
    minReputationRequired: 68,
    minCustomersRequired: 3200,
    description: 'Termizdagi ofislar, banklar va korxonalarga issiq kofe yetkazib beruvchi kuryerlik liniyasi.',
    effectDescription: 'Yangi savdo kanali: +600 ta buyurtma/oy'
  },
  {
    id: 'second_branch',
    name: '2-filial: Termiz Markazi (At-Termiziy shoh ko‘chasi)',
    category: 'expansion',
    icon: 'store',
    cost: 55000000,
    monthlyExpense: 18000000,
    addedRevenuePerMonth: 38000000,
    minCapitalRequired: 70000000,
    minMonthlyProfitRequired: 18000000,
    minReputationRequired: 75,
    minCustomersRequired: 4500,
    description: 'Katta biznes sakrashi: shaharning eng gavjum joyida to‘laqonli ikkinchi qahvaxona ochish.',
    effectDescription: 'Daromad va mijozlar soni 70-80% ga oshadi, lekin katta xarajat yuklaydi'
  }
];

// Marketing Promotions
export const PROMOTIONS: Promotion[] = [
  {
    id: 'none',
    name: 'Maxsus aksiya yo‘q',
    cost: 0,
    customerBoostPercent: 0,
    marginImpactPercent: 0,
    staffLoadMultiplier: 1.0,
    reputationBoost: 0,
    description: 'Standart narxlar va rejimda ishlash.',
    riskNote: 'Xavf yo‘q, barqaror'
  },
  {
    id: 'discount',
    name: '15% Ommaviy Chegirma',
    cost: 2000000,
    customerBoostPercent: 20,
    marginImpactPercent: -15,
    staffLoadMultiplier: 1.2,
    reputationBoost: 2,
    description: 'Barcha kofe ichimliklariga 15% chegirma e\'lon qilinadi.',
    riskNote: 'Marja tushadi, aylanma orqali foyda olishga mo‘ljallangan'
  },
  {
    id: 'combo',
    name: 'Kofe + Shirinlik Kombo',
    cost: 3500000,
    customerBoostPercent: 28,
    marginImpactPercent: -5,
    staffLoadMultiplier: 1.25,
    reputationBoost: 4,
    description: 'Har qanday kofe va shirinlik birgalikda maxsus qulay narxda.',
    riskNote: 'Eng foydali kombo: mijozlar qoniqishi yuqori'
  },
  {
    id: 'one_plus_one',
    name: 'Katta “1+1” Aksiyasi',
    cost: 4500000,
    customerBoostPercent: 50,
    marginImpactPercent: -30,
    staffLoadMultiplier: 1.6,
    reputationBoost: 3,
    description: 'Bittasini olsangiz, ikkinchisi bepul! Termiz yoshlari orasida shov-shuv.',
    riskNote: 'DIQQAT: Xodimlar yetarli bo‘lmasa katta navbat va norozilik keltirib chiqaradi!'
  },
  {
    id: 'holiday',
    name: 'Bayramona Maxsus Menu & Aksiya',
    cost: 5000000,
    customerBoostPercent: 35,
    marginImpactPercent: -8,
    staffLoadMultiplier: 1.3,
    reputationBoost: 6,
    description: 'Surxon an\'analari yoki bayram bezaklari, bepul shirinlik va musiqali muhit.',
    riskNote: 'Brend obro‘sini juda kuchaytiradi'
  },
  {
    id: 'friend',
    name: '“Do‘stingiz bilan keling” Aksiyasi',
    cost: 2500000,
    customerBoostPercent: 24,
    marginImpactPercent: -10,
    staffLoadMultiplier: 1.2,
    reputationBoost: 3,
    description: 'Do‘stini ergashtirib kelgan har bir mijozga 20% keshbek va bepul kupon.',
    riskNote: 'Yangi organik mijozlar bazasini kengaytiradi'
  },
  {
    id: 'loyalty_cashback',
    name: 'VIP Keshbek & Doimiy Bonus',
    cost: 3000000,
    customerBoostPercent: 18,
    marginImpactPercent: -6,
    staffLoadMultiplier: 1.15,
    reputationBoost: 5,
    description: 'Doimiy mijozlar uchun maxsus kartalar va 10% jamg‘arib boriladigan bonus.',
    riskNote: 'Uzoq muddatli mijoz sodiqligini oshiradi'
  }
];

// Termiz Business News (1 per month)
export const TERMIZ_NEWS: MonthNews[] = [
  {
    month: 1,
    headline: 'Termizda qahvaxonalar madaniyati tez sur\'atda ommalashmoqda',
    snippet: 'Shaharda yoshlar va IT mutaxassislari ko‘payishi bilan sifatli kofega bo‘lgan qiziqish 30% ga oshdi.',
    category: 'trend',
    strategicTip: 'Boshlanishidayoq sifatli xomashyo va barqaror xizmat orqali o‘z ilk doimiy auditoriyangizni yarating.'
  },
  {
    month: 2,
    headline: 'Bojxona logistikasida o‘zgarish: import qahva donlari narxi oshishi kutilmoqda',
    snippet: 'Janubiy yo‘nalishdagi logistika narxlari ko‘tarilishi kofe donlari tannarxiga bosim qilishi mumkin.',
    category: 'iqtisod',
    strategicTip: 'Zaxirangizni rejalashtiring yoki narx siyosatingizni ehtiyotkorlik bilan sozlang.'
  },
  {
    month: 3,
    headline: 'Termiz bozorida raqobat qizimoqda: Raqiblar yangi takliflar tayyorlamoqda',
    snippet: '“Surxon Coffee Roasters” qahvaxonasi bozor ulushini saqlash uchun agressiv harakatlarni rejalashtirmoqda.',
    category: 'raqobat',
    strategicTip: 'Faqat narx urushi bilan emas, balki xizmat sifati va mijozlar bilan munosabat orqali yuting.'
  },
  {
    month: 4,
    headline: 'Termizda xalqaro Baxshichilik san\'ati festivali ochilmoqda!',
    snippet: 'Shahrga 20 dan ortiq xorijiy davlatlardan minglab sayyohlar va mehmonlar tashrif buyurishi kutilmoqda.',
    category: 'shahar',
    strategicTip: 'Sayyohlar oqimi katta bo‘ladi. Xodimlar quvvati yetarli ekaniga ishonch hosil qiling va bayram menyusini ishga tushiring.'
  },
  {
    month: 5,
    headline: 'Termiz Davlat Universiteti talabalari oraliq nazorat va sessiya davriga kirdi',
    snippet: 'Kutubxonalar va qahvaxonalarda dars qiluvchi talabalar gavjumlashdi. Wi-Fi va quvvatlagichlarga talab yuqori.',
    category: 'trend',
    strategicTip: 'Talabalarga qulay muhit va hamyonbop kombo takliflar taklif etish mijozlar oqimini 2 baravar oshirishi mumkin.'
  },
  {
    month: 6,
    headline: 'Termizda jazirama yoz boshlandi: Harorat 44°C ga yetishi kutilmoqda',
    snippet: 'Gidrometeorologiya markazi Termizda rekord darajadagi issiq kunlar haqida ogohlantirdi. Issiq kofega talab pasayadi.',
    category: 'ob-havo',
    strategicTip: 'Zudlik bilan muzli latte, sovuq choylar va tetiklashtiruvchi ichimliklarni menyuga kiriting!'
  },
  {
    month: 7,
    headline: 'Surxondaryo investitsiya forumi: Mahalliy tadbirkorlarga yangi grant va sarmoyalar',
    snippet: 'Mintaqaviy xususiy sarmoyadorlar muvaffaqiyatli xizmat ko‘rsatish va umumiy ovqatlanish brendlariga qiziqish bildirmoqda.',
    category: 'iqtisod',
    strategicTip: 'Agar biznesingiz ko‘rsatkichlari mustahkam bo‘lsa, sarmoya jalb qilish filiallarni kengaytirishga imkon beradi.'
  },
  {
    month: 8,
    headline: 'Shahar bo‘ylab sanitariya va xizmat ko‘rsatish sifati bo‘yicha keng tekshiruvlar',
    snippet: 'SanEpidemxizmat va soliq organlari Termizdagi barcha oziq-ovqat va ichimlik korxonalarini ko‘rikdan o‘tkazmoqda.',
    category: 'iqtisod',
    strategicTip: 'Tozalik, xodimlar tibbiy daftarchasi va moliyaviy hisobotlar tartibda bo‘lishi zarur.'
  },
  {
    month: 9,
    headline: 'Ijtimoiy tarmoqlarda Termiz food-blogerlari faolligi avjiga chiqdi',
    snippet: 'TikTok va Instagramdagi qisqa videolar mahalliy kafelar uchun eng kuchli bepul reklama vositasiga aylandi.',
    category: 'trend',
    strategicTip: 'Blogerlar va vizual estetikaga e\'tibor bering. Bitta chiroyli video yuzlab yangi mijozlar olib keladi.'
  },
  {
    month: 10,
    headline: 'Surxondaryo viloyatida kofe xomashyosi mahalliy qovurish sexlari ishga tushdi',
    snippet: 'O‘zbekistonda yangi qovurilgan yashil kofe donlarini to‘g‘ridan-to‘g‘ri ulgurji narxda olish imkoniyati yaratildi.',
    category: 'iqtisod',
    strategicTip: 'Yangi yetkazib beruvchilar bilan shartnoma tuzish xomashyo tannarxini 15% ga pasaytirishi mumkin.'
  },
  {
    month: 11,
    headline: 'Kuz-qish mavsumi arafasida shahar infratuzilmasida ta\'mirlash ishlari',
    snippet: 'Energotizimda vaqtincha rejali uzilishlar bo‘lishi mumkinligi xabar qilindi.',
    category: 'shahar',
    strategicTip: 'Generator yoki uzluksiz quvvat manbaiga ega bizneslar raqiblar yopilgan paytda barcha mijozlarni o‘ziga tortadi.'
  },
  {
    month: 12,
    headline: 'Yil yakunlari va Yangi yil korporativ bayramlar mavsumi!',
    snippet: 'Termizdagi banklar, korxonalar va tashkilotlar bayram kofe-breyklari va sovg‘a to‘plamlarini qidirmoqda.',
    category: 'trend',
    strategicTip: 'Katta korporativ buyurtmalar va bayram aksiyalari orqali 12 oylik davrni eng yuqori rekord kassa bilan yakunlang!'
  }
];

// 12 Handcrafted Unexpected Events with 3-4 deep strategic options
export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'event_1',
    month: 1,
    title: 'Kofe donlari narxining kutilmagan sakrashi',
    subtitle: 'Yetkazib beruvchi narxni 25% ga oshirishini ma\'lum qildi',
    situation: 'Xalqaro birjada Arabica narxi ko‘tarildi va Termizga don yetkazib beruvchi asosiy hamkoringiz xomashyo narxini zudlik bilan 25% ga oshirmoqda. Boshlang‘ich marjangiz xavf ostida.',
    termizContext: 'Termizdagi kofe ixlosmandlari narx ko‘tarilishiga sezgir, ammo past sifatli qahvani ham darhol sezishadi.',
    choices: [
      {
        text: 'Eski narxni saqlab, arzonroq aralashma (blend)ga o‘tish',
        description: 'Tannarx o‘zgarmaydi, lekin qahva ta\'mi biroz pasayishi mumkin.',
        costSoM: 0,
        reputationDelta: -6,
        customerDeltaPercent: -4,
        satisfactionDelta: -8,
        riskDelta: 1,
        memoryTag: 'sacrificed_quality_beans',
        advisorFeedback: 'Qisqa muddatda pulni tejadingiz, ammo mijozlar ta\'m o‘zgarganini payqab obro‘ingizni pasaytirdi.'
      },
      {
        text: 'Sifatni ushlab, ichimlik narxini 10% ga oshirish',
        description: 'Mijozlarga bu haqda ochiq tushuntirish beriladi. Marja saqlanadi.',
        costSoM: 0,
        reputationDelta: 2,
        customerDeltaPercent: -6,
        satisfactionDelta: -2,
        riskDelta: 0,
        memoryTag: 'honest_pricing_quality',
        advisorFeedback: 'Haqgo‘y qaror. Ba\'zi mijozlar ketdi, lekin sifatni qadrlovchi sodiq yadro saqlab qolindi.'
      },
      {
        text: 'Barcha qo‘shimcha xarajatni o‘z zimmangizga olish',
        description: 'Narx ham, sifat ham o‘zgarmaydi. Kassa hisobidan 5 000 000 so‘m xarajat qilinadi.',
        costSoM: 5000000,
        reputationDelta: 5,
        customerDeltaPercent: 8,
        satisfactionDelta: 6,
        riskDelta: 0,
        memoryTag: 'customer_first_subsidized',
        advisorFeedback: 'Mijozlar mehrini qozondingiz! Ular do‘stlarini chaqirdi, biroq kapitalingizdan sarflandi.'
      }
    ]
  },
  {
    id: 'event_2',
    month: 2,
    title: 'Bosh barista raqibga o‘tib ketmoqchi',
    subtitle: 'Tajribali xodim maoshini oshirishni so‘ramoqda',
    situation: 'Eng mahoratli bosh baristangizga raqib qahvaxona 30% yuqori maosh taklif qilgan. U sizdan oyligini 6 000 000 so‘mga ko‘tarishni yoki erkin grafik berishni so‘ramoqda.',
    termizContext: 'Termizda haqiqiy latte-art chizadigan va qahva mashinasini sozlay oladigan tajribali baristalar kam topiladi.',
    choices: [
      {
        text: 'Maoshini oshirib, bonus tizimini joriy qilish',
        description: 'Baristani saqlab qolasiz. Oylik maosh fondi 1 500 000 so‘mga oshadi.',
        costSoM: 1500000,
        reputationDelta: 4,
        customerDeltaPercent: 6,
        satisfactionDelta: 7,
        riskDelta: 0,
        memoryTag: 'rewarded_key_talent',
        advisorFeedback: 'Eng to‘g‘ri investitsiya — bu jamoa. Sifat barqaror qoldi va xizmat darajasi ko‘tarildi.'
      },
      {
        text: 'Ketishiga ruxsat berib, o‘rniga yangi yosh shogird olish',
        description: 'Ortiqcha xarajat yo‘q, ammo yangi xodimni o‘rgatish 1-2 oy vaqt oladi.',
        costSoM: 0,
        reputationDelta: -5,
        customerDeltaPercent: -8,
        satisfactionDelta: -10,
        riskDelta: 1,
        memoryTag: 'lost_key_barista',
        advisorFeedback: 'Xarajat tejaldi, lekin yangi barista sekin ishlagani uchun navbatlar uzaydi va sifat oqsadi.'
      },
      {
        text: 'Butun jamoaga kofe akademiyasi treningini sotib olish',
        description: 'Bir martalik 4 000 000 so‘m sarmoya evaziga barcha xodimlarni sertifikatlash.',
        costSoM: 4000000,
        reputationDelta: 7,
        customerDeltaPercent: 10,
        satisfactionDelta: 9,
        riskDelta: -1,
        memoryTag: 'invested_in_team_training',
        advisorFeedback: 'Strategik harakat! Jamoa ruhlandi, bosh barista ham murabbiy sifatida faxrlandi va qoldi.'
      }
    ]
  },
  {
    id: 'event_3',
    month: 3,
    title: 'Raqib “Surxon Coffee” narxlarni 25% tushirdi',
    subtitle: 'Bozorda tajovuzkor narx urushi boshlandi',
    situation: 'Sizdan 200 metr naridagi raqib qahvaxona katta bannerlar ilib, barcha ichimliklarga -25% narx belgiladi. Kecha sizning zal bo‘shab qoldi.',
    termizContext: 'Termizning yoshlar segmenti narx farqini darhol sinab ko‘rish uchun raqib tomonga oqib ketishi mumkin.',
    choices: [
      {
        text: 'Biz ham narxni keskin tushirib javob qaytaramiz (-25%)',
        description: 'Mijozlar qaytadi, ammo foyda marjasi kritik darajagacha pasayadi.',
        costSoM: 2000000,
        reputationDelta: -2,
        customerDeltaPercent: 12,
        satisfactionDelta: 2,
        riskDelta: 2,
        memoryTag: 'engaged_price_war',
        advisorFeedback: 'Narx urushiga kirdingiz. Aylanma oshdi, lekin har bir finjondan foyda deyarli qolmadi.'
      },
      {
        text: 'Narxni o‘zgartirmay, “Kofe + Bepul mini shirinlik” aksiyasini boshlash',
        description: 'Qiymat berish orqali yutish. Xarajat 3 500 000 so‘m.',
        costSoM: 3500000,
        reputationDelta: 6,
        customerDeltaPercent: 8,
        satisfactionDelta: 8,
        riskDelta: 0,
        memoryTag: 'value_over_price_war',
        advisorFeedback: 'Ajoyib strategik qaror! Narxingizni arzonlashtirmasdan mijozlarga haqiqiy qadr-qimmat berdingiz.'
      },
      {
        text: 'Vaziyatga aralashmay, o‘z premium sifatimizni targ‘ib qilish',
        description: 'Marketingga 1 500 000 so‘m yo‘naltiramiz: “Haqiqiy sifat narxdan ustun”.',
        costSoM: 1500000,
        reputationDelta: 4,
        customerDeltaPercent: -4,
        satisfactionDelta: 3,
        riskDelta: 0,
        memoryTag: 'stood_ground_on_brand',
        advisorFeedback: 'Vaqtinchalik talaba mijozlar oqimi kamaydi, ammo obro‘ va yuqori darajadagi mijozlar sizga sodiq qoldi.'
      }
    ]
  },
  {
    id: 'event_4',
    month: 4,
    title: 'Xalqaro Baxshichilik san\'ati festivali',
    subtitle: 'Termizga minglab chet ellik va mahalliy sayyohlar keldi',
    situation: 'Surxondaryoda yirik xalqaro madaniy forum boshlandi. Shahar ko‘chalari sayyohlar, jurnalistlar va mehmonlar bilan gavjum.',
    termizContext: 'Chet ellik sayyohlar yuqori sifatli espresso, qulay to‘lov (Visa/Mastercard) va inglizcha menyu kutishadi.',
    choices: [
      {
        text: 'Sayyohlar uchun maxsus “Sharqiy Ziravorli Kofe” va inglizcha menyu qilish',
        description: 'Tayyorgarlik uchun 4 000 000 so‘m sarflanadi, premium chek olinadi.',
        costSoM: 4000000,
        reputationDelta: 10,
        customerDeltaPercent: 35,
        satisfactionDelta: 12,
        riskDelta: 0,
        memoryTag: 'capitalized_on_festival',
        advisorFeedback: 'Haqiqiy shov-shuv! Kofexonangiz xorijiy sayyohlar va blogerlar e\'tirofiga sazovor bo‘ldi. Katta tushum!'
      },
      {
        text: 'Ochilish soatlarini kechki 24:00 gacha uzaytirib, qo‘shimcha part-time xodim olish',
        description: 'Xodimlar uchun 2 500 000 so‘m xarajat, kechki oqimni ushlash.',
        costSoM: 2500000,
        reputationDelta: 5,
        customerDeltaPercent: 22,
        satisfactionDelta: 6,
        riskDelta: 0,
        memoryTag: 'extended_hours_festival',
        advisorFeedback: 'Kechki sayr qiluvchi barcha mehmonlar sizning qahvaxonangizda to‘plandi. Ajoyib aylanma.'
      },
      {
        text: 'Qo‘shimcha xarajat qilmay, odatiy rejimda ishlash',
        description: 'Hech narsa o‘zgartirilmaydi.',
        costSoM: 0,
        reputationDelta: -2,
        customerDeltaPercent: 8,
        satisfactionDelta: -5,
        riskDelta: 0,
        memoryTag: 'ignored_festival_opportunity',
        advisorFeedback: 'Imkoniyat qisman boy berildi: ko‘p sayyohlar menyuni tushunmay yoki navbatdan hafsalasi pir bo‘lib chiqib ketdi.'
      }
    ]
  },
  {
    id: 'event_5',
    month: 5,
    title: 'Bankdan 50 000 000 so‘mlik imtiyozli kredit taklifi',
    subtitle: 'Yillik 14% past stavkada tadbirkorlik krediti',
    situation: '“Ipoteka Bank” Termiz filiali biznesingizning barqaror aylanmasini ko‘rib, biznesni modernizatsiya qilish uchun 50 000 000 so‘m imtiyozli kredit taklif qilmoqda (oylik foiz to‘lovi: 1 500 000 so‘m).',
    termizContext: 'Kredit kapitalni keskin oshirib tez kengayishga imkon beradi, ammo qarz yuki kelgusidagi oylarda sof foydani kamaytiradi.',
    choices: [
      {
        text: 'Kreditni to‘liq olib, zamonaviy Italiya kofe mashinasi sotib olish',
        description: 'Kapitalingizga +50 000 000 so‘m qo‘shiladi, oylik doimiy xarajatga +1 500 000 so‘m qarz foizi qo‘shiladi. Xizmat sifati oshadi.',
        costSoM: -50000000, // adds cash!
        reputationDelta: 6,
        customerDeltaPercent: 12,
        satisfactionDelta: 8,
        riskDelta: 2,
        memoryTag: 'took_bank_loan',
        advisorFeedback: 'Kapitalingiz oshdi! Yangi mashina kofe tayyorlash tezligini oshirdi, ammo kelgusi oylarda oylik to‘lovni unutmaslik kerak.'
      },
      {
        text: 'Kreditni rad etib, faqat o‘zimiz ishlab topgan pulga suyanish',
        description: 'Qarzsiz va tinch rejim. Xavf minimal.',
        costSoM: 0,
        reputationDelta: 1,
        customerDeltaPercent: 0,
        satisfactionDelta: 2,
        riskDelta: -1,
        memoryTag: 'rejected_bank_loan',
        advisorFeedback: 'Ehtiyotkor va konservativ yondashuv. Biznes moliyaviy erkinlikda qoldi, hech qanday foiz yuki yo‘q.'
      },
      {
        text: 'Kichikroq miqdorni so‘rash: 20 000 000 so‘m faqat interyerni yangilashga',
        description: 'Kapitalga +20 000 000 so‘m, oylik foiz atigi 600 000 so‘m.',
        costSoM: -20000000,
        reputationDelta: 4,
        customerDeltaPercent: 6,
        satisfactionDelta: 5,
        riskDelta: 1,
        memoryTag: 'took_partial_loan',
        advisorFeedback: 'Oqilona muvozanat. Yengil qarz orqali qahvaxona muhiti yaxshilandi.'
      }
    ]
  },
  {
    id: 'event_6',
    month: 6,
    title: 'Termizning 44°C jaziramasi va “Afg‘on shamoli”',
    subtitle: 'Issiq kofe ichuvchilar soni keskin kamaydi',
    situation: 'Surxondaryoning mashhur yozgi issig‘i boshlandi. Issiq kapuchino va espressoga talab 50% ga quladi. Odamlar faqat muzdek salqinlik va qulay konditsioner izlamoqda.',
    termizContext: 'Termizda yozda kuchli konditsioner va muzli ichimliklar bo‘lmasa, hech qanday kafe omon qolmaydi.',
    choices: [
      {
        text: 'Muzli ichimliklar stansiyasini o‘rnatib, qo‘shimcha konditsioner qo‘yish',
        description: '7 000 000 so‘m sarflanadi. Muzli latte, ays-ti va limonadlar sotuvi boshlanadi.',
        costSoM: 7000000,
        reputationDelta: 9,
        customerDeltaPercent: 30,
        satisfactionDelta: 14,
        riskDelta: -1,
        memoryTag: 'invested_in_cooling_summer',
        advisorFeedback: 'Daho qaror! Jazirama siz uchun foyda manbaiga aylandi. Butun shahar sizdan muzli kofe ichishga kelyapti.'
      },
      {
        text: 'Mavjud menyuni arzonlashtirib, mijozlarga bepul sovuq muzli suv berish',
        description: 'Xarajat minimal (1 500 000 so‘m). Oddiy yechim.',
        costSoM: 1500000,
        reputationDelta: 3,
        customerDeltaPercent: 5,
        satisfactionDelta: 4,
        riskDelta: 0,
        memoryTag: 'free_water_summer',
        advisorFeedback: 'Mijozlar mehmondo‘stlikni yoqtirdi, ammo salqinlatuvchi maxsus ichimliklar bo‘lmagani uchun daromad o‘rtacha bo‘ldi.'
      },
      {
        text: 'Konditsionerni tejab, xarajatlarni qisqartirish',
        description: 'Elektr energiyasini tejaymiz.',
        costSoM: 0,
        reputationDelta: -12,
        customerDeltaPercent: -25,
        satisfactionDelta: -20,
        riskDelta: 2,
        memoryTag: 'pinched_cooling_disaster',
        advisorFeedback: 'Xato qaror! Dim zalda odamlar o‘tirolmadi va darhol chiqib ketdi. Obro‘ jiddiy zarba yedi.'
      }
    ]
  },
  {
    id: 'event_7',
    month: 7,
    title: 'Mahalliy investor 60 000 000 so‘m sarmoya taklif qilmoqda',
    subtitle: 'Surxondaryolik yirik tadbirkor biznesingizga qiziqdi',
    situation: 'Kofexonangizning mashhurligini ko‘rgan investor 60 000 000 so‘m sarmoya kiritib, kelajakdagi oylik foydangizdan 20% ulush so‘ramoqda. U Termiz bo‘ylab tarmoq ochishni taklif qilmoqda.',
    termizContext: 'Investor bilan ishlash kapitalni darhol oshiradi, ammo har oy o‘z daromadingizdan ulush berishingizga to‘g‘ri keladi.',
    choices: [
      {
        text: 'Investitsiyani qabul qilish (+60 mln so‘m, har oy -20% sof foyda)',
        description: 'Kapitalingiz keskin o‘sadi, kengayish imkoniyati paydo bo‘ladi.',
        costSoM: -60000000,
        reputationDelta: 8,
        customerDeltaPercent: 15,
        satisfactionDelta: 5,
        riskDelta: 1,
        memoryTag: 'accepted_equity_investor',
        advisorFeedback: 'Katta sarmoya kassa zaxirangizni kuchaytirdi. Endi 2-filial yoki yirik yangilanishlar uchun mablag‘ yetarli!'
      },
      {
        text: 'Rad etish: Biznes to‘liq o‘zimizniki bo‘lib qolishi kerak',
        description: 'Hech kimga ulush berilmaydi. Mustaqil boshqaruv.',
        costSoM: 0,
        reputationDelta: 3,
        customerDeltaPercent: 0,
        satisfactionDelta: 2,
        riskDelta: -1,
        memoryTag: 'rejected_equity_investor',
        advisorFeedback: 'Erkinlik saqlab qolindi. Kelajakdagi barcha sof foyda faqat o‘zingizga tegishli.'
      },
      {
        text: 'Faqat grant/kredit sifatida olish (Qarz 65 mln qilib qaytariladi, ulushsiz)',
        description: 'Bir martalik kapital +35 mln so‘m, ulush boy berilmaydi.',
        costSoM: -35000000,
        reputationDelta: 4,
        customerDeltaPercent: 5,
        satisfactionDelta: 3,
        riskDelta: 1,
        memoryTag: 'debt_financing_investor',
        advisorFeedback: 'Ustasi farang muzokara! Biznes egaligini saqlab, aylanma mablag‘ jalb qildingiz.'
      }
    ]
  },
  {
    id: 'event_8',
    month: 8,
    title: 'Soliq va SanEpidemxizmat (SES) tekshiruvi',
    subtitle: 'Davlat organlarining shahar miqyosidagi qattiq reydi',
    situation: 'SES va soliq inspektorlari kofexonangizga kirib keldi. Ular tozalik, mahsulot sertifikatlari, kassa apparati va xodimlarning sanitariya daftarchalarini sinchkovlik bilan tekshirmoqda.',
    termizContext: 'Agar oldingi oylarda tozalikka beparvo qaragan bo‘lsangiz yoki sifatni atay pasaytirgan bo‘lsangiz, jarima muqarrar.',
    choices: [
      {
        text: 'Barcha qonuniy hujjatlar va sanitariya me\'yorlarini to‘liq ko‘rsatish',
        description: 'Agar tozalik xodimi bo‘lsa, tekshiruv mukammal o‘tadi. 1 000 000 so‘m sertifikat xarajati.',
        costSoM: 1000000,
        reputationDelta: 8,
        customerDeltaPercent: 6,
        satisfactionDelta: 6,
        riskDelta: -2,
        memoryTag: 'passed_inspection_clean',
        advisorFeedback: 'A\'lo darajada! Inspektorlar rasmiy “Gigiyena va sifat kafolati” belgisini taqdim etdi. Obro‘ingiz ko‘tarildi.'
      },
      {
        text: 'Kamchiliklarni tezda yopish uchun inspektorlar ko‘rsatgan jarimani to‘lash',
        description: '6 000 000 so‘m jarima va zudlik bilan kamchiliklarni bartaraf etish.',
        costSoM: 6000000,
        reputationDelta: -4,
        customerDeltaPercent: -4,
        satisfactionDelta: -2,
        riskDelta: 1,
        memoryTag: 'paid_penalty_ses',
        advisorFeedback: 'Jarima to‘landi. Moliyaviy yo‘qotish bo‘ldi, ammo biznes yopilish xavfidan saqlab qolindi.'
      },
      {
        text: 'Kofexonani 3 kunga yopib, to‘liq chuqur dezinfeksiya va ta\'mir o‘tkazish',
        description: 'Xarajat 4 000 000 so‘m, 3 kunlik savdo tushmaydi.',
        costSoM: 4000000,
        reputationDelta: 6,
        customerDeltaPercent: -2,
        satisfactionDelta: 8,
        riskDelta: -1,
        memoryTag: 'sanitary_closed_deep_clean',
        advisorFeedback: 'Jasur qaror. 3 kunlik daromad yo‘qotildi, biroq qayta ochilganingizda mijozlar pokizalikka tan berishdi.'
      }
    ]
  },
  {
    id: 'event_9',
    month: 9,
    title: 'Surxondaryoning mashhur blogeri tashrifi',
    subtitle: '150 000 obunachiga ega food-bloger kofeni sinab ko‘rmoqchi',
    situation: 'Instagram va Telegramda Termiz haqida kontent tayyorlaydigan taniqli bloger bexosdan qahvaxonangizga kirdi. U qahva va desertga buyurtma berdi.',
    termizContext: 'Surxondaryoda yoshlarning 70% yangi kafelarni aynan Instagram obzorlari orqali tanlaydi.',
    choices: [
      {
        text: 'Eng zo‘r kofe va mualliflik desertini taklif qilib, xizmatni oliy darajada ko‘rsatish',
        description: 'Bloger bepul mehmon qilinadi (2 000 000 so‘m maxsus taqdimot xarajati).',
        costSoM: 2000000,
        reputationDelta: 12,
        customerDeltaPercent: 40,
        satisfactionDelta: 10,
        riskDelta: -1,
        memoryTag: 'viral_blogger_success',
        advisorFeedback: 'VIRAL BO‘LDI! Bloger kofeingizni maqtab ajoyib reels chiqardi. Ertasiga eshigingiz oldida navbat paydo bo‘ldi!'
      },
      {
        text: 'Bloger bilan rasmiy reklama shartnomasi tuzish (5 000 000 so‘m)',
        description: 'U siz haqingizda 3 ta professional reklama posti va tanlov uyushtiradi.',
        costSoM: 5000000,
        reputationDelta: 9,
        customerDeltaPercent: 32,
        satisfactionDelta: 5,
        riskDelta: 0,
        memoryTag: 'paid_influencer_campaign',
        advisorFeedback: 'Puxta marketing! Reklama o‘zini to‘liq oqladi, yangi auditoriya oqib keldi.'
      },
      {
        text: 'Oddiy mijoz kabi munosabatda bo‘lib, pulini olish',
        description: 'Hech qanday maxsus xarajat yo‘q. Adolatli tamoyil.',
        costSoM: 0,
        reputationDelta: 1,
        customerDeltaPercent: 3,
        satisfactionDelta: 3,
        riskDelta: 0,
        memoryTag: 'treated_blogger_normally',
        advisorFeedback: 'Bloger post chiqarmadi, ammo xolis xizmatingizdan norozi ham bo‘lmadi. Hech qanday sarf-xarajatsiz o‘tdingiz.'
      }
    ]
  },
  {
    id: 'event_10',
    month: 10,
    title: 'TerDU talabalarining dars va sessiya to‘lqini',
    subtitle: 'Talabalar qahvaxonani kovorkingga aylantirishdi',
    situation: 'Universitet imtihonlari sababli qahvaxonangiz talabalar bilan to‘ldi. Ular soatlab bitta kofe ichib, noutbukda o‘tirishmoqda. Yangi kirgan mijozlar esa joy topolmay ketmoqda.',
    termizContext: 'Bir tomondan talabalar barqaror qatnovchi, boshqa tomondan ulgurji chek oladigan mijozlarga joy yetishmayapti.',
    choices: [
      {
        text: '“Talabalar vaqti” qoidasini kiritish: Noutbuk bilan ishlashga 2 soatlik cheklov',
        description: 'Stollar aylanmasi tezlashadi, ammo talabalar biroz xafa bo‘lishi mumkin.',
        costSoM: 500000,
        reputationDelta: -2,
        customerDeltaPercent: 12,
        satisfactionDelta: -1,
        riskDelta: 0,
        memoryTag: 'limited_study_time',
        advisorFeedback: 'Joy aylanmasi tiklandi! Ko‘proq yangi mijozlar ovqatlanib ketdi va umumiy kassa oshdi.'
      },
      {
        text: 'Maxsus “Study & Coffee” talabalar paketi va qo‘shimcha stullar qo‘yish',
        description: 'Talabalarga mos arzonroq kombo va tezkor Wi-Fi (xarajat 2 500 000 so‘m).',
        costSoM: 2500000,
        reputationDelta: 8,
        customerDeltaPercent: 20,
        satisfactionDelta: 9,
        riskDelta: 0,
        memoryTag: 'embraced_student_culture',
        advisorFeedback: 'Siz shahardagi eng sevimli yoshlar markaziga aylandingiz. Katta aylanma hisobiga daromad ko‘paydi.'
      },
      {
        text: 'Narxlarni biroz oshirib, auditoriyani saralash',
        description: 'Kofe narxi +15%. Faqat to‘lovga qodir mijozlar qoladi.',
        costSoM: 0,
        reputationDelta: -4,
        customerDeltaPercent: -15,
        satisfactionDelta: -5,
        riskDelta: 1,
        memoryTag: 'filtered_out_students',
        advisorFeedback: 'Zal bo‘shab qoldi, premium muhit tiklandi. Talabalar norozi bo‘lib ketdi, lekin qolgan mijozlar rozi.'
      }
    ]
  },
  {
    id: 'event_11',
    month: 11,
    title: 'Termiz energotizimida nosozlik va elektr uzilishlari',
    subtitle: 'Shaharda rejadan tashqari elektr o‘chmoqda',
    situation: 'Kuzgi ta\'mirlash ishlari sabab shahar markazida elektr har kuni 3-4 soatga o‘chmoqda. Kofe mashinalari, chiroq va to‘lov terminallari to‘xtab qolmoqda.',
    termizContext: 'Elektr uzilishida generatori bo‘lgan qahvaxona butun mahalla va ko‘chadagi yagona yorug‘ maskanga aylanadi.',
    choices: [
      {
        text: 'Kuchli dizel-generator va uzluksiz quvvat blokini (UPS) sotib olish',
        description: '11 000 000 so‘m sarmoya. Elektr o‘chganda ham to‘xtovsiz ishlaymiz.',
        costSoM: 11000000,
        reputationDelta: 14,
        customerDeltaPercent: 45,
        satisfactionDelta: 15,
        riskDelta: -2,
        memoryTag: 'bought_diesel_generator',
        advisorFeedback: 'QAHRAMONLIK! Butun shahar zulmatda qolganda sizning kofexonangiz charog‘on bo‘lib ishladi. Hamma sizga oqib keldi!'
      },
      {
        text: 'Elektr o‘chgan soatlarda kofeni filtr (drip/v60) usulida va termosda berish',
        description: 'Minimal xarajat (2 000 000 so‘m). Qisman ishlash.',
        costSoM: 2000000,
        reputationDelta: 3,
        customerDeltaPercent: 5,
        satisfactionDelta: 2,
        riskDelta: 0,
        memoryTag: 'manual_brewing_outage',
        advisorFeedback: 'Romantik muhit yaratildi (shamlar va qo‘lda damlangan kofe). Katta yo‘qotish bo‘lmadi.'
      },
      {
        text: 'Elektr o‘chgan paytlarda kofexonani vaqtincha yopib turish',
        description: 'Hech qanday generator xarajati yo‘q, ammo savdo yo‘qotiladi.',
        costSoM: 0,
        reputationDelta: -8,
        customerDeltaPercent: -20,
        satisfactionDelta: -10,
        riskDelta: 2,
        memoryTag: 'closed_during_blackouts',
        advisorFeedback: 'Kassa tushumi jiddiy tushdi va mijozlar sizning ishonchliligingizga shubha qila boshladi.'
      }
    ]
  },
  {
    id: 'event_12',
    month: 12,
    title: 'Yil yakunlari: Katta korporativ buyurtmalar mavsumi',
    subtitle: 'Banklar va korxonalar bayram sovg‘alari va kofe-breyk buyurmoqda',
    situation: '12-oy: Yangi yil arafasi! Surxondaryodagi bir nechta yirik banklar va xususiy firmalar 2000 kishilik bayram korporativ kofe to‘plamlari va sovg‘a kartalariga buyurtma berishni istamoqda.',
    termizContext: 'Yilni eng baland notada va rekord daromad bilan yakunlash uchun so‘nggi ulkan imkoniyat.',
    choices: [
      {
        text: 'Barcha korporativ buyurtmalarni qabul qilish va tungi smenani ishga tushirish',
        description: 'Xodimlar uchun mukofot va qadoqlashga 8 000 000 so‘m sarflanadi. Ulkan tushum!',
        costSoM: 8000000,
        reputationDelta: 12,
        customerDeltaPercent: 50,
        satisfactionDelta: 10,
        riskDelta: 1,
        memoryTag: 'fulfilled_massive_corporate_orders',
        advisorFeedback: 'REKORD TUSHUM! Jamoangiz chin dildan ishladi va yil yakunida biznes hisobingizga ulkan foyda keltirdi!'
      },
      {
        text: 'Faqat yarmini qabul qilib, qolgan e\'tiborni zal mijozlariga qaratish',
        description: 'Xarajat 3 000 000 so‘m. Muvozanatli va xavfsiz yakun.',
        costSoM: 3000000,
        reputationDelta: 6,
        customerDeltaPercent: 25,
        satisfactionDelta: 7,
        riskDelta: 0,
        memoryTag: 'balanced_holiday_rush',
        advisorFeedback: 'Sokin va barqaror yakun. Xodimlar charchamadi, doimiy mijozlar ham xizmatdan xursand bo‘ldi.'
      },
      {
        text: 'Korporativ buyurtmalarni rad etib, bayramona shinam muhitni saqlash',
        description: 'Qo‘shimcha ish yuklamasi olinmaydi.',
        costSoM: 0,
        reputationDelta: 2,
        customerDeltaPercent: 5,
        satisfactionDelta: 4,
        riskDelta: -1,
        memoryTag: 'cozy_holiday_zen',
        advisorFeedback: 'Tinch bayram. Qo‘shimcha katta foydadan voz kechildi, lekin qahvaxona osoyishtaligi saqlab qolindi.'
      }
    ]
  }
];

// Initial Competitor Setup
export const INITIAL_COMPETITOR: CompetitorState = {
  name: 'Surxon Coffee Roasters',
  marketShare: 35, // 35% of Termiz market initially
  strategy: 'Barqaror an\'anaviy qahvaxona',
  recentAction: 'Termiz markazida 2-filialini ochdi va reklama bannerlarini yangiladi.',
  pricePerCup: 22000,
  reputation: 68
};

// Advisors Info
export interface AdvisorProfile {
  id: 'finance' | 'marketing' | 'strategy';
  name: string;
  roleTitle: string;
  avatarIcon: string;
  bio: string;
}

export const ADVISORS: AdvisorProfile[] = [
  {
    id: 'finance',
    name: 'Jahongir Rustamov',
    roleTitle: 'Bosh Moliyachi',
    avatarIcon: 'wallet',
    bio: '15 yillik bank va audit tajribasiga ega. Pul oqimi, xarajatlar tahlili va bankrotlikdan qochish mutaxassisi.'
  },
  {
    id: 'marketing',
    name: 'Madina Karimova',
    roleTitle: 'Kreativ Marketolog',
    avatarIcon: 'megaphone',
    bio: 'SMM, brending va Termiz yoshlarining trendlarini chuqur biladi. Mijozlar oqimi va viral aksiyalar ustasi.'
  },
  {
    id: 'strategy',
    name: 'Bobur Mirzayev',
    roleTitle: 'Biznes Strateg',
    avatarIcon: 'target',
    bio: 'Surxondaryodagi muvaffaqiyatli xizmat ko‘rsatish tarmoqlari asoschisi. Xodimlar, xavf va uzoq muddatli barqarorlik bo‘yicha maslahatchi.'
  }
];
