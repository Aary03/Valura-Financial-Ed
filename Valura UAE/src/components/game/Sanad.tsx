"use client";

/**
 * Sanad — the Valura falcon mascot.
 *
 * Props mirror Rive state-machine inputs so the swap is a one-liner
 * when Rive files land:
 *   mood    → Rive StateMachine input "mood"
 *   size    → container class only (no Rive equivalent)
 *   facing  → Rive StateMachine input "facingLeft" (boolean)
 *
 * Each mood is a distinct SVG pose rendered in an 80 × 80 viewBox.
 * Framer Motion handles per-mood idle animations and transition behaviour.
 */

import { motion } from "framer-motion";
import type { Transition, TargetAndTransition } from "framer-motion";

// ── Types (exported so callers can build typed mood mappings) ─────────────────

export type SanadMood = "idle" | "thinking" | "celebrating" | "nudging" | "curious" | "sleeping";
export type SanadSize = "sm" | "md" | "lg";

const SIZE_PX: Record<SanadSize, number> = { sm: 28, md: 48, lg: 80 };

// ── Shared colour palette ─────────────────────────────────────────────────────

const C = {
  body:   "#00111B",
  shade:  "#001829",
  accent: "#001A2C",
  eye:    "#D4A95A",
  cream:  "#FFFFFC",
  mint:   "#B4E3C8",
} as const;

// ── Shared shape fragments ────────────────────────────────────────────────────

/** Falcon body ellipse — shared across all moods */
function Body({ cy = 55, opacity = 1 }: { cy?: number; opacity?: number }) {
  return <ellipse cx="36" cy={cy} rx="20" ry="14" fill={C.body} opacity={opacity} />;
}

/** Fan tail at the bottom of the body */
function Tail({ opacity = 1 }: { opacity?: number }) {
  return (
    <polygon
      points="28,67 32,77 36,71 40,77 44,67"
      fill={C.shade}
      opacity={opacity}
    />
  );
}

/** Head + hood mark (cx=56, cy=27, r=16) — can receive an SVG transform */
function Head({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      {/* Head circle */}
      <circle cx="56" cy="27" r="16" fill={C.body} />
      {/* Saker hood mark — dark cheek-stripe characteristic */}
      <path
        d="M 56,13 Q 69,20 66,33"
        stroke={C.accent}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Beak — curved hook */}
      <path d="M 70,22 Q 77,27 70,32 L 66,27 Z" fill={C.eye} />
    </g>
  );
}

/** Normal open eye */
function EyeOpen({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <circle cx="62" cy="21" r="4.5" fill={C.eye} />
      <circle cx="62" cy="21" r="2.5" fill={C.body} />
      <circle cx="63" cy="20" r="1"   fill={C.cream} opacity="0.6" />
    </g>
  );
}

/** Wide eye — curiosity */
function EyeWide({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <circle cx="62" cy="21" r="5.5" fill={C.eye} />
      <circle cx="62" cy="21" r="3"   fill={C.body} />
      <circle cx="63" cy="20" r="1.3" fill={C.cream} opacity="0.7" />
    </g>
  );
}

