"use client";

import { useTranslations } from "next-intl";
import { useGameStore } from "@/lib/store/gameStore";
import { cn } from "@/lib/utils";

/**
 * Content track toggle — switches between Conventional and Islamic finance modes.
 * Swaps vocabulary: interest ↔ profit/rental/fee across the entire app.
 */
export default function ContentTrackToggle() {
  const t = useTranslations("contentTrack");
  const { contentTrack, setContentTrack } = useGameStore();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center rounded-full p-1 bg-[var(--surface)] border border-[var(--border)]"
    >
      {(["conventional", "islamic"] as const).map((track) => (
        <button
          key={track}
          onClick={() => setContentTrack(track)}
          aria-pressed={contentTrack === track}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
            contentTrack === track
              ? "bg-navy text-cream shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          )}
        >
          {t(track)}
        </button>
      ))}
    </div>
  );
}
