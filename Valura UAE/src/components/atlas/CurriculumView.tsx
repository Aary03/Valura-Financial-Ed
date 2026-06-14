"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Clock, ArrowRight, PlayCircle } from "lucide-react";
import {
  MODULES,
  TOTAL_LESSONS,
  TOTAL_MINUTES,
  allLessonsFlat,
  lessonId,
} from "@/lib/atlas/curriculum";
import type { Accent } from "@/lib/atlas/types";
import { useProgress } from "@/lib/atlas/progress";

const ACCENT: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

export default function CurriculumView() {
  const completed = useProgress((s) => s.completed);
  const lastVisited = useProgress((s) => s.lastVisited);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const doneSet = new Set(mounted ? completed : []);
  const doneCount = doneSet.size;
  const pct = Math.round((doneCount / TOTAL_LESSONS) * 100);

  const flat = allLessonsFlat();
  const firstIncomplete = flat.find((l) => !doneSet.has(lessonId(l.moduleSlug, l.lessonSlug)));
  const resume =
    (lastVisited && flat.find((l) => lessonId(l.moduleSlug, l.lessonSlug) === lastVisited)) ||
    firstIncomplete ||
    flat[0];
  const started = doneCount > 0 || !!lastVisited;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="animate-slide-up">
        <span className="chip chip-green">The curriculum</span>
        <h1
          className="mt-4 font-heading"
          style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
        >
          Global investing, mapped
        </h1>
        <p className="mt-4 max-w-2xl prose-atlas" style={{ fontSize: 17.5 }}>
          Five short modules take you from <em>why</em> to <em>how</em> — the routes out of India, the
          money mechanics, US markets, and the tax rules — in plain English. No fluff, no jargon walls.
        </p>

        <div className="card-dark mt-7 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "var(--fg-2)" }}>
              <span style={{ color: "var(--accent-strong)", fontWeight: 700 }}>{doneCount}</span> of {TOTAL_LESSONS} lessons
              · {TOTAL_MINUTES} min total
            </span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--accent-strong)" }}>
              {pct}%
            </span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(27,26,23,0.08)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg,var(--accent),var(--accent-2))", transition: "width 500ms cubic-bezier(0.22,1,0.36,1)" }}
            />
          </div>
          <Link href={`/learn/${resume.moduleSlug}/${resume.lessonSlug}`} className="btn-primary mt-5 w-full sm:w-auto">
            <PlayCircle size={17} />
            {started ? `Continue · ${resume.title}` : `Start · ${resume.title}`}
          </Link>
        </div>
      </div>

      <div className="mt-12 space-y-5">
        {MODULES.map((m, mi) => {
          const color = ACCENT[m.accent];
          const moduleDone = m.lessons.filter((l) => doneSet.has(lessonId(m.slug, l.slug))).length;
          return (
            <div key={m.slug} className="card-dark animate-slide-up overflow-hidden" style={{ animationDelay: `${mi * 0.05}s` }}>
              <div className="flex items-start gap-4 p-5 sm:p-6" style={{ borderBottom: "1px solid var(--line)" }}>
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-2xl font-heading"
                  style={{ background: `${color}16`, color, fontSize: 18, fontWeight: 800, border: `1px solid ${color}38` }}
                >
                  {m.index}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading" style={{ fontSize: 19, fontWeight: 700, color: "var(--fg)" }}>
                      {m.title}
                    </h2>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color }}>· {m.tagline}</span>
                  </div>
                  <p className="mt-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>
                    {m.summary}
                  </p>
                  <div className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--fg-3)" }}>
                    {mounted ? `${moduleDone} / ${m.lessons.length} done` : `${m.lessons.length} lessons`}
                  </div>
                </div>
              </div>

              <ul>
                {m.lessons.map((l) => {
                  const isDone = doneSet.has(lessonId(m.slug, l.slug));
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`/learn/${m.slug}/${l.slug}`}
                        className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[rgba(14,159,110,0.04)] sm:px-6"
                        style={{ borderTop: "1px solid var(--line)" }}
                      >
                        <span
                          className="flex size-6 shrink-0 items-center justify-center rounded-full"
                          style={{ background: isDone ? color : "transparent", border: isDone ? "none" : "1.5px solid var(--line-2)" }}
                        >
                          {isDone && <Check size={14} color="#fff" strokeWidth={3} />}
                        </span>
                        <span className="flex-1" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 600, color: isDone ? "var(--fg-3)" : "var(--fg)" }}>
                          {l.title}
                        </span>
                        <span className="hidden items-center gap-1.5 sm:flex" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)" }}>
                          <Clock size={12} /> {l.minutes}m
                        </span>
                        <ArrowRight size={15} color="var(--fg-3)" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
