"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { magicLinkSchema, type MagicLinkInput } from "@/lib/validations/auth";

interface SignInFormProps {
  locale?: string;
}

/**
 * Inline sign-in form for the new two-column login page.
 * Demo mode — any email signs in instantly.
 */
export default function SignInForm({ locale = "en" }: SignInFormProps) {
  const router = useRouter();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "demo@valura.ae" },
  });

  const onSubmit = async (data: MagicLinkInput) => {
    setLoading(true);
    setError("");
    const result = await signIn("demo", {
      email: data.email,
      redirect: false,
      callbackUrl: `/${locale}/journey`,
    });
    if (result?.error) {
      setError(isAr ? "فشل تسجيل الدخول. تحقق من الإعداد." : "Demo sign-in failed. Check your setup.");
      setLoading(false);
      return;
    }
    router.push(`/${locale}/journey`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Demo info pill */}
      <div
        className="flex items-start gap-2.5 rounded-xl p-3"
        style={{
          background: "#FFF8E7",
          border: "1px solid #F0E1B8",
        }}
      >
        <Zap className="mt-0.5 size-4 shrink-0" style={{ color: "#8B6914" }} aria-hidden />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#8B6914",
            lineHeight: 1.4,
          }}
        >
          {isAr
            ? "نسخة تجريبية — أي بريد إلكتروني يسجّل دخولك فوراً."
            : "Demo build — any email signs you in instantly."}
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signin-email"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          {isAr ? "البريد الإلكتروني" : "Email address"}
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          placeholder="demo@valura.ae"
          {...register("email")}
          className="outline-none transition-shadow"
          style={{
            height: 48,
            width: "100%",
            borderRadius: 12,
            border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E2E8F0",
            padding: "0 16px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "#00111B",
            background: "#FAFAFA",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1.5px solid #05A049";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5,160,73,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = errors.email
              ? "1.5px solid #EF4444"
              : "1.5px solid #E2E8F0";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors.email && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#EF4444",
            }}
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
        {error && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#EF4444",
            }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="transition-all active:scale-[0.98]"
        style={{
          height: 48,
          width: "100%",
          borderRadius: 12,
          background: loading ? "#8BC9AB" : "#05A049",
          border: "none",
          color: "#FFFFFF",
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 4px 12px rgba(5,160,73,0.25)",
        }}
        onMouseEnter={(e) => {
          if (!loading) (e.currentTarget as HTMLElement).style.background = "#03803A";
        }}
        onMouseLeave={(e) => {
          if (!loading) (e.currentTarget as HTMLElement).style.background = "#05A049";
        }}
        aria-busy={loading}
      >
        {loading
          ? isAr ? "جارٍ التسجيل…" : "Signing in…"
          : isAr ? "متابعة ←" : "Continue →"}
      </button>

      {/* Muted compliance */}
      <p
        className="text-center"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "#94A3B8",
        }}
      >
        {isAr
          ? "بالمتابعة أنت توافق على الشروط وسياسة الخصوصية."
          : "By continuing you agree to our Terms and Privacy Policy."}
      </p>
    </form>
  );
}
