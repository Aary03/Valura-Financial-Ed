"use client";

import Link from "next/link";
import DemoLoginForm from "@/components/auth/DemoLoginForm";

/**
 * Valura UAE sign-in page.
 * Demo mode: instant login with any email, no verification required.
 * Magic-link (Resend) is restored once DATABASE_URL is configured.
 */
export default function SignInPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(160deg, #C8E2F5 0%, #DFF0FA 30%, #F5F9FE 60%, #FFF5E8 100%)" }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: 560, height: 560,
            background: "radial-gradient(circle, rgba(5,160,73,0.12) 0%, transparent 65%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-10%", right: "5%",
            width: 340, height: 340,
            background: "radial-gradient(circle, rgba(212,169,90,0.10) 0%, transparent 65%)",
            filter: "blur(10px)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(180,227,200,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px] flex flex-col gap-7">
        {/* Wordmark */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Link href="/en" aria-label="Valura — home">
            <span
              className="font-display text-[2.75rem] font-bold leading-none"
              style={{
                background: "linear-gradient(135deg, #D4A95A 0%, #F5C872 50%, #D4A95A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Valura
            </span>
          </Link>
          <p className="text-sm" style={{ color: "#475569" }}>
            Your financial wellness journey
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "#FFFFFC", border: "1px solid rgba(0,17,27,0.08)" }}
        >
          <div
            className="px-6 pt-6 pb-5 border-b"
            style={{ borderColor: "rgba(0,17,27,0.07)" }}
          >
            <h1 className="font-heading text-xl font-semibold" style={{ color: "#00111B" }}>
              Sign in instantly — no verification needed
            </h1>
          </div>
          <div className="px-6 py-6">
            <DemoLoginForm />
          </div>
        </div>

        {/* Regulatory disclaimer */}
        <div className="flex flex-col gap-1.5 text-center px-2">
          <p className="text-xs leading-relaxed" style={{ color: "#475569", opacity: 0.75 }}>
            Educational only, not financial advice. Valura UAE is a sister product of Valura,
            GIFT City IFSCA-regulated.
          </p>
          <p className="text-xs" style={{ color: "#475569", opacity: 0.45 }}>
            VAL Coins are virtual — for cosmetics and charity only, never redeemable.
          </p>
        </div>
      </div>
    </main>
  );
}
