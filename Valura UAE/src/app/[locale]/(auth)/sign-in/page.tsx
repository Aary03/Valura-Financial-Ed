import Link from "next/link";
import { Zap } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";
import SignInForm from "./SignInForm";

/**
 * Aldar × Valura Atlas sign-in page.
 * Two-column on desktop (≥1024px), single column on mobile.
 */
export default function SignInPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isAr = locale === "ar";

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFC 0%, #F5FAF6 35%, #E9F4EC 75%, #DCEEDF 100%)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Warm sun glow */}
      <div
        className="pointer-events-none absolute"
        aria-hidden
        style={{
          top: "5%",
          right: "8%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(245,220,160,0.22) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(#00111B 0.75px, transparent 0.75px)",
          backgroundSize: "8px 8px",
          opacity: 0.025,
        }}
      />

      {/* Decorative road preview — bottom-right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 opacity-[0.28]"
        aria-hidden
        style={{ width: 340 }}
      >
        <svg viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 180 Q 80 140 170 160 T 340 140"
            stroke="#05A049"
            strokeWidth="3"
            strokeDasharray="10 5"
            fill="none"
          />
          {[70, 170, 270].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy={cx === 70 ? 161 : cx === 170 ? 157 : 152} r={12} fill="#05A049" opacity="0.15" />
              <circle cx={cx} cy={cx === 70 ? 161 : cx === 170 ? 157 : 152} r={7} fill="#05A049" opacity="0.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">

        {/* LEFT COLUMN — hero copy (hidden on mobile, shown on desktop) */}
        <div className="hidden lg:flex lg:w-[58%] flex-col justify-center px-20 py-20">
          <Link href={`/${locale}`} aria-label="Aldar × Valura Atlas — home">
            <Wordmark variant="full" size="lg" />
          </Link>

          <h1
            className="mt-12 leading-tight"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(38px, 4vw, 56px)",
              color: "#00111B",
              letterSpacing: "-0.03em",
              maxWidth: 520,
            }}
          >
            {isAr
              ? "إتقان المال. مستوى تلو الآخر."
              : "Money, mastered. One level at a time."}
          </h1>

          <p
            className="mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: "#475569",
              lineHeight: 1.65,
              maxWidth: 460,
            }}
          >
            {isAr
              ? "رحلة للصحة المالية للجميع في الإمارات — ثنائية اللغة، متوافقة مع الشريعة، ولكِ تحتفظين بها."
              : "A financial wellness journey for everyone in the UAE — bilingual, Sharia-aware, and yours to keep."}
          </p>

          {/* Trust chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              isAr ? "ثنائي اللغة EN / AR" : "Bilingual EN / AR",
              isAr ? "متوافق مع الشريعة" : "Sharia-aware",
              isAr ? "خصوصية أولاً" : "Privacy-first",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border px-3 py-1.5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#475569",
                  background: "#FFFFFF",
                  borderColor: "#E2E8F0",
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <p
            className="mt-auto pt-16"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#94A3B8",
            }}
          >
            {isAr
              ? "منتج Valura، بالشراكة مع Aldar."
              : "A Valura product, in partnership with Aldar."}
          </p>
        </div>

        {/* RIGHT COLUMN — login card */}
        <div className="flex flex-1 items-center justify-center px-6 py-16 lg:w-[42%] lg:px-20 lg:py-20">
          <div className="w-full max-w-md">

            {/* Mobile wordmark only */}
            <div className="mb-10 flex flex-col items-center gap-2 lg:hidden">
              <Link href={`/${locale}`} aria-label="Aldar × Valura Atlas — home">
                <Wordmark variant="full" size="md" />
              </Link>
            </div>

            {/* Card */}
            <div
              className="w-full rounded-3xl p-10"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 24px 48px rgba(0,17,27,0.08)",
              }}
            >
              <h2
                className="mb-1"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: 22,
                  color: "#00111B",
                }}
              >
                {isAr ? "أهلاً بك" : "Welcome"}
              </h2>
              <p
                className="mb-7"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#475569",
                }}
              >
                {isAr
                  ? "سجّل الدخول لمتابعة رحلتك."
                  : "Sign in to continue your journey."}
              </p>

              <SignInForm locale={locale} />
            </div>

            {/* Compliance text */}
            <p
              className="mt-6 text-center leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#94A3B8",
                maxWidth: 380,
                margin: "24px auto 0",
              }}
            >
              {isAr
                ? "تعليمي فقط، ليس نصيحة مالية. عملات VAL افتراضية — للتجميل والخير فقط، غير قابلة للاسترداد."
                : "Educational only, not financial advice. VAL Coins are virtual — for cosmetics and charity only, never redeemable."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
