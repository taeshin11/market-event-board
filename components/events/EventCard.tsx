"use client";
import { MarketEvent, getCategoryStyle } from "@/lib/events";
import { ImportanceBadge } from "./ImportanceBadge";

const typeLabel: Record<string, string> = {
  earnings: "Earnings",
  fed: "FOMC / Fed",
  macro: "Macro",
  dividend: "Dividend",
  ipo: "IPO",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function EventCard({ event }: { event: MarketEvent }) {
  const cat = getCategoryStyle(event.type);

  return (
    <div
      className="card flex flex-col gap-2 hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${cat.color}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
            style={{ backgroundColor: cat.bgColor, color: cat.textColor }}
          >
            {typeLabel[event.type]}
          </span>
          {event.ticker && (
            <span className="font-bold text-sm" style={{ color: cat.color }}>
              {event.ticker}
            </span>
          )}
        </div>
        <ImportanceBadge importance={event.importance} />
      </div>

      <div>
        <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight">
          {event.name}
        </h3>
        <p className="text-[var(--text-muted)] text-xs mt-1 line-clamp-2">
          {event.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>{formatDate(event.date)}</span>
          {event.time && (
            <>
              <span>·</span>
              <span>{event.time}</span>
            </>
          )}
        </div>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent)] hover:underline"
          >
            More →
          </a>
        )}
      </div>
    </div>
  );
}
