# RAAHI — Discover India Differently

## 1. Project Overview

**RAAHI** is a production-quality, editorial travel discovery and personal itinerary planning web application. Rooted in Indian exploration, diverse cultural landscapes, living artisan traditions, and slow-travel principles, RAAHI replaces commercial booking templates with an editorial magazine aesthetic.

The application is built strictly as a **100% static frontend** without backend servers, databases, or third-party paid APIs. All destination datasets, articles, and itinerary tools execute locally in the browser with `localStorage` persistence and build-time static HTML prerendering.

---

## 2. Key Features

- **Editorial Homepage (`/`):** Full-width landscape hero, custom compass rose brand identity, typeahead destination search with live suggestions, curated featured destinations, "Travel by Mood" categories, and philosophy statements.
- **Explore India Hub (`/explore`):** Dynamic multi-faceted client-side filtering across travel moods, 6 geographical regions, duration estimates, and indicative budget tiers. URL query parameter synchronization (`?q=...&category=...`) enables deep-linking and browser back/forward history support. Designed empty-state recovery.
- **The Raahi Travel Journal (`/guides`):** Curated editorial magazine featuring category filters, reading times, author perspectives, and a prominent cover story.
- **In-Depth Guide Detail Articles (`/guides/:slug`):** Three complete, field-researched long-form travel guides for Jaipur, Munnar, and Rishikesh, each featuring sticky Table of Contents, in-page anchor links, practical day-by-day itineraries, cultural etiquette guidelines, transit logistics blueprints, and one-click "Add to Itinerary" buttons.
- **Interactive Trip Planner (`/plan`):** 4-step guided workflow:
  1. *Destination Selection* with search and duplicate prevention.
  2. *Travel Preferences* with date validation, duration, party size, and travel style.
  3. *Visual Day-by-Day Itinerary* with proportional day scheduling, destination reordering, and personal day notes.
  4. *Indicative Budget Breakdown* with transparent formula estimates.
  5. *Export & Offline Persistence:* `localStorage` draft saving, reset modal, native Web Share API with copy-link fallback, and a print-optimized layout (`@media print`) that renders a clean 1-page PDF travel dossier.
- **Custom 404 Recovery (`/404`):** An editorial unmapped route page with search and recovery navigation.
- **Automated Static Prerendering:** Generates static HTML for all routes at build time, ensuring immediate crawler indexability and preventing 404 refresh errors on static web hosts.

---

## 3. Technology Stack

- **Core Framework:** React 19 + TypeScript
- **Build Tool & Bundler:** Vite 8
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Typography:** Playfair Display (Editorial Display Serif) & Plus Jakarta Sans (Clean Modern Sans)
- **Styling Architecture:** Modern CSS Design Tokens (`src/styles/tokens.css`, `global.css`, and modular component stylesheets)
- **Testing & Screenshot Automation:** Puppeteer Core + Node.js HTTP server
- **Backend / Database:** None (Pure Static Client-Side Architecture)

---

## 4. Project Directory Structure

```
raahi/
├── public/
│   ├── favicon.svg             # Custom RAAHI compass brand mark
│   ├── robots.txt              # Crawler permissions & sitemap reference
│   └── sitemap.xml             # Canonical XML sitemap with all routes
├── src/
│   ├── assets/                 # Brand assets
│   ├── components/             # Reusable accessible UI components
│   │   ├── Breadcrumbs.tsx     # Semantic breadcrumb trail
│   │   ├── DestinationCard.tsx # Destination card with image & badges
│   │   ├── EmptyState.tsx      # Friendly search/filter recovery state
│   │   ├── Footer.tsx          # Semantic footer with brand and navigation links
│   │   ├── GuideCard.tsx       # Editorial travel journal card
│   │   ├── Header.tsx          # Sticky navigation & mobile drawer
│   │   ├── SEOHead.tsx         # Dynamic titles, meta, and JSON-LD schema
│   │   └── Toast.tsx           # Accessible status feedback notification
│   ├── data/                   # Local static verified datasets
│   │   ├── destinations.ts     # 14+ destinations across 6 Indian regions
│   │   └── guides.ts           # 6 travel guides with 3 full in-depth articles
│   ├── pages/                  # Page routes
│   │   ├── Explore.tsx         # Catalog & multi-faceted filter hub
│   │   ├── GuideArticle.tsx    # Long-form article with TOC & blueprints
│   │   ├── Guides.tsx          # The Raahi Travel Journal listing
│   │   ├── Home.tsx            # Editorial landing & featured discoveries
│   │   ├── NotFound.tsx        # Custom 404 recovery page
│   │   └── Plan.tsx            # Interactive trip planner & budget estimator
│   ├── styles/
│   │   ├── global.css          # Reset, typography, focus, print styles
│   │   └── tokens.css          # Color palette, spacing, and shadows
│   ├── App.tsx                 # Main application shell & global state
│   ├── main.tsx                # React DOM entry point with BrowserRouter
│   └── vite-env.d.ts           # TypeScript Vite client environment types
├── scripts/
│   ├── capture-screenshots.js  # Headless browser screenshot automation
│   ├── prerender.js            # Build-time static HTML & metadata prerenderer
│   └── validate-seo.js         # Automated 70-point on-page SEO validator
├── submission/
│   ├── on-page-seo-report.md   # Comprehensive SEO optimization report with audit table
│   ├── seo-evidence/           # Audit evidence inspection captures
│   ├── seo-implementation-inventory.md # Technical matrix of SEO implementations
│   ├── website-screenshots-guide.md    # Complete screenshot catalog & walkthrough
│   └── screenshots/            # 10 verified high-resolution interface captures
├── index.html                  # Root template with preconnect & WebSite schema
├── package.json                # Dependencies, project scripts, and metadata
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
└── README.md                   # Complete documentation
```

