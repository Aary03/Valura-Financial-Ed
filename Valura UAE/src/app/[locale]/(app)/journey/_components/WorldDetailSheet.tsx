"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gamepad2, Lightbulb, Trophy, ArrowRight } from "lucide-react";
import type { WorldCoord } from "@/lib/game/world-coords";
import { WORLD_EMBLEMS } from "@/lib/game/world-emblems";

const SHADOW_SURFACE =
  "shadow-[0_2px_8px_rgba(0,17,27,0.04),0_8px_24px_rgba(0,17,27,0.06)]";

const HERO_BG: Record<string, string> = {
  default:               "linear-gradient(145deg,#F0FFF4 0%,#FFFFFC 55%,#E8FCEE 100%)",
  "marina-mile":         "linear-gradient(145deg,#E8FFE8 0%,#FFFFF8 52%,#D9F9E8 100%)",
  "loan-lighthouse":     "linear-gradient(145deg,#E6F7FF 0%,#FFFFF8 40%,#E8FDF0 96%)",
  "scam-sentinel":       "linear-gradient(145deg,#F1FDF6 0%,#FFFFF8 50%,#E5F4EB 96%)",
};

interface WorldDetailSheetProps {
  locale: string;
  world: WorldCoord | null;
  open: boolean;
  onClose: () => void;
}

/** Full-height end sheet describing a world — opens from tapping a journey node */
export default function WorldDetailSheet({
  locale,
  world,
  open,
  onClose,
}: WorldDetailSheetProps) {
  const isAr      = locale === "ar";

  const name    = world ? (isAr ? world.nameAr : world.nameEn) : "";
  const tagline = world ? (isAr ? world.taglineAr : world.taglineEn) : "";
  const emblem  = world ? WORLD_EMBLEMS[world.slug] ?? null : null;
  const heroBg  = world ? HERO_BG[world.slug] ?? HERO_BG.default : HERO_BG.default;

  const narrative1 =
    tagline +
    (isAr
      ? " تأخذ هذا القوس من الرحلة بوتيرة مستقرة وبلا وقت زمني مستعجل."
      : " This arc is paced deliberately — each stop builds calmly on the last.");
  const narrative2 = isAr
    ? "تقدَّم قطعة قطعة؛ المهارات المالية تُقَوَّى بالتكرار الهادئ، لا بالمزيد من الضوضاء."
    : "You move with intention instead of adrenaline — comprehension comes before jargon.";

  const stops = [
    { Icon: Lightbulb, en: "Foundations quiz",         ar: "أساسيات — اختبار" },
    { Icon: Lightbulb, en: "Key terms unpacked",      ar: "مصطلحات وأسئلة وجيزة" },
    { Icon: BookOpen, en: "Story waypoint",           ar: "محطة قصيرة" },
    { Icon: Gamepad2, en: "Hands-on checkpoint",      ar: "نشاط تطبيقي" },
    { Icon: Trophy, en: "Integration recap",            ar: "تلخيص تكاملي" },
  ];

  return (
    <AnimatePresence>
      {open && world && (
        <>
          <motion.div
            className="fixed inset-0 z-[300] backdrop-blur-md"
            style={{ background: "rgba(0,17,27,0.38)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="world-sheet-title"
            className={`fixed inset-y-0 z-[310] flex w-full max-w-[480px] flex-col overflow-hidden border-[#E2E8F0] bg-[#FFFFF8] ${SHADOW_SURFACE} border-s`}
            style={{
              ...(isAr ? { left: 0, borderInlineEnd: "1px solid #E2E8F0" } : {
                right: 0,
                borderInlineEnd: "1px solid #E2E8F0",
              }),
              boxShadow:
                "-8px 0 40px rgba(0,17,27,0.08), 8px 0 40px rgba(0,17,27,0.04)",
            }}
            initial={{ x: isAr ? "-100%" : "100%", opacity: 0.93 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isAr ? "-100%" : "100%", opacity: 0.9 }}
            transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[220px] shrink-0 overflow-hidden" style={{ background: heroBg }}>
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 38% 12%, rgba(5,160,73,1) 0, transparent 45%)",
                }}
              />
              <div className="relative flex h-full flex-col items-center justify-center px-12">
                <div className="flex scale-[2.65]">{emblem}</div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-8 pt-9">
              <h2 id="world-sheet-title" className="font-display text-[2rem] leading-tight font-bold" style={{ color: "#00111B" }}>
                {name}
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: "#475569" }}>
                {isAr
                  ? "أساسيات مالية · مستوى مبتدئ · قرابة ٥ محطّات عملية · دون عدّ تنازلي"
                  : "Money basics · beginner · about 5 checkpoints · unrushed pacing"}
              </p>

              <article className="mt-11 space-y-6">
                <p className="font-body text-[15px] leading-relaxed text-balance break-words" style={{ color: "#1E293B" }}>
                  {narrative1}
                </p>
                <p className="font-body text-[15px] leading-relaxed text-balance break-words" style={{ color: "#1E293B" }}>
                  {narrative2}
                </p>
              </article>

              <div className="mt-14">
                <p className="font-heading text-[0.65rem] font-bold uppercase tracking-[0.32em]" style={{ color: "#94A3B8" }}>
                  {isAr ? "المحطات" : "Stops"}
                </p>
                <ul className="mt-5 divide-y divide-[#EFF2F6] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                  {stops.map((row, idx) => (
                    <li key={idx} className="flex items-center gap-4 px-5 py-4">
                      <row.Icon className="size-[18px] shrink-0" style={{ color: "#05A049" }} aria-hidden />
                      <span className="font-heading text-[0.938rem] font-semibold text-[#00111B]">
                        {isAr ? row.ar : row.en}
                      </span>
                      <span className="ms-auto font-body text-xs tabular-nums" style={{ color: "#94A3B8" }}>
                        ~60s
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <footer className="shrink-0 border-t border-[#E2E8F0] bg-[#FFFFFC]/95 px-8 py-8 backdrop-blur-sm">
              <Link
                href={`/${locale}/journey/${world.slug}`}
                onClick={onClose}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl font-heading text-[0.9625rem] font-semibold text-[#FFFFF8] transition-[transform] active:scale-[0.98]"
                style={{
                  background: "#05A049",
                  boxShadow: "0 8px 26px rgba(5,160,73,0.22)",
                }}
              >
                {isAr ? "ابدَأ" : "Begin"}
                <ArrowRight className="size-[18px] rtl:-scale-x-[1]" aria-hidden />
              </Link>
              <button type="button" onClick={onClose} className="mt-4 w-full rounded-2xl border border-[#E2E8F0] bg-white py-[0.8rem] font-heading text-[0.8rem] font-semibold uppercase tracking-[0.06em]" style={{
                color: "#475569",
              }}
              >
                {isAr ? "عودة إلى الخريطة" : "Back to journey"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
