export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-2">📊 MarketEventBoard</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Free market events calendar for traders and investors. Track earnings, dividends, FOMC
              meetings and economic data releases.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Event Types</h4>
            <ul className="text-sm text-[var(--text-muted)] space-y-1">
              <li>📈 Earnings Reports</li>
              <li>💵 Dividend Ex-Dates</li>
              <li>🏛 FOMC / Fed Events</li>
              <li>📊 Macro Data (CPI, NFP, GDP)</li>
              <li>🚀 IPOs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Visitor Counter</h4>
            <div className="text-sm text-[var(--text-muted)] space-y-1">
              <p>Visitors today: <span className="font-semibold text-[var(--accent)]">—</span></p>
              <p>Total visitors: <span className="font-semibold text-[var(--accent)]">—</span></p>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">© 2025 MarketEventBoard. All rights reserved.</p>
          <p className="text-xs text-[var(--text-muted)]">
            Data is for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
