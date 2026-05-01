"use client";

import { useReducedMotion } from "framer-motion";

interface JourneyBackgroundProps {
  mapWidth: number;
  mapHeight: number;
  scrollLeft: number;
  maxScrollHint: number;
}

/**
 * Five-layer UAE landscape background for the journey map.
 *
 * A  Sky gradient + warm sun glow              (no parallax)
 * B  Distant rolling mountain ribbon           (scroll × 0.15)
 * C  Continuous urban skyline silhouette       (scroll × 0.4)
 * D  Dune line                                 (scroll × 0.5)
 * E  Ghaf trees · clouds · falcon silhouette   (scroll × 0.8 / 0.2)
 *
 * Dot-grid texture overlay (3 % opacity) applied on top of all layers.
 */
export default function JourneyBackground({
  mapWidth,
  mapHeight,
  scrollLeft,
  maxScrollHint,
}: JourneyBackgroundProps) {
  const reduceMotion = useReducedMotion();

  // scroll ratio 0-1
  const ratio = maxScrollHint > 0 ? Math.min(scrollLeft / maxScrollHint, 1) : 0;
  const par = reduceMotion ? 0 : ratio;

  // per-layer horizontal shift (negative = moves left as user scrolls right → parallax)
  const shiftB = -(par * mapWidth * 0.015);   // slowest — mountains
  const shiftC = -(par * mapWidth * 0.04);    // skyline
  const shiftD = -(par * mapWidth * 0.05);    // dune
  const shiftE = -(par * mapWidth * 0.08);    // trees
  const shiftCl = -(par * mapWidth * 0.02);   // clouds (opposite-ish)

  const W = mapWidth;
  const H = mapHeight;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

      {/* ── LAYER A: Sky gradient + sun glow (static) ─────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #FFFFFC 0%,
            #F5FAF6 35%,
            #E9F4EC 75%,
            #DCEEDF 100%)`,
        }}
      />
      {/* warm sun glow upper-right */}
      <div
        className="absolute"
        style={{
          top: "5%",
          right: "8%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(245,220,160,0.28) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ── LAYER B: Distant mountains (slowest parallax) ─────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftB}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + Math.abs(shiftB) + 80}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <path
            d={mountainRibbon(W, H)}
            fill="#C8DCD0"
            opacity={0.6}
          />
        </svg>
      </div>

      {/* ── LAYER C: Urban skyline ribbon (mid parallax) ───────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftC}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + Math.abs(shiftC) + 160}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <path
            d={skylineRibbon(W, H)}
            fill="#B8CCC2"
            opacity={0.7}
          />
        </svg>
      </div>

      {/* ── LAYER D: Dune curve (mid parallax) ────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftD}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + Math.abs(shiftD) + 160}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <path
            d={duneCurve(W, H)}
            fill="#E8DCC2"
            opacity={0.9}
          />
        </svg>
      </div>

      {/* ── LAYER E: Clouds (gentle parallax) ─────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftCl}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + Math.abs(shiftCl) + 100}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="jb-blur">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          {/* 3 clouds at specified x positions */}
          <CloudShape cx={800}  cy={120} rx={200} ry={55} opacity={0.7} />
          <CloudShape cx={2600} cy={180} rx={230} ry={60} opacity={0.65} />
          <CloudShape cx={4200} cy={100} rx={180} ry={50} opacity={0.7} />
        </svg>
      </div>

      {/* ── LAYER E: Ghaf trees + falcon (front parallax) ─────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${shiftE}px)` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W + Math.abs(shiftE) + 200}
          height={H}
          className="absolute left-0 top-0"
          preserveAspectRatio="none"
        >
          {/* Ghaf trees at x: 400, 1800, 3400, 4800 */}
          <GhafTree cx={400}  baseY={H * 0.87} scale={1.0} />
          <GhafTree cx={1800} baseY={H * 0.86} scale={1.15} />
          <GhafTree cx={3400} baseY={H * 0.88} scale={0.9} />
          <GhafTree cx={4800} baseY={H * 0.87} scale={1.05} />
        </svg>

        {/* Falcon: pure CSS animation so it loops independently */}
        {!reduceMotion && (
          <div
            className="absolute"
            style={{
              top: H * 0.2,
              left: 0,
              width: "100%",
              animation: "falcon-drift 120s linear infinite",
            }}
          >
            <svg
              width="28"
              height="14"
              viewBox="0 0 28 14"
              fill="none"
              style={{ opacity: 0.3 }}
            >
              {/* Simple falcon silhouette profile */}
              <path
                d="M0 7 C4 4 8 2 14 3 C18 3.5 22 6 28 5 C24 7 20 9 14 8 C8 7 4 8 0 7Z"
                fill="#00111B"
              />
              <path d="M14 3 L10 0 L13 4Z" fill="#00111B" opacity="0.6" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Dot-grid texture overlay (3% opacity) ──────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(#00111B 0.75px, transparent 0.75px)",
          backgroundSize: "8px 8px",
          opacity: 0.03,
          mixBlendMode: "multiply",
        }}
      />

      {/* CSS keyframe for falcon drift */}
      <style>{`
        @keyframes falcon-drift {
          0%   { transform: translateX(-100px); }
          100% { transform: translateX(calc(${W}px + 100px)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .falcon-drift { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ── SVG generators ─────────────────────────────────────────────────────────────

/** Soft rolling mountain ribbon — 9 gentle peaks across the full width */
function mountainRibbon(W: number, H: number): string {
  const y0 = H * 0.82;   // baseline (bottom of ribbon)
  const peaks = [
    { x: W * 0.05,  y: H * 0.62 },
    { x: W * 0.15,  y: H * 0.58 },
    { x: W * 0.27,  y: H * 0.55 },
    { x: W * 0.38,  y: H * 0.60 },
    { x: W * 0.50,  y: H * 0.54 },
    { x: W * 0.63,  y: H * 0.57 },
    { x: W * 0.74,  y: H * 0.52 },
    { x: W * 0.85,  y: H * 0.59 },
    { x: W * 0.95,  y: H * 0.56 },
    { x: W,         y: H * 0.61 },
  ];

  let d = `M 0 ${y0}`;
  let prev = { x: 0, y: y0 };
  for (const pt of peaks) {
    const mx = (prev.x + pt.x) / 2;
    d += ` C ${mx} ${prev.y} ${mx} ${pt.y} ${pt.x} ${pt.y}`;
    prev = pt;
  }
  d += ` L ${W} ${H} L 0 ${H} Z`;
  return d;
}

/** Continuous urban skyline — one merged path, subtle UAE landmark nods */
function skylineRibbon(W: number, H: number): string {
  const base = H;       // always close at bottom
  const floor = H * 0.78;

  // Each segment: [x, roofY] — x in 0-1 ratio of W
  // Landmarks: ~0.16 = Burj-Khalifa-like spire, ~0.44 = Capital-Gate-like lean, ~0.68 = Etihad Towers
  const seg: [number, number][] = [
    [0,    floor],
    [0.04, H * 0.72], [0.06, H * 0.68], [0.08, H * 0.72],
    [0.10, floor],
    [0.12, H * 0.74], [0.14, H * 0.70], [0.16, H * 0.41], // spire
    [0.165, H * 0.43],[0.18, H * 0.70],
    [0.20, H * 0.74], [0.22, floor],
    [0.26, H * 0.72], [0.28, H * 0.66], [0.30, H * 0.63], [0.32, H * 0.68],
    [0.34, H * 0.72],
    [0.38, floor],
    [0.40, H * 0.73], [0.42, H * 0.68], [0.44, H * 0.60], // lean (Capital Gate nod - slight angle handled with path)
    [0.46, H * 0.67], [0.48, H * 0.72],
    [0.52, floor],
    [0.55, H * 0.74], [0.57, H * 0.67], [0.60, H * 0.63], [0.63, H * 0.67], [0.66, H * 0.72], // Etihad nod
    [0.70, floor],
    [0.72, H * 0.74], [0.74, H * 0.70], [0.76, H * 0.65], [0.78, H * 0.70],
    [0.80, floor],
    [0.83, H * 0.73], [0.85, H * 0.68], [0.87, H * 0.74],
    [0.90, floor],
    [0.92, H * 0.76], [0.94, H * 0.71], [0.96, H * 0.75],
    [1.0,  floor],
  ];

  let d = `M 0 ${base}`;
  for (const [rx, ry] of seg) {
    d += ` L ${rx * W} ${ry}`;
  }
  d += ` L ${W} ${base} Z`;
  return d;
}

/** Gentle dune ribbon — 4 crest bezier curve */
function duneCurve(W: number, H: number): string {
  const floor = H;
  const base  = H * 0.84;
  return (
    `M 0 ${base}` +
    ` C ${W * 0.12} ${H * 0.78} ${W * 0.22} ${H * 0.82} ${W * 0.28} ${H * 0.80}` +
    ` C ${W * 0.36} ${H * 0.77} ${W * 0.44} ${H * 0.84} ${W * 0.55} ${H * 0.81}` +
    ` C ${W * 0.65} ${H * 0.78} ${W * 0.72} ${H * 0.83} ${W * 0.82} ${H * 0.80}` +
    ` C ${W * 0.90} ${H * 0.78} ${W * 0.95} ${H * 0.82} ${W} ${H * 0.81}` +
    ` L ${W} ${floor} L 0 ${floor} Z`
  );
}

/** Bezier cloud puff */
function CloudShape({
  cx, cy, rx, ry, opacity,
}: {
  cx: number; cy: number; rx: number; ry: number; opacity: number;
}) {
  // Approximate an organic cloud with a few ellipses merged
  return (
    <g opacity={opacity}>
      <ellipse cx={cx}        cy={cy}        rx={rx}        ry={ry}        fill="#FFFFFF" filter="url(#jb-blur)" />
      <ellipse cx={cx - rx * 0.38} cy={cy + ry * 0.1}  rx={rx * 0.58}  ry={ry * 0.82}  fill="#FFFFFF" filter="url(#jb-blur)" />
      <ellipse cx={cx + rx * 0.4}  cy={cy + ry * 0.12} rx={rx * 0.52}  ry={ry * 0.75}  fill="#FFFFFF" filter="url(#jb-blur)" />
    </g>
  );
}

/** Stylised ghaf tree — round canopy + slim trunk */
function GhafTree({
  cx, baseY, scale = 1,
}: {
  cx: number; baseY: number; scale?: number;
}) {
  const h  = 70 * scale;
  const tx = cx;
  const ty = baseY - h;

  return (
    <g opacity={0.8}>
      {/* trunk */}
      <rect
        x={tx - 3 * scale}
        y={ty + h * 0.45}
        width={6 * scale}
        height={h * 0.55}
        rx={3 * scale}
        fill="#9DAA9F"
        opacity={0.7}
      />
      {/* main canopy */}
      <ellipse
        cx={tx}
        cy={ty + h * 0.32}
        rx={28 * scale}
        ry={22 * scale}
        fill="#9DAA9F"
        opacity={0.85}
      />
      {/* secondary canopy blobs for organic feel */}
      <ellipse
        cx={tx - 14 * scale}
        cy={ty + h * 0.44}
        rx={18 * scale}
        ry={14 * scale}
        fill="#8B9A8D"
        opacity={0.75}
      />
      <ellipse
        cx={tx + 16 * scale}
        cy={ty + h * 0.42}
        rx={16 * scale}
        ry={13 * scale}
        fill="#A3B09F"
        opacity={0.72}
      />
    </g>
  );
}
