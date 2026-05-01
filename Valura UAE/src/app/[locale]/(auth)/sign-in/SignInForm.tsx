"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { magicLinkSchema, type MagicLinkInput } from "@/lib/validations/auth";

export default function SignInForm({ locale = "en" }: { locale?: string }) {
  const router = useRouter();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<MagicLinkInput>({
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
      setError(isAr ? "فشل تسجيل الدخول." : "Sign-in failed. Check your setup.");
      setLoading(false);
      return;
    }
    router.push(`/${locale}/journey`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* Demo pill */}
      <div
        className="flex items-start gap-2.5 rounded-lg p-3"
        style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}
      >
        <Zap className="mt-0.5 size-4 shrink-0" style={{ color: "#F59E0B" }} aria-hidden />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#FCD34D", lineHeight: 1.4 }}>
          {isAr
            ? "نسخة تجريبية — أي بريد إلكتروني يسجّل دخولك فوراً."
            : "Demo build — any email signs you in instantly."}
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="signin-email"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}
        >
          {isAr ? "البريد الإلكتروني" : "Email address"}
        </label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          placeholder="demo@valura.ae"
          {...register("email")}
          className="outline-none transition-all"
          style={{
            height: 44,
            width: "100%",
            borderRadius: 8,
            border: errors.email
              ? "1px solid rgba(239,68,68,0.6)"
              : "1px solid rgba(255,255,255,0.1)",
            padding: "0 14px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#F0FDF4",
            background: "rgba(255,255,255,0.04)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid rgba(34,197,94,0.5)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = errors.email
              ? "1px solid rgba(239,68,68,0.6)"
              : "1px solid rgba(255,255,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors.email && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#EF4444" }} role="alert">
            {errors.email.message}
          </p>
        )}
        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#EF4444" }} role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
        style={{ opacity: loading ? 0.65 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        aria-busy={loading}
      >
        {loading
          ? (isAr ? "جارٍ التسجيل…" : "Signing in…")
          : (isAr ? "متابعة ←" : "Continue →")}
      </button>

      <p
        className="text-center"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#374151" }}
      >
        {isAr
          ? "بالمتابعة توافق على الشروط وسياسة الخصوصية."
          : "By continuing you agree to our Terms and Privacy Policy."}
      </p>
    </form>
  );
}
