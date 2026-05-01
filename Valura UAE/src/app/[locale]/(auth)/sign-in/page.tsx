import Link from "next/link";
import Wordmark from "@/components/brand/Wordmark";
import SignInForm from "./SignInForm";

export default function SignInPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isAr = locale === "ar";

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#080F08" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        aria-hidden
        style={{
          height: 400,
          background:
            "radial-gradient(ellipse at top center, rgba(34,197,94,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Nav strip ─────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link href={`/${locale}`} aria-label="Aldar × Valura Atlas — home">
          <Wordmark variant="full" size="md" color="#F0FDF4" />
        </Link>
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#6B7280",
          }}
        >
          ← {isAr ? "العودة للرئيسية" : "Back to home"}
        </Link>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-[calc(100vh-73px)] flex-col lg:flex-row">

        {/* LEFT — hero copy (desktop only) */}
        <div className="hidden lg:flex lg:w-[55%] flex-col justify-center px-16 py-16">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="chip chip-green">
              {isAr ? "ثنائي اللغة" : "Bilingual EN / AR"}
            </span>
            <span className="chip">
              {isAr ? "متوافق مع الشريعة" : "Sharia-aware"}
            </span>
            <span className="chip">
              {isAr ? "خصوصية أولاً" : "Privacy-first"}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 4vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: 500,
            }}
          >
            {isAr ? (
              <>إتقان المال. <span style={{ color: "#22C55E" }}>مستوى تلو الآخر.</span></>
            ) : (
              <>Money, mastered. <span style={{ color: "#22C55E" }}>One level at a time.</span></>
            )}
          </h1>

          <p
            className="mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: "#6B7280",
              lineHeight: 1.65,
              maxWidth: 440,
            }}
          >
            {isAr
              ? "رحلة للصحة المالية للجميع في الإمارات — ثنائية اللغة، متوافقة مع الشريعة، ولكَ تحتفظ بها."
              : "A financial wellness journey for everyone in the UAE — bilingual, Sharia-aware, and yours to keep."}
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 max-w-sm">
            {[
              { v: "15", l: isAr ? "عالماً مالياً" : "Financial worlds" },
              { v: "EN/AR", l: isAr ? "ثنائي اللغة" : "Fully bilingual" },
              { v: "100%", l: isAr ? "متوافق مع الشريعة" : "Sharia-aware" },
              { v: "Free", l: isAr ? "مجاني دائماً" : "Always free" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: "#22C55E" }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-auto pt-12"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#374151" }}
          >
            {isAr ? "منتج Valura، بالشراكة مع Aldar." : "A Valura product, in partnership with Aldar."}
          </p>
        </div>

        {/* RIGHT — login card */}
        <div className="flex flex-1 items-center justify-center px-6 py-16 lg:w-[45%] lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile wordmark */}
            <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
              <Wordmark variant="full" size="md" color="#F0FDF4" />
            </div>

            {/* Card */}
            <div
              className="w-full rounded-2xl p-8"
              style={{
                background: "#0E1C0D",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 32px 64px rgba(0,0,0,0.3)",
              }}
            >
              <h2
                className="mb-1"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#FFFFFF",
                }}
              >
                {isAr ? "أهلاً بك" : "Welcome back"}
              </h2>
              <p
                className="mb-7"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                {isAr
                  ? "سجّل الدخول لمتابعة رحلتك."
                  : "Sign in to continue your journey."}
              </p>

              <SignInForm locale={locale} />
            </div>

            {/* Compliance */}
            <p
              className="mt-6 text-center leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#374151",
                maxWidth: 380,
                margin: "24px auto 0",
              }}
            >
              {isAr
                ? "تعليمي فقط، ليس نصيحة مالية. عملات VAL افتراضية — للتجميل والخير فقط."
                : "Educational only, not financial advice. VAL Coins are virtual — for cosmetics and charity only, never redeemable."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
