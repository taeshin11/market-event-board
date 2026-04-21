# MarketEventBoard — PRD
## Project 24: Earnings, Dividends & Macro Events Calendar

---

## Overview

MarketEventBoard is a unified financial event calendar that combines earnings announcements, dividend ex-dates, and macroeconomic events (FOMC, CPI, jobs report, etc.) into a single, fast, SEO-optimized dashboard. It solves the fragmentation problem: traders and investors currently need multiple tools to track all market-moving events.

**Primary Value Proposition:** One free dashboard for every scheduled market event — earnings, dividends, FOMC, CPI, NFP, and more — sorted by today, this week, by ticker, sector, or event type.

---

## Target Users

- Retail equity traders tracking earnings season
- Income investors monitoring ex-dividend dates
- Macro traders and economists following Fed/CPI/jobs data
- Day traders checking what's moving the market today
- Financial journalists and analysts covering scheduled events

---

## Core Features

1. **Today Page** — All market events happening today (earnings pre/post, ex-div, macro)
2. **This Week Page** — Full week view with day-by-day breakdown
3. **Ticker Pages** — All upcoming events for a specific stock (earnings history + next date, dividends)
4. **Event Type Pages** — Dedicated pages for earnings / dividends / FOMC / CPI / NFP etc.
5. **Sector Pages** — Events filtered by sector (tech, finance, healthcare, etc.)
6. **Calendar View** — Monthly calendar with event dots
7. **Historical Data** — Past earnings beats/misses, historical FOMC decisions
8. **Search** — Fuzzy search for tickers and event types
9. **Earnings Charts** — EPS actual vs estimate history per ticker

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | ISR — events update frequently |
| Styling | Tailwind CSS v3 | Mobile-first |
| Charts | Chart.js + react-chartjs-2 | EPS history charts |
| Language | TypeScript | Type safety for financial data |
| Hosting | Vercel (free tier) | ISR support |
| Backend | Railway free tier | Cron job to refresh event data every 15min |
| State | Zustand | Calendar/filter state |
| i18n | next-i18next | 8-language support |

---

## Data Sources (All Free)

| Source | Data | Access |
|---|---|---|
| Alpha Vantage (free tier) | Earnings calendar, EPS estimates/actuals | `https://www.alphavantage.co/query?function=EARNINGS_CALENDAR` (free key) |
| FRED API (free) | FOMC meeting dates, CPI release dates, NFP dates | `https://api.stlouisfed.org/fred/releases` (free key) |
| Yahoo Finance (unofficial) | Dividend ex-dates, earnings dates (backup) | `https://query1.finance.yahoo.com/v8/finance/` (no key, public) |
| SEC EDGAR (free) | 8-K filings for earnings announcements | `https://data.sec.gov/submissions/` (no key required) |
| Static JSON | FOMC/Fed meeting schedule (published annually) | `data/fomc-schedule.json` |
| Static JSON | Economic release calendar (BLS, BEA publish schedules) | `data/macro-calendar.json` |
| Sector classification | GICS sector mapping (public) | `data/sectors.json` |

**Rate limit strategy:** Alpha Vantage free = 25 req/day. Data cached in Railway Redis, refreshed via cron. Yahoo Finance as fallback. FRED free = no practical limit.

