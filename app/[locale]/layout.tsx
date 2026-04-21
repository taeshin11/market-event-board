import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: "Economic Calendar & Market Events | MarketEventBoard",
    template: "%s | MarketEventBoard",
  },
  description:
    "Track market-moving events: CPI, Fed meetings, NFP jobs report, GDP releases, earnings seasons, and more. Never miss a market-moving economic event.",
  keywords: [
    "economic calendar",
    "market events",
    "CPI release date",
    "Fed meeting calendar",
    "NFP jobs report",
    "earnings calendar",
    "GDP release",
    "market moving events",
  ],
  metadataBase: new URL("https://market-event-board.vercel.app"),
  alternates: {
    canonical: "https://market-event-board.vercel.app/en",
    languages: {
      en: "/en",
      ko: "/ko",
      ja: "/ja",
      zh: "/zh",
      es: "/es",
      fr: "/fr",
      de: "/de",
      pt: "/pt",
    },
  },
  openGraph: {
    type: "website",
    siteName: "MarketEventBoard",
    title: "Economic Calendar & Market Events | MarketEventBoard",
    description:
      "Track market-moving events: CPI, Fed meetings, NFP jobs report, GDP releases, earnings seasons, and more.",
    url: "https://market-event-board.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Economic Calendar & Market Events | MarketEventBoard",
    description:
      "Track market-moving events: CPI, Fed meetings, NFP jobs report, GDP releases, earnings seasons, and more. Never miss a market-moving economic event.",
  },
  other: {
    "google-adsense-account": "ca-pub-7098271335538021",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="MarketEventBoard" />
      <Footer />
    </NextIntlClientProvider>
  );
}
