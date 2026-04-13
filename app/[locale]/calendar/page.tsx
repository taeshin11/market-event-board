import { getTranslations } from "next-intl/server";
import { getAllEvents } from "@/lib/events";
import { EventCalendar } from "@/components/events/EventCalendar";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Events Calendar — Monthly View",
    description: "Monthly calendar view of all market events — earnings, dividends, FOMC meetings, and economic data releases.",
    alternates: { canonical: `https://market-event-board.vercel.app/${locale}/calendar` },
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calendar" });
  const events = getAllEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("title")}</h1>
        <p className="text-[var(--text-muted)]">{t("subtitle")}</p>
      </div>
      <div className="bg-white rounded-xl border border-[var(--border)] p-6">
        <EventCalendar events={events} />
      </div>
    </div>
  );
}
