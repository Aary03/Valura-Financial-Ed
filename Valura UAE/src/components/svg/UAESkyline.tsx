/**
 * UAE Skyline — geometric flat silhouettes.
 * Includes Burj Khalifa taper, Etihad Towers trio, and mid-rise clusters.
 * All shapes are navy/deep teal silhouettes against the sunrise sky.
 * Fits within a 1600×520 viewBox; buildings span y: 140–400.
 */
export default function UAESkyline() {
  return (
    <g aria-label="UAE skyline silhouette">
      {/* ── Burj Khalifa (x≈370) ───────────────────────────────────────── */}
      {/* Spire */}
      <line x1="373" y1="110" x2="373" y2="155" stroke="#001A2C" strokeWidth="3" strokeLinecap="round" />
      {/* Upper tier */}
      <polygon points="366,155 380,155 377,220 369,220" fill="#001A2C" />
      {/* Middle tier */}
      <polygon points="363,220 383,220 380,290 366,290" fill="#001A2C" />
      {/* Base */}
      <polygon points="358,290 388,290 385,380 361,380" fill="#001A2C" />
      {/* Buttresses */}
      <polygon points="345,340 363,340 361,380 345,380" fill="#001529" />
      <polygon points="383,340 399,340 399,380 385,380" fill="#001529" />

      {/* ── Mid-rise cluster left (x≈180–280) ──────────────────────────── */}
      <rect x="185" y="260" width="22" height="140" rx="2" fill="#001A2C" opacity="0.7" />
      <rect x="213" y="240" width="18" height="160" rx="2" fill="#001A2C" opacity="0.65" />
      <rect x="236" y="270" width="24" height="130" rx="2" fill="#001A2C" opacity="0.6" />
      <rect x="265" y="250" width="16" height="150" rx="2" fill="#001A2C" opacity="0.65" />

      {/* ── Cluster between Burj and Etihad (x≈450–590) ────────────────── */}
      <rect x="455" y="295" width="20" height="105" rx="2" fill="#001A2C" opacity="0.55" />
      <rect x="481" y="275" width="25" height="125" rx="2" fill="#001A2C" opacity="0.6" />
      <rect x="512" y="310" width="18" height="90"  rx="2" fill="#001A2C" opacity="0.5" />
      <rect x="535" y="260" width="22" height="140" rx="2" fill="#001A2C" opacity="0.6" />
      <rect x="563" y="285" width="20" height="115" rx="2" fill="#001A2C" opacity="0.55" />

      {/* ── Etihad Towers trio (x≈700–790) ─────────────────────────────── */}
      {/* Left tower */}
      <path d="M 700,230 C 704,228 710,228 714,230 L 717,380 L 697,380 Z" fill="#001A2C" opacity="0.7" />
      {/* Elliptical cap */}
      <ellipse cx="707" cy="230" rx="7" ry="5" fill="#001529" opacity="0.8" />
      {/* Center tower (tallest) */}
      <path d="M 728,200 C 733,198 740,198 745,200 L 748,380 L 725,380 Z" fill="#001A2C" opacity="0.8" />
      <ellipse cx="736" cy="200" rx="8" ry="6" fill="#001529" opacity="0.9" />
      {/* Right tower */}
      <path d="M 757,215 C 762,213 768,213 773,215 L 776,380 L 754,380 Z" fill="#001A2C" opacity="0.7" />
      <ellipse cx="765" cy="215" rx="7" ry="5" fill="#001529" opacity="0.8" />

      {/* ── Right cluster (x≈900–1100) ──────────────────────────────────── */}
      <rect x="900" y="270" width="20" height="130" rx="2" fill="#001A2C" opacity="0.5" />
      <rect x="926" y="250" width="26" height="150" rx="2" fill="#001A2C" opacity="0.55" />
      <rect x="958" y="285" width="18" height="115" rx="2" fill="#001A2C" opacity="0.5" />
      <rect x="982" y="240" width="22" height="160" rx="2" fill="#001A2C" opacity="0.6" />
      <rect x="1010" y="265" width="20" height="135" rx="2" fill="#001A2C" opacity="0.5" />
      <rect x="1036" y="295" width="18" height="105" rx="2" fill="#001A2C" opacity="0.45" />
      <rect x="1060" y="275" width="24" height="125" rx="2" fill="#001A2C" opacity="0.5" />

      {/* ── Distant far-right buildings (x≈1150–1350) ──────────────────── */}
      <rect x="1150" y="300" width="16" height="100" rx="1" fill="#001A2C" opacity="0.35" />
      <rect x="1172" y="285" width="20" height="115" rx="1" fill="#001A2C" opacity="0.38" />
      <rect x="1198" y="305" width="14" height="95"  rx="1" fill="#001A2C" opacity="0.32" />
      <rect x="1220" y="290" width="18" height="110" rx="1" fill="#001A2C" opacity="0.35" />
      <rect x="1245" y="310" width="15" height="90"  rx="1" fill="#001A2C" opacity="0.3" />

      {/* ── Ground level connection (horizon) ───────────────────────────── */}
      <rect x="0" y="378" width="1600" height="4" fill="#001529" opacity="0.4" />
    </g>
  );
}
