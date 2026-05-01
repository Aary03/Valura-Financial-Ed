/**
 * Intra-world content data, keyed by world slug.
 *
 * Node positions use a 280 × 500 SVG viewport.
 * Snake layout for 5 nodes: (L, 55) → (R, 150) → (L, 250) → (R, 350) → (C, 440)
 *
 * Full content seeding for worlds 2-15 comes in a later prompt.
 * Only "marina-mile" has production-ready seed data today.
 */

export type NodeKind  = "quiz" | "story" | "minigame" | "boss";
export type NodeState = "locked" | "available" | "done";

export interface WorldNode {
  id: string;
  kind: NodeKind;
  titleEn: string;
  titleAr: string;
  /** Short descriptor shown in the modal — e.g. "5 questions · 3 min" */
  subtitleEn?: string;
  subtitleAr?: string;
  state: NodeState;
  /** Position in 280 × 500 intra-world SVG viewport */
  nodeX: number;
  nodeY: number;
}

export interface WorldContent {
  slug: string;
  nameEn: string;
  nameAr: string;
  /** Key used by WorldBanner to pick the correct illustration */
  bannerKey: string;
  narrativeEn: string;
  narrativeAr: string;
  nodes: WorldNode[];
}

// ── Fully seeded ─────────────────────────────────────────────────────────────

const marinaMile: WorldContent = {
  slug: "marina-mile",
  nameEn: "Marina Mile",
  nameAr: "ميل المارينا",
  bannerKey: "marina-mile",
  narrativeEn:
    "Mariam just landed her first job in Dubai Marina and opened her very first " +
    "bank account. Her colleague Raj keeps saying she needs a budget — but with " +
    "rent, groceries, and a shiny new city to explore, she doesn't know where to " +
    "start. Help Mariam take control of her dirhams, one lesson at a time.",
  narrativeAr:
    "حصلت مريم للتو على وظيفتها الأولى في دبي مارينا وفتحت أول حساب مصرفي لها. " +
    "زميلها راج يقول لها باستمرار أنها تحتاج إلى ميزانية — لكن مع الإيجار " +
    "والمشتريات ومدينة جديدة مثيرة لاستكشافها، لا تعرف من أين تبدأ. " +
    "ساعدي مريم في السيطرة على دراهمها، درساً واحداً في كل مرة.",
  nodes: [
    {
      id: "mm-1",
      kind: "quiz",
      titleEn: "What Is a Budget?",
      titleAr: "ما هي الميزانية؟",
      subtitleEn: "5 questions · ~3 min",
      subtitleAr: "٥ أسئلة · ~٣ دقائق",
      state: "available",
      nodeX: 70,  nodeY: 55,
    },
    {
      id: "mm-2",
      kind: "quiz",
      titleEn: "The 50/30/20 Rule",
      titleAr: "قاعدة ٥٠/٣٠/٢٠",
      subtitleEn: "5 questions · ~4 min",
      subtitleAr: "٥ أسئلة · ~٤ دقائق",
      state: "locked",
      nodeX: 200, nodeY: 150,
    },
    {
      id: "mm-3",
      kind: "story",
      titleEn: "Mariam's First Month",
      titleAr: "أول شهر لمريم",
      subtitleEn: "Interactive story",
      subtitleAr: "قصة تفاعلية",
      state: "locked",
      nodeX: 70,  nodeY: 250,
    },
    {
      id: "mm-4",
      kind: "minigame",
      titleEn: "Spending Trap",
      titleAr: "فخ الإنفاق",
      subtitleEn: "Sort & survive · ~5 min",
      subtitleAr: "رتّب وانجُ · ~٥ دقائق",
      state: "locked",
      nodeX: 200, nodeY: 350,
    },
    {
      id: "mm-5",
      kind: "boss",
      titleEn: "Budget Boss Battle",
      titleAr: "معركة بوس الميزانية",
      subtitleEn: "Final challenge",
      subtitleAr: "التحدي النهائي",
      state: "locked",
      nodeX: 135, nodeY: 440,
    },
  ],
};

