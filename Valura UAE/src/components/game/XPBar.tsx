"use client";

import { motion } from "framer-motion";

const XP_PER_LEVEL = 500;

interface XPBarProps {
  totalXP: number;
  currentLevel: number;
}

export default function XPBar({ totalXP, currentLevel }: XPBarProps) {
  const xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  const percent = Math.min((xpInCurrentLevel / XP_PER_LEVEL) * 100, 100);

  return (
    <div className="w-[200px]">
      <div
        className="mt-0.5 w-full overflow-hidden rounded-full"
        style={{ height: 4, background: "rgba(255,255,255,0.08)" }}
        role="progressbar"
        aria-valuenow={xpInCurrentLevel}
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-label={`XP: ${xpInCurrentLevel} of ${XP_PER_LEVEL}`}
        title={`${xpInCurrentLevel} / ${XP_PER_LEVEL} XP`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
