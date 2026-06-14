"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import type { QuizQuestion } from "@/lib/atlas/types";
import { useProgress } from "@/lib/atlas/progress";

interface Props {
  quiz: QuizQuestion[];
  lessonId: string;
  next: { moduleSlug: string; lessonSlug: string; title: string } | null;
}

export default function LessonQuiz({ quiz, lessonId, next }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const markComplete = useProgress((s) => s.markComplete);
  const touchStreak = useProgress((s) => s.touchStreak);

  const q = quiz[idx];
  const revealed = picked !== null;

  const choose = useCallback(
    (choiceId: string) => {
      if (picked !== null) return;
      setPicked(choiceId);
      if (choiceId === q.correctId) setCorrectCount((c) => c + 1);
    },
    [picked, q],
  );

  const advance = useCallback(() => {
    if (idx < quiz.length - 1) {
      setIdx((i) => i + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  }, [idx, quiz.length]);

  useEffect(() => {
    if (done) {
      markComplete(lessonId);
      touchStreak();
    }
  }, [done, lessonId, markComplete, touchStreak]);

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((correctCount / quiz.length) * 100);
    const great = pct >= 67;
    return (
      <div className="card-dark mt-10 p-7 text-center animate-slide-up">
        <div
          className="animate-pop mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl"
          style={{ background: great ? "var(--accent-soft)" : "var(--amber-soft)" }}
        >
          <Trophy size={28} color={great ? "var(--accent)" : "var(--amber)"} />
        </div>
        <h3 className="font-heading" style={{ fontSize: 23, fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.01em" }}>
          {great ? "Lesson complete" : "Nice — lesson done"}
        </h3>
        <p className="mt-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: "var(--fg-2)" }}>
          You got <span style={{ color: "var(--accent-strong)", fontWeight: 700 }}>{correctCount}</span> of {quiz.length} right
          {!great && " — worth a quick re-read"}.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {next ? (
            <Link href={`/learn/${next.moduleSlug}/${next.lessonSlug}`} className="btn-primary">
              Next: {next.title} <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href="/learn" className="btn-primary">
              Back to curriculum <ArrowRight size={16} />
            </Link>
          )}
          <button onClick={restart} className="btn-ghost">
            <RotateCcw size={15} /> Retry quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark mt-10 p-6 sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <span className="chip chip-green">Knowledge check</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--fg-3)" }}>
          {idx + 1} / {quiz.length}
        </span>
      </div>

      <p className="font-heading" style={{ fontSize: 19, fontWeight: 700, color: "var(--fg)", lineHeight: 1.4 }}>
        {q.prompt}
      </p>

      <div className="mt-5 space-y-2.5">
        {q.choices.map((c) => {
          const isCorrect = c.id === q.correctId;
          const isPicked = c.id === picked;
          let border = "var(--line-2)";
          let bg = "var(--surface-2)";
          let icon = null;
          if (revealed && isCorrect) {
            border = "rgba(14,159,110,0.6)";
            bg = "var(--accent-soft)";
            icon = <Check size={18} color="var(--accent)" />;
          } else if (revealed && isPicked && !isCorrect) {
            border = "rgba(224,69,90,0.55)";
            bg = "var(--rose-soft)";
            icon = <X size={18} color="var(--rose)" />;
          }
          return (
            <button
              key={c.id}
              onClick={() => choose(c.id)}
              disabled={revealed}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-start transition-all"
              style={{
                border: `1.5px solid ${border}`,
                background: bg,
                cursor: revealed ? "default" : "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15.5,
                color: "var(--fg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span>{c.text}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-5 animate-fade-in">
          <p
            className="rounded-2xl p-4"
            style={{ background: "var(--sky-soft)", border: "1px solid rgba(12,140,224,0.22)", fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "#0b557f" }}
          >
            {q.explain}
          </p>
          <div className="mt-5 flex justify-end">
            <button onClick={advance} className="btn-primary">
              {idx < quiz.length - 1 ? "Next question" : "See result"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
