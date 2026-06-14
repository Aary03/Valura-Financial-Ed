/**
 * Valura Atlas — diagram library (warm light theme).
 *
 * Pure SVG, no client interactivity, so these render server-side and stay
 * crisp at any width. Each diagram is keyed by DiagramId in DIAGRAMS at the
 * bottom; <LessonBlocks> looks them up. Subtle motion is CSS-only and is
 * disabled under prefers-reduced-motion.
 */
import type { DiagramId } from "@/lib/atlas/types";

const C = {
  green: "#0E9F6E",
  greenDim: "#0B8A5F",
  sky: "#0C8CE0",
  violet: "#6D4AE0",
  amber: "#D98300",
  rose: "#E0455A",
  head: "#1B1A17", // headings / primary
  sub: "#565049", // secondary text
  faint: "#8C867B", // muted
  line: "rgba(27,26,23,0.12)",
  panel: "#FFFFFF", // card fill
  panel2: "#F6F1E8", // warm sand fill
  onAccent: "#FFFFFF",
};

const FONT = "'Inter', sans-serif";
const HEAD = "'Manrope', sans-serif";

function Frame({
  viewBox,
  children,
  maxW = 760,
}: {
  viewBox: string;
  children: React.ReactNode;
  maxW?: number;
}) {
  return (
    <div style={{ width: "100%", maxWidth: maxW, margin: "0 auto" }}>
      <svg viewBox={viewBox} width="100%" role="img" style={{ display: "block" }}>
        {children}
      </svg>
    </div>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill={C.faint} />
      </marker>
    </defs>
  );
}

