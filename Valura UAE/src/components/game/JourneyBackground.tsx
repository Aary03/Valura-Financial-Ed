"use client";

import { useReducedMotion } from "framer-motion";

interface JourneyBackgroundProps {
  mapWidth: number;
  mapHeight: number;
  scrollLeft: number;
  maxScrollHint: number;
}

/** Layered UAE-inspired sky · skyline ribbon · dunes · ambient silhouettes (+ dot grid texture). */
export default function JourneyBackground({
  mapWidth,
  mapHeight,
  scrollLeft,
  maxScrollHint,
}: JourneyBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const ratio = Math.min(
    maxScrollHint > 0 ? scrollLeft / maxScrollHint : 0,
    1,
  );
  const px = reduceMotion ? 0 : ratio;
  const backX = -(px * 24);
  const midX  = -(px * 14);
  const lowX  = -(px * 8);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Layer 1 — sky + clouds */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateX(${backX}px)`,
          background: "linear-gradient(180deg, #FFFFFC 0%, #E8F5EC 100%)",
        }}
      >
        <svg
          className={reduceMotion ? "" : "journey-cloud-drift"}
          preserveAspectRatio="none"
          width={mapWidth * 2}
          height={mapHeight}
        >
          <defs>
            <filter id="soft">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <Cloud x={120} y={80} sx={320} opacity={0.55} blur />
          <Cloud x={900} y={120} sx={280} opacity={0.5} blur />
          <Cloud x={2600} y={96} sx={360} opacity={0.48} blur />
          <Cloud x={3700} y={140} sx={260} opacity={0.5} blur />
          <Cloud x={4680} y={74} sx={300} opacity={0.46} blur />
        </svg>
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          opacity: 0.045,
          backgroundImage:
            "radial-gradient(#00111B 0.85px, transparent 0.85px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Layer 2 — dune ribbon + skyline */}
      <div
        className="absolute inset-x-0 bottom-0 flex will-change-transform"
        style={{
          transform: `translateX(${midX}px)`,
          height: `${mapHeight * 0.52}px`,
          alignItems: "flex-end",
        }}
      >
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          width={mapWidth}
          height={mapHeight}
          preserveAspectRatio="none"
        >
          {/* Dune line */}
          <path
            d={`M 0 ${mapHeight * 0.78} Q ${mapWidth * 0.25} ${mapHeight * 0.73} ${mapWidth * 0.5} ${mapHeight * 0.76} T ${mapWidth} ${mapHeight * 0.74} V ${mapHeight} H 0 Z`}
            fill="#E5DCC8"
          />
          {/* Synthetic skyline — muted sage */}
          <g fill="#DCE6E1" opacity={0.88}>
            <polygon
              points={`${mapWidth * 0.08},${mapHeight} ${mapWidth * 0.085},${mapHeight * 0.42} ${mapWidth * 0.092},${mapHeight * 0.38} ${mapWidth * 0.098},${mapHeight * 0.44} ${mapWidth * 0.105},${mapHeight}`}
            />
            <rect
              x={mapWidth * 0.168}
              y={mapHeight * 0.55}
              width={mapWidth * 0.03}
              height={mapHeight * 0.45}
              rx={6}
            />
            <polygon
              points={`${mapWidth * 0.238},${mapHeight} ${mapWidth * 0.242},${mapHeight * 0.12} ${mapWidth * 0.248},${mapHeight * 0.2} ${mapWidth * 0.252},${mapHeight * 0.11} ${mapWidth * 0.258},${mapHeight * 0.18} ${mapWidth * 0.262},${mapHeight}`}
            />
            <rect
              x={mapWidth * 0.342}
              y={mapHeight * 0.48}
              width={mapWidth * 0.05}
              height={mapHeight * 0.52}
              rx={10}
            />
            <polygon
              points={`${mapWidth * 0.412},${mapHeight} ${mapWidth * 0.42},${mapHeight * 0.5} ${mapWidth * 0.428},${mapHeight * 0.34} ${mapWidth * 0.436},${mapHeight * 0.52} ${mapWidth * 0.444},${mapHeight}`}
            />
            <rect
              x={mapWidth * 0.52}
              y={mapHeight * 0.58}
              width={mapWidth * 0.044}
              height={mapHeight * 0.42}
              rx={8}
              transform={`skewX(-6) skewY(4) rotate(-2 ${mapWidth * 0.544} ${mapHeight * 0.68})`}
            />
            <rect x={mapWidth * 0.62} y={mapHeight * 0.52} width={mapWidth * 0.04} height={mapHeight * 0.48} rx={12} />
            <rect x={mapWidth * 0.7} y={mapHeight * 0.62} width={mapWidth * 0.05} height={mapHeight * 0.38} rx={4} />
            <rect x={mapWidth * 0.782} y={mapHeight * 0.5} width={mapWidth * 0.055} height={mapHeight * 0.5} rx={14} />
            <rect x={mapWidth * 0.892} y={mapHeight * 0.54} width={mapWidth * 0.04} height={mapHeight * 0.46} rx={11} />
          </g>
        </svg>
      </div>

      {/* Layer 3 — ghafs, falcon, sun */}
      <div
        className="absolute inset-0 will-change-transform motion-reduce:transform-none"
        style={{
          transform: `translateX(${lowX}px)`,
          opacity: 0.92,
        }}
      >
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          width={mapWidth}
          height={mapHeight}
          className="absolute bottom-0 start-0 block"
          preserveAspectRatio="none"
        >
          <Ghaf x={mapWidth * 0.12} floor={mapHeight * 0.84} />
          <Ghaf x={mapWidth * 0.485} floor={mapHeight * 0.86} scaled={1.06} />
          <Ghaf x={mapWidth * 0.86} floor={mapHeight * 0.842} scaled={0.88} />

          <circle cx={mapWidth * 0.94} cy={mapHeight * 0.18} r={38} fill="#FFE9C9" opacity={0.32} />

          <FalconGlide reduced={reduceMotion} mapWidth={mapWidth} mapHeight={mapHeight} />
        </svg>
      </div>
    </div>
  );
}

function Cloud({
  x,
  y,
  sx,
  opacity,
  blur,
}: {
  x: number;
  y: number;
  sx: number;
  opacity: number;
  blur?: boolean;
}) {
  const cloudPath =
    `M ${x + 46} ${y}
     C ${x + sx * 0.12} ${y - 32} ${x + sx * 0.54} ${y - 40} ${x + sx * 0.92} ${y}
     C ${x + sx + 34} ${y + 52} ${x + sx * 0.74} ${y + 68} ${x + sx * 0.42} ${y + 56}
     C ${x + sx * 0.06} ${y + 58} ${x - 28} ${y + 28} ${x + 46} ${y}`;
  return (
    <path d={cloudPath} fill="#FFFFFF" opacity={opacity} filter={blur ? "url(#soft)" : undefined} />
  );
}

function Ghaf({
  x,
  floor,
  scaled = 1,
}: {
  x: number;
  floor: number;
  scaled?: number;
}) {
  const t = floor - 92 * scaled;
  return (
    <g transform={`translate(${x},${t}) scale(${scaled})`} opacity={0.55}>
      <rect x="-3" y="38" width="6" height="42" rx="2" fill="#BCA892" />
      <ellipse cx="-12" cy="22" rx="22" ry="15" fill="#8FA68B" opacity={0.8} />
      <ellipse cx="4" cy="12" rx="26" ry="17" fill="#9AAF95" opacity={0.85} />
      <ellipse cx="18" cy="24" rx="20" ry="13" fill="#849B80" opacity={0.78} />
    </g>
  );
}

function FalconGlide({
  mapWidth,
  mapHeight,
  reduced,
}: {
  mapWidth: number;
  mapHeight: number;
  reduced?: boolean | null;
}) {
  const y = mapHeight * 0.2;
  return (
    <g opacity={0.55}>
      <g
        className={reduced ? "" : "journey-falcon-glide"}
        style={{ transformOrigin: "center" }}
      >
        <path
          d="M0 -6 L38 0 L0 12 Z"
          fill="#4A5650"
          transform={`translate(${mapWidth * 0.15}, ${y}) rotate(-12)`}
        />
        <path
          d="M0 0 Q16 4 32 0"
          fill="none"
          stroke="#5C6A62"
          strokeWidth="2"
          transform={`translate(${mapWidth * 0.15}, ${y - 6})`}
        />
      </g>
    </g>
  );
}
