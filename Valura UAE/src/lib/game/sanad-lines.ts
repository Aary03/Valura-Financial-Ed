/**
 * Sanad's dialog line banks — one object per context, each entry bilingual.
 *
 * Tone contract: dry, witty, peer. Never moralising, never guilt-y.
 * Lines should read like a smart friend, not a corporate chatbot.
 *
 * When Rive state-machine integration lands, these lines will be driven
 * by the same context keys (onQuizCorrect, onQuizWrong, etc.) so the
 * naming convention is intentionally Rive-input-compatible.
 */

export type SanadContext =
  | "onQuizCorrect"
  | "onQuizWrong"
  | "onLevelComplete"
  | "onStreakSave"
  | "onStreakFreezeUsed"
  | "onMasteryReviewDue"
  | "onWelcome";

interface BilingualLine {
  en: string;
  ar: string;
}

export const SANAD_LINES: Record<SanadContext, BilingualLine[]> = {

  onQuizCorrect: [
    { en: "Right. Future you just nodded.",            ar: "صحيح. نسخة المستقبل منك تومئ بالرأس."   },
    { en: "Clean. Next.",                              ar: "نظيف. التالي."                            },
    { en: "That tracks.",                              ar: "هذا منطقي."                               },
    { en: "Yep — that's the one.",                    ar: "أيوه — هذه هي."                           },
    { en: "Locked in.",                                ar: "حُفظ."                                    },
    { en: "Exactly.",                                  ar: "بالضبط."                                  },
  ],

  onQuizWrong: [
    { en: "Happens. Now you know.",                   ar: "يحدث. الآن تعرف."                         },
    { en: "Common slip. Here's the why.",             ar: "غلطة شائعة. إليك السبب."                 },
    { en: "Not it — but you're closer than you think.", ar: "ليست هي — لكنك أقرب مما تظن."          },
    { en: "Good attempt. Keep reading.",              ar: "محاولة جيدة. تابع."                       },
    { en: "Fair. The answer surprised most people.",  ar: "معقول. الإجابة فاجأت كثيرين."            },
  ],

  onLevelComplete: [
    { en: "World cleared. Roads ahead just lit up.",  ar: "العالم خُلِّص. الطرق الأمامية اضاءت."   },
    { en: "That's a wrap on this one.",               ar: "هذا الجزء انتهى."                         },
    { en: "On to the next.",                          ar: "للتالي."                                   },
    { en: "Solid work. You earned the next one.",     ar: "شغل متين. استحققت التالي."               },
  ],

  onStreakSave: [
    {
      en: "You skipped 3 days. Streak's still alive — I covered for you.",
      ar: "تغيّبت ٣ أيام. الستريك لا يزال حياً — غطيت عنك.",
    },
    {
      en: "Streak intact. Don't make a habit of it.",
      ar: "الستريك سليم. لا تعوّد نفسك على هذا.",
    },
  ],

  onWelcome: [
    { en: "Welcome back. Coffee, then a quiz?",       ar: "أهلاً بعودتك. قهوة، ثم اختبار؟"          },
    { en: "Where we left off…",                       ar: "من حيث توقفنا…"                           },
    { en: "You showed up. That's the hard part.",     ar: "أتيت. هذا هو الجزء الصعب."              },
    { en: "Ready when you are.",                      ar: "جاهز متى ما كنت."                         },
  ],

  onStreakFreezeUsed: [
    { en: "I covered for you. We're still on.",       ar: "غطيت عنك. لا يزال الستريك حياً."         },
    { en: "Freeze used. Don't make it a habit.",      ar: "استُخدم التجميد. لا تعوّد نفسك."         },
  ],

  onMasteryReviewDue: [
    { en: "One quick review and you've locked it in for 30 days.", ar: "مراجعة سريعة واحدة وستحفظها لـ30 يوماً." },
    { en: "Time to prove you still know this.",       ar: "حان وقت إثبات أنك لا تزال تتذكر."        },
    { en: "Review due. It takes two minutes.",        ar: "مراجعة مستحقة. تستغرق دقيقتين."          },
  ],

};

/**
 * Returns a random line for the given context in the requested locale.
 * Always returns a string — falls back to English if locale is unrecognised.
 */
export function getRandomLine(context: SanadContext, locale = "en"): string {
  const pool = SANAD_LINES[context];
  const pick  = pool[Math.floor(Math.random() * pool.length)];
  return locale === "ar" ? pick.ar : pick.en;
}
