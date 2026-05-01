"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, MapPin, Trophy, ArrowRight } from "lucide-react";
import type { WorldContent, WorldNode as WNode, NodeState } from "@/lib/game/world-content";
import { WORLD_COORDS } from "@/lib/game/world-coords";
import { useGameStore } from "@/lib/game/store";
import WorldBanner from "./WorldBanner";
import WorldRoad from "./WorldRoad";
import NodeModal from "./NodeModal";

interface WorldScreenProps {
  world: WorldContent;
  locale: string;
}

export default function WorldScreen({ world, locale }: WorldScreenProps) {
  const [nodes, setNodes]         = useState<WNode[]>(world.nodes);
  const [activeNode, setActiveNode] = useState<WNode | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const isAr = locale === "ar";
  const router = useRouter();

  const completeWorld = useGameStore((s) => s.completeWorld);
  const completedWorlds = useGameStore((s) => s.completedWorlds);

  const name      = isAr ? world.nameAr      : world.nameEn;
  const narrative = isAr ? world.narrativeAr : world.narrativeEn;

  const doneCount  = nodes.filter((n) => n.state === "done").length;
  const totalCount = nodes.length;

  // Find the next world to navigate to after this one
  const thisWorldIdx = WORLD_COORDS.findIndex((w) => w.slug === world.slug);
  const nextWorld = thisWorldIdx >= 0 ? WORLD_COORDS[thisWorldIdx + 1] : null;

  // Show completion overlay when all nodes done (and world not already marked complete)
  useEffect(() => {
    if (totalCount > 0 && doneCount === totalCount && !completedWorlds.includes(world.slug)) {
      // Small delay so the last node's animation can finish
      const t = setTimeout(() => {
        completeWorld(world.slug);
        setShowComplete(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [doneCount, totalCount, world.slug, completeWorld, completedWorlds]);

  /** Called when a quiz/minigame finishes successfully. Marks it done + unlocks next. */
  function handleNodeComplete(completedId: string) {
    setNodes((prev) => {
      const idx = prev.findIndex((n) => n.id === completedId);
      if (idx === -1) return prev;
      return prev.map((n, i): WNode => {
        if (n.id === completedId) return { ...n, state: "done" as NodeState };
        if (i === idx + 1 && n.state === "locked") return { ...n, state: "available" as NodeState };
        return n;
      });
    });
  }

  return (
    <>
      <NodeModal
        node={activeNode}
        locale={locale}
        onClose={() => setActiveNode(null)}
        onNodeComplete={handleNodeComplete}
      />

      {/* ── World Complete Celebration Overlay ───────────────────────── */}
      <AnimatePresence>
        {showComplete && (
          <>
            <motion.div
              className="fixed inset-0 z-[200]"
              style={{ background: "rgba(0,17,27,0.55)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-x-4 bottom-6 z-[210] mx-auto max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "#FFFFFC",
                boxShadow: "0 24px 80px rgba(0,17,27,0.18), 0 8px 24px rgba(0,17,27,0.10)",
                border: "1px solid #E2E8F0",
              }}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {/* Gold top strip */}
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, #D4A95A, #F5C872, #D4A95A)" }}
              />

              <div className="flex flex-col items-center gap-5 px-6 py-8 text-center">
                {/* Trophy icon */}
                <motion.div
                  className="flex size-20 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(135deg, #05A049 0%, #059669 100%)", boxShadow: "0 8px 30px rgba(5,160,73,0.30)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Trophy className="size-9" style={{ color: "#FFFFFC" }} />
                </motion.div>

                <div>
                  <p className="font-display text-2xl font-extrabold" style={{ color: "#00111B" }}>
                    {isAr ? "مبروك!" : "World Complete!"}
                  </p>
                  <p className="mt-1 font-body text-sm" style={{ color: "#475569" }}>
                    {isAr
                      ? `لقد أكملت ${name} بنجاح`
                      : `You've completed ${name}`}
                  </p>
                </div>

                {/* Reward chips */}
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 rounded-full px-3 py-1.5 font-heading text-xs font-bold"
                    style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}>
                    +1,200 XP
                  </span>
                  <span className="flex items-center gap-1 rounded-full px-3 py-1.5 font-heading text-xs font-bold"
                    style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FDE68A" }}>
                    +2,000 VAL
                  </span>
                </div>

                <div className="flex w-full flex-col gap-2.5">
                  {nextWorld ? (
                    <Link
                      href={`/${locale}/journey/${nextWorld.slug}`}
                      onClick={() => setShowComplete(false)}
                      className="flex items-center justify-center gap-2 rounded-2xl py-3.5 font-heading text-sm font-bold transition-all active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
                        color: "#FFFFFC",
                        boxShadow: "0 6px 20px rgba(5,160,73,0.28)",
                      }}
                    >
                      {isAr ? `التالي: ${nextWorld.nameAr}` : `Next: ${nextWorld.nameEn}`}
                      <ArrowRight className="size-4 rtl:-scale-x-[1]" aria-hidden />
                    </Link>
                  ) : (
                    <p className="font-heading text-sm font-bold" style={{ color: "#05A049" }}>
                      {isAr ? "أكملت كل العوالم!" : "You've completed all worlds!"}
                    </p>
                  )}
                  <Link
                    href={`/${locale}/journey`}
                    onClick={() => setShowComplete(false)}
                    className="rounded-2xl border py-3 font-heading text-sm font-semibold transition-all active:scale-95"
                    style={{ borderColor: "#E2E8F0", color: "#475569", background: "rgba(0,17,27,0.03)" }}
                  >
                    {isAr ? "العودة إلى الخريطة" : "Back to Journey map"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className="relative min-h-screen"
        dir={isAr ? "rtl" : "ltr"}
        style={{ background: "linear-gradient(180deg, #FFFFFC 0%, #F0F9F2 100%)" }}
      >
        {/* Dot-grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,17,27,0.04) 0.75px, transparent 0.75px)",
            backgroundSize: "8px 8px",
          }}
          aria-hidden
        />

        {/* ── Hero banner ──────────────────────────────────────────── */}
        <section className="relative h-56 w-full md:h-64" aria-label={`${name} banner`}>
          <WorldBanner
            bannerKey={world.bannerKey}
            nameEn={world.nameEn}
            className="absolute inset-0 h-full w-full"
          />

          {/* Fade into page bg */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
            style={{ background: "linear-gradient(to bottom, transparent, #F0F9F2)" }}
            aria-hidden
          />

          {/* Back button */}
          <Link
            href={`/${locale}/journey`}
            className="absolute start-6 top-5 flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[rgba(255,255,252,0.92)] px-4 py-2.5 font-heading text-sm font-semibold text-[#00111B] shadow-[0_2px_8px_rgba(0,17,27,0.05)] backdrop-blur-sm transition-shadow hover:shadow-md active:scale-[0.98]"
            aria-label={isAr ? "العودة إلى الرحلة" : "Back to journey"}
          >
            <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
            {isAr ? "العودة" : "Back to journey"}
          </Link>
        </section>

        {/* ── World title + stats ───────────────────────────────────── */}
        <section className="relative mx-auto max-w-3xl px-6 pb-2 pt-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1
                className="font-display text-[clamp(28px,5vw,40px)] font-bold leading-tight text-[#00111B]"
              >
                {name}
              </h1>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-[#475569] max-w-prose">
                {narrative}
              </p>
            </div>

            {totalCount > 0 && (
              <div
                className="flex shrink-0 flex-col items-center gap-1 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(0,17,27,0.04)]"
              >
                <span
                  className="font-display text-3xl font-bold tabular-nums text-[#05A049]"
                >
                  {doneCount}
                  <span className="text-[#94A3B8]">/{totalCount}</span>
                </span>
                <span className="font-body text-[11px] uppercase tracking-wider text-[#94A3B8]">
                  {isAr ? "مكتمل" : "Complete"}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── Stops ─────────────────────────────────────────────────── */}
        <section
          className="relative mx-auto max-w-3xl px-6 py-8"
          aria-label={isAr ? "محطات التعلم" : "Learning stops"}
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-[#05A049]" aria-hidden />
              <span className="font-heading text-[11px] font-bold uppercase tracking-widest text-[#05A049]">
                {isAr ? "محطات العالم" : "Stops in this world"}
              </span>
            </div>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          <WorldRoad
            nodes={nodes}
            locale={locale}
            onNodeTap={(node) => {
              if (node.state !== "locked") setActiveNode(node);
            }}
          />
        </section>

        {/* ── Disclaimer ────────────────────────────────────────────── */}
        <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-2">
          <div
            className="rounded-2xl border border-[#E2E8F0] border-l-[4px] border-l-[#D4A95A] bg-white p-4 shadow-[0_2px_8px_rgba(0,17,27,0.04)]"
          >
            <p className="font-body text-[13px] leading-relaxed text-[#475569]">
              {isAr
                ? "لأغراض تعليمية فقط — لا يُعد نصيحة مالية أو قانونية."
                : "Educational content only — not financial or legal advice."}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
