import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import AuthProvider from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
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

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "Aldar × Valura Atlas | رحلة الصحة المالية"
    : "Aldar × Valura Atlas | Financial Wellness Journey";
  const description = isAr
    ? "رحلة للصحة المالية للجميع في الإمارات — ثنائية اللغة، متوافقة مع الشريعة."
    : "A bilingual, Sharia-aware financial wellness platform built for everyone in the UAE.";
  return {
    title,
    description,
    metadataBase: new URL("https://valura.ae"),
    openGraph: {
      title,
      description,
      siteName: "Aldar × Valura Atlas",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const session = await auth();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${bricolage.variable} ${manrope.variable} ${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-body antialiased">
        <AuthProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
