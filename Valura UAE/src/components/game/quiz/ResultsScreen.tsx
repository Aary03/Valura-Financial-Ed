"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { QuizResult } from "@/lib/game/quiz-types";

// ── Coin SVG ──────────────────────────────────────────────────────────────────

function CoinSVG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9"   fill="#D4A95A" />
      <circle cx="9" cy="9" r="7"   fill="#C8963E" />
      <circle cx="9" cy="9" r="5"   fill="#D4A95A" opacity="0.55" />
      <text x="9" y="12.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFC">V</text>
    </svg>
  );
}

// ── CountUp ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, durationMs = 1400, startDelay = 0): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const delayId = setTimeout(() => {
      const startTime = performance.now();
      let raf: number;
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        setValue(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, startDelay);
    return () => clearTimeout(delayId);
  }, [target, durationMs, startDelay]);
  return value;
}

// ── Flying coins — fixed to use tween, uniform keyframe counts ────────────────

function FlyingCoins() {
  const count = 12;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{
            x: 90 + i * 6,
            y: -175 - i * 12,
            opacity: [0, 1, 0.92, 0],
            scale: [0.35, 1, 0.75, 0.4],
          }}
          transition={{
            delay: i * 0.06,
            duration: 1.1,
            ease: "easeOut",
            type: "tween",
          }}
        >
          <CoinSVG size={14} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Perfect-score badge ───────────────────────────────────────────────────────

function PerfectBadge({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <motion.div
      className="flex flex-col items-center gap-2 py-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.8 }}
    >
      <div
        className="flex size-16 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #D4A95A 0%, #A07C30 100%)",
          boxShadow: "0 0 28px rgba(212,169,90,0.45)",
        }}
      >
        <Star className="size-8 fill-white text-white" aria-hidden="true" />
      </div>
      <p className="font-heading text-sm font-bold" style={{ color: "#D4A95A" }}>
        {isAr ? "علامة مثالية — عمل راقٍ." : "Perfect score — calmly done."}
      </p>
    </motion.div>
  );
}

// ── Score ring ────────────────────────────────────────────────────────────────

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct  = total > 0 ? score / total : 0;
  const r    = 36;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#E2E8F0" strokeWidth="5" />
      <motion.circle
        cx="48" cy="48" r={r}
        fill="none"
        stroke={pct === 1 ? "#D4A95A" : pct >= 0.5 ? "#05A049" : "#64748B"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3, type: "tween" }}
        style={{ rotate: "-90deg", transformOrigin: "48px 48px" }}
      />
      <text x="48" y="44" textAnchor="middle" fontSize="22" fontWeight="800" fill="#00111B">
        {score}
      </text>
      <text x="48" y="61" textAnchor="middle" fontSize="11" fill="#64748B">
        / {total}
      </text>
    </svg>
  );
}

// ── ResultsScreen ─────────────────────────────────────────────────────────────

interface ResultsScreenProps {
  result: QuizResult;
  locale: string;
  onComplete: () => void;
}

export default function ResultsScreen({ result, locale, onComplete }: ResultsScreenProps) {
  const isAr     = locale === "ar";
  const isPerfect = result.score === result.total;
  const isGood    = result.score >= Math.ceil(result.total / 2);

  const xpDisplay   = useCountUp(result.xpEarned,    1200, 300);
  const coinDisplay = useCountUp(result.coinsEarned, 900,  500);

  const headerText = isPerfect
    ? (isAr ? "ممتاز!" : "World cleared!")
    : isGood
      ? (isAr ? "عمل رائع" : "Quiz complete!")
      : (isAr ? "انتهى الاختبار" : "Quiz complete");

  return (
    <div className="relative flex flex-col gap-5 px-5 pb-8 pt-6">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-12%] flex justify-center"
        initial={{ opacity: 0.15, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-hidden
      >
        <svg width="560" height="560" viewBox="0 0 560 560" className="max-w-[min(100vw,560px)]">
          <defs>
            <radialGradient id="goldBurst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4A95A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#D4A95A" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d={`M280 280 L280 40 ${280 + Math.cos(((i / 16) * 2 - 0.25) * Math.PI) * 240} ${280 + Math.sin(((i / 16) * 2 - 0.25) * Math.PI) * 240} Z`}
              fill="url(#goldBurst)"
              opacity={0.12 + (i % 4) * 0.03}
            />
          ))}
          <circle cx="280" cy="280" r="140" fill="url(#goldBurst)" opacity="0.06" />
        </svg>
      </motion.div>

      {/* ── Header + score ring ───────────────────────────────────── */}
      <motion.div
        className="flex flex-col items-center gap-3 py-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", type: "tween" }}
      >
        <ScoreRing score={result.score} total={result.total} />
        <h2 className="font-display text-[2.5rem] font-bold leading-tight" style={{ color: "#00111B" }}>
          {headerText}
        </h2>
        <p className="font-body text-sm" style={{ color: "#64748B" }}>
          {isAr
            ? `${result.score} من ${result.total} إجابة صحيحة`
            : `${result.score} of ${result.total} correct`}
        </p>
      </motion.div>

      {/* ── Rewards ───────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, type: "tween" }}
      >
        {/* XP */}
        <div
          className="flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-[#E2E8F0] bg-white py-7 shadow-[0_2px_8px_rgba(0,17,27,0.04)] max-w-[200px]"
          style={{
            background: "#FFFFFF",
          }}
        >
          <span className="font-body text-[12px] font-medium uppercase tracking-wider" style={{ color: "#94A3B8" }}>
            XP
          </span>
          <span className="font-display text-[2.25rem] font-bold tabular-nums" style={{ color: "#05A049" }}>
            +{xpDisplay}
          </span>
        </div>

        {/* Coins */}
        <div
          className="relative flex min-h-[128px] flex-1 flex-col items-center justify-end gap-2 overflow-visible rounded-2xl border border-[#E2E8F0] bg-white px-2 py-6 shadow-[0_2px_8px_rgba(0,17,27,0.04)] max-w-[200px]"
        >
          <FlyingCoins />
          <span className="font-body text-[12px] font-medium uppercase tracking-wider text-[#94A3B8]">
            {isAr ? "عملات VAL" : "VAL Coins"}
          </span>
          <span className="font-display text-[2.25rem] font-bold tabular-nums" style={{ color: "#D4A95A" }}>
            +{coinDisplay}
          </span>
        </div>
      </motion.div>

      {/* Perfect badge */}
      {isPerfect && <PerfectBadge locale={locale} />}

      {/* Encouragement */}
      {!isPerfect && (
        <motion.p
          className="text-center font-body text-xs leading-relaxed px-2"
          style={{ color: "#94A3B8" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, type: "tween" }}
        >
          {isAr
            ? "كل إجابة خاطئة هي درس. يمكنك المراجعة في أي وقت."
            : "Every wrong answer is a lesson. Review any time."}
        </motion.p>
      )}

      {/* Continue */}
      <motion.button
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-heading text-base font-semibold text-[#FFFFF8] transition-colors hover:bg-[#0A2236] active:scale-[0.98]"
        style={{ background: "#00111B" }}
        whileTap={{ scale: 0.99 }}
        onClick={onComplete}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "tween" }}
      >
        {isAr ? "متابعة رحلتك" : "Continue your journey"}
      </motion.button>
    </div>
  );
}
