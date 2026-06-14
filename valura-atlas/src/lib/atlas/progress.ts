"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // yyyy-mm-dd
}

function dayDiff(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / 86_400_000);
}

interface ProgressState {
  completed: string[];
  lastVisited?: string;
  streakDays: number;
  lastActiveDate?: string;

  markComplete: (id: string) => void;
  setLastVisited: (id: string) => void;
  isComplete: (id: string) => boolean;
  /** Call on a learning action; advances or resets the daily streak. */
  touchStreak: () => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: [],
      streakDays: 0,

      markComplete: (id) =>
        set((s) => (s.completed.includes(id) ? s : { completed: [...s.completed, id] })),

      setLastVisited: (id) => set({ lastVisited: id }),

      isComplete: (id) => get().completed.includes(id),

      touchStreak: () =>
        set((s) => {
          const today = todayKey();
          if (s.lastActiveDate === today) return s;
          if (!s.lastActiveDate) return { streakDays: 1, lastActiveDate: today };
          const gap = dayDiff(s.lastActiveDate, today);
          return {
            streakDays: gap === 1 ? s.streakDays + 1 : 1,
            lastActiveDate: today,
          };
        }),

      reset: () => set({ completed: [], lastVisited: undefined, streakDays: 0 }),
    }),
    { name: "valura-atlas-progress" },
  ),
);