/* ─── 1. World share ───────────────────────────────────────────────────────── */
function WorldShare() {
  const segs = [
    { label: "United States", pct: 63, color: C.green },
    { label: "Other developed", pct: 26, color: C.sky },
    { label: "Emerging ex-India", pct: 8, color: C.violet },
    { label: "India", pct: 3, color: C.amber },
  ];
  const W = 720;
  let x = 40;
  return (
    <Frame viewBox="0 0 760 230">
      <text x={40} y={40} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="20">
        Where the world&apos;s stock value sits
      </text>
      {segs.map((s) => {
        const w = (s.pct / 100) * (W - 80);
        const rect = (
          <g key={s.label}>
            <rect x={x} y={70} width={w} height={48} fill={s.color} rx={4} />
            {s.pct >= 6 && (
              <text x={x + w / 2} y={99} fill={C.onAccent} fontFamily={HEAD} fontWeight="700" fontSize="15" textAnchor="middle">
                {s.pct}%
              </text>
            )}
          </g>
        );
        x += w + 4;
        return rect;
      })}
      <line x1={695} y1={70} x2={695} y2={150} stroke={C.amber} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={690} y={168} fill={C.amber} fontFamily={HEAD} fontWeight="700" fontSize="14" textAnchor="end">
        India ≈ 3%
      </text>
      {segs.map((s, i) => (
        <g key={s.label} transform={`translate(${40 + i * 180}, 195)`}>
          <rect width={12} height={12} rx={3} fill={s.color} />
          <text x={18} y={11} fill={C.sub} fontFamily={FONT} fontSize="12.5">
            {s.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ─── 2. Rupee drift ───────────────────────────────────────────────────────── */
function RupeeDrift() {
  const pts = [
    { yr: "2010", inr: 45 },
    { yr: "2013", inr: 58 },
    { yr: "2016", inr: 67 },
    { yr: "2019", inr: 71 },
    { yr: "2022", inr: 79 },
    { yr: "2025", inr: 86 },
  ];
  const x0 = 70, x1 = 700, y0 = 170, y1 = 50, min = 40, max = 90;
  const X = (i: number) => x0 + (i / (pts.length - 1)) * (x1 - x0);
  const Y = (v: number) => y0 - ((v - min) / (max - min)) * (y0 - y1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${X(i)} ${Y(p.inr)}`).join(" ");
  const area = `${path} L${X(pts.length - 1)} ${y0} L${X(0)} ${y0} Z`;
  return (
    <Frame viewBox="0 0 760 230">
      <text x={40} y={32} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="19">
        ₹ per $1 — the rupee tends to slide
      </text>
      <linearGradient id="rd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.amber} stopOpacity="0.22" />
        <stop offset="100%" stopColor={C.amber} stopOpacity="0" />
      </linearGradient>
      <path d={area} fill="url(#rd)" />
      <path d={path} fill="none" stroke={C.amber} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={p.yr}>
          <circle cx={X(i)} cy={Y(p.inr)} r="4.5" fill={C.amber} stroke="#fff" strokeWidth="2" />
          <text x={X(i)} y={y0 + 20} fill={C.faint} fontFamily={FONT} fontSize="12" textAnchor="middle">
            {p.yr}
          </text>
          <text x={X(i)} y={Y(p.inr) - 12} fill={C.head} fontFamily={HEAD} fontWeight="600" fontSize="12.5" textAnchor="middle">
            ₹{p.inr}
          </text>
        </g>
      ))}
      <text x={40} y={210} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        Roughly 3–4% weaker each year on average — a quiet tailwind for assets held in dollars.
      </text>
    </Frame>
  );
}

/* ─── 3. Concentration ─────────────────────────────────────────────────────── */
function Concentration() {
  const dots = (cx: number, cy: number, color: string, n = 9) =>
    Array.from({ length: n }).map((_, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      return <circle key={i} cx={cx + col * 22} cy={cy + row * 22} r="7" fill={color} />;
    });
  return (
    <Frame viewBox="0 0 760 250">
      <rect x={40} y={40} width={300} height={180} rx={16} fill={C.panel2} stroke={C.line} />
      <text x={60} y={70} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16">
        Many stocks, one country
      </text>
      {dots(70, 95, C.amber)}
      <text x={60} y={205} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        One economy · one currency · one rate cycle
      </text>

      <text x={380} y={140} fill={C.faint} fontFamily={HEAD} fontWeight="700" fontSize="22" textAnchor="middle">
        →
      </text>

      <rect x={420} y={40} width={300} height={180} rx={16} fill="#fff" stroke="rgba(14,159,110,0.35)" />
      <text x={440} y={70} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16">
        Spread across the world
      </text>
      {dots(450, 95, C.green, 3)}
      {dots(520, 95, C.sky, 3)}
      {dots(590, 95, C.violet, 3)}
      <text x={440} y={205} fill={C.greenDim} fontFamily={FONT} fontSize="12.5">
        Different economies · currencies · cycles
      </text>
    </Frame>
  );
}

/* ─── 4. Five routes — centerpiece flowchart ───────────────────────────────── */
function FiveRoutes() {
  const routes = [
    { t: "Domestic funds & ETFs", s: "Buy in ₹ on Indian exchanges", c: C.sky },
    { t: "Direct US stocks (LRS)", s: "Open a global broker account", c: C.green },
    { t: "Global / UCITS funds", s: "Pooled, professionally managed", c: C.violet },
    { t: "GIFT City", s: "India-regulated global access", c: C.amber },
    { t: "Curated baskets", s: "Ready-made themed portfolios", c: C.rose },
  ];
  const rowY = (i: number) => 52 + i * 78;
  return (
    <Frame viewBox="0 0 760 450" maxW={780}>
      <Defs />
      <rect x={24} y={188} width={120} height={74} rx={16} fill={C.panel2} stroke="rgba(14,159,110,0.4)" />
      <text x={84} y={222} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="15" textAnchor="middle">
        You
      </text>
      <text x={84} y={242} fill={C.faint} fontFamily={FONT} fontSize="12" textAnchor="middle">
        in India
      </text>

      {routes.map((r, i) => {
        const y = rowY(i);
        return (
          <g key={r.t}>
            <path d={`M150 225 C 230 225, 230 ${y + 27}, 300 ${y + 27}`} fill="none" stroke={r.c} strokeWidth="2" opacity={0.5} markerEnd="url(#arrow)" />
            <rect x={304} y={y} width={300} height={54} rx={13} fill={C.panel} stroke={C.line} />
            <rect x={304} y={y} width={4} height={54} rx={2} fill={r.c} />
            <text x={322} y={y + 23} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="14.5">
              {r.t}
            </text>
            <text x={322} y={y + 41} fill={C.sub} fontFamily={FONT} fontSize="12.5">
              {r.s}
            </text>
            <path d={`M604 ${y + 27} C 650 ${y + 27}, 650 225, 690 225`} fill="none" stroke={r.c} strokeWidth="2" opacity={0.35} />
          </g>
        );
      })}

      <rect x={648} y={186} width={96} height={78} rx={16} fill={C.panel2} stroke="rgba(12,140,224,0.45)" />
      <text x={696} y={216} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="14" textAnchor="middle">
        Global
      </text>
      <text x={696} y={234} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="14" textAnchor="middle">
        markets
      </text>
      <text x={696} y={252} fill={C.faint} fontFamily={FONT} fontSize="11" textAnchor="middle">
        US · EU · more
      </text>
    </Frame>
  );
}

/* ─── 5. LRS bucket ────────────────────────────────────────────────────────── */
function LrsBucket() {
  return (
    <Frame viewBox="0 0 760 280" maxW={680}>
      <text x={40} y={36} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="19">
        Your yearly overseas allowance (LRS)
      </text>
      <rect x={60} y={60} width={200} height={190} rx={16} fill={C.panel} stroke={C.line} />
      <rect x={60} y={150} width={200} height={100} rx={16} fill="rgba(14,159,110,0.12)" />
      <text x={160} y={120} fill={C.head} fontFamily={HEAD} fontWeight="800" fontSize="26" textAnchor="middle">
        $250,000
      </text>
      <text x={160} y={142} fill={C.faint} fontFamily={FONT} fontSize="12.5" textAnchor="middle">
        per person · per year
      </text>
      <line x1={60} y1={210} x2={300} y2={210} stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" />
      <text x={310} y={200} fill={C.greenDim} fontFamily={HEAD} fontWeight="700" fontSize="13.5">
        Up to ₹10 lakh
      </text>
      <text x={310} y={218} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        sent abroad: no TCS
      </text>
      <text x={310} y={120} fill={C.amber} fontFamily={HEAD} fontWeight="700" fontSize="13.5">
        Above ₹10 lakh
      </text>
      <text x={310} y={138} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        20% TCS is collected —
      </text>
      <text x={310} y={156} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        you claim it back in your ITR.
      </text>
      <text x={40} y={272} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        TCS is not a tax you lose — it&apos;s a prepayment adjusted against what you owe.
      </text>
    </Frame>
  );
}

/* ─── 6. GIFT City ─────────────────────────────────────────────────────────── */
function GiftCity() {
  return (
    <Frame viewBox="0 0 760 240">
      <Defs />
      <rect x={30} y={80} width={150} height={90} rx={16} fill={C.panel} stroke={C.line} />
      <text x={105} y={120} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16" textAnchor="middle">
        India
      </text>
      <text x={105} y={140} fill={C.faint} fontFamily={FONT} fontSize="12" textAnchor="middle">
        your demat / ₹
      </text>

      <rect x={235} y={48} width={290} height={150} rx={18} fill={C.amber + "12"} stroke="rgba(217,131,0,0.45)" />
      <text x={380} y={76} fill={C.amber} fontFamily={HEAD} fontWeight="700" fontSize="15" textAnchor="middle">
        GIFT City · IFSC
      </text>
      {["NSE IX & India INX", "GIFT-based global funds", "Tax handled at fund level"].map((t, i) => (
        <g key={t}>
          <circle cx={262} cy={104 + i * 30} r="3.5" fill={C.amber} />
          <text x={276} y={108 + i * 30} fill={C.head} fontFamily={FONT} fontSize="13">
            {t}
          </text>
        </g>
      ))}

      <rect x={580} y={80} width={150} height={90} rx={16} fill={C.panel} stroke="rgba(12,140,224,0.4)" />
      <text x={655} y={120} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16" textAnchor="middle">
        Global
      </text>
      <text x={655} y={140} fill={C.faint} fontFamily={FONT} fontSize="12" textAnchor="middle">
        US stocks & ETFs
      </text>

      <line x1={182} y1={125} x2={233} y2={125} stroke={C.amber} strokeWidth="2.5" markerEnd="url(#arrow)" />
      <line x1={527} y1={125} x2={578} y2={125} stroke={C.amber} strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x={380} y={224} fill={C.faint} fontFamily={FONT} fontSize="12.5" textAnchor="middle">
        Indian-regulated, but built to reach the world.
      </text>
    </Frame>
  );
}

/* ─── 7. Money journey ─────────────────────────────────────────────────────── */
function MoneyJourney() {
  const drains = [
    { x: 250, label: "Currency conversion", note: "forex spread" },
    { x: 430, label: "Platform & fees", note: "brokerage, charges" },
  ];
  return (
    <Frame viewBox="0 0 760 250">
      <Defs />
      <text x={40} y={34} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="19">
        What actually happens to ₹100
      </text>
      <line x1={70} y1={110} x2={690} y2={110} stroke="rgba(27,26,23,0.1)" strokeWidth="14" strokeLinecap="round" />
      <line x1={70} y1={110} x2={690} y2={110} stroke={C.green} strokeWidth="3" strokeDasharray="6 6" className="flow-dash" />
      <circle cx={70} cy={110} r="22" fill={C.panel} stroke="rgba(14,159,110,0.5)" strokeWidth="1.5" />
      <text x={70} y={115} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="13" textAnchor="middle">
        ₹100
      </text>
      {drains.map((d) => (
        <g key={d.label}>
          <line x1={d.x} y1={110} x2={d.x} y2={158} stroke={C.rose} strokeWidth="2" markerEnd="url(#arrow)" />
          <text x={d.x} y={178} fill={C.rose} fontFamily={HEAD} fontWeight="600" fontSize="12.5" textAnchor="middle">
            {d.label}
          </text>
          <text x={d.x} y={194} fill={C.faint} fontFamily={FONT} fontSize="11.5" textAnchor="middle">
            {d.note}
          </text>
        </g>
      ))}
      <circle cx={690} cy={110} r="26" fill={C.panel} stroke="rgba(12,140,224,0.5)" strokeWidth="1.5" />
      <text x={690} y={107} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="12" textAnchor="middle">
        US
      </text>
      <text x={690} y={122} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="12" textAnchor="middle">
        asset
      </text>
      <text x={40} y={232} fill={C.sub} fontFamily={FONT} fontSize="13">
        Your real return = asset performance ± currency move − costs. All three matter.
      </text>
    </Frame>
  );
}

/* ─── 8. US ownership ──────────────────────────────────────────────────────── */
function UsOwnership() {
  return (
    <Frame viewBox="0 0 760 250">
      <rect x={40} y={50} width={300} height={170} rx={16} fill={C.panel} stroke={C.line} />
      <text x={60} y={80} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16">
        One share
      </text>
      <text x={60} y={100} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        a tiny slice of one company
      </text>
      <circle cx={190} cy={160} r="46" fill="none" stroke={C.green} strokeWidth="2" />
      <path d="M190 160 L190 114 A46 46 0 0 1 232 152 Z" fill={C.green} />
      <text x={250} y={150} fill={C.greenDim} fontFamily={HEAD} fontWeight="700" fontSize="13">
        your
      </text>
      <text x={250} y={166} fill={C.greenDim} fontFamily={HEAD} fontWeight="700" fontSize="13">
        slice
      </text>

      <rect x={420} y={50} width={300} height={170} rx={16} fill={C.panel} stroke="rgba(12,140,224,0.35)" />
      <text x={440} y={80} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="16">
        An index (S&amp;P 500)
      </text>
      <text x={440} y={100} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        a basket of ~500 big companies
      </text>
      {Array.from({ length: 24 }).map((_, i) => {
        const col = i % 8, row = Math.floor(i / 8);
        return <rect key={i} x={442 + col * 33} y={120 + row * 28} width={26} height={20} rx={4} fill={C.sky} opacity={0.28 + (i % 5) * 0.13} />;
      })}
      <text x={440} y={210} fill="#0b6db1" fontFamily={FONT} fontSize="12">
        Buy the basket, own a piece of all of them.
      </text>
    </Frame>
  );
}

/* ─── 9. Tax flow ──────────────────────────────────────────────────────────── */
function TaxFlow() {
  return (
    <Frame viewBox="0 0 760 300">
      <text x={40} y={34} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="19">
        Two taxes on US investments
      </text>
      <rect x={40} y={60} width={320} height={200} rx={16} fill={C.amber + "0E"} stroke="rgba(217,131,0,0.3)" />
      <text x={60} y={90} fill={C.amber} fontFamily={HEAD} fontWeight="700" fontSize="16">
        Dividends
      </text>
      <text x={60} y={120} fill={C.head} fontFamily={FONT} fontSize="13.5">
        US withholds <tspan fill={C.amber} fontWeight="700">25%</tspan> before you&apos;re paid
      </text>
      <text x={60} y={144} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        (India–US tax treaty / DTAA rate)
      </text>
      <text x={60} y={176} fill={C.head} fontFamily={FONT} fontSize="13.5">
        You get the other <tspan fill={C.greenDim} fontWeight="700">75%</tspan>
      </text>
      <text x={60} y={200} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        That 25% becomes a credit you
      </text>
      <text x={60} y={218} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        claim in India, so you aren&apos;t taxed twice.
      </text>

      <rect x={400} y={60} width={320} height={200} rx={16} fill={C.green + "0E"} stroke="rgba(14,159,110,0.3)" />
      <text x={420} y={90} fill={C.greenDim} fontFamily={HEAD} fontWeight="700" fontSize="16">
        Capital gains
      </text>
      <text x={420} y={120} fill={C.head} fontFamily={FONT} fontSize="13.5">
        The US does <tspan fill={C.greenDim} fontWeight="700">not</tspan> tax your gains
      </text>
      <text x={420} y={144} fill={C.faint} fontFamily={FONT} fontSize="12.5">
        (as a non-resident investor)
      </text>
      <text x={420} y={176} fill={C.head} fontFamily={FONT} fontSize="13.5">
        You pay in <tspan fill={C.greenDim} fontWeight="700">India</tspan>:
      </text>
      <text x={420} y={200} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        Long-term (held 24m+): 12.5%
      </text>
      <text x={420} y={218} fill={C.sub} fontFamily={FONT} fontSize="12.5">
        Short-term: at your income slab
      </text>
      <text x={40} y={288} fill={C.faint} fontFamily={FONT} fontSize="12">
        Indicative rates for resident Indians, 2026. Always confirm with a tax advisor for your case.
      </text>
    </Frame>
  );
}

/* ─── 10. Regulators ───────────────────────────────────────────────────────── */
function Regulators() {
  const india = [
    { a: "RBI", b: "Reserve Bank — controls money leaving India (LRS)" },
    { a: "SEBI", b: "Markets regulator — funds, brokers, disclosures" },
    { a: "IFSCA", b: "Oversees GIFT City / IFSC activity" },
  ];
  const us = [
    { a: "SEC", b: "US markets regulator — listed companies" },
    { a: "FINRA", b: "Oversees US brokers & dealers" },
  ];
  const row = (item: { a: string; b: string }, x: number, y: number, color: string) => (
    <g key={item.a}>
      <rect x={x} y={y} width={300} height={48} rx={12} fill={C.panel} stroke={C.line} />
      <rect x={x} y={y} width={4} height={48} rx={2} fill={color} />
      <text x={x + 18} y={y + 22} fill={C.head} fontFamily={HEAD} fontWeight="700" fontSize="14">
        {item.a}
      </text>
      <text x={x + 18} y={y + 39} fill={C.faint} fontFamily={FONT} fontSize="11.5">
        {item.b}
      </text>
    </g>
  );
  return (
    <Frame viewBox="0 0 760 280">
      <text x={40} y={34} fill={C.greenDim} fontFamily={HEAD} fontWeight="700" fontSize="15">
        India
      </text>
      {india.map((r, i) => row(r, 40, 50 + i * 58, C.green))}
      <line x1={380} y1={40} x2={380} y2={250} stroke={C.line} strokeDasharray="4 5" />
      <text x={420} y={34} fill="#0b6db1" fontFamily={HEAD} fontWeight="700" fontSize="15">
        United States
      </text>
      {us.map((r, i) => row(r, 420, 50 + i * 58, C.sky))}
    </Frame>
  );
}

export const DIAGRAMS: Record<DiagramId, () => React.ReactElement> = {
  "world-share": WorldShare,
  "rupee-drift": RupeeDrift,
  concentration: Concentration,
  "five-routes": FiveRoutes,
  "lrs-bucket": LrsBucket,
  "gift-city": GiftCity,
  "money-journey": MoneyJourney,
  "us-ownership": UsOwnership,
  "tax-flow": TaxFlow,
  regulators: Regulators,
};

export function Diagram({ id }: { id: DiagramId }) {
  const Cmp = DIAGRAMS[id];
  if (!Cmp) return null;
  return <Cmp />;
}
