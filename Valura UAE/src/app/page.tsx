import Link from "next/link";
import { ArrowRight, Globe2, IndianRupee, ShieldCheck, Sparkles, Languages, Clock3 } from "lucide-react";
import AtlasHeader from "@/components/atlas/AtlasHeader";
import SiteFooter from "@/components/atlas/SiteFooter";
import Reveal from "@/components/atlas/Reveal";
import { Diagram } from "@/components/atlas/Diagrams";
import { MODULES, TOTAL_LESSONS, TOTAL_MINUTES } from "@/lib/atlas/curriculum";
import type { Accent } from "@/lib/atlas/types";

const ACCENT: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

export default function Home() {
  return (
    <div className="page-bg">
      <AtlasHeader variant="marketing" />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div aria-hidden className="glow-green pointer-events-none absolute left-1/2 top-[-80px] h-[420px] w-[820px] -translate-x-1/2" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-slide-up">
            <span className="chip chip-green">
              <Globe2 size={13} /> Built for Indian investors
            </span>
            <h1
              className="mt-6 font-heading text-balance"
              style={{ fontSize: "clamp(38px,6vw,66px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.035em", lineHeight: 1.03 }}
            >
              You already use the world&apos;s biggest companies.{" "}
              <span className="text-gradient-green">Time to own a piece.</span>
            </h1>
            <p className="mt-6 max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: 18.5, color: "var(--fg-2)", lineHeight: 1.65 }}>
              Atlas is a free, no-nonsense guide to investing beyond India — the routes out, the
              rules, the taxes, the why. Plain English, real numbers, and pictures that actually
              explain.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/learn" className="btn-primary">
                Start learning — free <ArrowRight size={16} />
              </Link>
              <Link href="/learn" className="btn-secondary">
                See the curriculum
              </Link>
            </div>
            <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "var(--fg-3)" }}>
              {TOTAL_LESSONS} lessons · ~{TOTAL_MINUTES} min · no signup needed · nothing to buy
            </p>
          </div>

          {/* Hero visual — a real diagram, not stock art */}
          <div className="animate-slide-up relative" style={{ animationDelay: "0.08s" }}>
            <div className="card-elevated p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="chip chip-green" style={{ padding: "3px 9px", fontSize: 11 }}>
                  Lesson 1
                </span>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12.5, fontWeight: 700, color: "var(--fg-2)" }}>
                  The 3% problem
                </span>
              </div>
              <Diagram id="world-share" />
              <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)" }}>
                Every Indian company added up is ~3% of the world&apos;s stock market. Atlas starts here.
              </p>
            </div>
            {/* small floating nudge */}
            <div
              className="nudge absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-full px-3.5 py-2 sm:flex"
              style={{ background: "var(--surface)", border: "1px solid var(--line-2)", boxShadow: "var(--shadow)" }}
            >
              <Clock3 size={14} color="var(--accent)" />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12.5, fontWeight: 600, color: "var(--fg)" }}>
                ~4 min a lesson
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum preview ────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8 sm:py-24" style={{ background: "var(--bg-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="chip chip-green">The curriculum</span>
            <h2 className="mt-4 max-w-2xl font-heading" style={{ fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Five modules. From <span className="text-gradient-green">why</span> to <span className="text-gradient-green">how</span>.
            </h2>
            <p className="mt-3 max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: 16.5, color: "var(--fg-2)", lineHeight: 1.6 }}>
              Each module is short, visual, and ends with a quick check so it actually sticks.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => {
              const color = ACCENT[m.accent];
              return (
                <Reveal key={m.slug} delay={i * 60}>
                  <Link href={`/learn/${m.slug}`} className="lift-card group block h-full rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-2xl font-heading" style={{ background: `${color}16`, color, fontSize: 16, fontWeight: 800, border: `1px solid ${color}38` }}>
                        {m.index}
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--fg-3)" }}>
                        {m.lessons.length} lessons
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading" style={{ fontSize: 18.5, fontWeight: 700, color: "var(--fg)" }}>
                      {m.title}
                    </h3>
                    <p className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 600, color }}>
                      {m.tagline}
                    </p>
                    <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>
                      {m.summary}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pictures, not paragraphs ──────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="chip chip-sky">
              <Sparkles size={13} /> Made to be understood
            </span>
            <h2 className="mt-4 font-heading" style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
              Pictures, not paragraphs
            </h2>
            <p className="mt-4 max-w-md" style={{ fontFamily: "'Inter', sans-serif", fontSize: 16.5, color: "var(--fg-2)", lineHeight: 1.65 }}>
              Most finance content drowns you in words. Atlas draws it. Every tricky idea — the five
              routes abroad, the LRS limit, how your money actually travels — comes with a clear
              diagram you can grasp in seconds.
            </p>
            <Link href="/learn/the-routes/five-doors-to-the-world" className="btn-secondary mt-7">
              See it in action <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="card-elevated p-5 sm:p-7">
              <Diagram id="five-routes" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Atlas ─────────────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-8 sm:py-24" style={{ background: "var(--bg-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-heading" style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em" }}>
              Built for India. Not translated for it.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { Icon: Languages, t: "Plain English", b: "No jargon walls, no MBA-speak. If a term matters, we define it once, simply, and move on.", c: "#0E9F6E" },
              { Icon: IndianRupee, t: "India-context, always", b: "LRS, TCS, GIFT City, the India–US tax treaty — the rules that actually apply to you, with current numbers.", c: "#0C8CE0" },
              { Icon: ShieldCheck, t: "Education, not a sales pitch", b: "We explain how things work so you can decide. No product to push, no hot tips. Free, end to end.", c: "#6D4AE0" },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 60}>
                <div className="h-full rounded-3xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                  <div className="flex size-11 items-center justify-center rounded-2xl" style={{ background: `${v.c}16` }}>
                    <v.Icon size={20} color={v.c} />
                  </div>
                  <h3 className="mt-4 font-heading" style={{ fontSize: 17.5, fontWeight: 700, color: "var(--fg)" }}>
                    {v.t}
                  </h3>
                  <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.6 }}>
                    {v.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="px-5 pb-24 pt-16 sm:px-8">
        <Reveal>
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-10 text-center sm:p-14"
            style={{ background: "linear-gradient(135deg, #ffffff, var(--accent-soft))", border: "1px solid rgba(14,159,110,0.22)", boxShadow: "var(--shadow-lg)" }}
          >
            <h2 className="mx-auto max-w-2xl font-heading text-balance" style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Thirty minutes to understand the whole world&apos;s markets.
            </h2>
            <p className="mx-auto mt-4 max-w-lg" style={{ fontFamily: "'Inter', sans-serif", fontSize: 16.5, color: "var(--fg-2)" }}>
              Start with the 3% problem. By the end you&apos;ll know the routes, the rules and the taxes.
            </p>
            <Link href="/learn" className="btn-primary mx-auto mt-8" style={{ height: 54, padding: "0 32px", fontSize: 15 }}>
              Start learning — free <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
