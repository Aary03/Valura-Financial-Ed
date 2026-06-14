"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame, ArrowRight } from "lucide-react";
import Wordmark from "@/components/brand/Wordmark";
import { useProgress } from "@/lib/atlas/progress";
import { TOTAL_LESSONS } from "@/lib/atlas/curriculum";

export default function AtlasHeader({ variant = "app" }: { variant?: "app" | "marketing" }) {
  const completed = useProgress((s) => s.completed.length);
  const streak = useProgress((s) => s.streakDays);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" aria-label="Valura Atlas home">
          <Wordmark variant="full" size="md" />
        </Link>

        {variant === "marketing" ? (
          <div className="flex items-center gap-3">
            <Link href="/learn" className="nav-link hidden sm:inline">
              Curriculum
            </Link>
            <Link href="/learn" className="btn-primary" style={{ height: 40, padding: "0 18px", fontSize: 13.5 }}>
              Start learning <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            {mounted && streak > 0 && (
              <span
                className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 sm:inline-flex"
                style={{ background: "var(--amber-soft)", border: "1px solid rgba(217,131,0,0.3)" }}
                title="Your daily learning streak"
              >
                <Flame size={14} color="var(--amber)" />
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 700, color: "#a8650a" }}>
                  {streak}
                </span>
              </span>
            )}
            <span className="hidden items-center gap-2 sm:flex" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "var(--fg-3)" }}>
              <span style={{ fontWeight: 700, color: "var(--accent)" }}>{mounted ? completed : 0}</span>
              <span>/ {TOTAL_LESSONS} lessons</span>
            </span>
            <Link href="/learn" className="nav-link">
              Curriculum
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
