"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  BookOpen,
  Gamepad2,
  Trophy,
  Lock,
  Check,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { WorldNode, NodeKind } from "@/lib/game/world-content";

// ── Kind metadata ──────────────────────────────────────────────────────────────

const KIND_ICON: Record<NodeKind, LucideIcon> = {
  quiz:     HelpCircle,
  story:    BookOpen,
  minigame: Gamepad2,
  boss:     Trophy,
};

const KIND_LABEL: Record<NodeKind, { en: string; ar: string }> = {
  quiz:     { en: "Quiz",       ar: "اختبار"     },
  story:    { en: "Story",      ar: "قصة"        },
  minigame: { en: "Mini-game",  ar: "لعبة صغيرة" },
  boss:     { en: "Boss battle",ar: "تحدي كبير"  },
};

const KIND_ACCENT: Record<NodeKind, string> = {
  quiz:     "#05A049",
  story:    "#0A4A6E",
  minigame: "#D4A95A",
  boss:     "#00111B",
};

const KIND_BG: Record<NodeKind, string> = {
  quiz:     "rgba(5,160,73,0.08)",
  story:    "rgba(10,74,110,0.08)",
  minigame: "rgba(212,169,90,0.10)",
  boss:     "rgba(0,17,27,0.07)",
};

const STOP_DURATIONS = ["~60 sec", "~90 sec", "~2 min", "~90 sec", "~3 min"];

interface StopCardProps {
  node: WorldNode;
  index: number;
  total: number;
  locale: string;
  onTap: (node: WorldNode) => void;
}

function StopCard({ node, index, total, locale, onTap }: StopCardProps) {
  const isAr     = locale === "ar";
  const Icon     = KIND_ICON[node.kind] ?? HelpCircle;
  const accent   = KIND_ACCENT[node.kind];
  const bg       = KIND_BG[node.kind];
  const label    = KIND_LABEL[node.kind][isAr ? "ar" : "en"];
  const title    = isAr ? node.titleAr : node.titleEn;
  const duration = STOP_DURATIONS[index] ?? "~60 sec";

  const isDone      = node.state === "done";
  const isAvailable = node.state === "available";
  const isLocked    = node.state === "locked";
  const isActive    = !isLocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.07, ease: "easeOut" }}
      className="relative"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div
          className="absolute bottom-0 start-[2.25rem] top-full z-0 w-[2px]"
          style={{
            height: 20,
            background: isDone
              ? "#05A049"
              : "rgba(0,17,27,0.08)",
          }}
          aria-hidden
        />
      )}

      <motion.button
        type="button"
        className="relative z-10 flex w-full items-center gap-5 rounded-2xl border p-5 text-start transition-shadow"
        style={{
          background: isDone
            ? "linear-gradient(135deg,rgba(5,160,73,0.05) 0%,rgba(5,160,73,0.02) 100%)"
            : isAvailable
              ? "#FFFFFF"
              : "#F8FAFC",
          borderColor: isDone
            ? "rgba(5,160,73,0.22)"
            : isAvailable
              ? "#E2E8F0"
              : "#EFF2F6",
          borderWidth: isAvailable ? 2 : 1,
          boxShadow: isAvailable
            ? "0 4px 16px rgba(5,160,73,0.10), 0 2px 8px rgba(0,17,27,0.04)"
            : "0 1px 4px rgba(0,17,27,0.04)",
          opacity: isLocked ? 0.55 : 1,
          cursor: isLocked ? "default" : "pointer",
        }}
        whileHover={isActive ? { y: -1, boxShadow: "0 8px 24px rgba(0,17,27,0.08)" } : {}}
        whileTap={isActive ? { scale: 0.99 } : {}}
        onClick={() => isActive && onTap(node)}
        disabled={isLocked}
        aria-disabled={isLocked}
        aria-label={title}
      >
        {/* Left: step number bubble */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div
            className="flex size-12 items-center justify-center rounded-2xl"
            style={{ background: isLocked ? "rgba(0,17,27,0.05)" : bg }}
          >
            {isDone ? (
              <Check
                className="size-6"
                style={{ color: "#05A049" }}
                strokeWidth={2.5}
                aria-hidden
              />
            ) : isLocked ? (
              <Lock className="size-5 text-[#94A3B8]" strokeWidth={2} aria-hidden />
            ) : (
              <Icon
                className="size-6"
                style={{ color: accent }}
                strokeWidth={1.75}
                aria-hidden
              />
            )}
          </div>
          <span
            className="font-body text-[10px] font-semibold tabular-nums"
            style={{ color: "#94A3B8" }}
          >
            {index + 1}/{total}
          </span>
        </div>

        {/* Centre: title + kind badge */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-body text-[11px] font-semibold"
              style={{
                background: isLocked ? "rgba(0,17,27,0.04)" : bg,
                color: isLocked ? "#94A3B8" : accent,
              }}
            >
              {label}
            </span>
            {isAvailable && (
              <span
                className="rounded-full px-2 py-0.5 font-body text-[10px] font-semibold"
                style={{ background: "rgba(5,160,73,0.10)", color: "#05A049" }}
              >
                {isAr ? "متاح" : "Up next"}
              </span>
            )}
          </div>
          <p
            className="font-heading text-[15px] font-semibold leading-snug"
            style={{ color: isLocked ? "#94A3B8" : "#00111B" }}
          >
            {title}
          </p>
          <p
            className="mt-1 font-body text-[12px]"
            style={{ color: "#94A3B8" }}
          >
            {duration}
          </p>
        </div>

        {/* Right: chevron or check */}
        {!isLocked && (
          <div
            className="shrink-0"
            style={{ color: isDone ? "#05A049" : "#94A3B8" }}
          >
            {isDone ? (
              <div
                className="flex size-7 items-center justify-center rounded-full"
                style={{ background: "rgba(5,160,73,0.12)" }}
              >
                <Check className="size-4 text-[#05A049]" strokeWidth={2.5} aria-hidden />
              </div>
            ) : (
              <ChevronRight className="size-5 rtl:rotate-180" aria-hidden />
            )}
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}

// ── WorldRoad (now a vertical stop-cards list) ─────────────────────────────────

interface WorldRoadProps {
  nodes: WorldNode[];
  locale: string;
  onNodeTap: (node: WorldNode) => void;
}

export default function WorldRoad({ nodes, locale, onNodeTap }: WorldRoadProps) {
  const isAr = locale === "ar";

  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16">
        <p className="font-body text-sm text-[#64748B]">
          {isAr ? "محتوى العالم قادم قريباً" : "World content coming soon"}
        </p>
      </div>
    );
  }

  const done  = nodes.filter((n) => n.state === "done").length;
  const total = nodes.length;

  return (
    <div className="relative flex flex-col gap-5" dir={isAr ? "rtl" : "ltr"}>
      {/* Progress summary */}
      <div className="flex items-center justify-between">
        <p className="font-body text-[13px] text-[#475569]">
          {isAr ? `${done} من ${total} مكتملة` : `${done} of ${total} complete`}
        </p>
        <div className="flex h-1.5 w-40 overflow-hidden rounded-full bg-[#E2E8F0]">
          <motion.div
            className="h-full rounded-full bg-[#05A049]"
            initial={{ width: 0 }}
            animate={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </div>

      {/* Stop cards */}
      {nodes.map((node, i) => (
        <StopCard
          key={node.id}
          node={node}
          index={i}
          total={total}
          locale={locale}
          onTap={onNodeTap}
        />
      ))}
    </div>
  );
}
