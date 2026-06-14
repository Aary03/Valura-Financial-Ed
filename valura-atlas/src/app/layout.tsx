import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, Inter } from "next/font/google";
import "@/app/globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valura.ai"),
  title: {
    default: "Valura Atlas — Global investing, mapped",
    template: "%s · Valura Atlas",
  },
  description:
    "The clearest way for Indian investors to understand global markets. Learn how to invest beyond India — the routes, the rules, the taxes, the why — in plain English.",
  openGraph: {
    title: "Valura Atlas — Global investing, mapped",
    description:
      "Learn how to invest beyond India — the routes, the rules, the taxes, the why — in plain English.",
    siteName: "Valura Atlas",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] font-body text-[var(--fg)] antialiased">
        {children}
      </body>
    </html>
  );
}
