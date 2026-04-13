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
    title: "Dividend Calendar 2025 — Ex-Dividend Dates",
    description: "Track ex-dividend dates for AAPL, MSFT, JNJ, KO, JPM, XOM, CVX and other major stocks. Never miss a dividend payment.",
    alternates: { canonical: `https://market-event-board.vercel.app/${locale}/dividends` },
  };
}

export default async function DividendsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dividends" });
  const dividends = getEventsByType("dividend").sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("title")}</h1>
        <p className="text-[var(--text-muted)]">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-[#059669]">{dividends.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Ex-Div Events</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-[var(--text-primary)]">Apr–Jun</p>
          <p className="text-sm text-[var(--text-muted)]">Coverage</p>
        </div>
        <div className="card text-center col-span-2">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Ex-dividend date is the cutoff to be on the shareholder record. Purchase shares before this date to receive the dividend.
          </p>
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg)]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Ticker</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Company</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Ex-Date</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {dividends.map((event) => (
              <tr key={event.id} className="hover:bg-[var(--bg)] transition-colors">
                <td className="px-4 py-3 font-bold text-[#059669]">{event.ticker}</td>
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{event.name}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] text-xs max-w-xs truncate">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card grid */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Card View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dividends.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
