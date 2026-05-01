"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizResult } from "@/lib/game/quiz-types";
import ResultsScreen from "@/components/game/quiz/ResultsScreen";

// ── Types ─────────────────────────────────────────────────────────────────────

type BucketKey = "need" | "want" | "save";

interface ExpenseCard {
  id: string;
  emoji: string;
  labelEn: string;
  labelAr: string;
  amount: number;
  correct: BucketKey;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const EXPENSES: ExpenseCard[] = [
  { id: "rent",      emoji: "🏠", labelEn: "Rent",              labelAr: "إيجار",               amount: 7000, correct: "need" },
  { id: "groceries", emoji: "🛒", labelEn: "Groceries",          labelAr: "بقالة",               amount: 2500, correct: "need" },
  { id: "transport", emoji: "🚗", labelEn: "Transport / Salik",  labelAr: "مواصلات / سالك",      amount: 1200, correct: "need" },
  { id: "insurance", emoji: "🏥", labelEn: "Health insurance",   labelAr: "تأمين صحي",           amount: 900,  correct: "need" },
  { id: "dining",    emoji: "🍽️", labelEn: "Dining out",         labelAr: "تناول الطعام خارجاً", amount: 3500, correct: "want" },
  { id: "shopping",  emoji: "👗", labelEn: "Clothes & shopping", labelAr: "ملابس وتسوق",         amount: 1800, correct: "want" },
  { id: "stream",    emoji: "📱", labelEn: "Subscriptions",      labelAr: "اشتراكات",            amount: 600,  correct: "want" },
  { id: "savings",   emoji: "💰", labelEn: "Emergency savings",  labelAr: "مدخرات طوارئ",        amount: 2500, correct: "save" },
];

const TOTAL = EXPENSES.reduce((s, e) => s + e.amount, 0);

const BUCKETS: { key: BucketKey; en: string; ar: string; color: string; light: string; border: string; pct: number }[] = [
  { key: "need", en: "Need",  ar: "ضروري", color: "#059669", light: "#ECFDF5", border: "#A7F3D0", pct: 50 },
  { key: "want", en: "Want",  ar: "رغبة",  color: "#3B82F6", light: "#EFF6FF", border: "#BFDBFE", pct: 30 },
  { key: "save", en: "Save",  ar: "ادخار", color: "#D97706", light: "#FFFBEB", border: "#FDE68A", pct: 20 },
];

function calcResult(assignments: Record<string, BucketKey | null>): QuizResult {
  let correct = 0;
  for (const card of EXPENSES) {
    if (assignments[card.id] === card.correct) correct++;
  }
  return { score: correct, total: EXPENSES.length, xpEarned: correct * 15, coinsEarned: correct * 5 };
}

// ── Circular progress ─────────────────────────────────────────────────────────

function Ring({ pct, color, target }: { pct: number; color: string; target: number }) {
  const r = 22; const circ = 2 * Math.PI * r;
  const onTarget = Math.abs(pct - target) <= 8;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#E2E8F0" strokeWidth="4" />
      <motion.circle
        cx="28" cy="28" r={r} fill="none"
        stroke={onTarget ? color : "#94A3B8"}
        strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ rotate: "-90deg", transformOrigin: "28px 28px" }}
      />
      <text x="28" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill={onTarget ? color : "#64748B"}>
        {pct}%
      </text>
    </svg>
  );
}

// ── BudgetDragDrop ─────────────────────────────────────────────────────────────

interface BudgetDragDropProps {
  locale: string;
  onComplete: (result: QuizResult) => void;
}

