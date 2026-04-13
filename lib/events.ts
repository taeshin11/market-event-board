import eventsData from "@/data/events-fallback.json";
import categoriesData from "@/data/categories-fallback.json";

export type EventType = "earnings" | "fed" | "macro" | "dividend" | "ipo";
export type Importance = "high" | "medium" | "low";

export interface MarketEvent {
  id: string;
  date: string;
  time: string;
  type: EventType;
  ticker: string | null;
  name: string;
  description: string;
  importance: Importance;
  link: string;
}

export interface Category {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export function getAllEvents(): MarketEvent[] {
  return eventsData as MarketEvent[];
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getEventsByType(type: EventType): MarketEvent[] {
  return getAllEvents().filter((e) => e.type === type);
}

export function getEventsByDateRange(start: string, end: string): MarketEvent[] {
  return getAllEvents().filter((e) => e.date >= start && e.date <= end);
}

export function getThisWeekEvents(): MarketEvent[] {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 6);

  const fmt = (d: Date) => d.toISOString().split("T")[0];
  return getEventsByDateRange(fmt(monday), fmt(friday));
}

export function getNextWeekEvents(): MarketEvent[] {
  const now = new Date();
  const day = now.getDay();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + 7);
  const nextFriday = new Date(nextMonday);
  nextFriday.setDate(nextMonday.getDate() + 6);

  const fmt = (d: Date) => d.toISOString().split("T")[0];
  return getEventsByDateRange(fmt(nextMonday), fmt(nextFriday));
}

export function getHighImportanceEvents(): MarketEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return getAllEvents()
    .filter((e) => e.importance === "high" && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 10);
}

export function getEventsByMonth(year: number, month: number): MarketEvent[] {
  const pad = (n: number) => String(n).padStart(2, "0");
  const start = `${year}-${pad(month)}-01`;
  const end = `${year}-${pad(month)}-31`;
  return getEventsByDateRange(start, end);
}

export function getCategoryStyle(type: EventType): Category {
  const cats = getCategories();
  return cats.find((c) => c.id === type) ?? cats[0];
}
