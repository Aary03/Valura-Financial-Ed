import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx support.
 * Standard shadcn/ui pattern.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format VAL Coins with locale-aware number formatting.
 */
export function formatCoins(amount: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE").format(amount);
}

/**
 * Return the correct text field based on locale.
 */
export function localise(
  obj: { titleEn?: string; titleAr?: string; nameEn?: string; nameAr?: string },
  locale: string
): string {
  if (locale === "ar") {
    return obj.titleAr ?? obj.nameAr ?? "";
  }
  return obj.titleEn ?? obj.nameEn ?? "";
}
