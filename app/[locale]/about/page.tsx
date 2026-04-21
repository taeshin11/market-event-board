import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About MarketEventBoard — Economic Calendar & Market Event Tracker",
    description:
      "MarketEventBoard tracks market-moving events including CPI/PPI releases, Fed FOMC decisions, NFP jobs reports, GDP releases, earnings announcements, Treasury auctions, and options expiration dates.",
    alternates: {
      canonical: `https://market-event-board.vercel.app/${locale}/about`,
      languages: {
        en: "/en/about",
        ko: "/ko/about",
        ja: "/ja/about",
        zh: "/zh/about",
        es: "/es/about",
        fr: "/fr/about",
        de: "/de/about",
        pt: "/pt/about",
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
        About MarketEventBoard
      </h1>
      <p className="text-lg text-[var(--text-muted)] mb-10">
        Your comprehensive economic calendar for tracking every market-moving event — all in one place,
        completely free.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">What We Track</h2>
        <p className="text-[var(--text-muted)] mb-6">
          MarketEventBoard aggregates the economic data releases, policy decisions, and corporate events
          that move markets. Whether you are a day trader, long-term investor, or economic analyst,
          missing a key event can be costly. We make sure you never miss one.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "CPI & PPI Releases",
              desc: "Consumer Price Index and Producer Price Index reports published by the Bureau of Labor Statistics (BLS). These inflation gauges directly influence Federal Reserve policy and equity valuations.",
            },
            {
              title: "Fed FOMC Decisions",
              desc: "Federal Open Market Committee meeting dates, interest rate decisions, and the Fed Chair press conferences. FOMC meetings are among the highest-impact events for all asset classes.",
            },
            {
              title: "NFP Jobs Reports",
              desc: "The monthly Non-Farm Payrolls report, unemployment rate, and labor force participation. Released the first Friday of every month, NFP is one of the most watched economic indicators.",
            },
            {
              title: "GDP Releases",
              desc: "Advance, Preliminary, and Final GDP estimates from the Bureau of Economic Analysis (BEA), giving a comprehensive picture of economic growth.",
            },
            {
              title: "Earnings Announcements",
              desc: "Quarterly earnings reports from S&P 500 companies and beyond. Track EPS estimates, revenue expectations, and guidance updates.",
            },
            {
              title: "Treasury Auctions",
              desc: "U.S. Treasury bill, note, and bond auctions that affect yields and influence equity and currency markets globally.",
            },
            {
              title: "Options Expiration (OPEX)",
              desc: "Monthly and quarterly options expiration dates, including triple/quadruple witching, which often produce elevated market volatility.",
            },
            {
              title: "Geopolitical & Other Events",
              desc: "IPO dates, dividend ex-dates, central bank meetings from the ECB, BOJ, BOE, and other major institutions whose decisions ripple through global markets.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Who It Is For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              role: "Traders",
              desc: "Position sizing around key events, avoiding overnight risk into major releases, understanding volatility windows.",
            },
            {
              role: "Investors",
              desc: "Earnings season planning, dividend capture strategies, understanding macro backdrop for long-term allocation decisions.",
            },
            {
              role: "Economic Analysts",
              desc: "Consensus tracking, historical comparison, policy cycle analysis across FOMC, BLS, BEA, and other data sources.",
            },
          ].map((item) => (
            <div key={item.role} className="card">
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.role}</h3>
              <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Our Mission</h2>
        <p className="text-[var(--text-muted)]">
          MarketEventBoard exists to democratize access to the financial event information that
          professional traders and institutional investors rely on every day. By consolidating CPI dates,
          Fed schedules, NFP releases, earnings calendars, and more into a single, easy-to-use interface
          — available in 8 languages — we level the playing field for retail participants worldwide.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">Data Sources</h2>
        <p className="text-[var(--text-muted)] mb-2">
          Event dates are sourced from or cross-referenced against official primary sources including:
        </p>
        <ul className="list-disc list-inside text-[var(--text-muted)] space-y-1 text-sm">
          <li>Bureau of Labor Statistics (BLS) — bls.gov</li>
          <li>Bureau of Economic Analysis (BEA) — bea.gov</li>
          <li>Federal Reserve — federalreserve.gov</li>
          <li>U.S. Treasury — home.treasury.gov</li>
          <li>SEC EDGAR — sec.gov/edgar</li>
          <li>Exchange operator calendars (NYSE, Nasdaq)</li>
        </ul>
        <p className="text-sm text-[var(--text-muted)] mt-4">
          Always verify event dates with the official source before making financial decisions.
        </p>
      </section>
    </div>
  );
}
