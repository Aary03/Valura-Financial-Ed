"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import type {
  QuizQuestion,
  QuizChoice,
  QuizPhase,
} from "@/lib/game/quiz-types";
import SanadIcon, { type SanadIconMood } from "@/components/game/SanadIcon";
import SanadDialog from "@/components/game/SanadDialog";
import { getRandomLine } from "@/lib/game/sanad-lines";

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

interface AnswerCardProps {
  choice: QuizChoice;
  index: number;
  phase: QuizPhase;
  selectedId: string | null;
  correctId: string;
  locale: string;
  onTap: (id: string) => void;
}

function AnswerCard({
  choice,
  index,
  phase,
  selectedId,
  correctId,
  locale,
  onTap,
}: AnswerCardProps) {
  const isRevealed = phase === "revealed";
  const isSelected = choice.id === selectedId;
  const isCorrect = choice.id === correctId;

  const selectedAndWrong =
    isRevealed && isSelected && !isCorrect;
  const selectedAndCorrect =
    isRevealed && isSelected && isCorrect;
  const notSelectedButCorrect =
    isRevealed && !isSelected && isCorrect;
  const isDimmed = isRevealed && !isSelected && !isCorrect;

  const text = locale === "ar" ? choice.textAr : choice.textEn;
  const label = CHOICE_LABELS[index] ?? String(index + 1);

  const baseCls =
    "w-full flex items-start gap-4 rounded-2xl p-5 text-start transition-[border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4E3C8] border-2";

  let shell = "border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(0,17,27,0.04)] hover:border-[#05A049] hover:bg-[#F0F9F2]";
  let circleCls =
    "flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(180,227,200,0.35)] font-heading text-[14px] font-bold text-[#05A049]";
  let textCls = "flex-1 font-body text-[16px] leading-snug text-[#00111B]";
  let showCheck = !!(selectedAndCorrect || notSelectedButCorrect);

  if (!isRevealed && isSelected && choice.id === selectedId) {
    shell =
      "border-[3px] border-[#05A049] bg-[#F0F9F2] hover:border-[#05A049] hover:bg-[#F0F9F2]";
    circleCls =
      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#05A049] font-heading text-[14px] font-bold text-[#FFFFF8]";
  } else if (selectedAndWrong) {
    shell = "border-[3px] border-[#B4E3C8] bg-[#FFFFFC]";
    circleCls =
      "answer-mint-shake flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(180,227,200,0.45)] font-heading text-[14px] font-bold text-[#05A049]";
  } else if (selectedAndCorrect || notSelectedButCorrect) {
    shell =
      "border-[3px] border-[#05A049] bg-[#F0F9F2] hover:border-[#05A049] hover:bg-[#F0F9F2]";
    circleCls =
      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#05A049] font-heading text-[14px] font-bold text-[#FFFFF8]";
  } else if (isDimmed) {
    circleCls =
      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,17,27,0.06)] font-heading text-[14px] font-bold text-[#94A3B8]";
    textCls = "flex-1 font-body text-[16px] leading-snug text-[#94A3B8]";
  }


  return (
    <motion.button
      type="button"
      animate={
        selectedAndWrong
          ? {
              opacity: 1,
              x: [0, -5, 5, -4, 4, 0],
              transition: { duration: 0.45, type: "tween", ease: "easeInOut" },
            }
          : { opacity: isDimmed ? 0.55 : 1, x: 0 }
      }
      whileTap={!isRevealed ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${baseCls} ${shell}`}
      onClick={() => !isRevealed && onTap(choice.id)}
      disabled={isRevealed}
      aria-pressed={isSelected}
    >
      <span className={circleCls}>{label}</span>
      <span className={textCls}>{text}</span>
      {showCheck && (
        <Check className="size-5 shrink-0 text-[#05A049]" strokeWidth={2.5} aria-hidden />
      )}
    </motion.button>
  );
}

function ExplanationSlide({
  question,
  isCorrect,
  locale,
  onContinue,
  isLastQuestion,
}: {
  question: QuizQuestion;
  isCorrect: boolean;
  locale: string;
  onContinue: () => void;
  isLastQuestion: boolean;
}) {
  const isAr = locale === "ar";
  const body = isCorrect
    ? (isAr ? question.explanationCorrectAr : question.explanationCorrectEn)
    : (isAr ? question.explanationWrongAr : question.explanationWrongEn);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut", type: "tween" }}
      className="mt-6 rounded-2xl border-l-4 border-[#05A049] bg-[#F0F9F2] p-6"
    >
      <p
        className="font-heading text-sm font-bold"
        style={{ color: "#05A049" }}
      >
        {isAr ? "لماذا؟" : "Why?"}
      </p>
      <p
        className="mt-3 font-body text-[15px] leading-relaxed"
        style={{ color: "#1E293B" }}
      >
        {body}
      </p>
      <motion.button
        type="button"
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-heading text-base font-semibold text-[#FFFFF8] transition-colors hover:bg-[#0A2236] active:scale-[0.98]"
        style={{ background: "#00111B" }}
        whileTap={{ scale: 0.99 }}
        onClick={onContinue}
      >
        {isLastQuestion
          ? (isAr ? "اعرض النتائج" : "See results")
          : (isAr ? "متابعة" : "Continue")}
      </motion.button>
    </motion.div>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  total: number;
  phase: QuizPhase;
  selectedId: string | null;
  locale: string;
  onAnswer: (choiceId: string) => void;
  onContinue: () => void;
}

export default function QuestionCard({
  question,
  questionIndex,
  total,
  phase,
  selectedId,
  locale,
  onAnswer,
  onContinue,
}: QuestionCardProps) {
  const isAr = locale === "ar";
  const isRevealed = phase === "revealed";
  const isCorrect = selectedId === question.correctId;
  const isLast = questionIndex === total - 1;

  const sanadMood: SanadIconMood = !isRevealed
    ? "idle"
    : isCorrect
      ? "celebrating"
      : "curious";
  const [dialogLine, setDialogLine] = useState<string | null>(null);

  useEffect(() => {
    if (isRevealed) {
      setDialogLine(
        getRandomLine(
          isCorrect ? "onQuizCorrect" : "onQuizWrong",
          locale,
        ),
      );
    } else {
      setDialogLine(null);
    }
  }, [isRevealed, isCorrect, locale]);

  const questionText = isAr ? question.textAr : question.textEn;

  const barPct = ((questionIndex + 1) / total) * 100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        className="relative flex min-h-0 flex-col pb-28 pt-8 md:p-12"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut", type: "tween" }}
      >
        <div className="mb-8 px-8 md:px-12">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0F4F8]"
            role="progressbar"
            aria-valuenow={questionIndex + 1}
            aria-valuemax={total}
          >
            <motion.div
              className="h-full rounded-full bg-[#05A049]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(barPct, 100)}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <p className="mt-2 font-body text-[12px] font-medium uppercase tracking-wider text-[#94A3B8]">
            {isAr
              ? `السؤال ${questionIndex + 1} من ${total}`
              : `Question ${questionIndex + 1} of ${total}`}
          </p>
        </div>

        <h2 className="px-8 font-display text-[clamp(22px,4vw,28px)] font-bold leading-snug text-[#00111B] max-w-prose md:px-12 pe-28">
          {questionText}
        </h2>

        <div className="fixed bottom-8 end-8 z-[60] md:absolute md:bottom-12 md:end-12 lg:end-14">
          <div className="relative inline-flex">
            <SanadDialog
              text={dialogLine}
              onDismiss={() => setDialogLine(null)}
              align="end"
            />
            <div className="flex size-[4.5rem] shrink-0 scale-[0.67] items-center justify-center">
              <SanadIcon
                mood={sanadMood}
                size="lg"
                facing={isAr ? "left" : "right"}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 px-8 md:px-12">
          {question.choices.map((choice, i) => (
            <motion.div
              key={choice.id}
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.2,
                delay: i * 0.06,
                ease: "easeOut",
              }}
            >
              <AnswerCard
                choice={choice}
                index={i}
                phase={phase}
                selectedId={selectedId}
                correctId={question.correctId}
                locale={locale}
                onTap={onAnswer}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isRevealed && (
            <div className="mt-6 px-8 md:px-12">
              <ExplanationSlide
                question={question}
                isCorrect={isCorrect}
                locale={locale}
                onContinue={onContinue}
                isLastQuestion={isLast}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
