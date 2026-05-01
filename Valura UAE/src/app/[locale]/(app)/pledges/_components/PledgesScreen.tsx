"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Flag, Calendar, CheckCircle2, XCircle, Clock, Ban } from "lucide-react";
import { WORLD_COORDS } from "@/lib/game/world-coords";
import { CHARITIES } from "@/lib/game/shop-catalog";
import { cancelPledge } from "@/app/actions/pledge";
import type { PledgeRow } from "@/app/actions/pledge";

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

// ── Countdown ─────────────────────────────────────────────────────────────────

function Countdown({ deadline, locale }: { deadline: Date; locale: string }) {
  const isAr = locale === "ar";
  const now  = new Date();
  const diff = deadline.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days <= 0) return (
    <span className="font-body text-xs" style={{ color: "#94A3B8" }}>
      {isAr ? "انتهى الوقت" : "Time elapsed"}
    </span>
  );

  // Calm: no red urgency — only context
  const color = days <= 2 ? "#D97706" : "#475569";

  return (
    <span className="flex items-center gap-1 font-body text-xs" style={{ color }}>
      <Calendar className="size-3" />
      {days} {isAr ? (days === 1 ? "يوم" : "أيام") : (days === 1 ? "day" : "days")}
      {" "}{isAr ? "متبقية" : "left"}
    </span>
  );
}

// ── Status chip ───────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  ACTIVE:    { en: "Active",    ar: "نشط",      color: "#059669", bg: "#ECFDF5", icon: Clock      },
  WON:       { en: "Won ✓",     ar: "فزت ✓",    color: "#059669", bg: "#ECFDF5", icon: CheckCircle2 },
  LOST:      { en: "Lost",      ar: "لم تُتمّ",  color: "#64748B", bg: "#F1F5F9", icon: XCircle    },
  CANCELLED: { en: "Cancelled", ar: "ملغى",     color: "#94A3B8", bg: "#F8FAFC", icon: Ban        },
};

function StatusChip({ status, locale }: { status: PledgeRow["status"]; locale: string }) {
  const isAr  = locale === "ar";
  const conf  = STATUS_CONFIG[status];
  const Icon  = conf.icon;
  return (
    <span
      className="flex items-center gap-1 rounded-full px-2.5 py-1 font-heading text-[11px] font-bold"
      style={{ background: conf.bg, color: conf.color }}
    >
      <Icon className="size-3" />
      {isAr ? conf.ar : conf.en}
    </span>
  );
}

// ── Pledge card ───────────────────────────────────────────────────────────────

