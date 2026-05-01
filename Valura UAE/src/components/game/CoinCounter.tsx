"use client";

import { useState, useEffect } from "react";

/**
 * Animated VAL Coins counter — counts up from 0 on mount.
 * VAL Coins are cosmetics + charity only, never redeemable.
 */
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

/** Hero VAL COINS pill — warm cream/gold surface, Bricolage count. */
export default function CoinCounter({ amount, locale = "en" }: CoinCounterProps) {
  const count = useCountUp(amount);
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE").format(
    count,
  );

  return (
    <div
      className="flex items-center gap-2.5 rounded-full border px-5 py-2.5"
      style={{
        background: "linear-gradient(180deg, #FFF8E7 0%, #FFEFC4 100%)",
        borderColor: "rgba(212, 169, 90, 0.2)",
      }}
      aria-label={`VAL Coins: ${amount}`}
      aria-live="polite"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <radialGradient id="coinRg" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#F7E8B8" />
            <stop offset="100%" stopColor="#C9A24A" />
          </radialGradient>
          <radialGradient id="coinRgInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#coinRg)" stroke="#B8893A" strokeWidth="0.5" />
        <ellipse cx="9" cy="10" rx="5" ry="3" fill="url(#coinRgInner)" opacity="0.5" />
        <circle cx="12" cy="13" r="9" fill="none" stroke="rgba(0,17,27,0.15)" strokeWidth="1" opacity="0.6" />
      </svg>
      <div className="flex flex-col items-start gap-0.5">
        <span
          className="font-display text-2xl font-bold tabular-nums leading-none"
          style={{ color: "#8B6914" }}
        >
          {formatted}
        </span>
        <span
          className="font-body text-[11px] font-medium uppercase tracking-wider"
          style={{ color: "#B8893A" }}
        >
          VAL COINS
        </span>
      </div>
    </div>
  );
}
