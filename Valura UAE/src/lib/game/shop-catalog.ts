/**
 * Valura Shop Catalog
 *
 * All prices are in VAL Coins. 10,000 coins ≈ AED 10 (used only for charity).
 * Items are purely cosmetic — they never affect learning outcomes.
 * No real-money purchases. No gambling mechanics.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type CosmeticKind = "AVATAR_THEME" | "ROAD_SKIN" | "STICKER_PACK";

export interface AvatarTheme {
  kind: "AVATAR_THEME";
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  /** Tailwind/CSS gradient for the avatar circle background */
  gradient: string;
  /** Primary accent color (for ring, chips, etc.) */
  accentColor: string;
  /** Emoji or character shown in the preview circle */
  icon: string;
  price: number;        // VAL Coins
  isFree?: boolean;
}

export interface RoadSkin {
  kind: "ROAD_SKIN";
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  /** CSS gradient for the journey background */
  skyGradient: string;
  /** Road stroke color */
  roadColor: string;
  /** Decorative emoji used in the card preview */
  icon: string;
  price: number;
  isFree?: boolean;
}

export interface StickerPack {
  kind: "STICKER_PACK";
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  /** Array of emoji stickers included in this pack */
  stickers: string[];
  /** Cover emoji (shown on the card) */
  coverEmoji: string;
  price: number;
  isFree?: boolean;
}

export interface Charity {
  slug: string;
  nameEn: string;
  nameAr: string;
  missionEn: string;
  missionAr: string;
  /** Accent color used on the card */
  color: string;
  /** Light background tint */
  bg: string;
  /** Emoji icon */
  icon: string;
  websiteEn: string;
}

// ── Avatar Themes ──────────────────────────────────────────────────────────────

export const AVATAR_THEMES: AvatarTheme[] = [
  {
    kind: "AVATAR_THEME",
    slug: "avatar-default",
    nameEn: "Marina Green",
    nameAr: "أخضر المارينا",
    descriptionEn: "The classic Valura look.",
    descriptionAr: "المظهر الكلاسيكي لـ Valura.",
    gradient: "linear-gradient(135deg, #05A049 0%, #059669 100%)",
    accentColor: "#05A049",
    icon: "🌿",
    price: 0,
    isFree: true,
  },
  {
    kind: "AVATAR_THEME",
    slug: "avatar-desert-falcon",
    nameEn: "Desert Falcon",
    nameAr: "صقر الصحراء",
    descriptionEn: "Sand dunes and golden horizons.",
    descriptionAr: "كثبان الرمال وآفاق ذهبية.",
    gradient: "linear-gradient(135deg, #D97706 0%, #92400E 100%)",
    accentColor: "#D97706",
    icon: "🦅",
    price: 3000,
  },
  {
    kind: "AVATAR_THEME",
    slug: "avatar-dhow-captain",
    nameEn: "Dhow Captain",
    nameAr: "ربان الداو",
    descriptionEn: "Maritime blue from the old port of Deira.",
    descriptionAr: "أزرق بحري من ميناء ديرة القديم.",
    gradient: "linear-gradient(135deg, #1D4ED8 0%, #0C4A6E 100%)",
    accentColor: "#3B82F6",
    icon: "⚓",
    price: 3500,
  },
  {
    kind: "AVATAR_THEME",
    slug: "avatar-burj-night",
    nameEn: "Burj Night",
    nameAr: "ليل البرج",
    descriptionEn: "Dubai after dark — all lights, no sleep.",
    descriptionAr: "دبي بعد الغروب — أضواء لا نوم.",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #6B21A8 100%)",
    accentColor: "#A855F7",
    icon: "🌃",
    price: 5000,
  },
  {
    kind: "AVATAR_THEME",
    slug: "avatar-rosegold",
    nameEn: "Rose Gold",
    nameAr: "ذهبي وردي",
    descriptionEn: "Warm rose tones, premium feel.",
    descriptionAr: "درجات وردية دافئة، مظهر فاخر.",
    gradient: "linear-gradient(135deg, #F9A8D4 0%, #BE185D 100%)",
    accentColor: "#DB2777",
    icon: "🌸",
    price: 4000,
  },
  {
    kind: "AVATAR_THEME",
    slug: "avatar-saffron",
    nameEn: "Saffron Souk",
    nameAr: "سوق الزعفران",
    descriptionEn: "The warmth of a traditional Emirati spice market.",
    descriptionAr: "دفء سوق التوابل الإماراتي التقليدي.",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)",
    accentColor: "#F59E0B",
    icon: "🌺",
    price: 4500,
  },
];

// ── Road Skins ──────────────────────────────────────────────────────────────────

