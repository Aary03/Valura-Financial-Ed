"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Flame, Snowflake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import XPBar from "./XPBar";
import CoinCounter from "./CoinCounter";
import { useGameStore } from "@/lib/game/store";
import SanadIcon from "./SanadIcon";
import { WORLD_COORDS } from "@/lib/game/world-coords";

export interface HUDUser {
  displayName?: string;
  currentLevel: number;
  totalXP: number;
  valCoins: number;
  weeklyStreakCount: number;
  streakFreezeCount?: number;
}

interface HUDProps {
  user: HUDUser;
  locale?: string;
  onSanadOpen?: () => void;
}

function StreakPill({
  streak,
  freezes,
  locale,
}: {
  streak: number;
  freezes: number;
  locale: string;
}) {
  const isAr = locale === "ar";
  const active = streak > 0;
  const [open, setOpen] = useState(false);
  const tip = isAr
    ? `${freezes} تجميدات متاحة للسلسلة`
    : `${freezes} Streak Freezes available.`;

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2 transition-shadow hover:shadow-md"
        title={tip}
        aria-label={tip}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        {active ? (
          <span
            className="inline-flex size-5 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #F5C872, #D4A95A)",
            }}
            aria-hidden
          >
            <Flame className="size-3.5 text-[#FFFAF0]" strokeWidth={2.2} />
          </span>
        ) : (
          <Flame className="size-5 text-[#94A3B8]" strokeWidth={2} aria-hidden />
        )}
        <span
          className="font-heading text-base font-semibold tabular-nums"
          style={{ color: active ? "#00111B" : "#94A3B8" }}
        >
          {streak}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute end-0 top-full z-50 mt-2 max-w-xs rounded-lg px-4 py-3 shadow-xl"
            style={{ background: "#00111B" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
          >
            <p className="font-body text-xs" style={{ color: "#FFFFFC" }}>
              {tip}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Snowflake className="size-3.5 text-[#B4E3C8]" aria-hidden />
              <p className="font-body text-[11px]" style={{ color: "#94A3B8" }}>
                {freezes}{" "}
                {isAr ? "تجميد" : freezes === 1 ? "freeze" : "freezes"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsMenu({
  locale,
  initial,
  onCloseParent,
}: {
  locale: string;
  initial: string;
  onCloseParent?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const next = isAr ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    setOpen(false);
    router.replace(newPath);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#FFFFFC] font-display text-sm font-bold transition-transform active:scale-[0.98]"
        style={{ color: "#00111B" }}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        aria-label={isAr ? "القائمة" : "Menu"}
      >
        {initial}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute end-0 top-full z-[80] mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white py-2 shadow-xl"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            <Link
              href={`/${locale}/profile`}
              className="block px-4 py-2.5 font-heading text-sm font-semibold text-[#00111B] hover:bg-[#F0F9F2]"
              onClick={() => {
                setOpen(false);
                onCloseParent?.();
              }}
            >
              {isAr ? "الملف" : "Profile"}
            </Link>
            <Link
              href={`/${locale}/profile`}
              className="block px-4 py-2.5 font-heading text-sm font-semibold text-[#00111B] hover:bg-[#F0F9F2]"
              onClick={() => {
                setOpen(false);
                onCloseParent?.();
              }}
            >
              {isAr ? "الإعدادات" : "Settings"}
            </Link>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-start font-heading text-sm font-semibold text-[#00111B] hover:bg-[#F0F9F2]"
              role="menuitem"
              onClick={toggleLocale}
            >
              <span aria-hidden="true">{isAr ? "🇬🇧" : "🇦🇪"}</span>
              <span>{isAr ? "English" : "عربي"}</span>
            </button>
            <div className="my-1 border-t border-[#F1F5F9]" role="separator" />
            <button
              type="button"
              className="w-full px-4 py-2.5 text-start font-heading text-sm font-semibold text-[#475569] hover:bg-[#F5F7FA]"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                void signOut({ callbackUrl: `/${locale}` });
              }}
            >
              {isAr ? "تسجيل الخروج" : "Sign out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Sticky journey HUD — avatar + XP · VAL Coins · streak · Sanad · settings.
 */
export default function HUD({ user, locale = "en", onSanadOpen }: HUDProps) {
  const isHydrated = useGameStore((s) => s.isHydrated);
  const storeXp = useGameStore((s) => s.xp);
  const storeCoins = useGameStore((s) => s.valCoins);
  const storeStreak = useGameStore((s) => s.streak);

  const liveXp = isHydrated ? storeXp : user.totalXP;
  const liveCoins = isHydrated ? storeCoins : user.valCoins;
  const liveStreak = isHydrated ? storeStreak : user.weeklyStreakCount;

  const initial = (user.displayName?.[0] ?? "V").toUpperCase();
  const name = user.displayName ?? (locale === "ar" ? "مستكشف" : "Explorer");
  const freezes = user.streakFreezeCount ?? 0;

  const worldIdx = Math.min(
    Math.max(user.currentLevel - 1, 0),
    WORLD_COORDS.length - 1,
  );
  const worldLabel =
    locale === "ar"
      ? WORLD_COORDS[worldIdx]?.nameAr
      : WORLD_COORDS[worldIdx]?.nameEn;
  const levelLine =
    locale === "ar"
      ? `المستوى ${user.currentLevel} · ${worldLabel ?? ""}`
      : `Level ${user.currentLevel} · ${worldLabel ?? ""}`;

  return (
    <header
      className="sticky top-0 z-40 h-20 w-full border-b border-[#E2E8F0] backdrop-blur-sm"
      style={{ background: "rgba(255,255,252,0.94)" }}
      role="banner"
    >
      <div className="mx-auto flex min-h-[5rem] w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link
            href={`/${locale}/profile`}
            className="flex size-12 shrink-0 items-center justify-center rounded-full font-display text-[22px] font-bold text-[#FFFFF8] ring-2 ring-[#B4E3C8]/30 transition-transform active:scale-[0.98]"
            style={{ background: "#05A049" }}
            aria-label={locale === "ar" ? "الملف الشخصي" : "Profile"}
          >
            {initial}
          </Link>
          <div className="min-w-0 flex-1">
            <p
              className="truncate font-heading text-base font-semibold"
              style={{ color: "#00111B" }}
            >
              {name}
            </p>
            <p className="font-body text-[13px]" style={{ color: "#475569" }}>
              {levelLine}
            </p>
            <XPBar totalXP={liveXp} currentLevel={user.currentLevel} />
          </div>
        </div>

        <div className="flex shrink-0">
          <CoinCounter amount={liveCoins} locale={locale} />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <StreakPill
            streak={liveStreak}
            freezes={freezes}
            locale={locale}
          />

          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white transition-shadow hover:shadow-md active:scale-[0.98]"
            onClick={() => onSanadOpen?.()}
            aria-label={locale === "ar" ? "سند" : "Sanad"}
          >
            <SanadIcon
              mood="idle"
              size="md"
              facing={locale === "ar" ? "left" : "right"}
            />
          </button>

          <SettingsMenu locale={locale} initial={initial} />

        </div>
      </div>
    </header>
  );
}
