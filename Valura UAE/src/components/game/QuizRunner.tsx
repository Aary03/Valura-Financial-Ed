"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Howl } from "howler";
import { getQuestionsForNode } from "@/lib/game/quiz-data";
import { quizRewards } from "@/lib/game/economy";
import { useGameStore, useToastStore } from "@/lib/game/store";
import { markNodeComplete } from "@/app/actions/progress";
import { recordMasteryAttempt, checkAndUpdateStreak } from "@/app/actions/kindness";
import QuestionCard from "./quiz/QuestionCard";
import ResultsScreen from "./quiz/ResultsScreen";
import type { QuizPhase, QuizResult } from "@/lib/game/quiz-types";

interface QuizRunnerProps {
  nodeId: string;
  locale?: string;
  /** Fires after the user taps "Continue your journey" on the results screen. */
  onComplete: (result: QuizResult) => void;
}

/**
 * Orchestrates the full quiz UX flow:
 *   question → (tap answer) → revealed → (Continue) → next question → results
 *
 * On completion:
 *   1. Computes rewards via economy.quizRewards()
 *   2. Writes XP + coins optimistically to useGameStore
 *   3. Fires +XP and +COINS toasts via useToastStore
 *   4. Calls markNodeComplete server action (non-blocking; stub until DB is wired)
 *   5. Notifies the parent via onComplete(result)
 *
 * Hard rules (never violate):
 *   - No timers.
 *   - No fail state — wrong answers advance to explanation, never a fail screen.
 *   - score = first-attempt correct count only.
 */
export default function QuizRunner({ nodeId, locale = "en", onComplete }: QuizRunnerProps) {
  const questions = getQuestionsForNode(nodeId);

  const [phase,        setPhase]        = useState<QuizPhase>("question");
  const [currentIdx,   setCurrentIdx]   = useState(0);
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Store hooks — called at the top level (Rules of Hooks)
  const awardXp    = useGameStore((s) => s.awardXp);
  const awardCoins = useGameStore((s) => s.awardCoins);
  const addToast   = useToastStore((s) => s.addToast);

  // Audio
  const dingRef     = useRef<Howl | null>(null);
  const tryAgainRef = useRef<Howl | null>(null);

  useEffect(() => {
    dingRef.current = new Howl({
      src: ["/audio/ding.mp3"], volume: 0.7, preload: true,
      onloaderror: () => {},
    });
    tryAgainRef.current = new Howl({
      src: ["/audio/try-again.mp3"], volume: 0.5, preload: true,
      onloaderror: () => {},
    });
    return () => { dingRef.current?.unload(); tryAgainRef.current?.unload(); };
  }, []);

  const handleAnswer = useCallback(
    (choiceId: string) => {
      if (phase !== "question" || !questions[currentIdx]) return;
      const isCorrect = choiceId === questions[currentIdx].correctId;
      setSelectedId(choiceId);
      setPhase("revealed");
      if (isCorrect) {
        setCorrectCount((c) => c + 1);
        dingRef.current?.play();
      } else {
        tryAgainRef.current?.play();
      }
    },
    [phase, currentIdx, questions],
  );

  const handleContinue = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedId(null);
      setPhase("question");
    } else {
      setPhase("results");
    }
  }, [currentIdx, questions.length]);

  // ── Empty state ────────────────────────────────────────────────────────────
  if (questions.length === 0) {
    const isAr = locale === "ar";
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
        <p className="font-heading text-base font-semibold" style={{ color: "#00111B" }}>
          {isAr ? "لا توجد أسئلة لهذه العقدة بعد." : "No questions for this node yet."}
        </p>
        <button
          className="rounded-xl px-6 py-3 font-heading text-sm font-bold text-cream"
          style={{ background: "#00111B" }}
          onClick={() => onComplete({ score: 0, total: 0, xpEarned: 0, coinsEarned: 0 })}
        >
          {isAr ? "العودة" : "Back"}
        </button>
      </div>
    );
  }

  // ── Results screen ─────────────────────────────────────────────────────────
  if (phase === "results") {
    const { xpEarned, coinsEarned } = quizRewards(correctCount, questions.length);
    const result: QuizResult = {
      score: correctCount,
      total: questions.length,
      xpEarned,
      coinsEarned,
    };

    const handleResultsContinue = () => {
      // 1. Optimistic store update
      awardXp(xpEarned);
      awardCoins(coinsEarned);

      // 2. Toast notifications
      addToast({ type: "xp",    amount: xpEarned,    label: "XP"        });
      addToast({ type: "coins", amount: coinsEarned, label: "VAL Coins" });

      // 3. Persist to server (non-blocking)
      const pct = questions.length <= 0 ? 0 : Math.round((correctCount / questions.length) * 100);
      void markNodeComplete(nodeId, pct, xpEarned, coinsEarned);

      // 4. Mastery + streak (non-blocking)
      const passed = correctCount >= Math.ceil(questions.length / 2);
      void recordMasteryAttempt(nodeId, passed).then((res) => {
        if (res.tierAdvanced && res.tier) {
          addToast({ type: "badge", amount: 0, label: `${res.tier} Mastery unlocked!` });
        }
      });
      void checkAndUpdateStreak().then((res) => {
        if (res.action === "freeze_used") {
          addToast({ type: "streak", amount: res.newStreak, label: "Streak Freeze used" });
        } else if (res.action === "incremented") {
          addToast({ type: "streak", amount: res.newStreak, label: "Streak!" });
        }
      });

      // 5. Notify parent (closes NodeModal)
      onComplete(result);
    };

    return (
      <ResultsScreen
        result={result}
        locale={locale}
        onComplete={handleResultsContinue}
      />
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const question = questions[currentIdx];
  return (
    <QuestionCard
      question={question}
      questionIndex={currentIdx}
      total={questions.length}
      phase={phase}
      selectedId={selectedId}
      locale={locale}
      onAnswer={handleAnswer}
      onContinue={handleContinue}
    />
  );
}
