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

function StreakPill({ streak, freezes, locale }: { streak: number; freezes: number; locale: string }) {
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
        className="flex h-9 items-center gap-2 rounded-lg px-3 transition-colors"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        title={tip}
        aria-label={tip}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
      >
        <Flame
          className="size-4"
          style={{ color: active ? "#F97316" : "#4B5563" }}
          strokeWidth={2}
          aria-hidden
        />
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: active ? "#F0FDF4" : "#6B7280",
          }}
        >
          {streak}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute end-0 top-full z-50 mt-2 min-w-[180px] rounded-xl px-4 py-3 shadow-xl"
            style={{
              background: "#152213",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#F0FDF4" }}>
              {tip}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Snowflake className="size-3.5" style={{ color: "#60A5FA" }} aria-hidden />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6B7280" }}>
                {freezes} {isAr ? "تجميد" : freezes === 1 ? "freeze" : "freezes"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsMenu({ locale, initial }: { locale: string; initial: string }) {
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
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all active:scale-95"
        style={{
          background: "#22C55E",
          color: "#060D06",
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          boxShadow: "0 0 0 1px rgba(34,197,94,0.3)",
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
            className="absolute end-0 top-full z-[80] mt-2 min-w-[200px] overflow-hidden rounded-xl py-1 shadow-2xl"
            style={{
              background: "#152213",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            {[
              { label: isAr ? "الملف الشخصي" : "Profile", href: `/${locale}/profile` },
              { label: isAr ? "الإعدادات" : "Settings", href: `/${locale}/profile` },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block px-4 py-2.5 text-sm font-medium transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", color: "#D1FAE5" }}
                onClick={() => setOpen(false)}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-start text-sm font-medium transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", color: "#D1FAE5" }}
              role="menuitem"
              onClick={toggleLocale}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <span aria-hidden="true">{isAr ? "🇬🇧" : "🇦🇪"}</span>
              <span>{isAr ? "English" : "عربي"}</span>
            </button>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} role="separator" />
            <button
              type="button"
              className="w-full px-4 py-2.5 text-start text-sm transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280" }}
              role="menuitem"
              onClick={() => { setOpen(false); void signOut({ callbackUrl: `/${locale}` }); }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              {isAr ? "تسجيل الخروج" : "Sign out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

  const worldIdx = Math.min(Math.max(user.currentLevel - 1, 0), WORLD_COORDS.length - 1);
  const worldLabel = locale === "ar"
    ? WORLD_COORDS[worldIdx]?.nameAr
    : WORLD_COORDS[worldIdx]?.nameEn;
  const levelLine = locale === "ar"
    ? `المستوى ${user.currentLevel} · ${worldLabel ?? ""}`
    : `Level ${user.currentLevel} · ${worldLabel ?? ""}`;

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(8,15,8,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      role="banner"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-x-4 px-4 sm:px-8">

        {/* Left: avatar + name + XP */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            href={`/${locale}/profile`}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[15px] font-bold transition-all active:scale-95"
            style={{
              background: "#22C55E",
              color: "#060D06",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
            }}
            aria-label={locale === "ar" ? "الملف الشخصي" : "Profile"}
          >
            {initial}
          </Link>

          <div className="min-w-0 flex-1 space-y-0.5">
            <p
              className="truncate"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#F0FDF4",
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#6B7280",
              }}
            >
              {levelLine}
            </p>
            <XPBar totalXP={liveXp} currentLevel={user.currentLevel} />
          </div>
        </div>

        {/* Center: coins */}
        <div className="hidden shrink-0 sm:flex">
          <CoinCounter amount={liveCoins} locale={locale} />
        </div>

        {/* Right: streak · sanad · menu */}
        <div className="flex shrink-0 items-center gap-2">
          <StreakPill streak={liveStreak} freezes={freezes} locale={locale} />

          <button
            type="button"
            className="relative flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors active:scale-95"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={() => onSanadOpen?.()}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
            aria-label={locale === "ar" ? "سند" : "Sanad"}
          >
            <SanadIcon mood="idle" size="md" facing={locale === "ar" ? "left" : "right"} />
            <span
              className="absolute right-0.5 top-0.5 size-2 rounded-full"
              style={{ background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
              aria-hidden
            />
          </button>

          <SettingsMenu locale={locale} initial={initial} />
        </div>
      </div>
    </header>
  );
}
