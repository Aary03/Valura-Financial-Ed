"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CalendarDays, Coins, Flag, ShieldCheck } from "lucide-react";
import { WORLD_COORDS } from "@/lib/game/world-coords";
import { CHARITIES } from "@/lib/game/shop-catalog";
import { createPledge } from "@/app/actions/pledge";
import { useGameStore } from "@/lib/game/store";
import Sanad from "@/components/game/Sanad";
import SanadDialog from "@/components/game/SanadDialog";

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

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ icon, title, children }: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-xl"
          style={{ background: "rgba(5,160,73,0.10)", color: "#059669" }}>
          {icon}
        </div>
        <p className="font-heading text-sm font-bold" style={{ color: "#00111B" }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

// ── Dates ─────────────────────────────────────────────────────────────────────

function addDays(d: Date, n: number) {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
}
function toInputDate(d: Date) {
  return d.toISOString().split("T")[0];
}

// ── Success overlay ───────────────────────────────────────────────────────────

function SuccessOverlay({ locale, onDone }: { locale: string; onDone: () => void }) {
  const isAr = locale === "ar";
  const [dialog, setDialog] = useState<string | null>(
    isAr ? "عهدك مُسجَّل! سأذكّرك عند الحاجة." : "Pledge locked in! I'll check in with you.",
  );

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ background: "rgba(0,17,27,0.65)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-5"
        style={{ background: "#FFFFFC" }}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Sanad with speech bubble */}
        <div className="relative flex flex-col items-center">
          <SanadDialog
            text={dialog}
            onDismiss={() => setDialog(null)}
            align="end"
          />
          <Sanad mood="celebrating" size="lg" facing={locale === "ar" ? "left" : "right"} />
        </div>

        <div className="text-center">
          <p className="font-heading text-xl font-extrabold mb-1" style={{ color: "#00111B" }}>
            {isAr ? "تم إنشاء العهد! 🎯" : "Pledge created! 🎯"}
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#475569" }}>
            {isAr
              ? "عملاتك في الأمانة. أتمّ هدفك قبل الموعد وستستردّها مع مكافأة 25%."
              : "Your coins are held in escrow. Complete your goal before the deadline to get them back — plus a 25% bonus."}
          </p>
        </div>

        <motion.button
          className="w-full rounded-2xl py-4 font-heading text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)", color: "#FFFFFC" }}
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
        >
          {isAr ? "عرض عهودي ←" : "See my pledges →"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── PledgeForm ─────────────────────────────────────────────────────────────────

interface PledgeFormProps {
  locale: string;
  valCoins: number;
}

export default function PledgeForm({ locale, valCoins: serverCoins }: PledgeFormProps) {
  const isAr  = locale === "ar";
  const router = useRouter();

  const storeCoins = useGameStore((s) => s.isHydrated ? s.valCoins : serverCoins);
  const spendStore = useGameStore((s) => s.spendCoins);

  const today = new Date();
  const minDate = toInputDate(addDays(today, 1));
  const maxDate = toInputDate(addDays(today, 30));

  const [goalSlug,    setGoalSlug]    = useState<string>(WORLD_COORDS[0].slug);
  const [deadline,    setDeadline]    = useState<string>(toInputDate(addDays(today, 7)));
  const [coins,       setCoins]       = useState<number>(500);
  const [charity,     setCharity]     = useState<string>(CHARITIES[0].slug);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [isPending,   startTransition] = useTransition();

  const canAfford  = storeCoins >= coins;
  const remaining  = storeCoins - coins;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await createPledge({
        goalSlug,
        deadline: new Date(deadline),
        coinsAtStake: coins,
        charitySlug: charity,
      });
      if (res.success) {
        spendStore(coins);
        setSuccess(true);
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  const selectedWorld = WORLD_COORDS.find((w) => w.slug === goalSlug);

  return (
    <>
      <AnimatePresence>
        {success && (
          <SuccessOverlay
            locale={locale}
            onDone={() => router.push(`/${locale}/pledges`)}
          />
        )}
      </AnimatePresence>

      <div
        className="flex flex-col min-h-screen"
        style={{ background: "#080F08" }}
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
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
              href={`/${locale}/pledges`}
              className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label={isAr ? "العودة" : "Back"}
            >
              <ArrowLeft className="size-5" style={{ color: "#475569" }} />
            </Link>
            <p className="font-heading text-base font-bold flex-1" style={{ color: "#00111B" }}>
              {isAr ? "عهد جديد" : "New Pledge"}
            </p>
            {/* Balance pill */}
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
            >
              <CoinIcon />
              <span className="font-heading text-sm font-bold tabular-nums" style={{ color: "#D97706" }}>
                {storeCoins.toLocaleString()}
              </span>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl flex flex-col gap-5 px-6 py-5 pb-10">

          {/* ── Banner ────────────────────────────────────────────── */}
          <div
            className="rounded-3xl px-5 py-5 flex gap-4 items-start"
            style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
          >
            <div className="flex size-12 items-center justify-center rounded-2xl shrink-0"
              style={{ background: "rgba(180,227,200,0.15)" }}>
              <Flag className="size-5" style={{ color: "#B4E3C8" }} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold mb-1" style={{ color: "#FFFFFC" }}>
                {isAr ? "ما هو العهد؟" : "What's a pledge?"}
              </p>
              <p className="font-body text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                {isAr
                  ? "ضع عملاتك على الخط. أتمّ هدفك واستردّها مع مكافأة 25%. إن لم تُتمّه، تذهب لجمعية خيرية."
                  : "Put coins on the line. Complete your goal and get them back with a 25% bonus. Miss it, and they go to charity."}
              </p>
            </div>
          </div>

          {/* ── 1. Goal ───────────────────────────────────────────── */}
          <Section icon={<Flag className="size-3.5" />} title={isAr ? "اختر هدفك" : "Choose your goal"}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid rgba(0,17,27,0.08)", background: "#FFFFFC" }}
            >
              <select
                value={goalSlug}
                onChange={(e) => setGoalSlug(e.target.value)}
                className="w-full px-4 py-3.5 font-body text-sm appearance-none outline-none bg-transparent"
                style={{ color: "#00111B" }}
                aria-label={isAr ? "الهدف" : "Goal"}
              >
                {WORLD_COORDS.map((w) => (
                  <option key={w.slug} value={w.slug}>
                    {isAr ? w.nameAr : w.nameEn}
                  </option>
                ))}
              </select>
            </div>
            {selectedWorld && (
              <p className="font-body text-xs ps-1" style={{ color: "#64748B" }}>
                {isAr ? selectedWorld.taglineAr : selectedWorld.taglineEn}
              </p>
            )}
          </Section>

          {/* ── 2. Deadline ───────────────────────────────────────── */}
          <Section icon={<CalendarDays className="size-3.5" />} title={isAr ? "الموعد النهائي" : "Deadline"}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid rgba(0,17,27,0.08)", background: "#FFFFFC" }}
            >
              <input
                type="date"
                value={deadline}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-3.5 font-body text-sm outline-none bg-transparent"
                style={{ color: "#00111B", colorScheme: "light" }}
                required
                aria-label={isAr ? "الموعد النهائي" : "Deadline"}
              />
            </div>
            <p className="font-body text-xs ps-1" style={{ color: "#64748B" }}>
              {isAr ? "بين يوم واحد و30 يوماً من اليوم" : "Between 1 and 30 days from today"}
            </p>
          </Section>

          {/* ── 3. Coins at stake ─────────────────────────────────── */}
          <Section icon={<Coins className="size-3.5" />} title={isAr ? "العملات على الخط" : "Coins at stake"}>
            <div
              className="rounded-2xl p-4"
              style={{ border: "1.5px solid rgba(0,17,27,0.08)", background: "#FFFFFC" }}
            >
              {/* Big number */}
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 font-heading text-3xl font-extrabold tabular-nums" style={{ color: "#D97706" }}>
                  <CoinIcon size={24} /> {coins.toLocaleString()}
                </span>
                <div className="text-end">
                  <p className="font-body text-[11px]" style={{ color: "#64748B" }}>
                    {isAr ? "بعد الرهن" : "After pledge"}
                  </p>
                  <p className="font-heading text-sm font-bold tabular-nums" style={{ color: canAfford ? "#059669" : "#C0312B" }}>
                    {remaining.toLocaleString()} VAL
                  </p>
                </div>
              </div>

              {/* Slider */}
              <div className="relative py-1" dir={isAr ? "rtl" : "ltr"}>
                <input
                  type="range"
                  min={100} max={2000} step={100}
                  value={coins}
                  onChange={(e) => setCoins(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(${isAr ? "to left" : "to right"},
                      #D97706 ${((coins - 100) / 1900) * 100}%,
                      #E2E8F0 ${((coins - 100) / 1900) * 100}%)`,
                  }}
                  aria-label={isAr ? "العملات على الخط" : "Coins at stake"}
                />
              </div>
              <div className="flex justify-between font-body text-[10px] mt-1" style={{ color: "#94A3B8" }}>
                <span>100</span>
                <span>2,000</span>
              </div>

              {/* Win preview */}
              <div
                className="mt-3 flex items-center justify-between rounded-xl px-3 py-2"
                style={{ background: "rgba(5,150,105,0.06)", border: "1px solid rgba(5,150,105,0.15)" }}
              >
                <span className="font-body text-xs" style={{ color: "#064E3B" }}>
                  🏆 {isAr ? "إذا ربحت" : "If you win"}
                </span>
                <span className="font-heading text-sm font-bold" style={{ color: "#059669" }}>
                  +{Math.floor(coins * 1.25).toLocaleString()} VAL
                </span>
              </div>
            </div>
            {!canAfford && (
              <p className="font-body text-xs ps-1" style={{ color: "#C0312B" }}>
                {isAr ? "رصيدك غير كافٍ لهذا المبلغ" : "Your balance is too low for this amount"}
              </p>
            )}
          </Section>

          {/* ── 4. Charity ────────────────────────────────────────── */}
          <Section icon={<ShieldCheck className="size-3.5" />} title={isAr ? "الجمعية الخيرية (إن لم تُتمّ)" : "Charity if you miss"}>
            <div className="flex flex-col gap-2">
              {CHARITIES.map((c) => {
                const isSelected = charity === c.slug;
                return (
                  <motion.button
                    key={c.slug}
                    type="button"
                    onClick={() => setCharity(c.slug)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-start w-full"
                    style={{
                      background: isSelected ? c.bg : "#FFFFFC",
                      border: isSelected ? `2px solid ${c.color}50` : "1.5px solid rgba(0,17,27,0.07)",
                      boxShadow: isSelected ? `0 0 0 3px ${c.color}10` : "none",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl shrink-0">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm font-bold" style={{ color: "#00111B" }}>
                        {isAr ? c.nameAr : c.nameEn}
                      </p>
                      <p className="font-body text-[11px] leading-snug mt-0.5 truncate" style={{ color: "#64748B" }}>
                        {isAr ? c.missionAr : c.missionEn}
                      </p>
                    </div>
                    <div
                      className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                      style={{
                        borderColor: isSelected ? c.color : "#CBD5E1",
                        background:  isSelected ? c.color : "transparent",
                      }}
                    >
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </Section>

          {/* ── Disclaimer ────────────────────────────────────────── */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: "rgba(0,17,27,0.03)", border: "1px solid rgba(0,17,27,0.07)" }}
          >
            <p className="font-body text-xs leading-relaxed text-center" style={{ color: "#64748B" }}>
              {isAr
                ? "أداة التزام ذاتي. يمكنك الإلغاء في أي وقت قبل الموعد النهائي وتعود عملاتك إليك."
                : "A self-set commitment device. You can cancel any time before the deadline; locked coins return to you."}
            </p>
          </div>

          {/* ── Error ─────────────────────────────────────────────── */}
          {error && (
            <motion.p
              className="text-center font-body text-sm rounded-2xl px-4 py-3"
              style={{ color: "#C0312B", background: "#FEF2F2", border: "1px solid #FECACA" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* ── Submit ────────────────────────────────────────────── */}
          <motion.button
            type="submit"
            disabled={!canAfford || isPending}
            className="w-full rounded-2xl py-4 font-heading text-sm font-bold"
            style={{
              background: canAfford
                ? "linear-gradient(135deg, #05A049 0%, #059669 100%)"
                : "#E2E8F0",
              color: canAfford ? "#FFFFFC" : "#94A3B8",
              boxShadow: canAfford ? "0 4px 14px rgba(5,160,73,0.28)" : "none",
            }}
            whileTap={canAfford ? { scale: 0.97 } : {}}
          >
            {isPending
              ? (isAr ? "جاري الإنشاء…" : "Creating…")
              : (isAr ? `إنشاء عهد بـ ${coins.toLocaleString()} عملة` : `Create pledge · ${coins.toLocaleString()} coins`)}
          </motion.button>
        </form>
      </div>
    </>
  );
}
