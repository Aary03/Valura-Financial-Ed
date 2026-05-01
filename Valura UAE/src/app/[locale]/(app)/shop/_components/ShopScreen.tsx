"use client";

import { useState, useTransition, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Coins, Sparkles } from "lucide-react";
import BottomNav from "@/components/game/BottomNav";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGameStore, useToastStore } from "@/lib/game/store";
import {
  AVATAR_THEMES, ROAD_SKINS, STICKER_PACKS, CHARITIES,
  DONATION_TIERS, coinsToAed,
  type AvatarTheme, type RoadSkin, type StickerPack, type Charity, type CosmeticKind,
} from "@/lib/game/shop-catalog";
import { purchaseCosmetic, equipCosmetic, donateCoins } from "@/app/actions/shop";

// ── Coin SVG ──────────────────────────────────────────────────────────────────

function CoinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9"   fill="#D97706" />
      <circle cx="9" cy="9" r="7"   fill="#B45309" />
      <circle cx="9" cy="9" r="5"   fill="#D97706" opacity="0.5" />
      <text x="9" y="12.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFC">V</text>
    </svg>
  );
}

// ── Confirm modal ─────────────────────────────────────────────────────────────

interface ConfirmProps {
  title: string;
  subtitle: string;
  cost: number;
  balance: number;
  ctaLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  locale: string;
}

