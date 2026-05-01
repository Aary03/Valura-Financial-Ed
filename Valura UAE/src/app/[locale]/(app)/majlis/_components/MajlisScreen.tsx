"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Users, Copy, Check, LogOut } from "lucide-react";
import type { MajlisDashboard } from "@/app/actions/majlis";
import { createMajlis, joinMajlisByCode, leaveMajlis } from "@/app/actions/majlis";
import BottomNav from "@/components/game/BottomNav";

interface Props {
  locale: string;
  initial: MajlisDashboard;
}


function mapErr(raw: string, isAr: boolean): string {
  const en: Record<string, string> = {
    Already_in_group:      "You're already in a Majlis.",
    Could_not_create_group: "Couldn't create — try again.",
    Invalid_code:           "Six-character invite only.",
    Not_found:              "Code not found.",
    Group_full:             "Six members already.",
    Join_failed:            "Couldn't join.",
    Not_in_group:           "Not in a group.",
  };
  const ar: Record<string, string> = {
    Already_in_group:      "أنت في مجموعة أصلاً.",
    Could_not_create_group: "تعذر الإنشاء.",
    Invalid_code:           "ست خانات مطلوبة.",
    Not_found:              "رمز غير معروف.",
    Group_full:             "اكتمال العدد.",
    Join_failed:            "فشل الانضمام.",
    Not_in_group:           "لست في مجموعة.",
  };
  return (isAr ? ar : en)[raw] ?? raw;
}