---

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://market-event-board.vercel.app
ALPHA_VANTAGE_API_KEY=your_free_key
FRED_API_KEY=your_free_key
GOOGLE_SHEETS_WEBHOOK_URL=your_apps_script_url
REDIS_URL=your_railway_redis_url
```

---

## Backend Architecture (Railway Free Tier)

A lightweight Node.js cron service on Railway refreshes and caches event data:

```
market-event-board-cron/
├── index.ts           # Express server + cron scheduler
├── jobs/
│   ├── fetch-earnings.ts    # Alpha Vantage + Yahoo Finance
│   ├── fetch-dividends.ts   # Yahoo Finance dividend calendar
│   ├── fetch-macro.ts       # FRED + static FOMC JSON
│   └── store-redis.ts       # Store to Railway Redis
├── package.json
└── Dockerfile
```

**Cron schedule:**
- Earnings + dividends: every 6 hours
- Macro events: daily (rarely changes)
- Today's events: every 15 minutes during market hours (9am-5pm ET)

**Next.js reads from Redis via API routes, with ISR fallback to static data.**

---

## Page Structure

### `/` — Home / Dashboard
- Live event strip: "Next earnings in X hours: AAPL", "Ex-dividend today: JNJ"
- Today's events summary card
- This week calendar strip (Mon-Fri with event counts)
- Most-watched tickers (by page views): upcoming events
- Macro events next 30 days
- Market sentiment note based on upcoming events density
- Schema.org: `WebSite`, `Event`, `FAQPage`
- ISR revalidate: 300s

### `/today`
- Full list of all events today, sorted by time
- Filter tabs: All | Earnings | Dividends | Macro
- Earnings: ticker, estimate EPS, time (pre/post market)
- Dividends: ticker, ex-date, amount, yield
- Macro: event name, time, previous value, estimate, importance badge
- Schema.org: `Event`, `ItemList`
- ISR revalidate: 300s

### `/this-week`
- Day-by-day accordion: Mon/Tue/Wed/Thu/Fri
- Each day: same format as `/today`
- "This week in numbers": X earnings, Y ex-div dates, Z macro events
- Schema.org: `ItemList`
- ISR revalidate: 900s

### `/tickers/[symbol]`
- e.g., `/tickers/AAPL`
- Ticker header: name, sector, current price (static, not live)
- Next earnings date (confirmed or estimated), time
- EPS history chart: last 8 quarters actual vs estimate
- Surprise % history chart
- Dividend history: last 4 quarters, ex-dates, amounts, yield
- Upcoming events for this ticker
- Schema.org: `FinancialProduct`, `Corporation`
- ISR revalidate: 3600s

### `/events/[type]`
- Types: `earnings`, `dividends`, `fomc`, `cpi`, `nfp`, `ppi`, `retail-sales`, `gdp`
- `/events/fomc` — all FOMC meeting dates, past decisions, upcoming
- `/events/cpi` — CPI release history, upcoming date, YoY chart
- `/events/earnings` — current earnings season calendar
- Schema.org: `Event`, `Dataset`
- ISR revalidate: 3600s

### `/sectors/[sector]`
- e.g., `/sectors/technology`
- Sectors: Technology, Healthcare, Financials, Consumer Discretionary, etc.
- This week's earnings for sector tickers
- Top dividend payers in sector
- Sector event density chart
- Schema.org: `ItemList`, `Dataset`
- ISR revalidate: 3600s

### `/calendar`
- Monthly calendar view (current + next month)
- Event dots per day (color-coded by type)
- Click day → modal/panel with day's events
- Month navigation
- Schema.org: `Event`

### `/blog/[slug]` — SEO content
- Seed articles: "Earnings season 2025 calendar", "What is an ex-dividend date?", "FOMC meeting dates 2025"
- Schema.org: `Article`

### `/sitemap.xml`, `/robots.txt`

---

## UI/UX Design

### Color Palette (Soft Pastel)
```
Background:     #FFF9F0  (soft warm cream — financial/professional)
Surface:        #FFFFFF
Surface-alt:    #F0F7FF  (soft blue for alternates)
Primary:        #2563EB  (professional blue)
Earnings:       #7C3AED  (purple)
Dividends:      #059669  (green)
Macro:          #D97706  (amber)
High-impact:    #DC2626  (red — high-importance macro)
Text-primary:   #111827
Text-muted:     #6B7280
Border:         #E5E7EB
```

### Layout
- Mobile-first, sticky header with date/time + market status badge
- Homepage: event strip at top, cards grid, week view
- Today/week pages: vertical timeline on mobile, table on desktop
- Footer: visitor counter, disclaimer, data attribution

### Key Components
- `EventStrip` — horizontal scrolling strip of imminent events
- `EventCard` — color-coded by type, shows key data at a glance
- `EarningsCalendar` — week grid with earnings dots
- `EPSChart` — bar chart with actual vs estimate overlay
- `MacroEventRow` — event name, importance badge, previous/estimate/actual values
- `DividendRow` — ticker, ex-date, amount, yield, payment date
- `MarketStatusBadge` — "Market Open" / "Pre-Market" / "After Hours" / "Closed"
- `ImportanceBadge` — Low / Medium / High (color-coded)
- `AdSlot` — Adsterra placeholders

### Adsterra Ad Placeholders
```html
<!-- Social Bar -->
<div id="adsterra-social-bar" data-ad="social-bar" class="adsterra-social-bar"></div>

