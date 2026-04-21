import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-2">MarketEventBoard</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Free economic calendar for traders and investors. Track CPI, FOMC meetings, NFP jobs
              reports, earnings, dividends, and more. Never miss a market-moving event.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Event Types</h4>
            <ul className="text-sm text-[var(--text-muted)] space-y-1">
              <li>Earnings Reports</li>
              <li>Dividend Ex-Dates</li>
              <li>FOMC / Fed Events</li>
              <li>Macro Data (CPI, NFP, GDP)</li>
              <li>IPOs &amp; Treasury Auctions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Resources</h4>
            <ul className="text-sm space-y-1">
              <li>
                <Link
                  href="/en/about"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  About MarketEventBoard
                </Link>
              </li>
              <li>
                <Link
                  href="/en/how-to-use"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  How to Use an Economic Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/en/privacy"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/en/terms"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Official Sources</h4>
            <ul className="text-sm space-y-1">
              {[
                { label: "BLS — bls.gov", href: "https://www.bls.gov" },
                { label: "BEA — bea.gov", href: "https://www.bea.gov" },
                { label: "Federal Reserve — federalreserve.gov", href: "https://www.federalreserve.gov" },
                { label: "U.S. Treasury — treasury.gov", href: "https://home.treasury.gov" },
              ].map((src) => (
                <li key={src.href}>
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--border)] mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} MarketEventBoard. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-[var(--text-muted)]">
            <Link href="/en/privacy" className="hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
            <Link href="/en/terms" className="hover:text-[var(--accent)] transition-colors">
              Terms
            </Link>
            <span>Data for informational purposes only. Not financial advice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
