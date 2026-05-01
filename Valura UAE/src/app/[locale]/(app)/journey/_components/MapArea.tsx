"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import WorldNode from "@/components/game/WorldNode";
import JourneyBackground from "@/components/game/JourneyBackground";
import WorldDetailSheet from "./WorldDetailSheet";
import { WORLD_EMBLEMS } from "@/lib/game/world-emblems";
import {
  WORLD_COORDS,
  MAP_WIDTH,
  MAP_HEIGHT,
  mapCoordsToPath,
} from "@/lib/game/world-coords";

interface MapAreaProps {
  currentLevel: number;
  locale: string;
  masteryWorldSlugs?: string[];
}

export default function MapArea({
  currentLevel,
  locale,
  masteryWorldSlugs = [],
}: MapAreaProps) {
  const [detailSlug, setDetailSlug] = useState<string | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";

  const pathD = mapCoordsToPath(WORLD_COORDS);

  const revealFraction = Math.max(
    0.02,
    (currentLevel - 1) / Math.max(WORLD_COORDS.length - 1, 1),
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const sync = () => {
      const m = Math.max(0, el.scrollWidth - el.clientWidth);
      setMaxScroll(m);
      setScrollLeft(el.scrollLeft);
      if (el.scrollLeft > 20) setShowScrollHint(false);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", sync);
    };
  }, []);

  const detailWorld =
    detailSlug ?
      WORLD_COORDS.find((w) => w.slug === detailSlug) ?? null
    : null;

  const worldsPosition = Math.min(
    Math.max(currentLevel, 1),
    WORLD_COORDS.length,
  );

  const viewportHStyle = {
    height: "calc(100vh - 5rem)",
    minHeight: 420,
  } as const;

  return (
    <>
      <WorldDetailSheet
        locale={locale}
        world={detailWorld}
        open={detailSlug !== null && detailWorld !== null}
        onClose={() => setDetailSlug(null)}
      />

      {/* Mobile: premium vertical world list */}
      <div className="md:hidden w-full px-4 pt-4 pb-28">
        <div className="mx-auto max-w-md space-y-2">
          {/* Progress summary pill */}
          <div className="flex items-center justify-between px-2 pb-3">
            <p className="font-body text-[12px]" style={{ color: "#94A3B8" }}>
              {locale === "ar" ? "الرحلة" : "Journey"}
            </p>
            <span className="rounded-full px-3 py-1 font-heading text-[11px] font-bold"
              style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}>
              {Math.max(0, currentLevel - 1)} / {WORLD_COORDS.length}
              {locale === "ar" ? " مكتمل" : " done"}
            </span>
          </div>

          {WORLD_COORDS.map((world, i) => {
            const locked    = i >= currentLevel;
            const completed = i < currentLevel - 1;
            const current   = i === currentLevel - 1 && !locked;
            const hasMastery = masteryWorldSlugs.includes(world.slug);
            const label = locale === "ar" ? world.nameAr : world.nameEn;
            const tagline = locale === "ar" ? world.taglineAr : world.taglineEn;
            const emblem = WORLD_EMBLEMS[world.slug];

            return (
              <button
                key={world.slug}
                type="button"
                onClick={() => setDetailSlug(world.slug)}
                disabled={locked}
                className="relative w-full flex items-center gap-4 rounded-2xl px-4 py-3.5 text-start transition-all active:scale-[0.98]"
                style={{
                  background: completed
                    ? "rgba(5,160,73,0.05)"
                    : current
                      ? "#FFFFFC"
                      : "rgba(0,17,27,0.02)",
                  border: current
                    ? "1.5px solid #05A049"
                    : completed
                      ? "1.5px solid rgba(5,160,73,0.20)"
                      : "1.5px solid rgba(0,17,27,0.07)",
                  boxShadow: current
                    ? "0 4px 16px rgba(5,160,73,0.12)"
                    : completed
                      ? "none"
                      : "none",
                  opacity: locked ? 0.5 : 1,
                }}
              >
                {/* Left: node circle */}
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: completed
                      ? "#05A049"
                      : current
                        ? "linear-gradient(135deg,#ECFDF5,#D1FAE5)"
                        : "#F1F5F9",
                    border: current ? "2px solid #05A049" : "none",
                  }}
                >
                  {completed ? (
                    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M5 10l4 4 6-7" stroke="#FFFFFC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : locked ? (
                    <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <rect x="5" y="9" width="10" height="8" rx="2" stroke="#94A3B8" strokeWidth="1.6" />
                      <path d="M7 9V7a3 3 0 016 0v2" stroke="#94A3B8" strokeWidth="1.6" />
                    </svg>
                  ) : emblem ? (
                    <span className="flex items-center justify-center [&>svg]:size-6">{emblem}</span>
                  ) : null}
                </div>

                {/* Center: text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className="font-heading text-sm font-bold truncate"
                      style={{ color: locked ? "#94A3B8" : completed ? "#059669" : "#00111B" }}
                    >
                      {label}
                    </p>
                    {current && !completed && (
                      <span className="shrink-0 rounded-full px-2 py-0.5 font-heading text-[9px] font-extrabold uppercase tracking-wide"
                        style={{ background: "#05A049", color: "#FFFFFC" }}>
                        {locale === "ar" ? "الآن" : "Now"}
                      </span>
                    )}
                    {hasMastery && (
                      <span className="size-2 shrink-0 rounded-full" style={{ background: "#D4A95A" }} aria-label="Mastery review" />
                    )}
                  </div>
                  <p className="mt-0.5 font-body text-[11px] truncate" style={{ color: "#94A3B8" }}>
                    {tagline}
                  </p>
                </div>

                {/* Right: number badge */}
                <span className="shrink-0 font-heading text-[11px] font-bold tabular-nums"
                  style={{ color: locked ? "#CBD5E1" : completed ? "#059669" : "#475569" }}>
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop+: horizontal cinematic map */}
      <div
        className="relative hidden md:block min-h-[420px]"
        style={viewportHStyle}
      >
        {/* Scroll LEFT button — appears once scrolled right */}
        {scrollLeft > 80 && (
          <button
            type="button"
            aria-label={locale === "ar" ? "تمرير يسار" : "Scroll left"}
            className="absolute start-8 top-1/2 z-30 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white shadow-md transition-all hover:shadow-lg active:scale-95"
            onClick={() => scrollRef.current?.scrollBy({ left: -720, behavior: "smooth" })}
          >
            <ChevronRight className="size-[18px] rotate-180 rtl:rotate-0" style={{ color: "#05A049" }} strokeWidth={2} />
          </button>
        )}

        {/* Scroll RIGHT button — always visible, bounces subtly */}
        {scrollLeft < maxScroll - 40 && (
          <button
            type="button"
            aria-label={locale === "ar" ? "تمرير يمين" : "Scroll right"}
            className="journey-scroll-hint absolute end-8 top-1/2 z-30 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white shadow-md transition-all hover:shadow-lg active:scale-95"
            onClick={() => scrollRef.current?.scrollBy({ left: 720, behavior: "smooth" })}
          >
            <ChevronRight className="size-[18px] rtl:rotate-180" style={{ color: "#05A049" }} strokeWidth={2} />
          </button>
        )}

        <div
          ref={scrollRef}
          data-map-scroll
          className="relative h-full w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
          onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        >
          <style>{`[data-map-scroll]::-webkit-scrollbar { display: none; }`}</style>

          <div
            className="relative mx-auto h-full snap-center"
            style={{
              width: MAP_WIDTH,
              minWidth: MAP_WIDTH,
              maxWidth: MAP_WIDTH,
            }}
          >
            <JourneyBackground
              mapWidth={MAP_WIDTH}
              mapHeight={MAP_HEIGHT}
              scrollLeft={scrollLeft}
              maxScrollHint={maxScroll}
            />

            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="absolute start-0 top-0 block"
              style={{ transform: isAr ? "scaleX(-1)" : "none" }}
              aria-hidden
            >
              <defs>
                <filter id="road-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="4"
                    floodColor="rgba(5,160,73,0.35)"
                  />
                </filter>
              </defs>

              <path
                d={pathD}
                fill="none"
                stroke="#B4E3C8"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="12 8"
              />

              <motion.path
                d={pathD}
                fill="none"
                stroke="#05A049"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#road-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: revealFraction }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>

            {WORLD_COORDS.map((world, i) => {
              const displayX = isAr ? MAP_WIDTH - world.mapX : world.mapX;
              const hasMastery = masteryWorldSlugs.includes(world.slug);

              return (
                <WorldNode
                  key={world.slug}
                  world={world}
                  index={i}
                  currentLevel={currentLevel}
                  hasMasteryReview={hasMastery}
                  locale={locale}
                  onActivate={() => setDetailSlug(world.slug)}
                  style={{
                    left: displayX,
                    top: world.mapY,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center px-6"
          aria-hidden
        >
          <span
            className="rounded-full px-4 py-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow:
                "0 2px 8px rgba(0,17,27,0.06), 0 8px 24px rgba(0,17,27,0.08)",
              color: "#475569",
            }}
          >
            {locale === "ar"
              ? `${worldsPosition}\u202F/\u202F${WORLD_COORDS.length} عالمًا`
              : `${worldsPosition} / ${WORLD_COORDS.length} worlds`}
          </span>
        </div>
      </div>
    </>
  );
}
