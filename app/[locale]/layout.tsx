import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MarketEventBoard — Earnings, Dividends & Macro Events Calendar",
    template: "%s | MarketEventBoard",
  },
  description:
    "Free market events calendar. Track earnings reports, dividend ex-dates, FOMC meetings, CPI, jobs reports and more.",
  metadataBase: new URL("https://market-event-board.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "MarketEventBoard",
    title: "MarketEventBoard — Earnings, Dividends & Macro Events Calendar",
    description: "Free market events calendar for traders and investors.",
    url: "https://market-event-board.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarketEventBoard",
    description: "Free market events calendar — earnings, dividends, FOMC and macro data.",
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
      <Footer />
    </NextIntlClientProvider>
  );
}
