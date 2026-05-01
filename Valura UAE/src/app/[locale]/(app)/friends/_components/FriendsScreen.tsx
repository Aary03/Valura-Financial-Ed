"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Gift, Flame, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/game/BottomNav";
import type {
  FriendRow,
  PendingInRow,
} from "@/app/actions/social";
import {
  getFriendsSocialData,
  searchPlayersByPseudonym,
  sendFriendRequest,
  respondFriendRequest,
  sendFriendBoost,
} from "@/app/actions/social";
import { BOOST_STICKERS } from "@/lib/game/social-stickies";

const MIN_BOOST = 50;
const MAX_BOOST = 500;
const WEEKLY_BOOST_CAP = 5;

interface FriendsScreenProps {
  locale: string;
  initial: {
    pendingIncoming: PendingInRow[];
    friends: FriendRow[];
    topPercentBand: number | null;
    myWeeklyXp: number;
  };
}

/**
 * Friend list — search/add, inbox for requests, leaderboard-style weekly XP, boost modal.
 */
export default function FriendsScreen({ locale, initial }: FriendsScreenProps) {
  const isAr                              = locale === "ar";
  const [pending, start]                   = useTransition();
  const [data, setData]                     = useState(initial);
  const [search, setSearch]                  = useState("");
  const [hits, setHits]                     = useState<Awaited<ReturnType<typeof searchPlayersByPseudonym>>>([]);
  const [boostOpen, setBoostOpen]            = useState<FriendRow | null>(null);
  const [stickerKey, setStickerKey]           = useState(BOOST_STICKERS[0] ?? "🎉");
  const [coins, setCoins]                   = useState(250);

  function refresh(): void {
    start(async () => {
      const next = await getFriendsSocialData();
      setData(next);
    });
  }

  async function onSearch(term: string) {
    setSearch(term);
    if (term.trim().length < 2) {
      setHits([]);
      return;
    }
    start(async () => {
      const h = await searchPlayersByPseudonym(term.trim());
      setHits(h.filter((x) => !data.friends.some((f) => f.id === x.id)));
    });
  }

  async function requestAdd(uid: string) {
    start(async () => {
      const res = await sendFriendRequest(uid);
      if (res?.success || res?.autoAccepted) refresh();
      setHits((h) => h.filter((x) => x.id !== uid));
      setSearch("");
    });
  }

  async function respond(id: string, accept: boolean) {
    start(async () => {
      await respondFriendRequest(id, accept);
      refresh();
    });
  }

  async function sendBoost() {
    if (!boostOpen) return;
    start(async () => {
      const res = await sendFriendBoost(boostOpen.id, stickerKey, coins);
      if (res?.success) {
        setBoostOpen(null);
        refresh();
      }
    });
  }

  const showPercentBand = data.friends.length > 0 && data.topPercentBand != null;

  return (
    <div className="min-h-screen" dir={isAr ? "rtl" : "ltr"} style={{ background: "#080F08" }}>
      <header
        className="sticky top-0 z-40 border-b px-6 py-4"
        style={{
          borderColor: "rgba(0,17,27,0.06)",
          background: "rgba(248,250,252,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href={`/${locale}/journey`}
              className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 transition-colors shrink-0"
              aria-label={isAr ? "العودة" : "Back"}
            >
              <ArrowLeft className="size-5" style={{ color: "#475569" }} />
            </Link>
            <h1 className="font-heading text-xl font-extrabold flex-1" style={{ color: "#00111B" }}>
              {isAr ? "أصدقاء" : "Friends"}
            </h1>
          </div>
          {showPercentBand && (
            <p className="font-body text-sm" style={{ color: "#059669" }}>
              {isAr
                ? `أنت ضمن أفضل ${data.topPercentBand}% من أصدقائك هذا الأسبوع.`
                : `You're in the top ${data.topPercentBand}% of your friends this week.`}
            </p>
          )}
          {data.friends.length === 0 && (
            <p className="font-body text-xs" style={{ color: "#64748B" }}>
              {isAr ? "أضف أصدقاء لتظهر مقارنتك الأسبوعية." : "Add friends to see how your weekly XP compares."}
            </p>
          )}
          <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 mt-3" style={{ background: "#FFFFFC", border: "1px solid rgba(0,17,27,0.09)" }}>
            <Search className="size-4 shrink-0" style={{ color: "#94A3B8" }} aria-hidden="true" />
            <label htmlFor="friend-q" className="sr-only">
              {isAr ? "بحث بالاسم الظهر" : "Search by pseudonym"}
            </label>
            <input
              id="friend-q"
              name="friendSearch"
              value={search}
              onChange={(e) => void onSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent font-body text-sm outline-none"
              placeholder={isAr ? "ابحث بالاسم…”" : "Search by pseudonym…"}
              aria-busy={pending}
              autoCapitalize="off"
              autoCorrect="off"
            />
            {pending && <Loader2 className="size-4 animate-spin" style={{ color: "#059669" }} aria-hidden="true" />}
          </div>
        </div>
      </header>

      <AnimatePresence mode="sync">
        {hits.length > 0 && (
          <motion.section
            className="border-b px-6 py-4"
            style={{ borderColor: "rgba(0,17,27,0.05)", background: "rgba(5,160,73,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto max-w-3xl space-y-2">
              <p className="font-heading text-xs uppercase tracking-wide" style={{ color: "#065F46" }}>
                {isAr ? "نتائج البحث" : "Matching learners"}
              </p>
              {hits.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  disabled={pending}
                  onClick={() => requestAdd(u.id)}
                  className="flex w-full items-center justify-between rounded-2xl px-5 py-3 text-start shadow-sm transition active:scale-[0.995]"
                  style={{ background: "#FFFFFC", border: "1px solid rgba(0,17,27,0.06)" }}
                >
                  <div>
                    <p className="font-heading font-bold" style={{ color: "#00111B" }}>{u.displayName}</p>
                    <p className="font-body text-xs mt-1" style={{ color: "#64748B" }}>
                      {isAr ? `Lv ${u.currentLevel}` : `Lvl ${u.currentLevel}`}
                    </p>
                  </div>
                  <span className="rounded-full px-4 py-1.5 font-heading text-xs font-bold" style={{ background: "#E8FFE8", color: "#047857" }}>
                    {isAr ? "إضافة" : "Add"}
                  </span>
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {data.pendingIncoming.length > 0 && (
        <section className="px-6 py-8">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="flex items-center gap-2 font-heading font-bold text-sm" style={{ color: "#92400E" }}>
              <span className="size-2 rounded-full bg-cyan-500" aria-hidden="true" />
              {isAr ? "طلبات معلقة" : "Pending requests"}
            </div>
            {data.pendingIncoming.map((req) => (
              <aside
                key={req.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-6 py-4"
                style={{ background: "#FFFBEB", border: "1px solid rgba(245,158,11,0.35)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-12 items-center justify-center rounded-full font-heading text-lg font-bold text-cream"
                    style={{ background: "#0891B2" }}
                  >
                    {(req.requester.displayName ?? "?")[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-heading font-bold" style={{ color: "#78350F" }}>
                      {req.requester.displayName ?? "?"}
                    </p>
                    <p className="font-body text-xs mt-1" style={{ color: "#A16207" }}>
                      {isAr ? `مستوى ${req.requester.currentLevel}` : `Level ${req.requester.currentLevel}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full px-5 py-2 font-heading text-sm font-semibold"
                    style={{ background: "#FACC15", color: "#78350F" }}
                    disabled={pending}
                    onClick={() => respond(req.id, true)}
                  >
                    {isAr ? "قبول" : "Accept"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full px-5 py-2 font-heading text-sm font-semibold border"
                    style={{
                      borderColor: "rgba(120,53,15,0.25)",
                      color:       "#92400E",
                      background:  "transparent",
                    }}
                    disabled={pending}
                    onClick={() => respond(req.id, false)}
                  >
                    {isAr ? "تجاهل" : "Decline"}
                  </button>
                </div>
              </aside>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 py-10 pb-28">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-3xl px-6 py-4 flex justify-between gap-4 flex-wrap" style={{
            border:       "1px solid rgba(0,17,27,0.06)",
            background: "#080F08",
          }}
          aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <Flame className="size-6" style={{ color: "#E05A2B" }} aria-hidden="true" />
              <span className="font-body text-sm" style={{ color: "#475569" }}>
                {isAr ? "تقدُّمك هذا الأسبوع" : "Your XP this week"}
              </span>
            </div>
            <strong className="font-heading tabular-nums text-lg" style={{ color: "#E05A2B" }}>{data.myWeeklyXp} XP</strong>
          </div>

          {data.friends.length === 0 && (
            <p className="text-center py-24 font-heading text-xs font-bold uppercase tracking-widest" style={{ color: "#94A3B8" }}>
              {isAr ? "ابدأ بإرسال الدعوات للأصدقاء" : "Your circle starts with one invitation"}
            </p>
          )}
          <ul className="space-y-4">
            {data.friends.map((f, i) => (
              <li key={f.id}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.996 }}
                  onClick={() => setBoostOpen(f)}
                  className="flex w-full items-center gap-5 rounded-3xl px-6 py-4 text-start"
                  style={{
                    border:       "1px solid rgba(0,17,27,0.06)",
                    background: "#FFFFFC",
                    boxShadow:   "0 8px 32px rgba(0,17,27,0.05)",
                  }}
                >
                  <div
                    className="relative flex size-14 shrink-0 items-center justify-center rounded-full font-heading text-xl font-extrabold text-cream"
                    style={{
                      background: "linear-gradient(135deg,#14B8A6 0%,#059669 100%)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="font-heading text-lg font-extrabold truncate" style={{ color: "#00111B" }}>
                      {f.displayName}
                    </p>
                    <p className="font-body text-[11px]" style={{ color: "#475569" }}>
                      {isAr ? `Lvl ${f.currentLevel} · ${f.weeklyXp} XP هذا الأسبوع` : `Lvl ${f.currentLevel} · ${f.weeklyXp} XP this week`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-heading text-xl font-black tabular-nums tracking-tighter" style={{ color: "#A855F7" }}>
                      {f.weeklyXp}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: "#CBD5E1" }}>
                      XP/wk
                    </span>
                    <Gift className="size-5 shrink-0" style={{ color: "#7C3AED", opacity: 0.92 }} aria-hidden="true" />
                  </div>
                </motion.button>
              </li>
            ))}
          </ul>
          <footer className="text-center pb-24 font-body text-[11px] leading-relaxed" style={{ color: "#94A3B8" }}>
            {isAr
              ? `الحد الصادِر عن التعزيز: ${WEEKLY_BOOST_CAP}/أسبوع. لن تشارِك الاسم أو الهاتف بأحد.`
              : `Boost allowance: ${WEEKLY_BOOST_CAP}/week from you. Phones and legal names stay private.`}
          </footer>
        </div>
      </section>

      <AnimatePresence>
        {boostOpen && (
          <>
            <motion.button
              type="button"
              aria-label={isAr ? "إغلاق" : "Close"}
              className="fixed inset-0 z-[150] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: "rgba(0,17,27,0.35)" }}
              onClick={() => setBoostOpen(null)}
            />
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="boost-title"
              className="fixed start-6 end-6 bottom-8 z-[160] mx-auto flex max-h-[calc(92vh_-_4rem)] max-w-md flex-col overflow-y-auto rounded-3xl px-6 py-6 shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 46 }}
              style={{ border: "1px solid rgba(0,17,27,0.08)", background: "#FFFFF8", marginInline: "auto" }}
              transition={{ type: "tween", duration: 0.22 }}
            >
              <h2 id="boost-title" className="font-heading text-xl font-extrabold mb-6" style={{ color: "#00111B" }}>
                {boostOpen.displayName}
              </h2>

              <p className="font-body text-[11px] mb-6" style={{ color: "#64748B" }}>
                {isAr ? "التعزيز يضيف عملات لمستحقات صديقك — قفل كل أسبوع." : `${WEEKLY_BOOST_CAP} boosts per week from your wallet — capped by the server.`}
              </p>

              <fieldset className="mb-8">
                <legend className="font-heading mb-5 text-xs uppercase tracking-[0.2em]" style={{ color: "#CBD5E1" }}>
                  {isAr ? "الملصق" : "Sticker"}
                </legend>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {BOOST_STICKERS.slice(0, 18).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="flex size-12 items-center justify-center rounded-xl text-xl"
                      style={{
                        border: stickerKey === s ? "2px solid #7C3AED" : "1px solid rgba(0,17,27,0.08)",
                        background: stickerKey === s ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.8)",
                      }}
                      aria-pressed={stickerKey === s}
                      onClick={() => setStickerKey(s)}
                      aria-label={isAr ? "ملصق" : "Sticker"}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mb-12">
                <label htmlFor="boost-coins" className="font-heading text-xs uppercase tracking-[0.2em]" style={{ color: "#CBD5E1" }}>
                  {isAr ? "القطع — حد بين ١٠٠–٥٠٠" : `${MIN_BOOST}-${MAX_BOOST}`}
                </label>
                <input
                  id="boost-coins"
                  name="coins"
                  type="range"
                  min={MIN_BOOST}
                  max={MAX_BOOST}
                  step={10}
                  value={coins}
                  onChange={(e) => setCoins(Number(e.target.value))}
                  className="mt-5 w-full"
                  aria-valuenow={coins}
                  aria-valuemin={MIN_BOOST}
                  aria-valuemax={MAX_BOOST}
                />
                <p className="mt-8 text-center font-heading text-6xl tabular-nums font-black text-[#0891B2]">
                  {coins}
                </p>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-6">
                <button
                  type="button"
                  className="rounded-2xl border py-5 font-heading font-bold uppercase tracking-wide"
                  style={{
                    borderColor: "rgba(0,17,27,0.12)",
                  }}
                  disabled={pending}
                  onClick={() => setBoostOpen(null)}
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl py-5 font-heading font-black uppercase tracking-wide shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#7C3AED 0%,#A855F7 100%)",
                    color:        "#FFFFF8",
                    opacity:      pending ? 0.74 : 1,
                  }}
                  disabled={pending}
                  onClick={() => sendBoost()}
                >
                  {isAr ? "إرسال" : "Send boost"}
                </motion.button>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <BottomNav locale={locale} />
    </div>
  );
}