export const ROAD_SKINS: RoadSkin[] = [
  {
    kind: "ROAD_SKIN",
    slug: "skin-default",
    nameEn: "Midnight Dunes",
    nameAr: "كثبان منتصف الليل",
    descriptionEn: "The default Valura journey — deep navy and city silhouettes.",
    descriptionAr: "رحلة Valura الافتراضية — كحلي عميق وصورة ظلية للمدينة.",
    skyGradient: "linear-gradient(180deg, #00111B 0%, #002035 30%, #003755 55%, #C97D3D 78%, #E0A060 90%, #EFC99A 100%)",
    roadColor: "#05A049",
    icon: "🌆",
    price: 0,
    isFree: true,
  },
  {
    kind: "ROAD_SKIN",
    slug: "skin-sunset",
    nameEn: "Gulf Sunset",
    nameAr: "غروب الخليج",
    descriptionEn: "Warm amber and coral haze over the Gulf horizon.",
    descriptionAr: "ضباب عنبري ومرجاني دافئ فوق أفق الخليج.",
    skyGradient: "linear-gradient(180deg, #7C2D12 0%, #C2410C 25%, #EA580C 50%, #FB923C 70%, #FED7AA 90%, #FFEDD5 100%)",
    roadColor: "#DC2626",
    icon: "🌅",
    price: 4000,
  },
  {
    kind: "ROAD_SKIN",
    slug: "skin-monsoon",
    nameEn: "Monsoon Season",
    nameAr: "موسم الأمطار",
    descriptionEn: "Rare rain clouds roll in from the mountains of Ras Al Khaimah.",
    descriptionAr: "غيوم ماطرة نادرة تأتي من جبال رأس الخيمة.",
    skyGradient: "linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #334155 65%, #475569 80%, #94A3B8 100%)",
    roadColor: "#60A5FA",
    icon: "🌧️",
    price: 4500,
  },
  {
    kind: "ROAD_SKIN",
    slug: "skin-cyber-skyline",
    nameEn: "Cyber Skyline",
    nameAr: "أفق إلكتروني",
    descriptionEn: "Dubai 2050 — neon grids and holographic towers.",
    descriptionAr: "دبي 2050 — شبكات نيون وأبراج هولوغرامية.",
    skyGradient: "linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 35%, #1A0030 60%, #2D0060 80%, #4B0082 100%)",
    roadColor: "#A855F7",
    icon: "🌐",
    price: 6000,
  },
];

// ── Sticker Packs ─────────────────────────────────────────────────────────────

export const STICKER_PACKS: StickerPack[] = [
  {
    kind: "STICKER_PACK",
    slug: "stickers-uae-vibes",
    nameEn: "UAE Vibes",
    nameAr: "أجواء الإمارات",
    descriptionEn: "Local icons — the Burj, ghaf trees, dhow boats, and desert sand.",
    descriptionAr: "أيقونات محلية — البرج وأشجار الغاف والسفن الشراعية والرمال.",
    stickers: ["🏙️", "🌴", "⛵", "🐪", "🕌", "🦅", "☀️", "🌊"],
    coverEmoji: "🏙️",
    price: 1500,
  },
  {
    kind: "STICKER_PACK",
    slug: "stickers-money-moves",
    nameEn: "Money Moves",
    nameAr: "تحركات مالية",
    descriptionEn: "Celebrate savings milestones and smart money decisions.",
    descriptionAr: "احتفل بإنجازات الادخار والقرارات المالية الذكية.",
    stickers: ["💰", "📈", "🎯", "✅", "🏆", "💎", "🔑", "⭐"],
    coverEmoji: "💰",
    price: 2000,
  },
  {
    kind: "STICKER_PACK",
    slug: "stickers-sanad-moods",
    nameEn: "Sanad Moods",
    nameAr: "مزاجات سند",
    descriptionEn: "Your falcon friend in every emotion — from curious to celebrating.",
    descriptionAr: "صديقك الصقر في كل مزاج — من الفضول إلى الاحتفال.",
    stickers: ["🦅", "🤔", "🎉", "😎", "💪", "🥹", "😤", "🌟"],
    coverEmoji: "🦅",
    price: 2500,
  },
];

// ── Charities ─────────────────────────────────────────────────────────────────

export const CHARITIES: Charity[] = [
  {
    slug: "beit-al-khair",
    nameEn: "Beit Al Khair",
    nameAr: "بيت الخير",
    missionEn: "Empowers low-income UAE families with food, healthcare, and education support.",
    missionAr: "تمكين الأسر ذات الدخل المحدود في الإمارات بتوفير الغذاء والرعاية الصحية والتعليم.",
    color: "#059669",
    bg: "#ECFDF5",
    icon: "🏡",
    websiteEn: "beitalkheir.ae",
  },
  {
    slug: "emirates-red-crescent",
    nameEn: "Emirates Red Crescent",
    nameAr: "الهلال الأحمر الإماراتي",
    missionEn: "Delivers humanitarian aid across 90+ countries, rooted in UAE values of giving.",
    missionAr: "تقديم المساعدات الإنسانية في أكثر من 90 دولة، بروح الإماراتية في العطاء.",
    color: "#DC2626",
    bg: "#FEF2F2",
    icon: "🌙",
    websiteEn: "emiratesrc.ae",
  },
  {
    slug: "al-jalila-foundation",
    nameEn: "Al Jalila Foundation",
    nameAr: "مؤسسة الجليلة",
    missionEn: "Funds medical research and healthcare scholarships across the Arab world.",
    missionAr: "تمويل الأبحاث الطبية والمنح الدراسية للرعاية الصحية في العالم العربي.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icon: "⚕️",
    websiteEn: "aljalilafoundation.ae",
  },
];

// ── Donation tiers (in VAL Coins) ─────────────────────────────────────────────

export const DONATION_TIERS = [1000, 5000, 10000] as const;

/** 10,000 VAL Coins = AED 10 */
export function coinsToAed(coins: number): number {
  return coins / 1000;
}
