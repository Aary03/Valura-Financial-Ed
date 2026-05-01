"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/game/store";

interface StoreHydratorProps {
  xp:            number;
  valCoins:      number;
  streak:        number;
  streakFreezes?: number;
}

/**
 * Invisible client component that writes authoritative server-side User
 * values into the Zustand game store on mount.
 *
 * Place this inside the /journey page so it fires every time the user
 * navigates back to the journey map, keeping store values fresh.
 *
 * deps array is intentionally omitting the hydrate callback ref because
 * we only want to hydrate once from the initial server snapshot.
 */
export default function StoreHydrator({
  xp, valCoins, streak, streakFreezes = 0,
}: StoreHydratorProps) {
  const hydrate = useGameStore((s) => s.hydrate);

  useEffect(() => {
    hydrate({ xp, valCoins, streak, streakFreezes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  return null;
}
