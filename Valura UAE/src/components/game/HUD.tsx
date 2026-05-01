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
import Wordmark from "@/components/brand/Wordmark";
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
        className="flex h-10 items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 transition-shadow hover:shadow-md"
        title={tip}
        aria-label={tip}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        {active ? (
          <Flame
            className="size-4"
            style={{
              color: "#F97316",
              filter: "drop-shadow(0 0 4px rgba(249,115,22,0.4))",
            }}
            strokeWidth={2}
            aria-hidden
          />
        ) : (
          <Flame className="size-4 text-[#94A3B8]" strokeWidth={2} aria-hidden />
        )}
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: active ? "#00111B" : "#94A3B8",
          }}
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
}: {
  locale: string;
  initial: string;
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
      {/* Avatar button with double-ring */}
      <button
        type="button"
        className="flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-[#FFFFF8] transition-transform active:scale-[0.98]"
        style={{
          background: "#05A049",
          boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 4px rgba(180,227,200,0.3)",
        }}
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
              onClick={() => setOpen(false)}
            >
              {isAr ? "الملف" : "Profile"}
            </Link>
            <Link
              href={`/${locale}/profile`}
              className="block px-4 py-2.5 font-heading text-sm font-semibold text-[#00111B] hover:bg-[#F0F9F2]"
              onClick={() => setOpen(false)}
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
 * Sticky journey HUD — avatar + level + XP · VAL Coins · streak · Sanad · settings.
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
      className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] backdrop-blur-sm"
      style={{ background: "rgba(255,255,252,0.94)" }}
      role="banner"
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-x-4 gap-y-3 px-4 sm:px-8">

        {/* Left: name + level + XP */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Avatar — double ring per spec */}
          <Link
            href={`/${locale}/profile`}
            className="flex size-11 shrink-0 items-center justify-center rounded-full font-display text-[18px] font-bold text-[#FFFFF8] transition-transform active:scale-[0.98]"
            style={{
              background: "#05A049",
              boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 4px rgba(180,227,200,0.3)",
            }}
            aria-label={locale === "ar" ? "الملف الشخصي" : "Profile"}
          >
            {initial}
          </Link>

          {/* Name + level row */}
          <div className="min-w-0 flex-1 space-y-0.5">
            <p
              className="truncate"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#00111B",
                lineHeight: 1.2,
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#475569",
                lineHeight: 1.2,
              }}
            >
              {levelLine}
            </p>
            <XPBar totalXP={liveXp} currentLevel={user.currentLevel} />
          </div>
        </div>

        {/* Center: VAL Coins */}
        <div className="hidden shrink-0 sm:flex">
          <CoinCounter amount={liveCoins} locale={locale} />
        </div>

        {/* Right: streak · sanad · avatar/menu */}
        <div className="flex shrink-0 items-center gap-2.5">
          <StreakPill streak={liveStreak} freezes={freezes} locale={locale} />

          {/* Sanad orb — 44px circle */}
          <button
            type="button"
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white transition-shadow hover:shadow-md active:scale-[0.98]"
            onClick={() => onSanadOpen?.()}
            aria-label={locale === "ar" ? "سند" : "Sanad"}
          >
            <SanadIcon
              mood="idle"
              size="md"
              facing={locale === "ar" ? "left" : "right"}
            />
            {/* Mint pulse dot — "has a line to say" indicator */}
            <span
              className="absolute right-0.5 top-0.5 size-2.5 rounded-full border-2 border-white bg-[#05A049]"
              aria-hidden
            />
          </button>

          <SettingsMenu locale={locale} initial={initial} />
        </div>
      </div>
    </header>
  );
}
