"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { magicLinkSchema, type MagicLinkInput } from "@/lib/validations/auth";

/**
 * Demo login form — signs in any email instantly without verification.
 * For pitch demos and internal testing only. Removed in production.
 */
export default function DemoLoginForm() {
  const router = useRouter();
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
      callbackUrl: "/en/journey",
    });
    if (result?.error) {
      setError("Demo sign-in failed. Check your setup.");
      setLoading(false);
      return;
    }
    router.push("/en/journey");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Demo badge */}
      <div className="flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3">
        <Zap className="size-4 shrink-0 text-gold" aria-hidden="true" />
        <p className="text-xs text-gold-dark leading-snug">
          <strong>Demo mode</strong> — enter any email and you&apos;re in instantly. No
          verification needed.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="demo-email">Email address</Label>
        <Input
          id="demo-email"
          type="email"
          autoComplete="email"
          placeholder="demo@valura.ae"
          error={errors.email?.message}
          {...register("email")}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          "Signing in…"
        ) : (
          <>
            <Zap className="size-4" aria-hidden="true" />
            Instant demo login
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
