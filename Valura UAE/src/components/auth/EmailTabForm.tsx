"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { magicLinkSchema, type MagicLinkInput } from "@/lib/validations/auth";

/**
 * Email magic-link sign-in form.
 * Sends a one-click login link via Resend/NextAuth.
 */
export default function EmailTabForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema),
  });

  const onSubmit = async (data: MagicLinkInput) => {
    setSubmitting(true);
    await signIn("resend", {
      email: data.email,
      redirect: false,
      callbackUrl: "/en/journey",
    });
    setSent(true);
    setSubmitting(false);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center animate-fade-in">
        <CheckCircle className="size-12 text-green" aria-hidden="true" />
        <div>
          <p className="font-heading font-semibold text-lg text-navy">Check your inbox</p>
          <p className="text-sm text-muted mt-1">
            We sent a magic link to <strong>{getValues("email")}</strong>
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-xs text-muted hover:text-green underline underline-offset-2 transition-colors"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={errors.email ? "email-error" : undefined}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="w-full"
        aria-busy={submitting}
      >
        {submitting ? (
          "Sending link…"
        ) : (
          <>
            <Mail className="size-4" aria-hidden="true" />
            Send magic link
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
