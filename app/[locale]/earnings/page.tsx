import { getTranslations } from "next-intl/server";
import { getEventsByType } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Earnings Calendar Q2 2025 — Corporate Earnings Reports",
    description: "Q2 2025 earnings calendar. Track pre-market and after-hours earnings reports from AAPL, MSFT, GOOGL, NVDA, META, AMZN, TSLA and more.",
    alternates: { canonical: `https://market-event-board.vercel.app/${locale}/earnings` },
  };
}

const timeLabel: Record<string, string> = {
  "pre-market": "Pre-Market",
  "post-market": "After-Hours",
};

function groupByDate(events: ReturnType<typeof getEventsByType>) {
  const groups: Record<string, typeof events> = {};
  for (const e of events) {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default async function EarningsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "earnings" });
  const earnings = getEventsByType("earnings").sort((a, b) => a.date.localeCompare(b.date));
  const grouped = groupByDate(earnings);

  const schemaEvents = earnings.slice(0, 20).map((e) => ({
    "@type": "Event",
    name: `${e.name} Q1 2025 Earnings Report`,
    startDate: e.date,
    description: e.description,
    organizer: { "@type": "Corporation", name: e.name, tickerSymbol: e.ticker },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Earnings Calendar Q2 2025",
            itemListElement: schemaEvents,
          }),
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("title")}</h1>
        <p className="text-[var(--text-muted)]">{t("subtitle")}</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-[#7c3aed]">{earnings.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Total Reports</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-red-600">{earnings.filter((e) => e.importance === "high").length}</p>
          <p className="text-sm text-[var(--text-muted)]">High Impact</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-[var(--text-primary)]">{grouped.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Trading Days</p>
        </div>
      </div>

      {/* By date */}
      <div className="space-y-8">
        {grouped.map(([date, dayEvents]) => (
          <div key={date}>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border)]">
              {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