export default function BudgetDragDrop({ locale, onComplete }: BudgetDragDropProps) {
  const isAr = locale === "ar";
  const [assignments, setAssignments] = useState<Record<string, BucketKey | null>>(
    Object.fromEntries(EXPENSES.map((e) => [e.id, null])),
  );
  const [submitted, setSubmitted]   = useState(false);
  const [result, setResult]         = useState<QuizResult | null>(null);
  const [selected, setSelected]     = useState<string | null>(null);

  const assigned = (key: BucketKey) => EXPENSES.filter((e) => assignments[e.id] === key);
  const doneCount = Object.values(assignments).filter(Boolean).length;
  const allDone   = doneCount === EXPENSES.length;

  function assign(cardId: string, bucket: BucketKey) {
    setAssignments((p) => ({ ...p, [cardId]: bucket }));
    setSelected(null);
  }

  function handleSubmit() {
    const r = calcResult(assignments);
    setResult(r);
    setSubmitted(true);
  }

  if (submitted && result) {
    return (
      <div className="flex flex-col gap-0">
        {/* Breakdown */}
        <div className="px-5 pt-4 pb-2">
          <p className="font-heading text-base font-bold text-center mb-3" style={{ color: "#00111B" }}>
            {isAr ? "تحليل ميزانيتك" : "Your budget breakdown"}
          </p>
          <div className="flex gap-2">
            {BUCKETS.map((b) => {
              const cards = EXPENSES.filter((e) => assignments[e.id] === b.key);
              const sum   = cards.reduce((s, c) => s + c.amount, 0);
              const pct   = Math.round((sum / TOTAL) * 100);
              return (
                <div
                  key={b.key}
                  className="flex-1 rounded-2xl p-3 flex flex-col items-center gap-2"
                  style={{ background: b.light, border: `1.5px solid ${b.border}` }}
                >
                  <Ring pct={pct} color={b.color} target={b.pct} />
                  <p className="font-heading text-xs font-bold" style={{ color: b.color }}>
                    {isAr ? b.ar : b.en}
                  </p>
                  <p className="font-body text-[10px] text-center" style={{ color: "#64748B" }}>
                    {isAr ? `الهدف ${b.pct}%` : `Target ${b.pct}%`}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {cards.map((c) => (
                      <span
                        key={c.id}
                        className="text-[10px] rounded-full px-2 py-0.5 font-body"
                        style={{
                          background: c.correct === b.key ? `${b.color}18` : "rgba(192,49,43,0.10)",
                          color: c.correct === b.key ? b.color : "#C0312B",
                        }}
                      >
                        {c.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center font-body text-[10px] mt-3" style={{ color: "#94A3B8" }}>
            {isAr ? "تعليمي فقط، ليس نصيحة مالية." : "Educational only, not financial advice."}
          </p>
        </div>
        <ResultsScreen result={result} locale={locale} onComplete={() => onComplete(result)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Gradient header ─────────────────────────────────────────── */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-body text-xs mb-0.5" style={{ color: "#B4E3C8" }}>
              {isAr ? "ميزانية شهرية" : "Monthly budget"}
            </p>
            <p className="font-heading text-2xl font-extrabold" style={{ color: "#FFFFFC" }}>
              AED {TOTAL.toLocaleString()}
            </p>
          </div>
          <div
            className="rounded-2xl px-3 py-1.5 font-heading text-xs font-bold"
            style={{ background: "rgba(5,160,73,0.20)", color: "#B4E3C8" }}
          >
            {isAr ? "قاعدة 50-30-20" : "50-30-20 rule"}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #05A049, #B4E3C8)" }}
              animate={{ width: `${(doneCount / EXPENSES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="font-body text-[11px] tabular-nums shrink-0" style={{ color: "#B4E3C8" }}>
            {doneCount}/{EXPENSES.length}
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        {/* Instruction */}
        <p className="font-body text-xs text-center mb-3" style={{ color: "#64748B" }}>
          {isAr
            ? "اضغط على بطاقة ثم اختر الدلو المناسب ↓"
            : "Tap a card, then pick the right bucket ↓"}
        </p>

        {/* ── Bucket targets ───────────────────────────────────────── */}
        <div className="flex gap-2 mb-4">
          {BUCKETS.map((b) => {
            const cards = assigned(b.key);
            const sum   = cards.reduce((s, c) => s + c.amount, 0);
            const isActive = selected !== null;
            return (
              <motion.button
                key={b.key}
                className="flex-1 rounded-2xl py-3 px-2 flex flex-col items-center gap-1 transition-all"
                style={{
                  background: isActive ? b.light : "#F8FAFC",
                  border: `2px solid ${isActive ? b.border : "rgba(0,17,27,0.08)"}`,
                  boxShadow: isActive ? `0 0 0 3px ${b.color}18` : "none",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selected && assign(selected, b.key)}
              >
                <span className="font-heading text-xs font-bold" style={{ color: b.color }}>
                  {isAr ? b.ar : b.en}
                </span>
                <span className="font-body text-[10px] tabular-nums" style={{ color: "#64748B" }}>
                  {sum > 0 ? `AED ${sum.toLocaleString()}` : `${b.pct}%`}
                </span>
                {/* Assigned card emoji chips */}
                <div className="flex flex-wrap justify-center gap-0.5 min-h-[18px]">
                  {cards.map((c) => (
                    <span key={c.id} className="text-sm">{c.emoji}</span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Expense cards ────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          {EXPENSES.map((card) => {
            const bucket = assignments[card.id];
            const bMeta  = bucket ? BUCKETS.find((b) => b.key === bucket) : null;
            const isSel  = selected === card.id;

            return (
              <motion.button
                key={card.id}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-start w-full"
                style={{
                  background: isSel
                    ? "rgba(5,160,73,0.06)"
                    : bMeta ? bMeta.light : "#F8FAFC",
                  border: `1.5px solid ${isSel ? "#05A049" : bMeta ? bMeta.border : "rgba(0,17,27,0.07)"}`,
                  boxShadow: isSel ? "0 0 0 3px rgba(5,160,73,0.12)" : "0 1px 3px rgba(0,17,27,0.06)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(isSel ? null : card.id)}
              >
                <span className="text-xl shrink-0">{card.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-semibold truncate" style={{ color: "#00111B" }}>
                    {isAr ? card.labelAr : card.labelEn}
                  </p>
                  {bMeta && (
                    <p className="font-body text-[11px]" style={{ color: bMeta.color }}>
                      → {isAr ? bMeta.ar : bMeta.en}
                    </p>
                  )}
                </div>
                <span className="font-heading text-sm font-bold tabular-nums shrink-0" style={{ color: "#D97706" }}>
                  AED {card.amount.toLocaleString()}
                </span>
                {isSel && (
                  <span className="text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0" style={{ background: "#05A049", color: "#fff" }}>
                    {isAr ? "اختر ↑" : "Pick ↑"}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Submit ───────────────────────────────────────────────── */}
        <motion.button
          disabled={!allDone}
          onClick={handleSubmit}
          className="w-full mt-4 rounded-2xl py-4 font-heading text-sm font-bold transition-all"
          style={{
            background: allDone
              ? "linear-gradient(135deg, #05A049 0%, #059669 100%)"
              : "#E2E8F0",
            color: allDone ? "#FFFFFC" : "#94A3B8",
            boxShadow: allDone ? "0 4px 14px rgba(5,160,73,0.3)" : "none",
          }}
          whileTap={allDone ? { scale: 0.97 } : {}}
        >
          {isAr ? "تحقق من ميزانيتي ✓" : "Check my budget ✓"}
        </motion.button>

        <p className="text-center font-body text-[10px] mt-2 mb-4" style={{ color: "#94A3B8" }}>
          {isAr ? "تعليمي فقط، ليس نصيحة مالية." : "Educational only, not financial advice."}
        </p>
      </div>
    </div>
  );
}
