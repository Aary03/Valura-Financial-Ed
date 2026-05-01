"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Coins, Star, Flame, Gift } from "lucide-react";
import { Howl } from "howler";
import { useToastStore, type GameToast, type ToastType } from "@/lib/game/store";

// ── Visual config per toast type ──────────────────────────────────────────────

const TOAST_CONFIG: Record<
  ToastType,
  { color: string; bg: string; border: string; Icon: React.ElementType }
> = {
  xp:     { color: "#05A049", bg: "rgba(5,160,73,0.15)",    border: "rgba(5,160,73,0.35)",    Icon: Zap   },
  coins:  { color: "#D4A95A", bg: "rgba(212,169,90,0.15)", border: "rgba(212,169,90,0.35)", Icon: Coins },
  badge:  { color: "#D4A95A", bg: "rgba(212,169,90,0.15)", border: "rgba(212,169,90,0.35)", Icon: Star  },
  streak: { color: "#E05A2B", bg: "rgba(224,90,43,0.15)",  border: "rgba(224,90,43,0.35)", Icon: Flame },
  boost:  { color: "#7C3AED", bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.35)", Icon: Gift },
};

// ── Individual toast chip ─────────────────────────────────────────────────────

interface ChipProps {
  toast: GameToast;
  onDismiss: () => void;
}

function ToastChip({ toast, onDismiss }: ChipProps) {
  const cfg = TOAST_CONFIG[toast.type] ?? TOAST_CONFIG.xp;
  const { color, bg, border, Icon } = cfg;

  // Auto-dismiss after 2.5 s
  useEffect(() => {
    const id = setTimeout(onDismiss, 2500);
    return () => clearTimeout(id);
  }, [onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, x: 24, scale: 0.80 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="flex items-center gap-2 rounded-full px-3.5 py-2 shadow-xl"
      style={{
        background:     bg,
        border:         `1px solid ${border}`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        // Dark backing so the tint is readable over any background
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
      role="status"
      aria-live="polite"
      aria-label={`+${toast.amount} ${toast.label}`}
    >
      <Icon className="size-4 shrink-0" style={{ color }} aria-hidden="true" />

      <span
        className="font-heading text-sm font-extrabold tabular-nums"
        style={{ color }}
      >
        +{toast.amount.toLocaleString("en")}
      </span>

      <span
        className="font-body text-xs font-medium"
        style={{ color: "rgba(255,255,252,0.55)" }}
      >
        {toast.label}
      </span>
    </motion.div>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────

/**
 * Fixed bottom-end toast stack — place once in the (app) layout.
 *
 * Toasts stack upward from the bottom-end corner, newest closest to the anchor.
 * A Howler chime plays when a new toast is added.
 * Each chip auto-dismisses after 2.5 s with a slide-right + fade exit.
 */
export default function CoinDeltaToast() {
  const { toasts, removeToast } = useToastStore();
  const chimeRef   = useRef<Howl | null>(null);
  const prevLenRef = useRef(0);

  // Initialise chime sound once
  useEffect(() => {
    chimeRef.current = new Howl({
      src:    ["/audio/chime.mp3"],
      volume: 0.35,
      preload: true,
      onloaderror: () => { /* placeholder audio file not yet present */ },
    });
    return () => {
      chimeRef.current?.unload();
    };
  }, []);

  // Play chime whenever a new toast is enqueued
  useEffect(() => {
    if (toasts.length > prevLenRef.current) {
      chimeRef.current?.play();
    }
    prevLenRef.current = toasts.length;
  }, [toasts.length]);

  if (toasts.length === 0) return null;

  return (
    // pointer-events-none so it never blocks clicks beneath
    <div
      className="pointer-events-none fixed bottom-6 end-6 z-[200] flex flex-col items-end gap-2"
      aria-label="Notifications"
      role="region"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {toasts.map((toast) => (
          <ToastChip
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
