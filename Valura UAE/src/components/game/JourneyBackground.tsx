"use client";

import { useReducedMotion } from "framer-motion";

interface JourneyBackgroundProps {
  mapWidth: number;
  mapHeight: number;
  scrollLeft: number;
  maxScrollHint: number;
}

/**
 * Dark night cityscape background for the journey map.
 *
 * A  Deep dark sky gradient + moon glow           (no parallax)
 * B  Distant low mountains / dunes                (scroll × 0.15)
 * C  UAE urban skyline silhouette                 (scroll × 0.4)
 * D  Dune foreground                              (scroll × 0.55)
 * E  Ghaf trees + stars + falcon                  (scroll × 0.8)
 * Dot-grid overlay at 3% opacity
 */
export default function JourneyBackground({
  mapWidth,
  mapHeight,
  scrollLeft,
  maxScrollHint,
}: JourneyBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const ratio = maxScrollHint > 0 ? Math.min(scrollLeft / maxScrollHint, 1) : 0;
  const par = reduceMotion ? 0 : ratio;

  const shiftB  = -(par * mapWidth * 0.015);
  const shiftC  = -(par * mapWidth * 0.04);
  const shiftD  = -(par * mapWidth * 0.055);
  const shiftE  = -(par * mapWidth * 0.08);
  const shiftSt = -(par * mapWidth * 0.01);

  const W = mapWidth;
  const H = mapHeight;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

      {/* ── LAYER A: Dark sky gradient ─────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #060D06 0%,
            #081208 22%,
            #0A1A0A 55%,
            #0D2010 80%,
            #122815 100%)`,
        }}
      />
      {/* Moon glow — upper right */}
      <div
        className="absolute"
        style={{
          top: "4%",
          right: "12%",
          width: 320,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 40%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Subtle moon disc */}
      <div
        className="absolute"
        style={{
          top: "6%",
          right: "16%",
          width: 48,
          height: 48,
          background:
            "radial-gradient(ellipse at 40% 35%, rgba(220,252,231,0.7) 0%, rgba(187,247,208,0.4) 50%, transparent 80%)",
          borderRadius: "50%",
        }}
      />

      {/* ── LAYER: Stars (barely visible, subtle) ─────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftSt}px)` }}
      >
        <svg
          width={W + 80}
          height={H * 0.65}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s[0] * W}
              cy={s[1] * H * 0.5}
              r={s[2]}
              fill="#DCFCE7"
              opacity={s[3]}
            />
          ))}
        </svg>
      </div>

      {/* ── LAYER B: Distant mountains ────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftB}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + 120}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <path d={mountainRibbon(W, H)} fill="#0F2410" opacity={0.9} />
        </svg>
      </div>

      {/* ── LAYER C: Urban skyline ────────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftC}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + 200}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          {/* Skyline base */}
          <path d={skylineRibbon(W, H)} fill="#0A1E0A" opacity={1} />
          {/* Window lights scattered across skyline */}
          {WINDOWS.map((win, i) => (
            <rect
              key={i}
              x={win[0] * W}
              y={win[1] * H}
              width={win[2]}
              height={win[3]}
              rx={1}
              fill="#22C55E"
              opacity={win[4]}
            />
          ))}
        </svg>
      </div>

      {/* ── LAYER D: Dune foreground ──────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftD}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + 220}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <path d={duneCurve(W, H)} fill="#0C1A0C" opacity={1} />
        </svg>
      </div>

      {/* ── LAYER E: Ghaf trees + falcon ─────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftE}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + 300}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <GhafTree cx={420}  baseY={H * 0.88} scale={1.0} />
          <GhafTree cx={1820} baseY={H * 0.87} scale={1.1} />
          <GhafTree cx={3420} baseY={H * 0.89} scale={0.9} />
          <GhafTree cx={4820} baseY={H * 0.88} scale={1.05} />
        </svg>

        {/* Falcon drift */}
        {!reduceMotion && (
          <div
            className="absolute"
            style={{ top: H * 0.18, left: 0, width: "100%", animation: "falcon-drift 120s linear infinite" }}
          >
            <svg width="24" height="12" viewBox="0 0 28 14" fill="none" style={{ opacity: 0.4 }}>
              <path
                d="M0 7 C4 4 8 2 14 3 C18 3.5 22 6 28 5 C24 7 20 9 14 8 C8 7 4 8 0 7Z"
                fill="#22C55E"
              />
              <path d="M14 3 L10 0 L13 4Z" fill="#4ADE80" opacity="0.6" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Dot-grid texture ──────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(34,197,94,0.08) 0.6px, transparent 0.6px)",
          backgroundSize: "8px 8px",
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes falcon-drift {
          0%   { transform: translateX(-100px); }
          100% { transform: translateX(calc(${W}px + 100px)); }
        }
      `}</style>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function mountainRibbon(W: number, H: number): string {
  const peaks = [
    [0.04, 0.64], [0.12, 0.60], [0.22, 0.57],
    [0.33, 0.62], [0.44, 0.56], [0.56, 0.59],
    [0.67, 0.54], [0.78, 0.60], [0.88, 0.56], [1.0, 0.60],
  ];
  let d = `M 0 ${H}`;
  d += ` L 0 ${H * 0.68}`;
  let prev = [0, 0.68];
  for (const pt of peaks) {
    const mx = (prev[0]! + pt[0]!) / 2 * W;
    d += ` C ${mx} ${prev[1]! * H} ${mx} ${pt[1]! * H} ${pt[0]! * W} ${pt[1]! * H}`;
    prev = pt as number[];
  }
  d += ` L ${W} ${H} Z`;
  return d;
}

function skylineRibbon(W: number, H: number): string {
  const base = H;
  const floor = H * 0.79;
  const seg: [number, number][] = [
    [0, floor],
    [0.03, H * 0.73], [0.055, H * 0.69], [0.07, H * 0.73],
    [0.09, floor],
    [0.11, H * 0.71], [0.13, H * 0.67], [0.155, H * 0.42], // Burj spire
    [0.16, H * 0.44], [0.175, H * 0.68],
    [0.19, floor],
    [0.23, H * 0.73], [0.26, H * 0.67], [0.285, H * 0.63],
    [0.31, H * 0.69], [0.34, H * 0.74],
    [0.37, floor],
    [0.39, H * 0.71], [0.42, H * 0.65], [0.44, H * 0.61],
    [0.46, H * 0.65], [0.48, H * 0.70],
    [0.51, floor],
    [0.54, H * 0.72], [0.57, H * 0.65], [0.595, H * 0.62], [0.62, H * 0.67], [0.645, H * 0.73],
    [0.68, floor],
    [0.71, H * 0.73], [0.73, H * 0.68], [0.755, H * 0.64], [0.78, H * 0.69],
    [0.81, floor],
    [0.83, H * 0.74], [0.855, H * 0.68], [0.875, H * 0.73],
    [0.91, floor],
    [0.93, H * 0.75], [0.955, H * 0.70], [0.975, H * 0.74],
    [1.0, floor],
  ];
  let d = `M 0 ${base}`;
  for (const [rx, ry] of seg) d += ` L ${rx * W} ${ry}`;
  return d + ` L ${W} ${base} Z`;
}

function duneCurve(W: number, H: number): string {
  const floor = H;
  const base = H * 0.85;
  return (
    `M 0 ${base}` +
    ` C ${W * 0.12} ${H * 0.80} ${W * 0.22} ${H * 0.84} ${W * 0.28} ${H * 0.82}` +
    ` C ${W * 0.36} ${H * 0.79} ${W * 0.44} ${H * 0.85} ${W * 0.55} ${H * 0.83}` +
    ` C ${W * 0.65} ${H * 0.80} ${W * 0.72} ${H * 0.84} ${W * 0.82} ${H * 0.82}` +
    ` C ${W * 0.90} ${H * 0.80} ${W * 0.95} ${H * 0.83} ${W} ${H * 0.82}` +
    ` L ${W} ${floor} L 0 ${floor} Z`
  );
}

function GhafTree({ cx, baseY, scale = 1 }: { cx: number; baseY: number; scale?: number }) {
  const h = 70 * scale;
  const tx = cx;
  const ty = baseY - h;
  return (
    <g opacity={0.85}>
      <rect x={tx - 3 * scale} y={ty + h * 0.45} width={6 * scale} height={h * 0.55} rx={3 * scale} fill="#0E2010" />
      <ellipse cx={tx} cy={ty + h * 0.30} rx={28 * scale} ry={20 * scale} fill="#112614" />
      <ellipse cx={tx - 14 * scale} cy={ty + h * 0.42} rx={18 * scale} ry={13 * scale} fill="#0E2010" />
      <ellipse cx={tx + 16 * scale} cy={ty + h * 0.40} rx={16 * scale} ry={12 * scale} fill="#152B17" />
    </g>
  );
}

// Scattered star positions [x_ratio, y_ratio, radius, opacity]
const STARS: [number, number, number, number][] = [
  [0.05, 0.15, 0.8, 0.6], [0.12, 0.32, 0.6, 0.5], [0.18, 0.08, 1.0, 0.7],
  [0.24, 0.22, 0.7, 0.5], [0.30, 0.45, 0.5, 0.4], [0.36, 0.12, 0.9, 0.65],
  [0.42, 0.28, 0.6, 0.5], [0.48, 0.06, 1.1, 0.7], [0.55, 0.38, 0.5, 0.4],
  [0.61, 0.18, 0.8, 0.6], [0.67, 0.42, 0.6, 0.45],[0.73, 0.10, 1.0, 0.65],
  [0.79, 0.26, 0.7, 0.5], [0.85, 0.35, 0.5, 0.4], [0.91, 0.14, 0.9, 0.6],
  [0.97, 0.24, 0.6, 0.5], [0.08, 0.40, 0.5, 0.35],[0.15, 0.55, 0.4, 0.3],
  [0.39, 0.50, 0.5, 0.35],[0.53, 0.55, 0.4, 0.3], [0.70, 0.58, 0.5, 0.3],
];

// Scattered building window lights [x_ratio, y_ratio, w, h, opacity]
const WINDOWS: [number, number, number, number, number][] = [
  [0.135, 0.50, 3, 2, 0.5], [0.137, 0.54, 3, 2, 0.4], [0.141, 0.51, 3, 2, 0.45],
  [0.255, 0.55, 2, 2, 0.4], [0.258, 0.59, 2, 2, 0.35],[0.270, 0.57, 2, 2, 0.4],
  [0.420, 0.54, 3, 2, 0.4], [0.423, 0.58, 3, 2, 0.35],
  [0.572, 0.55, 2, 2, 0.4], [0.576, 0.52, 2, 2, 0.45],[0.580, 0.57, 2, 2, 0.35],
  [0.720, 0.56, 3, 2, 0.4], [0.724, 0.60, 3, 2, 0.35],
  [0.845, 0.54, 2, 2, 0.4], [0.849, 0.57, 2, 2, 0.35],
  [0.935, 0.53, 3, 2, 0.4], [0.938, 0.57, 3, 2, 0.35],
];