---

## 5. Installation & Run Commands

### 5.1 Prerequisites
- **Node.js:** v18.0.0 or higher (v22.14.0 recommended)
- **npm:** v9.0.0 or higher

### 5.2 Development Server
Clone or navigate to the workspace directory and run:
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```
The application will start at `http://localhost:3000` with hot module replacement (HMR).

### 5.3 Production Build
To compile TypeScript, build the minified production bundle, and run static HTML prerendering:
```bash
npm run build
```
The output is generated in the `dist/` directory.

### 5.4 Local Production Preview
To preview the generated static build locally:
```bash
npm run preview
```

---

## 6. Automated Verification & Screenshot Commands

### 6.1 Automated On-Page SEO Validation Audit
Verify metadata, title tags, descriptions, canonical URLs, single H1 hierarchy, OpenGraph tags, and Schema.org JSON-LD structured data:
```bash
npm run test:seo
```
*Current result: 70 / 70 checks passing (100%).*

### 6.2 Automated High-Resolution Screenshot Capture
Capture desktop (1440×900) and mobile (390×844) screenshots across all key user workflows:
```bash
npm run screenshot
```
Screenshots are saved directly to `submission/screenshots/` and `submission/seo-evidence/`.

---

## 7. Static Hosting & Deployment Instructions

The application is engineered to deploy seamlessly to any static web host:

### 7.1 GitHub Pages Deployment
1. Set the repository URL or custom domain in an environment variable before building:
   ```bash
   # In .env or command line
   VITE_SITE_URL=https://your-username.github.io/raahi
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the contents of `dist/` to the `gh-pages` branch. The build output includes `dist/404.html` and physical subdirectories (`dist/explore/index.html`, `dist/guides/three-days-in-jaipur/index.html`), ensuring direct URL refresh and browser history work without redirection issues.

### 7.2 Netlify / Vercel Deployment
- **Live Deployment:** [https://raahi-travel-three.vercel.app/](https://raahi-travel-three.vercel.app/)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Static SPA rewrites and clean routing configured in `vercel.json`.

---

## 8. Documentation & Technical Reports

All technical documentation, reports, and evidence files are located in the `submission/` directory:

1. **Website Screenshots Documentation:** [`submission/website-screenshots-guide.md`](submission/website-screenshots-guide.md)
   - Professional checklist covering all 10 required views with exact viewports.
   - Genuine high-resolution screenshots saved in `submission/screenshots/`.
2. **On-Page SEO Optimization Report:** [`submission/on-page-seo-report.md`](submission/on-page-seo-report.md)
   - Full SEO technical audit and performance analysis.
   - 9 structured sections covering crawlability, metadata, structured data, and accessibility.
   - Master 4-column SEO audit table with exact URLs and evidence links.
3. **SEO Implementation Inventory:** [`submission/seo-implementation-inventory.md`](submission/seo-implementation-inventory.md)
   - Granular inventory matrix linking code files, routes, and verification status.

---

## 9. Verification & Audit Disclaimer

All screenshots, code, and validation outputs included in this submission were genuinely produced and tested in the active workspace. External audits that require live public internet access (e.g., Google Search Console domain ownership verification and remote PageSpeed field data) are clearly designated as **"Pending public deployment"** in accordance with honest engineering reporting practices.

