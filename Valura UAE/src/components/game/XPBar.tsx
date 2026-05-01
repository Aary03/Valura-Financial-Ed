"use client";

import { motion } from "framer-motion";

const XP_PER_LEVEL = 500;

interface XPBarProps {
  totalXP: number;
  currentLevel: number;
}

/**
 * Compact XP strip for the HUD — 180px track, “current / 500 XP” label.
 */
export default function XPBar({ totalXP, currentLevel }: XPBarProps) {
  const xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  const percent = Math.min((xpInCurrentLevel / XP_PER_LEVEL) * 100, 100);

  return (
    <div className="mt-1 w-[180px]">
      <div className="flex justify-end">
        <span
          className="font-body text-[11px] tabular-nums"
          style={{ color: "#94A3B8" }}
        >
          {xpInCurrentLevel} / {XP_PER_LEVEL} XP
        </span>
      </div>
      <div
        className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: "#F0F4F8" }}
        role="progressbar"
        aria-valuenow={xpInCurrentLevel}
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-label={`XP: ${xpInCurrentLevel} of ${XP_PER_LEVEL}`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #05A049 0%, #03803A 100%)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
