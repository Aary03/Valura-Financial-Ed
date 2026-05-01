"use client";

import { WORLD_EMBLEMS } from "@/lib/game/world-emblems";

// Per-world gradient & tint  (light, premium, on-brand)
const BANNER_THEME: Record<string, { from: string; to: string; tint: string }> = {
  "marina-mile":        { from: "#E8FFF4", to: "#F0FFFE", tint: "#05A049" },
  "skyline-heights":    { from: "#E8F4FF", to: "#F0F8FF", tint: "#1A6BAD" },
  "souk-of-savings":    { from: "#FFF8E8", to: "#FFF3D6", tint: "#C47C10" },
  "dirham-desert":      { from: "#FFF9EC", to: "#FFF4D6", tint: "#D4A95A" },
  "loan-lighthouse":    { from: "#EEF9FF", to: "#E0F4FF", tint: "#0A7CB8" },
  "card-canyon":        { from: "#F0F0FF", to: "#E8E8FF", tint: "#4A4ACA" },
  "oasis-of-insurance": { from: "#EDFFF5", to: "#E0FFF0", tint: "#05A049" },
  "asset-atlas":        { from: "#EAF4FF", to: "#DCF0FF", tint: "#1264A0" },
  "skyline-keys":       { from: "#FEFCE8", to: "#FFF8D4", tint: "#A07C30" },
  "halal-harbour":      { from: "#E8F7FF", to: "#DAEEFF", tint: "#0B6FA8" },
  "gratuity-garden":    { from: "#EDFFF3", to: "#DCFAE8", tint: "#0D8A50" },
  "family-majlis":      { from: "#FFF8F0", to: "#FFEEDD", tint: "#B05C00" },
  "bridge-of-borders":  { from: "#ECF9FF", to: "#DAEEFF", tint: "#0A6080" },
  "scam-sentinel":      { from: "#F0F4FF", to: "#E4EAFF", tint: "#3050C8" },
  "goal-garden":        { from: "#EAFFF0", to: "#DCFAE8", tint: "#08944A" },
};

interface WorldBannerProps {
  bannerKey: string;
  nameEn: string;
  className?: string;
}

/**
 * Light, on-brand hero banner — cream-to-tint gradient + centred world emblem.
 * Replaces the old dark night-sky banners.
 */
export default function WorldBanner({ bannerKey, nameEn, className }: WorldBannerProps) {
  const theme  = BANNER_THEME[bannerKey] ?? BANNER_THEME["marina-mile"]!;
  const emblem = WORLD_EMBLEMS[bannerKey];

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(145deg, ${theme.from} 0%, ${theme.to} 100%)`,
        overflow: "hidden",
        borderRadius: "0 0 1.5rem 1.5rem",
        position: "relative",
      }}
    >
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0,17,27,0.07) 0.8px, transparent 0.8px)",
          backgroundSize: "8px 8px",
          opacity: 0.4,
        }}
        aria-hidden
      />

      {/* Soft tint radial blob */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 62% 42%, ${theme.tint}22 0%, transparent 75%)`,
        }}
        aria-hidden
      />

      {/* Faded world name watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span
          className="select-none whitespace-nowrap font-display text-[clamp(48px,9vw,84px)] font-bold uppercase tracking-tight"
          style={{ color: theme.tint, opacity: 0.04 }}
        >
          {nameEn}
        </span>
      </div>

      {/* Centred emblem */}
      <div className="relative flex h-full items-center justify-center py-8">
        <div
          className="flex items-center justify-center rounded-3xl p-5"
          style={{
            background: "rgba(255,255,252,0.7)",
            border: "1.5px solid rgba(255,255,252,0.9)",
            boxShadow: "0 8px 32px rgba(0,17,27,0.06)",
          }}
        >
          <div
            style={{
              color: theme.tint,
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {emblem ? (
              <span
                style={{
                  display: "inline-flex",
                  transform: "scale(3)",
                  transformOrigin: "center",
                }}
              >
                {emblem}
              </span>
            ) : (
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none">
                <circle cx="12" cy="12" r="9" stroke={theme.tint} strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke={theme.tint} strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
