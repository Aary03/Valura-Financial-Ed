/**
 * World coordinate data — cinematic `x/y` scene + horizontal journey `mapX/mapY`.
 */

export interface WorldCoord {
  slug: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  x: number;
  y: number;
  mapX: number;
  mapY: number;
}

/** Cinematic coords + metadata only — journey map XY applied below */
const META: Omit<WorldCoord, "mapX" | "mapY">[] = [
  {
    slug:       "marina-mile",
    nameEn:      "Marina Mile",
    nameAr:      "ميل المارينا",
    taglineEn:   "Master personal finance basics",
    taglineAr:   "أتقن أساسيات التمويل الشخصي",
    x: 80,       y: 370,
  },
  {
    slug:       "skyline-heights",
    nameEn:      "Skyline Heights",
    nameAr:      "مرتفعات الأفق",
    taglineEn:   "Understand how banks work",
    taglineAr:   "افهم كيف تعمل البنوك",
    x: 190,      y: 330,
  },
  {
    slug:       "souk-of-savings",
    nameEn:      "Souk of Savings",
    nameAr:      "سوق المدخرات",
    taglineEn:   "Build money habits that stick",
    taglineAr:   "ابنِ عادات مالية راسخة",
    x: 310,      y: 380,
  },
  {
    slug:       "dirham-desert",
    nameEn:      "Dirham Desert",
    nameAr:      "صحراء الدرهم",
    taglineEn:   "Tame inflation and beat rising costs",
    taglineAr:   "تغلب على التضخم وارتفاع الأسعار",
    x: 420,      y: 345,
  },
  {
    slug:       "loan-lighthouse",
    nameEn:      "Loan Lighthouse",
    nameAr:      "منارة القروض",
    taglineEn:   "Navigate personal loans wisely",
    taglineAr:   "تنقل في القروض الشخصية بحكمة",
    x: 535,      y: 295,
  },
  {
    slug:       "card-canyon",
    nameEn:      "Card Canyon",
    nameAr:      "وادي البطاقات",
    taglineEn:   "Credit cards and your AECB score",
    taglineAr:   "بطاقات الائتمان ودرجة AECB",
    x: 645,      y: 365,
  },
  {
    slug:       "oasis-of-insurance",
    nameEn:      "Oasis of Insurance",
    nameAr:      "واحة التأمين",
    taglineEn:   "Protect what matters most",
    taglineAr:   "احمِ ما يهمك أكثر",
    x: 760,      y: 320,
  },
  {
    slug:       "asset-atlas",
    nameEn:      "Asset Atlas",
    nameAr:      "أطلس الأصول",
    taglineEn:   "Explore asset classes — no picks",
    taglineAr:   "استكشف فئات الأصول — بدون توصيات",
    x: 870,      y: 385,
  },
  {
    slug:       "skyline-keys",
    nameEn:      "Skyline Keys",
    nameAr:      "مفاتيح الأفق",
    taglineEn:   "Unlock real estate fundamentals",
    taglineAr:   "افتح أسرار أساسيات العقارات",
    x: 975,      y: 310,
  },
  {
    slug:       "halal-harbour",
    nameEn:      "Halal Harbour",
    nameAr:      "ميناء الحلال",
    taglineEn:   "Islamic finance and Zakat explained",
    taglineAr:   "التمويل الإسلامي والزكاة",
    x: 1085,     y: 355,
  },
  {
    slug:       "gratuity-garden",
    nameEn:      "Gratuity Garden",
    nameAr:      "حديقة المكافآت",
    taglineEn:   "EOSB, pension and retirement planning",
    taglineAr:   "مكافأة نهاية الخدمة والتقاعد",
    x: 1190,     y: 325,
  },
  {
    slug:       "family-majlis",
    nameEn:      "Family Majlis",
    nameAr:      "مجلس العائلة",
    taglineEn:   "Joint finances and family planning",
    taglineAr:   "الشؤون المالية العائلية المشتركة",
    x: 1290,     y: 375,
  },
  {
    slug:       "bridge-of-borders",
    nameEn:      "Bridge of Borders",
    nameAr:      "جسر الحدود",
    taglineEn:   "Remittances and cross-border money",
    taglineAr:   "التحويلات المالية عبر الحدود",
    x: 1385,     y: 305,
  },
  {
    slug:       "scam-sentinel",
    nameEn:      "Scam Sentinel",
    nameAr:      "حارس النصب",
    taglineEn:   "Spot and stop financial fraud",
    taglineAr:   "اكتشف الاحتيال المالي وأوقفه",
    x: 1465,     y: 355,
  },
  {
    slug:       "goal-garden",
    nameEn:      "Goal Garden",
    nameAr:      "حديقة الأهداف",
    taglineEn:   "Set goals, build your future",
    taglineAr:   "ضع أهدافاً وابنِ مستقبلك",
    x: 1540,     y: 300,
  },
];

/**
 * Horizontal wave: spacing 360px between centres; alternating Y 320 / 480.
 */
export const WORLD_COORDS: WorldCoord[] = META.map((entry, index) => ({
  ...entry,
  mapX: 180 + index * 360,
  mapY: index % 2 === 0 ? 320 : 480,
}));

export const MAP_WIDTH  = 5400;
export const MAP_HEIGHT = 620;

/** Cinematic scene: quadratic SVG path through x/y. */
export function worldCoordsToPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

export function mapCoordsToPath(worlds: WorldCoord[]): string {
  return worldCoordsToPath(worlds.map((w) => ({ x: w.mapX, y: w.mapY })));
}
