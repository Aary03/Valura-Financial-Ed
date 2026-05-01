import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Sparkles, ChevronRight, BookOpen, Coins, Globe } from "lucide-react";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t     = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const isAr  = locale === "ar";

  const features = [
    { icon: <BookOpen className="size-4" />, en: "15 Financial Worlds",  ar: "15 عالماً مالياً"   },
    { icon: <Coins    className="size-4" />, en: "Earn VAL Coins",       ar: "اكسب عملات VAL"     },
    { icon: <Globe    className="size-4" />, en: "Arabic & English",     ar: "عربي وإنجليزي"       },
    { icon: <Sparkles className="size-4" />, en: "UAE-rooted content",   ar: "محتوى إماراتي الجذور" },
  ];

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "linear-gradient(160deg, #C8E2F5 0%, #DFF0FA 25%, #F5F9FE 55%, #FFF5E8 80%, #FFE8C0 100%)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Ambient background blobs ─────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(5,160,73,0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-5%", right: "5%",
            width: 350, height: 350,
            background: "radial-gradient(circle, rgba(212,169,90,0.12) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-10 text-center">

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="flex size-16 items-center justify-center rounded-3xl mb-1"
            style={{
              background: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
              boxShadow: "0 0 40px rgba(5,160,73,0.35)",
            }}
          >
            <span className="font-display text-2xl font-extrabold" style={{ color: "#FFFFFC" }}>V</span>
          </div>
          <h1
            className="font-display text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #D4A95A 0%, #F5C872 50%, #D4A95A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Valura
          </h1>
          <p className="font-body text-base max-w-[280px] leading-relaxed" style={{ color: "#475569" }}>
            {isAr ? "مهاراتك المالية. بالدرهم. بالعربي." : tMeta("description")}
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {features.map(({ icon, en, ar }) => (
            <span
              key={en}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-medium"
              style={{
                background: "rgba(255,255,252,0.75)",
                border: "1px solid rgba(5,160,73,0.18)",
                color: "#059669",
                backdropFilter: "blur(8px)",
              }}
            >
              {icon}
              {isAr ? ar : en}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3">
          <Link
            href={`/${locale}/sign-in`}
            className="flex items-center justify-center gap-2 rounded-2xl py-4 font-heading text-sm font-bold transition-all hover:brightness-110 active:scale-98"
            style={{
              background: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
              color: "#FFFFFC",
              boxShadow: "0 4px 20px rgba(5,160,73,0.30)",
            }}
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {isAr ? "ابدأ مجاناً" : t("register")}
          </Link>
          <Link
            href={`/${locale}/sign-in`}
            className="flex items-center justify-center gap-2 rounded-2xl py-4 font-heading text-sm font-semibold transition-all hover:bg-white/40"
            style={{
              background: "rgba(255,255,252,0.65)",
              border: "1.5px solid rgba(0,17,27,0.12)",
              color: "#475569",
              backdropFilter: "blur(8px)",
            }}
          >
            {isAr ? "تسجيل الدخول" : t("login")}
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-xs max-w-[260px] leading-relaxed" style={{ color: "rgba(0,17,27,0.35)" }}>
          {isAr ? "تعليمي فقط، ليس نصيحة مالية." : "Educational only, not financial advice."}
        </p>
      </div>
    </main>
  );
}