export default function MajlisScreen({ locale, initial }: Props) {
  const isAr                              = locale === "ar";
  const [dash]                            = useState(initial);
  const [name, setName]                     = useState("");
  const [code, setCode]                     = useState("");
  const [err, setErr]                       = useState<string | null>(null);
  const [busy, run]                         = useTransition();
  const [copied, setCopied]               = useState(false);

  const pct = useMemo(() => {
    if (!dash) return 0;
    return Math.min(
      100,
      Math.round((dash.questProgress / Math.max(dash.questTarget, 1)) * 100),
    );
  }, [dash]);

  function reload() {
    window.location.reload();
  }

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    run(async () => {
      const res = await createMajlis(name);
      if (res.error === "Already_in_group") {
        reload();
        return;
      }
      if (res.error || !res.inviteCode) {
        setErr(res.error ?? "err");
        return;
      }
      reload();
    });
  }

  function onJoin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    run(async () => {
      const res = await joinMajlisByCode(code.trim());
      if (res.success) reload();
      else setErr(res.error ?? "err");
    });
  }

  function onLeave() {
    run(async () => {
      const res = await leaveMajlis();
      if (res.success) reload();
      else setErr(res.error ?? "err");
    });
  }

  async function copyInvite() {
    if (!dash) return;
    await navigator.clipboard.writeText(dash.group.inviteCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  /* empty */
  if (!dash) {
    return (
      <main className="min-h-screen px-6 py-14 pb-28" dir={isAr ? "rtl" : "ltr"} style={{ background: "#F8FAFC" }}>
        <div className="mx-auto max-w-md space-y-10">
          <header className="space-y-2 text-center">
            <div
              className="mx-auto flex size-16 items-center justify-center rounded-3xl"
              style={{ background: "linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)" }}
            >
              <Users className="size-8" style={{ color: "#FFFFFC" }} aria-hidden="true" />
            </div>
            <h1 className="font-heading text-2xl font-bold" style={{ color: "#00111B" }}>
              {isAr ? "مجلس العائلة" : "Family Majlis"}
            </h1>
            <p className="font-body text-sm" style={{ color: "#64748B" }}>
              {isAr
                ? "ستة مستكشفين كحد أقصى. مسار واحد هذا الأسبوع — كلنا في نفس التقدُّمِ."
                : "Up to six explorers. Shared weekly quiz goal — cooperative only."}
            </p>
          </header>
          {err && (
            <p role="alert" className="rounded-xl px-4 py-2 text-center text-sm" style={{
              background: "rgba(244,63,94,0.1)",
              color:      "#9F1239",
            }}
            >
              {mapErr(err, isAr)}
            </p>
          )}
          <form onSubmit={onCreate} className="space-y-3 rounded-3xl px-6 py-7 shadow-md" style={{
            border:     "1px solid rgba(244,114,182,0.2)",
            background: "#FFFFF8",
          }}
          >
            <p className="font-heading text-xs uppercase tracking-[0.2em]" style={{ color: "#F472B6" }}>
              {isAr ? "إنشاء" : "Create"}
            </p>
            <input
              name="majlisName"
              placeholder={isAr ? "تجمع المشاريع الصغيرة" : "Young Savers Collective"}
              className="mt-5 w-full rounded-2xl border px-6 py-3 font-body outline-none"
              style={{ borderColor: "rgba(0,17,27,0.1)" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              required
              disabled={busy}
              aria-required
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded-2xl py-4 font-heading font-bold text-cream shadow"
              style={{ background: "linear-gradient(135deg,#E11D48,#F472B6)" }}
            >
              {busy ? "…" : isAr ? "أنشئ المجلِس" : "Open Majlis"}
            </button>
          </form>
          <form onSubmit={onJoin} className="space-y-4 rounded-3xl px-6 py-7" style={{
            border:     "2px dashed rgba(99,102,241,0.35)",
            background: "rgba(238,242,255,0.9)",
          }}
          >
            <input
              name="invite"
              placeholder="______"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))
              }
              className="w-full rounded-xl border border-indigo-200 bg-white py-4 text-center font-mono text-2xl tracking-[0.45em]"
              maxLength={6}
              spellCheck={false}
              disabled={busy}
              dir="ltr"
              aria-label={isAr ? "رمز الانضِمام" : "Invite code"}
            />
            <button
              type="submit"
              disabled={busy || code.length !== 6}
              className="w-full rounded-2xl py-3 font-heading text-xs font-bold uppercase tracking-[0.22em]"
              style={{ background: "#EEF2FF", color: "#4338CA" }}
            >
              {isAr ? `انضِم (${code.length}/6)` : `Join (${code.length}/6)`}
            </button>
          </form>
        </div>
        <BottomNav locale={locale} />
      </main>
    );
  }

  /* dashboard */
  return (
    <main className="min-h-screen pb-28" dir={isAr ? "rtl" : "ltr"} style={{ background: "#F8FAFC" }}>
      <header
        className="sticky top-0 z-40 border-b px-6 py-5"
        style={{
          borderBottom: "1px solid rgba(0,17,27,0.07)",
          background: "rgba(248,250,252,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <motion.h1 className="font-heading text-2xl font-black md:text-3xl truncate" style={{ color: "#00111B" }}>
              {dash.group.name}
            </motion.h1>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.28em]" style={{ color: "#F472B6" }}>
              {dash.weekLabel}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <code
              className="rounded-full px-4 py-2 font-mono text-sm tracking-[0.32em]"
              style={{ border: "1px solid rgba(244,114,182,0.35)", background: "#FFFEFA" }}
            >
              {dash.group.inviteCode}
            </code>
            <button
              type="button"
              onClick={() => void copyInvite()}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]"
              style={{
                borderColor: "rgba(13,148,136,0.35)",
                color: "#115E59",
                background: "#F0FDFA",
              }}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? (isAr ? "نسخ" : "Copied") : isAr ? "نسخ الدعوة" : "Copy invite"}
            </button>
            <button
              type="button"
              onClick={() => onLeave()}
              disabled={busy}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] disabled:opacity-50"
              style={{
                borderColor: "rgba(249,115,22,0.35)",
                color: "#C2410C",
              }}
            >
              <LogOut className="size-4 rtl:-scale-x-100" />
              {isAr ? "مغادرة" : "Leave"}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "#F472B6" }}>
          {isAr ? "مهمة هذا الأسبوع" : "This week"}
        </p>
        <p className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed" style={{ color: "#475569" }}>
          {isAr
            ? `كمّلوا ${dash.questTarget} اختبارات هذا الأسبوع كجماعة وحدة — الآن عدّانا ${dash.questProgress}. كلُّ مساهمة تُعبِّي الشريط.`
            : `Complete ${dash.questTarget} quizzes together before Saturday wraps — ${dash.questProgress} done so far. No ranking — just one shared meter.`}
        </p>

        <div
          className="relative mt-10 h-10 overflow-hidden rounded-full"
          style={{
            background: "rgba(255,228,230,0.75)",
            boxShadow: "inset 0 2px 8px rgba(190,24,93,0.06)",
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={dash.questTarget}
          aria-valuenow={Math.min(dash.questProgress, dash.questTarget)}
        >
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ type: "tween", duration: 0.7 }}
            style={{ background: "linear-gradient(90deg,#E11D48,#FB923C)" }}
          />
        </div>

        <p className="mt-7 font-heading text-sm tabular-nums font-bold" style={{ color: "#E11D48" }}>
          {Math.min(dash.questProgress, dash.questTarget)}
          {" / "}
          {dash.questTarget}
        </p>

        <h2 className="mt-28 font-heading text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: "#CBD5E1" }}>
          {isAr ? "الأعضاء" : "Circle"}
        </h2>

        <ul className="mt-7 divide-y" style={{ borderColor: "rgba(253,164,175,0.35)" }}>
          {dash.members.map((m) => {
            const isOwner = dash.group.ownerId === m.userId;
            return (
              <li key={m.userId} className="flex items-center gap-4 py-5 first:pt-0">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold text-cream"
                  style={{
                    background: "linear-gradient(135deg,#2DD4BF,#059669)",
                  }}
                  aria-hidden
                >
                  {m.displayName[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-lg font-semibold" style={{
                    color: isOwner ? "#05A049" : "#00111B",
                  }}
                  >
                    {m.displayName}
                  </p>
                  <p className="mt-1 font-body text-xs" style={{ color: "#64748B" }}>
                    {isOwner
                      ? isAr
                        ? "مضيف المجلِس"
                        : "Majlis host"
                      : isAr
                      ? `${m.quizzesThisWeek} نشاط هذا الأسبوع`
                      : `${m.quizzesThisWeek} quizzes this week`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <BottomNav locale={locale} />
    </main>
  );
}
