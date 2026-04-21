import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Use an Economic Calendar | MarketEventBoard Guide",
    description:
      "Learn how to use MarketEventBoard's economic calendar to track CPI, NFP, Fed meetings, and earnings. Step-by-step guide plus FAQ for traders and investors.",
    alternates: {
      canonical: `https://market-event-board.vercel.app/${locale}/how-to-use`,
      languages: {
        en: "/en/how-to-use",
        ko: "/ko/how-to-use",
        ja: "/ja/how-to-use",
        zh: "/zh/how-to-use",
        es: "/es/how-to-use",
        fr: "/fr/how-to-use",
        de: "/de/how-to-use",
        pt: "/pt/how-to-use",
      },
    },
  };
}

const faqs = [
  {
    q: "What is an economic calendar?",
    a: "An economic calendar is a schedule of upcoming economic data releases, central bank decisions, and other events that are known to move financial markets. Traders and investors use it to anticipate volatility, adjust positions, and plan strategies around high-impact events such as CPI inflation reports, jobs data, and Federal Reserve meetings.",
  },
  {
    q: "What is the most important economic report?",
    a: "There is no single answer, as importance varies by market conditions. During periods of inflation concern, CPI (Consumer Price Index) is often the highest-impact release. In a slowdown, GDP and NFP (Non-Farm Payrolls) dominate. Federal Reserve policy decisions consistently rank among the most market-moving events regardless of the cycle, since they directly set the cost of capital for the entire economy.",
  },
  {
    q: "How does CPI affect the stock market?",
    a: "CPI measures consumer price inflation. A higher-than-expected CPI print typically signals the Fed may keep rates elevated or raise them further, which pressures equity valuations — particularly growth and tech stocks — because future earnings are discounted at a higher rate. A lower-than-expected CPI can spark a rally by raising hopes of rate cuts. The market reacts most strongly to the 'surprise' relative to consensus expectations, not the absolute level.",
  },
  {
    q: "What is the NFP report?",
    a: "NFP stands for Non-Farm Payrolls, the monthly employment report published by the Bureau of Labor Statistics on the first Friday of each month. It reports the net change in jobs across all non-agricultural sectors, along with the unemployment rate and average hourly earnings. NFP is one of the most-watched economic releases because labor market strength directly informs Federal Reserve policy and consumer spending outlook.",
  },
  {
    q: "What is a Fed blackout period?",
    a: "The Federal Reserve imposes a communications blackout on policymakers starting roughly 10 days before each FOMC meeting and ending the day after. During this window, Fed officials do not make public statements about monetary policy. Traders watch for the blackout period because it removes a key source of policy guidance, making the official FOMC statement and press conference even more significant for markets.",
  },
  {
    q: "What is options expiration (OPEX)?",
    a: "Options expiration (OPEX) is the date on which listed options contracts expire and become worthless if not exercised. Monthly standard expiration falls on the third Friday of each month. Quarterly expirations — and the combined stock index futures, stock futures, stock options, and stock index options expirations known as quadruple witching — occur in March, June, September, and December. OPEX dates frequently bring elevated trading volume and price volatility as dealers hedge and rebalance large positions.",
  },
  {
    q: "How does the jobs report affect markets?",
    a: "A strong jobs report (more jobs added, lower unemployment) can be bullish for the economy but bearish for bonds and sometimes equities, because strong employment reduces the urgency for Fed rate cuts. A weak jobs report can do the opposite. The 'Goldilocks' scenario — moderate job growth that keeps the economy healthy without reigniting inflation — tends to be the most market-friendly outcome.",
  },
  {
    q: "What is a high-impact vs low-impact event?",
    a: "High-impact events are releases or decisions that historically produce large, fast moves in prices across multiple asset classes — equities, bonds, currencies, and commodities. Examples include FOMC rate decisions, CPI, NFP, and GDP. Low-impact events have a narrower or smaller historical effect and are usually watched only within specific sectors. MarketEventBoard labels each event by importance so you can prioritize accordingly.",
  },
  {
    q: "How do I trade around economic events?",
    a: "Common approaches include: (1) Trading the move — entering a position before an event and exiting quickly after the data prints. This carries the risk of the move going against you or gaps. (2) Fading the initial move — waiting for the first knee-jerk reaction to exhaust itself and then trading in the opposite direction. (3) Avoiding — reducing or closing positions before a high-impact event to remove binary risk. Always use appropriate position sizing and stop-losses. Economic events carry significant risk and actual outcomes frequently differ from consensus.",
  },
  {
    q: "What is market volatility around events?",
    a: "Market volatility refers to the speed and magnitude of price changes. Around high-impact economic events, implied volatility (as measured by instruments like the VIX for equities) often rises in the days before a release as traders pay more for options protection. After the event, volatility typically compresses rapidly — a phenomenon options traders call a 'volatility crush.' Understanding this dynamic is important whether you are trading options or simply sizing a directional trade.",
  },
];

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
          How to Use MarketEventBoard
        </h1>
        <p className="text-lg text-[var(--text-muted)] mb-10">
          Get the most out of your economic calendar in three simple steps — then find answers to the
          most common questions about market events.
        </p>

        {/* 3-step guide */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Getting Started in 3 Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Browse the Calendar",
                desc: 'Navigate to the Calendar tab to see all upcoming events sorted by date. Use the filter bar to narrow by event type — earnings, macro, dividends, IPOs — or by importance level (High / Medium / Low).',
              },
              {
                step: "2",
                title: "Watch High-Impact Events",
                desc: 'Focus on events marked High Impact first. These are the releases — CPI, NFP, FOMC decisions, GDP — that have historically moved markets by 1% or more. Plan your schedule and portfolio exposure around these dates.',
              },
              {
                step: "3",
                title: "Verify with Official Sources",
                desc: 'Before making any trade or investment decision based on an event date, confirm it with the official publishing agency (BLS, Fed, BEA, SEC). Dates can shift due to government holidays or scheduling changes.',
              },
            ].map((item) => (
              <div key={item.step} className="card">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
