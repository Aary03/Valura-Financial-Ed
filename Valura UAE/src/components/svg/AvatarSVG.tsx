import type { AvatarType } from "@prisma/client";

interface AvatarSVGProps {
  type: AvatarType;
}

/**
 * Placeholder avatar SVGs — geometric, flat, brand-coloured.
 * Rendered at origin; parent <g> controls position.
 * Rive/custom illustration replaces these in later phases.
 *
 * FIGURE  — journeying person silhouette
 * HOME    — house / settled lifestyle
 * GARDEN  — growing tree / nature
 */
export default function AvatarSVG({ type }: AvatarSVGProps) {
  if (type === "HOME") {
    return (
      <g aria-label="Home avatar">
        {/* Roof */}
        <polygon points="0,-28 28,-8 -28,-8" fill="#05A049" />
        {/* Walls */}
        <rect x="-22" y="-8" width="44" height="30" rx="2" fill="#B4E3C8" />
        {/* Door */}
        <rect x="-7" y="8" width="14" height="14" rx="2" fill="#05A049" />
        {/* Window left */}
        <rect x="-18" y="-2" width="10" height="8" rx="1" fill="#FFFFFC" opacity="0.8" />
        {/* Window right */}
        <rect x="8" y="-2" width="10" height="8" rx="1" fill="#FFFFFC" opacity="0.8" />
        {/* Chimney */}
        <rect x="10" y="-36" width="6" height="16" rx="1" fill="#05A049" />
        {/* Smoke puff */}
        <circle cx="13" cy="-40" r="4" fill="#B4E3C8" opacity="0.6" />
        <circle cx="17" cy="-44" r="3" fill="#B4E3C8" opacity="0.4" />
      </g>
    );
  }

  if (type === "GARDEN") {
    return (
      <g aria-label="Garden avatar">
        {/* Trunk */}
        <rect x="-5" y="0" width="10" height="28" rx="3" fill="#A07C30" />
        {/* Main canopy */}
        <circle cx="0" cy="-18" r="22" fill="#05A049" />
        {/* Canopy highlight */}
        <circle cx="-6" cy="-24" r="12" fill="#B4E3C8" opacity="0.4" />
        {/* Small flowers / fruits */}
        <circle cx="12" cy="-10" r="4" fill="#D4A95A" />
        <circle cx="-14" cy="-14" r="3" fill="#D4A95A" />
        <circle cx="4" cy="-30" r="3.5" fill="#D4A95A" />
        {/* Roots / ground */}
        <path d="M -8,28 Q -18,32 -16,36 M 8,28 Q 18,32 16,36" stroke="#A07C30" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  // Default: FIGURE — walking person
  return (
    <g aria-label="Figure avatar">
      {/* Head */}
      <circle cx="0" cy="-30" r="9" fill="#B4E3C8" />
      {/* Scarf / neck accent */}
      <path d="M -5,-22 Q 0,-18 5,-22" stroke="#D4A95A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Body / tunic */}
      <path d="M -10,-18 Q -12,0 -8,18 L 8,18 Q 12,0 10,-18 Z" fill="#05A049" />
      {/* Backpack strap hint */}
      <path d="M 8,-15 C 14,-10 14,4 10,8" stroke="#047E3A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Left arm (striding) */}
      <path d="M -10,-10 L -20,4" stroke="#B4E3C8" strokeWidth="4" strokeLinecap="round" />
      {/* Right arm */}
      <path d="M 10,-10 L 16,2" stroke="#B4E3C8" strokeWidth="4" strokeLinecap="round" />
      {/* Left leg (forward stride) */}
      <path d="M -6,18 L -10,36 L -4,36" stroke="#047E3A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Right leg */}
      <path d="M 6,18 L 12,34 L 18,32" stroke="#047E3A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}
