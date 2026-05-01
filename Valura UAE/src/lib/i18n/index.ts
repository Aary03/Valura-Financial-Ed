// i18n helpers — locale detection, RTL utilities, number/date formatting
export type Locale = "en" | "ar";

/**
 * Check if a locale uses right-to-left text direction.
 */
export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

/**
 * Format a number with locale-aware digits.
 * Arabic uses Eastern Arabic-Indic numerals (٠١٢٣…).
 */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE").format(value);
}

/**
 * Format a date with locale-aware representation.
 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
