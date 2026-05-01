"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ContentTrack = "conventional" | "islamic";
export type AvatarType = "journey" | "home" | "garden";
export type Locale = "en" | "ar";

interface GameState {
  // User identity
  userId: string | null;

  // Preferences
  locale: Locale;
  contentTrack: ContentTrack;
  avatar: AvatarType;

  // Progress
  completedNodes: string[]; // node IDs
  valCoins: number;
  badges: string[]; // badge slugs
  totalXp: number;
  currentLevel: number;
  streakDays: number;

  // Session
  currentWorldId: string | null;
  currentNodeId: string | null;

  // Actions
  setUserId: (id: string | null) => void;
  setLocale: (locale: Locale) => void;
  setContentTrack: (track: ContentTrack) => void;
  setAvatar: (avatar: AvatarType) => void;
  completeNode: (nodeId: string, coinsEarned: number, xpEarned: number) => void;
  awardBadge: (badgeSlug: string) => void;
  spendCoins: (amount: number) => void;
  setCurrentWorld: (worldId: string | null) => void;
  setCurrentNode: (nodeId: string | null) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  reset: () => void;
}

const initialState: Omit<GameState, keyof { [K in keyof GameState as GameState[K] extends Function ? K : never]: GameState[K] }> = {
  userId: null,
  locale: "en",
  contentTrack: "conventional",
  avatar: "journey",
  completedNodes: [],
  valCoins: 0,
  badges: [],
  totalXp: 0,
  currentLevel: 1,
  streakDays: 0,
  currentWorldId: null,
  currentNodeId: null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userId: null,
      locale: "en",
      contentTrack: "conventional",
      avatar: "journey",
      completedNodes: [],
      valCoins: 0,
      badges: [],
      totalXp: 0,
      currentLevel: 1,
      streakDays: 0,
      currentWorldId: null,
      currentNodeId: null,

      setUserId: (id) => set({ userId: id }),
      setLocale: (locale) => set({ locale }),
      setContentTrack: (track) => set({ contentTrack: track }),
      setAvatar: (avatar) => set({ avatar }),

      completeNode: (nodeId, coinsEarned, xpEarned) =>
        set((state) => {
          if (state.completedNodes.includes(nodeId)) return state;
          const newXp = state.totalXp + xpEarned;
          const newLevel = Math.floor(newXp / 500) + 1; // 500 XP per level
          return {
            completedNodes: [...state.completedNodes, nodeId],
            valCoins: state.valCoins + coinsEarned,
            totalXp: newXp,
            currentLevel: newLevel,
          };
        }),

      awardBadge: (badgeSlug) =>
        set((state) => {
          if (state.badges.includes(badgeSlug)) return state;
          return { badges: [...state.badges, badgeSlug] };
        }),

      spendCoins: (amount) =>
        set((state) => ({
          valCoins: Math.max(0, state.valCoins - amount),
        })),

      setCurrentWorld: (worldId) => set({ currentWorldId: worldId }),
      setCurrentNode: (nodeId) => set({ currentNodeId: nodeId }),
      incrementStreak: () => set((s) => ({ streakDays: s.streakDays + 1 })),
      resetStreak: () => set({ streakDays: 0 }),

      reset: () =>
        set({
          completedNodes: [],
          valCoins: 0,
          badges: [],
          totalXp: 0,
          currentLevel: 1,
          streakDays: 0,
          currentWorldId: null,
          currentNodeId: null,
        }),
    }),
    {
      name: "valura-game-state",
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive game progress
      partialize: (state) => ({
        locale: state.locale,
        contentTrack: state.contentTrack,
        avatar: state.avatar,
        completedNodes: state.completedNodes,
        valCoins: state.valCoins,
        badges: state.badges,
        totalXp: state.totalXp,
        currentLevel: state.currentLevel,
        streakDays: state.streakDays,
      }),
    }
  )
);
