"use client";

/**
 * SanadDialog — the speech bubble that floats above Sanad.
 *
 * Usage:
 *   <div className="relative inline-block">
 *     <SanadDialog text={line} onDismiss={() => setLine(null)} />
 *     <Sanad mood="curious" size="md" />
 *   </div>
 *
 * The bubble is positioned `absolute bottom-full` so it always floats
 * directly above whichever Sanad it lives next to.
 *
 * Auto-dismisses after `dismissAfterMs` (default 3 500 ms).
 * Pass `onDismiss` to clear the parent's state so AnimatePresence can
 * unmount cleanly.
 */

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SanadDialogProps {
  /** The line to display. Pass null / undefined to hide the bubble. */
  text?:           string | null;
  /** Called after the auto-dismiss delay — use to clear parent state. */
  onDismiss?:      () => void;
  /** How long (ms) the bubble stays visible. Default 3 500. */
  dismissAfterMs?: number;
  /** Align bubble start-edge to the end-edge of Sanad. Default "start". */
  align?:          "start" | "center" | "end";
}

export default function SanadDialog({
  text,
  onDismiss,
  dismissAfterMs = 3_500,
  align          = "start",
}: SanadDialogProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset auto-dismiss whenever the text changes.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!text) return;

    timerRef.current = setTimeout(() => {
      onDismiss?.();
    }, dismissAfterMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, dismissAfterMs, onDismiss]);

  const alignClass =
    align === "center" ? "left-1/2 -translate-x-1/2"
    : align === "end"  ? "end-0"
    :                    "start-0";

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: -4, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className={`absolute bottom-full mb-3 z-30 ${alignClass}`}
          style={{ minWidth: 160, maxWidth: 240 }}
          onClick={onDismiss}
          role="status"
          aria-live="polite"
        >
          {/* Bubble body */}
          <div
            className="
              rounded-2xl px-3 py-2
              bg-[#FFFFFC] text-[#00111B]
              shadow-[0_4px_16px_rgba(0,17,27,0.18)]
              border border-[#B4E3C8]/60
              cursor-pointer select-none
            "
          >
            <p
              className="
                font-[family-name:var(--font-manrope)]
                text-[0.72rem] leading-snug font-semibold
                whitespace-pre-wrap
              "
            >
              {text}
            </p>
          </div>

          {/* Tail — triangle pointing down toward Sanad */}
          <div
            className="absolute start-4 bottom-[-6px]"
            aria-hidden="true"
          >
            <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
              <path d="M 0,0 L 7,7 L 14,0 Z" fill="#FFFFFC" />
              {/* Border on tail edges to match bubble border */}
              <path
                d="M 0,0 L 7,7 L 14,0"
                stroke="#B4E3C820"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
