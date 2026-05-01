"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { savePseudonym } from "@/app/actions/onboarding";
import { suggestThreePseudonyms } from "@/lib/game/pseudonyms";

interface OnboardingScreenProps {
  locale: string;
  /** Short fragment to vary deterministic suggestions — not used as an identifier in UI copy. */
  userIdNonce: string;
}

/**
 * Pseudonym picker: three deterministic suggestions plus a custom text field — no real-name prompt.
 */
export default function OnboardingScreen({ locale, userIdNonce }: OnboardingScreenProps) {
  const router   = useRouter();
  const isAr     = locale === "ar";
  const options  = useMemo(() => suggestThreePseudonyms(userIdNonce), [userIdNonce]);
  const [custom, setCustom]       = useState("");
  const [selected, setSelected] = useState<string | null>(options[0] ?? null);
  const [err, setErr]            = useState<string | null>(null);
  const [pending, start]       = useTransition();

  function submit() {
    const name = (custom.trim().length >= 2 ? custom.trim() : selected) ?? "";
    setErr(null);
    start(async () => {
      const res = await savePseudonym(name);
      if (res.success) {
        router.push(`/${locale}/journey`);
        router.refresh();
      } else {
        setErr(res.error ?? "Error");
      }
    });
  }

  return (
    <main
      className="relative min-h-screen px-6 py-16 md:py-24"
      dir={isAr ? "rtl" : "ltr"}
      style={{
        background:
          "linear-gradient(175deg, #E8F6FF 0%, #FFF7ED 52%, #E8FFE8 100%)",
      }}
    >
      <div className="mx-auto flex max-w-lg flex-col gap-8">
        <div className="text-center space-y-2">
          <motion.div
            className="inline-flex items-center justify-center rounded-full px-4 py-1.5"
            style={{
              border:       "1px solid rgba(5,160,73,0.25)",
              background: "rgba(255,255,255,0.7)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="me-2 size-4" style={{ color: "#059669" }} aria-hidden="true" />
            <span className="font-heading text-xs font-bold uppercase tracking-wide" style={{ color: "#047857" }}>
              {isAr ? "خطوة واحدة نحو تجربة آمنة" : "Privacy-first identity"}
            </span>
          </motion.div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold" style={{ color: "#00111B" }}>
            {isAr ? "اختر اسماً علنياً" : "Pick a public pseudonym"}
          </h1>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#475569" }}>
            {isAr
              ? "يظهر الاسم الذي تختاره للأصدقاء والمجتمع فقط — لا حقول الاسم القانوني أو الهاتف."
              : "This is what friends will see — no legal name fields. Ever."}
          </p>
        </div>

        <section
          className="rounded-3xl px-6 py-7 shadow-xl"
          style={{
            background:   "rgba(255,252,246,0.92)",
            border:       "1px solid rgba(0,17,27,0.06)",
          }}
          aria-labelledby="pseudo-label"
        >
          <p id="pseudo-label" className="sr-only">
            {isAr ? "اقتراحات الأسماء" : "Suggested names"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {options.map((o) => {
              const active = selected === o && custom.trim().length < 2;
              return (
                <button
                  key={o}
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setSelected(o);
                    setCustom("");
                  }}
                  className="rounded-full px-5 py-2.5 font-heading text-sm font-bold transition-colors"
                  style={{
                    border: `2px solid ${active ? "#05A049" : "rgba(0,17,27,0.08)"}`,
                    background: active ? "rgba(5,160,73,0.08)" : "rgba(255,255,255,0.8)",
                    color: "#00111B",
                  }}
                >
                  {o}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <label htmlFor="pseudo-custom" className="font-heading text-xs font-bold uppercase tracking-wide mb-2 block" style={{ color: "#475569" }}>
              {isAr ? "أو اكتب خاصتك (٢–٣٢ حرفاً)" : "Or type your own (2–32 characters)"}
            </label>
            <input
              id="pseudo-custom"
              name="pseudoCustom"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full rounded-2xl px-5 py-3 font-body text-base outline-none focus:ring-2"
              placeholder={isAr ? "مثل: شارقة براعم" : "e.g., Creek Nomad"}
              style={{
                border: "1px solid rgba(0,17,27,0.1)",
                background: "#FFFFF8",
              }}
              maxLength={32}
              autoComplete="off"
              autoCorrect="off"
              aria-describedby="pseudo-hint"
            />
            <p id="pseudo-hint" className="mt-2 font-body text-xs" style={{ color: "#64748B" }}>
              {isAr ? "لاتيني أو عربي — تجنب المعرف الحقيقي." : "Latin or Arabic — avoid sharing real-ID info."}
            </p>
          </div>

          {err && (
            <p className="mt-4 text-center font-body text-sm" style={{ color: "#BE123C" }} role="alert">
              {err}
            </p>
          )}

          <motion.button
            type="button"
            disabled={pending}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full rounded-2xl py-4 font-heading text-lg font-extrabold text-cream"
            style={{
              background: "linear-gradient(135deg,#05A049 0%,#059669 100%)",
              boxShadow:  "0 10px 32px rgba(5,160,73,0.35)",
              opacity:    pending ? 0.72 : 1,
            }}
            onClick={() => submit()}
          >
            {pending ? "…" : isAr ? "ابدأ الرحلة" : "Continue to Valura"}
          </motion.button>
        </section>
      </div>
    </main>
  );
}
