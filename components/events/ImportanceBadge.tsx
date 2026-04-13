"use client";
import { Importance } from "@/lib/events";

const styles: Record<Importance, string> = {
  high: "bg-red-100 text-red-700 border border-red-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  low: "bg-gray-100 text-gray-600 border border-gray-200",
};

const labels: Record<Importance, string> = {
  high: "High Impact",
  medium: "Medium",
  low: "Low",
};

export function ImportanceBadge({ importance }: { importance: Importance }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[importance]}`}>
      {importance === "high" && <span className="mr-1">⚡</span>}
      {labels[importance]}
    </span>
  );
}
