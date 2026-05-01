"use client";

import { useState, useEffect } from "react";

function useCountUp(target: number, durationMs = 1200): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

interface CoinCounterProps {
  amount: number;
  locale?: string;
}

export default function CoinCounter({ amount, locale = "en" }: CoinCounterProps) {
  const count = useCountUp(amount);
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE").format(count);

  return (
    <div
      className="flex items-center gap-2 rounded-lg px-3 py-1.5"
      style={{
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.18)",
      }}
      aria-label={`VAL Coins: ${amount}`}
      aria-live="polite"
    >
      {/* Coin SVG */}
      <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
        <circle cx="9" cy="9" r="9" fill="#D97706" />
        <circle cx="9" cy="9" r="7" fill="#B45309" />
        <circle cx="9" cy="9" r="5" fill="#D97706" opacity="0.5" />
        <text x="9" y="12.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7">V</text>
      </svg>
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#FCD34D",
          letterSpacing: "-0.01em",
        }}
      >
        {formatted}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: "#D97706",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        VAL
      </span>
    </div>
  );
}
