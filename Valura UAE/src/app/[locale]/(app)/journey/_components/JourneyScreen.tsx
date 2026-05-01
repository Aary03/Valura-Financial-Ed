"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HUD, { type HUDUser } from "@/components/game/HUD";
import StoreHydrator from "@/components/game/StoreHydrator";
import MapArea from "./MapArea";
import SanadIcon from "@/components/game/SanadIcon";
import { getRandomLine } from "@/lib/game/sanad-lines";
import { useGameStore } from "@/lib/game/store";
import { WORLD_COORDS } from "@/lib/game/world-coords";

export interface JourneyUser extends HUDUser {
  avatarType: "FIGURE" | "HOME" | "GARDEN";
}

interface JourneyScreenProps {
  user: JourneyUser;
  locale: string;
  masteryWorldSlugs?: string[];
}

/**
 * Full-height journey map with premium cream–mint shell, HUD, and Sanad sheet.
 */
export default function JourneyScreen({
  user,
  locale,
  masteryWorldSlugs = [],
}: JourneyScreenProps) {
  const [sanadOpen, setSanadOpen] = useState(false);
  const [sanadLine, setSanadLine] = useState("");

  const openSanad = () => {
    setSanadLine(getRandomLine("onWelcome", locale));
    setSanadOpen(true);
  };

  const showFabPulse = masteryWorldSlugs.length > 0;

  // Compute effective level: max of server level and client-side completed worlds count.
  // This ensures progression works even in demo mode when DB writes are unavailable.
  const completedWorlds = useGameStore((s) => s.completedWorlds);
  const clientLevel = completedWorlds.reduce((maxIdx, slug) => {
    const idx = WORLD_COORDS.findIndex((w) => w.slug === slug);
    return idx >= 0 ? Math.max(maxIdx, idx + 2) : maxIdx;
  }, 1);
  const effectiveLevel = Math.max(user.currentLevel, clientLevel);

  return (
    <div
      className="relative flex min-h-0 min-h-[100dvh] flex-1 flex-col overflow-hidden"
      style={{
        background: "#080F08",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.03,
          backgroundImage: "radial-gradient(#00111B 0.75px, transparent 0.75px)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden
      />

      <StoreHydrator
        xp={user.totalXP}
        valCoins={user.valCoins}
        streak={user.weeklyStreakCount}
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <HUD user={user} locale={locale} onSanadOpen={openSanad} />

        <main
          className="relative z-10 flex min-h-0 flex-1 flex-col"
          aria-label={locale === "ar" ? "خريطة الرحلة" : "Journey map"}
        >
          <MapArea
            currentLevel={effectiveLevel}
            locale={locale}
            masteryWorldSlugs={masteryWorldSlugs}
          />
        </main>
      </div>

      {/* Floating Sanad — journey context helper */}
      <button
        type="button"
        className="fixed bottom-8 end-6 z-[60] flex size-14 items-center justify-center rounded-full border border-[#E2E8F0] bg-white shadow-[0_8px_24px_rgba(0,17,27,0.08)] transition-shadow hover:shadow-lg active:scale-[0.98] md:end-10"
        onClick={openSanad}
        aria-label={locale === "ar" ? "سند" : "Sanad"}
      >
        {showFabPulse && (
          <span
            className="absolute -end-0.5 -top-0.5 flex size-2.5 items-center justify-center"
            aria-hidden
          >
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-[#B4E3C8] opacity-50 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2.5 rounded-full border-2 border-white bg-[#48C896]" />
          </span>
        )}
        <SanadIcon
          mood="idle"
          size="md"
          facing={locale === "ar" ? "left" : "right"}
        />
      </button>

      <AnimatePresence>
        {sanadOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[100] cursor-default border-0 bg-[#00111B]/40 backdrop-blur-md"
              aria-label={locale === "ar" ? "إغلاق" : "Close"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSanadOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="sanad-line"
              className="fixed inset-x-0 bottom-0 z-[110] max-h-[min(45vh,420px)] overflow-y-auto rounded-t-3xl border border-[#E2E8F0] bg-[#FFFFFC] px-8 pb-10 pt-8 shadow-[0_-12px_40px_rgba(0,17,27,0.1)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-6 flex justify-center [&>svg]:size-16">
                <SanadIcon
                  mood="idle"
                  size="lg"
                  facing={locale === "ar" ? "left" : "right"}
                />
              </div>
              <p
                id="sanad-line"
                className="mx-auto max-w-md text-center font-body text-[15px] leading-relaxed"
                style={{ color: "#1E293B" }}
              >
                {sanadLine}
              </p>
              <button
                type="button"
                className="mx-auto mt-8 flex h-11 min-w-[160px] items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-6 font-heading text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F0F9F2]"
                onClick={() => setSanadOpen(false)}
              >
                {locale === "ar" ? "تم" : "Close"}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
