/**
 * Zustand stores for client-side game state.
 *
 * Two exports:
 *   useGameStore  — XP, coins, streak (persisted to localStorage)
 *   useToastStore — ephemeral notification queue (never persisted)
 *
 * Hydration flow:
 *   1. store initialises with defaults (safe for SSR)
 *   2. <StoreHydrator> on the /journey page calls `hydrate()` with
 *      authoritative values from the User DB row
 *   3. isHydrated flips true so HUD switches from prop-based to store-based values
 *   4. persist middleware writes subsequent changes to localStorage for
 *      cross-tab awareness; localStorage is NOT the primary source of truth
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Game store ────────────────────────────────────────────────────────────────

interface GameState {
  xp:              number;
  valCoins:        number;
  streak:          number;
  streakFreezes:   number;
  /**
   * World slugs fully completed client-side. Used to compute effective
   * journey level when DB is unavailable (demo mode) or on first load
   * before DB write propagates.
   */
  completedWorlds: string[];
  /** Flipped true once StoreHydrator has written server values. */
  isHydrated:      boolean;
}

interface GameActions {
  awardXp:         (n: number) => void;
  awardCoins:      (n: number) => void;
  /**
   * Deducts coins and returns true, or returns false without deducting
   * if the wallet is insufficient.
   */
  spendCoins:      (n: number) => boolean;
  incrementStreak: () => void;
  resetStreak:     () => void;
  /** Mark a world slug as fully completed (idempotent). */
  completeWorld:   (slug: string) => void;
  hydrate:         (state: Partial<GameState>) => void;
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      xp:              0,
      valCoins:        0,
      streak:          0,
      streakFreezes:   0,
      completedWorlds: [],
      isHydrated:      false,

      awardXp:    (n) => set((s) => ({ xp: s.xp + n })),
      awardCoins: (n) => set((s) => ({ valCoins: s.valCoins + n })),

      spendCoins: (n) => {
        const { valCoins } = get();
        if (valCoins < n) return false;
        set({ valCoins: valCoins - n });
        return true;
      },

      incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
      resetStreak:     () => set({ streak: 0 }),

      completeWorld: (slug) =>
        set((s) => ({
          completedWorlds: s.completedWorlds.includes(slug)
            ? s.completedWorlds
            : [...s.completedWorlds, slug],
        })),

      hydrate: (partial) => set({ ...partial, isHydrated: true }),
    }),
    {
      name: "valura-game-v1",
      // Only persist primitive state — never functions
      partialize: (s) => ({
        xp:              s.xp,
        valCoins:        s.valCoins,
        streak:          s.streak,
        streakFreezes:   s.streakFreezes,
        completedWorlds: s.completedWorlds,
      }),
    },
  ),
);

// ── Toast store ───────────────────────────────────────────────────────────────

export type ToastType = "xp" | "coins" | "badge" | "streak" | "boost";

export interface GameToast {
  id:     string;
  type:   ToastType;
  amount: number;
  /** Short label shown beside the amount, e.g. "XP" or "VAL Coins" */
  label:  string;
}

interface ToastState {
  toasts:      GameToast[];
  addToast:    (t: Omit<GameToast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  addToast: (t) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        { ...t, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` },
      ],
    })),

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));
