"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Gamepad2, Trophy, Clock, HelpCircle } from "lucide-react";
import type { WorldNode, NodeKind } from "@/lib/game/world-content";
import QuizRunner from "@/components/game/QuizRunner";
import BudgetDragDrop from "@/components/game/minigames/BudgetDragDrop";
import ScamSpotter from "@/components/game/minigames/ScamSpotter";
import LoanSlider from "@/components/game/minigames/LoanSlider";
import type { QuizResult } from "@/lib/game/quiz-types";
import { useGameStore, useToastStore } from "@/lib/game/store";
import { markNodeComplete } from "@/app/actions/progress";
// ── Kind metadata ─────────────────────────────────────────────────────────────

const KIND_LABEL: Record<NodeKind, { en: string; ar: string }> = {
  quiz:     { en: "Quiz",        ar: "اختبار"   },
  story:    { en: "Story",       ar: "قصة"      },
  minigame: { en: "Mini-game",   ar: "لعبة صغيرة" },
  boss:     { en: "Boss Battle", ar: "معركة البوس" },
};

const KIND_COLOR: Record<NodeKind, string> = {
  quiz:     "#05A049",
  story:    "#0A2236",
  minigame: "#D4A95A",
  boss:     "#00111B",
};

const KIND_ICON = {
  quiz:     HelpCircle,
  story:    BookOpen,
  minigame: Gamepad2,
  boss:     Trophy,
};

// ── Live quiz content ─────────────────────────────────────────────────────────

function QuizContent({
  node, locale, onClose, onNodeComplete,
}: { node: WorldNode; locale: string; onClose: () => void; onNodeComplete?: (id: string) => void }) {
  function handleComplete(_result: QuizResult) {
    onNodeComplete?.(node.id);
    onClose();
  }
  return <QuizRunner nodeId={node.id} locale={locale} onComplete={handleComplete} />;
}

// ── Minigame picker ───────────────────────────────────────────────────────────

function MinigameContent({
  node, locale, onClose, onNodeComplete,
}: { node: WorldNode; locale: string; onClose: () => void; onNodeComplete?: (id: string) => void }) {
  const awardXp    = useGameStore((s) => s.awardXp);
  const awardCoins = useGameStore((s) => s.awardCoins);
  const addToast   = useToastStore((s) => s.addToast);

  function handleComplete(result: QuizResult) {
    // Award XP + coins from minigame result (or defaults if not provided)
    const xp    = result.xpEarned    > 0 ? result.xpEarned    : node.kind === "boss" ? 250 : 100;
    const coins = result.coinsEarned > 0 ? result.coinsEarned : node.kind === "boss" ? 2000 : 500;
    awardXp(xp);
    awardCoins(coins);
    addToast({ type: "xp",    amount: xp,    label: "XP" });
    addToast({ type: "coins", amount: coins, label: "VAL Coins" });
    // Non-blocking server persist
    void markNodeComplete(node.id, 100, xp, coins);
    onNodeComplete?.(node.id);
    onClose();
  }

  const id = node.id.toLowerCase();

  if (id.includes("scam") || id.includes("sms")) {
    return <ScamSpotter locale={locale} onComplete={handleComplete} />;
  }
  if (id.includes("loan") || id.includes("slider") || id.includes("interest")) {
    return <LoanSlider locale={locale} onComplete={handleComplete} />;
  }
  // Default: budget drag-drop
  return <BudgetDragDrop locale={locale} onComplete={handleComplete} />;
}

// ── Coming-soon placeholder for story nodes ───────────────────────────────────

