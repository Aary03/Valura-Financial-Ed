/**
 * Valura UAE — Full Curriculum Seed Data
 *
 * 15 worlds × 5–6 nodes × 3–4 questions × 4 choices.
 * Voice: direct, intelligent, anti-jargon, UAE-rooted.
 * All AED amounts are illustrative. No brand names, no investment advice.
 * Disclaimer appended to every world description:
 *   "Educational only, not financial advice."
 *
 * Arabic translations are first-pass for UAE copywriter review.
 */

// ── Types ──────────────────────────────────────────────────────────────────────

export type ContentTrack = "CONVENTIONAL" | "ISLAMIC" | "NEUTRAL";
export type NodeKind     = "QUIZ" | "STORY" | "MINIGAME" | "BOSS";
export type QuestionKind = "SINGLE" | "MULTI" | "TRUE_FALSE";

export interface ChoiceSeed {
  textEn:    string;
  textAr:    string;
  isCorrect: boolean;
}
export interface QuestionSeed {
  orderIndex:    number;
  kind:          QuestionKind;
  promptEn:      string;
  promptAr:      string;
  explanationEn: string;
  explanationAr: string;
  contentTrack:  ContentTrack;
  choices:       ChoiceSeed[];
}
export interface NodeSeed {
  orderIndex: number;
  kind:       NodeKind;
  titleEn:    string;
  titleAr:    string;
  questions:  QuestionSeed[];
}
export interface WorldSeed {
  id:            string;
  slug:          string;
  orderIndex:    number;
  nameEn:        string;
  nameAr:        string;
  themeKey:      string;
  descriptionEn: string;
  descriptionAr: string;
  isLocked:      boolean;
  nodes:         NodeSeed[];
}

// ── Worlds ─────────────────────────────────────────────────────────────────────