<!-- Native Banner (between event list sections) -->
<div id="adsterra-native" data-ad="native-banner" class="my-6 adsterra-native"></div>

<!-- Display Banner (top of sidebar / bottom of mobile) -->
<div id="adsterra-banner" data-ad="display-banner" class="adsterra-banner"></div>
```

---

## i18n (Internationalization)

**Languages:** en (default), ko, ja, zh, es, fr, de, pt

- Ticker symbols remain in English (global standard)
- All UI labels, dates, event descriptions localized
- Date format adapts to locale (en-US, ko-KR, ja-JP, etc.)
- `hreflang` on all pages
- Currency display: USD with locale formatting

**Translation files:** `public/locales/[lang]/common.json`, `events.json`, `calendar.json`, `seo.json`

---

## Google Sheets Webhook

**Events logged:**
- Page view: path, ticker/sector/event type, lang, referrer
- Ticker lookup (what tickers users search)
- Calendar date clicked
- Event type page visited
- Today/this-week page visits (frequency data)

```typescript
// lib/webhook.ts
export async function logEvent(event: {
  type: string;
  data: Record<string, unknown>;
}) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, ts: new Date().toISOString(), project: 'market-event-board' }),
    });
  } catch { /* non-blocking */ }
}
```

---

## Visitor Counter

- Vercel KV (free tier)
- `POST /api/visitors` on page load
- Footer: `Visitors today: 318  |  Total: 47,291`

---

## SEO Requirements

- Title: "Earnings Calendar [Date] — [Company] Reports [Pre/Post] Market | MarketEventBoard"
- Title: "FOMC Meeting Dates 2025 | MarketEventBoard"
- Dynamic OG images per page (ticker symbol, key event data)
- `next-sitemap` with all ticker, event type, sector pages
- JSON-LD: `Event`, `FinancialProduct`, `FAQPage`, `Dataset`
- Canonical + `hreflang` x8
- Internal linking: today → tickers → events → sectors

---

## Milestones & Git Commits

### Milestone 1 — Scaffold + Static Data
- Init Next.js 14, Tailwind, TypeScript, Zustand
- Create `data/fomc-schedule.json`, `data/macro-calendar.json`, `data/sectors.json`
- Set up Railway cron service skeleton
- Harness files
- **Git:** `git commit -m "feat: scaffold, static macro/FOMC data, cron skeleton"`
- **GitHub:** `gh repo create taeshin11/market-event-board --public --source=. --push`

### Milestone 2 — Data Layer + API Routes
- Alpha Vantage earnings fetcher + FRED macro fetcher
- Railway cron job running and caching to Redis
- Next.js API routes: `/api/events/today`, `/api/events/week`, `/api/tickers/[symbol]`
- ISR configuration
- **Git:** `git commit -m "feat: data layer, cron job, API routes with Redis cache"`
- **Push:** `git push`

### Milestone 3 — Core Pages
- Home, `/today`, `/this-week` pages
- `/tickers/[symbol]` with EPS chart
- `/events/[type]` pages (earnings, dividends, fomc, cpi, nfp)
- All schema.org, next-seo
- **Git:** `git commit -m "feat: core pages, ticker pages, event type pages"`
- **Push:** `git push`

### Milestone 4 — Calendar + Sectors + Search
- `/calendar` monthly view
- `/sectors/[sector]` pages
- Search component (client-side fuzzy search)
- **Git:** `git commit -m "feat: calendar view, sector pages, search"`
- **Push:** `git push`

### Milestone 5 — i18n + SEO
- All 8 locale files
- Sitemap, robots.txt, OG images
- Blog with 5 seed articles
- **Git:** `git commit -m "feat: i18n 8 langs, sitemap, OG images, blog"`
- **Push:** `git push`

### Milestone 6 — Ads + Webhook + Counter
- Adsterra placeholders
- Webhook
- Visitor counter
- **Git:** `git commit -m "feat: ads, webhook, visitor counter"`
- **Push:** `git push`

### Milestone 7 — Deploy
- `npx vercel --prod`
- Railway cron deploy
- QA, Lighthouse
- **Git:** `git commit -m "chore: production deploy, QA"`
- **Push:** `git push`

---

## File Structure

```
market-event-board/
├── PRD.md
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── next-sitemap.config.js
├── .env.local
├── .env.example
├── research_history/
├── data/
│   ├── fomc-schedule.json
│   ├── macro-calendar.json
│   └── sectors.json
├── cron-service/
│   ├── index.ts
│   ├── jobs/
│   ├── package.json
│   └── Dockerfile
├── content/blog/
├── public/locales/{en,ko,ja,zh,es,fr,de,pt}/
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── today/page.tsx
    │   ├── this-week/page.tsx
    │   ├── tickers/[symbol]/page.tsx
    │   ├── events/[type]/page.tsx
    │   ├── sectors/[sector]/page.tsx
    │   ├── calendar/page.tsx
    │   ├── blog/[slug]/page.tsx
    │   └── api/
    │       ├── events/today/route.ts
    │       ├── events/week/route.ts
    │       ├── tickers/[symbol]/route.ts
    │       └── visitors/route.ts
    ├── components/
    │   ├── layout/ Navbar.tsx Footer.tsx AdSlot.tsx
    │   ├── events/ EventCard.tsx EventStrip.tsx EventRow.tsx ImportanceBadge.tsx
    │   ├── earnings/ EPSChart.tsx EarningsCalendar.tsx
    │   ├── calendar/ MonthView.tsx DayModal.tsx
    │   └── search/ SearchBar.tsx SearchResults.tsx
    ├── lib/
    │   ├── redis.ts
    │   ├── webhook.ts
    │   ├── visitors.ts
    │   └── seo.ts
    └── types/index.ts
