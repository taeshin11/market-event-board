"use client";
import { useState } from "react";
import { MarketEvent, getCategoryStyle } from "@/lib/events";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function EventCalendar({ events }: { events: MarketEvent[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-based
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // Group events by date
  const byDate: Record<string, MarketEvent[]> = {};
  events.forEach((e) => {
    if (!byDate[e.date]) byDate[e.date] = [];
    byDate[e.date].push(e);
  });

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStr = now.toISOString().split("T")[0];
  const selectedEvents = selectedDay ? (byDate[selectedDay] ?? []) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--bg)] transition-colors"
        >
          ← Prev
        </button>
        <h2 className="font-bold text-[var(--text-primary)] text-lg">
          {MONTHS[month - 1]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--bg)] transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-[var(--text-muted)] py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const dateStr = `${year}-${pad(month)}-${pad(day)}`;
          const dayEvents = byDate[dateStr] ?? [];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDay;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDay(isSelected ? null : dateStr)}
              className={`relative min-h-[60px] rounded-lg p-1 text-left transition-colors ${
                isToday ? "ring-2 ring-[var(--accent)]" : ""
              } ${isSelected ? "bg-[var(--accent)] text-white" : "bg-white hover:bg-[var(--bg)]"} border border-[var(--border)]`}
            >
              <span className={`text-xs font-semibold ${isSelected ? "text-white" : isToday ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                {day}
              </span>
              <div className="flex flex-wrap gap-0.5 mt-0.5">
                {dayEvents.slice(0, 3).map((e) => {
                  const cat = getCategoryStyle(e.type);
                  return (
                    <span
                      key={e.id}
                      className="block w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                      title={e.name}
                    />
                  );
                })}
                {dayEvents.length > 3 && (
                  <span className={`text-[10px] ${isSelected ? "text-white" : "text-[var(--text-muted)]"}`}>
                    +{dayEvents.length - 3}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day panel */}
      {selectedDay && (
        <div className="mt-6 card">
          <h3 className="font-bold text-[var(--text-primary)] mb-3">
            Events on {new Date(selectedDay + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          {selectedEvents.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">No events on this day.</p>
          ) : (
            <ul className="space-y-2">
              {selectedEvents.map((e) => {
                const cat = getCategoryStyle(e.type);
                return (
                  <li key={e.id} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div>
                      <span className="font-medium text-[var(--text-primary)]">{e.name}</span>
                      {e.ticker && <span className="ml-1 text-[var(--accent)] font-semibold">{e.ticker}</span>}
                      {e.time && <span className="ml-1 text-[var(--text-muted)]">· {e.time} ET</span>}
                      <p className="text-[var(--text-muted)] text-xs mt-0.5">{e.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {[
          { type: "earnings", label: "Earnings" },
          { type: "fed", label: "FOMC/Fed" },
          { type: "macro", label: "Macro" },
          { type: "dividend", label: "Dividend" },
          { type: "ipo", label: "IPO" },
        ].map(({ type, label }) => {
          const cat = getCategoryStyle(type as any);
          return (
            <div key={type} className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