/** Half-lidded eye — thinking */
function EyeHalf({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <circle cx="62" cy="21" r="4.5" fill={C.eye} />
      <circle cx="62" cy="21" r="2.5" fill={C.body} />
      {/* Eyelid drooping over top half */}
      <path
        d="M 57,21 Q 62,16.5 67,21"
        stroke={C.body}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Closed eye — sleeping */
function EyeClosed({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <line
        x1="58" y1="21" x2="67" y2="21"
        stroke={C.eye}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Sparkle eye — celebrating */
function EyeSparkle({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <circle cx="62" cy="21" r="5" fill={C.eye} />
      <circle cx="62" cy="21" r="2.5" fill={C.body} />
      {/* Four sparkle rays */}
      <line x1="62" y1="14" x2="62" y2="12" stroke={C.eye} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="69" y1="17" x2="71" y2="15" stroke={C.eye} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="71" y1="21" x2="73" y2="21" stroke={C.eye} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="69" y1="25" x2="71" y2="27" stroke={C.eye} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/** Neck — trapezoidal shape connecting body top to head bottom */
function Neck() {
  return (
    <path
      d="M 38,42 Q 46,36 56,42 L 54,50 Q 46,48 38,50 Z"
      fill={C.body}
    />
  );
}

// ── Mood-specific wing groups ─────────────────────────────────────────────────

function WingsFolded() {
  return (
    <>
      {/* Back wing (left, partially behind body) */}
      <path
        d="M 24,52 C 12,50 8,60 14,70 L 22,66 Q 26,58 26,52 Z"
        fill={C.shade}
        opacity="0.9"
      />
      {/* Near wing stub (right side of body) */}
      <path
        d="M 46,50 C 56,46 60,52 58,60 L 48,62 Z"
        fill={C.accent}
      />
    </>
  );
}

function WingsSpread() {
  return (
    <>
      {/* Left wing — sweeping up-left */}
      <path
        d="M 22,50 L 0,20 L 4,36 L 16,54 Z"
        fill={C.shade}
        opacity="0.9"
      />
      {/* Right wing — sweeping up-right, behind head */}
      <path
        d="M 48,46 L 76,18 L 72,34 L 54,50 Z"
        fill={C.shade}
        opacity="0.80"
      />
    </>
  );
}

function WingNudge() {
  return (
    <>
      {/* Back wing folded */}
      <path
        d="M 24,52 C 12,50 8,60 14,70 L 22,66 Q 26,58 26,52 Z"
        fill={C.shade}
        opacity="0.9"
      />
      {/* Near wing extended forward — the "nudge" gesture */}
      <path
        d="M 46,52 L 73,36 L 74,46 L 56,56 Z"
        fill={C.accent}
      />
    </>
  );
}

// ── Mood SVG bodies ───────────────────────────────────────────────────────────

function IdlePose() {
  return (
    <>
      <WingsFolded />
      <Body />
      <Neck />
      <Head />
      <EyeOpen />
      <Tail />
    </>
  );
}

function CelebratingPose() {
  return (
    <>
      <WingsSpread />
      <Body cy={52} />
      <Neck />
      <Head />
      <EyeSparkle />
      <Tail />
    </>
  );
}

function ThinkingPose() {
  return (
    <>
      <WingsFolded />
      <Body />
      {/* Entire head group rotated for the "tilted head" look */}
      <g transform="rotate(-12, 56, 44)">
        <Neck />
        <Head />
        <EyeHalf />
      </g>
      <Tail />
    </>
  );
}

function NudgingPose() {
  return (
    <>
      <WingNudge />
      <Body />
      <Neck />
      <Head />
      <EyeOpen />
      <Tail />
    </>
  );
}

function CuriousPose() {
  return (
    <>
      <WingsFolded />
      <Body />
      {/* Head cocked further than thinking */}
      <g transform="rotate(-20, 56, 44)">
        <Neck />
        <Head />
        <EyeWide />
      </g>
      <Tail />
    </>
  );
}

function SleepingPose() {
  return (
    <>
      <WingsFolded />
      <Body cy={57} opacity={0.85} />
      {/* Head drooped forward */}
      <g transform="rotate(16, 48, 44)">
        <Neck />
        <Head />
        <EyeClosed />
      </g>
      <Tail opacity={0.8} />
      {/* Floating Zs */}
      <text x="68" y="14" fontFamily="sans-serif" fontSize="9"  fontWeight="700" fill={C.mint} opacity="0.45">z</text>
      <text x="74" y="7"  fontFamily="sans-serif" fontSize="11" fontWeight="700" fill={C.mint} opacity="0.65">z</text>
    </>
  );
}

// ── Per-mood Framer Motion animation configs ──────────────────────────────────

type AnimConfig = {
  animate: TargetAndTransition;
  transition: Transition;
};

const MOOD_ANIM: Record<SanadMood, AnimConfig> = {
  idle: {
    animate: { y: [0, -2.5, 0] },
    transition: {
      repeat: Infinity,
      duration: 3.5,
      ease: "easeInOut",
      type: "tween",
    },
  },
  celebrating: {
    animate: { y: [0, -20, -6, 0] },
    transition: {
      type: "tween",
      duration: 0.85,
      ease: "easeOut",
      times: [0, 0.28, 0.62, 1],
    },
  },
  thinking: {
    animate: { rotate: [-6, 0, -6] },
    transition: {
      repeat: Infinity,
      duration: 4.5,
      ease: "easeInOut",
      type: "tween",
    },
  },
  nudging: {
    animate: { x: [0, 5, 0, 5, 0] },
    transition: {
      duration: 0.55,
      ease: "easeInOut",
      type: "tween",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
  curious: {
    animate: { rotate: [-14, 0] },
    transition: { type: "spring", stiffness: 300, damping: 16 },
  },
  sleeping: {
    animate: { y: [0, 2, 0] },
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut",
      type: "tween",
    },
  },
};

const MOOD_POSE: Record<SanadMood, () => React.ReactElement> = {
  idle:        IdlePose,
  celebrating: CelebratingPose,
  thinking:    ThinkingPose,
  nudging:     NudgingPose,
  curious:     CuriousPose,
  sleeping:    SleepingPose,
};

// ── Public component ──────────────────────────────────────────────────────────

interface SanadProps {
  mood?:   SanadMood;
  size?:   SanadSize;
  /**
   * "right" (default) — beak points right.
   * "left"            — beak points left (RTL / inward-facing in HUD).
   * Applied as CSS scaleX(-1) so no SVG re-authoring is needed.
   */
  facing?: "left" | "right";
  className?: string;
}

/**
 * Sanad the falcon mascot.
 *
 * Renders a geometric SVG placeholder for each mood.
 * Rive integration: replace the SVG tree with a <RiveComponent> that
 * drives a state machine with inputs matching the `mood` and `facing` props.
 *
 * All animation is handled by Framer Motion.
 * `key={mood}` on the animation wrapper re-triggers the enter animation
 * whenever the mood changes (e.g. idle → celebrating on correct answer).
 */
export default function Sanad({
  mood    = "idle",
  size    = "md",
  facing  = "right",
  className,
}: SanadProps) {
  const px       = SIZE_PX[size];
  const anim     = MOOD_ANIM[mood];
  const PoseComp = MOOD_POSE[mood];

  return (
    <div
      className={className}
      style={{
        display:   "inline-block",
        transform: facing === "left" ? "scaleX(-1)" : undefined,
      }}
      aria-label={`Sanad — ${mood}`}
      role="img"
    >
      <motion.div
        key={mood}
        animate={anim.animate}
        transition={anim.transition}
        style={{ display: "block", width: px, height: px }}
      >
        <svg
          viewBox="0 0 80 80"
          width={px}
          height={px}
          aria-hidden="true"
          overflow="visible"
        >
          <PoseComp />
        </svg>
      </motion.div>
    </div>
  );
}
