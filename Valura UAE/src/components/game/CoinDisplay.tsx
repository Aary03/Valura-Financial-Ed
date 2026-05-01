"use client";

import { Coins } from "lucide-react";
import { useGameStore } from "@/lib/store/gameStore";
import { formatCoins } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  locale?: string;
  className?: string;
}

/**
 * Live VAL Coin balance — reads from Zustand store.
 * Must be a client component (reads localStorage-persisted state).
 * VAL Coins are cosmetics + charity only — never redeemable.
 */
export default function CoinDisplay({ locale = "en", className }: CoinDisplayProps) {
  const valCoins = useGameStore((s) => s.valCoins);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5",
        "text-sm font-semibold text-gold-dark tabular-nums",
        className
      )}
      aria-label={`VAL Coins balance: ${valCoins}`}
      aria-live="polite"
    >
      <Coins className="size-4 text-gold" aria-hidden="true" />
      <span>{formatCoins(valCoins, locale)}</span>
    </div>
  );
}
