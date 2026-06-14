import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import AtlasHeader from "@/components/atlas/AtlasHeader";
import SiteFooter from "@/components/atlas/SiteFooter";
import ModuleLessonList from "@/components/atlas/ModuleLessonList";
import { MODULES, getModule } from "@/lib/atlas/curriculum";
import type { Accent } from "@/lib/atlas/types";

const ACCENT: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

export function generateStaticParams() {
  return MODULES.map((m) => ({ moduleSlug: m.slug }));
}

export function generateMetadata({ params }: { params: { moduleSlug: string } }): Metadata {
  const m = getModule(params.moduleSlug);
  if (!m) return { title: "Module" };
  return { title: m.title, description: m.summary };
}

export default function ModulePage({ params }: { params: { moduleSlug: string } }) {
  const m = getModule(params.moduleSlug);
  if (!m) notFound();
  const color = ACCENT[m.accent];

  return (
    <div className="page-bg flex min-h-screen flex-col">
      <AtlasHeader variant="app" />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/learn"
            className="nav-link mb-7 inline-flex items-center gap-1.5"
          >
            <ChevronLeft size={15} /> All modules
          </Link>

          <div className="animate-slide-up">
            <div className="flex items-center gap-3">
              <span
                className="flex size-12 items-center justify-center rounded-2xl font-heading"
                style={{ background: `${color}18`, color, fontSize: 20, fontWeight: 800, border: `1px solid ${color}40` }}
              >
                {m.index}
              </span>
              <span className="chip" style={{ borderColor: `${color}40`, color, background: `${color}10` }}>
                Module {m.index} · {m.tagline}
              </span>
            </div>
            <h1
              className="mt-5 font-heading"
              style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em" }}
            >
              {m.title}
            </h1>
            <p className="mt-3 max-w-2xl prose-atlas" style={{ fontSize: 17 }}>
              {m.summary}
            </p>
          </div>

          <div className="mt-10">
            <ModuleLessonList moduleSlug={m.slug} lessons={m.lessons} accent={m.accent} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
