/**
 * Minimal line-art emblems — single-tone #05A049, 24×24, for journey nodes.
 */

import type { ReactNode } from "react";

const C = "#05A049";

export const WORLD_EMBLEMS: Record<string, ReactNode> = {
  "marina-mile": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 14 Q6 11 12 13 T22 13" stroke={C} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 17 Q7 14 13 16 T21 17" stroke={C} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M4 20 Q9 17 14 18 T21 21" stroke={C} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  "skyline-heights": (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <path d="M4 22V12h5v10H4Zm7-8V8h6v14h-6Zm8 12V10h5v12h-5Z" stroke={C} strokeWidth="1.75" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  "souk-of-savings": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="6" rx="5" ry="2" stroke={C} strokeWidth="1.75" />
      <path d="M7 8v14h10V8H7Zm5 14v6" stroke={C} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.75" fill={C} />
    </svg>
  ),
  "dirham-desert": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="8" r="3" stroke={C} strokeWidth="1.5" opacity="0.8" />
      <path d="M2 19 Q8 13 24 17" stroke={C} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "loan-lighthouse": (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 21V9l2-7 2 7v12" stroke={C} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="4" r="2" stroke={C} strokeWidth="2" />
    </svg>
  ),
  "card-canyon": (
    <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={C} strokeWidth="1.75" fill="none" />
      <path d="M5 13h14" stroke={C} strokeWidth="2" opacity="0.65" />
    </svg>
  ),
  "oasis-of-insurance": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h14a4 4 0 0 0 .4-7.92A5 5 0 1 0 13 16H4"
        stroke={C}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="23" r="1" fill={C} />
    </svg>
  ),
  "asset-atlas": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={C} strokeWidth="2" />
      <path d="M12 2v20 M2 12h20" stroke={C} strokeWidth="1.5" />
    </svg>
  ),
  "skyline-keys": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="16" r="3.5" stroke={C} strokeWidth="2" />
      <path d="M10.8 13.8L21 9v3l4-2 2 2-11 11h-6" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "halal-harbour": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 21L4 8h13l8 13H11Z" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21V17" stroke={C} strokeWidth="2" />
    </svg>
  ),
  "gratuity-garden": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke={C} strokeWidth="2" />
      <path d="M12 12v7M12 21v0" stroke={C} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  "family-majlis": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="6" cy="19" rx="4" ry="2" stroke={C} strokeWidth="1.5" />
      <ellipse cx="12" cy="18" rx="6" ry="3" stroke={C} strokeWidth="1.5" />
      <ellipse cx="18" cy="19" rx="4" ry="2" stroke={C} strokeWidth="1.5" />
    </svg>
  ),
  "bridge-of-borders": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 21c4-11 13-13 22-17" stroke={C} strokeWidth="2" strokeLinecap="round" />
      <circle cx="4" cy="21" r="2" fill={C} />
      <circle cx="26" cy="14" r="2" fill={C} />
    </svg>
  ),
  "scam-sentinel": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s8-5 8-13V8l-8-5-8 5v10c0 8 8 13 8 13Z"
        stroke={C}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "goal-garden": (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={C} strokeWidth="2" opacity="0.35" />
      <path d="M12 2v10M17 7 12 12 7 17" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3.5" stroke={C} strokeWidth="2" />
    </svg>
  ),
};
