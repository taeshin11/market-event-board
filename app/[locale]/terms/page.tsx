import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Use | MarketEventBoard",
    description:
      "MarketEventBoard terms of use. Our economic calendar is for informational purposes only and does not constitute financial or investment advice.",
    alternates: {
      canonical: `https://market-event-board.vercel.app/${locale}/terms`,
      languages: {
        en: "/en/terms",
        ko: "/ko/terms",
        ja: "/ja/terms",
        zh: "/zh/terms",
        es: "/es/terms",
        fr: "/fr/terms",
        de: "/de/terms",
        pt: "/pt/terms",
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Terms of Use</h1>
      <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: April 13, 2026</p>

      <div className="space-y-8 text-[var(--text-muted)]">
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using MarketEventBoard at https://market-event-board.vercel.app (the
            "Service"), you agree to be bound by these Terms of Use. If you do not agree with any part
            of these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            2. Informational Purposes Only — Not Financial Advice
          </h2>
          <div className="card border-l-4 border-red-500 mb-4">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Important Disclaimer: MarketEventBoard provides an economic events calendar for
              informational purposes only. Nothing on this site constitutes financial, investment,
              trading, legal, or tax advice. You should not make any financial decision based solely
              on information found on this Service.
            </p>
          </div>
          <p>
            All content — including event dates, market impact ratings, and event descriptions — is
            provided "as is" without warranty of any kind. Always consult a qualified financial advisor
            before making investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            3. Verify Event Dates with Official Sources
          </h2>
          <p className="mb-2">
            Economic data release dates, Federal Reserve meeting schedules, and other event dates are
            subject to change. Before making any financial decision based on an event date, always
            verify with the relevant official source:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>
              CPI, PPI, NFP, and related data:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                Bureau of Labor Statistics — bls.gov
              </span>
            </li>
            <li>
              GDP, Personal Income:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                Bureau of Economic Analysis — bea.gov
              </span>
            </li>
            <li>
              FOMC meetings, Fed Funds Rate:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                Federal Reserve — federalreserve.gov
              </span>
            </li>
            <li>
              Treasury auctions:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                U.S. Treasury — home.treasury.gov
              </span>
            </li>
            <li>
              Earnings dates:{" "}
              <span className="text-[var(--text-primary)] font-medium">SEC EDGAR — sec.gov/edgar</span>
            </li>
          </ul>
          <p className="mt-2">
            MarketEventBoard makes reasonable efforts to keep dates accurate but cannot guarantee that
            all information is current, complete, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            4. Trading Around Events Involves Significant Risk
          </h2>
          <p>
            Trading or investing in financial markets around economic events carries significant risk,
            including the risk of total loss of capital. Market reactions to economic data releases can
            be sudden, severe, and contrary to consensus expectations. Past market behavior around
            specific events does not guarantee future results. MarketEventBoard is not responsible for
            any financial losses incurred in connection with use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            5. Permitted Use
          </h2>
          <p>
            You may use the Service for personal, non-commercial informational purposes. You may not
            scrape, republish, or redistribute content from the Service in bulk without written
            permission. You may not use the Service to engage in any activity that violates applicable
            laws or regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            6. Intellectual Property
          </h2>
          <p>
            The Service and its original content (excluding publicly sourced economic data dates), design,
            and code are the property of MarketEventBoard and are protected by applicable intellectual
            property laws. Event dates derived from official government publications are in the public
            domain.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, MarketEventBoard and its operators shall
            not be liable for any indirect, incidental, special, consequential, or punitive damages,
            including without limitation loss of profits, data, use, goodwill, or other intangible
            losses, resulting from your use of or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            8. Third-Party Services
          </h2>
          <p>
            The Service may display advertisements served by Google AdSense and may include links to
            third-party websites. These third parties have their own terms of service and privacy
            policies, which you should review. MarketEventBoard is not responsible for the content or
            practices of any third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            9. Modifications
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Material changes will be indicated
            by an updated "Last updated" date. Continued use of the Service after any changes constitutes
            your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law, without
            regard to conflict of law provisions. Any disputes arising from these Terms or your use of
            the Service shall be resolved in the appropriate courts of competent jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}