export const WORLDS: WorldSeed[] = [

  // ══════════════════════════════════════════════════════════════════
  // 1  MARINA MILE — Money basics
  // ══════════════════════════════════════════════════════════════════
  {
    id: "marina-mile", slug: "marina-mile", orderIndex: 1,
    nameEn: "Marina Mile", nameAr: "مارينا مايل",
    themeKey: "marina",
    descriptionEn: "Income, expenses, and your first real budget. Educational only, not financial advice.",
    descriptionAr: "الدخل والمصاريف وأول ميزانية حقيقية لك. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: false,
    nodes: [
      {
        orderIndex: 1, kind: "STORY",
        titleEn: "The Numbers That Run Your Life", titleAr: "الأرقام التي تحكم حياتك",
        questions: [],
      },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Income Fundamentals", titleAr: "أساسيات الدخل",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Your gross salary is AED 15,000. Your employer deducts AED 750 for a pension scheme. What is your net (take-home) salary?",
            promptAr: "راتبك الإجمالي ١٥٬٠٠٠ درهم. يخصم صاحب العمل ٧٥٠ درهم لصندوق التقاعد. ما هو راتبك الصافي؟",
            explanationEn: "Net salary = gross minus all deductions. AED 15,000 − AED 750 = AED 14,250. Expats typically have no pension deduction, so their net equals gross minus any voluntary deductions.",
            explanationAr: "الراتب الصافي = الإجمالي مطروحاً منه الاستقطاعات. ١٥٬٠٠٠ − ٧٥٠ = ١٤٬٢٥٠ درهم. عادةً لا يُستقطع من رواتب المغتربين مبالغ تقاعدية.",
            choices: [
              { textEn: "AED 14,250", textAr: "١٤٬٢٥٠ درهم", isCorrect: true  },
              { textEn: "AED 15,000", textAr: "١٥٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 15,750", textAr: "١٥٬٧٥٠ درهم", isCorrect: false },
              { textEn: "AED 13,500", textAr: "١٣٬٥٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam earns AED 20,000/month and saves AED 4,000. What is her savings rate?",
            promptAr: "مريم تكسب ٢٠٬٠٠٠ درهم شهرياً وتوفر ٤٬٠٠٠ درهم. ما هو معدل ادخارها؟",
            explanationEn: "Savings rate = savings ÷ income × 100. AED 4,000 ÷ AED 20,000 = 20%. A 20% savings rate is often cited as a healthy starting target.",
            explanationAr: "معدل الادخار = المدخرات ÷ الدخل × ١٠٠. ٤٬٠٠٠ ÷ ٢٠٬٠٠٠ = ٢٠٪. يُعدّ هذا المعدل هدفاً صحياً جيداً.",
            choices: [
              { textEn: "20%",  textAr: "٢٠٪",  isCorrect: true  },
              { textEn: "25%",  textAr: "٢٥٪",  isCorrect: false },
              { textEn: "15%",  textAr: "١٥٪",  isCorrect: false },
              { textEn: "10%",  textAr: "١٠٪",  isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which of these is an example of passive income?",
            promptAr: "أيٌّ من التالي مثال على الدخل السلبي؟",
            explanationEn: "Passive income requires little ongoing effort — rental income from a property you own is a classic example. A salary requires active daily work. A bonus is part of active employment. A tax refund is a one-off, not income.",
            explanationAr: "الدخل السلبي لا يتطلب جهداً مستمراً — الدخل الإيجاري من عقار تمتلكه مثال كلاسيكي عليه.",
            choices: [
              { textEn: "Monthly salary from your employer",    textAr: "الراتب الشهري من صاحب العمل",      isCorrect: false },
              { textEn: "Rental income from a property you own", textAr: "الإيجار من عقار تمتلكه",           isCorrect: true  },
              { textEn: "A performance bonus at year end",      textAr: "مكافأة الأداء في نهاية العام",     isCorrect: false },
              { textEn: "A one-time tax refund",                textAr: "استرداد ضريبي لمرة واحدة",         isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Fixed vs Variable Expenses", titleAr: "المصاريف الثابتة مقابل المتغيرة",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj pays AED 5,500 every month for his apartment. This is best described as:",
            promptAr: "راج يدفع ٥٬٥٠٠ درهم كل شهر لشقته. هذا يُصنَّف على أنه:",
            explanationEn: "A fixed expense stays the same every period — rent is the most common example. It does not change based on how much you use or consume.",
            explanationAr: "المصروف الثابت لا يتغير من فترة لأخرى — الإيجار هو المثال الأكثر شيوعاً.",
            choices: [
              { textEn: "A variable expense",    textAr: "مصروف متغير",    isCorrect: false },
              { textEn: "A discretionary expense", textAr: "مصروف تقديري", isCorrect: false },
              { textEn: "A fixed expense",        textAr: "مصروف ثابت",    isCorrect: true  },
              { textEn: "An irregular expense",   textAr: "مصروف غير منتظم", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which of these is a variable expense?",
            promptAr: "أيٌّ من التالي مصروف متغير؟",
            explanationEn: "An electricity bill changes each month based on usage — it is a variable expense. Rent, a car loan repayment, and annual school fees are all fixed or predictable amounts that do not change with behaviour.",
            explanationAr: "فاتورة الكهرباء تتغير شهرياً حسب الاستهلاك، لذا هي مصروف متغير.",
            choices: [
              { textEn: "Monthly apartment rent",       textAr: "إيجار الشقة الشهري",          isCorrect: false },
              { textEn: "Car loan monthly instalment",  textAr: "قسط قرض السيارة الشهري",      isCorrect: false },
              { textEn: "Electricity bill",             textAr: "فاتورة الكهرباء",             isCorrect: true  },
              { textEn: "Annual school fees",           textAr: "الرسوم المدرسية السنوية",     isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Why is it useful to separate fixed from variable expenses in a budget?",
            promptAr: "لماذا من المفيد الفصل بين المصاريف الثابتة والمتغيرة في الميزانية؟",
            explanationEn: "Fixed expenses tell you exactly what you're committed to every month — that amount is non-negotiable short-term. Variable expenses are where your real spending choices live, and where cuts are possible. Without this split, you can't see what you actually control.",
            explanationAr: "المصاريف الثابتة تُخبرك بما أنت ملتزم به شهرياً — وهو مبلغ غير قابل للتفاوض على المدى القصير. أما المتغيرة فهي حيث تكمن خياراتك الفعلية.",
            choices: [
              { textEn: "Fixed expenses are always higher",                  textAr: "المصاريف الثابتة دائماً أعلى",                  isCorrect: false },
              { textEn: "Variable expenses can never be reduced",            textAr: "المصاريف المتغيرة لا يمكن تخفيضها أبداً",       isCorrect: false },
              { textEn: "It shows what is committed vs what you can control", textAr: "يُظهر ما هو ملتزم به وما يمكنك التحكم فيه",   isCorrect: true  },
              { textEn: "It helps you qualify for a personal loan",           textAr: "يساعدك على التأهل للحصول على قرض شخصي",       isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "QUIZ",
        titleEn: "The 50 / 30 / 20 Rule", titleAr: "قاعدة ٥٠ / ٣٠ / ٢٠",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "In the 50/30/20 rule, what does the '20' represent?",
            promptAr: "في قاعدة ٥٠/٣٠/٢٠، ماذا يمثّل الـ'٢٠'؟",
            explanationEn: "The 20% bucket covers savings and debt repayment — building your future. The 50% covers needs (housing, food, transport) and 30% covers wants (dining out, entertainment).",
            explanationAr: "نسبة الـ٢٠٪ تغطي الادخار وسداد الديون — أي بناء مستقبلك. ٥٠٪ للاحتياجات و٣٠٪ للرغبات.",
            choices: [
              { textEn: "Entertainment and dining",       textAr: "الترفيه والمطاعم",                   isCorrect: false },
              { textEn: "Savings and debt repayment",     textAr: "الادخار وسداد الديون",               isCorrect: true  },
              { textEn: "Housing and utilities",          textAr: "السكن والمرافق",                     isCorrect: false },
              { textEn: "Transport and groceries",        textAr: "المواصلات والبقالة",                 isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal earns AED 18,000/month and applies the 50/30/20 rule. How much should go toward needs?",
            promptAr: "فيصل يكسب ١٨٬٠٠٠ درهم شهرياً ويطبق قاعدة ٥٠/٣٠/٢٠. كم يجب أن يخصص للاحتياجات؟",
            explanationEn: "50% of AED 18,000 = AED 9,000. Needs include rent, groceries, transport, utilities, and health insurance.",
            explanationAr: "٥٠٪ من ١٨٬٠٠٠ = ٩٬٠٠٠ درهم. الاحتياجات تشمل الإيجار والبقالة والمواصلات والمرافق.",
            choices: [
              { textEn: "AED 3,600", textAr: "٣٬٦٠٠ درهم", isCorrect: false },
              { textEn: "AED 5,400", textAr: "٥٬٤٠٠ درهم", isCorrect: false },
              { textEn: "AED 9,000", textAr: "٩٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 7,200", textAr: "٧٬٢٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which of these belongs in the 'wants' bucket?",
            promptAr: "أيٌّ من التالي ينتمي إلى سلّة 'الرغبات'؟",
            explanationEn: "A streaming subscription is optional — you could live without it. Rent, health insurance, and groceries are needs because they cover shelter, health, and food.",
            explanationAr: "اشتراك خدمة البث اختياري — يمكنك العيش بدونه. الإيجار والتأمين الصحي والبقالة كلها احتياجات.",
            choices: [
              { textEn: "Monthly apartment rent",          textAr: "إيجار الشقة الشهري",         isCorrect: false },
              { textEn: "Health insurance premium",        textAr: "قسط التأمين الصحي",          isCorrect: false },
              { textEn: "Streaming service subscription",  textAr: "اشتراك خدمة البث الرقمي",   isCorrect: true  },
              { textEn: "Supermarket groceries",           textAr: "مشتريات البقالة",            isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 5, kind: "BOSS",
        titleEn: "Budget Blueprint", titleAr: "خريطة الميزانية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Aisha earns AED 22,000/month. Rent AED 7,000 · Groceries AED 2,000 · Transport AED 1,200 · Eating out AED 3,500 · Savings AED 2,200. What is her savings rate?",
            promptAr: "عائشة تكسب ٢٢٬٠٠٠ درهم/شهر. الإيجار ٧٬٠٠٠ · البقالة ٢٬٠٠٠ · المواصلات ١٬٢٠٠ · المطاعم ٣٬٥٠٠ · الادخار ٢٬٢٠٠. ما معدل ادخارها؟",
            explanationEn: "AED 2,200 ÷ AED 22,000 = 10%. She is saving 10%, which is below the 20% target. Her dining-out spend (AED 3,500) is the largest discretionary line and the easiest to trim.",
            explanationAr: "٢٬٢٠٠ ÷ ٢٢٬٠٠٠ = ١٠٪. إنها تدّخر ١٠٪، وهو أقل من هدف ٢٠٪. مصاريف المطاعم (٣٬٥٠٠ درهم) هي أكبر بند تقديري ويمكن تخفيضه.",
            choices: [
              { textEn: "10%", textAr: "١٠٪", isCorrect: true  },
              { textEn: "15%", textAr: "١٥٪", isCorrect: false },
              { textEn: "20%", textAr: "٢٠٪", isCorrect: false },
              { textEn: "8%",  textAr: "٨٪",  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the most important first step when building a personal budget?",
            promptAr: "ما هي أهم خطوة أولى عند بناء ميزانية شخصية؟",
            explanationEn: "You can't set realistic targets without knowing where you actually spend. Tracking real expenses for 1–2 months reveals patterns that guesswork misses. Cutting everything immediately or getting a financial advisor are premature before you understand your own baseline.",
            explanationAr: "لا يمكنك وضع أهداف واقعية دون معرفة أين تُنفق بالفعل. تتبع المصاريف الفعلية لشهر أو شهرين يكشف أنماطاً لا يمكن تخمينها.",
            choices: [
              { textEn: "Cut all discretionary spending immediately",          textAr: "قطع جميع المصاريف التقديرية فوراً",               isCorrect: false },
              { textEn: "Track actual spending for at least one month first",  textAr: "تتبع الإنفاق الفعلي لشهر على الأقل أولاً",        isCorrect: true  },
              { textEn: "Set equal spending amounts for every category",       textAr: "تحديد مبالغ متساوية لكل فئة",                     isCorrect: false },
              { textEn: "Hire a financial advisor before starting",            textAr: "توظيف مستشار مالي قبل البدء",                     isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A standard emergency fund recommendation is to save enough to cover how many months of expenses?",
            promptAr: "التوصية القياسية لصندوق الطوارئ هي توفير ما يكفي لتغطية كم شهر من المصاريف؟",
            explanationEn: "3–6 months of expenses is the widely cited target. This covers job loss, medical emergencies, or unexpected repairs without needing to take on debt. UAE residents — especially expats — should lean toward 6 months given visa dependency on employment.",
            explanationAr: "من ٣ إلى ٦ أشهر من النفقات هو الهدف المتعارف عليه. المقيمون في الإمارات — وخاصة المغتربين — يُفضَّل أن يستهدفوا ٦ أشهر نظراً لارتباط الإقامة بالعمل.",
            choices: [
              { textEn: "1 month",   textAr: "شهر واحد",   isCorrect: false },
              { textEn: "3–6 months", textAr: "٣–٦ أشهر", isCorrect: true  },
              { textEn: "12 months", textAr: "١٢ شهراً",   isCorrect: false },
              { textEn: "2 months",  textAr: "شهران",      isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which UAE system ensures your employer pays your salary electronically and on time?",
            promptAr: "أي نظام إماراتي يضمن أن يدفع صاحب العمل راتبك إلكترونياً وفي موعده؟",
            explanationEn: "The Wage Protection System (WPS), managed by the Ministry of Human Resources, requires employers to pay salaries through approved channels within set deadlines. Non-compliance results in fines and can trigger a labour complaint.",
            explanationAr: "نظام حماية الأجور (WPS)، الذي تديره وزارة الموارد البشرية، يُلزم أصحاب العمل بصرف الرواتب عبر القنوات المعتمدة في المواعيد المحددة.",
            choices: [
              { textEn: "AECB credit bureau portal",           textAr: "بوابة مكتب الاتحاد للمعلومات الائتمانية", isCorrect: false },
              { textEn: "Wage Protection System (WPS)",        textAr: "نظام حماية الأجور (WPS)",                 isCorrect: true  },
              { textEn: "UAE Central Bank consumer portal",    textAr: "بوابة المستهلك في المصرف المركزي",        isCorrect: false },
              { textEn: "GPSSA pension authority",             textAr: "هيئة المعاشات والتأمينات الاجتماعية",    isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 2  SKYLINE HEIGHTS — Banking basics
  // ══════════════════════════════════════════════════════════════════
  {
    id: "skyline-heights", slug: "skyline-heights", orderIndex: 2,
    nameEn: "Skyline Heights", nameAr: "سكاي لاين هايتس",
    themeKey: "skyline",
    descriptionEn: "How your bank account actually works — accounts, fees, transfers, and the WPS. Educational only, not financial advice.",
    descriptionAr: "كيف يعمل حسابك البنكي فعلاً — الحسابات والرسوم والتحويلات ونظام WPS. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Inside Your Bank Account", titleAr: "داخل حسابك البنكي", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Account Types", titleAr: "أنواع الحسابات",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the main practical difference between a current account and a savings account in the UAE?",
            promptAr: "ما الفرق العملي الرئيسي بين الحساب الجاري وحساب التوفير في الإمارات؟",
            explanationEn: "A current account provides a chequebook and debit card for daily transactions with no interest, while a savings account pays interest/profit but typically limits free withdrawals. Choose based on how you plan to use the account.",
            explanationAr: "الحساب الجاري يوفر دفتر شيكات وبطاقة خصم للمعاملات اليومية دون فائدة، بينما يدفع حساب التوفير فائدة/ربحاً ولكنه قد يقيّد السحوبات المجانية.",
            choices: [
              { textEn: "Current accounts pay higher interest",                                     textAr: "الحسابات الجارية تدفع فائدة أعلى",                                              isCorrect: false },
              { textEn: "Savings accounts allow unlimited free withdrawals",                         textAr: "حسابات التوفير تتيح سحوبات مجانية غير محدودة",                                 isCorrect: false },
              { textEn: "Current accounts are for daily transactions; savings accounts pay returns", textAr: "الحساب الجاري للمعاملات اليومية؛ حساب التوفير يدفع عائداً",                    isCorrect: true  },
              { textEn: "Only UAE nationals can open savings accounts",                              textAr: "فقط المواطنون الإماراتيون يمكنهم فتح حسابات توفير",                            isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does a 'minimum balance requirement' on a bank account mean?",
            promptAr: "ماذا يعني 'الحد الأدنى للرصيد' في الحساب البنكي؟",
            explanationEn: "The minimum balance is the amount you must maintain at all times to avoid a monthly fee. Falling below it does not block your account — it just triggers a charge. Always check the fee schedule before opening an account.",
            explanationAr: "الحد الأدنى للرصيد هو المبلغ الذي يجب أن تحتفظ به في جميع الأوقات لتفادي رسوم شهرية. الانخفاض عنه لا يُجمّد حسابك — بل يُفعّل رسوماً.",
            choices: [
              { textEn: "The maximum you can deposit per month",                      textAr: "الحد الأقصى الذي يمكنك إيداعه شهرياً",                  isCorrect: false },
              { textEn: "The minimum to keep in the account to avoid fees",           textAr: "الحد الأدنى لتجنب الرسوم",                              isCorrect: true  },
              { textEn: "The amount required to open the account initially",          textAr: "المبلغ المطلوب لفتح الحساب في البداية",                  isCorrect: false },
              { textEn: "The amount auto-invested by the bank on your behalf",        textAr: "المبلغ الذي يستثمره البنك تلقائياً نيابةً عنك",         isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj's account has a AED 3,000 minimum balance and a AED 25 monthly fee when he falls below it. He holds AED 2,500 all year. How much does he pay in fees over 12 months?",
            promptAr: "حساب راج لديه حد أدنى ٣٬٠٠٠ درهم ورسوم شهرية ٢٥ درهم إذا انخفض عنه. احتفظ بـ٢٬٥٠٠ درهم طوال العام. كم يدفع من الرسوم خلال ١٢ شهراً؟",
            explanationEn: "AED 25 × 12 months = AED 300 per year. This highlights how small monthly fees compound into real annual costs. Keeping the minimum balance would cost nothing.",
            explanationAr: "٢٥ × ١٢ شهراً = ٣٠٠ درهم سنوياً. هذا يُبيّن كيف تتراكم الرسوم الشهرية الصغيرة لتصبح تكلفة سنوية حقيقية.",
            choices: [
              { textEn: "AED 0",   textAr: "صفر درهم",  isCorrect: false },
              { textEn: "AED 150", textAr: "١٥٠ درهم",  isCorrect: false },
              { textEn: "AED 300", textAr: "٣٠٠ درهم",  isCorrect: true  },
              { textEn: "AED 600", textAr: "٦٠٠ درهم",  isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Transfers & WPS", titleAr: "التحويلات ونظام حماية الأجور",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the Wage Protection System (WPS) in the UAE?",
            promptAr: "ما هو نظام حماية الأجور (WPS) في الإمارات؟",
            explanationEn: "WPS is a Central Bank of UAE system requiring employers to pay salaries electronically through approved channels by a set deadline each month. It creates an audit trail and protects workers from delayed or unpaid wages.",
            explanationAr: "نظام WPS هو نظام للمصرف المركزي يُلزم أصحاب العمل بدفع الرواتب إلكترونياً عبر قنوات معتمدة في موعد محدد كل شهر.",
            choices: [
              { textEn: "A government subsidy paid to low-income workers",                   textAr: "دعم حكومي يُصرف للعمال ذوي الدخل المحدود",             isCorrect: false },
              { textEn: "A system ensuring employers pay salaries electronically on time",   textAr: "نظام يضمن صرف الرواتب إلكترونياً وفي موعدها",         isCorrect: true  },
              { textEn: "A pension savings scheme for UAE nationals",                        textAr: "نظام ادخار تقاعدي للمواطنين الإماراتيين",             isCorrect: false },
              { textEn: "An insurance product protecting against job loss",                  textAr: "منتج تأميني يحمي من فقدان الوظيفة",                   isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam sends AED 3,000 to family abroad. Which factor has the MOST impact on total cost?",
            promptAr: "مريم ترسل ٣٬٠٠٠ درهم لعائلتها في الخارج. أي عامل يؤثر أكثر على التكلفة الإجمالية؟",
            explanationEn: "The stated transfer fee is visible but the exchange rate margin is often where providers make most of their money. A 1% worse exchange rate on AED 3,000 costs AED 30 — sometimes more than the advertised fee itself.",
            explanationAr: "رسوم التحويل المُعلنة واضحة، لكن هامش سعر الصرف هو المكان الذي يجني منه مزودو الخدمة معظم أرباحهم.",
            choices: [
              { textEn: "How many days the transfer takes",                          textAr: "عدد أيام التحويل",                               isCorrect: false },
              { textEn: "The combination of transfer fee AND the exchange rate margin", textAr: "مجموع رسوم التحويل وهامش سعر الصرف معاً",       isCorrect: true  },
              { textEn: "The name of the recipient's bank",                          textAr: "اسم بنك المستلم",                               isCorrect: false },
              { textEn: "Whether it is sent on a weekday or weekend",               textAr: "إرساله في يوم عمل أو عطلة",                     isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Domestic (UAE-to-UAE) bank transfers are settled through which central infrastructure?",
            promptAr: "تسوية التحويلات البنكية الداخلية (من الإمارات إلى الإمارات) تتم عبر أي بنية تحتية مركزية؟",
            explanationEn: "The UAE Funds Transfer System (UAEFTS) is the Central Bank of UAE's real-time gross settlement system for interbank transactions. It is fast and domestic — SWIFT is used for international wires.",
            explanationAr: "نظام تحويل الأموال الإماراتي (UAEFTS) هو نظام التسوية الفورية التابع للمصرف المركزي. أما SWIFT فيُستخدم للتحويلات الدولية.",
            choices: [
              { textEn: "SWIFT international network",                      textAr: "شبكة SWIFT الدولية",                          isCorrect: false },
              { textEn: "UAE Funds Transfer System (UAEFTS)",               textAr: "نظام تحويل الأموال الإماراتي (UAEFTS)",        isCorrect: true  },
              { textEn: "WPS employer portal",                              textAr: "بوابة أصحاب العمل في WPS",                    isCorrect: false },
              { textEn: "AECB payment gateway",                            textAr: "بوابة الدفع في مكتب المعلومات الائتمانية",     isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Banking Audit", titleAr: "مراجعة بنكية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "You receive an SMS: 'Your account is suspended — verify now at bank-secure-uae.com.' What should you do?",
            promptAr: "تتلقى رسالة نصية: 'حسابك معلّق — تحقق الآن على bank-secure-uae.com.' ماذا تفعل؟",
            explanationEn: "Banks never ask you to verify account details via SMS links. The domain is fake. Call your bank directly using the official number on the back of your card or from their official website. Never click links in unsolicited messages.",
            explanationAr: "لا تطلب البنوك التحقق من بيانات حسابك عبر روابط الرسائل النصية. تواصل مع بنكك مباشرةً عبر الرقم الرسمي على ظهر بطاقتك.",
            choices: [
              { textEn: "Click the link and re-enter your details quickly",      textAr: "اضغط الرابط وأدخل بياناتك بسرعة",                     isCorrect: false },
              { textEn: "Forward the SMS to your HR department",                 textAr: "أرسل الرسالة لقسم الموارد البشرية",                   isCorrect: false },
              { textEn: "Call your bank directly on the official card number",   textAr: "اتصل ببنكك مباشرةً على الرقم الرسمي",                 isCorrect: true  },
              { textEn: "Reply STOP to the sender's number",                     textAr: "رد بـ STOP على رقم المُرسل",                          isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "The Central Bank caps the early loan settlement fee at 1% of the outstanding balance. If Raj's remaining balance is AED 80,000, what is the maximum fee?",
            promptAr: "يحدد المصرف المركزي رسوم التسوية المبكرة بـ١٪ من الرصيد القائم. إذا كان رصيد راج المتبقي ٨٠٬٠٠٠ درهم، فما هي أقصى رسوم؟",
            explanationEn: "1% of AED 80,000 = AED 800. The Central Bank caps this at 1% of outstanding principal, subject to a maximum of AED 10,000. This fee is charged only once at settlement.",
            explanationAr: "١٪ من ٨٠٬٠٠٠ = ٨٠٠ درهم. يحدد المصرف المركزي هذه الرسوم بـ١٪ من الأصل المتبقي بحد أقصى ١٠٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 400",  textAr: "٤٠٠ درهم",   isCorrect: false },
              { textEn: "AED 800",  textAr: "٨٠٠ درهم",   isCorrect: true  },
              { textEn: "AED 1,600", textAr: "١٬٦٠٠ درهم", isCorrect: false },
              { textEn: "AED 4,000", textAr: "٤٬٠٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A savings account pays 3% p.a. and UAE inflation is 3.5%. What is the approximate real return?",
            promptAr: "حساب توفير يدفع ٣٪ سنوياً والتضخم في الإمارات ٣.٥٪. ما العائد الحقيقي التقريبي؟",
            explanationEn: "Real return ≈ nominal return minus inflation. 3% − 3.5% = −0.5%. The real return is negative, meaning your purchasing power is shrinking even though the nominal balance grows.",
            explanationAr: "العائد الحقيقي ≈ العائد الاسمي مطروحاً منه التضخم. ٣٪ − ٣.٥٪ = −٠.٥٪. العائد الحقيقي سلبي، أي أن قوتك الشرائية تتآكل حتى لو كان رصيدك يرتفع.",
            choices: [
              { textEn: "6.5%",  textAr: "٦.٥٪",   isCorrect: false },
              { textEn: "3%",    textAr: "٣٪",      isCorrect: false },
              { textEn: "−0.5%", textAr: "−٠.٥٪",  isCorrect: true  },
              { textEn: "0.5%",  textAr: "٠.٥٪",   isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "An Islamic savings account uses a Mudarabah structure. What does this mean for your returns?",
            promptAr: "حساب التوفير الإسلامي يعمل وفق هيكل المضاربة. ماذا يعني ذلك لعوائدك؟",
            explanationEn: "In Mudarabah, the bank invests your deposits and shares the resulting profit with you at a pre-agreed ratio. Returns are not guaranteed — they depend on actual profits. This is fundamentally different from a fixed interest rate.",
            explanationAr: "في المضاربة، يستثمر البنك ودائعك ويتقاسم الأرباح معك بنسبة متفق عليها مسبقاً. العوائد غير مضمونة — تعتمد على الأرباح الفعلية.",
            choices: [
              { textEn: "The bank guarantees a fixed rate of return",               textAr: "البنك يضمن معدل عائد ثابت",                            isCorrect: false },
              { textEn: "Returns are a share of profits, not guaranteed",           textAr: "العوائد حصة من الأرباح، وليست مضمونة",                  isCorrect: true  },
              { textEn: "The account is protected by government deposit insurance", textAr: "الحساب محمي بتأمين الودائع الحكومي",                   isCorrect: false },
              { textEn: "You pay a fixed monthly fee instead of earning interest",  textAr: "تدفع رسوماً شهرية ثابتة بدلاً من كسب فائدة",           isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 3  SOUK OF SAVINGS — Habit formation
  // ══════════════════════════════════════════════════════════════════
  {
    id: "souk-of-savings", slug: "souk-of-savings", orderIndex: 3,
    nameEn: "Souk of Savings", nameAr: "سوق المدخرات",
    themeKey: "souk",
    descriptionEn: "Building a saving habit that sticks — automation, sinking funds, and emergency buffers. Educational only, not financial advice.",
    descriptionAr: "بناء عادة ادخار ثابتة — التحويل التلقائي وصناديق الاستهداف واحتياطيات الطوارئ. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "The Science of Saving", titleAr: "علم الادخار", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Why Save?", titleAr: "لماذا تدّخر؟",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does 'pay yourself first' mean in personal finance?",
            promptAr: "ماذا يعني 'ادفع لنفسك أولاً' في المالية الشخصية؟",
            explanationEn: "Paying yourself first means transferring a set amount to savings immediately when your salary arrives — before paying bills or spending. This prevents the common trap of spending first and saving whatever is left (which is usually nothing).",
            explanationAr: "يعني تحويل مبلغ محدد للادخار فور وصول راتبك — قبل دفع الفواتير أو الإنفاق. هذا يمنع فخ الإنفاق أولاً وادخار ما تبقى (عادةً لا شيء).",
            choices: [
              { textEn: "Pay your salary to yourself before your employer pays it",  textAr: "استلام راتبك بنفسك قبل أن يدفعه صاحب العمل",         isCorrect: false },
              { textEn: "Transfer savings before paying bills or spending",          textAr: "تحويل المدخرات قبل دفع الفواتير أو الإنفاق",          isCorrect: true  },
              { textEn: "Prioritise paying off your credit card first",              textAr: "إعطاء الأولوية لسداد بطاقة الائتمان",                 isCorrect: false },
              { textEn: "Avoid sharing your salary details with your employer",      textAr: "تجنب مشاركة تفاصيل راتبك مع صاحب العمل",             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a 'sinking fund'?",
            promptAr: "ما هو 'صندوق الاستهداف' (sinking fund)؟",
            explanationEn: "A sinking fund is money you set aside monthly for a known future expense — like annual car insurance, a holiday, or school fees. By saving monthly you avoid scrambling for a lump sum when the bill arrives.",
            explanationAr: "صندوق الاستهداف هو مبلغ تضعه جانباً شهرياً لمصروف مستقبلي معروف — كالتأمين السنوي على السيارة أو الإجازة أو الرسوم المدرسية.",
            choices: [
              { textEn: "A government savings bond that sinks after maturity",        textAr: "سند ادخار حكومي يستحق بعد أجل",                         isCorrect: false },
              { textEn: "Monthly savings set aside for a known future expense",       textAr: "مدخرات شهرية مخصصة لمصروف مستقبلي معروف",              isCorrect: true  },
              { textEn: "An emergency fund kept in a separate account",              textAr: "صندوق طوارئ محتفظ به في حساب منفصل",                    isCorrect: false },
              { textEn: "A loan repayment reserve required by the bank",             textAr: "احتياطي سداد قرض تطلبه البنك",                          isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Aisha wants to save AED 12,000 for a holiday in 10 months. How much should she set aside monthly?",
            promptAr: "عائشة تريد توفير ١٢٬٠٠٠ درهم لإجازة خلال ١٠ أشهر. كم تضع جانباً كل شهر؟",
            explanationEn: "AED 12,000 ÷ 10 months = AED 1,200/month. This is a sinking fund in action — breaking a large goal into manageable monthly contributions.",
            explanationAr: "١٢٬٠٠٠ ÷ ١٠ أشهر = ١٬٢٠٠ درهم/شهر. هذا هو صندوق الاستهداف — تقسيم هدف كبير إلى مساهمات شهرية قابلة للإدارة.",
            choices: [
              { textEn: "AED 1,000", textAr: "١٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 1,200", textAr: "١٬٢٠٠ درهم", isCorrect: true  },
              { textEn: "AED 1,500", textAr: "١٬٥٠٠ درهم", isCorrect: false },
              { textEn: "AED 2,000", textAr: "٢٬٠٠٠ درهم", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Automating Your Savings", titleAr: "أتمتة مدخراتك",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a standing order in banking?",
            promptAr: "ما هو 'الأمر الدائم' في الخدمات المصرفية؟",
            explanationEn: "A standing order is an automatic bank instruction to transfer a fixed amount to another account on a recurring schedule — weekly, monthly, etc. It is set up once and runs automatically without manual action each time.",
            explanationAr: "الأمر الدائم هو تعليمة بنكية تلقائية لتحويل مبلغ ثابت إلى حساب آخر بصفة منتظمة — أسبوعياً أو شهرياً. يُضبط مرة واحدة ويعمل تلقائياً.",
            choices: [
              { textEn: "A cheque that automatically renews each month",               textAr: "شيك يتجدد تلقائياً كل شهر",                            isCorrect: false },
              { textEn: "An automatic recurring transfer to another account",          textAr: "تحويل تلقائي متكرر إلى حساب آخر",                      isCorrect: true  },
              { textEn: "A minimum balance alert sent by your bank",                  textAr: "تنبيه من البنك عند انخفاض الرصيد الأدنى",              isCorrect: false },
              { textEn: "A salary advance feature for emergencies",                   textAr: "ميزة سلفة الراتب للطوارئ",                             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "When is the best time to schedule your automatic savings transfer?",
            promptAr: "ما هو أفضل وقت لجدولة تحويل مدخراتك التلقائي؟",
            explanationEn: "Scheduling the transfer the same day your salary arrives leaves no opportunity to spend the money first. Waiting until the end of the month usually results in little or nothing left to transfer.",
            explanationAr: "جدولة التحويل في نفس يوم الراتب لا تُتيح فرصة الإنفاق أولاً. الانتظار حتى نهاية الشهر عادةً لا يُبقي شيئاً للتحويل.",
            choices: [
              { textEn: "At the end of the month after all expenses",       textAr: "في نهاية الشهر بعد جميع المصاريف",                    isCorrect: false },
              { textEn: "On the same day your salary is credited",          textAr: "في نفس يوم إيداع الراتب",                             isCorrect: true  },
              { textEn: "Any random day is equally effective",              textAr: "أي يوم عشوائي يكون فعالاً بالتساوي",                  isCorrect: false },
              { textEn: "On the first of every calendar month only",        textAr: "في الأول من كل شهر ميلادي فقط",                      isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj sets up an automatic transfer of AED 1,500/month to savings for 3 years. Ignoring any returns, how much will he have saved?",
            promptAr: "راج يضبط تحويلاً تلقائياً بـ١٬٥٠٠ درهم/شهر للادخار لمدة ٣ سنوات. مع تجاهل أي عوائد، كم سيوفر؟",
            explanationEn: "AED 1,500 × 12 months × 3 years = AED 54,000. Automation removes willpower from the equation. You save consistently without deciding month-to-month.",
            explanationAr: "١٬٥٠٠ × ١٢ شهراً × ٣ سنوات = ٥٤٬٠٠٠ درهم. الأتمتة تُزيل الإرادة من المعادلة. توفّر باستمرار دون قرار شهري.",
            choices: [
              { textEn: "AED 36,000", textAr: "٣٦٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 45,000", textAr: "٤٥٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 54,000", textAr: "٥٤٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 18,000", textAr: "١٨٬٠٠٠ درهم", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Savings Health Check", titleAr: "فحص صحة المدخرات",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal earns AED 16,000/month, has AED 8,000 in monthly expenses, and zero savings. He wants a 6-month emergency fund. How long to build it — saving AED 2,000/month?",
            promptAr: "فيصل يكسب ١٦٬٠٠٠ درهم/شهر، لديه مصاريف شهرية ٨٬٠٠٠ درهم، وصفر مدخرات. يريد بناء صندوق طوارئ لـ٦ أشهر. كم يحتاج إذا وفّر ٢٬٠٠٠ درهم/شهر؟",
            explanationEn: "6-month emergency fund = 6 × AED 8,000 = AED 48,000. At AED 2,000/month, that takes 24 months (2 years). The earlier he starts, the fewer crises he faces unprotected.",
            explanationAr: "صندوق الطوارئ لـ٦ أشهر = ٦ × ٨٬٠٠٠ = ٤٨٬٠٠٠ درهم. بـ٢٬٠٠٠ درهم/شهر يستغرق ٢٤ شهراً. كلما بدأ أبكر، كلما مرّ بأزمات أقل دون حماية.",
            choices: [
              { textEn: "12 months", textAr: "١٢ شهراً", isCorrect: false },
              { textEn: "18 months", textAr: "١٨ شهراً", isCorrect: false },
              { textEn: "24 months", textAr: "٢٤ شهراً", isCorrect: true  },
              { textEn: "36 months", textAr: "٣٦ شهراً", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Where should an emergency fund ideally be kept?",
            promptAr: "أين يجب الاحتفاظ بصندوق الطوارئ في المثل الأعلى؟",
            explanationEn: "An emergency fund must be safe, liquid (accessible within 1–2 days), and separate from your daily spending account so you don't accidentally dip into it. A high-yield savings account or money market account balances safety and returns.",
            explanationAr: "يجب أن يكون صندوق الطوارئ آمناً وسائلاً (متاحاً في يوم أو يومين) ومنفصلاً عن حساب الإنفاق اليومي. حساب التوفير عالي العائد أو سوق المال يوازن بين السلامة والعوائد.",
            choices: [
              { textEn: "Invested in shares for higher returns",              textAr: "مستثمر في أسهم لعوائد أعلى",                       isCorrect: false },
              { textEn: "Kept in a liquid savings or money market account",   textAr: "محتفظ به في حساب توفير سائل أو سوق مال",           isCorrect: true  },
              { textEn: "Locked in a 5-year fixed deposit",                   textAr: "مجمّد في وديعة ثابتة لـ٥ سنوات",                   isCorrect: false },
              { textEn: "Kept as cash at home for instant access",            textAr: "محتفظ به نقداً في المنزل للوصول الفوري",           isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which savings challenge has proven most effective for habit formation, according to behavioural research?",
            promptAr: "أي تحدي ادخاري ثبت أنه الأكثر فاعلية لتكوين العادة، وفقاً لأبحاث السلوك؟",
            explanationEn: "Starting with very small amounts — even AED 50/week — and building up gradually ('micro-saving') has high completion rates because it feels achievable. Large, strict targets often fail because one missed week causes people to quit entirely.",
            explanationAr: "البدء بمبالغ صغيرة جداً — حتى ٥٠ درهم/أسبوع — ثم الزيادة التدريجية ('الادخار الصغير') له معدلات إنجاز عالية لأنه يبدو قابلاً للتحقيق.",
            choices: [
              { textEn: "Saving a large lump sum at year-end",               textAr: "ادخار مبلغ كبير في نهاية العام",                    isCorrect: false },
              { textEn: "Starting small and building gradually (micro-saving)", textAr: "البدء صغيراً والزيادة تدريجياً (الادخار الصغير)", isCorrect: true  },
              { textEn: "Cutting all spending for one month each quarter",    textAr: "قطع جميع الإنفاق لشهر كل ربع سنة",                isCorrect: false },
              { textEn: "Saving only when you receive a bonus",               textAr: "الادخار فقط عند استلام مكافأة",                     isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam has a fixed deposit earning 4.5% p.a. and an outstanding credit card balance charging 3.25% monthly. Which action gives her the better financial outcome?",
            promptAr: "مريم لديها وديعة ثابتة بعائد ٤.٥٪ سنوياً ورصيد بطاقة ائتمان يُحمَّل ٣.٢٥٪ شهرياً. أي إجراء يمنحها نتيجة مالية أفضل؟",
            explanationEn: "The credit card charges 3.25%/month ≈ 39% p.a. The fixed deposit earns 4.5% p.a. Paying off the card saves 39% p.a. — far better than the 4.5% the deposit earns. High-interest debt should almost always be cleared before building savings.",
            explanationAr: "البطاقة الائتمانية تُحمَّل ٣.٢٥٪/شهر أي ما يقارب ٣٩٪ سنوياً. الوديعة تربح ٤.٥٪ سنوياً. سداد البطاقة يوفر ٣٩٪ — أفضل بكثير. يجب عادةً سداد الديون عالية الفائدة قبل بناء المدخرات.",
            choices: [
              { textEn: "Keep the fixed deposit running and pay minimum on the card",  textAr: "الإبقاء على الوديعة ودفع الحد الأدنى على البطاقة",     isCorrect: false },
              { textEn: "Break the fixed deposit and pay off the credit card balance", textAr: "كسر الوديعة وسداد رصيد بطاقة الائتمان",              isCorrect: true  },
              { textEn: "Transfer the card balance to a new card",                     textAr: "نقل رصيد البطاقة إلى بطاقة جديدة",                   isCorrect: false },
              { textEn: "Keep both and save any extra income separately",              textAr: "الإبقاء على كليهما وادخار أي دخل إضافي بشكل منفصل",  isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 4  DIRHAM DESERT — Inflation
  // ══════════════════════════════════════════════════════════════════
  {
    id: "dirham-desert", slug: "dirham-desert", orderIndex: 4,
    nameEn: "Dirham Desert", nameAr: "صحراء الدرهم",
    themeKey: "desert",
    descriptionEn: "Why money sitting still loses ground — inflation, purchasing power, and real returns. Educational only, not financial advice.",
    descriptionAr: "لماذا يخسر المال الساكن قيمته — التضخم والقوة الشرائية والعوائد الحقيقية. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Your Money Is Losing Weight", titleAr: "درهمك يخسر وزنه", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Inflation Fundamentals", titleAr: "أساسيات التضخم",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is inflation?",
            promptAr: "ما هو التضخم؟",
            explanationEn: "Inflation is a sustained increase in the general price level of goods and services over time. As prices rise, each unit of currency buys less than it did before — that is the loss of purchasing power.",
            explanationAr: "التضخم هو ارتفاع مستمر في المستوى العام لأسعار السلع والخدمات بمرور الوقت. مع ارتفاع الأسعار، تشتري كل وحدة نقدية أقل مما كانت تشتريه سابقاً.",
            choices: [
              { textEn: "A decrease in government spending",                        textAr: "انخفاض الإنفاق الحكومي",                        isCorrect: false },
              { textEn: "A sustained rise in the general price level",              textAr: "ارتفاع مستمر في المستوى العام للأسعار",          isCorrect: true  },
              { textEn: "An increase in the money supply only",                     textAr: "زيادة في عرض النقود فقط",                        isCorrect: false },
              { textEn: "A one-time spike in one product's price",                  textAr: "ارتفاع لمرة واحدة في سعر منتج واحد",             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does the Consumer Price Index (CPI) measure?",
            promptAr: "ماذا يقيس مؤشر أسعار المستهلك (CPI)؟",
            explanationEn: "The CPI tracks the average price of a fixed basket of goods and services commonly bought by households — food, housing, transport, healthcare, etc. A rising CPI means that basket is costing more over time.",
            explanationAr: "يتتبع مؤشر أسعار المستهلك متوسط أسعار سلة ثابتة من السلع والخدمات التي تشتريها الأسر — الغذاء والسكن والمواصلات والرعاية الصحية. ارتفاع المؤشر يعني أن هذه السلة أصبحت أغلى.",
            choices: [
              { textEn: "The performance of the stock market index",                textAr: "أداء مؤشر سوق الأسهم",                          isCorrect: false },
              { textEn: "The average price of a fixed basket of household goods",   textAr: "متوسط أسعار سلة ثابتة من السلع الأسرية",         isCorrect: true  },
              { textEn: "The interest rate set by the central bank",                textAr: "سعر الفائدة الذي تحدده البنوك المركزية",         isCorrect: false },
              { textEn: "The rate of economic growth in a country",                 textAr: "معدل النمو الاقتصادي في بلد ما",                 isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "UAE introduced VAT in January 2018. What is the current standard VAT rate?",
            promptAr: "أدخلت الإمارات ضريبة القيمة المضافة في يناير ٢٠١٨. ما معدلها القياسي الحالي؟",
            explanationEn: "The UAE standard VAT rate is 5% — one of the lowest in the world. It applies to most goods and services, with certain items zero-rated or exempt (basic food items, healthcare, education).",
            explanationAr: "معدل ضريبة القيمة المضافة القياسي في الإمارات هو ٥٪ — من أدنى المعدلات في العالم. ينطبق على معظم السلع والخدمات، مع إعفاء أو تصفير بعض البنود (الغذاء الأساسي والرعاية الصحية والتعليم).",
            choices: [
              { textEn: "0%", textAr: "٠٪", isCorrect: false },
              { textEn: "5%", textAr: "٥٪", isCorrect: true  },
              { textEn: "10%", textAr: "١٠٪", isCorrect: false },
              { textEn: "15%", textAr: "١٥٪", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Real vs Nominal Returns", titleAr: "العوائد الحقيقية مقابل الاسمية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A savings account pays 2% p.a. Inflation is 4%. What is your approximate real return?",
            promptAr: "حساب توفير يدفع ٢٪ سنوياً. التضخم ٤٪. ما عائدك الحقيقي التقريبي؟",
            explanationEn: "Real return ≈ nominal rate minus inflation rate. 2% − 4% = −2%. Despite a positive nominal return, your actual purchasing power is shrinking. Your money buys less each year even though the balance number is higher.",
            explanationAr: "العائد الحقيقي ≈ المعدل الاسمي مطروحاً منه معدل التضخم. ٢٪ − ٤٪ = −٢٪. رغم العائد الاسمي الإيجابي، قوتك الشرائية الفعلية تتراجع.",
            choices: [
              { textEn: "6%",  textAr: "٦٪",   isCorrect: false },
              { textEn: "2%",  textAr: "٢٪",   isCorrect: false },
              { textEn: "−2%", textAr: "−٢٪",  isCorrect: true  },
              { textEn: "4%",  textAr: "٤٪",   isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj keeps AED 100,000 in cash under his mattress for 5 years. Inflation averages 3% p.a. What has happened to its purchasing power?",
            promptAr: "راج يحتفظ بـ١٠٠٬٠٠٠ درهم نقداً تحت فراشه لـ٥ سنوات. التضخم يبلغ ٣٪ سنوياً في المتوسط. ماذا حدث لقوته الشرائية؟",
            explanationEn: "At 3% inflation over 5 years, AED 100,000 loses roughly 14% of purchasing power. The cash still says AED 100,000 but buys only what AED ~86,000 bought 5 years ago. Cash stuffed under a mattress earns nothing and inflation slowly erodes it.",
            explanationAr: "عند تضخم ٣٪ لمدة ٥ سنوات، تخسر القيمة الفعلية ما يقارب ١٤٪ من قوتها الشرائية. النقود لا تزال ١٠٠٬٠٠٠ درهم لكنها تشتري ما كانت تشتريه ٨٦٬٠٠٠ درهم قبل ٥ سنوات.",
            choices: [
              { textEn: "It has grown because cash is safe",                      textAr: "ارتفعت لأن النقد آمن",                          isCorrect: false },
              { textEn: "Unchanged — cash always holds its face value",           textAr: "لم تتغير — النقد يحتفظ بقيمته الاسمية دائماً",   isCorrect: false },
              { textEn: "It has fallen by roughly 14%",                          textAr: "انخفضت بنسبة تقريبية ١٤٪",                      isCorrect: true  },
              { textEn: "It has fallen by exactly 15%",                          textAr: "انخفضت بالضبط ١٥٪",                             isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which type of asset has historically provided the best long-term protection against inflation?",
            promptAr: "أي نوع من الأصول وفّر تاريخياً أفضل حماية طويلة الأجل ضد التضخم؟",
            explanationEn: "Equities (ownership stakes in businesses) have historically outpaced inflation over long time horizons because businesses can raise prices and grow revenues. Cash and bonds with fixed rates often fail to keep up. Note: past performance does not guarantee future results — this is educational context only.",
            explanationAr: "الأسهم (حصص ملكية في الشركات) تفوقت تاريخياً على التضخم على مدى زمنية طويلة لأن الشركات تستطيع رفع الأسعار وزيادة العائدات. ملاحظة: الأداء الماضي لا يضمن نتائج مستقبلية.",
            choices: [
              { textEn: "Cash savings accounts",               textAr: "حسابات التوفير النقدية",          isCorrect: false },
              { textEn: "Fixed-rate bonds",                    textAr: "السندات ذات السعر الثابت",         isCorrect: false },
              { textEn: "Equities (ownership in businesses)",  textAr: "الأسهم (ملكية في الشركات)",       isCorrect: true  },
              { textEn: "Physical cash under a mattress",      textAr: "النقد الورقي تحت الفراش",          isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Inflation Impact", titleAr: "أثر التضخم",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal's salary has been AED 20,000/month for 3 years with no raise. Inflation averaged 5% p.a. Has his real income gone up, down, or stayed the same?",
            promptAr: "راتب فيصل ثابت عند ٢٠٬٠٠٠ درهم/شهر لـ٣ سنوات دون زيادة. التضخم ٥٪ سنوياً. هل ارتفع دخله الحقيقي أم انخفض أم بقي كما هو؟",
            explanationEn: "With 5% inflation for 3 years, prices rose by about 15.8% (compounded). His nominal salary is unchanged, so his real (inflation-adjusted) salary has fallen by roughly 14%. He can buy significantly less today than 3 years ago.",
            explanationAr: "مع تضخم ٥٪ لـ٣ سنوات، ارتفعت الأسعار بحوالي ١٥.٨٪ (مركباً). راتبه الاسمي لم يتغير، لذا انخفض دخله الحقيقي بحوالي ١٤٪.",
            choices: [
              { textEn: "Gone up — his salary is the same number",   textAr: "ارتفع — رقم راتبه لم يتغير",     isCorrect: false },
              { textEn: "Stayed the same — no change in salary",     textAr: "بقي كما هو — لا تغيير في الراتب", isCorrect: false },
              { textEn: "Gone down — purchasing power has eroded",   textAr: "انخفض — القوة الشرائية تآكلت",   isCorrect: true  },
              { textEn: "Gone up — stable income beats inflation",   textAr: "ارتفع — الدخل الثابت يتفوق على التضخم", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which UAE expense category has typically shown higher-than-average inflation over the past decade?",
            promptAr: "أي فئة من مصاريف الإمارات أظهرت تاريخياً تضخماً أعلى من المتوسط خلال العقد الماضي؟",
            explanationEn: "Private school fees in the UAE have typically risen faster than general CPI. Rent in popular areas has also seen above-average increases. Understanding where inflation hits hardest in your personal budget matters more than headline CPI.",
            explanationAr: "رسوم المدارس الخاصة في الإمارات ارتفعت في الغالب أسرع من مؤشر أسعار المستهلك العام. كما شهدت إيجارات المناطق الشعبية ارتفاعات فوق المتوسط.",
            choices: [
              { textEn: "Government services",                      textAr: "الخدمات الحكومية",              isCorrect: false },
              { textEn: "Private school fees",                      textAr: "رسوم المدارس الخاصة",           isCorrect: true  },
              { textEn: "Petrol prices (which are subsidised)",     textAr: "أسعار البنزين (المدعومة)",       isCorrect: false },
              { textEn: "Mobile phone plans",                       textAr: "خطط الهاتف المحمول",            isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam deposits AED 50,000 in a 1-year fixed deposit at 4% p.a. Inflation is 2.5%. How much does her balance grow in AED, and is her real return positive or negative?",
            promptAr: "مريم تودع ٥٠٬٠٠٠ درهم في وديعة ثابتة لسنة بعائد ٤٪ سنوياً. التضخم ٢.٥٪. كم ينمو رصيدها بالدرهم، وهل عائدها الحقيقي إيجابي أم سلبي؟",
            explanationEn: "Nominal balance grows by AED 2,000 (4% of 50,000). Real return = 4% − 2.5% = +1.5%, so her real purchasing power does grow slightly. This is one of the few scenarios where a savings rate beats inflation.",
            explanationAr: "الرصيد الاسمي يرتفع بـ٢٬٠٠٠ درهم (٤٪ من ٥٠٬٠٠٠). العائد الحقيقي = ٤٪ − ٢.٥٪ = +١.٥٪، لذا قوتها الشرائية الحقيقية ترتفع قليلاً.",
            choices: [
              { textEn: "Grows AED 1,250; real return negative",  textAr: "ترتفع ١٬٢٥٠ درهم؛ عائد حقيقي سلبي",  isCorrect: false },
              { textEn: "Grows AED 2,000; real return positive",  textAr: "ترتفع ٢٬٠٠٠ درهم؛ عائد حقيقي إيجابي", isCorrect: true  },
              { textEn: "Grows AED 2,000; real return negative",  textAr: "ترتفع ٢٬٠٠٠ درهم؛ عائد حقيقي سلبي",  isCorrect: false },
              { textEn: "Does not grow — fixed deposits are not affected by inflation", textAr: "لا ترتفع — الودائع الثابتة لا تتأثر بالتضخم", isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the 'Rule of 72' used for in personal finance?",
            promptAr: "لماذا تُستخدم 'قاعدة ٧٢' في المالية الشخصية؟",
            explanationEn: "The Rule of 72 estimates how long it takes to double money (or halve purchasing power). Divide 72 by the growth rate. At 3% inflation, purchasing power halves in roughly 24 years (72 ÷ 3). At 4% returns, money doubles in ~18 years.",
            explanationAr: "قاعدة ٧٢ تُقدّر المدة اللازمة لمضاعفة المال (أو تنصيف القوة الشرائية). اقسم ٧٢ على معدل النمو. بتضخم ٣٪، تنتصف القوة الشرائية في ~٢٤ سنة.",
            choices: [
              { textEn: "To calculate monthly compound interest exactly",          textAr: "لحساب الفائدة المركبة الشهرية بدقة",                isCorrect: false },
              { textEn: "To estimate how long money takes to double (or halve)",   textAr: "لتقدير المدة اللازمة لمضاعفة المال (أو تنصيفه)",    isCorrect: true  },
              { textEn: "To measure your savings rate as a percentage",            textAr: "لقياس معدل ادخارك كنسبة مئوية",                    isCorrect: false },
              { textEn: "To determine the optimal retirement age",                 textAr: "لتحديد سن التقاعد الأمثل",                         isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 5  LOAN LIGHTHOUSE — Loans
  // ══════════════════════════════════════════════════════════════════
  {
    id: "loan-lighthouse", slug: "loan-lighthouse", orderIndex: 5,
    nameEn: "Loan Lighthouse", nameAr: "منارة القروض",
    themeKey: "lighthouse",
    descriptionEn: "How loans work — APR, flat vs reducing rates, DBR cap, and avoiding the debt trap. Educational only, not financial advice.",
    descriptionAr: "كيف تعمل القروض — معدل الفائدة السنوي والسعر الثابت مقابل المتناقص وسقف نسبة التحمل. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "When Borrowing Makes Sense", titleAr: "متى يكون الاقتراض منطقياً", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "How Loans Work", titleAr: "كيف تعمل القروض",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What does APR (Annual Percentage Rate) represent on a loan?",
            promptAr: "ماذا يمثل معدل الفائدة السنوي (APR) على القرض؟",
            explanationEn: "APR is the total annual cost of a loan expressed as a percentage, including interest and mandatory fees. It is the single most comparable figure between loan products — always use APR, not the advertised monthly rate, to compare true cost.",
            explanationAr: "معدل الفائدة السنوي هو التكلفة السنوية الإجمالية للقرض معبراً عنها كنسبة مئوية، وتشمل الفائدة والرسوم الإلزامية. إنه الرقم الوحيد القابل للمقارنة بين منتجات القروض.",
            choices: [
              { textEn: "The monthly interest rate multiplied by 12",                    textAr: "سعر الفائدة الشهري مضروباً في ١٢",                     isCorrect: false },
              { textEn: "The total annual cost of the loan including fees",              textAr: "التكلفة السنوية الإجمالية للقرض شاملةً الرسوم",         isCorrect: true  },
              { textEn: "The amount of principal repaid annually",                       textAr: "مبلغ الأصل المسدّد سنوياً",                             isCorrect: false },
              { textEn: "The bank's profit margin on the loan",                         textAr: "هامش ربح البنك على القرض",                              isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is the key difference between a flat rate and a reducing balance rate on a personal loan?",
            promptAr: "ما الفرق الرئيسي بين سعر الفائدة الثابت والمتناقص على القرض الشخصي؟",
            explanationEn: "A flat rate charges interest on the original loan amount for the full tenure, even as you repay. A reducing balance rate charges interest only on the outstanding balance, so cost falls as you repay. A 5% flat rate costs approximately the same as a 9–10% reducing rate.",
            explanationAr: "السعر الثابت يُحمَّل الفائدة على المبلغ الأصلي طوال المدة حتى مع سداد الأقساط. أما سعر الرصيد المتناقص فيُحمَّل الفائدة على الرصيد المتبقي فقط. سعر ثابت ٥٪ يعادل تقريباً سعر متناقص ٩-١٠٪.",
            choices: [
              { textEn: "Flat rate is always cheaper than reducing rate",              textAr: "السعر الثابت دائماً أرخص من المتناقص",                    isCorrect: false },
              { textEn: "Reducing rate charges interest only on outstanding balance",  textAr: "السعر المتناقص يُحمَّل الفائدة على الرصيد المتبقي فقط",   isCorrect: true  },
              { textEn: "Both rates produce identical total interest costs",           textAr: "كلا السعرين ينتجان تكاليف فائدة إجمالية متطابقة",         isCorrect: false },
              { textEn: "Flat rates are illegal in the UAE",                          textAr: "أسعار الفائدة الثابتة غير قانونية في الإمارات",           isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Raj takes a AED 50,000 personal loan at 6% flat p.a. for 4 years. What is the approximate total interest paid?",
            promptAr: "راج يأخذ قرضاً شخصياً بـ٥٠٬٠٠٠ درهم بسعر ثابت ٦٪ سنوياً لمدة ٤ سنوات. ما إجمالي الفائدة التقريبية المدفوعة؟",
            explanationEn: "Flat rate: 6% × AED 50,000 × 4 years = AED 12,000 total interest. Monthly payment = (AED 50,000 + AED 12,000) ÷ 48 = AED 1,291.67. The effective APR on a reducing balance basis is roughly double the flat rate.",
            explanationAr: "السعر الثابت: ٦٪ × ٥٠٬٠٠٠ × ٤ سنوات = ١٢٬٠٠٠ درهم فائدة إجمالية. القسط الشهري = (٥٠٬٠٠٠ + ١٢٬٠٠٠) ÷ ٤٨ = ١٬٢٩١.٦٧ درهم.",
            choices: [
              { textEn: "AED 3,000",  textAr: "٣٬٠٠٠ درهم",  isCorrect: false },
              { textEn: "AED 6,000",  textAr: "٦٬٠٠٠ درهم",  isCorrect: false },
              { textEn: "AED 12,000", textAr: "١٢٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 24,000", textAr: "٢٤٬٠٠٠ درهم", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "DBR & Eligibility", titleAr: "نسبة التحمل الديني والأهلية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is the Debt Burden Ratio (DBR) in the UAE?",
            promptAr: "ما هي نسبة عبء الدين (DBR) في الإمارات؟",
            explanationEn: "The DBR is the percentage of your gross monthly salary consumed by all loan and credit card minimum repayments. The Central Bank of UAE caps it at 50% for most borrowers — meaning total monthly debt payments cannot exceed half your gross income.",
            explanationAr: "نسبة عبء الدين هي النسبة المئوية من راتبك الإجمالي الشهري التي تستهلكها أقساط القروض والحد الأدنى لبطاقات الائتمان. يُحددها المصرف المركزي بـ٥٠٪ — أي لا يجوز أن تتجاوز مدفوعات الدين الشهرية نصف دخلك الإجمالي.",
            choices: [
              { textEn: "Your credit score from the AECB",                    textAr: "درجة الائتمان من مكتب الاتحاد",                      isCorrect: false },
              { textEn: "Total monthly debt payments as % of gross salary",   textAr: "إجمالي مدفوعات الدين الشهرية كنسبة من الراتب الإجمالي", isCorrect: true  },
              { textEn: "The loan-to-value ratio on a mortgage",              textAr: "نسبة القرض إلى القيمة على الرهن العقاري",             isCorrect: false },
              { textEn: "The annual interest rate divided by 12",             textAr: "سعر الفائدة السنوي مقسوماً على ١٢",                  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Mariam earns AED 18,000/month gross. She already pays AED 5,000/month on a car loan. What is the maximum additional monthly instalment the bank can legally approve?",
            promptAr: "مريم تكسب ١٨٬٠٠٠ درهم/شهر إجمالي. تدفع بالفعل ٥٬٠٠٠ درهم/شهر على قرض سيارة. ما أقصى قسط شهري إضافي يمكن للبنك قانونياً الموافقة عليه؟",
            explanationEn: "DBR cap = 50% of gross salary = AED 9,000. Existing debt: AED 5,000. Available capacity: AED 9,000 − AED 5,000 = AED 4,000/month. Any additional loan instalment cannot exceed AED 4,000.",
            explanationAr: "حد DBR = ٥٠٪ من الراتب الإجمالي = ٩٬٠٠٠ درهم. الدين الحالي: ٥٬٠٠٠ درهم. الطاقة المتاحة: ٩٬٠٠٠ − ٥٬٠٠٠ = ٤٬٠٠٠ درهم/شهر.",
            choices: [
              { textEn: "AED 9,000", textAr: "٩٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 6,000", textAr: "٦٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 4,000", textAr: "٤٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 2,500", textAr: "٢٬٥٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is the maximum personal loan amount a UAE bank can typically approve for an expat employee?",
            promptAr: "ما أقصى مبلغ قرض شخصي يمكن للبنك الإماراتي الموافقة عليه عادةً لموظف مغترب؟",
            explanationEn: "The Central Bank of UAE caps personal loans for expat employees at 20 times the monthly salary. So a person earning AED 10,000/month can borrow up to AED 200,000 personal loan (subject also to DBR and credit checks).",
            explanationAr: "يحدد المصرف المركزي القروض الشخصية للموظفين المغتربين بـ٢٠ ضعف الراتب الشهري. لذا يمكن لمن يكسب ١٠٬٠٠٠ درهم/شهر الاقتراض حتى ٢٠٠٬٠٠٠ درهم.",
            choices: [
              { textEn: "10× monthly salary",  textAr: "١٠ أضعاف الراتب الشهري",  isCorrect: false },
              { textEn: "20× monthly salary",  textAr: "٢٠ ضعف الراتب الشهري",    isCorrect: true  },
              { textEn: "30× monthly salary",  textAr: "٣٠ ضعف الراتب الشهري",    isCorrect: false },
              { textEn: "No cap — based purely on DBR", textAr: "لا حد — يعتمد فقط على DBR", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Loan Trap Detector", titleAr: "كاشف فخ القروض",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Faisal earns AED 12,000/month and has existing loan payments of AED 4,800/month. A lender offers him a new loan with AED 2,500/month instalment. Is the total loan load within the UAE DBR limit?",
            promptAr: "فيصل يكسب ١٢٬٠٠٠ درهم/شهر ولديه أقساط قروض قائمة ٤٬٨٠٠ درهم/شهر. يعرض عليه مُقرض قرضاً جديداً بقسط ٢٬٥٠٠ درهم/شهر. هل إجمالي عبء القروض ضمن حد DBR الإماراتي؟",
            explanationEn: "DBR limit = 50% of AED 12,000 = AED 6,000. New total = AED 4,800 + AED 2,500 = AED 7,300. AED 7,300 > AED 6,000 → this exceeds the DBR cap. A regulated UAE bank cannot approve this loan.",
            explanationAr: "حد DBR = ٥٠٪ من ١٢٬٠٠٠ = ٦٬٠٠٠ درهم. الإجمالي الجديد = ٤٬٨٠٠ + ٢٬٥٠٠ = ٧٬٣٠٠ درهم. ٧٬٣٠٠ > ٦٬٠٠٠ → يتجاوز حد DBR. لا يمكن لبنك إماراتي منظّم الموافقة على هذا القرض.",
            choices: [
              { textEn: "Yes — AED 7,300 is within the limit",    textAr: "نعم — ٧٬٣٠٠ درهم ضمن الحد",              isCorrect: false },
              { textEn: "No — it exceeds the 50% DBR cap",        textAr: "لا — يتجاوز حد ٥٠٪ لـ DBR",            isCorrect: true  },
              { textEn: "Yes — the DBR cap is 60% not 50%",       textAr: "نعم — حد DBR هو ٦٠٪ وليس ٥٠٪",         isCorrect: false },
              { textEn: "Cannot be determined without knowing the loan tenure", textAr: "لا يمكن التحديد دون معرفة مدة القرض", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Raj has a AED 60,000 personal loan with AED 42,000 remaining. He wants to settle it early. What is the maximum settlement fee the bank can charge under CBUAE rules?",
            promptAr: "راج لديه قرض شخصي ٦٠٬٠٠٠ درهم، تبقى منه ٤٢٬٠٠٠ درهم. يريد تسويته مبكراً. ما أقصى رسوم تسوية يمكن للبنك تحصيلها بموجب قواعد المصرف المركزي؟",
            explanationEn: "CBUAE caps early settlement fees at 1% of the outstanding principal, with an overall maximum of AED 10,000. 1% × AED 42,000 = AED 420. Maximum fee is AED 420.",
            explanationAr: "يحدد المصرف المركزي رسوم التسوية المبكرة بـ١٪ من الأصل القائم بحد أقصى ١٠٬٠٠٠ درهم. ١٪ × ٤٢٬٠٠٠ = ٤٢٠ درهم.",
            choices: [
              { textEn: "AED 420",   textAr: "٤٢٠ درهم",    isCorrect: true  },
              { textEn: "AED 1,260", textAr: "١٬٢٦٠ درهم",  isCorrect: false },
              { textEn: "AED 4,200", textAr: "٤٬٢٠٠ درهم",  isCorrect: false },
              { textEn: "Zero — early repayment is always free in UAE", textAr: "صفر — السداد المبكر مجاني دائماً في الإمارات", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "A 'Buy Now Pay Later' (BNPL) service charges 0% for 3 months, then 3% per month on the remaining balance. What is the approximate annualised rate if you carry a balance beyond month 3?",
            promptAr: "خدمة 'اشتر الآن وادفع لاحقاً' (BNPL) تُحمَّل ٠٪ لـ٣ أشهر ثم ٣٪ شهرياً على الرصيد المتبقي. ما المعدل السنوي التقريبي إذا حملت رصيداً بعد الشهر الثالث؟",
            explanationEn: "3% monthly ≈ 36% p.a. (simple) or ~42.6% p.a. compounded. This is comparable to credit card rates. BNPL can be cost-effective if settled within the 0% window, but becomes very expensive beyond it.",
            explanationAr: "٣٪ شهرياً ≈ ٣٦٪ سنوياً (بسيطة) أو ~٤٢.٦٪ سنوياً مركبة. هذا مماثل لأسعار بطاقات الائتمان. BNPL فعّال من حيث التكلفة إذا سُدّد خلال فترة الـ٠٪.",
            choices: [
              { textEn: "Approximately 12% p.a.",  textAr: "حوالي ١٢٪ سنوياً",  isCorrect: false },
              { textEn: "Approximately 18% p.a.",  textAr: "حوالي ١٨٪ سنوياً",  isCorrect: false },
              { textEn: "Approximately 36% p.a.",  textAr: "حوالي ٣٦٪ سنوياً",  isCorrect: true  },
              { textEn: "Approximately 6% p.a.",   textAr: "حوالي ٦٪ سنوياً",   isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Which is typically the most expensive form of short-term borrowing available in the UAE?",
            promptAr: "أي من التالي عادةً أغلى أشكال الاقتراض قصير الأجل المتاحة في الإمارات؟",
            explanationEn: "Credit card cash advances are typically the most expensive — they attract both a cash advance fee (2–3% of the amount) AND the highest interest rate, often with no grace period. Personal loans through regulated banks are far cheaper.",
            explanationAr: "سلف النقود من بطاقة الائتمان عادةً هي الأغلى — تجذب رسوم سلفة نقدية (٢-٣٪) وأعلى سعر فائدة، غالباً بدون فترة سماح.",
            choices: [
              { textEn: "Salary advance from your employer",         textAr: "سلفة الراتب من صاحب العمل",             isCorrect: false },
              { textEn: "Credit card cash advance",                  textAr: "سلفة النقود من بطاقة الائتمان",          isCorrect: true  },
              { textEn: "Secured personal loan from a bank",         textAr: "قرض شخصي مضمون من بنك",                 isCorrect: false },
              { textEn: "Overdraft facility on a current account",   textAr: "تسهيل السحب على المكشوف في الحساب الجاري", isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 6  CARD CANYON — Credit cards & AECB
  // ══════════════════════════════════════════════════════════════════
  {
    id: "card-canyon", slug: "card-canyon", orderIndex: 6,
    nameEn: "Card Canyon", nameAr: "كانيون البطاقات",
    themeKey: "canyon",
    descriptionEn: "Credit cards, the AECB score, and managing DBR in practice. Educational only, not financial advice.",
    descriptionAr: "بطاقات الائتمان ودرجة مكتب الاتحاد (AECB) وإدارة نسبة التحمل في الواقع. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "The Plastic Trap", titleAr: "فخ البلاستيك", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "How Credit Cards Work", titleAr: "كيف تعمل بطاقات الائتمان",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is a credit card 'grace period'?",
            promptAr: "ما هي 'فترة السماح' في بطاقة الائتمان؟",
            explanationEn: "The grace period is the time between your statement date and your due date — usually 20–25 days — during which you can pay the full balance with no interest charged. If you pay in full every cycle, you effectively use the bank's money for free.",
            explanationAr: "فترة السماح هي الوقت بين تاريخ كشف الحساب وتاريخ الاستحقاق — عادةً ٢٠-٢٥ يوماً — يمكنك خلالها سداد الرصيد الكامل دون فوائد.",
            choices: [
              { textEn: "The time the bank gives you to dispute a charge",           textAr: "الوقت الذي يمنحك البنك للطعن في رسوم",              isCorrect: false },
              { textEn: "The interest-free period between statement and due date",   textAr: "فترة السماح بدون فائدة بين كشف الحساب وتاريخ الاستحقاق", isCorrect: true  },
              { textEn: "The time to activate a new card",                          textAr: "الوقت اللازم لتفعيل بطاقة جديدة",                    isCorrect: false },
              { textEn: "The period before your credit limit is reduced",           textAr: "الفترة قبل تخفيض حد الائتمان",                       isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Aisha has a AED 10,000 credit card balance and pays only the AED 250 minimum each month. Approximately how long will it take to clear the balance at 3% monthly interest?",
            promptAr: "عائشة لديها رصيد بطاقة ائتمان ١٠٬٠٠٠ درهم وتدفع الحد الأدنى ٢٥٠ درهم فقط شهرياً. كم يستغرق تقريباً لتسوية الرصيد بفائدة ٣٪ شهرياً؟",
            explanationEn: "When monthly interest (3% × AED 10,000 = AED 300) exceeds the minimum payment (AED 250), the balance actually grows each month. She can never clear the debt this way — the minimum payment trap. She must pay significantly more than the minimum.",
            explanationAr: "عندما تتجاوز الفائدة الشهرية (٣٪ × ١٠٬٠٠٠ = ٣٠٠ درهم) الحد الأدنى للسداد (٢٥٠ درهم)، يرتفع الرصيد في الواقع كل شهر. لن تستطيع تسوية الدين أبداً بهذه الطريقة — فخ الحد الأدنى.",
            choices: [
              { textEn: "About 5 years",                        textAr: "حوالي ٥ سنوات",                         isCorrect: false },
              { textEn: "About 10 years",                       textAr: "حوالي ١٠ سنوات",                        isCorrect: false },
              { textEn: "Never — the balance grows each month", textAr: "أبداً — الرصيد يرتفع كل شهر",           isCorrect: true  },
              { textEn: "About 3 years",                        textAr: "حوالي ٣ سنوات",                         isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What fee do most UAE banks charge for a credit card cash advance, on top of interest?",
            promptAr: "ما الرسوم التي تُحمَّلها معظم البنوك الإماراتية على سلفة النقود من بطاقة الائتمان، فضلاً عن الفائدة؟",
            explanationEn: "Credit card cash advance fees in UAE typically range from 2% to 3% of the amount withdrawn (subject to a minimum fee). Additionally, interest is charged from day one with no grace period. This makes cash advances one of the most expensive ways to borrow.",
            explanationAr: "رسوم سلفة النقود من بطاقة الائتمان في الإمارات عادةً من ٢٪ إلى ٣٪ من المبلغ المسحوب (مع رسوم دنيا). كما تُحمَّل فائدة من اليوم الأول دون فترة سماح.",
            choices: [
              { textEn: "No fee — only interest applies",         textAr: "لا رسوم — الفائدة فقط",                isCorrect: false },
              { textEn: "A flat AED 1,000 fee per advance",       textAr: "رسوم ثابتة ١٬٠٠٠ درهم لكل سلفة",     isCorrect: false },
              { textEn: "2–3% of the amount withdrawn",           textAr: "٢–٣٪ من المبلغ المسحوب",               isCorrect: true  },
              { textEn: "5% p.a. charged annually",               textAr: "٥٪ سنوياً تُحمَّل سنوياً",            isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "AECB Score Basics", titleAr: "أساسيات درجة مكتب الاتحاد (AECB)",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What score range does the AECB (Al Etihad Credit Bureau) use in the UAE?",
            promptAr: "ما نطاق الدرجات الذي يستخدمه مكتب الاتحاد للمعلومات الائتمانية (AECB) في الإمارات؟",
            explanationEn: "The AECB score ranges from 300 to 900. A higher score indicates lower credit risk. Lenders use it to assess likelihood of repayment. Scores above 700 are generally considered good.",
            explanationAr: "درجة AECB تتراوح من ٣٠٠ إلى ٩٠٠. الدرجة الأعلى تشير إلى مخاطر ائتمانية أقل. الدرجات فوق ٧٠٠ تُعتبر جيدة عموماً.",
            choices: [
              { textEn: "0 to 100",   textAr: "من ٠ إلى ١٠٠",   isCorrect: false },
              { textEn: "300 to 900", textAr: "من ٣٠٠ إلى ٩٠٠", isCorrect: true  },
              { textEn: "1 to 10",    textAr: "من ١ إلى ١٠",     isCorrect: false },
              { textEn: "500 to 850", textAr: "من ٥٠٠ إلى ٨٥٠", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "How long does a missed payment typically remain on your AECB credit report?",
            promptAr: "كم يبقى التخلف عن السداد عادةً في تقرير AECB الائتماني الخاص بك؟",
            explanationEn: "Negative credit events — including missed payments, defaults, and bounced cheques — remain on UAE credit reports for up to 5 years. This can significantly impact loan eligibility and interest rates you are offered during that period.",
            explanationAr: "الأحداث الائتمانية السلبية — بما في ذلك التخلف عن السداد والإخلال بالتزامات القرض والشيكات المرتجعة — تبقى في تقارير الائتمان الإماراتية لمدة تصل إلى ٥ سنوات.",
            choices: [
              { textEn: "6 months",  textAr: "٦ أشهر",   isCorrect: false },
              { textEn: "2 years",   textAr: "سنتان",    isCorrect: false },
              { textEn: "Up to 5 years", textAr: "حتى ٥ سنوات", isCorrect: true  },
              { textEn: "Permanently until cleared by the bank", textAr: "بشكل دائم حتى تُزيله البنك", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which action is MOST likely to improve your AECB credit score over time?",
            promptAr: "أي إجراء يُرجَّح أنه سيُحسّن درجة AECB الائتمانية لديك بمرور الوقت؟",
            explanationEn: "Paying all bills and loan instalments on time, consistently, is the single biggest factor in building a strong credit score. Applying for multiple products at once signals financial stress. Closing old accounts reduces your credit history length.",
            explanationAr: "دفع جميع الفواتير والأقساط في موعدها باستمرار هو العامل الأكبر في بناء درجة ائتمانية قوية.",
            choices: [
              { textEn: "Applying for several credit products at once",              textAr: "التقدم لعدة منتجات ائتمانية دفعةً واحدة",            isCorrect: false },
              { textEn: "Paying all bills and instalments on time every month",      textAr: "دفع جميع الفواتير والأقساط في موعدها كل شهر",         isCorrect: true  },
              { textEn: "Closing all old accounts to simplify your profile",         textAr: "إغلاق جميع الحسابات القديمة لتبسيط ملفك",            isCorrect: false },
              { textEn: "Keeping a high credit card balance to show active usage",   textAr: "الإبقاء على رصيد بطاقة ائتمان مرتفع للإظهار بالاستخدام الفعّال", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Credit Health Check", titleAr: "فحص صحة الائتمان",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Raj earns AED 25,000/month gross. He has two credit cards with combined minimum payments of AED 1,500/month and a car loan of AED 3,200/month. How much additional monthly loan capacity does he have?",
            promptAr: "راج يكسب ٢٥٬٠٠٠ درهم/شهر إجمالي. لديه بطاقتا ائتمان بحد أدنى إجمالي ١٬٥٠٠ درهم/شهر وقرض سيارة ٣٬٢٠٠ درهم/شهر. ما الطاقة الإضافية لديه؟",
            explanationEn: "DBR cap = 50% × AED 25,000 = AED 12,500. Existing payments: AED 1,500 + AED 3,200 = AED 4,700. Available capacity: AED 12,500 − AED 4,700 = AED 7,800/month.",
            explanationAr: "حد DBR = ٥٠٪ × ٢٥٬٠٠٠ = ١٢٬٥٠٠ درهم. المدفوعات الحالية: ١٬٥٠٠ + ٣٬٢٠٠ = ٤٬٧٠٠ درهم. الطاقة المتاحة: ١٢٬٥٠٠ − ٤٬٧٠٠ = ٧٬٨٠٠ درهم/شهر.",
            choices: [
              { textEn: "AED 12,500", textAr: "١٢٬٥٠٠ درهم", isCorrect: false },
              { textEn: "AED 8,800",  textAr: "٨٬٨٠٠ درهم",  isCorrect: false },
              { textEn: "AED 7,800",  textAr: "٧٬٨٠٠ درهم",  isCorrect: true  },
              { textEn: "AED 9,300",  textAr: "٩٬٣٠٠ درهم",  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Mariam has three credit cards she rarely uses but keeps open. How does this affect her creditworthiness?",
            promptAr: "مريم لديها ثلاث بطاقات ائتمان نادراً ما تستخدمها لكنها تبقيها مفتوحة. كيف يؤثر ذلك على جدارتها الائتمانية؟",
            explanationEn: "Open credit cards with low utilisation can be positive — they show available credit and established history. However, their combined credit limits count toward what lenders see as your total exposure, which can affect new borrowing decisions even if the balances are zero.",
            explanationAr: "بطاقات الائتمان المفتوحة ذات الاستخدام المنخفض يمكن أن تكون إيجابية — فهي تُظهر الائتمان المتاح والتاريخ الراسخ. لكن حدودها مجتمعةً تُحسب ضمن التعرض الكلي الذي يراه المقرضون.",
            choices: [
              { textEn: "It always damages the credit score severely",                 textAr: "يُضر دائماً بالدرجة الائتمانية بشدة",                   isCorrect: false },
              { textEn: "Low utilisation is positive; combined limits count as exposure", textAr: "الاستخدام المنخفض إيجابي؛ الحدود المجمعة تُحسب تعرضاً",  isCorrect: true  },
              { textEn: "Unused cards are automatically closed after 6 months",       textAr: "البطاقات غير المستخدمة تُغلق تلقائياً بعد ٦ أشهر",        isCorrect: false },
              { textEn: "Having more cards always improves your credit score",        textAr: "امتلاك بطاقات أكثر يُحسّن درجتك الائتمانية دائماً",      isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Faisal misses a credit card payment. What is the correct sequence of consequences?",
            promptAr: "فيصل يفوّت سداد بطاقة ائتمان. ما تسلسل العواقب الصحيح؟",
            explanationEn: "Immediately: a late payment fee is charged. Within 30 days: it may not be reported yet. After 30 days overdue: reported to AECB, hurting credit score. If persistent: account referred to collections, legal action possible. Bounced automated payment also risks a legal case in UAE.",
            explanationAr: "فوراً: تُفرض رسوم تأخير. خلال ٣٠ يوماً: قد لا تُبلَّغ بعد. بعد ٣٠ يوماً متأخرة: تُبلَّغ لـ AECB وتضر الدرجة الائتمانية. إذا استمرت: الحساب يُحال للتحصيل، وقد يُتخذ إجراء قانوني.",
            choices: [
              { textEn: "Late fee → no other consequences",                               textAr: "رسوم تأخير → لا عواقب أخرى",                            isCorrect: false },
              { textEn: "Late fee → AECB report after 30 days → possible legal action",   textAr: "رسوم تأخير → تبليغ AECB بعد ٣٠ يوماً → إجراء قانوني محتمل", isCorrect: true  },
              { textEn: "Immediate credit score drop → card cancellation",                textAr: "انخفاض فوري في الدرجة → إلغاء البطاقة",                 isCorrect: false },
              { textEn: "No consequence if paid within the same month",                   textAr: "لا عواقب إذا سُدّد في نفس الشهر",                       isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "You can obtain a free copy of your AECB credit report in the UAE. How often can you request it for free?",
            promptAr: "يمكنك الحصول على نسخة مجانية من تقرير AECB الائتماني. كم مرة يمكنك طلبه مجاناً؟",
            explanationEn: "The AECB allows one free credit report per year. Additional reports in the same year are charged. Regularly checking your report helps you spot errors, fraud, or accounts you don't recognise — all of which can be disputed.",
            explanationAr: "يتيح AECB تقريراً ائتمانياً مجانياً واحداً سنوياً. التقارير الإضافية في العام نفسه تُفرض عليها رسوم. المراجعة المنتظمة تساعد في اكتشاف الأخطاء أو الاحتيال.",
            choices: [
              { textEn: "Once per month",    textAr: "مرة في الشهر",          isCorrect: false },
              { textEn: "Once per year",     textAr: "مرة في السنة",          isCorrect: true  },
              { textEn: "Never — it is always paid", textAr: "أبداً — مدفوع دائماً", isCorrect: false },
              { textEn: "Unlimited times",   textAr: "عدد غير محدود من المرات", isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 7  OASIS OF INSURANCE — Insurance basics
  // ══════════════════════════════════════════════════════════════════
  {
    id: "oasis-of-insurance", slug: "oasis-of-insurance", orderIndex: 7,
    nameEn: "Oasis of Insurance", nameAr: "واحة التأمين",
    themeKey: "oasis",
    descriptionEn: "What insurance actually is, what the UAE mandates, and how to read a policy. Educational only, not financial advice.",
    descriptionAr: "ما هو التأمين حقاً، وما الذي تُلزم به الإمارات، وكيف تقرأ وثيقة التأمين. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Risk and the Cost of Ignoring It", titleAr: "المخاطر وتكلفة تجاهلها", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Insurance Types", titleAr: "أنواع التأمين",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is the fundamental purpose of insurance?",
            promptAr: "ما الغرض الأساسي من التأمين؟",
            explanationEn: "Insurance transfers financial risk from an individual to a large pool of people (the insurer). You pay a regular premium; in return, the insurer covers specific losses if they occur. It converts unpredictable large losses into predictable small costs.",
            explanationAr: "التأمين ينقل المخاطر المالية من الفرد إلى مجموعة كبيرة من الناس (المؤمِّن). تدفع قسطاً منتظماً؛ في المقابل يغطي المؤمِّن خسائر محددة إذا وقعت.",
            choices: [
              { textEn: "To generate investment returns on your premium",       textAr: "لتوليد عوائد استثمارية على قسطك",              isCorrect: false },
              { textEn: "To transfer financial risk to a large risk pool",      textAr: "لنقل المخاطر المالية إلى مجموعة مخاطر كبيرة",  isCorrect: true  },
              { textEn: "To force you to save money regularly",                textAr: "لإجبارك على الادخار بانتظام",                   isCorrect: false },
              { textEn: "To replace your income when you take a holiday",      textAr: "لاستبدال دخلك أثناء إجازتك",                   isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is an insurance deductible?",
            promptAr: "ما هو التحمّل (deductible) في التأمين؟",
            explanationEn: "The deductible is the amount you pay out-of-pocket before the insurance kicks in. If your car has AED 5,000 of damage and your deductible is AED 1,000, you pay AED 1,000 and the insurer pays AED 4,000. Higher deductibles typically mean lower premiums.",
            explanationAr: "التحمّل هو المبلغ الذي تدفعه من جيبك قبل أن يتدخل التأمين. إذا كانت أضرار سيارتك ٥٬٠٠٠ درهم والتحمّل ١٬٠٠٠ درهم، تدفع ١٬٠٠٠ درهم ويدفع المؤمِّن ٤٬٠٠٠ درهم.",
            choices: [
              { textEn: "The maximum amount the insurer will ever pay",          textAr: "الحد الأقصى الذي سيدفعه المؤمِّن على الإطلاق",    isCorrect: false },
              { textEn: "The amount you pay before insurance coverage starts",   textAr: "المبلغ الذي تدفعه قبل بدء تغطية التأمين",         isCorrect: true  },
              { textEn: "Your monthly premium cost",                            textAr: "تكلفة قسطك الشهري",                              isCorrect: false },
              { textEn: "A penalty for making too many claims",                 textAr: "عقوبة على تقديم مطالبات كثيرة جداً",             isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is 'term life insurance'?",
            promptAr: "ما هو 'التأمين على الحياة لأجل محدد'؟",
            explanationEn: "Term life insurance provides a death benefit for a specified period (e.g., 20 years). If you die during the term, your beneficiaries receive the sum insured. If you survive the term, there is no payout. It is the simplest and most affordable form of life cover.",
            explanationAr: "التأمين على الحياة لأجل محدد يوفر مبلغ وفاة لفترة زمنية محددة (مثلاً ٢٠ سنة). إذا توفيت خلال المدة، يتلقى المستفيدون المبلغ المؤمَّن عليه.",
            choices: [
              { textEn: "Insurance that covers you for your entire lifetime",           textAr: "تأمين يغطيك طوال حياتك",                             isCorrect: false },
              { textEn: "Insurance with a death benefit for a fixed time period",       textAr: "تأمين بمبلغ وفاة لفترة زمنية محددة",                 isCorrect: true  },
              { textEn: "Insurance that pays out if you are made redundant",           textAr: "تأمين يُصرف إذا فُقدت وظيفتك",                       isCorrect: false },
              { textEn: "A savings plan that matures when you retire",                 textAr: "خطة ادخار تستحق عند تقاعدك",                         isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "UAE Mandatory Cover", titleAr: "التغطية الإلزامية في الإمارات",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Health insurance is mandatory in Dubai and Abu Dhabi. Who is responsible for providing it to employees?",
            promptAr: "التأمين الصحي إلزامي في دبي وأبوظبي. من المسؤول عن توفيره للموظفين؟",
            explanationEn: "In both Dubai and Abu Dhabi, employers are legally required to provide health insurance to their employees. In Abu Dhabi, this extends to cover dependants as well. Freelancers and business owners are responsible for covering themselves.",
            explanationAr: "في دبي وأبوظبي، يُلزَم أصحاب العمل قانونياً بتوفير التأمين الصحي لموظفيهم. في أبوظبي، يمتد هذا ليشمل المعالين أيضاً.",
            choices: [
              { textEn: "The employee must purchase it independently",         textAr: "يجب على الموظف شراؤه بشكل مستقل",              isCorrect: false },
              { textEn: "The employer is legally required to provide it",      textAr: "صاحب العمل ملزم قانونياً بتوفيره",              isCorrect: true  },
              { textEn: "The UAE government provides it free for all residents", textAr: "الحكومة الإماراتية توفره مجاناً لجميع المقيمين", isCorrect: false },
              { textEn: "Health insurance is optional in both emirates",       textAr: "التأمين الصحي اختياري في كلا الإمارتين",         isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is the minimum mandatory level of car insurance required to legally drive in the UAE?",
            promptAr: "ما الحد الأدنى الإلزامي من تأمين السيارة المطلوب قانونياً للقيادة في الإمارات؟",
            explanationEn: "Third-party liability insurance is the minimum legal requirement in UAE. It covers damage or injury you cause to others. Comprehensive insurance additionally covers your own vehicle. Driving without at least third-party cover is illegal.",
            explanationAr: "التأمين ضد الغير هو الحد الأدنى القانوني في الإمارات. يغطي الأضرار أو الإصابات التي تتسبب فيها للآخرين. القيادة دون تأمين ضد الغير على الأقل غير قانونية.",
            choices: [
              { textEn: "Comprehensive cover for your own vehicle",                textAr: "تغطية شاملة لسيارتك",                        isCorrect: false },
              { textEn: "Third-party liability cover",                            textAr: "تأمين المسؤولية تجاه الغير",                  isCorrect: true  },
              { textEn: "Third-party plus fire and theft",                        textAr: "ضد الغير إضافةً للحريق والسرقة",              isCorrect: false },
              { textEn: "No insurance is required for vehicles owned outright",   textAr: "لا تأمين مطلوب للسيارات المملوكة بالكامل",   isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Who regulates the insurance industry in the UAE?",
            promptAr: "من ينظّم صناعة التأمين في الإمارات؟",
            explanationEn: "The Central Bank of UAE (CBUAE) is the unified financial regulator and also oversees insurance since 2023, following the merger of the former Insurance Authority into the Central Bank. It licenses insurers and protects policyholder rights.",
            explanationAr: "المصرف المركزي الإماراتي (CBUAE) هو الجهة التنظيمية المالية الموحدة ويُشرف أيضاً على التأمين منذ عام ٢٠٢٣، إثر دمج هيئة التأمين السابقة فيه.",
            choices: [
              { textEn: "Dubai Financial Services Authority (DFSA)",    textAr: "هيئة دبي للخدمات المالية (DFSA)",              isCorrect: false },
              { textEn: "Central Bank of UAE (CBUAE)",                  textAr: "المصرف المركزي الإماراتي (CBUAE)",              isCorrect: true  },
              { textEn: "Securities and Commodities Authority (SCA)",   textAr: "هيئة الأوراق المالية والسلع (SCA)",             isCorrect: false },
              { textEn: "Ministry of Economy",                          textAr: "وزارة الاقتصاد",                               isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Coverage Gap Analysis", titleAr: "تحليل فجوة التغطية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Aisha's health insurance has a AED 2,000 deductible and 20% co-pay on claims above that. She submits a AED 12,000 hospital bill. How much does she pay?",
            promptAr: "تأمين عائشة الصحي لديه تحمّل ٢٬٠٠٠ درهم و٢٠٪ مشاركة في التكلفة على المطالبات فوق ذلك. قدّمت فاتورة مستشفى ١٢٬٠٠٠ درهم. كم تدفع؟",
            explanationEn: "She pays: AED 2,000 (deductible) + 20% × (AED 12,000 − AED 2,000) = AED 2,000 + 20% × AED 10,000 = AED 2,000 + AED 2,000 = AED 4,000. The insurer pays AED 8,000.",
            explanationAr: "تدفع: ٢٬٠٠٠ درهم (تحمّل) + ٢٠٪ × (١٢٬٠٠٠ − ٢٬٠٠٠) = ٢٬٠٠٠ + ٢٠٪ × ١٠٬٠٠٠ = ٢٬٠٠٠ + ٢٬٠٠٠ = ٤٬٠٠٠ درهم. المؤمِّن يدفع ٨٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 2,000", textAr: "٢٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 2,400", textAr: "٢٬٤٠٠ درهم", isCorrect: false },
              { textEn: "AED 4,000", textAr: "٤٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 12,000", textAr: "١٢٬٠٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What is an insurance 'exclusion'?",
            promptAr: "ما هو 'الاستثناء' في التأمين؟",
            explanationEn: "An exclusion is a condition, event, or circumstance specifically listed in the policy as NOT covered. Common exclusions include pre-existing conditions (in health), war, extreme sports, or wear-and-tear (in property). Always read exclusions before buying.",
            explanationAr: "الاستثناء هو حالة أو حدث أو ظرف محدد في الوثيقة بوضوح بأنه غير مغطى. الاستثناءات الشائعة تشمل الأمراض الموجودة مسبقاً والحروب والرياضات الخطرة.",
            choices: [
              { textEn: "An additional benefit offered for an extra premium",      textAr: "فائدة إضافية مقابل قسط إضافي",                    isCorrect: false },
              { textEn: "A specific event or condition NOT covered by the policy", textAr: "حدث أو حالة محددة غير مغطاة بالوثيقة",           isCorrect: true  },
              { textEn: "The penalty for cancelling a policy early",              textAr: "غرامة إلغاء الوثيقة مبكراً",                      isCorrect: false },
              { textEn: "A discount on your premium for no-claims",               textAr: "خصم على قسطك لعدم تقديم مطالبات",                 isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE" as const, contentTrack: "ISLAMIC",
            promptEn: "Takaful is the Islamic alternative to conventional insurance. What is its core structural difference?",
            promptAr: "التكافل هو البديل الإسلامي للتأمين التقليدي. ما الفرق الهيكلي الأساسي؟",
            explanationEn: "In Takaful, participants contribute to a shared pool (not paying 'premiums' to an insurer's profit account). Claims are paid from this pool. Any surplus belongs to participants, not the company. The model is cooperative, not commercial risk transfer.",
            explanationAr: "في التكافل، يساهم المشاركون في صندوق مشترك (لا يدفعون 'أقساطاً' لحساب أرباح المؤمِّن). تُصرف المطالبات من هذا الصندوق. أي فائض يعود للمشاركين، لا للشركة.",
            choices: [
              { textEn: "Takaful premiums are always cheaper than conventional",           textAr: "أقساط التكافل دائماً أرخص من التقليدي",                      isCorrect: false },
              { textEn: "Participants contribute to a shared pool; surplus returns to them", textAr: "المشاركون يساهمون في صندوق مشترك؛ الفائض يعود لهم",         isCorrect: true  },
              { textEn: "Takaful covers more risks than conventional insurance",           textAr: "التكافل يغطي مخاطر أكثر من التأمين التقليدي",                isCorrect: false },
              { textEn: "There is no difference — both products are regulated identically", textAr: "لا فرق — كلا المنتجين مُنظَّم بنفس الطريقة",               isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Raj is an expat with a family, employed in Dubai. Which risk should he prioritise insuring FIRST?",
            promptAr: "راج مغترب لديه عائلة ويعمل في دبي. أي مخاطر يجب أن يُعطي الأولوية لتأمينها أولاً؟",
            explanationEn: "For an employed expat with dependants, loss of income due to serious illness or death is the most financially devastating risk. Critical illness or term life insurance protects the family if Raj cannot work or dies. His visa and residency are also tied to employment.",
            explanationAr: "بالنسبة لمغترب موظف لديه معالون، فقدان الدخل بسبب مرض خطير أو الوفاة هو الأكثر تدميراً مالياً. التأمين على الحياة لأجل محدد يحمي الأسرة.",
            choices: [
              { textEn: "Travel insurance for frequent flyers",                    textAr: "تأمين السفر للمسافرين الدائمين",                    isCorrect: false },
              { textEn: "Term life or critical illness cover for income protection", textAr: "تأمين على الحياة لأجل محدد أو للأمراض الخطرة لحماية الدخل", isCorrect: true  },
              { textEn: "Contents insurance for his apartment",                    textAr: "تأمين محتويات شقته",                               isCorrect: false },
              { textEn: "Pet insurance for his household",                         textAr: "تأمين الحيوانات الأليفة",                          isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 8  ASSET ATLAS — Asset class basics
  // ══════════════════════════════════════════════════════════════════
  {
    id: "asset-atlas", slug: "asset-atlas", orderIndex: 8,
    nameEn: "Asset Atlas", nameAr: "أطلس الأصول",
    themeKey: "atlas",
    descriptionEn: "The landscape of asset classes — stocks, bonds, real estate, gold, and cash. Educational only, not financial advice.",
    descriptionAr: "مشهد فئات الأصول — الأسهم والسندات والعقارات والذهب والنقد. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "The Investment Landscape", titleAr: "مشهد الاستثمار", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Asset Classes Explained", titleAr: "فئات الأصول موضّحة",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is an equity (share or stock)?",
            promptAr: "ما هو الأسهم (حصة ملكية)؟",
            explanationEn: "An equity represents a partial ownership stake in a company. Shareholders benefit from business growth through price appreciation and dividends. They also bear the risk of loss if the company performs poorly. Equities are the foundational growth asset class.",
            explanationAr: "السهم يمثل حصة ملكية جزئية في شركة. يستفيد حاملو الأسهم من نمو الأعمال من خلال ارتفاع الأسعار والأرباح الموزعة. كما يتحملون خطر الخسارة إذا أداء الشركة ضعيف.",
            choices: [
              { textEn: "A government-issued debt certificate",                 textAr: "شهادة ديون صادرة عن الحكومة",                  isCorrect: false },
              { textEn: "A partial ownership stake in a company",              textAr: "حصة ملكية جزئية في شركة",                      isCorrect: true  },
              { textEn: "A guaranteed return savings product",                 textAr: "منتج ادخار ذو عائد مضمون",                     isCorrect: false },
              { textEn: "A fixed-income deposit at a bank",                   textAr: "وديعة ذات دخل ثابت في بنك",                    isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a bond?",
            promptAr: "ما هو السند؟",
            explanationEn: "A bond is a loan you make to a government or company. They pay you regular interest (the coupon) and return your principal at maturity. Bonds are generally lower risk than equities but also offer lower expected returns. They are considered fixed-income instruments.",
            explanationAr: "السند قرض تمنحه لحكومة أو شركة. يدفعون لك فائدة منتظمة (القسيمة) ويردون أصل المبلغ عند الاستحقاق. السندات عموماً أقل مخاطرة من الأسهم لكنها توفر عوائد متوقعة أقل.",
            choices: [
              { textEn: "A share of ownership in a company",                  textAr: "حصة ملكية في شركة",                              isCorrect: false },
              { textEn: "A loan to a government or company paying fixed interest", textAr: "قرض لحكومة أو شركة يدفع فائدة ثابتة",       isCorrect: true  },
              { textEn: "A savings account with variable returns",            textAr: "حساب توفير بعوائد متغيرة",                      isCorrect: false },
              { textEn: "A contract to buy an asset at a future price",       textAr: "عقد لشراء أصل بسعر مستقبلي",                   isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Why is gold a popular asset in the UAE specifically?",
            promptAr: "لماذا يعدّ الذهب أصلاً شعبياً في الإمارات تحديداً؟",
            explanationEn: "The UAE — particularly Dubai's Gold Souk — has a deep cultural and commercial gold tradition. Gold is widely used as a store of value, an inflation hedge, and a gifting asset at weddings and celebrations. The UAE is one of the world's largest gold trading hubs.",
            explanationAr: "الإمارات — ولا سيما سوق الذهب في دبي — لديها تقليد ثقافي وتجاري راسخ في الذهب. يُستخدم الذهب كمخزن للقيمة وتحوط من التضخم وهدية في الأعراس.",
            choices: [
              { textEn: "Gold earns guaranteed dividends in UAE",               textAr: "الذهب يكسب أرباحاً مضمونة في الإمارات",           isCorrect: false },
              { textEn: "UAE has a deep cultural gold tradition and trading hub status", textAr: "لدى الإمارات تقليد ذهبي ثقافي عميق ومكانة مركز تداول عالمي", isCorrect: true  },
              { textEn: "The UAE government backs gold prices with AED",        textAr: "الحكومة الإماراتية تدعم أسعار الذهب بالدرهم",     isCorrect: false },
              { textEn: "Gold income is tax-free only in UAE",                 textAr: "دخل الذهب معفى من الضريبة في الإمارات فقط",       isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Risk, Return & Diversification", titleAr: "المخاطر والعوائد والتنويع",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "In investing, what is the general relationship between risk and expected return?",
            promptAr: "في الاستثمار، ما العلاقة العامة بين المخاطرة والعائد المتوقع؟",
            explanationEn: "Higher risk generally corresponds to higher expected (not guaranteed) return. This is the fundamental risk-return tradeoff. Cash is lowest risk but lowest return. Equities are higher risk but historically higher long-term return. No risk = no excess return above inflation.",
            explanationAr: "المخاطرة الأعلى عموماً تقابلها عوائد أعلى متوقعة (وليست مضمونة). هذا هو مقايضة المخاطرة-العائد الأساسية.",
            choices: [
              { textEn: "Higher risk always means lower returns",                     textAr: "المخاطرة الأعلى تعني دائماً عوائد أقل",            isCorrect: false },
              { textEn: "Higher risk generally corresponds to higher expected return", textAr: "المخاطرة الأعلى تقابلها عموماً عوائد أعلى متوقعة",  isCorrect: true  },
              { textEn: "Risk and return are unrelated",                              textAr: "المخاطرة والعائد غير مترابطتين",                    isCorrect: false },
              { textEn: "Lower risk means guaranteed higher returns",                 textAr: "المخاطرة الأقل تعني عوائد أعلى مضمونة",            isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does diversification mean in an investment portfolio?",
            promptAr: "ماذا يعني التنويع في محفظة الاستثمار؟",
            explanationEn: "Diversification means spreading investments across different asset classes, geographies, sectors, or individual securities so that a loss in one area does not devastate the whole portfolio. 'Don't put all your eggs in one basket' is the intuition.",
            explanationAr: "التنويع يعني توزيع الاستثمارات عبر فئات أصول أو جغرافيات أو قطاعات مختلفة بحيث لا تُدمّر الخسارة في أحد المجالات المحفظة بأكملها.",
            choices: [
              { textEn: "Investing only in the highest-return assets",             textAr: "الاستثمار فقط في الأصول الأعلى عائداً",               isCorrect: false },
              { textEn: "Spreading investments to reduce concentration risk",       textAr: "توزيع الاستثمارات لتقليل مخاطر التركيز",             isCorrect: true  },
              { textEn: "Putting all money in one safe government bond",           textAr: "وضع كل الأموال في سند حكومي آمن واحد",              isCorrect: false },
              { textEn: "Changing your portfolio every month",                     textAr: "تغيير محفظتك كل شهر",                                isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Liquidity refers to how quickly you can convert an asset to cash. Which of these is the LEAST liquid?",
            promptAr: "السيولة تشير إلى مدى سرعة تحويل الأصل إلى نقد. أيٌّ من التالي هو الأقل سيولة؟",
            explanationEn: "Real estate is among the least liquid assets — selling a property can take months and involves significant transaction costs. Cash is perfectly liquid. Publicly traded shares can be sold in seconds. Fixed deposits have a fixed term but can usually be broken with a penalty.",
            explanationAr: "العقارات من بين أقل الأصول سيولةً — بيع العقار يمكن أن يستغرق أشهراً وينطوي على تكاليف معاملات كبيرة.",
            choices: [
              { textEn: "Cash in a current account",             textAr: "النقد في الحساب الجاري",                  isCorrect: false },
              { textEn: "Publicly traded shares",                textAr: "الأسهم المتداولة علناً",                   isCorrect: false },
              { textEn: "Residential real estate",               textAr: "العقارات السكنية",                         isCorrect: true  },
              { textEn: "A 3-month fixed deposit",               textAr: "وديعة ثابتة لمدة ٣ أشهر",                 isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Asset Allocation Challenge", titleAr: "تحدي تخصيص الأصول",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A 28-year-old with a 30-year investment horizon typically has a higher tolerance for which type of risk vs a 60-year-old planning to retire in 5 years?",
            promptAr: "شخص عمره ٢٨ سنة بأفق استثماري ٣٠ سنة لديه عادةً تحمّل أعلى لأي نوع من المخاطر مقارنةً بشخص ٦٠ سنة يخطط للتقاعد بعد ٥ سنوات؟",
            explanationEn: "The 28-year-old can tolerate more short-term price volatility (market swings) because they have decades for prices to recover. The 60-year-old needs stability since they may need to sell assets soon. Time horizon is the key determinant of risk capacity.",
            explanationAr: "الشخص ذو الـ٢٨ سنة يمكنه تحمّل تقلبات أسعار قصيرة الأجل لأن لديه عقوداً لتعافي الأسعار. أما الشخص ذو الـ٦٠ سنة فيحتاج إلى الاستقرار لأنه قد يحتاج لبيع الأصول قريباً.",
            choices: [
              { textEn: "Zero risk — both should hold only cash",              textAr: "صفر مخاطر — كلاهما يجب أن يحتفظ بالنقد فقط",     isCorrect: false },
              { textEn: "Short-term price volatility (market swings)",        textAr: "تقلبات الأسعار قصيرة الأجل (تذبذبات السوق)",      isCorrect: true  },
              { textEn: "The 60-year-old has higher risk tolerance",          textAr: "الشخص ذو الـ٦٠ سنة لديه تحمّل مخاطر أعلى",       isCorrect: false },
              { textEn: "Both should hold identical portfolios",              textAr: "كلاهما يجب أن يحتفظ بمحافظ متطابقة",             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A UAE resident has no personal income tax. How does this affect the benefit of tax-advantaged accounts?",
            promptAr: "مقيم إماراتي لا يدفع ضريبة دخل شخصية. كيف يؤثر ذلك على فائدة الحسابات ذات المزايا الضريبية؟",
            explanationEn: "Because the UAE has 0% personal income tax and no capital gains tax, tax-advantaged wrappers (like ISAs or 401Ks elsewhere) are less relevant for residents. The main tax consideration is foreign-source income which may be taxed in the source country.",
            explanationAr: "بسبب ضريبة الدخل الشخصي ٠٪ وغياب ضريبة أرباح رأس المال في الإمارات، تكون الحسابات ذات المزايا الضريبية أقل صلةً للمقيمين. الاعتبار الضريبي الرئيسي هو دخل من مصادر خارجية قد يُفرض عليه ضريبة في بلد المصدر.",
            choices: [
              { textEn: "Tax-advantaged accounts are more important in UAE than elsewhere",   textAr: "الحسابات ذات المزايا الضريبية أكثر أهمية في الإمارات من غيرها",  isCorrect: false },
              { textEn: "Tax wrappers are less relevant due to 0% personal income tax",      textAr: "الأوعية الضريبية أقل صلة بسبب ٠٪ ضريبة دخل شخصي",              isCorrect: true  },
              { textEn: "UAE residents pay 9% capital gains tax",                            textAr: "المقيمون الإماراتيون يدفعون ٩٪ ضريبة أرباح رأس المال",           isCorrect: false },
              { textEn: "All investment income is tax-free globally for UAE residents",      textAr: "جميع دخل الاستثمار معفى من الضريبة عالمياً للمقيمين الإماراتيين", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE" as const, contentTrack: "NEUTRAL",
            promptEn: "What does 'past performance is not indicative of future results' mean in practice?",
            promptAr: "ماذا يعني 'الأداء الماضي ليس دليلاً على النتائج المستقبلية' عملياً؟",
            explanationEn: "An asset that performed well in the past may not repeat that performance. Markets change, economic conditions shift, and previous returns do not create an obligation for future returns. This warning appears on all investment products for good reason.",
            explanationAr: "الأصل الذي أدى بشكل جيد في الماضي قد لا يكرر ذلك الأداء. الأسواق تتغير والظروف الاقتصادية تتبدل والعوائد السابقة لا تُلزم بعوائد مستقبلية.",
            choices: [
              { textEn: "Only buy assets that performed well last year",              textAr: "اشتر فقط الأصول التي أدّت جيداً العام الماضي",             isCorrect: false },
              { textEn: "Historical returns do not guarantee future returns",         textAr: "العوائد التاريخية لا تضمن عوائد مستقبلية",                  isCorrect: true  },
              { textEn: "Avoid any asset that had poor performance in the past",     textAr: "تجنب أي أصل كان أداؤه ضعيفاً في الماضي",                  isCorrect: false },
              { textEn: "Performance data is unreliable and should be ignored",      textAr: "بيانات الأداء غير موثوقة ويجب تجاهلها",                   isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a Real Estate Investment Trust (REIT)?",
            promptAr: "ما هو صندوق الاستثمار العقاري (REIT)؟",
            explanationEn: "A REIT is a publicly traded company that owns income-generating real estate. Investors can buy shares in it just like stocks, gaining exposure to property returns without buying an actual property. REITs are traded on stock exchanges like DFM or ADX.",
            explanationAr: "صندوق الاستثمار العقاري (REIT) شركة متداولة علناً تمتلك عقارات مدرّة للدخل. يمكن للمستثمرين شراء أسهم فيها مثل الأسهم العادية، واكتساب عوائد عقارية دون شراء عقار فعلي.",
            choices: [
              { textEn: "A government fund that lends for real estate purchases",  textAr: "صندوق حكومي يُقرض لشراء العقارات",                  isCorrect: false },
              { textEn: "A traded company owning income-generating property",     textAr: "شركة متداولة تمتلك عقارات مدرّة للدخل",             isCorrect: true  },
              { textEn: "A mortgage product available only to UAE nationals",     textAr: "منتج رهن عقاري متاح للمواطنين الإماراتيين فقط",     isCorrect: false },
              { textEn: "A savings account linked to property price movements",   textAr: "حساب توفير مرتبط بحركات أسعار العقارات",           isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 9  SKYLINE KEYS — Real estate
  // ══════════════════════════════════════════════════════════════════
  {
    id: "skyline-keys", slug: "skyline-keys", orderIndex: 9,
    nameEn: "Skyline Keys", nameAr: "مفاتيح الأفق",
    themeKey: "keys",
    descriptionEn: "Buying vs renting, UAE mortgage rules, off-plan risks, and the true cost of owning property. Educational only, not financial advice.",
    descriptionAr: "الشراء مقابل الإيجار وقواعد الرهن الإماراتي ومخاطر العقارات على الخارطة والتكلفة الحقيقية للتملك. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "To Buy or Not to Buy", titleAr: "الشراء أم لا", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Mortgage Basics", titleAr: "أساسيات الرهن العقاري",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "What does LTV (Loan-to-Value) ratio mean in a UAE mortgage?",
            promptAr: "ماذا يعني معدل القرض إلى القيمة (LTV) في الرهن العقاري الإماراتي؟",
            explanationEn: "LTV = mortgage amount ÷ property value × 100. If a property is worth AED 1M and the bank lends AED 750,000, the LTV is 75%. The buyer must fund the remaining 25% as a down payment. The Central Bank caps LTV to limit bank exposure.",
            explanationAr: "معدل القرض إلى القيمة = مبلغ الرهن ÷ قيمة العقار × ١٠٠. إذا كانت قيمة العقار ١ مليون درهم وأقرض البنك ٧٥٠٬٠٠٠ درهم، فـ LTV = ٧٥٪. يجب على المشتري تمويل الـ٢٥٪ المتبقية كدفعة أولى.",
            choices: [
              { textEn: "The loan amount as % of the borrower's annual income",    textAr: "مبلغ القرض كنسبة من الدخل السنوي للمقترض",           isCorrect: false },
              { textEn: "The mortgage amount as % of the property's value",        textAr: "مبلغ الرهن كنسبة من قيمة العقار",                    isCorrect: true  },
              { textEn: "The maximum loan period expressed as a percentage",       textAr: "أقصى مدة قرض معبراً عنها كنسبة مئوية",              isCorrect: false },
              { textEn: "The interest rate divided by the property value",         textAr: "سعر الفائدة مقسوماً على قيمة العقار",               isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "For a non-national buying their first home in the UAE valued under AED 5 million, what is the maximum LTV the Central Bank allows?",
            promptAr: "لغير المواطن الذي يشتري أول منزل له في الإمارات بقيمة أقل من ٥ ملايين درهم، ما أقصى LTV يسمح به المصرف المركزي؟",
            explanationEn: "The Central Bank caps mortgage LTV at 75% for non-nationals buying their first property valued at AED 5 million or less. This means a minimum 25% down payment. UAE nationals get an 80% cap. Properties above AED 5M have a lower LTV cap.",
            explanationAr: "يُحدد المصرف المركزي الحد الأقصى لـ LTV بـ٧٥٪ لغير المواطنين الذين يشترون أول عقار بقيمة ٥ ملايين درهم أو أقل. هذا يعني دفعة أولى ٢٥٪ كحد أدنى.",
            choices: [
              { textEn: "60%", textAr: "٦٠٪", isCorrect: false },
              { textEn: "70%", textAr: "٧٠٪", isCorrect: false },
              { textEn: "75%", textAr: "٧٥٪", isCorrect: true  },
              { textEn: "85%", textAr: "٨٥٪", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Dubai Land Department (DLD) charges a property transfer fee. What is the standard rate?",
            promptAr: "تفرض دائرة الأراضي والأملاك في دبي رسوم نقل ملكية. ما المعدل القياسي؟",
            explanationEn: "The DLD charges 4% of the property transaction value as a transfer fee (typically split 50/50 between buyer and seller unless agreed otherwise). Abu Dhabi's registration fee is 2%. This is a significant upfront cost to factor into affordability calculations.",
            explanationAr: "تُفرض رسوم نقل الملكية في دبي بـ٤٪ من قيمة المعاملة العقارية (تُقسَّم عادةً مناصفةً بين المشتري والبائع). رسوم التسجيل في أبوظبي ٢٪.",
            choices: [
              { textEn: "2%", textAr: "٢٪", isCorrect: false },
              { textEn: "4%", textAr: "٤٪", isCorrect: true  },
              { textEn: "5%", textAr: "٥٪", isCorrect: false },
              { textEn: "1%", textAr: "١٪", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Off-Plan vs Ready Property", titleAr: "عقارات على الخارطة مقابل الجاهزة",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a key financial risk of buying off-plan property in the UAE?",
            promptAr: "ما هو خطر مالي رئيسي عند شراء عقار على الخارطة في الإمارات؟",
            explanationEn: "Off-plan properties may be delayed or, in rare cases, cancelled. Buyers commit funds before the property exists. Delays mean you continue paying rent elsewhere while instalments are due. RERA (in Dubai) and DLD regulations provide some protections, but construction risk remains.",
            explanationAr: "قد يتأخر تسليم العقارات على الخارطة أو تُلغى في حالات نادرة. المشترون يلتزمون بأموال قبل وجود العقار. التأخيرات تعني الاستمرار في دفع الإيجار في مكان آخر بينما تحل الأقساط.",
            choices: [
              { textEn: "Off-plan property always has higher service charges",   textAr: "العقارات على الخارطة دائماً لها رسوم خدمة أعلى",  isCorrect: false },
              { textEn: "Construction delays or cancellation risk",             textAr: "خطر التأخير في البناء أو الإلغاء",               isCorrect: true  },
              { textEn: "Off-plan mortgages are not available in UAE",          textAr: "الرهون العقارية على الخارطة غير متوفرة في الإمارات", isCorrect: false },
              { textEn: "No handover documentation is provided",               textAr: "لا تُقدَّم وثائق تسليم",                          isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a major advantage of buying a ready (secondary market) property vs off-plan?",
            promptAr: "ما هي ميزة رئيسية لشراء عقار جاهز (سوق ثانوي) مقارنةً بالخارطة؟",
            explanationEn: "With a ready property you can physically inspect it, verify what you're buying, and move in (or rent it out) immediately upon completion. There is no construction risk. The price may be higher, but the certainty is greater.",
            explanationAr: "مع العقار الجاهز يمكنك فحصه فعلياً والتحقق مما تشتريه والانتقال إليه (أو تأجيره) فور الاكتمال. لا يوجد خطر بناء. قد يكون السعر أعلى لكن اليقين أكبر.",
            choices: [
              { textEn: "Ready properties are always cheaper than off-plan",       textAr: "العقارات الجاهزة دائماً أرخص من الخارطة",           isCorrect: false },
              { textEn: "You can inspect, move in, or rent immediately",           textAr: "يمكنك الفحص والانتقال أو التأجير فوراً",            isCorrect: true  },
              { textEn: "No DLD transfer fee applies to ready properties",         textAr: "لا تُطبَّق رسوم نقل DLD على العقارات الجاهزة",      isCorrect: false },
              { textEn: "Ready property mortgages have lower interest rates",      textAr: "رهون العقارات الجاهزة لها أسعار فائدة أقل",         isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Beyond the purchase price, which additional cost is often overlooked when buying property in Dubai?",
            promptAr: "بعيداً عن سعر الشراء، أي تكلفة إضافية كثيراً ما تُغفل عند شراء عقار في دبي؟",
            explanationEn: "Annual service charges (building maintenance, DEWA connections, lifts, pool etc.) can be AED 10,000–50,000+ per year depending on the building. They are mandatory and ongoing. New buyers often discover this cost only after purchase.",
            explanationAr: "رسوم الخدمة السنوية (صيانة المبنى ومصافيح DEWA والمصاعد والمسبح) يمكن أن تصل إلى ١٠٬٠٠٠ - ٥٠٬٠٠٠+ درهم سنوياً. إنها إلزامية ومستمرة.",
            choices: [
              { textEn: "One-time furnishing cost",                            textAr: "تكلفة الأثاث لمرة واحدة",                        isCorrect: false },
              { textEn: "Annual service charges for building maintenance",     textAr: "رسوم الخدمة السنوية لصيانة المبنى",              isCorrect: true  },
              { textEn: "Monthly mortgage application fee",                    textAr: "رسوم طلب الرهن الشهرية",                        isCorrect: false },
              { textEn: "Stamp duty",                                          textAr: "رسوم الطوابع",                                  isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Buy vs Rent Decision", titleAr: "قرار الشراء مقابل الإيجار",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "The 'price-to-rent ratio' compares property price to annual rent. A ratio of 25 means it takes 25 years of rent to equal the purchase price. What does a high ratio suggest?",
            promptAr: "معدل السعر إلى الإيجار يقارن سعر العقار بالإيجار السنوي. نسبة ٢٥ تعني أن ٢٥ سنة من الإيجار تعادل سعر الشراء. ماذا تُشير النسبة العالية؟",
            explanationEn: "A high price-to-rent ratio (e.g., 30+) suggests renting is relatively cheaper than buying. A low ratio (e.g., below 15) suggests buying may make more financial sense. Dubai typically has a price-to-rent ratio of 20–28, so renting vs buying is genuinely competitive.",
            explanationAr: "معدل سعر إلى إيجار مرتفع (مثلاً ٣٠+) يُشير إلى أن الإيجار أرخص نسبياً من الشراء. معدل منخفض (أقل من ١٥) قد يعني أن الشراء أفضل مالياً. دبي عادةً لديها معدل ٢٠-٢٨.",
            choices: [
              { textEn: "Buying is significantly cheaper than renting",        textAr: "الشراء أرخص بكثير من الإيجار",                    isCorrect: false },
              { textEn: "Renting may be relatively more cost-efficient",       textAr: "الإيجار قد يكون أكثر كفاءةً من حيث التكلفة",     isCorrect: true  },
              { textEn: "The property is overpriced and should be avoided",   textAr: "العقار مُسعَّر بشكل مبالغ فيه ويجب تجنبه",       isCorrect: false },
              { textEn: "Mortgage rates are rising in the market",            textAr: "أسعار الرهن ترتفع في السوق",                     isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Mariam wants to buy an apartment priced at AED 1,200,000. With a 25% down payment and 4% DLD fee, how much upfront cash does she need (excluding mortgage fees)?",
            promptAr: "مريم تريد شراء شقة بسعر ١٬٢٠٠٬٠٠٠ درهم. بدفعة أولى ٢٥٪ ورسوم DLD ٤٪، كم تحتاج من النقد المُقدَّم (باستثناء رسوم الرهن)؟",
            explanationEn: "Down payment: 25% × AED 1,200,000 = AED 300,000. DLD transfer fee: 4% × AED 1,200,000 = AED 48,000. Total minimum upfront: AED 348,000. Plus mortgage registration fees, valuation, and agent fees could add another AED 20,000–30,000.",
            explanationAr: "الدفعة الأولى: ٢٥٪ × ١٬٢٠٠٬٠٠٠ = ٣٠٠٬٠٠٠ درهم. رسوم DLD: ٤٪ × ١٬٢٠٠٬٠٠٠ = ٤٨٬٠٠٠ درهم. الإجمالي المُقدَّم الأدنى: ٣٤٨٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 300,000", textAr: "٣٠٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 348,000", textAr: "٣٤٨٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 240,000", textAr: "٢٤٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 396,000", textAr: "٣٩٦٬٠٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "When does renting typically make MORE financial sense than buying in the UAE?",
            promptAr: "متى يكون الإيجار عموماً أكثر منطقيةً مالياً من الشراء في الإمارات؟",
            explanationEn: "If you plan to stay less than 3–5 years, renting usually wins — buying costs (DLD fees, agent fees, mortgage setup) take years to recover through equity build-up. Buying only makes sense if you plan long-term occupancy or rental investment.",
            explanationAr: "إذا كنت تخطط للإقامة أقل من ٣-٥ سنوات، عادةً يفوز الإيجار — تكاليف الشراء (رسوم DLD والوكيل وإعداد الرهن) تستغرق سنوات للاسترداد. الشراء منطقي فقط مع الإقامة الطويلة أو الاستثمار الإيجاري.",
            choices: [
              { textEn: "When you have a large cash down payment available",      textAr: "عندما لديك دفعة أولى نقدية كبيرة",                  isCorrect: false },
              { textEn: "When your stay is likely shorter than 3–5 years",       textAr: "عندما تكون إقامتك المحتملة أقل من ٣-٥ سنوات",      isCorrect: true  },
              { textEn: "When mortgage interest rates are below 2%",             textAr: "عندما تكون أسعار فائدة الرهن أقل من ٢٪",            isCorrect: false },
              { textEn: "When property prices are rising rapidly",               textAr: "عندما ترتفع أسعار العقارات بسرعة",                  isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which UAE legal concept determines who is allowed to buy real estate — nationals only vs a wider group?",
            promptAr: "أي مفهوم قانوني إماراتي يحدد من يُسمح له بشراء العقارات — المواطنون فقط أم مجموعة أوسع؟",
            explanationEn: "Freehold areas allow non-nationals to own property outright. Leasehold areas grant long-term leases (e.g., 99 years) but not full ownership. In Dubai, designated freehold zones include areas like Dubai Marina, Downtown, and Palm Jumeirah, enabling expat ownership.",
            explanationAr: "مناطق التملك الحر تتيح لغير المواطنين تملك العقارات بشكل كامل. المناطق ذات حق الانتفاع تمنح إيجارات طويلة الأجل (مثلاً ٩٩ سنة) لكن دون ملكية كاملة. في دبي، تشمل مناطق التملك الحر المحددة مارينا دبي وداون تاون وجزيرة النخلة.",
            choices: [
              { textEn: "Freehold vs leasehold zoning",                            textAr: "التملك الحر مقابل مناطق حق الانتفاع",              isCorrect: true  },
              { textEn: "DBR limits restrict non-national buyers",                 textAr: "حدود DBR تقيّد المشترين من غير المواطنين",           isCorrect: false },
              { textEn: "Only GCC nationals can buy anywhere in UAE",             textAr: "فقط مواطنو دول الخليج يمكنهم الشراء في أي مكان بالإمارات", isCorrect: false },
              { textEn: "AECB score determines purchasing eligibility",           textAr: "درجة AECB تحدد أهلية الشراء",                       isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 10  HALAL HARBOUR — Islamic finance
  // ══════════════════════════════════════════════════════════════════
  {
    id: "halal-harbour", slug: "halal-harbour", orderIndex: 10,
    nameEn: "Halal Harbour", nameAr: "ميناء الحلال",
    themeKey: "harbour",
    descriptionEn: "Finance without interest — murabaha, ijara, sukuk, and takaful explained. Educational only, not financial advice.",
    descriptionAr: "التمويل بدون فوائد — المرابحة والإجارة والصكوك والتكافل موضّحة. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Finance Without Interest", titleAr: "التمويل بدون فوائد", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Riba & Core Principles", titleAr: "الربا والمبادئ الأساسية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is riba in Islamic finance?",
            promptAr: "ما هو الربا في التمويل الإسلامي؟",
            explanationEn: "Riba literally means 'excess' or 'increase' and refers to any predetermined, guaranteed increase on a loan or exchange that is not tied to real economic activity. Islamic finance prohibits riba because it creates unjust enrichment without productive work or risk sharing.",
            explanationAr: "الربا يعني حرفياً 'الزيادة' وهو أي زيادة محددة مسبقاً ومضمونة على قرض أو تبادل غير مرتبطة بنشاط اقتصادي حقيقي. يحرّم التمويل الإسلامي الربا لأنه يُولّد إثراءً غير عادل دون عمل منتج أو تقاسم مخاطر.",
            choices: [
              { textEn: "Any form of profit or income",                                textAr: "أي شكل من أشكال الربح أو الدخل",                     isCorrect: false },
              { textEn: "Predetermined guaranteed excess on a loan not tied to real activity", textAr: "زيادة محددة مسبقاً ومضمونة على قرض غير مرتبطة بنشاط حقيقي", isCorrect: true  },
              { textEn: "Any transaction involving two currencies",                    textAr: "أي معاملة تشمل عملتين",                              isCorrect: false },
              { textEn: "Profit earned from international trade only",                textAr: "ربح من التجارة الدولية فقط",                         isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is Murabaha in Islamic banking?",
            promptAr: "ما هي المرابحة في المصرفية الإسلامية؟",
            explanationEn: "In Murabaha, the bank buys an asset (e.g., a car or property) and sells it to the customer at a known, agreed markup. The customer pays in instalments. The profit is not 'interest' — it is a declared margin on a real sale. Both the cost and markup must be disclosed.",
            explanationAr: "في المرابحة، يشتري البنك الأصل (مثل سيارة أو عقار) ويبيعه للعميل بهامش ربح معروف ومتفق عليه. يدفع العميل أقساطاً. الربح ليس 'فائدة' — إنه هامش معلن على بيع حقيقي.",
            choices: [
              { textEn: "A profit-sharing partnership between bank and business",   textAr: "شراكة تقاسم أرباح بين البنك والشركة",               isCorrect: false },
              { textEn: "Bank buys asset and sells at a declared markup to customer", textAr: "البنك يشتري الأصل ويبيعه للعميل بهامش ربح معلن",    isCorrect: true  },
              { textEn: "A leasing arrangement for land",                          textAr: "ترتيب إيجاري للأراضي",                               isCorrect: false },
              { textEn: "A charitable donation mechanism",                         textAr: "آلية تبرع خيري",                                     isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is Ijara in Islamic finance?",
            promptAr: "ما هي الإجارة في التمويل الإسلامي؟",
            explanationEn: "Ijara is an Islamic leasing contract. The bank owns the asset and leases it to the customer for a specified period and agreed rental payments. At the end of the lease, ownership may transfer to the customer (Ijara wa Iqtina). It is commonly used for home and car financing.",
            explanationAr: "الإجارة عقد إيجار إسلامي. البنك يمتلك الأصل ويؤجّره للعميل لفترة محددة بمدفوعات إيجارية متفق عليها. في نهاية الإيجار، قد تنتقل الملكية للعميل (إجارة وإقتناء). تُستخدم شائعاً لتمويل المنازل والسيارات.",
            choices: [
              { textEn: "A partnership where both parties share profits and losses",  textAr: "شراكة يتقاسم فيها الطرفان الأرباح والخسائر",         isCorrect: false },
              { textEn: "An Islamic leasing contract where bank owns the asset",     textAr: "عقد إيجار إسلامي يمتلك فيه البنك الأصل",             isCorrect: true  },
              { textEn: "A charitable endowment for community projects",             textAr: "وقف خيري للمشاريع المجتمعية",                        isCorrect: false },
              { textEn: "A savings product with guaranteed returns",                 textAr: "منتج ادخار بعوائد مضمونة",                           isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Sukuk & Islamic Funds", titleAr: "الصكوك والصناديق الإسلامية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is a sukuk, and how does it differ from a conventional bond?",
            promptAr: "ما هو الصك، وكيف يختلف عن السند التقليدي؟",
            explanationEn: "A sukuk is an Islamic certificate representing ownership in a tangible asset, project, or business activity — not a debt obligation. Returns come from the underlying asset's performance or lease income, not from interest payments. The UAE is one of the world's largest sukuk markets.",
            explanationAr: "الصك شهادة إسلامية تمثل ملكية في أصل ملموس أو مشروع أو نشاط تجاري — وليس التزام دين. تأتي العوائد من أداء الأصل الأساسي أو دخل الإيجار، لا من مدفوعات الفائدة. الإمارات من أكبر أسواق الصكوك عالمياً.",
            choices: [
              { textEn: "Sukuk is a conventional bond with Arabic branding",           textAr: "الصك سند تقليدي بعلامة عربية فقط",                        isCorrect: false },
              { textEn: "Sukuk represents ownership in an asset, returns from its performance", textAr: "الصك يمثل ملكية في أصل، والعوائد من أدائه",            isCorrect: true  },
              { textEn: "Sukuk always guarantees a fixed return like a bond",          textAr: "الصك يضمن دائماً عائداً ثابتاً مثل السند",                  isCorrect: false },
              { textEn: "Sukuk is only issued by governments",                         textAr: "الصك يُصدر من الحكومات فقط",                               isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is Musharaka?",
            promptAr: "ما هي المشاركة؟",
            explanationEn: "Musharaka is an Islamic joint venture or partnership. All parties contribute capital and share profits and losses in agreed proportions. It is used for business financing and property purchases. Unlike Murabaha, both parties bear risk — making it a purer Islamic finance structure.",
            explanationAr: "المشاركة مشروع مشترك أو شراكة إسلامية. جميع الأطراف تُساهم برأس المال وتتقاسم الأرباح والخسائر بنسب متفق عليها. تُستخدم لتمويل الأعمال والعقارات.",
            choices: [
              { textEn: "A charitable fund for community welfare",                     textAr: "صندوق خيري لرعاية المجتمع",                             isCorrect: false },
              { textEn: "A joint venture where all parties share capital, profit and loss", textAr: "مشروع مشترك يتقاسم فيه الجميع رأس المال والربح والخسارة", isCorrect: true  },
              { textEn: "A bank deposit with profit distribution",                    textAr: "وديعة بنكية مع توزيع أرباح",                            isCorrect: false },
              { textEn: "A currency exchange mechanism",                              textAr: "آلية صرف عملات",                                        isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "What is the Nisab in the context of Zakat on savings?",
            promptAr: "ما هو النصاب في سياق زكاة المدخرات؟",
            explanationEn: "Nisab is the minimum wealth threshold above which Zakat becomes obligatory. It is set at the equivalent value of 85 grams of gold or 595 grams of silver — whichever is lower. Savings held above the Nisab for one full lunar year (Hawl) are subject to 2.5% Zakat.",
            explanationAr: "النصاب هو الحد الأدنى للثروة الذي تصبح فوقه الزكاة واجبة. يُحدَّد بما يعادل قيمة ٨٥ غراماً من الذهب أو ٥٩٥ غراماً من الفضة — أيهما أقل. المدخرات التي تتجاوز النصاب لحول قمري كامل تخضع لزكاة ٢.٥٪.",
            choices: [
              { textEn: "The percentage rate of Zakat (2.5%)",                  textAr: "نسبة الزكاة (٢.٥٪)",                               isCorrect: false },
              { textEn: "The minimum wealth threshold above which Zakat is due", textAr: "الحد الأدنى للثروة الذي تجب فوقه الزكاة",         isCorrect: true  },
              { textEn: "The lunar year waiting period before Zakat applies",   textAr: "فترة الانتظار القمرية قبل تطبيق الزكاة",          isCorrect: false },
              { textEn: "The maximum amount exempt from Zakat",                 textAr: "الحد الأقصى المعفى من الزكاة",                    isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Halal Finance Navigator", titleAr: "مرشد التمويل الحلال",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "Faisal wants to buy a car using Islamic finance. His bank offers Murabaha at a 6% profit margin on the cost price. This is different from a conventional 6% APR loan because:",
            promptAr: "فيصل يريد شراء سيارة بتمويل إسلامي. بنكه يعرض مرابحة بهامش ربح ٦٪ على سعر التكلفة. هذا يختلف عن قرض تقليدي بـ٦٪ APR لأن:",
            explanationEn: "In Murabaha, the 6% is applied once to the cost price and the total is fixed at the time of sale — the amount never compounds or changes. A 6% APR conventional loan charges interest on the declining balance over time (reducing balance), which can result in different total costs.",
            explanationAr: "في المرابحة، تُطبَّق الـ٦٪ مرة واحدة على سعر التكلفة والإجمالي ثابت عند البيع — المبلغ لا يتراكم ولا يتغير. القرض التقليدي بـ٦٪ APR يُحمَّل الفائدة على الرصيد المتناقص بمرور الوقت.",
            choices: [
              { textEn: "Murabaha always has lower total cost than 6% APR loans",     textAr: "المرابحة دائماً أقل تكلفة إجمالية من قروض APR 6٪",       isCorrect: false },
              { textEn: "The Murabaha profit is a fixed declared margin on a real sale, not compound interest", textAr: "ربح المرابحة هامش ثابت معلن على بيع حقيقي، لا فائدة مركبة", isCorrect: true  },
              { textEn: "Murabaha is only available to UAE nationals",               textAr: "المرابحة متاحة للمواطنين الإماراتيين فقط",                 isCorrect: false },
              { textEn: "There is no practical difference — both produce identical costs", textAr: "لا فرق عملي — كلاهما ينتجان تكاليف متطابقة",        isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "A Mudarabah savings account differs from a Musharaka account in what key way?",
            promptAr: "يختلف حساب التوفير بالمضاربة عن حساب المشاركة بطريقة رئيسية — ما هي؟",
            explanationEn: "In Mudarabah, one party provides capital (the depositor) and the other provides expertise/management (the bank). Profits are shared; capital loss is borne by the capital provider unless negligence is proven. In Musharaka, both parties provide capital and both share profits AND losses.",
            explanationAr: "في المضاربة، يُقدّم طرف رأس المال (المودِع) والآخر الخبرة/الإدارة (البنك). تتقاسم الأرباح؛ خسارة رأس المال يتحملها مُقدِّم رأس المال إلا إذا ثبت الإهمال. في المشاركة، يُقدّم الطرفان رأس المال ويتقاسمان الأرباح والخسائر.",
            choices: [
              { textEn: "Mudarabah guarantees the depositor's capital is safe",         textAr: "المضاربة تضمن سلامة رأس مال المودِع",                      isCorrect: false },
              { textEn: "In Mudarabah one provides capital, the other expertise — in Musharaka both provide capital", textAr: "في المضاربة طرف يُقدّم رأس المال والآخر الخبرة — في المشاركة كلاهما يُقدّم رأس المال", isCorrect: true  },
              { textEn: "Musharaka is only for real estate transactions",               textAr: "المشاركة مخصصة للمعاملات العقارية فقط",                    isCorrect: false },
              { textEn: "Mudarabah always offers higher returns",                       textAr: "المضاربة تُقدّم دائماً عوائد أعلى",                        isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "Takaful operates on the principle of mutual guarantee. What happens to the takaful fund if claims in a year are less than contributions?",
            promptAr: "يعمل التكافل على مبدأ الضمان المتبادل. ماذا يحدث لصندوق التكافل إذا كانت المطالبات في السنة أقل من المساهمات؟",
            explanationEn: "In Takaful, any surplus remaining after claims and operational costs belongs to the participants — not the company. It may be distributed back to participants or retained in the pool for future periods. This is fundamentally different from conventional insurance where surplus is profit to shareholders.",
            explanationAr: "في التكافل، أي فائض يبقى بعد المطالبات وتكاليف التشغيل يعود للمشاركين — لا للشركة. قد يُوزَّع على المشاركين أو يُبقى في الصندوق للفترات المستقبلية.",
            choices: [
              { textEn: "The surplus is profit for the takaful company's shareholders",  textAr: "الفائض ربح لمساهمي شركة التكافل",                         isCorrect: false },
              { textEn: "The surplus belongs to participants and may be distributed",    textAr: "الفائض يعود للمشاركين وقد يُوزَّع عليهم",                 isCorrect: true  },
              { textEn: "The surplus is donated to government charity funds",            textAr: "الفائض يُتبرع به لصناديق الجمعيات الخيرية الحكومية",       isCorrect: false },
              { textEn: "The surplus is automatically reinvested in sukuk",              textAr: "الفائض يُعاد استثماره تلقائياً في الصكوك",                 isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "ISLAMIC",
            promptEn: "The UAE is a leading global hub for Islamic finance. Which of the following reflects this?",
            promptAr: "الإمارات مركز عالمي رائد للتمويل الإسلامي. أيٌّ من التالي يعكس هذا؟",
            explanationEn: "Dubai aims to be the world's capital of Islamic economy. The UAE hosts significant sukuk issuances listed on Nasdaq Dubai and DFM, has the Dubai Islamic Economy Development Centre, and several fully Islamic banks are headquartered there. Shariah boards are required for all Islamic products.",
            explanationAr: "تهدف دبي لأن تكون عاصمة الاقتصاد الإسلامي عالمياً. تستضيف الإمارات إصدارات صكوك كبيرة في ناسداك دبي وسوق دبي المالي، وتضم مركز دبي لتطوير الاقتصاد الإسلامي وعدة بنوك إسلامية بالكامل.",
            choices: [
              { textEn: "The UAE has the highest Zakat collection rate globally",         textAr: "الإمارات لديها أعلى معدل جمع زكاة عالمياً",                isCorrect: false },
              { textEn: "Dubai aims to be the global capital of Islamic economy with major sukuk markets", textAr: "دبي تهدف لأن تكون عاصمة الاقتصاد الإسلامي مع أسواق صكوك كبرى", isCorrect: true  },
              { textEn: "All UAE banks are required to be fully Shariah-compliant",       textAr: "جميع البنوك الإماراتية مطلوب منها الامتثال الشرعي الكامل",  isCorrect: false },
              { textEn: "Conventional banking is banned in the UAE",                     textAr: "المصرفية التقليدية محظورة في الإمارات",                      isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 11  GRATUITY GARDEN — EOSB & retirement
  // ══════════════════════════════════════════════════════════════════
  {
    id: "gratuity-garden", slug: "gratuity-garden", orderIndex: 11,
    nameEn: "Gratuity Garden", nameAr: "حديقة المكافأة",
    themeKey: "garden",
    descriptionEn: "End-of-service benefits, GPSSA for UAE nationals, and building retirement income as an expat. Educational only, not financial advice.",
    descriptionAr: "مكافأة نهاية الخدمة وهيئة المعاشات للمواطنين وبناء دخل التقاعد كمغترب. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Your End-of-Service Rights", titleAr: "حقوقك في نهاية الخدمة", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Gratuity Calculation", titleAr: "حساب مكافأة نهاية الخدمة",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Under UAE Labour Law, how many calendar days of basic salary is an employee entitled to per year of service for the first 5 years?",
            promptAr: "بموجب قانون العمل الإماراتي، كم يوماً تقويمياً من الراتب الأساسي يحق للموظف عن كل سنة خدمة خلال السنوات الخمس الأولى؟",
            explanationEn: "UAE Labour Law grants 21 calendar days of basic salary per year of service for the first 5 years. After 5 years, this increases to 30 calendar days per year. The calculation is based on the employee's last basic salary.",
            explanationAr: "يمنح قانون العمل الإماراتي ٢١ يوماً تقويمياً من الراتب الأساسي عن كل سنة خدمة خلال السنوات الخمس الأولى. بعد ٥ سنوات، ترتفع إلى ٣٠ يوماً سنوياً.",
            choices: [
              { textEn: "14 calendar days", textAr: "١٤ يوماً تقويمياً", isCorrect: false },
              { textEn: "21 calendar days", textAr: "٢١ يوماً تقويمياً", isCorrect: true  },
              { textEn: "30 calendar days", textAr: "٣٠ يوماً تقويمياً", isCorrect: false },
              { textEn: "45 calendar days", textAr: "٤٥ يوماً تقويمياً", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj's last basic salary is AED 12,000/month. He has worked for 7 years. What is his approximate gratuity entitlement?",
            promptAr: "آخر راتب أساسي لراج ١٢٬٠٠٠ درهم/شهر. عمل ٧ سنوات. ما مكافأة نهاية خدمته التقريبية؟",
            explanationEn: "First 5 years: 5 × 21 days × (AED 12,000 ÷ 30) = 5 × 21 × AED 400 = AED 42,000. Next 2 years: 2 × 30 days × AED 400 = AED 24,000. Total: AED 66,000. Maximum gratuity is capped at 2 years' total salary.",
            explanationAr: "السنوات الخمس الأولى: ٥ × ٢١ يوماً × (١٢٬٠٠٠ ÷ ٣٠) = ٥ × ٢١ × ٤٠٠ = ٤٢٬٠٠٠ درهم. السنتان التاليتان: ٢ × ٣٠ × ٤٠٠ = ٢٤٬٠٠٠ درهم. الإجمالي: ٦٦٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 42,000", textAr: "٤٢٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 50,400", textAr: "٥٠٬٤٠٠ درهم", isCorrect: false },
              { textEn: "AED 66,000", textAr: "٦٦٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 84,000", textAr: "٨٤٬٠٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "An employee who resigns before completing 1 year in UAE is entitled to gratuity.",
            promptAr: "الموظف الذي يستقيل قبل إتمام سنة واحدة في الإمارات يستحق مكافأة نهاية الخدمة.",
            explanationEn: "False. UAE Labour Law requires a minimum of 1 year of continuous service to be entitled to gratuity. If an employee leaves before completing 1 year, no gratuity is payable. Some contracts may offer contractual gratuity earlier, but the statutory minimum is 1 year.",
            explanationAr: "خطأ. يشترط قانون العمل الإماراتي خدمة متواصلة لا تقل عن سنة واحدة لاستحقاق مكافأة نهاية الخدمة. الموظف الذي يغادر قبل إتمام سنة لا يستحق مكافأة.",
            choices: [
              { textEn: "True — gratuity starts from day one",                textAr: "صحيح — المكافأة تبدأ من اليوم الأول",              isCorrect: false },
              { textEn: "False — a minimum of 1 year is required",           textAr: "خطأ — سنة واحدة على الأقل مطلوبة",                isCorrect: true  },
              { textEn: "True — but only if the employer terminates them",   textAr: "صحيح — لكن فقط إذا أنهى صاحب العمل عقده",        isCorrect: false },
              { textEn: "False — the minimum is 2 years",                    textAr: "خطأ — الحد الأدنى سنتان",                         isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "GPSSA & Expat Retirement", titleAr: "هيئة المعاشات وتقاعد المغتربين",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "The General Pension and Social Security Authority (GPSSA) applies to which group in the UAE?",
            promptAr: "تنطبق هيئة المعاشات والتأمينات الاجتماعية (GPSSA) على أي مجموعة في الإمارات؟",
            explanationEn: "GPSSA is the pension system for UAE nationals employed in the private sector. UAE nationals must contribute a percentage of their salary, and their employers also contribute. Expats do not benefit from GPSSA — their retirement savings depend on gratuity and voluntary savings.",
            explanationAr: "هيئة المعاشات نظام تقاعدي للمواطنين الإماراتيين العاملين في القطاع الخاص. يجب على المواطنين المساهمة بنسبة من رواتبهم وأصحاب العمل أيضاً. المغتربون لا يستفيدون من هيئة المعاشات.",
            choices: [
              { textEn: "All residents working in UAE private sector",     textAr: "جميع المقيمين العاملين في القطاع الخاص الإماراتي",   isCorrect: false },
              { textEn: "UAE nationals in private sector employment",      textAr: "المواطنون الإماراتيون في التوظيف بالقطاع الخاص",    isCorrect: true  },
              { textEn: "All expat workers earning above AED 10,000/month", textAr: "جميع العمال المغتربين الذين يكسبون فوق ١٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "Only government (public sector) employees",       textAr: "موظفو الحكومة (القطاع العام) فقط",                  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is DEWS (Diligent End of Service system) in the UAE?",
            promptAr: "ما هو نظام DEWS (نظام نهاية الخدمة الاستثماري) في الإمارات؟",
            explanationEn: "DEWS is a voluntary workplace savings scheme launched in Dubai, where employers can contribute to a fund on behalf of employees as an alternative to the lump-sum gratuity. The fund is professionally managed and invested, giving expats access to invested growth rather than a simple cash payout.",
            explanationAr: "DEWS نظام ادخار طوعي في مكان العمل أُطلق في دبي، حيث يمكن لأصحاب العمل المساهمة في صندوق لصالح الموظفين كبديل لمكافأة نهاية الخدمة المدفوعة مقطوعاً. الصندوق مُدار ومستثمر باحترافية.",
            choices: [
              { textEn: "A mandatory pension fund for all UAE employees",       textAr: "صندوق تقاعد إلزامي لجميع موظفي الإمارات",           isCorrect: false },
              { textEn: "A voluntary workplace savings scheme as a gratuity alternative", textAr: "نظام ادخار طوعي كبديل لمكافأة نهاية الخدمة",  isCorrect: true  },
              { textEn: "A government loan scheme for end-of-service expenses",  textAr: "نظام قروض حكومي لمصاريف نهاية الخدمة",             isCorrect: false },
              { textEn: "A tax on employer gratuity payments",                  textAr: "ضريبة على مدفوعات صاحب العمل لمكافأة نهاية الخدمة", isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "An expat worker in UAE has no mandatory state pension. What is the primary official retirement benefit they accumulate?",
            promptAr: "لا يوجد للعامل المغترب في الإمارات معاش تقاعدي حكومي إلزامي. ما هو المزيد التقاعدي الرسمي الأساسي الذي يراكمه؟",
            explanationEn: "For expats, the End of Service Benefit (gratuity) is the only mandatory retirement-linked payment. This is often insufficient for retirement — which is why voluntary savings, international pensions from home countries, and personal investment plans are critical for expats.",
            explanationAr: "للمغتربين، مكافأة نهاية الخدمة (الغراتويتي) هي الدفعة الوحيدة الإلزامية المرتبطة بالتقاعد. وهذا غالباً غير كافٍ للتقاعد — لذا تُعدّ المدخرات الطوعية والمعاشات الدولية وخطط الاستثمار الشخصي أمراً بالغ الأهمية للمغتربين.",
            choices: [
              { textEn: "GPSSA state pension",               textAr: "معاش الدولة من هيئة المعاشات",         isCorrect: false },
              { textEn: "End of Service Benefit (gratuity)", textAr: "مكافأة نهاية الخدمة (الغراتويتي)",     isCorrect: true  },
              { textEn: "Mandatory savings account",         textAr: "حساب توفير إلزامي",                   isCorrect: false },
              { textEn: "UAE government pension for all residents", textAr: "معاش حكومي إماراتي لجميع المقيمين", isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Retirement Readiness", titleAr: "الاستعداد للتقاعد",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam is 35, earns AED 20,000/month, and wants to retire at 60 with AED 3M. She has AED 0 saved. Ignoring returns, how much must she save monthly?",
            promptAr: "مريم عمرها ٣٥ سنة وتكسب ٢٠٬٠٠٠ درهم/شهر وتريد التقاعد بعمر ٦٠ بمبلغ ٣ ملايين درهم. لديها صفر مدخرات. مع تجاهل العوائد، كم يجب أن توفر شهرياً؟",
            explanationEn: "25 years × 12 months = 300 months. AED 3,000,000 ÷ 300 = AED 10,000/month — exactly 50% of her income. With investment returns, the required monthly amount drops significantly. This illustrates why starting early and investing returns matter enormously.",
            explanationAr: "٢٥ سنة × ١٢ شهراً = ٣٠٠ شهر. ٣٬٠٠٠٬٠٠٠ ÷ ٣٠٠ = ١٠٬٠٠٠ درهم/شهر — ٥٠٪ من دخلها. مع عوائد الاستثمار، ينخفض المبلغ الشهري المطلوب بشكل كبير.",
            choices: [
              { textEn: "AED 5,000/month",  textAr: "٥٬٠٠٠ درهم/شهر",  isCorrect: false },
              { textEn: "AED 8,000/month",  textAr: "٨٬٠٠٠ درهم/شهر",  isCorrect: false },
              { textEn: "AED 10,000/month", textAr: "١٠٬٠٠٠ درهم/شهر", isCorrect: true  },
              { textEn: "AED 12,000/month", textAr: "١٢٬٠٠٠ درهم/شهر", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the key advantage of compound growth over simple growth when saving for retirement?",
            promptAr: "ما الميزة الرئيسية للنمو المركب على النمو البسيط عند الادخار للتقاعد؟",
            explanationEn: "Compound growth means you earn returns on your returns — not just on the original principal. Over long periods (20-30 years) the difference between simple and compound growth is enormous. AED 100,000 at 6% p.a. simple = AED 260,000 after 30 years; compound ≈ AED 574,000.",
            explanationAr: "النمو المركب يعني كسب عوائد على عوائدك — لا على الأصل الأولي فقط. على مدى فترات طويلة (٢٠-٣٠ سنة) الفرق بين النمو البسيط والمركب هائل.",
            choices: [
              { textEn: "Simple growth is always better than compound",                   textAr: "النمو البسيط دائماً أفضل من المركب",                     isCorrect: false },
              { textEn: "Returns accumulate on previous returns, amplifying growth over time", textAr: "العوائد تتراكم على العوائد السابقة وتضخّم النمو بمرور الوقت", isCorrect: true  },
              { textEn: "Compound growth only benefits those earning above AED 30,000/month", textAr: "النمو المركب يُفيد فقط من يكسب فوق ٣٠٬٠٠٠ درهم/شهر",    isCorrect: false },
              { textEn: "Compound growth is the same as compound interest on loans",       textAr: "النمو المركب هو نفس الفائدة المركبة على القروض",          isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Why is gratuity generally NOT sufficient as a standalone retirement plan for UAE expats?",
            promptAr: "لماذا لا تكفي مكافأة نهاية الخدمة عموماً كخطة تقاعد مستقلة للمغتربين الإماراتيين؟",
            explanationEn: "Gratuity is calculated on basic salary (not total package), has a maximum cap, is paid only at resignation/termination, and does not account for investment returns. A 30-year expat might receive 2-3 years' salary in gratuity — far less than the 15-25 years of retirement income needed.",
            explanationAr: "تُحسب المكافأة على الراتب الأساسي (لا الحزمة الكاملة)، ولها حد أقصى، وتُصرف فقط عند الاستقالة أو الإنهاء، ولا تأخذ في الاعتبار عوائد الاستثمار. مغترب لـ٣٠ سنة قد يتلقى ٢-٣ سنوات راتب كمكافأة — أقل بكثير من ١٥-٢٥ سنة دخل تقاعد مطلوبة.",
            choices: [
              { textEn: "Gratuity is tax-free so it cannot be used for retirement",     textAr: "المكافأة معفاة من الضريبة لذا لا يمكن استخدامها للتقاعد", isCorrect: false },
              { textEn: "Gratuity amount is usually far too small for full retirement",  textAr: "مبلغ المكافأة عادةً صغير جداً للتقاعد الكامل",           isCorrect: true  },
              { textEn: "Gratuity can only be received after age 60",                   textAr: "لا يمكن استلام المكافأة إلا بعد سن ٦٠",                 isCorrect: false },
              { textEn: "Gratuity must be repaid if you return to work in UAE",        textAr: "يجب سداد المكافأة إذا عدت للعمل في الإمارات",           isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "If Faisal leaves his job after exactly 3 years and his employer refuses to pay gratuity, what is his recourse in UAE?",
            promptAr: "إذا ترك فيصل وظيفته بعد ٣ سنوات بالضبط ورفض صاحب العمل دفع المكافأة، ما خياراته في الإمارات؟",
            explanationEn: "Faisal can file a labour complaint with the Ministry of Human Resources and Emiratisation (MoHRE). The UAE Labour Court handles gratuity disputes, and employees have strong legal rights. He should document his start and end dates, final basic salary, and any written agreements.",
            explanationAr: "يمكن لفيصل تقديم شكوى عمالية لوزارة الموارد البشرية والتوطين. محكمة العمل الإماراتية تتولى نزاعات المكافأة والموظفون لديهم حقوق قانونية قوية.",
            choices: [
              { textEn: "No recourse — gratuity is discretionary",              textAr: "لا خيارات — المكافأة تقديرية",                         isCorrect: false },
              { textEn: "File a complaint with MoHRE / Labour Court",           textAr: "تقديم شكوى لوزارة الموارد البشرية / محكمة العمل",    isCorrect: true  },
              { textEn: "Only approach through his country's embassy",          textAr: "التواصل فقط عبر سفارة بلده",                          isCorrect: false },
              { textEn: "No rights — gratuity only applies if employer agrees", textAr: "لا حقوق — المكافأة تنطبق فقط إذا وافق صاحب العمل",  isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 12  FAMILY MAJLIS — Family money
  // ══════════════════════════════════════════════════════════════════
  {
    id: "family-majlis", slug: "family-majlis", orderIndex: 12,
    nameEn: "Family Majlis", nameAr: "مجلس العائلة",
    themeKey: "majlis",
    descriptionEn: "Money conversations for couples, kids, and UAE succession planning. Educational only, not financial advice.",
    descriptionAr: "محادثات المال للأزواج والأطفال والتخطيط للخلافة في الإمارات. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "The Conversation Nobody Has", titleAr: "المحادثة التي لا يجريها أحد", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Joint Finances", titleAr: "المالية المشتركة",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a 'financial compatibility' conversation before marriage about?",
            promptAr: "عمَّ تتمحور 'محادثة التوافق المالي' قبل الزواج؟",
            explanationEn: "Financial compatibility covers attitudes to saving vs spending, debt tolerance, who manages money, goals for the future, and disclosure of existing obligations (loans, liabilities). Misaligned money values are a leading cause of relationship stress. Having this conversation before marriage reduces surprises.",
            explanationAr: "التوافق المالي يشمل المواقف تجاه الادخار مقابل الإنفاق وتحمّل الديون ومن يدير المال والأهداف المستقبلية والإفصاح عن الالتزامات القائمة. عدم التوافق في القيم المالية سبب رئيسي للضغط في العلاقات.",
            choices: [
              { textEn: "Negotiating a wedding budget",                              textAr: "التفاوض على ميزانية الزفاف",                           isCorrect: false },
              { textEn: "Aligning on saving habits, debt views, goals, and obligations", textAr: "التوافق على عادات الادخار والنظرة للديون والأهداف والالتزامات", isCorrect: true  },
              { textEn: "Deciding who earns more to manage finances",               textAr: "تحديد من يكسب أكثر لإدارة المالية",                   isCorrect: false },
              { textEn: "Signing a prenuptial agreement",                           textAr: "توقيع عقد ما قبل الزواج",                             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the 'yours, mine, ours' approach to couple finances?",
            promptAr: "ما هو نهج 'لك ولي ولنا' في مالية الزوجين؟",
            explanationEn: "In this approach, each partner keeps an individual account for personal spending, while contributions flow into a joint account for shared expenses (rent, groceries, bills). It balances financial autonomy with shared responsibility and reduces money conflict.",
            explanationAr: "في هذا النهج، يحتفظ كل شريك بحساب فردي للإنفاق الشخصي، بينما تتدفق المساهمات إلى حساب مشترك للمصاريف المشتركة. يوازن بين الاستقلالية المالية والمسؤولية المشتركة.",
            choices: [
              { textEn: "Merging all finances into one account",                        textAr: "دمج جميع الأموال في حساب واحد",                        isCorrect: false },
              { textEn: "Individual accounts plus a joint account for shared expenses", textAr: "حسابات فردية مع حساب مشترك للمصاريف المشتركة",        isCorrect: true  },
              { textEn: "The higher earner controls all finances",                     textAr: "من يكسب أكثر يتحكم في جميع الأموال",                   isCorrect: false },
              { textEn: "Keeping finances completely separate always",                 textAr: "إبقاء الأموال منفصلة تماماً في جميع الأوقات",          isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam and her husband have a combined income of AED 35,000/month. Their shared expenses are AED 22,000. How much is available for joint savings and individual spending?",
            promptAr: "مريم وزوجها لديهما دخل مشترك ٣٥٬٠٠٠ درهم/شهر. مصاريفهما المشتركة ٢٢٬٠٠٠ درهم. كم يتبقى للادخار المشترك والإنفاق الفردي؟",
            explanationEn: "AED 35,000 − AED 22,000 = AED 13,000 remaining. This can be split between joint savings goals and personal discretionary spending for each partner. Agreeing on an allocation prevents conflict about 'who spends what.'",
            explanationAr: "٣٥٬٠٠٠ − ٢٢٬٠٠٠ = ١٣٬٠٠٠ درهم متبقية. يمكن تقسيمها بين أهداف الادخار المشترك والإنفاق التقديري الشخصي لكل شريك.",
            choices: [
              { textEn: "AED 10,000", textAr: "١٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 13,000", textAr: "١٣٬٠٠٠ درهم", isCorrect: true  },
              { textEn: "AED 15,000", textAr: "١٥٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 8,000",  textAr: "٨٬٠٠٠ درهم",  isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "UAE Succession Planning", titleAr: "التخطيط للخلافة في الإمارات",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What happens to a Muslim expat's UAE assets if they die without a registered will?",
            promptAr: "ماذا يحدث لأصول المغترب المسلم في الإمارات إذا توفي دون وصية مسجّلة؟",
            explanationEn: "Without a registered will, UAE Shariah succession law applies to a Muslim's assets. This means distribution follows Islamic inheritance rules (e.g., fixed shares for spouse, children, parents). This may not reflect the deceased's personal wishes and can cause significant delays and disputes.",
            explanationAr: "بدون وصية مسجّلة، تطبّق قواعد الميراث الشرعي الإسلامي على أصول المسلم. هذا يعني التوزيع وفق قواعد الإرث الإسلامية (حصص محددة للزوج والأطفال والوالدين). قد لا يعكس هذا رغبات المتوفى الشخصية وقد يتسبب في تأخيرات ونزاعات.",
            choices: [
              { textEn: "Assets pass automatically to the spouse",             textAr: "تنتقل الأصول تلقائياً للزوج/الزوجة",                  isCorrect: false },
              { textEn: "UAE Shariah succession law applies",                  textAr: "تطبّق قواعد الميراث الشرعي الإسلامي الإماراتية",      isCorrect: true  },
              { textEn: "Assets are frozen permanently by the court",          textAr: "الأصول تُجمَّد بشكل دائم من قِبل المحكمة",            isCorrect: false },
              { textEn: "The home country's law applies to all UAE assets",    textAr: "يطبّق قانون البلد الأصلي على جميع الأصول الإماراتية",  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the main benefit of registering a will with the DIFC Wills Service in Dubai for non-Muslim expats?",
            promptAr: "ما الفائدة الرئيسية من تسجيل وصية في خدمة وصايا مركز دبي المالي الدولي لغير المسلمين المغتربين؟",
            explanationEn: "The DIFC Wills Service allows non-Muslim expats to register an English-law will in Dubai that applies UAE's common law principles. Assets can be distributed according to personal wishes — not local default succession rules. It provides legal certainty and faster estate administration.",
            explanationAr: "تتيح خدمة وصايا DIFC للمغتربين غير المسلمين تسجيل وصية بموجب القانون الإنجليزي في دبي تطبّق مبادئ القانون العام الإماراتية. يمكن توزيع الأصول وفق الرغبات الشخصية — لا وفق قواعد الخلافة الافتراضية.",
            choices: [
              { textEn: "Avoid all inheritance taxes",                            textAr: "تجنب جميع ضرائب الميراث",                              isCorrect: false },
              { textEn: "Distribute assets by personal choice under English-law principles", textAr: "توزيع الأصول وفق الاختيار الشخصي بموجب مبادئ القانون الإنجليزي", isCorrect: true  },
              { textEn: "Gain UAE permanent residency for beneficiaries",         textAr: "الحصول على إقامة دائمة في الإمارات للمستفيدين",         isCorrect: false },
              { textEn: "Automatically transfer assets before death",             textAr: "نقل الأصول تلقائياً قبل الوفاة",                       isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "At what age is it generally recommended to start teaching children about money?",
            promptAr: "في أي عمر يُوصى عموماً بالبدء في تعليم الأطفال عن المال؟",
            explanationEn: "Research and child development experts suggest money concepts can begin as early as age 3-4 — starting with the idea that things cost money. By age 6-7, children can understand saving for a goal. Formal budget discussions are appropriate by early teens. Early financial education has lasting impact.",
            explanationAr: "تشير الأبحاث وخبراء تطوير الطفل إلى إمكانية البدء في مفاهيم المال منذ سن ٣-٤ — بالبدء بفكرة أن الأشياء تكلف مالاً. بحلول ٦-٧ سنوات، يستطيع الأطفال فهم الادخار لهدف.",
            choices: [
              { textEn: "Only after age 16 when they can earn",           textAr: "فقط بعد سن ١٦ عندما يستطيعون الكسب",                isCorrect: false },
              { textEn: "From age 3–4 with simple concepts",             textAr: "من سن ٣-٤ بمفاهيم بسيطة",                         isCorrect: true  },
              { textEn: "Only when they ask about money",                textAr: "فقط عندما يسألون عن المال",                        isCorrect: false },
              { textEn: "When they start university",                    textAr: "عندما يبدأون الجامعة",                             isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Family Finance Plan", titleAr: "خطة مالية عائلية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal and his wife have a combined income of AED 40,000 and combined expenses of AED 32,000. They want to save for their child's university (needed in 15 years, target AED 300,000). How much/month is needed just for this goal (ignoring returns)?",
            promptAr: "فيصل وزوجته لديهما دخل مشترك ٤٠٬٠٠٠ درهم ومصاريف مشتركة ٣٢٬٠٠٠ درهم. يريدان الادخار لجامعة ابنهما (بعد ١٥ سنة، الهدف ٣٠٠٬٠٠٠ درهم). كم يلزم شهرياً لهذا الهدف فقط (مع تجاهل العوائد)؟",
            explanationEn: "AED 300,000 ÷ (15 × 12) = AED 300,000 ÷ 180 = AED 1,667/month. They have AED 8,000 surplus, so this is achievable. With investment returns, the required monthly amount would be even lower.",
            explanationAr: "٣٠٠٬٠٠٠ ÷ (١٥ × ١٢) = ٣٠٠٬٠٠٠ ÷ ١٨٠ = ١٬٦٦٧ درهم/شهر. لديهم فائض ٨٬٠٠٠ درهم، لذا هذا قابل للتحقيق.",
            choices: [
              { textEn: "AED 1,000/month", textAr: "١٬٠٠٠ درهم/شهر", isCorrect: false },
              { textEn: "AED 1,667/month", textAr: "١٬٦٦٧ درهم/شهر", isCorrect: true  },
              { textEn: "AED 2,500/month", textAr: "٢٬٥٠٠ درهم/شهر", isCorrect: false },
              { textEn: "AED 3,000/month", textAr: "٣٬٠٠٠ درهم/شهر", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A family emergency fund should be larger than a single person's. What is the general guidance for a family with two dependants?",
            promptAr: "صندوق طوارئ الأسرة يجب أن يكون أكبر من صندوق الفرد. ما التوجيه العام لعائلة بمعالَيْن؟",
            explanationEn: "For families, 6 months is the minimum target, with many advisors suggesting 9–12 months for households with children or a single income earner. Unexpected medical costs, school fees during a job gap, or visa complications can extend the period of financial stress significantly.",
            explanationAr: "للأسر، ٦ أشهر هو الحد الأدنى المستهدف، وكثير من المستشارين يقترحون ٩-١٢ شهراً للأسر التي لديها أطفال أو مصدر دخل واحد.",
            choices: [
              { textEn: "Same as a single person — 3 months",           textAr: "نفس الفرد — ٣ أشهر",                                isCorrect: false },
              { textEn: "At least 6 months, often 9–12 months",        textAr: "٦ أشهر على الأقل، كثيراً ما تكون ٩-١٢ شهراً",      isCorrect: true  },
              { textEn: "1 month per family member",                   textAr: "شهر واحد لكل فرد من أفراد الأسرة",                  isCorrect: false },
              { textEn: "Only required if one partner is unemployed",  textAr: "مطلوب فقط إذا كان أحد الشريكين عاطلاً",            isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE" as const, contentTrack: "NEUTRAL",
            promptEn: "Under UAE Labour Law, can an employer legally reduce an employee's gratuity if they were fired for cause?",
            promptAr: "بموجب قانون العمل الإماراتي، هل يمكن لصاحب العمل قانونياً تخفيض مكافأة نهاية خدمة الموظف المفصول لسبب؟",
            explanationEn: "Yes. Under the UAE Labour Law (Federal Decree-Law No. 33 of 2021), if an employee is terminated for serious misconduct reasons listed in the law (e.g., gross negligence, fraud), the employer may forfeit the gratuity entitlement partially or fully. Normal termination still entitles the employee to full gratuity.",
            explanationAr: "نعم. بموجب قانون العمل الإماراتي (المرسوم بقانون الاتحادي رقم ٣٣ لسنة ٢٠٢١)، إذا أُنهي عقد الموظف لأسباب مسلكية خطيرة محددة في القانون (الإهمال الجسيم والاحتيال)، يجوز لصاحب العمل مصادرة المكافأة جزئياً أو كلياً.",
            choices: [
              { textEn: "No — gratuity is always paid in full regardless of reason",     textAr: "لا — المكافأة تُدفع دائماً كاملةً بغض النظر عن السبب",  isCorrect: false },
              { textEn: "Yes — for serious misconduct listed in the Labour Law",         textAr: "نعم — في حالة مخالفات مسلكية خطيرة محددة في قانون العمل", isCorrect: true  },
              { textEn: "Only if the employee has less than 5 years of service",        textAr: "فقط إذا كانت خدمة الموظف أقل من ٥ سنوات",              isCorrect: false },
              { textEn: "Only if the employer files a police report first",             textAr: "فقط إذا قدّم صاحب العمل بلاغاً للشرطة أولاً",          isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Aisha wants to give her children a AED 500 monthly allowance. At what point should she tie some of it to chores or responsibility?",
            promptAr: "عائشة تريد إعطاء أطفالها بدل شهري ٥٠٠ درهم. في أي مرحلة يجب أن تربط جزءاً منه بالمهام أو المسؤولية؟",
            explanationEn: "Behavioural research suggests splitting allowance into two parts: a basic allowance (unconditional) to teach money management, and an earned portion tied to extra responsibilities. This teaches both budgeting AND the work-reward relationship. Full tying to chores can create transactional mindsets around family tasks.",
            explanationAr: "تُقترح الأبحاث السلوكية تقسيم البدل إلى جزأين: بدل أساسي (غير مشروط) لتعليم إدارة المال، وجزء مكتسب مرتبط بمسؤوليات إضافية. هذا يُعلّم الميزنة وعلاقة العمل-المكافأة معاً.",
            choices: [
              { textEn: "All AED 500 should be tied to completing every chore",          textAr: "يجب ربط ٥٠٠ درهم كاملة بإنجاز كل مهمة",                 isCorrect: false },
              { textEn: "A base allowance plus an earned portion for extra responsibilities", textAr: "بدل أساسي مع جزء مكتسب عن المسؤوليات الإضافية",   isCorrect: true  },
              { textEn: "No allowance until age 12",                                     textAr: "لا بدل حتى سن ١٢",                                       isCorrect: false },
              { textEn: "The full amount should always be unconditional",                textAr: "المبلغ الكامل يجب أن يكون غير مشروط دائماً",             isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 13  BRIDGE OF BORDERS — Remittance
  // ══════════════════════════════════════════════════════════════════
  {
    id: "bridge-of-borders", slug: "bridge-of-borders", orderIndex: 13,
    nameEn: "Bridge of Borders", nameAr: "جسر الحدود",
    themeKey: "bridge",
    descriptionEn: "Sending money home — exchange rates, fees, and safer channels. Educational only, not financial advice.",
    descriptionAr: "إرسال المال للوطن — أسعار الصرف والرسوم والقنوات الأكثر أماناً. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "The Hidden Cost of Sending Home", titleAr: "التكلفة الخفية لإرسال المال للوطن", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Exchange Rates & Margins", titleAr: "أسعار الصرف والهوامش",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "The AED is pegged to the US dollar. What does this mean for residents sending remittances?",
            promptAr: "الدرهم الإماراتي مربوط بالدولار الأمريكي. ماذا يعني هذا للمقيمين الذين يرسلون تحويلات؟",
            explanationEn: "The AED/USD peg (fixed at approximately AED 3.673 per USD since 1997) means USD-denominated transactions are stable from the AED side. However, AED still fluctuates against other currencies (PKR, INR, PHP, EGP etc.) reflecting those currencies' movement against USD.",
            explanationAr: "ربط الدرهم/الدولار (ثابت عند ~٣.٦٧٣ درهم لكل دولار منذ ١٩٩٧) يعني استقرار المعاملات المقوّمة بالدولار من جانب الدرهم. لكن الدرهم لا يزال يتقلب مقابل العملات الأخرى (الروبية الباكستانية والهندية والفلبينية والجنيه المصري).",
            choices: [
              { textEn: "The AED never fluctuates against any currency",           textAr: "الدرهم لا يتقلب أبداً مقابل أي عملة",                isCorrect: false },
              { textEn: "AED/USD is fixed; AED still moves vs other currencies",   textAr: "الدرهم/الدولار ثابت؛ الدرهم يتحرك مقابل العملات الأخرى", isCorrect: true  },
              { textEn: "The AED peg only applies to transactions over AED 10,000", textAr: "ربط الدرهم ينطبق فقط على المعاملات فوق ١٠٬٠٠٠ درهم",  isCorrect: false },
              { textEn: "All remittances from UAE are free because of the peg",    textAr: "جميع التحويلات من الإمارات مجانية بسبب الربط",        isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj sends AED 2,000 to India. Exchange house A charges AED 15 fee with a rate of 22.80 INR/AED. Exchange house B charges no fee with a rate of 22.40 INR/AED. Which is cheaper?",
            promptAr: "راج يرسل ٢٬٠٠٠ درهم إلى الهند. دار صرف A تُحمَّل ١٥ درهم رسوم بسعر ٢٢.٨٠ روبية/درهم. دار B لا تُحمَّل رسوماً بسعر ٢٢.٤٠ روبية/درهم. أيهما أرخص؟",
            explanationEn: "House A: 2,000 × 22.80 = 45,600 INR received (net of AED 15 fee = effectively 1,985 × 22.80 = 45,258 INR). House B: 2,000 × 22.40 = 44,800 INR. House A is cheaper by ~458 INR. The stated fee was misleading — House B's worse rate costs more. Always compare total INR received.",
            explanationAr: "دار A: ٢٬٠٠٠ × ٢٢.٨٠ = ٤٥٬٦٠٠ روبية (صافي الرسوم: فعلياً ١٬٩٨٥ × ٢٢.٨٠ = ٤٥٬٢٥٨ روبية). دار B: ٢٬٠٠٠ × ٢٢.٤٠ = ٤٤٬٨٠٠ روبية. دار A أرخص بـ~٤٥٨ روبية. قارن دائماً بإجمالي الروبية المستلمة.",
            choices: [
              { textEn: "Exchange house B — no fee charged",                    textAr: "دار صرف B — لا رسوم",                                isCorrect: false },
              { textEn: "Exchange house A — better total amount received",      textAr: "دار صرف A — مبلغ إجمالي مستلم أفضل",                isCorrect: true  },
              { textEn: "Both are identical",                                   textAr: "كلاهما متطابقان",                                    isCorrect: false },
              { textEn: "Cannot be compared without knowing the bank rate",    textAr: "لا يمكن المقارنة دون معرفة سعر البنك",               isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does 'exchange rate margin' mean for a remittance provider?",
            promptAr: "ماذا يعني 'هامش سعر الصرف' لمزود التحويل المالي؟",
            explanationEn: "The exchange rate margin is the difference between the interbank ('mid-market') rate and the rate offered to the customer. If the mid-market rate is 22.90 INR/AED and the provider offers 22.40, the margin is 0.50 INR/AED — their hidden profit on each dirham exchanged.",
            explanationAr: "هامش سعر الصرف هو الفرق بين سعر ما بين البنوك (السعر المتوسط) والسعر المعروض للعميل. إذا كان السعر المتوسط ٢٢.٩٠ روبية/درهم ويعرض المزود ٢٢.٤٠، فالهامش ٠.٥٠ روبية/درهم — ربحهم الخفي.",
            choices: [
              { textEn: "The transfer fee expressed as a percentage",                  textAr: "رسوم التحويل معبّراً عنها كنسبة مئوية",               isCorrect: false },
              { textEn: "The gap between mid-market rate and the customer rate",       textAr: "الفجوة بين السعر المتوسط وسعر العميل",                isCorrect: true  },
              { textEn: "The daily fluctuation in exchange rates",                     textAr: "التقلب اليومي في أسعار الصرف",                       isCorrect: false },
              { textEn: "The bank's regulatory compliance cost",                       textAr: "تكلفة الامتثال التنظيمي للبنك",                     isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Safe & Smart Transfers", titleAr: "تحويلات آمنة وذكية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which of these is NOT a safe, regulated channel for sending money from the UAE?",
            promptAr: "أيٌّ من التالي ليس قناة آمنة ومُنظَّمة لإرسال المال من الإمارات؟",
            explanationEn: "Informal hawala networks, while traditional and sometimes quick, operate outside regulatory oversight. If money disappears, there is no legal recourse. Licensed banks, regulated exchange houses (licensed by CBUAE), and registered fintech apps are safe options.",
            explanationAr: "شبكات الحوالة غير الرسمية، رغم طابعها التقليدي وسرعتها أحياناً، تعمل خارج الرقابة التنظيمية. إذا اختفت الأموال، لا يوجد سند قانوني.",
            choices: [
              { textEn: "A CBUAE-licensed exchange house",            textAr: "دار صرف مُرخَّصة من المصرف المركزي",              isCorrect: false },
              { textEn: "Your UAE bank's international wire service",  textAr: "خدمة التحويل الدولي لبنكك الإماراتي",             isCorrect: false },
              { textEn: "An informal hawala agent with no licence",   textAr: "وكيل حوالة غير رسمي بدون ترخيص",                isCorrect: true  },
              { textEn: "A regulated fintech app with CBUAE licence", textAr: "تطبيق تكنولوجيا مالية مُنظَّم بترخيص المصرف المركزي", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What does IBAN stand for and why is it required for international transfers?",
            promptAr: "ماذا يعني الـ IBAN ولماذا مطلوب للتحويلات الدولية؟",
            explanationEn: "IBAN = International Bank Account Number. It is a standardised code that uniquely identifies a bank account internationally, including country code, bank code, and account number. Most European, GCC, and many Asian countries require an IBAN to process transfers correctly and avoid misdirected payments.",
            explanationAr: "IBAN = رقم الحساب المصرفي الدولي. هو رمز موحّد يُعرَّف به الحساب المصرفي دولياً بشكل فريد. تشترطه معظم الدول الأوروبية ودول الخليج وكثير من الدول الآسيوية.",
            choices: [
              { textEn: "International Banking Account Notification",                   textAr: "إشعار الحساب المصرفي الدولي",                            isCorrect: false },
              { textEn: "International Bank Account Number — uniquely identifies accounts globally", textAr: "رقم الحساب المصرفي الدولي — يُعرَّف الحسابات عالمياً بشكل فريد", isCorrect: true  },
              { textEn: "Interbank Automated Number for routing",                       textAr: "رقم آلي بين البنوك للتوجيه",                              isCorrect: false },
              { textEn: "It's not required — SWIFT code is sufficient",                textAr: "غير مطلوب — رمز SWIFT كافٍ",                              isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam wants to time a large remittance to benefit from a better exchange rate. Which strategy is most practical?",
            promptAr: "مريم تريد توقيت تحويل كبير للاستفادة من سعر صرف أفضل. أي استراتيجية هي الأكثر عملية؟",
            explanationEn: "Setting a rate alert (available on many exchange house apps) notifies you when the rate hits your target, removing the need to monitor constantly. Trying to perfectly time the market is difficult. For large transfers, splitting into 2-3 smaller amounts over a few weeks can also average out rate volatility.",
            explanationAr: "ضبط تنبيه بالسعر (متاح في كثير من تطبيقات دور الصرف) يُعلمك عندما يصل السعر لهدفك، دون الحاجة للمراقبة المستمرة.",
            choices: [
              { textEn: "Wait indefinitely for the perfect rate",                      textAr: "الانتظار إلى أجل غير مسمى للسعر المثالي",              isCorrect: false },
              { textEn: "Set a rate alert and transfer when the target rate is hit",   textAr: "ضبط تنبيه بالسعر والتحويل عند الوصول للسعر المستهدف",  isCorrect: true  },
              { textEn: "Always transfer on the 1st of the month",                    textAr: "التحويل دائماً في الأول من الشهر",                      isCorrect: false },
              { textEn: "Transfer only in USD regardless of destination currency",    textAr: "التحويل بالدولار فقط بغض النظر عن عملة الوجهة",        isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Remittance Optimizer", titleAr: "مُحسِّن التحويلات",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal sends AED 3,000 to Pakistan each month. He pays AED 25 fee plus a 1.2% FX margin vs mid-market. How much does he spend annually on transfer costs (fees + margin)?",
            promptAr: "فيصل يرسل ٣٬٠٠٠ درهم إلى باكستان كل شهر. يدفع ٢٥ درهم رسوم مع هامش صرف ١.٢٪ مقابل السعر المتوسط. كم ينفق سنوياً على تكاليف التحويل (رسوم + هامش)؟",
            explanationEn: "Monthly margin cost: 1.2% × AED 3,000 = AED 36. Monthly fee: AED 25. Monthly total: AED 61. Annual: AED 61 × 12 = AED 732. Optimising to a provider with 0.5% margin and AED 10 fee would save roughly AED 300/year.",
            explanationAr: "تكلفة الهامش الشهرية: ١.٢٪ × ٣٬٠٠٠ = ٣٦ درهم. الرسوم الشهرية: ٢٥ درهم. الإجمالي الشهري: ٦١ درهم. السنوي: ٦١ × ١٢ = ٧٣٢ درهم.",
            choices: [
              { textEn: "AED 300",  textAr: "٣٠٠ درهم",  isCorrect: false },
              { textEn: "AED 500",  textAr: "٥٠٠ درهم",  isCorrect: false },
              { textEn: "AED 732",  textAr: "٧٣٢ درهم",  isCorrect: true  },
              { textEn: "AED 1,200", textAr: "١٬٢٠٠ درهم", isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "An unlicensed money transfer operator (informal hawala) promises a much better rate than banks. What is the main risk?",
            promptAr: "مشغّل تحويل أموال غير مُرخَّص (حوالة غير رسمية) يعد بسعر أفضل بكثير من البنوك. ما الخطر الرئيسي؟",
            explanationEn: "Using an unlicensed operator means no regulatory protection. If the operator disappears, commits fraud, or is shut down, your money is gone with no legal recourse. In the UAE, using unlicensed money transfer services is also illegal and can result in personal legal liability.",
            explanationAr: "استخدام مشغّل غير مُرخَّص يعني غياب الحماية التنظيمية. إذا اختفى المشغّل أو اغتصب أو أُغلق، ذهبت أموالك دون سند قانوني. في الإمارات، استخدام خدمات تحويل أموال غير مُرخَّصة غير قانوني أيضاً.",
            choices: [
              { textEn: "The rate might change between agreement and payment",     textAr: "قد يتغير السعر بين الاتفاق والدفع",                   isCorrect: false },
              { textEn: "No regulatory protection — no recourse if money is lost", textAr: "لا حماية تنظيمية — لا سند قانوني إذا ضاعت الأموال",  isCorrect: true  },
              { textEn: "The transfer will be delayed by 30 days",                textAr: "سيتأخر التحويل ٣٠ يوماً",                              isCorrect: false },
              { textEn: "The recipient will be taxed on receipt",                 textAr: "سيُفرض على المستلم ضريبة عند الاستلام",               isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which factor is most important when comparing two licensed exchange houses for a remittance?",
            promptAr: "أي عامل هو الأهم عند مقارنة دارَي صرف مُرخَّصتَين للتحويل؟",
            explanationEn: "Total amount received by the beneficiary is the only figure that truly matters. It incorporates both the stated fee AND the exchange rate margin. Always ask 'How many [currency] will my family receive?' and compare that number — not individual fee or rate components in isolation.",
            explanationAr: "إجمالي المبلغ الذي يتلقاه المستفيد هو الرقم الوحيد الذي يهم فعلاً. يتضمن الرسوم المُعلنة وهامش سعر الصرف معاً. اسأل دائماً 'كم [عملة] ستتلقى عائلتي؟' وقارن هذا الرقم.",
            choices: [
              { textEn: "Which house has the lowest stated transfer fee",         textAr: "أي دار تُعلن أدنى رسوم تحويل",                      isCorrect: false },
              { textEn: "Which house has the highest advertised exchange rate",   textAr: "أي دار تُعلن أعلى سعر صرف",                         isCorrect: false },
              { textEn: "Total amount the recipient will actually receive",       textAr: "إجمالي المبلغ الذي سيتلقاه المستلم فعلياً",          isCorrect: true  },
              { textEn: "How fast the transfer completes",                        textAr: "مدى سرعة اكتمال التحويل",                           isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What information is typically required to send an international bank transfer from UAE?",
            promptAr: "ما المعلومات المطلوبة عادةً لإرسال تحويل بنكي دولي من الإمارات؟",
            explanationEn: "Standard international transfer requirements: recipient full name, bank name, IBAN or account number, SWIFT/BIC code, bank branch address, and sometimes the purpose of transfer. Incorrect or incomplete details cause delays or returned transfers, often with a fee deducted.",
            explanationAr: "متطلبات التحويل الدولي القياسي: الاسم الكامل للمستفيد واسم البنك ورقم الـ IBAN أو الحساب ورمز SWIFT/BIC وعنوان فرع البنك وأحياناً الغرض من التحويل.",
            choices: [
              { textEn: "Only the recipient's phone number",                          textAr: "رقم هاتف المستفيد فقط",                               isCorrect: false },
              { textEn: "Recipient name, bank, IBAN/account, SWIFT code",             textAr: "اسم المستفيد والبنك وIBAN/الحساب ورمز SWIFT",         isCorrect: true  },
              { textEn: "Only the recipient's national ID number",                    textAr: "رقم الهوية الوطنية للمستفيد فقط",                      isCorrect: false },
              { textEn: "No details needed — the recipient's country handles routing", textAr: "لا تفاصيل مطلوبة — بلد المستفيد يتولى التوجيه",       isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 14  SCAM SENTINEL — Fraud awareness
  // ══════════════════════════════════════════════════════════════════
  {
    id: "scam-sentinel", slug: "scam-sentinel", orderIndex: 14,
    nameEn: "Scam Sentinel", nameAr: "حارس الاحتيال",
    themeKey: "sentinel",
    descriptionEn: "Phishing, PDC fraud, investment scams, and how to report financial crime in UAE. Educational only, not financial advice.",
    descriptionAr: "التصيد الاحتيالي وشيكات التاريخ الآجل والاحتيال الاستثماري وكيفية الإبلاغ عن الجرائم المالية في الإمارات. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "How Scams Are Engineered", titleAr: "كيف تُهندَس عمليات الاحتيال", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Phishing & Social Engineering", titleAr: "التصيد الاحتيالي والهندسة الاجتماعية",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is 'phishing'?",
            promptAr: "ما هو 'التصيد الاحتيالي' (phishing)؟",
            explanationEn: "Phishing is a fraud technique using fake emails, messages, or websites that impersonate a legitimate organisation (bank, government, courier). The goal is to trick you into clicking a link and entering your credentials, account numbers, or OTPs — which are then stolen.",
            explanationAr: "التصيد الاحتيالي تقنية احتيال تستخدم رسائل بريد إلكتروني أو رسائل أو مواقع ويب مزيفة تنتحل صفة منظمة شرعية (بنك أو حكومة أو شركة بريد). الهدف إقناعك بالنقر على رابط وإدخال بياناتك.",
            choices: [
              { textEn: "A legal way to transfer money internationally",           textAr: "طريقة قانونية لتحويل الأموال دولياً",                   isCorrect: false },
              { textEn: "Fake messages impersonating organisations to steal credentials", textAr: "رسائل مزيفة تنتحل صفة منظمات لسرقة البيانات",       isCorrect: true  },
              { textEn: "A type of unsolicited marketing email",                   textAr: "نوع من رسائل التسويق غير المطلوبة",                   isCorrect: false },
              { textEn: "A government cybersecurity warning system",               textAr: "نظام حكومي للتحذير من الأمن السيبراني",                isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "You receive a WhatsApp message from your 'manager' saying they need an urgent AED 5,000 bank transfer and will reimburse you tomorrow. What should you do?",
            promptAr: "تتلقى رسالة WhatsApp من 'مديرك' يقول إنه يحتاج تحويل بنكي عاجل ٥٬٠٠٠ درهم وسيُعوّضك غداً. ماذا تفعل؟",
            explanationEn: "This is a classic 'CEO fraud' or 'WhatsApp impersonation' scam. Always verify by calling the supposed sender on their known number directly — not on the number that sent the WhatsApp. Scammers often clone profile pictures and names. Urgency is a deliberate pressure tactic.",
            explanationAr: "هذا احتيال 'المدير التنفيذي' الكلاسيكي. تحقق دائماً بالاتصال بالمُرسَل المزعوم على رقمه المعروف مباشرةً — لا على الرقم الذي أرسل الرسالة. الإلحاح تكتيك ضغط متعمد.",
            choices: [
              { textEn: "Transfer the money immediately to avoid inconveniencing your manager", textAr: "حوّل المال فوراً لتجنب إزعاج مديرك",            isCorrect: false },
              { textEn: "Call your manager directly on their known number to verify",          textAr: "اتصل بمديرك مباشرةً على رقمه المعروف للتحقق",   isCorrect: true  },
              { textEn: "Reply to the WhatsApp to confirm the request",                       textAr: "رد على الواتساب لتأكيد الطلب",                   isCorrect: false },
              { textEn: "Ask HR to transfer from the company account instead",                textAr: "اطلب من الموارد البشرية التحويل من حساب الشركة",  isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is 'vishing'?",
            promptAr: "ما هو الـ 'vishing'؟",
            explanationEn: "Vishing (voice phishing) is phone fraud where scammers call pretending to be your bank, police, courier, or government authority. They create urgency (e.g., 'your account is frozen', 'there's a warrant for your arrest') to pressure you into giving OTPs, card numbers, or transferring money.",
            explanationAr: "Vishing (التصيد الصوتي) هو احتيال هاتفي حيث يتصل المحتالون متظاهرين بأنهم بنكك أو الشرطة أو الحكومة. يخلقون إلحاحاً لإجبارك على إعطاء OTPs أو أرقام البطاقات أو تحويل الأموال.",
            choices: [
              { textEn: "Virtual banking done over video calls",                         textAr: "خدمات مصرفية افتراضية عبر مكالمات الفيديو",                 isCorrect: false },
              { textEn: "Phone fraud impersonating banks or authorities to extract credentials", textAr: "احتيال هاتفي ينتحل صفة البنوك أو السلطات لانتزاع البيانات", isCorrect: true  },
              { textEn: "A legitimate verification call from your bank",                textAr: "مكالمة تحقق مشروعة من بنكك",                              isCorrect: false },
              { textEn: "Voice-based login to your banking app",                        textAr: "تسجيل الدخول الصوتي لتطبيق مصرفيتك",                      isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "PDC Cheques & Financial Fraud", titleAr: "الشيكات الآجلة والاحتيال المالي",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is a PDC (Post-Dated Cheque) in the UAE context?",
            promptAr: "ما هو الشيك الآجل (PDC) في السياق الإماراتي؟",
            explanationEn: "A Post-Dated Cheque is a cheque issued with a future date. In the UAE, PDCs are widely used for rental contracts (12 post-dated cheques for 12 months) and instalment payments. They are legally binding instruments — writing a cheque you know will bounce is a criminal offence in UAE.",
            explanationAr: "الشيك الآجل هو شيك يُصدَر بتاريخ مستقبلي. في الإمارات، تُستخدم الشيكات الآجلة على نطاق واسع في عقود الإيجار (١٢ شيكاً آجلاً لـ١٢ شهراً) ومدفوعات الأقساط. إنها أدوات قانونية ملزمة.",
            choices: [
              { textEn: "A cheque that is pre-approved by the bank before writing",    textAr: "شيك مُعتمَد مسبقاً من البنك قبل كتابته",                isCorrect: false },
              { textEn: "A cheque with a future date — widely used for rent in UAE",   textAr: "شيك بتاريخ مستقبلي — يُستخدم على نطاق واسع للإيجار في الإمارات", isCorrect: true  },
              { textEn: "A digital payment order valid for 30 days",                   textAr: "أمر دفع رقمي صالح لـ٣٠ يوماً",                           isCorrect: false },
              { textEn: "A government-issued payment guarantee",                       textAr: "ضمان دفع حكومي الإصدار",                                 isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the legal consequence of a bounced (returned unpaid) cheque in the UAE?",
            promptAr: "ما العواقب القانونية للشيك المرتجع (غير مدفوع) في الإمارات؟",
            explanationEn: "In the UAE, issuing a cheque with insufficient funds is a criminal offence that can result in a travel ban, account freezes, and potentially imprisonment. The UAE Federal Decree-Law No. 14/2020 allows civil remedies, but the criminal dimension remains for wilful bounced cheques.",
            explanationAr: "في الإمارات، إصدار شيك بدون رصيد كافٍ جريمة جنائية يمكن أن تؤدي إلى حظر سفر وتجميد حسابات وسجن محتمل.",
            choices: [
              { textEn: "A small administrative fine only",                          textAr: "غرامة إدارية صغيرة فقط",                              isCorrect: false },
              { textEn: "Potential criminal charge, travel ban, and account freezes", textAr: "تهمة جنائية محتملة وحظر سفر وتجميد حسابات",          isCorrect: true  },
              { textEn: "No legal consequence — only the payee is affected",         textAr: "لا عواقب قانونية — المستفيد فقط يتأثر",               isCorrect: false },
              { textEn: "Automatic deduction from future salary via WPS",           textAr: "خصم تلقائي من الراتب المستقبلي عبر WPS",              isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam's landlord insists she gives 12 post-dated cheques instead of transferring rent monthly. What is her main financial risk?",
            promptAr: "يُصر مالك عقار مريم على إعطاء ١٢ شيكاً آجلاً بدلاً من التحويل الشهري. ما خطرها المالي الرئيسي؟",
            explanationEn: "Giving 12 PDCs means the landlord holds AED cheques for 12 months. If Mariam loses her job or faces cash flow issues in month 4, the cheque for month 6 may bounce — exposing her to criminal liability. She has less flexibility to exit a difficult situation than monthly payments would allow.",
            explanationAr: "إعطاء ١٢ شيكاً آجلاً يعني أن المالك يحتفظ بشيكات لـ١٢ شهراً. إذا فقدت مريم وظيفتها في الشهر الرابع، قد يُرتجع شيك الشهر السادس — مما يعرّضها للمسؤولية الجنائية.",
            choices: [
              { textEn: "Cheques cannot be used for rent — only bank transfer",          textAr: "لا يمكن استخدام الشيكات للإيجار — تحويل بنكي فقط",           isCorrect: false },
              { textEn: "If cash flow tightens, a bounced cheque creates criminal liability", textAr: "إذا ضاقت السيولة، الشيك المرتجع يُفضي إلى مسؤولية جنائية", isCorrect: true  },
              { textEn: "She must pay the full year's rent upfront as well",             textAr: "يجب عليها دفع إيجار السنة كاملةً مقدماً أيضاً",              isCorrect: false },
              { textEn: "PDCs automatically expire if the tenancy ends early",          textAr: "الشيكات الآجلة تنتهي تلقائياً إذا انتهى الإيجار مبكراً",     isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "BOSS",
        titleEn: "Scam ID Challenge", titleAr: "تحدي تحديد الاحتيال",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A stranger contacts you on social media claiming to be a successful trader offering 30% monthly returns on your investment with 'no risk'. What is this?",
            promptAr: "يتصل بك شخص غريب عبر وسائل التواصل الاجتماعي يدّعي أنه متداول ناجح ويعرض عوائد شهرية ٣٠٪ على استثمارك 'بدون مخاطر'. ما هذا؟",
            explanationEn: "30% monthly returns with 'no risk' is impossible — if such returns existed, global banks and hedge funds would use this strategy exclusively. This is a classic investment scam hallmark: unrealistic guaranteed returns. 30%/month = 360%/year = fraud.",
            explanationAr: "عوائد ٣٠٪ شهرياً 'بدون مخاطر' أمر مستحيل — لو وُجدت مثل هذه العوائد، لاستخدمتها البنوك العالمية وصناديق التحوط حصراً. هذه علامة احتيال استثماري كلاسيكية: عوائد مضمونة غير واقعية.",
            choices: [
              { textEn: "A legitimate arbitrage opportunity",              textAr: "فرصة مراجحة مشروعة",                          isCorrect: false },
              { textEn: "A classic investment scam with impossible returns", textAr: "احتيال استثماري كلاسيكي بعوائد مستحيلة",     isCorrect: true  },
              { textEn: "A regulated investment product from a new broker", textAr: "منتج استثماري مُنظَّم من وسيط جديد",          isCorrect: false },
              { textEn: "A real estate flipping opportunity",              textAr: "فرصة إعادة بيع عقارية",                      isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Someone calls claiming to be from your bank, knows your full name and partial card number, and asks you to confirm your OTP to 'prevent fraud'. What should you do?",
            promptAr: "يتصل شخص يدّعي أنه من بنكك، يعرف اسمك الكامل ورقم بطاقتك جزئياً، ويطلب تأكيد كلمة مرور لمرة واحدة (OTP) 'لمنع الاحتيال'. ماذا تفعل؟",
            explanationEn: "Banks NEVER ask for OTPs over the phone — OTPs are designed to authenticate actions YOU initiate. Knowing your name and partial card number can be obtained from data breaches. Hang up immediately and call your bank on the number printed on your card.",
            explanationAr: "البنوك لا تطلب NEVER كلمات مرور لمرة واحدة عبر الهاتف — OTPs مصممة لمصادقة الإجراءات التي تبادر أنت بها. أنهِ المكالمة فوراً واتصل ببنكك على الرقم المطبوع على بطاقتك.",
            choices: [
              { textEn: "Give the OTP — they know your card details so they are real",  textAr: "أعطِ OTP — يعرفون تفاصيل بطاقتك لذا هم حقيقيون",      isCorrect: false },
              { textEn: "Hang up and call your bank on the official card number",        textAr: "أنهِ المكالمة واتصل ببنكك على الرقم الرسمي للبطاقة",   isCorrect: true  },
              { textEn: "Ask them to hold while you check your banking app",            textAr: "اطلب منهم الانتظار بينما تفحص تطبيقك المصرفي",         isCorrect: false },
              { textEn: "Give only the last 4 digits of the OTP to be safe",           textAr: "أعطِ الأرقام الأربعة الأخيرة من OTP فقط للسلامة",       isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Where should you report a financial scam or bank fraud attempt in the UAE?",
            promptAr: "أين يجب الإبلاغ عن عملية احتيال مالي أو محاولة احتيال مصرفي في الإمارات؟",
            explanationEn: "Financial fraud in UAE can be reported to: the Dubai Police (cybercrime portal), Abu Dhabi Police, the Central Bank consumer protection department, and the eCrime portal (ecrime.ae). Your bank also has a 24/7 fraud hotline. Prompt reporting increases chances of fund recovery.",
            explanationAr: "يمكن الإبلاغ عن الاحتيال المالي في الإمارات لـ: شرطة دبي (بوابة الجرائم الإلكترونية) وشرطة أبوظبي وقسم حماية المستهلك في المصرف المركزي وبوابة eCrime (ecrime.ae). بنكك أيضاً لديه خط ساخن ٢٤/٧.",
            choices: [
              { textEn: "Only to Interpol internationally",                             textAr: "الإنتربول الدولي فقط",                                 isCorrect: false },
              { textEn: "Dubai/Abu Dhabi Police, CBUAE, or eCrime portal",             textAr: "شرطة دبي/أبوظبي أو المصرف المركزي أو بوابة eCrime",    isCorrect: true  },
              { textEn: "Nothing can be done — always keep it private",                textAr: "لا يمكن فعل شيء — احتفظ به طيّ الكتمان دائماً",       isCorrect: false },
              { textEn: "Report to your employer's IT department only",                textAr: "أبلغ قسم تقنية المعلومات في عملك فقط",                  isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "A deepfake video of a famous UAE businessperson is circulating on social media, endorsing a cryptocurrency investment. What is the key red flag?",
            promptAr: "فيديو مزيف (deepfake) لرجل أعمال إماراتي مشهور يتداول على وسائل التواصل الاجتماعي، يُزكّي استثماراً في العملات المشفرة. ما العلامة الحمراء الرئيسية؟",
            explanationEn: "Celebrity endorsements of 'guaranteed' investment returns — especially via social media — are a major red flag. Famous people are frequently impersonated using AI deepfakes to add credibility to scams. Always verify through official channels and be extremely sceptical of unsolicited investment opportunities.",
            explanationAr: "تزكية المشاهير لعوائد استثمارية 'مضمونة' — خاصةً عبر وسائل التواصل — علامة حمراء كبيرة. غالباً ما يُقلَّد الأشخاص المشهورون باستخدام الذكاء الاصطناعي deepfake لإضفاء المصداقية على عمليات الاحتيال.",
            choices: [
              { textEn: "Cryptocurrency is always a scam",                                textAr: "العملات المشفرة دائماً احتيال",                               isCorrect: false },
              { textEn: "Celebrity social media endorsements for 'guaranteed' returns",  textAr: "تزكيات مشاهير على وسائل التواصل لعوائد 'مضمونة'",           isCorrect: true  },
              { textEn: "The video was too short to be legitimate",                      textAr: "كان الفيديو قصيراً جداً ليكون شرعياً",                       isCorrect: false },
              { textEn: "The investment was not in AED",                                 textAr: "الاستثمار لم يكن بالدرهم الإماراتي",                         isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 15  GOAL GARDEN — Capstone
  // ══════════════════════════════════════════════════════════════════
  {
    id: "goal-garden", slug: "goal-garden", orderIndex: 15,
    nameEn: "Goal Garden", nameAr: "حديقة الأهداف",
    themeKey: "goal",
    descriptionEn: "Putting it all together — goal-based planning, net worth, and your personal financial map. Educational only, not financial advice.",
    descriptionAr: "تجميع كل شيء — التخطيط القائم على الأهداف وصافي الثروة وخريطتك المالية الشخصية. للأغراض التعليمية فقط، وليست نصيحة مالية.",
    isLocked: true,
    nodes: [
      { orderIndex: 1, kind: "STORY", titleEn: "Your Financial Map", titleAr: "خريطتك المالية", questions: [] },
      {
        orderIndex: 2, kind: "QUIZ",
        titleEn: "Goal-Based Planning", titleAr: "التخطيط القائم على الأهداف",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What makes a financial goal 'SMART'?",
            promptAr: "ما الذي يجعل الهدف المالي 'SMART'؟",
            explanationEn: "SMART = Specific, Measurable, Achievable, Relevant, Time-bound. 'Save more money' is not SMART. 'Save AED 30,000 for an emergency fund within 18 months by setting aside AED 1,667/month' is SMART. The time-bound element creates urgency and accountability.",
            explanationAr: "SMART = محدد وقابل للقياس وقابل للتحقيق وذو صلة ومحدود بوقت. 'توفير المزيد من المال' ليس SMART. 'توفير ٣٠٬٠٠٠ درهم لصندوق طوارئ خلال ١٨ شهراً بـ١٬٦٦٧ درهم/شهر' هو SMART.",
            choices: [
              { textEn: "Savings-Monitored-Annual-Realistic-Trending",               textAr: "ادخار-مراقَب-سنوي-واقعي-متطور",                         isCorrect: false },
              { textEn: "Specific-Measurable-Achievable-Relevant-Time-bound",        textAr: "محدد-قابل للقياس-قابل للتحقيق-ذو صلة-محدود بوقت",     isCorrect: true  },
              { textEn: "Secure-Managed-Automated-Regulated-Tested",                 textAr: "آمن-مُدار-آلي-مُنظَّم-مُختبَر",                          isCorrect: false },
              { textEn: "A goal approved by a financial advisor",                    textAr: "هدف مُعتمَد من مستشار مالي",                            isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which of these should be the FIRST financial priority before investing?",
            promptAr: "أيٌّ من التالي يجب أن يكون الأولوية المالية الأولى قبل الاستثمار؟",
            explanationEn: "The financial priorities sequence: (1) Emergency fund — no buffer means any shock forces debt; (2) High-interest debt repayment; (3) Insurance against catastrophic risk; (4) Then investing. Investing before having an emergency fund is building on a foundation of sand.",
            explanationAr: "تسلسل الأولويات المالية: (١) صندوق الطوارئ — بدون احتياطي، أي صدمة تُجبرك على الاستدانة؛ (٢) سداد الديون عالية الفائدة؛ (٣) التأمين ضد المخاطر الكارثية؛ (٤) ثم الاستثمار.",
            choices: [
              { textEn: "Start investing in index funds",                            textAr: "البدء في الاستثمار في صناديق المؤشرات",                isCorrect: false },
              { textEn: "Build a 3–6 month emergency fund",                         textAr: "بناء صندوق طوارئ لـ٣-٦ أشهر",                        isCorrect: true  },
              { textEn: "Buy your own home",                                        textAr: "شراء منزلك الخاص",                                   isCorrect: false },
              { textEn: "Open a brokerage account",                                 textAr: "فتح حساب وساطة",                                     isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is 'net worth'?",
            promptAr: "ما هو 'صافي الثروة'؟",
            explanationEn: "Net worth = total assets minus total liabilities. Assets include cash, savings, property value, car value, investments. Liabilities include loan balances, credit card debt, mortgage. Tracking net worth monthly or annually is the best single metric of financial progress.",
            explanationAr: "صافي الثروة = إجمالي الأصول ناقص إجمالي الالتزامات. الأصول تشمل النقد والمدخرات وقيمة العقار والسيارة والاستثمارات. الالتزامات تشمل أرصدة القروض وديون بطاقات الائتمان والرهن.",
            choices: [
              { textEn: "Your monthly income minus expenses",            textAr: "دخلك الشهري ناقص المصاريف",                       isCorrect: false },
              { textEn: "Total assets minus total liabilities",          textAr: "إجمالي الأصول ناقص إجمالي الالتزامات",            isCorrect: true  },
              { textEn: "The value of everything you own",               textAr: "قيمة كل ما تملكه",                                isCorrect: false },
              { textEn: "Your credit score from the AECB",               textAr: "درجتك الائتمانية من مكتب الاتحاد",                isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 3, kind: "QUIZ",
        titleEn: "Integrating It All", titleAr: "تكامل كل شيء",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj earns AED 22,000/month, has AED 120,000 in savings, AED 55,000 outstanding on a car loan, and a AED 15,000 credit card balance. What is his approximate net worth from these items?",
            promptAr: "راج يكسب ٢٢٬٠٠٠ درهم/شهر، لديه مدخرات ١٢٠٬٠٠٠ درهم، ورصيد قرض سيارة متبقٍّ ٥٥٬٠٠٠ درهم، ورصيد بطاقة ائتمان ١٥٬٠٠٠ درهم. ما صافي ثروته التقريبي من هذه البنود؟",
            explanationEn: "Assets: AED 120,000 savings. Liabilities: AED 55,000 + AED 15,000 = AED 70,000. Net worth = AED 120,000 − AED 70,000 = AED 50,000. (Note: car value and other assets not included in this calculation — real net worth would be higher.)",
            explanationAr: "الأصول: ١٢٠٬٠٠٠ درهم مدخرات. الالتزامات: ٥٥٬٠٠٠ + ١٥٬٠٠٠ = ٧٠٬٠٠٠ درهم. صافي الثروة = ١٢٠٬٠٠٠ − ٧٠٬٠٠٠ = ٥٠٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 120,000", textAr: "١٢٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 50,000",  textAr: "٥٠٬٠٠٠ درهم",  isCorrect: true  },
              { textEn: "AED 70,000",  textAr: "٧٠٬٠٠٠ درهم",  isCorrect: false },
              { textEn: "AED 85,000",  textAr: "٨٥٬٠٠٠ درهم",  isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Mariam has an 85% DBR (debt payments are 85% of salary) and wants to save. Which should she do first?",
            promptAr: "مريم لديها نسبة DBR ٨٥٪ (مدفوعات الديون ٨٥٪ من راتبها) وتريد الادخار. ماذا يجب أن تفعل أولاً؟",
            explanationEn: "At 85% DBR, Mariam has almost no cash flow for saving. The priority must be reducing the debt load — through overpayments, consolidation, or income increase — before meaningful saving is possible. Trying to save while carrying this debt load is like pouring water into a leaking bucket.",
            explanationAr: "بنسبة DBR ٨٥٪، لدى مريم تدفق نقدي شبه معدوم للادخار. الأولوية يجب أن تكون تخفيض عبء الديون — بالسداد الزائد أو الدمج أو زيادة الدخل — قبل إمكانية الادخار الفعلي.",
            choices: [
              { textEn: "Open a savings account and contribute whatever she can",         textAr: "فتح حساب توفير والمساهمة بما تستطيع",                   isCorrect: false },
              { textEn: "Prioritise reducing debt to bring DBR to a manageable level",   textAr: "إعطاء الأولوية لتخفيض الديون لجعل DBR في مستوى قابل للإدارة", isCorrect: true  },
              { textEn: "Invest in equities for higher returns to cover her debts",      textAr: "الاستثمار في الأسهم لعوائد أعلى لتغطية ديونها",         isCorrect: false },
              { textEn: "Apply for a new personal loan to consolidate",                 textAr: "التقدم بقرض شخصي جديد للدمج",                           isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "What is the correct order of financial priorities for someone just starting out?",
            promptAr: "ما الترتيب الصحيح للأولويات المالية لشخص يبدأ للتو؟",
            explanationEn: "Recommended sequence: (1) Basic emergency fund (1 month) to avoid debt on small shocks; (2) Clear high-interest debt; (3) Build full emergency fund (3-6 months); (4) Mandatory insurance; (5) Long-term saving and investing. This order minimises financial risk at each stage.",
            explanationAr: "التسلسل الموصى به: (١) صندوق طوارئ أساسي (شهر واحد) لتجنب الديون على الصدمات الصغيرة؛ (٢) سداد الديون عالية الفائدة؛ (٣) بناء صندوق الطوارئ الكامل (٣-٦ أشهر)؛ (٤) التأمين الإلزامي؛ (٥) الادخار والاستثمار الطويل الأجل.",
            choices: [
              { textEn: "Invest first, then build emergency fund",                       textAr: "الاستثمار أولاً، ثم بناء صندوق الطوارئ",                  isCorrect: false },
              { textEn: "Basic emergency fund → clear high-interest debt → full fund → insurance → invest", textAr: "صندوق طوارئ أساسي → سداد الديون عالية الفائدة → الصندوق الكامل → التأمين → الاستثمار", isCorrect: true  },
              { textEn: "Buy property → then save",                                     textAr: "شراء عقار → ثم الادخار",                                 isCorrect: false },
              { textEn: "All goals are equal — spread money evenly",                    textAr: "جميع الأهداف متساوية — وزّع المال بالتساوي",             isCorrect: false },
            ],
          },
        ],
      },
      {
        orderIndex: 4, kind: "MINIGAME",
        titleEn: "Goal Prioritiser", titleAr: "محدد أولوية الأهداف",
        questions: [],
      },
      {
        orderIndex: 5, kind: "BOSS",
        titleEn: "Financial Master Challenge", titleAr: "تحدي السيد المالي",
        questions: [
          {
            orderIndex: 1, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Faisal (35, AED 28,000/month) has: AED 40,000 savings, AED 120,000 car loan (AED 3,500/month), AED 8,000 credit card balance, zero life insurance, rents at AED 8,500/month. What is his MOST critical financial gap?",
            promptAr: "فيصل (٣٥ سنة، ٢٨٬٠٠٠ درهم/شهر) لديه: مدخرات ٤٠٬٠٠٠ درهم وقرض سيارة ١٢٠٬٠٠٠ درهم (٣٬٥٠٠ درهم/شهر) ورصيد بطاقة ائتمان ٨٬٠٠٠ درهم وصفر تأمين على الحياة وإيجار ٨٬٥٠٠ درهم/شهر. ما أكبر ثغرة مالية لديه؟",
            explanationEn: "Faisal's AED 40,000 savings equals only about 5 months of expenses — just barely an emergency fund. He has zero life insurance (critical risk with likely dependants at 35). His DBR on car alone: AED 3,500 ÷ AED 28,000 = 12.5% — manageable. The most critical gap is no income protection / life insurance.",
            explanationAr: "مدخرات فيصل ٤٠٬٠٠٠ درهم تعادل ~٥ أشهر من المصاريف — صندوق طوارئ بالكاد كافٍ. لديه صفر تأمين على الحياة (خطر كبير مع احتمال وجود معالين بعمر ٣٥). الثغرة الأكثر أهمية هي غياب حماية الدخل / التأمين على الحياة.",
            choices: [
              { textEn: "He has too much cash in savings — should invest it all",        textAr: "لديه نقد كثير في المدخرات — يجب استثماره كله",           isCorrect: false },
              { textEn: "No life or income protection insurance",                       textAr: "لا تأمين على الحياة أو حماية الدخل",                    isCorrect: true  },
              { textEn: "His car loan DBR is too high",                                 textAr: "نسبة DBR لقرض سيارته مرتفعة جداً",                      isCorrect: false },
              { textEn: "He needs to buy property immediately",                         textAr: "يجب أن يشتري عقاراً فوراً",                             isCorrect: false },
            ],
          },
          {
            orderIndex: 2, kind: "SINGLE", contentTrack: "CONVENTIONAL",
            promptEn: "Aisha has a choice: invest AED 2,000/month in a savings product at 3% p.a., or use it to overpay her 3.5% p.a. reducing balance personal loan. Which is mathematically better?",
            promptAr: "عائشة لديها خيار: استثمار ٢٬٠٠٠ درهم/شهر في منتج ادخار بـ٣٪ سنوياً، أو استخدامه لزيادة سداد قرضها الشخصي بسعر ٣.٥٪ سنوياً رصيد متناقص. أيهما أفضل رياضياً؟",
            explanationEn: "Overpaying the 3.5% loan saves 3.5% guaranteed (risk-free debt reduction). The savings product earns 3% — less than the loan rate. Mathematically, debt reduction wins when the debt rate exceeds the savings rate. The margin here is small (0.5%) but the principle is clear.",
            explanationAr: "زيادة سداد القرض ٣.٥٪ توفر ٣.٥٪ مضمونة (تخفيض ديون بدون مخاطر). المنتج الادخاري يكسب ٣٪ — أقل من سعر القرض. رياضياً، تخفيض الديون يفوز عندما يتجاوز سعر الدين سعر المدخرات.",
            choices: [
              { textEn: "Investing in savings — returns are always better",              textAr: "الاستثمار في الادخار — العوائد دائماً أفضل",              isCorrect: false },
              { textEn: "Overpaying the loan — saves more than the savings rate earns", textAr: "زيادة سداد القرض — يوفر أكثر مما يكسبه الادخار",        isCorrect: true  },
              { textEn: "Both are identical — 3% and 3.5% are essentially the same",   textAr: "كلاهما متطابقان — ٣٪ و٣.٥٪ متشابهان أساساً",            isCorrect: false },
              { textEn: "Savings — because the money is accessible if needed",          textAr: "الادخار — لأن المال متاح إذا احتجته",                    isCorrect: false },
            ],
          },
          {
            orderIndex: 3, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Raj is reviewing his financial health. He has: savings 30k, investments 80k, car loan 45k, credit card 12k, emergency fund 20k (3 months). What is his net worth?",
            promptAr: "راج يراجع صحته المالية. لديه: مدخرات ٣٠٬٠٠٠، استثمارات ٨٠٬٠٠٠، قرض سيارة ٤٥٬٠٠٠، بطاقة ائتمان ١٢٬٠٠٠، صندوق طوارئ ٢٠٬٠٠٠ (٣ أشهر). ما صافي ثروته؟",
            explanationEn: "Assets: AED 30,000 + AED 80,000 + AED 20,000 = AED 130,000. Liabilities: AED 45,000 + AED 12,000 = AED 57,000. Net worth = AED 130,000 − AED 57,000 = AED 73,000.",
            explanationAr: "الأصول: ٣٠٬٠٠٠ + ٨٠٬٠٠٠ + ٢٠٬٠٠٠ = ١٣٠٬٠٠٠ درهم. الالتزامات: ٤٥٬٠٠٠ + ١٢٬٠٠٠ = ٥٧٬٠٠٠ درهم. صافي الثروة = ١٣٠٬٠٠٠ − ٥٧٬٠٠٠ = ٧٣٬٠٠٠ درهم.",
            choices: [
              { textEn: "AED 130,000", textAr: "١٣٠٬٠٠٠ درهم", isCorrect: false },
              { textEn: "AED 73,000",  textAr: "٧٣٬٠٠٠ درهم",  isCorrect: true  },
              { textEn: "AED 57,000",  textAr: "٥٧٬٠٠٠ درهم",  isCorrect: false },
              { textEn: "AED 83,000",  textAr: "٨٣٬٠٠٠ درهم",  isCorrect: false },
            ],
          },
          {
            orderIndex: 4, kind: "SINGLE", contentTrack: "NEUTRAL",
            promptEn: "Which single habit, sustained over 10+ years, has the biggest compounding effect on long-term wealth?",
            promptAr: "أي عادة واحدة، إذا استمرت لـ١٠+ سنوات، لها أكبر أثر مركّب على الثروة الطويلة الأجل؟",
            explanationEn: "Consistently spending less than you earn — and investing the difference — is the most powerful wealth-building habit. It sounds simple because it is. Every salary raise, bonus, or windfall that is saved rather than spent is compounded over decades into significantly larger future wealth.",
            explanationAr: "الإنفاق باستمرار أقل مما تكسب — واستثمار الفرق — هو أقوى عادة لبناء الثروة. يبدو بسيطاً لأنه كذلك. كل زيادة راتب أو مكافأة تُوفَّر بدلاً من إنفاقها تتراكم مركّبةً على مدى عقود.",
            choices: [
              { textEn: "Picking the highest-return investment each year",              textAr: "اختيار الاستثمار الأعلى عائداً كل عام",                  isCorrect: false },
              { textEn: "Consistently spending less than you earn and investing the gap", textAr: "الإنفاق باستمرار أقل مما تكسب واستثمار الفرق",          isCorrect: true  },
              { textEn: "Maximising credit card rewards",                               textAr: "زيادة مكافآت بطاقة الائتمان إلى أقصاها",               isCorrect: false },
              { textEn: "Refinancing your mortgage every 2 years",                     textAr: "إعادة تمويل رهنك العقاري كل سنتين",                     isCorrect: false },
            ],
          },
        ],
      },
    ],
  },
];
