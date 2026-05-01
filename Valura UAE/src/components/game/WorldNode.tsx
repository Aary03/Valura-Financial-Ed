"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import type { WorldCoord } from "@/lib/game/world-coords";
import { WORLD_EMBLEMS } from "@/lib/game/world-emblems";

const SHADOW_NODE =
  "shadow-[0_2px_8px_rgba(0,17,27,0.04),0_8px_24px_rgba(0,17,27,0.06)]";

function classifyNode(index: number, currentLevel: number) {
  const locked = index >= currentLevel;
  const completed = index < currentLevel - 1;
  const current = index === currentLevel - 1 && !locked;
  return { locked, completed, current };
}

export interface WorldNodeProps {
  world: WorldCoord;
  index: number;
  currentLevel: number;
  hasMasteryReview?: boolean;
  locale: string;
  style?: CSSProperties;
  onActivate: () => void;
  layout?: "map" | "stack";
}

/**
 * Large 112px journey node — locked / current / completed visual system.
 */
export default function WorldNode({
  world,
  index,
  currentLevel,
  hasMasteryReview = false,
  locale,
  style,
  onActivate,
  layout = "map",
}: WorldNodeProps) {
  const isAr     = locale === "ar";
  const label    = isAr ? world.nameAr : world.nameEn;
  const { locked, completed, current } = classifyNode(index, currentLevel);
  const emblem   = WORLD_EMBLEMS[world.slug];
  const stackCls = layout === "stack" ? "relative my-6 w-full max-w-sm mx-auto" : "absolute flex flex-col items-center";

  return (
    <div
      className={stackCls}
      style={{
        ...style,
        ...(layout === "map"
          ? {
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }
          : {}),
      }}
    >
      <motion.button
        type="button"
        className="relative flex size-[7rem] shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05A049]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        onClick={onActivate}
        aria-label={label}
        aria-current={current ? "step" : undefined}
        style={{ borderRadius: "50%" }}
      >
        {current && (
          <span
            className="pointer-events-none absolute inset-[-6px] rounded-full border-2 border-[#05A049] opacity-40 world-node-pulse"
            aria-hidden
          />
        )}

        <div
          className="relative flex size-[7rem] items-center justify-center rounded-full border bg-white"
          style={{
            borderWidth: current ? 3 : locked ? 2 : completed ? 0 : 2,
            borderColor: current ? "#05A049" : locked ? "#E2E8F0" : "transparent",
            boxShadow:
              current
                ? "0 8px 24px rgba(5,160,73,0.18)"
                : SHADOW_NODE,
            background:
              completed
                ? "#05A049"
                : current
                  ? "linear-gradient(180deg,#FFFFFF 0%,#F0F9F2 100%)"
                  : locked
                    ? "#FFFFFF"
                    : "#FFFFFF",
          }}
        >
          {completed && (
            <Check className="size-9 text-[#FFFFF8]" strokeWidth={2.5} aria-hidden />
          )}
          {locked && (
            <div className="flex size-[5.25rem] items-center justify-center rounded-full bg-[#F5F7FA]">
              <Lock className="size-7 text-[#94A3B8]" strokeWidth={2} aria-hidden />
            </div>
          )}
          {!locked && !completed && emblem && (
            <span className="flex items-center justify-center [&>svg]:size-9">{emblem}</span>
          )}

          {hasMasteryReview && current && (
            <span
              className="absolute end-1 top-1 size-2.5 rounded-full ring-2 ring-white"
              style={{ background: "#D4A95A" }}
              aria-label="Review available"
            />
          )}
        </div>
      </motion.button>

      <div className="mt-3 max-w-[8.5rem] text-center">
        <p
          className="font-heading font-semibold leading-tight"
          style={{
            color: locked ? "#94A3B8" : "#00111B",
            fontSize: locked ? 14 : 16,
            textShadow: "0 1px 0 rgba(255,255,252,0.8)",
          }}
        >
          {label}
        </p>
        {current && !completed && (
          <p className="mt-1 font-body text-[11px]" style={{ color: "#475569" }}>
            {isAr ? "٥ اختبارات تقريبًا" : "5 quizzes"}
          </p>
        )}
        {completed && (
          <p className="mt-1 font-body text-[11px] font-medium" style={{ color: "#B8893A" }}>
            {isAr ? "+١٬٢٠٠ XP" : "+1,200 XP"}
          </p>
        )}
      </div>
    </div>
  );
}
