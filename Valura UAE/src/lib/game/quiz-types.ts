/** Bilingual answer option */
export interface QuizChoice {
  id: string;
  textEn: string;
  textAr: string;
}

/** Single quiz question with all bilingual copy */
export interface QuizQuestion {
  id: string;
  /** The node this question belongs to (e.g. "mm-1") */
  nodeId: string;
  textEn: string;
  textAr: string;
  choices: QuizChoice[];
  correctId: string;
  /** Shown when user picks the correct answer */
  explanationCorrectEn: string;
  explanationCorrectAr: string;
  /** Shown when user picks a wrong answer */
  explanationWrongEn: string;
  explanationWrongAr: string;
}

/** Emitted by QuizRunner when the user finishes all questions */
export interface QuizResult {
  /** Number of questions answered correctly (first attempt per question) */
  score: number;
  total: number;
  xpEarned: number;
  coinsEarned: number;
}

/** Internal phase of the quiz flow */
export type QuizPhase = "question" | "revealed" | "results";
