"use client";

import type { ReactNode } from "react";

/**
 * Minimal geometric falcon head mark — mood variants only tweak eye/wing cues.
 */

export type SanadIconMood =
  | "idle"
  | "celebrating"
  | "thinking"
  | "nudging"
  | "curious"
  | "sleeping";

export type SanadIconSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<SanadIconSize, number> = { sm: 28, md: 44, lg: 96 };

interface SanadIconProps {
  mood?: SanadIconMood;
  size?: SanadIconSize;
  className?: string;
  facing?: "left" | "right";
  "aria-hidden"?: boolean;
}

/** Clean falcon head silhouette for HUD, FAB, quizzes (replaces ornate SVG mascot). */
export default function SanadIcon({
  mood = "idle",
  size = "md",
  className,
  facing = "right",
  "aria-hidden": ariaHidden,
}: SanadIconProps) {
  const px = SIZE_MAP[size];
  const flip = facing === "left" ? -1 : 1;

  const bodyOpacity =
    mood === "sleeping" ? 0.7 : mood === "curious" ? 0.95 : 1;
  const headRotateDeg = mood === "curious" ? -8 : 0;

  // Eye visuals per mood — mint #B4E3C8, green #05A049, navy fill body #00111B
  let eyeElt: ReactNode;
  if (mood === "sleeping") {
    eyeElt = <line x1="17" y1="22" x2="23" y2="22" stroke="#B4E3C8" strokeWidth="1.75" />;
  } else if (mood === "thinking") {
    eyeElt = <line x1="20" y1="18" x2="20" y2="26" stroke="#B4E3C8" strokeWidth="1.75" />;
  } else if (mood === "celebrating") {
    eyeElt = (
      <path d="M18 21 Q20 26 23 21" stroke="#05A049" strokeWidth="1.75" fill="none" strokeLinecap="round" />
    );
  } else if (mood === "nudging") {
    eyeElt = (
      <>
        <circle cx="20" cy="22" r="2.25" fill="#B4E3C8" />
        <line x1="22" y1="20" x2="25" y2="18" stroke="#D4A95A" strokeWidth="1.2" strokeLinecap="round" />
      </>
    );
  } else {
    eyeElt = <circle cx="20" cy="22" r="2" fill="#B4E3C8" />;
  }

  const wingSwing =
    mood === "celebrating"
      ? "M22 19 Q31 26 26 34"
      : mood === "sleeping"
        ? "M22 21 Q26 26 23 31"
        : "M22 20 Q28 24 24 32";

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      style={{
        transform: `scaleX(${flip}) rotate(${headRotateDeg}deg)`,
        transformOrigin: "24px 24px",
      }}
    >
      <g opacity={bodyOpacity}>
        <path
          d="M24 6 C32 6, 38 14, 38 24 C38 32, 32 40, 24 40 C18 40, 14 36, 12 30 L8 28 L12 26 C14 18, 18 6, 24 6 Z"
          fill="#00111B"
        />
        <path d="M8 28 L4 30 L8 32 Z" fill="#D4A95A" />
        {eyeElt}
        <path d={wingSwing} stroke="#05A049" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
