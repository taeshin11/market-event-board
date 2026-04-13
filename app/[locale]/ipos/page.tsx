import { getTranslations } from "next-intl/server";
import { getEventsByType } from "@/lib/events";
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
    title: "Upcoming IPOs Q2 2025 — Initial Public Offerings Calendar",
    description: "Upcoming IPO calendar for Q2 2025. Track expected IPO dates for Klarna, Chime, StubHub and other major listings.",
    alternates: { canonical: `https://market-event-board.vercel.app/${locale}/ipos` },
  };
}

export default async function IPOsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ipos" });
  const ipos = getEventsByType("ipo").sort((a, b) => a.date.localeCompare(b.date));
  const highProfile = ipos.filter((e) => e.importance === "high");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("title")}</h1>
        <p className="text-[var(--text-muted)]">{t("subtitle")}</p>
      </div>

      {/* High-profile IPOs */}
      {highProfile.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span>🚀</span> High-Profile IPOs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highProfile.map((event) => (
              <div key={event.id} className="card border-l-4 border-l-[#0284c7]">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                    {event.ticker}
                  </span>
                  <ImportanceBadge importance={event.importance} />
                </div>
                <h3 className="font-bold text-[var(--text-primary)]">{event.name}</h3>
                <p className="text-[var(--text-muted)] text-sm mt-1">{event.description}</p>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                  Expected:{" "}
                  {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All IPOs */}
      <section>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">All Expected IPOs</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-6">
          <strong>Disclaimer:</strong> IPO dates are estimates and subject to change. Companies may delay or withdraw their IPO plans. Always verify with official sources before making investment decisions.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ipos.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
