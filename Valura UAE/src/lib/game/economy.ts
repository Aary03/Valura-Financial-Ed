/**
 * Pure economy calculation functions — no React, no side-effects.
 * All functions are deterministic and unit-testable.
 *
 * VAL Coins are a cosmetic / charity currency — never monetised.
 * XP drives the level progression curve.
 */

// ── VAL Coins awards ──────────────────────────────────────────────────────────

/**
 * Coins for completing a quiz.
 * Perfect score: 300. Partial: linearly scaled 100 – 200.
 */
export function awardCoinsForQuiz(score: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 100;
  if (score >= totalQuestions) return 300;
  const ratio = Math.max(0, score) / totalQuestions;
  return Math.round(100 + ratio * 100); // 100 – 200
}

/** Coins for defeating a boss node. */
export function awardCoinsForBoss(): number { return 2_000; }

/** Coins for completing a Sanad Mastery review session. */
export function awardCoinsForMastery(): number { return 500; }

/** Coins for maintaining a weekly streak. */
export function awardCoinsForWeeklyStreak(): number { return 3_000; }

// ── Spending guard ────────────────────────────────────────────────────────────

/**
 * Returns true only if the wallet has enough coins for the purchase.
 * Also rejects zero or negative costs (defensive).
 */
export function canSpendCoins(current: number, cost: number): boolean {
  return cost > 0 && current >= cost;
}

// ── XP awards ─────────────────────────────────────────────────────────────────

export type NodeKindEconomy = "QUIZ" | "STORY" | "MINIGAME" | "BOSS";

const BASE_XP: Record<NodeKindEconomy, number> = {
  QUIZ:     50,
  STORY:    30,
  MINIGAME: 100,
  BOSS:     250,
};

/**
 * XP earned for completing a node.
 *
 * @param nodeKind  Kind of node completed.
 * @param score     For QUIZ: fraction correct [0, 1].
 *                  For other kinds: pass 1 (completion-based).
 *
 * QUIZ applies a floor of 0.2 so every attempt earns at least 20% of base XP,
 * removing the disincentive to try.
 */
export function calculateXpForNode(nodeKind: NodeKindEconomy, score: number): number {
  const base = BASE_XP[nodeKind] ?? 0;
  if (nodeKind === "QUIZ") return Math.round(base * Math.max(0.2, score));
  return base;
}

/** Convenience: XP + Coins from a single quiz completion. */
export function quizRewards(
  correctCount: number,
  totalQuestions: number,
): { xpEarned: number; coinsEarned: number } {
  const fraction  = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const xpEarned    = calculateXpForNode("QUIZ", fraction);
  const coinsEarned = awardCoinsForQuiz(correctCount, totalQuestions);
  return { xpEarned, coinsEarned };
}
