import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { WORLD_CONTENT } from "@/lib/game/world-content";
import WorldScreen from "./_components/WorldScreen";

interface Params {
  params: { locale: string; worldSlug: string };
}

export async function generateMetadata({ params: { locale, worldSlug } }: Params): Promise<Metadata> {
  const world = WORLD_CONTENT[worldSlug];
  if (!world) return {};
  const name = locale === "ar" ? world.nameAr : world.nameEn;
  return { title: `${name} — Valura` };
}

/**
 * Inside-world view — server component.
 *
 * Reads world content from static seed data (DB-backed in production).
 * Redirects to the journey map if the slug is unknown.
 */
export default async function WorldPage({ params: { locale, worldSlug } }: Params) {
  await requireAuth(locale);

  const world = WORLD_CONTENT[worldSlug];
  if (!world) redirect(`/${locale}/journey`);

  return <WorldScreen world={world} locale={locale} />;
}
