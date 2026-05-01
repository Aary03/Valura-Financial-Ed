import Link from "next/link";
import { BookOpen, Globe, ShieldCheck, ChevronRight } from "lucide-react";
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
      style={{
        background:
          "linear-gradient(180deg, #FFFFFC 0%, #F5FAF6 35%, #E9F4EC 75%, #DCEEDF 100%)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top nav ───────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between py-5 px-6 sm:px-12"
        style={{
          background: "rgba(255,255,252,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Wordmark variant="full" size="md" />
        <Link
          href={`/${locale}/sign-in`}
          className="font-body text-sm font-medium transition-colors hover:text-[#00111B]"
          style={{ color: "#475569" }}
        >
          {isAr ? "تسجيل الدخول" : "Sign in"}
        </Link>
      </nav>

      {/* ── Hero section ──────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-73px)] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Warm sun glow */}
        <div
          className="pointer-events-none absolute"
          aria-hidden
          style={{
            top: "5%",
            right: "10%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(ellipse at center, rgba(245,220,160,0.22) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#05A049] opacity-40" />
            <span
              className="font-body text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#05A049" }}
            >
              {isAr ? "رحلة الصحة المالية" : "Financial Wellness Journey"}
            </span>
            <div className="h-px w-12 bg-[#05A049] opacity-40" />
          </div>

          {/* Headline */}
          <h1
            className="mb-6 font-display leading-[1.05]"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(48px, 8vw, 80px)",
              color: "#00111B",
              letterSpacing: "-0.03em",
            }}
          >
            {isAr ? (
              <>
                إتقان المال.
                <br />
                مستوى تلو الآخر.
              </>
            ) : (
              <>
                Money, mastered.
                <br />
                One level at a time.
              </>
            )}
          </h1>

          {/* Sub-headline */}
          <p
            className="mx-auto mb-10 max-w-2xl leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 19,
              color: "#475569",
            }}
          >
            {isAr
              ? "منصة للصحة المالية باللغتين العربية والإنجليزية، متوافقة مع الشريعة الإسلامية، مبنية لكل من في الإمارات."
              : "A bilingual, Sharia-aware financial wellness platform built for everyone in the UAE — from your first salary to your end-of-service planning."}
          </p>

          {/* CTA buttons */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/sign-in`}
              className="flex h-12 items-center gap-2 rounded-xl px-8 transition-all active:scale-[0.98]"
              style={{
                background: "#05A049",
                color: "#FFFFFF",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 4px 12px rgba(5,160,73,0.25)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#03803A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#05A049")}
            >
              {isAr ? "ابدأ رحلتك ←" : "Start your journey →"}
            </Link>
            <Link
              href={`/${locale}/pitch`}
              className="flex h-12 items-center gap-2 rounded-xl border px-8 transition-all active:scale-[0.98]"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                color: "#00111B",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {isAr ? "للبنوك: عرض الفرصة" : "For banks: see the pitch"}
            </Link>
          </div>

          {/* Caption */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            {isAr
              ? "شراكة Aldar × Valura · مجاني لجميع العملاء"
              : "An Aldar × Valura partnership · Free for all customers"}
          </p>
        </div>

        {/* Decorative journey map preview */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.07]"
          aria-hidden
          style={{ width: "min(900px, 90vw)" }}
        >
          <svg viewBox="0 0 900 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 80 Q 150 40 300 80 T 600 60 T 900 70"
              stroke="#05A049"
              strokeWidth="3"
              strokeDasharray="12 6"
              fill="none"
            />
            {[150, 450, 750].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy={cx === 150 ? 60 : cx === 450 ? 68 : 58} r={14} fill="#05A049" />
                <circle cx={cx} cy={cx === 150 ? 60 : cx === 450 ? 68 : 58} r={10} fill="#DCEEDF" />
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* ── Cast strip ────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: 36,
              color: "#00111B",
              letterSpacing: "-0.02em",
            }}
          >
            {isAr ? "مبني حول أشخاص حقيقيين في الإمارات" : "Built around real people in the UAE"}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAST.map((person) => (
              <div
                key={person.name}
                className="rounded-3xl p-8"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow:
                    "0 1px 2px rgba(0,17,27,0.04), 0 4px 12px rgba(0,17,27,0.04), 0 12px 32px rgba(0,17,27,0.06)",
                }}
              >
                <div
                  className="mb-4 flex size-16 items-center justify-center rounded-full"
                  style={{ background: person.bg }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: 24,
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
                    fontSize: 18,
                    color: "#00111B",
                  }}
                >
                  {person.name}
                </p>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#475569",
                  }}
                >
                  {isAr ? person.roleAr : person.role}
                </p>
                <p
                  className="italic leading-snug"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#1E293B",
                  }}
                >
                  &ldquo;{isAr ? person.quoteAr : person.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it works ──────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: 36,
              color: "#00111B",
              letterSpacing: "-0.02em",
            }}
          >
            {isAr ? "لماذا يعمل هذا" : "Why it works"}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.headlineEn}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow:
                    "0 1px 2px rgba(0,17,27,0.04), 0 4px 12px rgba(0,17,27,0.04), 0 12px 32px rgba(0,17,27,0.06)",
                }}
              >
                <div
                  className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full"
                  style={{ background: "#EDFFF5" }}
                >
                  <item.Icon size={28} color="#05A049" strokeWidth={1.75} />
                </div>
                <p
                  className="mb-2"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    color: "#00111B",
                  }}
                >
                  {isAr ? item.headlineAr : item.headlineEn}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  {isAr ? item.bodyAr : item.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer
        className="mt-8 border-t px-6 py-12 sm:px-12"
        style={{ borderColor: "#E2E8F0" }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Wordmark variant="full" size="sm" />
            <p
              className="max-w-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              {isAr
                ? "تعليمي فقط، ليس نصيحة مالية. عملات VAL افتراضية — للتجميل والخير فقط، غير قابلة للاسترداد. شراكة Aldar × Valura."
                : "Educational only, not financial advice. VAL Coins are virtual — for cosmetics and charity only, never redeemable. An Aldar × Valura partnership."}
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <Link
                key={l}
                href="#"
                className="transition-colors hover:text-[#00111B]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#94A3B8",
                }}
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

const CAST = [
  {
    initial: "M",
    name: "Mohammed",
    role: "Emirati, government",
    roleAr: "إماراتي، قطاع حكومي",
    bg: "#EDFFF5",
    color: "#059669",
    quote: "I never knew what an emergency fund actually meant until Atlas showed me.",
    quoteAr: "لم أكن أعرف ما يعني صندوق الطوارئ حتى شرحه لي الأطلس.",
  },
  {
    initial: "R",
    name: "Riya",
    role: "Indian expat, engineer",
    roleAr: "مغتربة هندية، مهندسة",
    bg: "#E8F4FF",
    color: "#1A6BAD",
    quote: "Planning for gratuity while paying rent felt impossible. Now I have a system.",
    quoteAr: "كان التخطيط للمكافأة مع دفع الإيجار مستحيلاً. الآن لدي نظام.",
  },
  {
    initial: "F",
    name: "Fatima",
    role: "Emirati, teacher",
    roleAr: "إماراتية، معلمة",
    bg: "#FFF8E8",
    color: "#A07C30",
    quote: "The Sharia module finally explained things in a way that felt right for me.",
    quoteAr: "وحدة الشريعة أخيراً شرحت الأمور بطريقة تناسبني.",
  },
  {
    initial: "A",
    name: "Arjun",
    role: "Indian expat, retail",
    roleAr: "مغترب هندي، تجزئة",
    bg: "#EDFFF5",
    color: "#0D7A5A",
    quote: "Sending money home while saving here — Atlas made both feel possible.",
    quoteAr: "إرسال الأموال للوطن مع الادخار هنا — أطلس جعل الأمرين ممكنين.",
  },
];

const WHY_ITEMS = [
  {
    Icon: Globe,
    headlineEn: "Bilingual EN / AR",
    headlineAr: "ثنائي اللغة: عربي وإنجليزي",
    bodyEn: "Switch languages mid-session. Every lesson, quiz, and story is native in both.",
    bodyAr: "غيّر اللغة في أي وقت. كل درس واختبار وقصة أصيل في كلتا اللغتين.",
  },
  {
    Icon: ShieldCheck,
    headlineEn: "Sharia-aware curriculum",
    headlineAr: "منهج متوافق مع الشريعة",
    bodyEn: "Covers Islamic finance, riba, takaful, and Sharia-compliant investing — no shortcuts.",
    bodyAr: "يغطي التمويل الإسلامي، الربا، التكافل، والاستثمار المتوافق مع الشريعة.",
  },
  {
    Icon: BookOpen,
    headlineEn: "VAL Coins for good",
    headlineAr: "عملات VAL للخير",
    bodyEn: "Coins unlock cosmetics and real charity donations — never redeemable for cash.",
    bodyAr: "العملات تفتح التخصيصات والتبرعات الحقيقية — غير قابلة للاسترداد نقداً أبداً.",
  },
];