```

---

## Harness Spec

### `feature_list.json`
```json
{
  "project": "market-event-board",
  "version": "1.0.0",
  "features": [
    { "id": "cron-data-fetcher", "status": "pending", "milestone": 2 },
    { "id": "redis-cache", "status": "pending", "milestone": 2 },
    { "id": "today-page", "status": "pending", "milestone": 3 },
    { "id": "this-week-page", "status": "pending", "milestone": 3 },
    { "id": "ticker-pages", "status": "pending", "milestone": 3 },
    { "id": "event-type-pages", "status": "pending", "milestone": 3 },
    { "id": "calendar-view", "status": "pending", "milestone": 4 },
    { "id": "sector-pages", "status": "pending", "milestone": 4 },
    { "id": "search", "status": "pending", "milestone": 4 },
    { "id": "i18n-8langs", "status": "pending", "milestone": 5 },
    { "id": "seo-sitemap", "status": "pending", "milestone": 5 },
    { "id": "ads-adsterra", "status": "pending", "milestone": 6 },
    { "id": "webhook-sheets", "status": "pending", "milestone": 6 },
    { "id": "visitor-counter", "status": "pending", "milestone": 6 },
    { "id": "vercel-deploy", "status": "pending", "milestone": 7 }
  ]
}
```

### `claude-progress.txt`
```
CURRENT_MILESTONE=1
LAST_COMMIT=none
LAST_PUSH=none
NEXT_ACTION=Run init.sh to scaffold project
BLOCKER=none
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e
echo "=== MarketEventBoard Init ==="
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install next-i18next next-seo next-sitemap chart.js react-chartjs-2 zustand ioredis @vercel/kv
npm install -D @types/node
mkdir -p data cron-service/jobs content/blog research_history \
  public/locales/{en,ko,ja,zh,es,fr,de,pt} \
  src/components/{layout,events,earnings,calendar,search} src/lib src/types
cp .env.example .env.local
echo "Init complete. Update .env.local with API keys."
git add -A && git commit -m "feat: project scaffold and dependencies"
gh repo create taeshin11/market-event-board --public --source=. --push
echo "GitHub repo created and pushed."
```
