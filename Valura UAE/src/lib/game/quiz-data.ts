import type { QuizQuestion } from "./quiz-types";
import { QUESTIONS_W2_W3 } from "./quiz-data-w2-w3";
import { QUESTIONS_W4_W5 } from "./quiz-data-w4-w5";
import { QUESTIONS_W6_W7 } from "./quiz-data-w6-w7";
import { QUESTIONS_W8_W9 } from "./quiz-data-w8-w9";
import { QUESTIONS_W10_W11 } from "./quiz-data-w10-w11";
import { QUESTIONS_W12_W13 } from "./quiz-data-w12-w13";
import { QUESTIONS_W14_W15 } from "./quiz-data-w14-w15";

/**
 * Hardcoded quiz questions keyed by node ID.
 * Each question has full bilingual text (EN + AR).
 */
const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {

  // ── Marina Mile — Node 1: "What Is a Budget?" ────────────────────────────
  "mm-1": [
    {
      id: "mm-1-q1",
      nodeId: "mm-1",
      textEn:
        "Mariam earns AED 8,000 a month. Before she spends anything, she writes down what she needs to pay. What is this called?",
      textAr:
        "تكسب مريم ٨٬٠٠٠ درهم شهرياً. قبل أن تنفق أي شيء، تكتب ما تحتاج إلى دفعه. ما اسم هذا؟",
      choices: [
        { id: "a", textEn: "A loan statement",  textAr: "كشف قرض"       },
        { id: "b", textEn: "A budget",           textAr: "ميزانية"        },
        { id: "c", textEn: "A credit score",     textAr: "درجة ائتمانية" },
        { id: "d", textEn: "A tax return",       textAr: "إقرار ضريبي"   },
      ],
      correctId: "b",
      explanationCorrectEn:
        "A budget is a spending plan you make before the money moves. " +
        "Listing income vs. expected costs puts you in control — not the other way around. " +
        "Mariam's already thinking like a money manager.",
      explanationCorrectAr:
        "الميزانية هي خطة الإنفاق التي تضعها قبل أن تتحرك الأموال. " +
        "تدوين الدخل مقابل التكاليف المتوقعة يمنحك السيطرة الكاملة. " +
        "مريم تفكر بالفعل كمديرة مالية.",
      explanationWrongEn:
        "A budget is simply a plan that tells your money where to go — " +
        "instead of wondering where it went at month-end. " +
        "The other options are real financial terms, but none of them describe planning ahead.",
      explanationWrongAr:
        "الميزانية ببساطة هي خطة تخبر أموالك أين تذهب — " +
        "بدلاً من التساؤل أين ذهبت في نهاية الشهر. " +
        "الخيارات الأخرى مصطلحات مالية حقيقية، لكنها لا تصف التخطيط المسبق.",
    },
    {
      id: "mm-1-q2",
      nodeId: "mm-1",
      textEn:
        "Which of the following is an example of a FIXED monthly expense?",
      textAr:
        "أيٌّ من التالي يُعدّ مثالاً على نفقة شهرية ثابتة؟",
      choices: [
        { id: "a", textEn: "Weekly grocery shopping",         textAr: "التسوق الأسبوعي للبقالة"      },
        { id: "b", textEn: "Weekend outings and dining",      textAr: "نزهات نهاية الأسبوع والمطاعم" },
        { id: "c", textEn: "Monthly apartment rent",          textAr: "إيجار الشقة الشهري"           },
        { id: "d", textEn: "Variable streaming subscriptions", textAr: "اشتراكات البث المتغيرة"       },
      ],
      correctId: "c",
      explanationCorrectEn:
        "Fixed expenses are the same amount every month — rent, loan repayments, insurance premiums. " +
        "They're easy to plan around because you know the number in advance. " +
        "Raj always lists these first when helping friends build budgets.",
      explanationCorrectAr:
        "النفقات الثابتة هي نفس المبلغ كل شهر — الإيجار وأقساط القروض والتأمين. " +
        "سهل التخطيط لها لأنك تعرف الرقم مسبقاً. " +
        "يضعها راج دائماً في المقدمة عند مساعدة أصدقائه في وضع الميزانية.",
      explanationWrongEn:
        "Fixed expenses don't change month to month — rent is set by contract. " +
        "Groceries and outings are variable: they shift based on your choices each week. " +
        "Knowing which category an expense falls into makes budgeting much easier.",
      explanationWrongAr:
        "النفقات الثابتة لا تتغير من شهر لآخر — الإيجار محدد بالعقد. " +
        "البقالة والنزهات متغيرة: تتفاوت بناءً على خياراتك كل أسبوع. " +
        "معرفة أي فئة تنتمي إليها النفقة يجعل الميزنة أسهل كثيراً.",
    },
    {
      id: "mm-1-q3",
      nodeId: "mm-1",
      textEn:
        "Raj tells Mariam to 'pay herself first'. What does this mean?",
      textAr:
        "يطلب راج من مريم أن 'تدفع لنفسها أولاً'. ماذا يعني ذلك؟",
      choices: [
        { id: "a", textEn: "Spend freely and save whatever is left over",                    textAr: "أنفقي بحرية واحفظي ما تبقّى"                          },
        { id: "b", textEn: "Transfer savings to a separate account before paying other bills", textAr: "حوّلي المدخرات إلى حساب منفصل قبل دفع أي فاتورة أخرى" },
        { id: "c", textEn: "Ask your employer for an early salary advance",                   textAr: "اطلبي من صاحب العمل سلفة راتب مبكرة"                  },
        { id: "d", textEn: "Keep all your money as cash at home",                             textAr: "احتفظي بكل أموالك نقداً في المنزل"                    },
      ],
      correctId: "b",
      explanationCorrectEn:
        "'Pay yourself first' means savings happen automatically on payday — before rent, before groceries. " +
        "Moving money to a dedicated account removes the temptation to spend it. " +
        "Over time, this single habit builds more wealth than any investment tip.",
      explanationCorrectAr:
        "'ادفع لنفسك أولاً' يعني أن المدخرات تتم تلقائياً يوم الراتب — قبل الإيجار وقبل البقالة. " +
        "نقل الأموال إلى حساب مخصص يُزيل إغراء إنفاقها. " +
        "بمرور الوقت، هذه العادة الواحدة تبني ثروة أكبر من أي نصيحة استثمارية.",
      explanationWrongEn:
        "If you save 'whatever is left', there's usually nothing left. " +
        "'Pay yourself first' flips this: your savings transfer the moment your salary lands, " +
        "like a bill you owe your future self. Everything else gets what remains.",
      explanationWrongAr:
        "إذا ادخرت 'ما تبقّى'، لن يبقى شيء عادةً. " +
        "'ادفع لنفسك أولاً' يعكس هذا: تُحوَّل مدخراتك فور وصول راتبك، " +
        "كفاتورة مستحقة لنفسك في المستقبل. كل شيء آخر يحصل على ما يتبقى.",
    },
  ],
  // ── Marina Mile — Node 2: "The 50/30/20 Rule" ───────────────────────────────
  "mm-2": [
    {
      id: "mm-2-q1",
      nodeId: "mm-2",
      textEn:
        "Mariam earns AED 8,000 a month. Under the 50/30/20 rule, how much should go toward 'needs' like rent and groceries?",
      textAr:
        "تكسب مريم ٨٬٠٠٠ درهم شهرياً. وفق قاعدة ٥٠/٣٠/٢٠، كم يجب أن يذهب للـ'احتياجات' كالإيجار والبقالة؟",
      choices: [
        { id: "a", textEn: "AED 1,600", textAr: "١٬٦٠٠ درهم" },
        { id: "b", textEn: "AED 2,400", textAr: "٢٬٤٠٠ درهم" },
        { id: "c", textEn: "AED 4,000", textAr: "٤٬٠٠٠ درهم" },
        { id: "d", textEn: "AED 6,000", textAr: "٦٬٠٠٠ درهم" },
      ],
      correctId: "c",
      explanationCorrectEn:
        "50% of AED 8,000 = AED 4,000. Needs are non-negotiables: rent, food, transport, utilities. " +
        "If your needs exceed 50%, the first step is to look for ways to trim the biggest expense — usually rent.",
      explanationCorrectAr:
        "٥٠٪ من ٨٬٠٠٠ درهم = ٤٬٠٠٠ درهم. الاحتياجات هي غير القابلة للتفاوض: الإيجار والطعام والمواصلات والمرافق. " +
        "إذا تجاوزت احتياجاتك ٥٠٪، الخطوة الأولى هي البحث عن طرق لتقليص أكبر نفقة — عادةً الإيجار.",
      explanationWrongEn:
        "50% of AED 8,000 is AED 4,000 — reserved for true needs. " +
        "The 30% (AED 2,400) is for wants like dining out or hobbies. " +
        "The 20% (AED 1,600) is the savings and debt-repayment slice.",
      explanationWrongAr:
        "٥٠٪ من ٨٬٠٠٠ درهم تساوي ٤٬٠٠٠ درهم — مخصصة للاحتياجات الحقيقية. " +
        "الـ٣٠٪ (٢٬٤٠٠ درهم) للرغبات كتناول الطعام خارجاً أو الهوايات. " +
        "الـ٢٠٪ (١٬٦٠٠ درهم) شريحة المدخرات وسداد الديون.",
    },
    {
      id: "mm-2-q2",
      nodeId: "mm-2",
      textEn:
        "Which category does a Netflix subscription fall under in the 50/30/20 framework?",
      textAr:
        "في إطار ٥٠/٣٠/٢٠، تحت أي فئة يقع اشتراك نتفليكس؟",
      choices: [
        { id: "a", textEn: "Needs (50%)",          textAr: "احتياجات (٥٠٪)"        },
        { id: "b", textEn: "Wants (30%)",           textAr: "رغبات (٣٠٪)"           },
        { id: "c", textEn: "Savings (20%)",         textAr: "مدخرات (٢٠٪)"          },
        { id: "d", textEn: "It doesn't fit the rule", textAr: "لا تنطبق عليه القاعدة" },
      ],
      correctId: "b",
      explanationCorrectEn:
        "Wants are things that improve your life but you could live without. " +
        "Streaming, dining out, gym memberships — these all go in the 30% bucket. " +
        "The test: could you survive without it for a month? If yes, it's a want.",
      explanationCorrectAr:
        "الرغبات هي أشياء تُحسّن حياتك لكن يمكنك العيش بدونها. " +
        "البث والمطاعم وعضويات النادي — كلها تندرج في جزء الـ٣٠٪. " +
        "الاختبار: هل يمكنك الاستغناء عنه شهراً؟ إذا نعم، فهو رغبة.",
      explanationWrongEn:
        "Netflix is a want — enjoyable, but not essential to daily life. " +
        "Needs are things like food, shelter, transport to work, and basic utilities. " +
        "Savings are a separate category entirely — money set aside for your future.",
      explanationWrongAr:
        "نتفليكس رغبة — ممتع، لكن غير ضروري للحياة اليومية. " +
        "الاحتياجات هي أشياء كالطعام والمأوى والمواصلات للعمل والمرافق الأساسية. " +
        "المدخرات فئة منفصلة تماماً — أموال مخصصة لمستقبلك.",
    },
    {
      id: "mm-2-q3",
      nodeId: "mm-2",
      textEn:
        "Mariam's rent is AED 3,500, groceries AED 900, and transport AED 800 per month (income: AED 8,000). What does the 50/30/20 rule say?",
      textAr:
        "إيجار مريم ٣٬٥٠٠ درهم، بقالة ٩٠٠ درهم، ومواصلات ٨٠٠ درهم شهرياً (الدخل: ٨٬٠٠٠ درهم). ماذا تقول قاعدة ٥٠/٣٠/٢٠؟",
      choices: [
        { id: "a", textEn: "Her needs are within the 50% guideline",         textAr: "احتياجاتها ضمن حد الـ٥٠٪"            },
        { id: "b", textEn: "Her needs exceed the 50% guideline",             textAr: "احتياجاتها تتجاوز حد الـ٥٠٪"          },
        { id: "c", textEn: "Her needs are exactly at 50%",                   textAr: "احتياجاتها بالضبط عند ٥٠٪"            },
        { id: "d", textEn: "The rule only applies if income is above AED 10,000", textAr: "القاعدة تنطبق فقط إذا تجاوز الدخل ١٠٬٠٠٠ درهم" },
      ],
      correctId: "b",
      explanationCorrectEn:
        "AED 3,500 + 900 + 800 = AED 5,200 — that's 65% of income, well above the 50% target. " +
        "This is common in high-rent cities. The fix: negotiate rent, find a flatmate, or earn more. " +
        "Knowing you're over is the first step to fixing it.",
      explanationCorrectAr:
        "٣٬٥٠٠ + ٩٠٠ + ٨٠٠ = ٥٬٢٠٠ درهم — وهو ٦٥٪ من الدخل، أعلى بكثير من هدف الـ٥٠٪. " +
        "هذا شائع في المدن ذات الإيجارات المرتفعة. الحل: تفاوض على الإيجار، شارك شقة، أو زِد دخلك. " +
        "معرفة أنك تتجاوز الحد هي الخطوة الأولى لإصلاحه.",
      explanationWrongEn:
        "AED 3,500 + 900 + 800 = AED 5,200. Divided by AED 8,000 = 65%. " +
        "She's 15 percentage points over the 50% guideline for needs. " +
        "The rule is a target, not a law — but knowing you're over helps you plan.",
      explanationWrongAr:
        "٣٬٥٠٠ + ٩٠٠ + ٨٠٠ = ٥٬٢٠٠ درهم. مقسومة على ٨٬٠٠٠ = ٦٥٪. " +
        "هي تتجاوز حد الاحتياجات بـ١٥ نقطة مئوية. " +
        "القاعدة هدف وليس قانون — لكن معرفة تجاوزك تساعدك على التخطيط.",
    },
  ],

  // ── Marina Mile — Node 5: "Budget Boss Battle" ───────────────────────────────
  "mm-5": [
    {
      id: "mm-5-q1",
      nodeId: "mm-5",
      textEn:
        "Mariam has AED 8,000 income. Her needs total AED 4,200, wants AED 2,100, and she saves AED 1,700. Which 50/30/20 category is she MOST over budget in?",
      textAr:
        "دخل مريم ٨٬٠٠٠ درهم. احتياجاتها ٤٬٢٠٠ درهم، ورغباتها ٢٬١٠٠ درهم، وتدخر ١٬٧٠٠ درهم. في أي فئة تتجاوز الميزانية الأكثر؟",
      choices: [
        { id: "a", textEn: "Needs (target: AED 4,000)",   textAr: "احتياجات (هدف: ٤٬٠٠٠ درهم)"  },
        { id: "b", textEn: "Wants (target: AED 2,400)",   textAr: "رغبات (هدف: ٢٬٤٠٠ درهم)"    },
        { id: "c", textEn: "Savings (target: AED 1,600)", textAr: "مدخرات (هدف: ١٬٦٠٠ درهم)"   },
        { id: "d", textEn: "She is on track in all categories", textAr: "هي في المسار الصحيح في جميع الفئات" },
      ],
      correctId: "a",
      explanationCorrectEn:
        "Needs: AED 4,200 vs target AED 4,000 — over by 2.5%. " +
        "Wants: AED 2,100 vs target AED 2,400 — under budget. " +
        "Savings: AED 1,700 vs target AED 1,600 — above target. " +
        "Only needs is over, so that's the one to watch.",
      explanationCorrectAr:
        "احتياجات: ٤٬٢٠٠ مقابل هدف ٤٬٠٠٠ — تجاوز بنسبة ٢.٥٪. " +
        "رغبات: ٢٬١٠٠ مقابل هدف ٢٬٤٠٠ — ضمن الميزانية. " +
        "مدخرات: ١٬٧٠٠ مقابل هدف ١٬٦٠٠ — فوق الهدف. " +
        "الاحتياجات فقط هي المتجاوزة، لذا عليها مراقبتها.",
      explanationWrongEn:
        "Needs target = 50% × 8,000 = AED 4,000. Mariam spent AED 4,200 — she's AED 200 over. " +
        "Her wants (AED 2,100) and savings (AED 1,700) are actually better than target. " +
        "Small overruns in needs are common; the fix is usually the biggest line item — rent.",
      explanationWrongAr:
        "هدف الاحتياجات = ٥٠٪ × ٨٬٠٠٠ = ٤٬٠٠٠ درهم. أنفقت مريم ٤٬٢٠٠ — تجاوزت ٢٠٠ درهم. " +
        "رغباتها (٢٬١٠٠) ومدخراتها (١٬٧٠٠) أفضل من الهدف فعلياً. " +
        "التجاوزات الصغيرة في الاحتياجات شائعة؛ الحل عادةً أكبر بند — الإيجار.",
    },
    {
      id: "mm-5-q2",
      nodeId: "mm-5",
      textEn:
        "Raj challenges Mariam: 'If you saved AED 500 extra per month, how much would you have after one year?' She currently saves AED 1,600.",
      textAr:
        "تحدى راج مريم: 'لو ادخرت ٥٠٠ درهم إضافية شهرياً، كم ستمتلكين بعد سنة؟' هي تدخر حالياً ١٬٦٠٠ درهم.",
      choices: [
        { id: "a", textEn: "AED 6,000",  textAr: "٦٬٠٠٠ درهم"  },
        { id: "b", textEn: "AED 19,200", textAr: "١٩٬٢٠٠ درهم" },
        { id: "c", textEn: "AED 25,200", textAr: "٢٥٬٢٠٠ درهم" },
        { id: "d", textEn: "AED 12,600", textAr: "١٢٬٦٠٠ درهم" },
      ],
      correctId: "c",
      explanationCorrectEn:
        "New monthly savings = AED 1,600 + AED 500 = AED 2,100. " +
        "Over 12 months: AED 2,100 × 12 = AED 25,200. " +
        "That's a solid emergency fund — or a down payment on something meaningful.",
      explanationCorrectAr:
        "المدخرات الشهرية الجديدة = ١٬٦٠٠ + ٥٠٠ = ٢٬١٠٠ درهم. " +
        "على مدى ١٢ شهراً: ٢٬١٠٠ × ١٢ = ٢٥٬٢٠٠ درهم. " +
        "هذا صندوق طوارئ متين — أو دفعة أولى لشيء ذي معنى.",
      explanationWrongEn:
        "AED 1,600 (current) + AED 500 (extra) = AED 2,100/month. " +
        "Multiply by 12 months = AED 25,200 per year. " +
        "Small consistent increases compound into real money — that's the power of budgeting.",
      explanationWrongAr:
        "١٬٦٠٠ (حالي) + ٥٠٠ (إضافي) = ٢٬١٠٠ درهم/شهر. " +
        "اضرب في ١٢ شهراً = ٢٥٬٢٠٠ درهم سنوياً. " +
        "الزيادات الصغيرة المتسقة تتراكم لتصبح أموالاً حقيقية — هذه قوة الميزانية.",
    },
    {
      id: "mm-5-q3",
      nodeId: "mm-5",
      textEn:
        "Mariam's friend says the 50/30/20 rule is 'too rigid'. Which statement best describes how the rule should be used?",
      textAr:
        "صديقة مريم تقول أن قاعدة ٥٠/٣٠/٢٠ 'صارمة جداً'. أي عبارة تصف بشكل أفضل كيفية استخدام القاعدة؟",
      choices: [
        { id: "a", textEn: "It must be followed exactly every month or it fails", textAr: "يجب اتباعها بدقة كل شهر وإلا فشلت"           },
        { id: "b", textEn: "It's a starting framework, not a law — adjust ratios to your life", textAr: "إطار بداية وليس قانوناً — عدّل النسب لحياتك" },
        { id: "c", textEn: "It only works for people earning over AED 10,000",     textAr: "تعمل فقط لمن يكسب أكثر من ١٠٬٠٠٠ درهم"       },
        { id: "d", textEn: "You should use it only for the first year of budgeting", textAr: "استخدمها فقط في السنة الأولى من الميزنة"       },
      ],
      correctId: "b",
      explanationCorrectEn:
        "The 50/30/20 rule is a proven starting point, not a rigid law. " +
        "High-rent cities may push needs to 60%. A debt-repayment phase might mean 30% savings. " +
        "The skill is knowing your numbers — the percentages are just a compass.",
      explanationCorrectAr:
        "قاعدة ٥٠/٣٠/٢٠ نقطة بداية مجربة، وليست قانوناً صارماً. " +
        "قد تدفع المدن ذات الإيجارات المرتفعة الاحتياجات إلى ٦٠٪. مرحلة سداد الديون قد تعني ٣٠٪ مدخرات. " +
        "المهارة هي معرفة أرقامك — النسب مجرد بوصلة.",
      explanationWrongEn:
        "Any budgeting framework is a tool, not a rulebook. " +
        "Life in Dubai is expensive; strict 50% for needs isn't always possible. " +
        "The goal is intentional spending — knowing where every dirham goes, whatever the ratio.",
      explanationWrongAr:
        "أي إطار ميزنة هو أداة وليس كتاب قواعد. " +
        "الحياة في دبي مكلفة؛ ٥٠٪ صارمة للاحتياجات ليست دائماً ممكنة. " +
        "الهدف هو الإنفاق الواعي — معرفة أين يذهب كل درهم، مهما كانت النسبة.",
    },
  ],
};

/** Merged registry including all 15 worlds */
const ALL_QUESTIONS: Record<string, QuizQuestion[]> = {
  ...QUIZ_QUESTIONS,
  ...QUESTIONS_W2_W3,
  ...QUESTIONS_W4_W5,
  ...QUESTIONS_W6_W7,
  ...QUESTIONS_W8_W9,
  ...QUESTIONS_W10_W11,
  ...QUESTIONS_W12_W13,
  ...QUESTIONS_W14_W15,
};

/**
 * Returns questions for the given node ID.
 * Falls back to an empty array for nodes not yet seeded.
 */
export function getQuestionsForNode(nodeId: string): QuizQuestion[] {
  return ALL_QUESTIONS[nodeId] ?? [];
}

/** XP and coin rewards based on number of correct first-attempt answers */
export function calculateRewards(
  correctCount: number,
  total: number,
): { xpEarned: number; coinsEarned: number } {
  const xpEarned    = 25 + correctCount * 75 + (correctCount === total ? 50 : 0);
  const coinsEarned = 5  + correctCount * 10 + (correctCount === total ? 15 : 0);
  return { xpEarned, coinsEarned };
}