function ComingSoonContent({
  node, locale, onClose, onNodeComplete,
}: { node: WorldNode; locale: string; onClose: () => void; onNodeComplete?: (id: string) => void }) {
  const isAr  = locale === "ar";
  const color = KIND_COLOR[node.kind];
  const Icon  = KIND_ICON[node.kind];
  const label = KIND_LABEL[node.kind][isAr ? "ar" : "en"];

  function handleBack() {
    // Mark as complete so the next stop unlocks — content is placeholder only.
    onNodeComplete?.(node.id);
    onClose();
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-6 text-center">
      <div
        className="flex size-16 items-center justify-center rounded-full"
        style={{ background: `${color}20` }}
      >
        <Icon className="size-8" style={{ color }} />
      </div>

      <div>
        <span
          className="inline-block rounded-full px-2.5 py-0.5 font-body text-[11px] font-semibold mb-2"
          style={{ background: `${color}15`, color }}
        >
          {label}
        </span>
        <p className="font-heading text-xl font-bold" style={{ color: "#00111B" }}>
          {isAr ? node.titleAr : node.titleEn}
        </p>
      </div>

      <div
        className="w-full rounded-2xl p-6"
        style={{ background: "rgba(212,169,90,0.08)", border: "1px dashed rgba(212,169,90,0.3)" }}
      >
        <Clock className="mx-auto mb-3 size-8" style={{ color: "#D4A95A", opacity: 0.7 }} />
        <p className="font-heading text-base font-semibold mb-1" style={{ color: "#00111B" }}>
          {isAr ? "قريباً!" : "Coming soon!"}
        </p>
        <p className="font-body text-xs leading-relaxed" style={{ color: "#64748B" }}>
          {isAr
            ? `محتوى ${label} قيد الإنتاج — سيُطلق في تحديث قادم.`
            : `${label} content is in production — launching in an upcoming update.`}
        </p>
      </div>

      <button
        onClick={handleBack}
        className="w-full rounded-xl py-3 font-heading text-sm font-bold text-cream transition-all hover:brightness-110 active:scale-95"
        style={{ background: "#00111B" }}
      >
        {isAr ? "متابعة" : "Mark as done & continue"}
      </button>
    </div>
  );
}

// ── NodeModal ─────────────────────────────────────────────────────────────────

interface NodeModalProps {
  node: WorldNode | null;
  locale: string;
  onClose: () => void;
  /** Fired when a quiz or minigame is successfully completed (not on dismiss). */
  onNodeComplete?: (completedNodeId: string) => void;
}

/**
 * On mobile: slides up as a bottom sheet.
 * On desktop (md+): appears as a large centered dialog taking 80% of the viewport.
 * Both variants share the same white surface and content components.
 */
export default function NodeModal({ node, locale, onClose, onNodeComplete }: NodeModalProps) {
  const isAr = locale === "ar";

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ background: "rgba(0,17,27,0.40)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Responsive sheet ────────────────────────────────────────
              Mobile  : full-width bottom sheet, slides up from y=100%
              Desktop : centered fixed dialog, fades + scales in        */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? node.titleAr : node.titleEn}
            dir={isAr ? "rtl" : "ltr"}
            className="
              fixed z-50 w-full overflow-y-auto
              inset-x-0 bottom-0
              md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
              md:w-[min(88vw,720px)]
            "
            style={{
              background: "#FFFFFC",
              borderRadius: "1.5rem 1.5rem 0 0",
              maxHeight: "92dvh",
              border: "1px solid #E2E8F0",
              boxShadow:
                "0 2px 8px rgba(0,17,27,0.04), 0 8px 24px rgba(0,17,27,0.06)",
            }}
            // Mobile animation: slide up
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Desktop: fully rounded */}
            <style>{`
              @media (min-width: 768px) {
                [data-node-modal] { border-radius: 1.5rem !important; }
              }
            `}</style>
            <div data-node-modal style={{ borderRadius: "inherit" }}>

              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="h-1 w-10 rounded-full" style={{ background: "rgba(0,17,27,0.15)" }} aria-hidden="true" />
              </div>
              {/* Spacer — desktop only */}
              <div className="hidden md:block h-4" />

              {/* ── Themed node header strip ────────────────────── */}
              <div
                className="mx-5 mb-3 mt-2 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: `${KIND_COLOR[node.kind]}12`,
                  border: `1.5px solid ${KIND_COLOR[node.kind]}25`,
                }}
              >
                {(() => { const Icon = KIND_ICON[node.kind]; return <Icon className="size-5 shrink-0" style={{ color: KIND_COLOR[node.kind] }} />; })()}
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold truncate" style={{ color: "#00111B" }}>
                    {isAr ? node.titleAr : node.titleEn}
                  </p>
                  <p className="font-body text-[11px]" style={{ color: KIND_COLOR[node.kind] }}>
                    {KIND_LABEL[node.kind][isAr ? "ar" : "en"]}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 end-3 flex size-8 items-center justify-center rounded-full transition-colors hover:bg-black/8 z-10"
                aria-label={isAr ? "إغلاق" : "Close"}
                style={{ color: "#64748B", background: "rgba(0,17,27,0.06)" }}
              >
                <X className="size-4" />
              </button>

              {/* Content by kind */}
              {node.kind === "quiz" && (
                <QuizContent node={node} locale={locale} onClose={onClose} onNodeComplete={onNodeComplete} />
              )}
              {(node.kind === "minigame" || node.kind === "boss") && (
                <MinigameContent node={node} locale={locale} onClose={onClose} onNodeComplete={onNodeComplete} />
              )}
              {node.kind === "story" && (
                <ComingSoonContent node={node} locale={locale} onClose={onClose} onNodeComplete={onNodeComplete} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
