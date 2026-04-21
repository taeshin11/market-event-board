import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getAllEvents, getThisWeekEvents, getHighImportanceEvents } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { EventList } from "@/components/events/EventList";
import Link from "next/link";
import type { Metadata } from "next";

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Market Events Calendar — Earnings, Dividends & FOMC",
    description:
      "Track earnings reports, dividend ex-dates, FOMC meetings, CPI, jobs reports and more in one free financial calendar.",
    alternates: {
      canonical: `https://market-event-board.vercel.app/${locale}`,
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
  };
}

function HeroSection() {
  const t = useTranslations("home");
  return (
    <section className="bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("hero_title")}</h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">{t("hero_subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Earnings", "Dividends", "FOMC", "CPI", "NFP", "IPOs"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "MarketEventBoard",
        url: "https://market-event-board.vercel.app",
        description: "Free market events calendar — earnings, dividends, FOMC and macro data.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://market-event-board.vercel.app/en/earnings?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is MarketEventBoard?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "MarketEventBoard is a free financial events calendar that aggregates earnings reports, dividend ex-dates, FOMC meetings, and economic data releases in one place.",
            },
          },
          {
            "@type": "Question",
            name: "What event types does MarketEventBoard track?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We track earnings reports, dividend ex-dates, Federal Reserve (FOMC) meetings, CPI inflation releases, jobs reports (NFP), GDP data, PPI, retail sales, and IPOs.",
            },
          },
          {
            "@type": "Question",
            name: "Is MarketEventBoard free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, MarketEventBoard is completely free. No account or subscription required.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const thisWeek = getThisWeekEvents();
  const highImpact = getHighImportanceEvents();
  const allEvents = getAllEvents();

  return (
    <>
      <SchemaOrg />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Events", value: allEvents.length, color: "var(--accent)" },
            { label: "This Week", value: thisWeek.length, color: "#7c3aed" },
            { label: "High Impact", value: highImpact.length, color: "#dc2626" },
            { label: "Upcoming IPOs", value: allEvents.filter((e) => e.type === "ipo").length, color: "#0284c7" },
          ].map((stat) => (
            <div key={stat.label} className="card text-center">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* This week */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("this_week")}</h2>
            <Link href={`/${locale}/calendar`} className="text-sm text-[var(--accent)] hover:underline">
              {t("view_all")} →
            </Link>
          </div>
          {thisWeek.length === 0 ? (
            <p className="text-[var(--text-muted)]">{t("no_events")}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {thisWeek.slice(0, 6).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* High impact upcoming */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("upcoming_high")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highImpact.slice(0, 9).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* All events with filter */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">All Upcoming Events</h2>
          <EventList events={allEvents.filter((e) => e.date >= new Date().toISOString().split("T")[0])} />
        </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />
      </div>
    </>
  );
}