function PledgeCard({ pledge, locale, onCancel }: {
  pledge: PledgeRow; locale: string; onCancel: (id: string) => void;
}) {
  const isAr    = locale === "ar";
  const world   = WORLD_COORDS.find((w) => w.slug === pledge.goalSlug);
  const charity = CHARITIES.find((c) => c.slug === pledge.charitySlug);
  const isActive = pledge.status === "ACTIVE";
  const isWon    = pledge.status === "WON";

  const worldName   = world ? (isAr ? world.nameAr : world.nameEn) : pledge.goalSlug;
  const charityName = charity ? (isAr ? charity.nameAr : charity.nameEn) : pledge.charitySlug;

  return (
    <motion.div
      layout
      className="rounded-3xl overflow-hidden"
      style={{
        background: "#FFFFFC",
        border: `1.5px solid ${isActive ? "rgba(5,150,105,0.15)" : "rgba(0,17,27,0.07)"}`,
        boxShadow: isActive ? "0 2px 16px rgba(5,150,105,0.08)" : "0 1px 4px rgba(0,17,27,0.04)",
        opacity: pledge.status === "CANCELLED" ? 0.65 : 1,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: pledge.status === "CANCELLED" ? 0.65 : 1, y: 0 }}
    >
      {/* Active: subtle green top stripe */}
      {isActive && (
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #05A049, #059669)" }} />
      )}

      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(5,160,73,0.09)" }}
            >
              <Flag className="size-4" style={{ color: "#059669" }} />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold truncate" style={{ color: "#00111B" }}>
                {worldName}
              </p>
              <p className="font-body text-[11px]" style={{ color: "#64748B" }}>
                {isAr ? "إتمام العالم" : "Complete world"}
              </p>
            </div>
          </div>
          <StatusChip status={pledge.status} locale={locale} />
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap mb-3">
          {isActive && <Countdown deadline={new Date(pledge.deadline)} locale={locale} />}
          {!isActive && (
            <span className="flex items-center gap-1 font-body text-xs" style={{ color: "#94A3B8" }}>
              <Calendar className="size-3" />
              {new Date(pledge.deadline).toLocaleDateString(isAr ? "ar-AE" : "en-AE", { day: "numeric", month: "short" })}
            </span>
          )}
          <span className="flex items-center gap-1 font-body text-xs" style={{ color: "#64748B" }}>
            <CoinIcon size={11} />
            {pledge.coinsAtStake.toLocaleString()} {isAr ? "عملة" : "coins"}
          </span>
          <span className="font-body text-xs" style={{ color: "#94A3B8" }}>
            {charityName}
          </span>
        </div>

        {/* WON: bonus banner */}
        {isWon && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
            style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}
          >
            <span className="text-base">🏆</span>
            <p className="font-body text-xs" style={{ color: "#065F46" }}>
              {isAr
                ? `استُرِدَّت عملاتك مع مكافأة 25% — +${Math.floor(pledge.coinsAtStake * 0.25).toLocaleString()} مكافأة!`
                : `Coins returned with 25% bonus — +${Math.floor(pledge.coinsAtStake * 0.25).toLocaleString()} bonus!`}
            </p>
          </div>
        )}

        {/* LOST: charity note */}
        {pledge.status === "LOST" && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
            style={{ background: "#080F08", border: "1px solid rgba(0,17,27,0.07)" }}
          >
            <span className="text-base">{charity?.icon ?? "🤝"}</span>
            <p className="font-body text-xs" style={{ color: "#475569" }}>
              {isAr
                ? `تم التبرع بـ ${pledge.coinsAtStake.toLocaleString()} عملة لـ ${charityName}`
                : `${pledge.coinsAtStake.toLocaleString()} coins donated to ${charityName}`}
            </p>
          </div>
        )}

        {/* Cancel button (active only) */}
        {isActive && (
          <motion.button
            onClick={() => onCancel(pledge.id)}
            className="w-full rounded-xl py-2.5 font-heading text-xs font-semibold transition-colors"
            style={{ background: "rgba(0,17,27,0.04)", color: "#64748B", border: "1px solid rgba(0,17,27,0.07)" }}
            whileTap={{ scale: 0.97 }}
          >
            {isAr ? "إلغاء (تعود عملاتك)" : "Cancel (coins returned)"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-16 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex size-16 items-center justify-center rounded-2xl"
        style={{ background: "rgba(5,160,73,0.08)" }}
      >
        <Flag className="size-8" style={{ color: "#059669", opacity: 0.6 }} />
      </div>
      <div>
        <p className="font-heading text-base font-bold mb-1" style={{ color: "#00111B" }}>
          {isAr ? "لا عهود بعد" : "No pledges yet"}
        </p>
        <p className="font-body text-sm max-w-[260px] leading-relaxed" style={{ color: "#64748B" }}>
          {isAr
            ? "ضع هدفاً، راهن بعملاتك، واكسب مكافأة 25% عند النجاح."
            : "Set a goal, stake some coins, and earn a 25% bonus when you succeed."}
        </p>
      </div>
    </motion.div>
  );
}

// ── PledgesScreen ─────────────────────────────────────────────────────────────

interface PledgesScreenProps {
  locale: string;
  pledges: PledgeRow[];
}

export default function PledgesScreen({ locale, pledges }: PledgesScreenProps) {
  const isAr  = locale === "ar";
  const router = useRouter();
  const [localPledges, setLocalPledges] = useState<PledgeRow[]>(pledges);
  const [isPending, startTransition]    = useTransition();
  const [cancelError, setCancelError]   = useState<string | null>(null);

  const active = localPledges.filter((p) => p.status === "ACTIVE");
  const past   = localPledges.filter((p) => p.status !== "ACTIVE");

  function handleCancel(pledgeId: string) {
    setCancelError(null);
    startTransition(async () => {
      const res = await cancelPledge(pledgeId);
      if (res.success) {
        setLocalPledges((ps) =>
          ps.map((p) => p.id === pledgeId
            ? { ...p, status: "CANCELLED" as const, resolvedAt: new Date() }
            : p
          )
        );
        router.refresh();
      } else {
        setCancelError(res.error ?? "Could not cancel.");
      }
    });
  }

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
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-6">
          <Link
            href={`/${locale}/journey`}
            className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label={isAr ? "العودة" : "Back"}
          >
            <ArrowLeft className="size-5" style={{ color: "#475569" }} />
          </Link>
          <p className="font-heading text-base font-bold flex-1" style={{ color: "#00111B" }}>
            {isAr ? "عهودي" : "My Pledges"}
          </p>
          <Link
            href={`/${locale}/pledge/new`}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 font-heading text-xs font-bold transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
              color: "#FFFFFC",
              boxShadow: "0 2px 8px rgba(5,160,73,0.3)",
            }}
          >
            <Plus className="size-3.5" />
            {isAr ? "جديد" : "New"}
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl flex flex-col gap-5 px-6 py-5 pb-10">

        {/* ── Stats banner ─────────────────────────────────────────── */}
        {localPledges.length > 0 && (
          <div
            className="grid grid-cols-3 rounded-3xl overflow-hidden"
            style={{ border: "1.5px solid rgba(0,17,27,0.07)", background: "#FFFFFC" }}
          >
            {[
              { label: isAr ? "نشطة" : "Active",    value: active.length,                            color: "#059669" },
              { label: isAr ? "فزت"  : "Won",       value: localPledges.filter((p) => p.status === "WON").length,  color: "#D97706" },
              { label: isAr ? "الكل" : "Total",      value: localPledges.length,                      color: "#475569" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex flex-col items-center py-4 gap-0.5">
                <p className="font-heading text-2xl font-extrabold tabular-nums" style={{ color }}>
                  {value}
                </p>
                <p className="font-body text-[11px]" style={{ color: "#94A3B8" }}>{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Cancel error ─────────────────────────────────────────── */}
        <AnimatePresence>
          {cancelError && (
            <motion.p
              className="rounded-2xl px-4 py-3 font-body text-sm text-center"
              style={{ background: "#FEF2F2", color: "#C0312B", border: "1px solid #FECACA" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {cancelError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Active pledges ────────────────────────────────────────── */}
        {active.length > 0 && (
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-widest mb-3 ps-1" style={{ color: "#64748B" }}>
              {isAr ? "نشطة الآن" : "Active now"}
            </p>
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {active.map((p) => (
                  <PledgeCard key={p.id} pledge={p} locale={locale} onCancel={handleCancel} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── Past pledges ──────────────────────────────────────────── */}
        {past.length > 0 && (
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-widest mb-3 ps-1" style={{ color: "#94A3B8" }}>
              {isAr ? "السابقة" : "Past"}
            </p>
            <div className="flex flex-col gap-3">
              {past.map((p) => (
                <PledgeCard key={p.id} pledge={p} locale={locale} onCancel={handleCancel} />
              ))}
            </div>
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────────────── */}
        {localPledges.length === 0 && <EmptyState locale={locale} />}

        {/* ── New pledge CTA (bottom) ───────────────────────────────── */}
        <Link
          href={`/${locale}/pledge/new`}
          className="flex items-center justify-center gap-2 rounded-2xl py-4 font-heading text-sm font-bold transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
            color: "#FFFFFC",
            boxShadow: "0 4px 14px rgba(5,160,73,0.25)",
          }}
        >
          <Plus className="size-4" />
          {isAr ? "إنشاء عهد جديد" : "Create new pledge"}
        </Link>

        {/* ── How it works ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-4 py-4"
          style={{ background: "rgba(0,17,27,0.03)", border: "1px solid rgba(0,17,27,0.06)" }}
        >
          <p className="font-heading text-xs font-bold mb-2" style={{ color: "#475569" }}>
            {isAr ? "كيف يعمل" : "How it works"}
          </p>
          {[
            { en: "🎯  Set a goal and a deadline (1–30 days)",       ar: "🎯  حدد هدفاً وموعداً (1–30 يوماً)" },
            { en: "🪙  Stake 100–2,000 coins — held in escrow",      ar: "🪙  ارهن 100–2000 عملة — محفوظة بالأمانة" },
            { en: "✅  Finish the goal? Get coins back + 25% bonus", ar: "✅  أتممت الهدف؟ تسترد عملاتك + 25% مكافأة" },
            { en: "❌  Miss it? Coins go to your chosen charity",    ar: "❌  لم تُتمّه؟ العملات تذهب للجمعية الخيرية" },
            { en: "🔄  Cancel any time — no penalty, coins return",  ar: "🔄  ألغِ في أي وقت — بلا غرامة" },
          ].map(({ en, ar }, i) => (
            <p key={i} className="font-body text-xs leading-loose" style={{ color: "#64748B" }}>
              {isAr ? ar : en}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