// ── Helper: standard 5-node snake layout ─────────────────────────────────────
function nodes5(
  prefix: string,
  n1: { en: string; ar: string; kind: NodeKind },
  n2: { en: string; ar: string; kind: NodeKind },
  n3: { en: string; ar: string; kind: NodeKind },
  n4: { en: string; ar: string; kind: NodeKind },
  n5: { en: string; ar: string; kind: NodeKind },
): WorldNode[] {
  const pos = [
    { x: 70, y: 55 }, { x: 200, y: 150 }, { x: 70, y: 250 },
    { x: 200, y: 350 }, { x: 135, y: 440 },
  ] as const;
  const ns = [n1, n2, n3, n4, n5];
  return ns.map((n, i) => ({
    id: `${prefix}-${i + 1}${n.kind === "minigame" && prefix === "ll" ? "-loan" : n.kind === "minigame" && prefix === "ss" ? "-scam" : ""}`,
    kind: n.kind,
    titleEn: n.en, titleAr: n.ar,
    subtitleEn: n.kind === "story" ? "Interactive story" : n.kind === "minigame" ? "Mini-game · ~5 min" : n.kind === "boss" ? "Final challenge" : "3 questions · ~3 min",
    subtitleAr: n.kind === "story" ? "قصة تفاعلية" : n.kind === "minigame" ? "لعبة صغيرة · ~٥ دقائق" : n.kind === "boss" ? "التحدي النهائي" : "٣ أسئلة · ~٣ دقائق",
    state: (i === 0 ? "available" : "locked") as NodeState,
    nodeX: pos[i].x, nodeY: pos[i].y,
  }));
}

// ── Worlds 2–15 ───────────────────────────────────────────────────────────────

const skylineHeights: WorldContent = {
  slug: "skyline-heights", nameEn: "Skyline Heights", nameAr: "مرتفعات الأفق", bannerKey: "skyline-heights",
  narrativeEn: "Omar got his first raise and realised he has nothing saved. His neighbour Priya never earns more but is always financially stable. The secret? An emergency fund. Help Omar build his safety net.",
  narrativeAr: "حصل عمر على أول زيادة راتب وأدرك أنه لا يملك مدخرات. جارته بريا لا تكسب أكثر لكنها مستقرة مالياً. السر؟ صندوق طوارئ. ساعد عمر في بناء شبكة أمانه.",
  nodes: nodes5("sh",
    { en: "Why Save?", ar: "لماذا ندّخر؟", kind: "quiz" },
    { en: "Building Your Fund", ar: "بناء صندوقك", kind: "quiz" },
    { en: "Omar's Surprise Bill", ar: "فاتورة عمر المفاجئة", kind: "story" },
    { en: "Savings Builder", ar: "بانٍ المدخرات", kind: "minigame" },
    { en: "Savings Master", ar: "سيد الادخار", kind: "boss" },
  ),
};

const soukOfSavings: WorldContent = {
  slug: "souk-of-savings", nameEn: "Souk of Savings", nameAr: "سوق المدخرات", bannerKey: "souk-of-savings",
  narrativeEn: "Reem loves a good deal — but her apartment is full of things she never uses. Raj shows her the difference between price and value, and why impulse buying is the enemy of wealth.",
  narrativeAr: "تحب ريم الصفقات الجيدة — لكن شقتها مليئة بأشياء لا تستخدمها. يريها راج الفرق بين السعر والقيمة، ولماذا الشراء بدافع الاندفاع هو عدو الثروة.",
  nodes: nodes5("sos",
    { en: "Needs vs Wants", ar: "الاحتياجات مقابل الرغبات", kind: "quiz" },
    { en: "Value vs Price", ar: "القيمة مقابل السعر", kind: "quiz" },
    { en: "The Souk Challenge", ar: "تحدي السوق", kind: "story" },
    { en: "Budget Basket", ar: "سلة الميزانية", kind: "minigame" },
    { en: "Souk Boss", ar: "بوس السوق", kind: "boss" },
  ),
};

const dirhamDesert: WorldContent = {
  slug: "dirham-desert", nameEn: "Dirham Desert", nameAr: "صحراء الدرهم", bannerKey: "dirham-desert",
  narrativeEn: "Khalid earns a good salary but always wonders where the money went. Tracking income and expenses is the first step to control. Let's map every dirham before it disappears.",
  narrativeAr: "يكسب خالد راتباً جيداً لكنه يتساءل دائماً أين ذهبت الأموال. تتبع الدخل والمصروفات هو أول خطوة للسيطرة. لنرسم خريطة لكل درهم قبل أن يختفي.",
  nodes: nodes5("dd",
    { en: "Your Income", ar: "دخلك", kind: "quiz" },
    { en: "Tracking Expenses", ar: "تتبع المصروفات", kind: "quiz" },
    { en: "The Desert Ledger", ar: "دفتر الصحراء", kind: "story" },
    { en: "Expense Tracker", ar: "متتبع المصروفات", kind: "minigame" },
    { en: "Desert Boss", ar: "بوس الصحراء", kind: "boss" },
  ),
};

