"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Locale switcher — toggles between EN and AR, updating URL prefix.
 * RTL layout automatically flips when switching to Arabic.
 */
export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    // Replace locale segment in path: /en/... → /ar/...
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  return (
    <button
      onClick={toggle}
      aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1.5",
        "text-sm font-medium border border-[var(--border)]",
        "bg-[var(--surface)] text-[var(--foreground)]",
        "hover:border-green-500 hover:text-green-600 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
      )}
    >
      <span aria-hidden="true">{locale === "en" ? "🇦🇪" : "🇬🇧"}</span>
      <span>{locale === "en" ? "عربي" : "English"}</span>
    </button>
  );
}
