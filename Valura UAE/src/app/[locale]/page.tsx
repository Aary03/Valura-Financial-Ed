import Link from "next/link";
import { BookOpen, Globe, ShieldCheck, ArrowRight, Zap, TrendingUp, Users } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isAr = locale === "ar";

  return (
    <div
      className="min-h-screen"
      style={{ background: "#080F08" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top nav ───────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-12"
        style={{
          background: "rgba(8,15,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Wordmark variant="full" size="md" color="#F0FDF4" />
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/sign-in`}
            className="transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#9CA3AF",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0FDF4")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
          >
            {isAr ? "تسجيل الدخول" : "Sign in"}
          </Link>
          <Link
            href={`/${locale}/sign-in`}
            className="btn-primary"
            style={{ height: 36, padding: "0 16px", fontSize: 13 }}
          >
            {isAr ? "ابدأ مجاناً" : "Start for free"} <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── Hero section ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-12">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          aria-hidden
          style={{
            width: 800,
            height: 400,
            background:
              "radial-gradient(ellipse at top, rgba(34,197,94,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Tag chips */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="chip chip-green">
              {isAr ? "رحلة مالية" : "Financial Journey"}
            </span>
            <span className="chip">
              {isAr ? "الإمارات · UAE" : "UAE · المارات"}
            </span>
            <span className="chip">
              {isAr ? "ثنائي اللغة" : "Bilingual EN / AR"}
            </span>
            <span className="chip chip-green">
              {isAr ? "مجاني" : "Free to use"}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: 780,
            }}
          >
            {isAr ? (
              <>
                أشمل رحلة للصحة المالية{" "}
                <span style={{ color: "#22C55E" }}>لمقيمي الإمارات</span>
              </>
            ) : (
              <>
                UAE&apos;s sharpest financial
                <br />
                wellness journey{" "}
                <span style={{ color: "#22C55E" }}>for everyone</span>
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: "#9CA3AF",
              lineHeight: 1.65,
              maxWidth: 580,
            }}
          >
            {isAr
              ? "خمسة عشر عالماً مالياً. ثنائي اللغة. متوافق مع الشريعة. مبني للإماراتيين والمغتربين على حد سواء."
              : "Fifteen financial worlds covering budgeting, investment, insurance, and end-of-service planning — built for Emiratis and expats alike."}
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/sign-in`} className="btn-primary">
              {isAr ? "ابدأ رحلتك" : "Start your journey"} <ArrowRight size={16} />
            </Link>
            <Link href={`/${locale}/sign-in`} className="btn-secondary">
              {isAr ? "شاهد كيف يعمل" : "See how it works"}
            </Link>
          </div>

          {/* Stat chips row */}
          <div className="mt-10 flex flex-wrap gap-3">
            {STATS.map((s) => (
              <div
                key={s.labelEn}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#22C55E",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  {isAr ? s.labelAr : s.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Info bar */}
          <div className="info-bar mt-8 max-w-xl">
            <Zap size={14} style={{ color: "#F59E0B", flexShrink: 0 }} />
            <span>
              {isAr
                ? "نسخة تجريبية — أي بريد إلكتروني يسجّل دخولك فوراً. لا بطاقة ائتمان."
                : "Demo build — any email signs you in instantly. No credit card required."}
            </span>
          </div>
        </div>
      </section>

      {/* ── "The Journey" section ─────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <p
            className="mb-4 chip chip-green"
            style={{ display: "inline-flex" }}
          >
            {isAr ? "الرحلة" : "The Journey"}
          </p>
          <h2
            className="mb-3"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            {isAr
              ? "خمسة عشر عالماً. كل زاوية مغطاة."
              : "Fifteen worlds. Every angle covered."}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#6B7280",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? "كل عالم مبني على قواعد الإمارات الحقيقية — لا ذكاء اصطناعي عاماً، لا تقريب."
              : "Each world is built on real UAE financial rules — no generic AI, no approximations."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORLDS.map((w, i) => (
              <div
                key={w.enTitle}
                className="group rounded-xl p-5 transition-all"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#22C55E",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    World {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "#4B5563",
                    }}
                  >
                    5 stops
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#F0FDF4",
                    lineHeight: 1.3,
                  }}
                >
                  {isAr ? w.arTitle : w.enTitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it works ──────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="chip chip-green mb-4" style={{ display: "inline-flex" }}>
            {isAr ? "لماذا يعمل" : "Why it works"}
          </p>
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            {isAr ? "مبني للإمارات. ليس مترجماً لها." : "Built for the UAE. Not translated."}
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.enTitle}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(34,197,94,0.1)" }}
                >
                  <item.Icon size={22} color="#22C55E" strokeWidth={1.75} />
                </div>
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  {isAr ? item.arTitle : item.enTitle}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.6,
                  }}
                >
                  {isAr ? item.arBody : item.enBody}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cast strip ────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="chip mb-4" style={{ display: "inline-flex" }}>
            {isAr ? "المجتمع" : "The Community"}
          </p>
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            {isAr ? "مبني حول أشخاص حقيقيين في الإمارات" : "Built around real people in the UAE"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAST.map((person) => (
              <div
                key={person.name}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-4 flex size-14 items-center justify-center rounded-full"
                  style={{ background: person.bg, border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: 20,
                      color: person.color,
                    }}
                  >
                    {person.initial}
                  </span>
                </div>
                <p
                  className="mb-0.5"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#FFFFFF",
                  }}
                >
                  {person.name}
                </p>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  {isAr ? person.roleAr : person.role}
                </p>
                <p
                  className="italic leading-snug"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#9CA3AF",
                  }}
                >
                  &ldquo;{isAr ? person.quoteAr : person.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-12 sm:px-12"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Wordmark variant="full" size="sm" color="#F0FDF4" />
            <p
              className="max-w-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#4B5563",
              }}
            >
              {isAr
                ? "تعليمي فقط، ليس نصيحة مالية. عملات VAL افتراضية. شراكة Aldar × Valura."
                : "Educational only, not financial advice. VAL Coins are virtual, never redeemable. An Aldar × Valura partnership."}
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <Link
                key={l}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#4B5563",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Static data ────────────────────────────────────────────────────────────────

const STATS = [
  { value: "15", labelEn: "financial worlds", labelAr: "عالماً مالياً" },
  { value: "EN/AR", labelEn: "fully bilingual", labelAr: "ثنائي اللغة" },
  { value: "100%", labelEn: "Sharia-aware", labelAr: "متوافق مع الشريعة" },
  { value: "Free", labelEn: "always free", labelAr: "مجاني دائماً" },
];

const WORLDS = [
  { enTitle: "Marina Mile — Budgeting Basics",        arTitle: "مارينا مايل — أساسيات الميزانية" },
  { enTitle: "Skyline Heights — Smart Saving",        arTitle: "سكايلاين هايتس — الادخار الذكي" },
  { enTitle: "Souk of Savings — Goal Setting",        arTitle: "سوق المدخرات — تحديد الأهداف" },
  { enTitle: "Dirham Desert — Investing 101",         arTitle: "صحراء الدرهم — مبادئ الاستثمار" },
  { enTitle: "Loan Lighthouse — Debt & Loans",       arTitle: "منارة القروض — الديون والقروض" },
  { enTitle: "Card Canyon — Credit Cards",            arTitle: "وادي البطاقات — البطاقات الائتمانية" },
];

const CAST = [
  {
    initial: "M", name: "Mohammed", bg: "rgba(34,197,94,0.12)", color: "#22C55E",
    role: "Emirati, government",    roleAr: "إماراتي، قطاع حكومي",
    quote: "I never knew what an emergency fund meant until Atlas showed me.",
    quoteAr: "لم أكن أعرف ما يعني صندوق الطوارئ حتى شرحه لي الأطلس.",
  },
  {
    initial: "R", name: "Riya", bg: "rgba(59,130,246,0.12)", color: "#60A5FA",
    role: "Indian expat, engineer", roleAr: "مغتربة هندية، مهندسة",
    quote: "Planning for gratuity while paying rent felt impossible. Now I have a system.",
    quoteAr: "كان التخطيط للمكافأة مع دفع الإيجار مستحيلاً. الآن لدي نظام.",
  },
  {
    initial: "F", name: "Fatima", bg: "rgba(245,158,11,0.12)", color: "#FCD34D",
    role: "Emirati, teacher",       roleAr: "إماراتية، معلمة",
    quote: "The Sharia module finally explained things in a way that felt right.",
    quoteAr: "وحدة الشريعة شرحت الأمور بطريقة تناسبني أخيراً.",
  },
  {
    initial: "A", name: "Arjun", bg: "rgba(168,85,247,0.12)", color: "#C084FC",
    role: "Indian expat, retail",   roleAr: "مغترب هندي، تجزئة",
    quote: "Sending money home while saving here — Atlas made both possible.",
    quoteAr: "إرسال الأموال للوطن مع الادخار هنا — أطلس جعل الأمرين ممكنين.",
  },
];

const WHY_ITEMS = [
  {
    Icon: Globe,
    enTitle: "Bilingual EN / AR",
    arTitle: "ثنائي اللغة: عربي وإنجليزي",
    enBody: "Switch languages mid-session. Every lesson, quiz, and story is native in both.",
    arBody: "غيّر اللغة في أي وقت. كل درس واختبار وقصة أصيل في كلتا اللغتين.",
  },
  {
    Icon: ShieldCheck,
    enTitle: "Sharia-aware curriculum",
    arTitle: "منهج متوافق مع الشريعة",
    enBody: "Covers Islamic finance, riba, takaful, and Sharia-compliant investing.",
    arBody: "يغطي التمويل الإسلامي، الربا، التكافل، والاستثمار المتوافق مع الشريعة.",
  },
  {
    Icon: TrendingUp,
    enTitle: "Real UAE rules",
    arTitle: "قواعد الإمارات الحقيقية",
    enBody: "End-of-service gratuity, WPS, CBUAE regulations — hardcoded, not estimated.",
    arBody: "مكافأة نهاية الخدمة، WPS، لوائح المصرف المركزي — مبرمجة، ليست تقديرات.",
  },
];
