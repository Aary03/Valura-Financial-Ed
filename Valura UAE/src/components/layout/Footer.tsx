import { useTranslations } from "next-intl";

/**
 * Footer — always renders the CBUAE-required educational disclaimer.
 * Per regulatory rules (CPR Article 9.1.1.1), every page must show this.
 */
export default function Footer() {
  const t = useTranslations("disclaimer");

  return (
    <footer className="w-full border-t border-[var(--border)] py-4 px-6 mt-auto">
      <p className="edu-disclaimer text-center text-xs text-[var(--muted)]">
        {t("footer")}
      </p>
    </footer>
  );
}
