/**
 * Aldar × Valura Atlas wordmark.
 *
 * Variants:
 *   full    — "Aldar × Valura Atlas"  (default, landing, login, footer)
 *   mini    — "Aldar × Atlas"         (HUD, tight header spaces)
 *   stacked — two-line layout         (app icon, onboarding)
 *
 * Sizes:
 *   sm  14px   md  18px   lg  24px   xl  32px
 */

interface WordmarkProps {
  variant?: "full" | "mini" | "stacked";
  size?: "sm" | "md" | "lg" | "xl";
  /** Override the wordmark color. Defaults to #00111B navy. */
  color?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: { fontSize: 14, xPad: 6, letterSpacing: "-0.01em" },
  md: { fontSize: 18, xPad: 7, letterSpacing: "-0.015em" },
  lg: { fontSize: 24, xPad: 8, letterSpacing: "-0.02em" },
  xl: { fontSize: 32, xPad: 10, letterSpacing: "-0.025em" },
} as const;

export default function Wordmark({
  variant = "full",
  size = "md",
  color = "#00111B",
  className,
}: WordmarkProps) {
  const { fontSize, xPad, letterSpacing } = SIZE_MAP[size];

  const baseStyle: React.CSSProperties = {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 600,
    fontSize,
    letterSpacing,
    lineHeight: 1,
    color,
  };

  const crossStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize,
    opacity: 0.55,
    paddingLeft: xPad,
    paddingRight: xPad,
    letterSpacing: 0,
    color,
  };

  if (variant === "stacked") {
    return (
      <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={baseStyle}>Aldar</span>
        <span style={{ ...baseStyle, fontSize: fontSize * 0.72 }}>
          <span style={{ ...crossStyle, paddingLeft: 0, paddingRight: xPad * 0.7, fontSize: fontSize * 0.72 }}>×</span>
          Valura Atlas
        </span>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}
      >
        <span style={baseStyle}>Aldar</span>
        <span style={crossStyle}>×</span>
        <span style={baseStyle}>Atlas</span>
      </span>
    );
  }

  // full
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}
    >
      <span style={baseStyle}>Aldar</span>
      <span style={crossStyle}>×</span>
      <span style={baseStyle}>Valura Atlas</span>
    </span>
  );
}
