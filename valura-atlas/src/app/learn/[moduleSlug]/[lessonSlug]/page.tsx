import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import AtlasHeader from "@/components/atlas/AtlasHeader";
import SiteFooter from "@/components/atlas/SiteFooter";
import LessonBlocks from "@/components/atlas/LessonBlocks";
import LessonQuiz from "@/components/atlas/LessonQuiz";
import TrackVisit from "@/components/atlas/TrackVisit";
import { MODULES, getLesson, nextLesson, lessonId } from "@/lib/atlas/curriculum";
import type { Accent } from "@/lib/atlas/types";

const ACCENT: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { moduleSlug: string; lessonSlug: string };
}): Metadata {
  const found = getLesson(params.moduleSlug, params.lessonSlug);
  if (!found) return { title: "Lesson" };
  return { title: found.lesson.title, description: found.lesson.hook };
}

export default function LessonPage({
  params,
}: {
  params: { moduleSlug: string; lessonSlug: string };
}) {
  const found = getLesson(params.moduleSlug, params.lessonSlug);
  if (!found) notFound();
  const { module: m, lesson } = found;
  const color = ACCENT[m.accent];
  const next = nextLesson(m.slug, lesson.slug) ?? null;
  const id = lessonId(m.slug, lesson.slug);

  return (
    <div className="page-bg flex min-h-screen flex-col">
      <TrackVisit id={id} />
      <AtlasHeader variant="app" />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
          {/* Breadcrumb */}
          <Link href={`/learn/${m.slug}`} className="nav-link mb-6 inline-flex items-center gap-1.5">
            <ChevronLeft size={15} /> {m.title}
          </Link>

          {/* Lesson head */}
          <div className="animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="chip" style={{ borderColor: `${color}40`, color, background: `${color}10` }}>
                Module {m.index}
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)" }}>
                <Clock size={13} /> {lesson.minutes} min read
              </span>
            </div>
            <h1
              className="mt-4 font-heading text-balance"
              style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", lineHeight: 1.08 }}
            >
              {lesson.title}
            </h1>
            <p
              className="mt-3"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, color: color, lineHeight: 1.4, fontWeight: 600 }}
            >
              {lesson.hook}
            </p>
          </div>

          <div
            className="my-8"
            style={{ height: 1, background: "linear-gradient(90deg, var(--line-2), transparent)" }}
          />

          {/* Body */}
          <LessonBlocks blocks={lesson.blocks} />

          {/* Knowledge check + completion */}
          <LessonQuiz quiz={lesson.quiz} lessonId={id} next={next} />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
