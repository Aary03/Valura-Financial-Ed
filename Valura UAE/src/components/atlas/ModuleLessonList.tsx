"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Clock, ArrowRight } from "lucide-react";
import type { Lesson, Accent } from "@/lib/atlas/types";
import { lessonId } from "@/lib/atlas/curriculum";
import { useProgress } from "@/lib/atlas/progress";

const ACCENT: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

export default function ModuleLessonList({
  moduleSlug,
  lessons,
  accent,
}: {
  moduleSlug: string;
  lessons: Lesson[];
  accent: Accent;
}) {
  const completed = useProgress((s) => s.completed);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const doneSet = new Set(mounted ? completed : []);
  const color = ACCENT[accent];

  return (
    <ol className="space-y-3">
      {lessons.map((l, i) => {
        const isDone = doneSet.has(lessonId(moduleSlug, l.slug));
        return (
          <li key={l.slug}>
            <Link
              href={`/learn/${moduleSlug}/${l.slug}`}
              className="lift-card flex items-center gap-4 rounded-2xl p-4 sm:p-5"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-xl font-heading"
                style={{
                  background: isDone ? color : `${color}14`,
                  color: isDone ? "#fff" : color,
                  fontSize: 15,
                  fontWeight: 700,
                  border: isDone ? "none" : `1px solid ${color}33`,
                }}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : i + 1}
              </span>
              <div className="flex-1">
                <div className="font-heading" style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>
                  {l.title}
                </div>
                <div className="mt-0.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "var(--fg-2)" }}>
                  {l.hook}
                </div>
              </div>
              <span className="hidden items-center gap-1.5 sm:flex" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)" }}>
                <Clock size={12} /> {l.minutes}m
              </span>
              <ArrowRight size={16} color="var(--fg-3)" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
