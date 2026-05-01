"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingDown, TrendingUp } from "lucide-react";
import type { QuizResult } from "@/lib/game/quiz-types";
import ResultsScreen from "@/components/game/quiz/ResultsScreen";

// ── Math ───────────────────────────────────────────────────────────────────────

const PRINCIPAL = 50_000;

function calcLoan(principal: number, annualRatePct: number, tenureYears: number) {
  const n = tenureYears * 12;
  if (annualRatePct === 0) return { monthly: principal / n, totalPaid: principal, interest: 0 };
  const r       = annualRatePct / 100 / 12;
  const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total   = monthly * n;
  return { monthly, totalPaid: total, interest: total - principal };
}

// ── CountUp ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, ms = 500): number {
  const [val, setVal] = useState(target);
  useEffect(() => {
    const from  = val;
    const start = performance.now();
    let raf: number;
    const tick  = (now: number) => {
      const p    = Math.min((now - start) / ms, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ms]);
  return val;
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

function Tip({ text, color = "#3B82F6" }: { text: string; color?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="flex size-5 items-center justify-center rounded-full ms-1"
        style={{ background: `${color}18`, color }}
        aria-label="Info"
      >
        <Info className="size-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute start-full top-0 z-50 ms-2 w-56 rounded-2xl px-3.5 py-3 shadow-xl font-body text-[11px] leading-relaxed"
            style={{ background: "#00111B", color: "#B4E3C8", border: "1px solid rgba(180,227,200,0.15)" }}
            role="tooltip"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Styled range slider ───────────────────────────────────────────────────────

function Slider({
  id, min, max, step, value, onChange, color, isAr,
}: {
  id: string; min: number; max: number; step: number;
  value: number; onChange: (v: number) => void; color: string; isAr: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div dir={isAr ? "rtl" : "ltr"} className="relative py-1">
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
        style={{
          background: `linear-gradient(${isAr ? "to left" : "to right"}, ${color} ${pct}%, #E2E8F0 ${pct}%)`,
        }}
      />
    </div>
  );
}

// ── Comparison scenario row ───────────────────────────────────────────────────

function ScenarioRow({
  years, rate, active, locale,
}: { years: number; rate: number; active: boolean; locale: string }) {
  const isAr = locale === "ar";
  const { monthly, interest } = calcLoan(PRINCIPAL, rate, years);
  const interestRatio = Math.round((interest / PRINCIPAL) * 100);
  return (
    <div
      className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-all"
      style={{
        background: active ? "rgba(5,160,73,0.08)" : "#F8FAFC",
        border: `1px solid ${active ? "rgba(5,160,73,0.2)" : "rgba(0,17,27,0.06)"}`,
      }}
    >
      <div>
        <p className="font-heading text-xs font-semibold" style={{ color: active ? "#059669" : "#475569" }}>
          {years} {isAr ? (years === 1 ? "سنة" : "سنوات") : (years === 1 ? "yr" : "yrs")} · {rate}%
          {active && <span className="ms-1 text-[10px]">← {isAr ? "الآن" : "now"}</span>}
        </p>
      </div>
      <div className="text-end">
        <p className="font-heading text-xs font-bold tabular-nums" style={{ color: "#00111B" }}>
          AED {Math.round(monthly).toLocaleString()}{isAr ? "/شهر" : "/mo"}
        </p>
        <p className="font-body text-[10px] tabular-nums" style={{ color: "#C0312B" }}>
          +{interestRatio}% {isAr ? "فائدة" : "interest"}
        </p>
      </div>
    </div>
  );
}

// ── LoanSlider ────────────────────────────────────────────────────────────────

interface LoanSliderProps {
  locale: string;
  onComplete: (result: QuizResult) => void;
}

export default function LoanSlider({ locale, onComplete }: LoanSliderProps) {
  const isAr = locale === "ar";
  const [tenure, setTenure]         = useState(3);
  const [rate, setRate]             = useState(7);
  const [done, setDone]             = useState(false);
  const [movedTenure, setMT]        = useState(false);
  const [movedRate, setMR]          = useState(false);
  const tenureId = useId();
  const rateId   = useId();

  const { monthly, totalPaid, interest } = calcLoan(PRINCIPAL, rate, tenure);
  const piPct   = Math.round((PRINCIPAL / totalPaid) * 100);
  const intPct  = 100 - piPct;
  const explored = movedTenure && movedRate;

  const displayTotal   = useCountUp(Math.round(totalPaid));
  const displayMonthly = useCountUp(Math.round(monthly));
  const displayInt     = useCountUp(Math.round(interest));

  const result: QuizResult = {
    score: explored ? 1 : 0, total: 1,
    xpEarned: explored ? 40 : 20, coinsEarned: explored ? 12 : 6,
  };

  if (done) {
    return (
      <div className="px-5 pb-5 pt-2">
        <ResultsScreen result={result} locale={locale} onComplete={() => onComplete(result)} />
      </div>
    );
  }

  const savingYears  = Math.max(1, tenure - 1);
  const cheaperRate  = Math.max(3, rate - 2);

  return (
    <div className="flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Dark header with total ───────────────────────────────────── */}
      <div
        className="px-5 pt-5 pb-5"
        style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
      >
        <p className="font-body text-xs mb-1" style={{ color: "#B4E3C8" }}>
          {isAr ? `قرض بـ AED ${PRINCIPAL.toLocaleString()}` : `AED ${PRINCIPAL.toLocaleString()} loan`}
        </p>

        {/* Big total */}
        <div className="flex items-end gap-2 mb-4">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#64748B" }}>
              {isAr ? "إجمالي المدفوع" : "Total paid"}
            </p>
            <p className="font-heading text-4xl font-extrabold tabular-nums leading-none" style={{ color: "#FFFFFC" }}>
              AED {displayTotal.toLocaleString()}
            </p>
          </div>
          <div className="mb-1 ms-auto text-end">
            <p className="font-body text-[10px]" style={{ color: "#64748B" }}>{isAr ? "شهرياً" : "per month"}</p>
            <p className="font-heading text-xl font-bold tabular-nums" style={{ color: "#B4E3C8" }}>
              {displayMonthly.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Principal vs interest bar */}
        <div className="flex h-4 w-full overflow-hidden rounded-full mb-1.5">
          <motion.div
            style={{ background: "linear-gradient(90deg, #05A049, #059669)" }}
            animate={{ width: `${piPct}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.div
            style={{ background: "linear-gradient(90deg, #F97316, #C0312B)" }}
            animate={{ width: `${intPct}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 font-body text-[11px]" style={{ color: "#86EFAC" }}>
            <span className="inline-block size-2 rounded-sm" style={{ background: "#05A049" }} />
            {isAr ? "أصل القرض" : "Principal"} ({piPct}%)
          </span>
          <span className="flex items-center gap-1 font-body text-[11px]" style={{ color: "#FCA5A5" }}>
            {isAr ? "الفائدة" : "Interest"} ({intPct}%)
            <span className="inline-block size-2 rounded-sm" style={{ background: "#C0312B" }} />
          </span>
        </div>
      </div>

      <div className="px-5 pt-4 pb-2">
        {/* Interest cost callout */}
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4"
          style={{ background: interest > PRINCIPAL * 0.3 ? "#FFF1F2" : "#ECFDF5", border: `1px solid ${interest > PRINCIPAL * 0.3 ? "#FECACA" : "#A7F3D0"}` }}
        >
          {interest > PRINCIPAL * 0.3
            ? <TrendingUp className="size-5 shrink-0" style={{ color: "#C0312B" }} />
            : <TrendingDown className="size-5 shrink-0" style={{ color: "#059669" }} />
          }
          <p className="font-body text-xs leading-relaxed" style={{ color: "#374151" }}>
            {isAr
              ? `ستدفع AED ${displayInt.toLocaleString()} فائدة — ${Math.round((interest / PRINCIPAL) * 100)}% فوق قيمة القرض الأصلية`
              : `You'll pay AED ${displayInt.toLocaleString()} in interest — ${Math.round((interest / PRINCIPAL) * 100)}% on top of the original loan`}
          </p>
        </div>

        {/* ── Tenure slider ─────────────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <label htmlFor={tenureId} className="font-heading text-sm font-semibold" style={{ color: "#00111B" }}>
                {isAr ? "مدة القرض" : "Loan tenure"}
              </label>
              <Tip
                color="#3B82F6"
                text={isAr
                  ? "مدة أطول = قسط شهري أقل، لكن فائدة كلية أعلى."
                  : "Longer tenure = lower monthly payment, but more total interest."}
              />
            </div>
            <span
              className="rounded-xl px-3 py-1 font-heading text-sm font-bold"
              style={{ background: "#EFF6FF", color: "#3B82F6" }}
            >
              {tenure} {isAr ? (tenure === 1 ? "سنة" : "سنوات") : (tenure === 1 ? "year" : "years")}
            </span>
          </div>
          <Slider
            id={tenureId} min={1} max={10} step={1}
            value={tenure}
            onChange={(v) => { setTenure(v); setMT(true); }}
            color="#3B82F6" isAr={isAr}
          />
          <div className="flex justify-between font-body text-[10px] mt-1" style={{ color: "#94A3B8" }}>
            <span>1 {isAr ? "سنة" : "yr"}</span>
            <span>10 {isAr ? "سنوات" : "yrs"}</span>
          </div>
        </div>

        {/* ── Rate slider ───────────────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <label htmlFor={rateId} className="font-heading text-sm font-semibold" style={{ color: "#00111B" }}>
                {isAr ? "معدل الفائدة" : "Interest rate"}
              </label>
              <Tip
                color="#D97706"
                text={isAr
                  ? "في الإمارات: سقف DBR يحدّ أقساطك بـ 50% من راتبك."
                  : "UAE: DBR rule caps your total repayments at 50% of your salary."}
              />
            </div>
            <span
              className="rounded-xl px-3 py-1 font-heading text-sm font-bold"
              style={{ background: "#FFFBEB", color: "#D97706" }}
            >
              {rate}% {isAr ? "سنوياً" : "p.a."}
            </span>
          </div>
          <Slider
            id={rateId} min={3} max={10} step={0.5}
            value={rate}
            onChange={(v) => { setRate(v); setMR(true); }}
            color="#D97706" isAr={isAr}
          />
          <div className="flex justify-between font-body text-[10px] mt-1" style={{ color: "#94A3B8" }}>
            <span>3%</span><span>10%</span>
          </div>
        </div>

        {/* ── Scenario comparisons ─────────────────────────────────── */}
        <div className="mb-4">
          <p className="font-heading text-xs font-semibold mb-2" style={{ color: "#64748B" }}>
            {isAr ? "قارن السيناريوهات" : "Compare scenarios"}
          </p>
          <div className="flex flex-col gap-1.5">
            <ScenarioRow years={1}          rate={cheaperRate} active={tenure === 1 && rate === cheaperRate}         locale={locale} />
            <ScenarioRow years={tenure}     rate={rate}        active={true}                                          locale={locale} />
            <ScenarioRow years={savingYears} rate={rate}       active={tenure === savingYears && rate === rate}        locale={locale} />
          </div>
        </div>

        {/* Insight after exploring */}
        <AnimatePresence>
          {explored && (
            <motion.div
              className="rounded-2xl px-4 py-3 mb-4"
              style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-body text-xs leading-relaxed" style={{ color: "#92400E" }}>
                💡 {isAr
                  ? "لاحظت الفرق! قارن دائماً التكلفة الإجمالية — ليس فقط القسط الشهري."
                  : "You spotted it! Always compare total cost — not just the monthly payment."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center font-body text-[10px] mb-3" style={{ color: "#94A3B8" }}>
          {isAr ? "تعليمي فقط، ليس نصيحة مالية." : "Educational only, not financial advice."}
        </p>

        {/* Claim button */}
        <motion.button
          className="w-full rounded-2xl py-4 font-heading text-sm font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)",
            color: "#FFFFFC",
            boxShadow: "0 4px 14px rgba(0,17,27,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setDone(true)}
        >
          {isAr ? "استلام المكافأة ✓" : "Claim reward ✓"}
        </motion.button>
      </div>
    </div>
  );
}