function ConfirmModal({ title, subtitle, cost, balance, ctaLabel, onConfirm, onCancel, isPending, locale }: ConfirmProps) {
  const isAr      = locale === "ar";
  const remaining = balance - cost;
  const canAfford = remaining >= 0;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-end justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(0,17,27,0.55)", backdropFilter: "blur(6px)" }}
        onClick={onCancel}
      />
      {/* Sheet */}
      <motion.div
        className="relative w-full max-w-sm rounded-3xl p-6 flex flex-col gap-5"
        style={{ background: "#FFFFFC" }}
        initial={{ y: 60, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 60 }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
      >
        <div className="text-center">
          <h3 className="font-heading text-lg font-bold mb-1" style={{ color: "#00111B" }}>{title}</h3>
          <p className="font-body text-sm" style={{ color: "#64748B" }}>{subtitle}</p>
        </div>

        {/* Cost breakdown */}
        <div className="rounded-2xl p-4" style={{ background: "#F8FAFC", border: "1px solid rgba(0,17,27,0.07)" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-sm" style={{ color: "#475569" }}>{isAr ? "السعر" : "Cost"}</span>
            <span className="flex items-center gap-1.5 font-heading text-sm font-bold" style={{ color: "#D97706" }}>
              <CoinIcon /> {cost.toLocaleString()}
            </span>
          </div>
          <div className="h-px mb-2" style={{ background: "rgba(0,17,27,0.06)" }} />
          <div className="flex justify-between items-center">
            <span className="font-body text-sm" style={{ color: "#475569" }}>{isAr ? "الرصيد بعد الشراء" : "Balance after"}</span>
            <span className="font-heading text-sm font-bold" style={{ color: canAfford ? "#059669" : "#C0312B" }}>
              {remaining.toLocaleString()} VAL
            </span>
          </div>
        </div>

        {!canAfford && (
          <p className="text-center font-body text-sm" style={{ color: "#C0312B" }}>
            {isAr ? "رصيدك غير كافٍ" : "You don't have enough coins"}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl py-3.5 font-heading text-sm font-semibold"
            style={{ background: "#F1F5F9", color: "#475569" }}
          >
            {isAr ? "إلغاء" : "Cancel"}
          </button>
          <motion.button
            disabled={!canAfford || isPending}
            onClick={onConfirm}
            className="flex-1 rounded-2xl py-3.5 font-heading text-sm font-bold"
            style={{
              background: canAfford
                ? "linear-gradient(135deg, #00111B 0%, #0A2640 100%)"
                : "#E2E8F0",
              color: canAfford ? "#FFFFFC" : "#94A3B8",
            }}
            whileTap={canAfford ? { scale: 0.97 } : {}}
          >
            {isPending ? "…" : ctaLabel}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Avatar tab ────────────────────────────────────────────────────────────────

function AvatarTab({ locale, balance, owned, equippedSlug, onAction }: {
  locale: string; balance: number;
  owned: Set<string>; equippedSlug: string | null;
  onAction: (slug: string, kind: CosmeticKind, price: number, isOwned: boolean) => void;
}) {
  const isAr = locale === "ar";
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
      {AVATAR_THEMES.map((item) => {
        const isOwned    = item.isFree || owned.has(item.slug);
        const isEquipped = equippedSlug === item.slug || (item.isFree && !equippedSlug);
        return (
          <motion.button
            key={item.slug}
            className="flex flex-col rounded-3xl overflow-hidden text-start w-full"
            style={{
              border: isEquipped
                ? "2px solid #05A049"
                : "1.5px solid rgba(0,17,27,0.08)",
              boxShadow: isEquipped ? "0 0 0 3px rgba(5,160,73,0.10)" : "0 2px 8px rgba(0,17,27,0.05)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction(item.slug, "AVATAR_THEME", item.price, isOwned)}
          >
            {/* Preview circle */}
            <div className="flex items-center justify-center h-24 w-full relative"
              style={{ background: item.gradient }}>
              <span className="text-4xl">{item.icon}</span>
              {isEquipped && (
                <span
                  className="absolute top-2 end-2 flex size-6 items-center justify-center rounded-full"
                  style={{ background: "#05A049" }}
                >
                  <Check className="size-3.5 text-white" />
                </span>
              )}
            </div>
            {/* Info */}
            <div className="p-3" style={{ background: "#FAFAFA" }}>
              <p className="font-heading text-sm font-bold truncate" style={{ color: "#00111B" }}>
                {isAr ? item.nameAr : item.nameEn}
              </p>
              <p className="font-body text-[10px] leading-snug mt-0.5 line-clamp-2" style={{ color: "#64748B" }}>
                {isAr ? item.descriptionAr : item.descriptionEn}
              </p>
              <div className="mt-2.5">
                {item.isFree ? (
                  <span className="font-heading text-[11px] font-bold" style={{ color: "#059669" }}>
                    {isAr ? "مجاني" : "Free"}
                  </span>
                ) : isOwned ? (
                  <span className="font-heading text-[11px] font-bold" style={{ color: "#059669" }}>
                    {isEquipped ? (isAr ? "مُفعَّل ✓" : "Equipped ✓") : (isAr ? "مملوك" : "Owned")}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-heading text-[11px] font-bold" style={{ color: "#D97706" }}>
                    <CoinIcon size={12} /> {item.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Road skins tab ────────────────────────────────────────────────────────────

function RoadSkinsTab({ locale, owned, equippedSlug, onAction }: {
  locale: string;
  owned: Set<string>; equippedSlug: string | null;
  onAction: (slug: string, kind: CosmeticKind, price: number, isOwned: boolean) => void;
}) {
  const isAr = locale === "ar";
  return (
    <div className="flex flex-col gap-3 p-4">
      {ROAD_SKINS.map((item) => {
        const isOwned    = item.isFree || owned.has(item.slug);
        const isEquipped = equippedSlug === item.slug || (item.isFree && !equippedSlug);
        return (
          <motion.button
            key={item.slug}
            className="flex gap-4 rounded-3xl overflow-hidden text-start w-full items-stretch"
            style={{
              border: isEquipped ? "2px solid #05A049" : "1.5px solid rgba(0,17,27,0.08)",
              boxShadow: "0 2px 8px rgba(0,17,27,0.05)",
              background: "#FAFAFA",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction(item.slug, "ROAD_SKIN", item.price, isOwned)}
          >
            {/* Sky preview panel */}
            <div
              className="w-28 shrink-0 flex flex-col items-center justify-center relative"
              style={{ background: item.skyGradient, minHeight: 80 }}
            >
              <span className="text-3xl">{item.icon}</span>
              {/* Mock winding road */}
              <svg className="absolute bottom-0 w-full" height="28" viewBox="0 0 112 28" aria-hidden="true">
                <path d="M0 24 Q28 4 56 20 Q84 36 112 16" fill="none"
                  stroke={item.roadColor} strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
              </svg>
              {isEquipped && (
                <span className="absolute top-2 start-2 flex size-5 items-center justify-center rounded-full"
                  style={{ background: "#05A049" }}>
                  <Check className="size-3 text-white" />
                </span>
              )}
            </div>
            {/* Info */}
            <div className="flex flex-col justify-center py-3 pe-4 flex-1 gap-1">
              <p className="font-heading text-sm font-bold" style={{ color: "#00111B" }}>
                {isAr ? item.nameAr : item.nameEn}
              </p>
              <p className="font-body text-xs leading-snug" style={{ color: "#64748B" }}>
                {isAr ? item.descriptionAr : item.descriptionEn}
              </p>
              <div className="mt-1">
                {item.isFree ? (
                  <span className="font-heading text-xs font-bold" style={{ color: "#059669" }}>
                    {isAr ? "مجاني" : "Free"}
                  </span>
                ) : isOwned ? (
                  <span className="font-heading text-xs font-bold" style={{ color: "#059669" }}>
                    {isEquipped ? (isAr ? "مُفعَّل ✓" : "Equipped ✓") : (isAr ? "مملوك" : "Owned")}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-heading text-xs font-bold" style={{ color: "#D97706" }}>
                    <CoinIcon size={13} /> {item.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Sticker packs tab ─────────────────────────────────────────────────────────

function StickerPacksTab({ locale, owned, onAction }: {
  locale: string;
  owned: Set<string>;
  onAction: (slug: string, kind: CosmeticKind, price: number, isOwned: boolean) => void;
}) {
  const isAr = locale === "ar";
  return (
    <div className="flex flex-col gap-3 p-4">
      {STICKER_PACKS.map((item) => {
        const isOwned = owned.has(item.slug);
        return (
          <motion.button
            key={item.slug}
            className="rounded-3xl overflow-hidden text-start w-full"
            style={{
              border: isOwned ? "1.5px solid #A7F3D0" : "1.5px solid rgba(0,17,27,0.08)",
              background: "#FAFAFA",
              boxShadow: "0 2px 8px rgba(0,17,27,0.05)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction(item.slug, "STICKER_PACK", item.price, isOwned)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex size-12 items-center justify-center rounded-2xl text-2xl shrink-0"
                  style={{ background: isOwned ? "#ECFDF5" : "#F8FAFC", border: `1px solid ${isOwned ? "#A7F3D0" : "rgba(0,17,27,0.07)"}` }}
                >
                  {item.coverEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-heading text-sm font-bold" style={{ color: "#00111B" }}>
                      {isAr ? item.nameAr : item.nameEn}
                    </p>
                    {isOwned ? (
                      <span className="shrink-0 rounded-full px-2 py-0.5 font-heading text-[10px] font-bold"
                        style={{ background: "#ECFDF5", color: "#059669" }}>
                        {isAr ? "مملوك ✓" : "Owned ✓"}
                      </span>
                    ) : (
                      <span className="shrink-0 flex items-center gap-1 font-heading text-xs font-bold" style={{ color: "#D97706" }}>
                        <CoinIcon size={13} /> {item.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs leading-snug mt-0.5" style={{ color: "#64748B" }}>
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>
              </div>
              {/* Sticker row */}
              <div className="flex gap-2 flex-wrap">
                {item.stickers.map((s, i) => (
                  <span
                    key={i}
                    className="text-xl rounded-xl px-2 py-1"
                    style={{
                      background: isOwned ? "rgba(5,160,73,0.06)" : "rgba(0,17,27,0.04)",
                      filter: isOwned ? "none" : "grayscale(40%) opacity(0.7)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        );
      })}
      <p className="text-center font-body text-xs pb-2" style={{ color: "#94A3B8" }}>
        {isAr ? "Stickers لإرسالها لأصدقائك — قريباً" : "Stickers for friends — sending feature coming soon"}
      </p>
    </div>
  );
}

// ── Donate tab ────────────────────────────────────────────────────────────────

function DonateTab({ locale, balance, onDonate }: {
  locale: string; balance: number;
  onDonate: (charity: Charity, coins: number) => void;
}) {
  const isAr = locale === "ar";
  const [selected, setSelected] = useState<Record<string, number>>(
    Object.fromEntries(CHARITIES.map((c) => [c.slug, DONATION_TIERS[0]])),
  );

  return (
    <div className="flex flex-col gap-4 p-4 pb-6">
      {/* Community total */}
      <div
        className="flex items-center gap-3 rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
      >
        <span className="text-2xl">🤝</span>
        <div>
          <p className="font-heading text-base font-bold" style={{ color: "#FFFFFC" }}>
            AED 12,450
          </p>
          <p className="font-body text-xs" style={{ color: "#B4E3C8" }}>
            {isAr ? "تبرعت بها مجتمع Valura هذا الشهر" : "donated by Valura learners this month"}
          </p>
        </div>
      </div>

      {/* Rate callout */}
      <div
        className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
        style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
      >
        <CoinIcon size={14} />
        <p className="font-body text-xs" style={{ color: "#92400E" }}>
          {isAr ? "10,000 عملة = AED 10 تبرعاً حقيقياً من Valura" : "10,000 VAL coins = AED 10 real donation by Valura"}
        </p>
      </div>

      {CHARITIES.map((charity) => {
        const coins     = selected[charity.slug] ?? DONATION_TIERS[0];
        const aed       = coinsToAed(coins);
        const canAfford = balance >= coins;

        return (
          <div
            key={charity.slug}
            className="rounded-3xl overflow-hidden"
            style={{ border: `1.5px solid ${charity.color}25`, background: charity.bg }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
              <span className="text-3xl">{charity.icon}</span>
              <div>
                <p className="font-heading text-sm font-bold" style={{ color: "#00111B" }}>
                  {isAr ? charity.nameAr : charity.nameEn}
                </p>
                <p className="font-body text-xs leading-snug mt-0.5" style={{ color: "#64748B" }}>
                  {isAr ? charity.missionAr : charity.missionEn}
                </p>
              </div>
            </div>

            {/* Coin tiers */}
            <div className="px-4 pb-3">
              <p className="font-body text-[10px] mb-2 uppercase tracking-wide" style={{ color: "#64748B" }}>
                {isAr ? "اختر مبلغ التبرع" : "Select amount"}
              </p>
              <div className="flex gap-2 flex-wrap mb-3">
                {DONATION_TIERS.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelected((p) => ({ ...p, [charity.slug]: tier }))}
                    className="flex items-center gap-1 rounded-xl px-3 py-1.5 font-heading text-xs font-bold transition-all"
                    style={{
                      background: coins === tier ? charity.color : "rgba(0,17,27,0.05)",
                      color: coins === tier ? "#FFFFFC" : "#475569",
                    }}
                  >
                    <CoinIcon size={11} /> {tier.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* AED equivalent */}
              <p className="font-body text-xs mb-3" style={{ color: charity.color }}>
                ≈ AED {aed.toFixed(1)} {isAr ? "تبرع حقيقي" : "real donation"}
              </p>

              {/* Donate button */}
              <motion.button
                disabled={!canAfford}
                onClick={() => onDonate(charity, coins)}
                className="w-full rounded-2xl py-3 font-heading text-sm font-bold"
                style={{
                  background: canAfford
                    ? `linear-gradient(135deg, ${charity.color} 0%, ${charity.color}CC 100%)`
                    : "#E2E8F0",
                  color: canAfford ? "#FFFFFC" : "#94A3B8",
                  boxShadow: canAfford ? `0 4px 12px ${charity.color}30` : "none",
                }}
                whileTap={canAfford ? { scale: 0.97 } : {}}
              >
                {canAfford
                  ? (isAr ? `تبرع بـ ${coins.toLocaleString()} عملة` : `Donate ${coins.toLocaleString()} coins`)
                  : (isAr ? "رصيد غير كافٍ" : "Insufficient coins")}
              </motion.button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Donation success overlay ───────────────────────────────────────────────────

function DonationSuccess({ aed, charityName, locale, onDismiss }: {
  aed: number; charityName: string; locale: string; onDismiss: () => void;
}) {
  const isAr = locale === "ar";
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(0,17,27,0.65)", backdropFilter: "blur(8px)" }} onClick={onDismiss} />
      <motion.div
        className="relative w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-4 text-center"
        style={{ background: "#FFFFFC" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
        >
          🤝
        </motion.span>
        <div>
          <p className="font-heading text-xl font-extrabold mb-1" style={{ color: "#00111B" }}>
            {isAr ? "شكراً على تبرعك!" : "Thank you!"}
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#475569" }}>
            {isAr
              ? `AED ${aed.toFixed(1)} تُبرِّع بها Valura بالنيابة عنك إلى ${charityName}`
              : `AED ${aed.toFixed(1)} donated by Valura on your behalf to ${charityName}`}
          </p>
        </div>
        <motion.button
          className="w-full rounded-2xl py-3.5 font-heading text-sm font-bold"
          style={{ background: "#00111B", color: "#FFFFFC" }}
          whileTap={{ scale: 0.97 }}
          onClick={onDismiss}
        >
          {isAr ? "متابعة رحلتك" : "Continue your journey"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── ShopScreen ────────────────────────────────────────────────────────────────

interface OwnedItem {
  itemSlug: string;
  itemKind: CosmeticKind;
  equippedAt: Date | null;
}

interface ShopScreenProps {
  locale: string;
  valCoins: number;
  ownedItems: OwnedItem[];
}

export default function ShopScreen({ locale, valCoins, ownedItems }: ShopScreenProps) {
  const isAr    = locale === "ar";
  const router  = useRouter();

  // Hydrate store
  const storeCoins  = useGameStore((s) => s.isHydrated ? s.valCoins : valCoins);
  const spendInStore = useGameStore((s) => s.awardCoins); // negative = spend
  const addToast    = useToastStore((s) => s.addToast);

  const [isPending, startTransition] = useTransition();
  const [balance, setBalance]        = useState(storeCoins);

  // Owned & equipped sets derived from ownedItems prop
  const ownedSet   = new Set(ownedItems.map((o) => o.itemSlug));
  const equippedMap: Record<string, string> = {};
  for (const o of ownedItems) {
    if (o.equippedAt) equippedMap[o.itemKind] = o.itemSlug;
  }

  // Confirm modal state
  const [confirm, setConfirm] = useState<null | {
    title: string; subtitle: string; slug: string;
    kind: CosmeticKind; price: number; isOwned: boolean;
  }>(null);

  // Donation success state
  const [donationSuccess, setDonationSuccess] = useState<null | { aed: number; charityName: string }>(null);

  const handleAction = useCallback((slug: string, kind: CosmeticKind, price: number, isOwned: boolean) => {
    const item =
      AVATAR_THEMES.find((i) => i.slug === slug) ??
      ROAD_SKINS.find((i) => i.slug === slug) ??
      STICKER_PACKS.find((i) => i.slug === slug);
    if (!item) return;
    const name = isAr ? item.nameAr : item.nameEn;
    setConfirm({
      title: isOwned ? (isAr ? "تفعيل" : "Equip") : (isAr ? "شراء" : "Buy"),
      subtitle: name,
      slug, kind, price, isOwned,
    });
  }, [isAr]);

  function handleConfirm() {
    if (!confirm) return;
    startTransition(async () => {
      if (confirm.isOwned) {
        const res = await equipCosmetic(confirm.slug, confirm.kind);
        if (res.success) {
          addToast({ type: "xp", amount: 0, label: isAr ? "تم التفعيل ✓" : "Equipped ✓" });
          router.refresh();
        }
      } else {
        const res = await purchaseCosmetic(confirm.slug, confirm.kind, confirm.price);
        if (res.success) {
          setBalance((b) => b - confirm.price);
          spendInStore(-confirm.price);
          addToast({ type: "coins", amount: confirm.price, label: isAr ? "تم الشراء!" : "Purchased!" });
          router.refresh();
        } else {
          addToast({ type: "xp", amount: 0, label: res.error ?? "Error" });
        }
      }
      setConfirm(null);
    });
  }

  function handleDonate(charity: Charity, coins: number) {
    startTransition(async () => {
      const res = await donateCoins(charity.slug, coins);
      if (res.success) {
        setBalance((b) => b - coins);
        spendInStore(-coins);
        setDonationSuccess({ aed: res.aedDonated ?? coinsToAed(coins), charityName: isAr ? charity.nameAr : charity.nameEn });
        router.refresh();
      } else {
        addToast({ type: "xp", amount: 0, label: res.error ?? "Error" });
      }
    });
  }

  const tabLabels = {
    avatars:  { en: "Avatars",  ar: "الشخصية" },
    skins:    { en: "Skins",    ar: "المظهر"   },
    stickers: { en: "Stickers", ar: "ملصقات"   },
    donate:   { en: "Donate",   ar: "تبرع"     },
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "linear-gradient(180deg, #FFFFFC 0%, #F5FAF6 35%, #E9F4EC 75%, #DCEEDF 100%)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Sticky header ───────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(248,250,252,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,17,27,0.07)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
          <Link
            href={`/${locale}/journey`}
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
            aria-label={isAr ? "العودة" : "Back"}
          >
            <ArrowLeft className="size-5" style={{ color: "#475569" }} />
          </Link>
          <div className="flex-1">
            <p className="font-heading text-base font-bold" style={{ color: "#00111B" }}>
              {isAr ? "المتجر" : "Shop"}
            </p>
          </div>
          {/* Coin balance */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
          >
            <CoinIcon size={15} />
            <span className="font-heading text-sm font-bold tabular-nums" style={{ color: "#D97706" }}>
              {balance.toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div
        className="mx-auto w-full max-w-5xl px-6 pt-5 pb-4"
      >
        <div
          className="rounded-3xl px-5 py-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
        >
          <div className="flex size-12 items-center justify-center rounded-2xl"
            style={{ background: "rgba(180,227,200,0.15)" }}>
            <Sparkles className="size-6" style={{ color: "#B4E3C8" }} />
          </div>
          <div>
            <p className="font-heading text-sm font-bold" style={{ color: "#FFFFFC" }}>
              {isAr ? "مكافآتك، قيمتك" : "Your rewards, your values"}
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: "#B4E3C8" }}>
              {isAr
                ? "أنفق عملاتك على المظاهر أو تبرع لمن يحتاج"
                : "Spend coins on looks — or give to those who need it"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl flex-1 pb-24">
        <Tabs defaultValue="avatars">
          <div className="mx-auto w-full max-w-5xl px-6 pb-3 sticky top-16 z-30"
            style={{ background: "rgba(248,250,252,0.95)", backdropFilter: "blur(8px)" }}>
            <TabsList className="w-full">
              {(["avatars", "skins", "stickers", "donate"] as const).map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tabLabels[tab][isAr ? "ar" : "en"]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="avatars">
            <AvatarTab
              locale={locale}
              balance={balance}
              owned={ownedSet}
              equippedSlug={equippedMap["AVATAR_THEME"] ?? null}
              onAction={handleAction}
            />
          </TabsContent>

          <TabsContent value="skins">
            <RoadSkinsTab
              locale={locale}
              owned={ownedSet}
              equippedSlug={equippedMap["ROAD_SKIN"] ?? null}
              onAction={handleAction}
            />
          </TabsContent>

          <TabsContent value="stickers">
            <StickerPacksTab
              locale={locale}
              owned={ownedSet}
              onAction={handleAction}
            />
          </TabsContent>

          <TabsContent value="donate">
            <DonateTab
              locale={locale}
              balance={balance}
              onDonate={handleDonate}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Confirm modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {confirm && (
          <ConfirmModal
            key="confirm"
            title={confirm.title}
            subtitle={confirm.subtitle}
            cost={confirm.price}
            balance={balance}
            ctaLabel={confirm.isOwned ? (isAr ? "تفعيل" : "Equip") : (isAr ? "شراء" : "Buy")}
            onConfirm={handleConfirm}
            onCancel={() => setConfirm(null)}
            isPending={isPending}
            locale={locale}
          />
        )}
      </AnimatePresence>

      {/* ── Donation success ─────────────────────────────────────────── */}
      <AnimatePresence>
        {donationSuccess && (
          <DonationSuccess
            key="donation-success"
            aed={donationSuccess.aed}
            charityName={donationSuccess.charityName}
            locale={locale}
            onDismiss={() => setDonationSuccess(null)}
          />
        )}
      </AnimatePresence>

      <BottomNav locale={locale} />
    </div>
  );
}
