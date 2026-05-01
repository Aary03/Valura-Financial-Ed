/**
 * Sanad — stylised geometric falcon, flat design.
 * Rendered at origin (0,0); parent <g> controls position and scale.
 * Facing left (towards the map / into the scene).
 * In RTL mode the parent container is scaleX(-1) so Sanad auto-flips.
 *
 * Placeholder — Rive state machine integration comes later.
 */
export default function SanadFalcon() {
  return (
    <g aria-label="Sanad the falcon">
      {/* ── Left wing (swept back, large) ──────────────────────────────── */}
      <path
        d="M -10,0 C -35,-22 -75,-18 -88,2 C -72,-2 -45,4 -10,12 Z"
        fill="#00111B"
      />
      {/* Wing secondary feathers */}
      <path
        d="M -10,0 C -30,-10 -60,-8 -70,6 L -10,12 Z"
        fill="#001A2C"
        opacity="0.7"
      />

      {/* ── Right wing (folded, shorter) ───────────────────────────────── */}
      <path
        d="M -5,2 C 15,-16 42,-12 48,4 C 36,0 18,6 -5,12 Z"
        fill="#00111B"
      />

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <ellipse cx="8" cy="6" rx="20" ry="9" fill="#00111B" />

      {/* ── Tail feathers ──────────────────────────────────────────────── */}
      <path
        d="M -12,10 C -22,18 -30,26 -18,28 C -12,22 -6,16 -5,12 Z"
        fill="#001A2C"
      />
      <path
        d="M -8,12 C -14,24 -16,34 -6,32 C -2,24 -2,18 -5,12 Z"
        fill="#00111B"
      />

      {/* ── Head ───────────────────────────────────────────────────────── */}
      <circle cx="26" cy="0" r="10" fill="#00111B" />

      {/* ── Falcon hood teardrop (dark marking) ────────────────────────── */}
      <path
        d="M 27,-5 Q 33,2 27,8 Q 21,2 27,-5"
        fill="#001A2C"
        opacity="0.8"
      />

      {/* ── Eye ────────────────────────────────────────────────────────── */}
      <circle cx="29" cy="-1" r="3.5" fill="#D4A95A" />
      <circle cx="29" cy="-1" r="1.8" fill="#00111B" />
      {/* Eye glint */}
      <circle cx="30" cy="-2" r="0.8" fill="#FFFFFC" opacity="0.9" />

      {/* ── Beak (hooked, gold) ────────────────────────────────────────── */}
      <path
        d="M 36,-1 Q 43,4 36,7 L 33,3 Z"
        fill="#D4A95A"
      />
      {/* Beak hook */}
      <path
        d="M 36,6 Q 40,8 37,10 L 33,7 Z"
        fill="#A07C30"
      />

      {/* ── Talons (subtle, below body) ────────────────────────────────── */}
      <path d="M 5,14 L 2,22 M 10,15 L 10,23 M 15,14 L 18,22" stroke="#001A2C" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}
