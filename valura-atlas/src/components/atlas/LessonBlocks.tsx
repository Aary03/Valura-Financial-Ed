import { Info, Key, AlertTriangle, Lightbulb } from "lucide-react";
import type { ContentBlock, Accent } from "@/lib/atlas/types";
import { Diagram } from "./Diagrams";

const ACCENT_HEX: Record<Accent, string> = {
  green: "#0E9F6E",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
};

/** Render **bold** and *italic* inside a plain string. */
function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) nodes.push(<strong key={i}>{m[1]}</strong>);
    else nodes.push(<em key={i}>{m[2]}</em>);
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const CALLOUT_META = {
  note: { color: "#0C8CE0", soft: "#E4F1FB", Icon: Info, label: "Note" },
  key: { color: "#0E9F6E", soft: "#E9F6EF", Icon: Key, label: "Key idea" },
  caution: { color: "#D98300", soft: "#FBF0DB", Icon: AlertTriangle, label: "Heads up" },
  example: { color: "#6D4AE0", soft: "#EEE9FC", Icon: Lightbulb, label: "Example" },
} as const;

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2
          className="mt-12 mb-1 font-heading"
          style={{ fontSize: 24, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return <p className="prose-atlas my-5 text-pretty">{inline(block.text)}</p>;

    case "callout": {
      const { color, soft, Icon, label } = CALLOUT_META[block.variant];
      return (
        <div className="my-7 rounded-2xl p-5" style={{ background: soft, border: `1px solid ${color}33` }}>
          <div className="mb-2 flex items-center gap-2">
            <Icon size={16} color={color} />
            <span
              className="font-heading"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color }}
            >
              {block.title ?? label}
            </span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, lineHeight: 1.65, color: "var(--fg)" }}>
            {inline(block.text)}
          </p>
        </div>
      );
    }

    case "stats":
      return (
        <div className="my-8 grid gap-3 sm:grid-cols-3">
          {block.items.map((s, i) => {
            const color = s.accent ? ACCENT_HEX[s.accent] : "#0E9F6E";
            return (
              <div key={i} className="rounded-2xl p-5" style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                <div className="font-heading" style={{ fontSize: 27, fontWeight: 800, color, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div style={{ marginTop: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--fg-3)", lineHeight: 1.45 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "diagram":
      return (
        <figure className="my-9">
          <div className="card-dark p-5 sm:p-7">
            <Diagram id={block.id} />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)" }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "compare":
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse" style={{ fontFamily: "'Inter', sans-serif" }}>
            <thead>
              <tr>
                {block.columns.map((c, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-start"
                    style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", color: "var(--fg-3)", borderBottom: "1px solid var(--line-2)" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, ri) => (
                <tr key={ri}>
                  <td className="px-4 py-3 align-top" style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)", borderBottom: "1px solid var(--line)" }}>
                    {r.label}
                  </td>
                  {r.cells.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 align-top" style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.5, borderBottom: "1px solid var(--line)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && <p className="mt-3" style={{ fontSize: 12.5, color: "var(--fg-3)" }}>{block.caption}</p>}
        </div>
      );

    case "steps":
      return (
        <ol className="my-8 space-y-1">
          {block.items.map((s, i) => (
            <li key={i} className="flex gap-4 pb-5">
              <div className="flex flex-col items-center">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full font-heading"
                  style={{ background: "var(--accent-soft)", color: "var(--accent-strong)", fontSize: 14, fontWeight: 700, border: "1px solid rgba(14,159,110,0.3)" }}
                >
                  {i + 1}
                </span>
                {i < block.items.length - 1 && <span style={{ width: 2, flex: 1, marginTop: 4, background: "rgba(14,159,110,0.22)" }} />}
              </div>
              <div style={{ paddingTop: 3 }}>
                <div className="font-heading" style={{ fontSize: 15.5, fontWeight: 700, color: "var(--fg)" }}>
                  {s.title}
                </div>
                <div style={{ marginTop: 3, fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: "var(--fg-2)", lineHeight: 1.55 }}>
                  {inline(s.text)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className="my-6 space-y-3" style={{ paddingInlineStart: 4 }}>
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span style={{ marginTop: 10, width: 6, height: 6, borderRadius: 9, background: "var(--accent)", flexShrink: 0 }} />
              <span className="prose-atlas" style={{ fontSize: 16.5 }}>
                {inline(it)}
              </span>
            </li>
          ))}
        </ListTag>
      );
    }

    case "quote":
      return (
        <blockquote className="my-8 pl-5" style={{ borderInlineStart: "3px solid var(--accent)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: "var(--fg)", fontWeight: 500 }}>{inline(block.text)}</p>
          {block.cite && <cite className="mt-2 block" style={{ fontSize: 13, color: "var(--fg-3)", fontStyle: "normal" }}>— {block.cite}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
}

export default function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
