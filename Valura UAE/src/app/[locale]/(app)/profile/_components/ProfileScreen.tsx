"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Snowflake, Star, Trophy, BookOpen } from "lucide-react";
import { WORLD_COORDS } from "@/lib/game/world-coords";
import { getMasteryTier, TIER_META, type MasteryTier } from "@/lib/game/mastery";
import BottomNav from "@/components/game/BottomNav";

// ── XP level thresholds ───────────────────────────────────────────────────────

const XP_PER_LEVEL = 500;
function xpToLevel(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}
function levelProgress(xp: number) {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}

// ── Coin SVG ──────────────────────────────────────────────────────────────────

function CoinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#D97706" />
      <circle cx="9" cy="9" r="7" fill="#B45309" />
      <circle cx="9" cy="9" r="5" fill="#D97706" opacity="0.5" />
      <text x="9" y="12.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFC">V</text>
    </svg>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHead({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex size-7 items-center justify-center rounded-xl"
        style={{ background: "rgba(5,160,73,0.10)", color: "#059669" }}>
        {icon}
      </div>
      <p className="font-heading text-sm font-bold uppercase tracking-wide" style={{ color: "#475569" }}>
        {title}
      </p>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface MasteryRow {
  nodeId: string;
  worldId: string;
  intervalDays: number;
  nextReviewAt: Date;
}

interface BadgeRow {
  slug: string;
  nameEn: string;
  nameAr: string;
  kind: string;
  tier: string | null;
  iconKey: string;
  earnedAt: Date;
}

interface ProfileUser {
  displayName: string | null;
  currentLevel: number;
  totalXP: number;
  valCoins: number;
  weeklyStreakCount: number;
  streakFreezeCount: number;
}

// ── Mastery world card ─────────────────────────────────────────────────────────

function MasteryWorldCard({ worldSlug, tier, locale }: {
  worldSlug: string; tier: MasteryTier; locale: string;
}) {
  const isAr = locale === "ar";
  const world = WORLD_COORDS.find((w) => w.slug === worldSlug);
  const meta  = TIER_META[tier];
  const isDue = false; // future: pass due status

  return (
    <motion.div
      className="flex flex-col items-center gap-2 rounded-2xl p-3 text-center"
      style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-2xl">{meta.emoji}</span>
      <div>
        <p className="font-heading text-[11px] font-bold" style={{ color: meta.color }}>
          {isAr ? meta.label.ar : meta.label.en}
        </p>
        <p className="font-body text-[10px] leading-snug mt-0.5 truncate w-20" style={{ color: "#64748B" }}>
          {world ? (isAr ? world.nameAr : world.nameEn) : worldSlug}
        </p>
      </div>
      {isDue && (
        <span
          className="text-[9px] rounded-full px-1.5 py-0.5 font-heading font-bold"
          style={{ background: "#FFFBEB", color: "#D97706" }}
        >
          {isAr ? "مراجعة" : "Review"}
        </span>
      )}
    </motion.div>
  );
}

// ── Badge card ────────────────────────────────────────────────────────────────

const KIND_ICONS: Record<string, React.ReactNode> = {
  MASTERY:   <Star   className="size-4" />,
  STREAK:    <Flame  className="size-4" />,
  MILESTONE: <Trophy className="size-4" />,
  GENERAL:   <Star   className="size-4" />,
};

function BadgeCard({ badge, locale }: { badge: BadgeRow; locale: string }) {
  const isAr = locale === "ar";
  const tier  = badge.tier as MasteryTier | null;
  const meta  = tier ? TIER_META[tier] : null;
  return (
    <motion.div
      className="flex flex-col items-center gap-2 rounded-2xl p-3 text-center"
      style={{
        background: meta?.bg ?? "#F8FAFC",
        border: `1.5px solid ${meta?.border ?? "rgba(0,17,27,0.07)"}`,
      }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div
        className="flex size-9 items-center justify-center rounded-xl"
        style={{ background: meta ? `${meta.color}18` : "rgba(0,17,27,0.06)", color: meta?.color ?? "#64748B" }}
      >
        {KIND_ICONS[badge.kind] ?? <Star className="size-4" />}
      </div>
      <p className="font-body text-[10px] leading-snug truncate w-20" style={{ color: "#475569" }}>
        {isAr ? badge.nameAr : badge.nameEn}
      </p>
    </motion.div>
  );
}

// ── ProfileScreen ─────────────────────────────────────────────────────────────

interface ProfileScreenProps {
  locale: string;
  user: ProfileUser;
  masteryData: MasteryRow[];
  badges: BadgeRow[];
}

export default function ProfileScreen({ locale, user, masteryData, badges }: ProfileScreenProps) {
  const isAr = locale === "ar";

  const level    = xpToLevel(user.totalXP);
  const progress = levelProgress(user.totalXP);
  const initial  = (user.displayName?.[0] ?? "V").toUpperCase();
  const name     = user.displayName ?? (isAr ? "مستكشف" : "Explorer");

  // Deduplicate mastery by world — keep highest intervalDays per world
  const worldMastery = new Map<string, MasteryTier>();
  for (const row of masteryData) {
    const tier    = getMasteryTier(row.intervalDays);
    const current = worldMastery.get(row.worldId);
    const rank    = { BRONZE: 0, SILVER: 1, GOLD: 2, PLATINUM: 3 };
    if (!current || rank[tier] > rank[current]) {
      worldMastery.set(row.worldId, tier);
    }
  }

  const masteryEntries = Array.from(worldMastery.entries());
  const platCount  = masteryEntries.filter(([, t]) => t === "PLATINUM").length;
  const goldCount  = masteryEntries.filter(([, t]) => t === "GOLD").length;

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "#080F08" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(248,250,252,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,17,27,0.07)",
        }}
      >
          <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
          <Link href={`/${locale}/journey`}
            className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label={isAr ? "العودة" : "Back"}>
            <ArrowLeft className="size-5" style={{ color: "#475569" }} />
          </Link>
          <p className="font-heading text-base font-bold flex-1" style={{ color: "#00111B" }}>
            {isAr ? "ملفي" : "My Profile"}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl flex flex-col gap-5 px-6 py-5 pb-28">

        {/* ── Avatar + Name ─────────────────────────────────────── */}
        <div
          className="rounded-3xl p-6 flex flex-col items-center gap-4"
          style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
        >
          <motion.div
            className="flex size-20 items-center justify-center rounded-full font-heading text-3xl font-extrabold"
            style={{ background: "linear-gradient(135deg, #05A049 0%, #059669 100%)", color: "#FFFFFC",
                     boxShadow: "0 0 0 4px rgba(5,160,73,0.25)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {initial}
          </motion.div>
          <div className="text-center">
            <p className="font-heading text-xl font-extrabold" style={{ color: "#FFFFFC" }}>{name}</p>
            <p className="font-body text-xs mt-1" style={{ color: "#B4E3C8" }}>
              {isAr ? `المستوى ${level}` : `Level ${level}`}
            </p>
          </div>

          {/* XP progress bar */}
          <div className="w-full">
            <div className="flex justify-between font-body text-[10px] mb-1.5" style={{ color: "#64748B" }}>
              <span>XP {user.totalXP.toLocaleString()}</span>
              <span>{isAr ? `المستوى ${level + 1}` : `Lv.${level + 1}`} ← {((1 - progress) * XP_PER_LEVEL).toFixed(0)} XP</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #05A049, #B4E3C8)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <CoinIcon size={18} />, label: isAr ? "عملات VAL" : "VAL Coins",
              value: user.valCoins.toLocaleString(), color: "#D97706" },
            { icon: <Star className="size-4" style={{ color: "#059669" }} />,
              label: "XP", value: user.totalXP.toLocaleString(), color: "#059669" },
          ].map(({ icon, label, value, color }) => (
            <div key={label} className="rounded-2xl px-4 py-4 flex items-center gap-3"
              style={{ background: "#FFFFFC", border: "1.5px solid rgba(0,17,27,0.07)" }}>
              <div className="flex size-10 items-center justify-center rounded-xl"
                style={{ background: `${color}12` }}>
                {icon}
              </div>
              <div>
                <p className="font-heading text-lg font-extrabold tabular-nums" style={{ color }}>{value}</p>
                <p className="font-body text-[11px]" style={{ color: "#64748B" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Streak widget ──────────────────────────────────────── */}
        <div className="rounded-2xl px-4 py-4 flex items-center gap-4"
          style={{ background: "#FFFFFC", border: "1.5px solid rgba(0,17,27,0.07)" }}>
          <div className="flex size-12 items-center justify-center rounded-2xl"
            style={{ background: user.weeklyStreakCount > 0 ? "rgba(224,90,43,0.10)" : "rgba(0,17,27,0.05)" }}>
            <Flame className="size-6"
              style={{ color: user.weeklyStreakCount > 0 ? "#E05A2B" : "#94A3B8" }} />
          </div>
          <div className="flex-1">
            <p className="font-heading text-2xl font-extrabold tabular-nums"
              style={{ color: user.weeklyStreakCount > 0 ? "#E05A2B" : "#94A3B8" }}>
              {user.weeklyStreakCount}
            </p>
            <p className="font-body text-xs" style={{ color: "#64748B" }}>
              {isAr ? "أسابيع متواصلة" : "week streak"}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "rgba(96,165,250,0.10)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <Snowflake className="size-4" style={{ color: "#60A5FA" }} />
            <div className="text-end">
              <p className="font-heading text-base font-bold tabular-nums" style={{ color: "#60A5FA" }}>
                {user.streakFreezeCount}
              </p>
              <p className="font-body text-[10px]" style={{ color: "#94A3B8" }}>
                {isAr ? "تجميد" : (user.streakFreezeCount === 1 ? "freeze" : "freezes")}
              </p>
            </div>
          </div>
        </div>

        {/* ── Mastery wall ───────────────────────────────────────── */}
        <div>
          <SectionHead
            icon={<BookOpen className="size-3.5" />}
            title={isAr ? "جدار الإتقان" : "Mastery wall"}
          />

          {masteryEntries.length > 0 ? (
            <>
              {/* Summary chips */}
              {(platCount > 0 || goldCount > 0) && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {platCount > 0 && (
                    <span className="flex items-center gap-1 rounded-full px-3 py-1 font-heading text-xs font-bold"
                      style={{ background: "#F5F3FF", color: "#7C3AED", border: "1px solid #DDD6FE" }}>
                      💎 {platCount} {isAr ? "بلاتيني" : "Platinum"}
                    </span>
                  )}
                  {goldCount > 0 && (
                    <span className="flex items-center gap-1 rounded-full px-3 py-1 font-heading text-xs font-bold"
                      style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FDE68A" }}>
                      🥇 {goldCount} {isAr ? "ذهبي" : "Gold"}
                    </span>
                  )}
                </div>
              )}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {masteryEntries.map(([worldId, tier]) => (
                  <MasteryWorldCard key={worldId} worldSlug={worldId} tier={tier} locale={locale} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 rounded-2xl"
              style={{ background: "#080F08", border: "1px dashed rgba(0,17,27,0.08)" }}>
              <span className="text-3xl opacity-40">🎓</span>
              <p className="font-body text-sm text-center max-w-[220px]" style={{ color: "#94A3B8" }}>
                {isAr
                  ? "أكمل أي اختباراً لتبدأ الحصول على شارات الإتقان"
                  : "Complete any quiz to start earning mastery badges"}
              </p>
            </div>
          )}
        </div>

        {/* ── Badges ────────────────────────────────────────────── */}
        <div>
          <SectionHead
            icon={<Trophy className="size-3.5" />}
            title={isAr ? "الشارات" : "Badges"}
          />
          {badges.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {badges.map((badge) => (
                <BadgeCard key={badge.slug} badge={badge} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 rounded-2xl"
              style={{ background: "#080F08", border: "1px dashed rgba(0,17,27,0.08)" }}>
              <span className="text-3xl opacity-40">🏅</span>
              <p className="font-body text-sm text-center max-w-[220px]" style={{ color: "#94A3B8" }}>
                {isAr ? "الشارات تُكتسب بإنجاز الأهداف والمراجعات" : "Badges are earned through goals and reviews"}
              </p>
            </div>
          )}
        </div>

        {/* ── Actions ───────────────────────────────────────────── */}
        <div className="flex gap-3">
          <Link href={`/${locale}/pledges`}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 font-heading text-sm font-semibold transition-all hover:brightness-105"
            style={{ background: "#FFFFFC", color: "#475569", border: "1.5px solid rgba(0,17,27,0.08)" }}>
            {isAr ? "عهودي" : "My Pledges"}
          </Link>
        </div>
      </div>

      <BottomNav locale={locale} />
    </div>
  );
}
