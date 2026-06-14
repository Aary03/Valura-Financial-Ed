import Link from "next/link";
import Wordmark from "@/components/brand/Wordmark";

export default function SiteFooter() {
  return (
    <footer className="px-5 py-12 sm:px-8" style={{ borderTop: "1px solid var(--line)", background: "var(--bg-soft)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div className="max-w-md space-y-3">
          <Wordmark variant="full" size="sm" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--fg-3)", lineHeight: 1.65 }}>
            Educational only — not investment, tax, or legal advice. Examples and rates are
            illustrative and current as of 2026; rules change. Confirm specifics with a SEBI-registered
            advisor or a qualified tax professional before you invest.
          </p>
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <Link key={l} href="#" className="footer-link">
              {l}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--fg-3)" }}>
        © {new Date().getFullYear()} Valura · Atlas
      </div>
    </footer>
  );
}
