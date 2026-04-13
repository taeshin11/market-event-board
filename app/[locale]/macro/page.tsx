import { getTranslations } from "next-intl/server";
import { getAllEvents } from "@/lib/events";
import { EventCard } from "@/components/events/EventCard";
import { ImportanceBadge } from "@/components/events/ImportanceBadge";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "FOMC Meeting Dates 2025 — Macro Economic Events Calendar",
    description: "FOMC meeting dates 2025, CPI inflation releases, NFP jobs report dates, GDP revisions, PCE data and other key macroeconomic events.",
    alternates: { canonical: `https://market-event-board.vercel.app/${locale}/macro` },
  };
}

export default async function MacroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "macro" });
  const allEvents = getAllEvents();
  const macroEvents = allEvents
    .filter((e) => e.type === "macro" || e.type === "fed")
    .sort((a, b) => a.date.localeCompare(b.date));
  const fomcEvents = macroEvents.filter((e) => e.type === "fed");

  const schemaEvents = fomcEvents.map((e) => ({
    "@type": "Event",
    name: e.name,
    startDate: e.date,
    startTime: e.time,
    description: e.description,
    organizer: { "@type": "Organization", name: "Federal Reserve", url: "https://www.federalreserve.gov" },
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: "Federal Reserve Board, Washington D.C." },
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "FOMC Meeting Dates 2025",
            itemListElement: schemaEvents,
          }),
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("title")}</h1>
        <p className="text-[var(--text-muted)]">{t("subtitle")}</p>
      </div>

      {/* FOMC highlight */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <span className="text-red-600">🏛</span> FOMC Meeting Dates 2025
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {fomcEvents.map((event) => (
            <div key={event.id} className="card border-l-4 border-l-red-500">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">
                  FOMC Meeting
                </span>
                <ImportanceBadge importance={event.importance} />
              </div>
              <h3 className="font-bold text-[var(--text-primary)]">{event.name}</h3>
              <p className="text-[var(--text-muted)] text-sm mt-1">{event.description}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-muted)]">
                <span>
                  {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{event.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>Note:</strong> FOMC decisions are announced at 2:00 PM ET, followed by a press conference at 2:30 PM ET. Markets often experience volatility around these announcements.
        </div>
      </section>

      {/* All macro events */}
      <section>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">All Economic Data Releases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {macroEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
