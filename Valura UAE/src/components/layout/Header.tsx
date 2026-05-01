import Link from "next/link";
import { useTranslations } from "next-intl";
import { Coins } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";
import ContentTrackToggle from "./ContentTrackToggle";

/**
 * App header — navigation, locale switcher, content track toggle, and coin balance.
 * Server component wrapper; interactive children are client components.
 */
export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href={`/${locale}/map`}
          className="font-display text-xl font-bold text-navy tracking-tight"
          aria-label="Valura — go to journey map"
        >
          Valura
        </Link>

        {/* Right controls */}
        <nav className="flex items-center gap-3" aria-label="Main navigation">
          <ContentTrackToggle />
          <LocaleSwitcher />
          {/* Coin balance placeholder — populated by client wrapper */}
          <div
            className="flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold-dark"
            aria-label="VAL Coins balance"
          >
            <Coins className="size-4" aria-hidden="true" />
            <span id="coin-balance">—</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