const loanLighthouse: WorldContent = {
  slug: "loan-lighthouse", nameEn: "Loan Lighthouse", nameAr: "منارة القروض", bannerKey: "loan-lighthouse",
  narrativeEn: "Sara needs AED 30,000 for a car. Three banks offer different rates. Understanding principal, interest, and APR is the light that guides you away from loan traps.",
  narrativeAr: "تحتاج سارة إلى ٣٠٬٠٠٠ درهم لشراء سيارة. ثلاثة بنوك تعرض أسعاراً مختلفة. فهم رأس المال والفائدة ومعدل الفائدة السنوي هو الضوء الذي يرشدك بعيداً عن فخاخ القروض.",
  nodes: nodes5("ll",
    { en: "What Is a Loan?", ar: "ما هو القرض؟", kind: "quiz" },
    { en: "Interest Rates", ar: "أسعار الفائدة", kind: "quiz" },
    { en: "The Lighthouse Diary", ar: "يوميات المنارة", kind: "story" },
    { en: "Loan Calculator", ar: "حاسبة القروض", kind: "minigame" },
    { en: "Loan Boss", ar: "بوس القرض", kind: "boss" },
  ),
};

const cardCanyon: WorldContent = {
  slug: "card-canyon", nameEn: "Card Canyon", nameAr: "وادي البطاقات", bannerKey: "card-canyon",
  narrativeEn: "Ahmad thought credit cards were free money — until the statement arrived. Navigate the canyon of minimum payments, APRs, and credit scores without falling in.",
  narrativeAr: "ظن أحمد أن بطاقات الائتمان مال مجاني — حتى وصل الكشف. تنقّل في وادي الحد الأدنى للدفع ومعدلات الفائدة ودرجات الائتمان دون السقوط.",
  nodes: nodes5("cc",
    { en: "Credit Card Basics", ar: "أساسيات بطاقة الائتمان", kind: "quiz" },
    { en: "The Interest Trap", ar: "فخ الفائدة", kind: "quiz" },
    { en: "Canyon Swipe", ar: "سحب الوادي", kind: "story" },
    { en: "Card Challenge", ar: "تحدي البطاقة", kind: "minigame" },
    { en: "Credit Boss", ar: "بوس الائتمان", kind: "boss" },
  ),
};

const oasisOfInsurance: WorldContent = {
  slug: "oasis-of-insurance", nameEn: "Oasis of Insurance", nameAr: "واحة التأمين", bannerKey: "oasis-of-insurance",
  narrativeEn: "One car accident wiped out Yousef's savings in a single day. Learn why transferring risk is the smartest financial move — and which coverage the UAE actually requires.",
  narrativeAr: "أشار حادث سيارة واحد ثروة يوسف في يوم واحد. تعرّف على سبب أن نقل المخاطر هو أذكى خطوة مالية — وأي تغطية يشترطها الإمارات فعلياً.",
  nodes: nodes5("oi",
    { en: "Why Insurance?", ar: "لماذا التأمين؟", kind: "quiz" },
    { en: "Types of Coverage", ar: "أنواع التغطية", kind: "quiz" },
    { en: "The Insurance Day", ar: "يوم التأمين", kind: "story" },
    { en: "Coverage Calculator", ar: "حاسبة التغطية", kind: "minigame" },
    { en: "Insurance Boss", ar: "بوس التأمين", kind: "boss" },
  ),
};

const assetAtlas: WorldContent = {
  slug: "asset-atlas", nameEn: "Asset Atlas", nameAr: "أطلس الأصول", bannerKey: "asset-atlas",
  narrativeEn: "Hana has AED 50,000 sitting in a current account earning nothing. Raj maps out stocks, bonds, gold, and index funds — and explains why time in the market beats timing the market.",
  narrativeAr: "لدى هانا ٥٠٬٠٠٠ درهم في حساب جاري لا يكسب شيئاً. يرسم راج خريطة للأسهم والسندات والذهب والصناديق المؤشرة — ويشرح لماذا الوقت في السوق يتفوق على توقيت السوق.",
  nodes: nodes5("aa",
    { en: "What Is an Asset?", ar: "ما هو الأصل؟", kind: "quiz" },
    { en: "Stocks, Bonds & Diversification", ar: "الأسهم والسندات والتنويع", kind: "quiz" },
    { en: "The Atlas Journey", ar: "رحلة الأطلس", kind: "story" },
    { en: "Portfolio Builder", ar: "بانٍ المحفظة", kind: "minigame" },
    { en: "Investment Boss", ar: "بوس الاستثمار", kind: "boss" },
  ),
};

