import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketEventBoard — Earnings, Dividends & Macro Events Calendar",
  description:
    "Free market events calendar. Track earnings reports, dividend ex-dates, FOMC meetings, CPI, jobs reports and more — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
