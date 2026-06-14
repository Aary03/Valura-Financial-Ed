import type { Metadata } from "next";
import AtlasHeader from "@/components/atlas/AtlasHeader";
import SiteFooter from "@/components/atlas/SiteFooter";
import CurriculumView from "@/components/atlas/CurriculumView";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Five short modules on global investing for Indian investors — why to go global, the routes out of India, moving money, US markets, and tax & rules.",
};

export default function LearnPage() {
  return (
    <div className="page-bg flex min-h-screen flex-col">
      <AtlasHeader variant="app" />
      <main className="flex-1">
        <CurriculumView />
      </main>
      <SiteFooter />
    </div>
  );
}
