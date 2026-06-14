import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx support.
 * Standard shadcn/ui pattern.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an integer with Indian-style grouping (1,00,000). */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/** Format a number with thousands separators. */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}
