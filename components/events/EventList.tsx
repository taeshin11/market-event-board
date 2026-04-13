"use client";
import { useState } from "react";
import { MarketEvent, EventType } from "@/lib/events";
import { EventCard } from "./EventCard";

const typeFilters: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Earnings", value: "earnings" },
  { label: "FOMC / Fed", value: "fed" },
  { label: "Macro", value: "macro" },
  { label: "Dividends", value: "dividend" },
  { label: "IPOs", value: "ipo" },
];

export function EventList({ events }: { events: MarketEvent[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter as EventType);
  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6">
        {typeFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[var(--accent)] text-white"
                : "bg-white text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="text-[var(--text-muted)] text-center py-8">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
