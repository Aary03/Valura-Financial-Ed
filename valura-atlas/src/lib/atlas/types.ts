/**
 * Valura Atlas — content model.
 *
 * A Module groups Lessons. A Lesson is a sequence of content blocks
 * followed by a short knowledge check (quiz). Content blocks are rendered
 * by <LessonBlocks>; diagrams are looked up by id in the diagram registry.
 *
 * Copy convention inside text fields:
 *   **bold**  → emphasis (renders <strong>)
 *   *italic*  → secondary emphasis (renders <em>)
 */

export type Accent = "green" | "sky" | "violet" | "amber" | "rose";

/** Known diagram ids — each maps to a component in the diagram registry. */
export type DiagramId =
  | "world-share"
  | "rupee-drift"
  | "concentration"
  | "five-routes"
  | "lrs-bucket"
  | "gift-city"
  | "money-journey"
  | "us-ownership"
  | "tax-flow"
  | "regulators"
  | "brands-you-use"
  | "feeder-fund"
  | "index-etf-stock"
  | "estate-tax"
  | "allocation"
  | "compounding";

export type ContentBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | {
      kind: "callout";
      variant: "note" | "key" | "caution" | "example";
      title?: string;
      text: string;
    }
  | { kind: "stats"; items: { value: string; label: string; accent?: Accent }[] }
  | { kind: "diagram"; id: DiagramId; caption?: string }
  | {
      kind: "compare";
      columns: string[];
      rows: { label: string; cells: string[] }[];
      caption?: string;
    }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "definition"; term: string; text: string }
  | { kind: "keytakeaways"; items: string[] };

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: { id: string; text: string }[];
  correctId: string;
  /** Shown after the learner answers (correct or not). */
  explain: string;
}

export interface Lesson {
  slug: string;
  title: string;
  /** One-line hook shown in lists and at the top of the reader. */
  hook: string;
  minutes: number;
  blocks: ContentBlock[];
  quiz: QuizQuestion[];
}

export interface Module {
  slug: string;
  index: number;
  title: string;
  tagline: string;
  summary: string;
  accent: Accent;
  lessons: Lesson[];
}
