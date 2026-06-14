/**
 * Valura Atlas wordmark.
 *
 * Renders "Valura" in the display face with a tighter "Atlas" lockup.
 * The dot/glyph before the name reads as a small globe/compass mark.
 *
 * Variants:
 *   full    — "Valura Atlas"   (default, landing, footer)
 *   mini    — "Atlas"          (tight header spaces)
 *
 * Sizes: sm 15px · md 18px · lg 24px · xl 34px
 */

interface WordmarkProps {
  variant?: "full" | "mini";
  size?: "sm" | "md" | "lg" | "xl";
  /** Override the wordmark color. Defaults to ink. */
  color?: string;
  /** Accent color for the "Atlas" word + mark. Defaults to brand green. */
  accent?: string;
  className?: string;
  /** Hide the leading globe mark. */
  hideMark?: boolean;
}

const SIZE_MAP = {
  sm: { fontSize: 15, gap: 5, letterSpacing: "-0.01em" },
  md: { fontSize: 18, gap: 6, letterSpacing: "-0.015em" },
  lg: { fontSize: 24, gap: 8, letterSpacing: "-0.02em" },
  xl: { fontSize: 34, gap: 10, letterSpacing: "-0.025em" },
} as const;

export default function Wordmark({
  variant = "full",
  size = "md",
  color = "var(--fg)",
  accent = "var(--accent)",
  className,
  hideMark = false,
}: WordmarkProps) {
  const { fontSize, gap, letterSpacing } = SIZE_MAP[size];

  const base: React.CSSProperties = {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 700,
    fontSize,
    letterSpacing,
    lineHeight: 1,
  };

  const mark = (
    <svg
      width={fontSize * 1.05}
      height={fontSize * 1.05}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2" />
      <path
        d="M2.5 12h19M12 2.5c2.6 2.6 4 5.9 4 9.5s-1.4 6.9-4 9.5c-2.6-2.6-4-5.9-4-9.5s1.4-6.9 4-9.5Z"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap, whiteSpace: "nowrap" }}
    >
      {!hideMark && mark}
      {variant === "full" && <span style={{ ...base, color }}>Valura</span>}
      <span style={{ ...base, color: accent }}>Atlas</span>
    </span>
  );
}