const skylineKeys: WorldContent = {
  slug: "skyline-keys", nameEn: "Skyline Keys", nameAr: "مفاتيح الأفق", bannerKey: "skyline-keys",
  narrativeEn: "After 5 years of renting in Dubai, Mariam asks: should I buy? Understanding LTV ratios, DLD fees, and mortgage costs turns one of life's biggest decisions into a calculated one.",
  narrativeAr: "بعد ٥ سنوات من الإيجار في دبي، تسأل مريم: هل أشتري؟ فهم نسب القرض إلى القيمة ورسوم دائرة الأراضي وتكاليف الرهن يحوّل أحد أكبر قرارات الحياة إلى قرار محسوب.",
  nodes: nodes5("sk",
    { en: "Rent vs Buy", ar: "الإيجار مقابل الشراء", kind: "quiz" },
    { en: "Mortgages & Financing", ar: "الرهن والتمويل", kind: "quiz" },
    { en: "The Key Decision", ar: "قرار المفتاح", kind: "story" },
    { en: "Property Calculator", ar: "حاسبة العقار", kind: "minigame" },
    { en: "Real Estate Boss", ar: "بوس العقار", kind: "boss" },
  ),
};

const halalHarbour: WorldContent = {
  slug: "halal-harbour", nameEn: "Halal Harbour", nameAr: "ميناء الحلال", bannerKey: "halal-harbour",
  narrativeEn: "The UAE is the world's leading Islamic finance hub. Reem discovers she can grow her wealth through Murabaha, Sukuk, and Takaful — all without compromising her values.",
  narrativeAr: "الإمارات هي المركز الرائد عالمياً للتمويل الإسلامي. تكتشف ريم أنها تستطيع تنمية ثروتها من خلال المرابحة والصكوك والتكافل — دون المساس بقيمها.",
  nodes: nodes5("hh",
    { en: "Islamic Finance Basics", ar: "أساسيات التمويل الإسلامي", kind: "quiz" },
    { en: "Halal Investing", ar: "الاستثمار الحلال", kind: "quiz" },
    { en: "The Harbour Lesson", ar: "درس الميناء", kind: "story" },
    { en: "Halal Checker", ar: "مدقق الحلال", kind: "minigame" },
    { en: "Halal Finance Boss", ar: "بوس التمويل الإسلامي", kind: "boss" },
  ),
};

const gratuityGarden: WorldContent = {
  slug: "gratuity-garden", nameEn: "Gratuity Garden", nameAr: "حديقة المكافآت", bannerKey: "gratuity-garden",
  narrativeEn: "Ali has worked 7 years in the UAE and is planning his next move. Before he goes, he wants every dirham he's earned in end-of-service gratuity. The formula is simpler than it looks.",
  narrativeAr: "عمل علي ٧ سنوات في الإمارات ويخطط لخطوته التالية. قبل أن يغادر، يريد كل درهم استحقه من مكافأة نهاية الخدمة. الصيغة أبسط مما تبدو.",
  nodes: nodes5("gg",
    { en: "What Is Gratuity?", ar: "ما هي مكافأة نهاية الخدمة؟", kind: "quiz" },
    { en: "Calculating Gratuity", ar: "احتساب المكافأة", kind: "quiz" },
    { en: "Garden of Benefits", ar: "حديقة المزايا", kind: "story" },
    { en: "Gratuity Calculator", ar: "حاسبة المكافأة", kind: "minigame" },
    { en: "Benefits Boss", ar: "بوس المزايا", kind: "boss" },
  ),
};

const familyMajlis: WorldContent = {
  slug: "family-majlis", nameEn: "Family Majlis", nameAr: "مجلس العائلة", bannerKey: "family-majlis",
  narrativeEn: "Hassan and Layla just got married and realised they never discussed money. Two incomes, different spending habits, one shared future. The family majlis is open — let's talk finances.",
  narrativeAr: "تزوّج حسن وليلى للتو وأدركا أنهما لم يناقشا الأموال قط. دخلان مختلفان وعادات إنفاق متباينة ومستقبل مشترك. مجلس العائلة مفتوح — لنتحدث عن الماليات.",
  nodes: nodes5("fm",
    { en: "Joint Finances", ar: "الماليات المشتركة", kind: "quiz" },
    { en: "Family Budgeting", ar: "ميزانية الأسرة", kind: "quiz" },
    { en: "The Majlis Meeting", ar: "اجتماع المجلس", kind: "story" },
    { en: "Family Budget", ar: "ميزانية العائلة", kind: "minigame" },
    { en: "Family Finance Boss", ar: "بوس مالية الأسرة", kind: "boss" },
  ),
};

const bridgeOfBorders: WorldContent = {
  slug: "bridge-of-borders", nameEn: "Bridge of Borders", nameAr: "جسر الحدود", bannerKey: "bridge-of-borders",
  narrativeEn: "Ravi sends AED 3,000 home to India every month. He never compared rates. One afternoon of research could save him thousands a year. The bridge starts with the right exchange rate.",
  narrativeAr: "يرسل رافي ٣٬٠٠٠ درهم شهرياً إلى الهند. لم يقارن الأسعار قط. بعد ظهيرة واحدة من البحث يمكنه توفير آلاف سنوياً. الجسر يبدأ بسعر الصرف الصحيح.",
  nodes: nodes5("bb",
    { en: "Sending Money Home", ar: "إرسال الأموال للوطن", kind: "quiz" },
    { en: "Exchange Rates & Fees", ar: "أسعار الصرف والرسوم", kind: "quiz" },
    { en: "Sending Home Story", ar: "قصة إرسال الأموال", kind: "story" },
    { en: "Transfer Comparison", ar: "مقارنة التحويل", kind: "minigame" },
    { en: "Remittance Boss", ar: "بوس التحويلات", kind: "boss" },
  ),
};

const scamSentinel: WorldContent = {
  slug: "scam-sentinel", nameEn: "Scam Sentinel", nameAr: "حارس النصب", bannerKey: "scam-sentinel",
  narrativeEn: "Nadia received a call from 'her bank' asking for her OTP. She almost gave it. Scams cost UAE residents millions each year. Learn to spot them before they cost you.",
  narrativeAr: "تلقّت نادية اتصالاً من 'بنكها' يطلب منها كلمة المرور لمرة واحدة. كادت تعطيها. تكلّف عمليات النصب المقيمين في الإمارات ملايين سنوياً. تعلّم كيف تكتشفها قبل أن تكلّفك.",
  nodes: nodes5("ss",
    { en: "Spotting Scams", ar: "كشف عمليات النصب", kind: "quiz" },
    { en: "Common UAE Scams", ar: "عمليات النصب الشائعة في الإمارات", kind: "quiz" },
    { en: "The Scam Call", ar: "مكالمة النصب", kind: "story" },
    { en: "Scam Spotter", ar: "كاشف النصب", kind: "minigame" },
    { en: "Scam Boss", ar: "بوس النصب", kind: "boss" },
  ),
};

const goalGarden: WorldContent = {
  slug: "goal-garden", nameEn: "Goal Garden", nameAr: "حديقة الأهداف", bannerKey: "goal-garden",
  narrativeEn: "Mariam wants to buy a car, travel to Japan, and retire comfortably — but has no plan. SMART goals and automated savings turn wishes into reality. Plant your goals and watch them grow.",
  narrativeAr: "تريد مريم شراء سيارة والسفر إلى اليابان والتقاعد بشكل مريح — لكن ليس لها خطة. الأهداف الذكية والادخار التلقائي يحوّلان الأمنيات إلى واقع. ازرع أهدافك وشاهدها تنمو.",
  nodes: nodes5("gol",
    { en: "Setting Financial Goals", ar: "تحديد الأهداف المالية", kind: "quiz" },
    { en: "Short, Medium & Long-Term", ar: "الأهداف القصيرة والمتوسطة والطويلة", kind: "quiz" },
    { en: "The Goal Garden Story", ar: "قصة حديقة الأهداف", kind: "story" },
    { en: "Goal Tracker", ar: "متتبع الأهداف", kind: "minigame" },
    { en: "Goal Master", ar: "سيد الأهداف", kind: "boss" },
  ),
};

// ── Registry ──────────────────────────────────────────────────────────────────

export const WORLD_CONTENT: Record<string, WorldContent> = {
  "marina-mile":        marinaMile,
  "skyline-heights":    skylineHeights,
  "souk-of-savings":    soukOfSavings,
  "dirham-desert":      dirhamDesert,
  "loan-lighthouse":    loanLighthouse,
  "card-canyon":        cardCanyon,
  "oasis-of-insurance": oasisOfInsurance,
  "asset-atlas":        assetAtlas,
  "skyline-keys":       skylineKeys,
  "halal-harbour":      halalHarbour,
  "gratuity-garden":    gratuityGarden,
  "family-majlis":      familyMajlis,
  "bridge-of-borders":  bridgeOfBorders,
  "scam-sentinel":      scamSentinel,
  "goal-garden":        goalGarden,
};
