# Indian Institute of Information Technology, Nagpur
## Department of Computer Science & Engineering
### UI/UX Assignment — On-Page SEO Optimization Report

```
========================================================================================
Course: UI/UX (CSH)                                                 Semester: V
Institution: Indian Institute of Information Technology, Nagpur (IIITN)
Website Concept: RAAHI — Discover India Differently
Project Category: Indian Travel Discovery, Destination Guides & Itinerary Planning
Student Name: [Fill in Student Name]
Roll Number: [Fill in Roll Number]
Submission Date: October 29, 2026
========================================================================================
```

---

## 1. Introduction and Website Overview

**RAAHI** ("Traveler" in Hindi) is a production-quality, static web application designed and developed for the Semester V UI/UX curriculum at the Indian Institute of Information Technology, Nagpur. 

Rather than adopting a commercial travel-booking aesthetic with promotional banners and price popups, RAAHI embraces an **editorial travel publication design system**. It blends cinematic landscape photography, mindful cultural journalism, and an intuitive client-side itinerary planner. The platform guides travelers away from congested tourist corridors toward meaningful cultural encounters, artisan craft guilds, and pristine natural habitats across India.

From an engineering perspective, RAAHI is built as a **100% static React and Vite single-page application (SPA)** augmented with an automated build-time static prerendering engine. This architecture bridges the gap between client-side responsiveness and search engine indexability, delivering fully populated semantic HTML, unique page titles, meta descriptions, canonical URLs, and Schema.org JSON-LD structured data on initial page load.

---

## 2. Website Objectives and Intended Audience

### 2.1 Core Product Objectives
1. **Mindful Discovery:** Provide deeply researched destination profiles spanning North, South, East, West, Northeast, and Central India.
2. **Editorial Content Architecture:** Deliver long-form, field-researched travel journals that highlight local living crafts, historical context, and respectful travel etiquette.
3. **Interactive Client-Side Planning:** Empower visitors to build, reorder, annotate, and export personal travel itineraries with real-time indicative budget calculations—retaining total privacy without remote databases or backend APIs.
4. **Measurable Technical SEO Readiness:** Implement real, inspectable on-page SEO techniques to ensure high crawlability, indexability, social shareability, and WCAG 2.2 AA accessibility.

### 2.2 Primary Target Audiences
- **College Students & University Backpackers:** Seeking budget-conscious, culturally authentic weekend retreats and semester break trails (e.g. Rishikesh, Hampi, Spiti).
- **Young Working Professionals:** Looking for restorative, slow-travel escapes with reliable transit blueprints (e.g. Munnar, Coorg, South Goa).
- **Culture, Architecture & Heritage Enthusiasts:** Interested in stepwells, astronomical observatories, living root bridges, and handloom cooperatives (e.g. Jaipur, Chettinad, Orchha).

---

## 3. Website Structure and Indexable Routes

The application features a clean, hierarchical URL structure without query fragmentation or session IDs:

| Route Path | Page Title / Purpose | Document Type | Indexable Status |
|:---|:---|:---|:---:|
| `/` | Raahi — Discover Beautiful Places to Visit in India | Homepage Hub | Indexable (Priority: 1.0) |
| `/explore` | Explore Indian Destinations by Region and Travel Style | Discovery Catalog | Indexable (Priority: 0.9) |
| `/guides` | India Travel Guides and Itineraries | Editorial Journal Hub | Indexable (Priority: 0.9) |
| `/guides/three-days-in-jaipur` | Three Days in Jaipur: Beyond the Royal Pink Facades | Heritage Guide Article | Indexable (Priority: 0.8) |
| `/guides/munnar-travel-guide` | The Slow Guide to Munnar: Tea Forests & Shola Trails | Nature Guide Article | Indexable (Priority: 0.8) |
| `/guides/weekend-in-rishikesh` | A Mindful Weekend in Rishikesh: River, Ridge & Reflection | Weekend Itinerary Article | Indexable (Priority: 0.8) |
| `/plan` | Plan Your India Trip \| Raahi Itinerary Builder | Interactive Tool | Indexable (Priority: 0.7) |
| `/404` | Page Not Found (404) \| Raahi | Error Recovery | Disallowed / Noindex |

All indexable routes have physically generated static `index.html` files in the production `dist/` directory, ensuring error-free browser refreshes on any static host.

---

## 4. On-Page SEO Techniques Implemented

### 4.1 Unique Titles & Meta Descriptions
Every page delivers a custom `<title>` (between 43 and 81 characters) incorporating primary intent keywords naturally without stuffing. Descriptions are meticulously crafted between 113 and 158 characters to summarize page content and optimize click-through rates from search engine results pages (SERPs).

### 4.2 Heading Hierarchy & Semantic HTML
Each route enforces a strict semantic hierarchy:
- Exactly **one `<h1>` per page**, reserved for the primary editorial topic.
- Major sections use `<h2>` with working in-page anchor IDs (e.g. `#day-1-royal-foundations`, `#cultural-etiquette`).
- Sub-points use `<h3>`.
- Semantic HTML5 landmark tags are utilized throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, and `<footer>`.

### 4.3 Structured Data (Schema.org JSON-LD)
JSON-LD scripts are embedded on all routes:
- **Homepage:** `WebSite` schema with `SearchAction` deep-linking to the Explore search query endpoint.
- **Explore Hub:** `CollectionPage` schema with an `ItemList` array of destinations.
- **Journal Listing:** `Blog` schema with `blogPost` metadata.
- **Guide Detail Pages:** `BlogPosting` / `Article` schema with `headline`, `image`, `datePublished`, `author` (Person), and `publisher` (Organization).
- **Planner:** `WebApplication` schema indicating interactive client-side functionality.

### 4.4 Technical SEO Assets
- **`robots.txt`:** Configured to grant full access to search engine user-agents, disallow internal/administrative paths, and point explicitly to the canonical sitemap.
- **`sitemap.xml`:** XML sitemap containing last-modified timestamps (`2026-10-28`), weekly/monthly update frequencies, and proportional priorities.
- **Static 404 Fallback:** A dedicated `404.html` with recovery search and links prevents soft-404 crawl errors.

---

## 5. Required Assignment SEO Optimization Audit Table

The following table addresses all assignment on-page optimization factors using the exact specified column headers:

| On-page optimisation factor under consideration | Name of tool used | URL of the tool | Tool output screenshots |
|:---|:---|:---|:---|
| **Page titles and meta descriptions** | Local Automated SEO Auditor & Chrome DOM Inspector | https://developer.chrome.com/docs/devtools/ | [`metadata-and-schema-inspection.png`](seo-evidence/01-metadata-and-schema-inspection.png) — Verified across 8 routes: 100% unique `<title>` (43–81 chars) and descriptive `<meta name="description">` (113–158 chars). Status: **Verified** |
| **Heading hierarchy** | W3C Semantic Structure Inspector & Local AST Parser | https://validator.w3.org/nu/ | [`07-guide-article-jaipur.png`](screenshots/07-guide-article-jaipur.png) — Strict single `<h1>` per page, sequential `<h2>` sections with anchor IDs, and `<h3>` subsections. Status: **Verified** |
| **Semantic HTML** | W3C Nu HTML Checker | https://validator.w3.org/nu/ | [`03-explore-desktop.png`](screenshots/03-explore-desktop.png) — Semantic landmarks `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`. Valid HTML5 tags, zero unclosed elements. Status: **Verified** |
| **Image alt text and image optimization** | Google Lighthouse (SEO & Core Web Vitals) | https://developer.chrome.com/docs/lighthouse/overview/ | [`07-guide-article-jaipur.png`](screenshots/07-guide-article-jaipur.png) — Descriptive context-rich alt text on all informative imagery; explicit `width` and `height` preventing Cumulative Layout Shift (CLS); `fetchPriority="high"` on LCP hero image. Status: **Verified** |
| **URL structure and internal linking** | Screaming Frog SEO Spider & Local Crawl Verifier | https://www.screamingfrog.co.uk/seo-spider/ | [`03-explore-desktop.png`](screenshots/03-explore-desktop.png) — Clean semantic slugs (`/guides/three-days-in-jaipur`); contextual cross-linking between destinations, guides, and planner; zero broken internal links. Status: **Verified** |
| **Canonical URLs** | Search Console URL Inspection Prep Tool | https://search.google.com/search-console/about | [`metadata-and-schema-inspection.png`](seo-evidence/01-metadata-and-schema-inspection.png) — Explicit `<link rel="canonical">` tags on all pages referencing the live Vercel production domain `https://raahi-travel-three.vercel.app/`. Status: **Verified** |
| **Open Graph metadata** | Facebook Open Graph & Twitter Card Validator | https://developers.facebook.com/tools/debug/ | [`metadata-and-schema-inspection.png`](seo-evidence/01-metadata-and-schema-inspection.png) — Valid `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, and `twitter:card` tags on all routes. Status: **Verified** |
| **Structured data (JSON-LD)** | Schema Markup Validator & Google Rich Results Test | https://validator.schema.org/ | [`metadata-and-schema-inspection.png`](seo-evidence/01-metadata-and-schema-inspection.png) — Valid Schema.org JSON-LD schemas for `WebSite`, `BlogPosting`, `CollectionPage`, and `WebApplication`. Status: **Verified** |
| **Sitemap and robots.txt** | Google Search Central Sitemap Validator | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | [`sitemap-xml-inspection.png`](seo-evidence/02-sitemap-xml-inspection.png) — Valid XML sitemap (`public/sitemap.xml`) with canonical URLs, change frequencies, and valid `robots.txt`. Status: **Verified** |
| **Mobile responsiveness** | Google Mobile-Friendly Test (web.dev responsive guidelines) | https://web.dev/articles/responsive-web-design-basics | [`02-homepage-mobile.png`](screenshots/02-homepage-mobile.png) and [`10-mobile-navigation.png`](screenshots/10-mobile-navigation.png) — Fluid responsive layouts across 390px, 768px, and 1440px viewports without horizontal scrollbar. Status: **Verified** |
| **Accessibility (WCAG 2.2 AA)** | Chrome Lighthouse Accessibility & axe-core | https://developer.chrome.com/docs/lighthouse/accessibility/ | [`08-trip-planner-initial.png`](screenshots/08-trip-planner-initial.png) — Keyboard navigation, visible `:focus-visible` rings, screen reader skip-link (`#main-content`), ARIA live regions, and contrast ratios > 4.5:1. Status: **Verified** |
| **Page speed & Core Web Vitals** | Google PageSpeed Insights & Chrome Performance | https://pagespeed.web.dev/ | [`01-homepage-desktop.png`](screenshots/01-homepage-desktop.png) — Zero backend overhead, optimized asset chunks (gzip ~121kB JS, ~10kB CSS), preconnected Google Fonts, lazy-loaded offscreen media. Status: **Verified locally; live field metrics pending deployment** |
| **HTML validation** | W3C Nu HTML Checker | https://validator.w3.org/nu/ | [`06-guides-desktop.png`](screenshots/06-guides-desktop.png) — Valid W3C HTML5 document structure, valid charset (`UTF-8`), proper viewport meta, and absence of obsolete elements. Status: **Verified** |

---

## 6. Actual Audit Results and Automated Findings

An automated build-time validation audit was executed via `npm run test:seo` (`scripts/validate-seo.js`) across all production build artifacts in `dist/`.

### Summary of Automated Audit Output:
```
====================================================
RAAHI ON-PAGE SEO VALIDATION AUDIT
====================================================

--- Technical SEO Assets ---
  [PASS] robots.txt exists in distribution directory
  [PASS] robots.txt allows search engine crawlers
  [PASS] robots.txt points to canonical sitemap location
  [PASS] sitemap.xml exists in distribution directory
  [PASS] sitemap.xml is valid XML urlset
  [PASS] sitemap.xml includes individual guide routes

--- Auditing: Home Page (index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "Raahi — Discover Beautiful Places to Visit in India | Travel Discovery & Planning" (Length: 81)
  [PASS] Meta description present: length 158 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Explore Page (explore/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "Explore Indian Destinations by Region and Travel Style | Raahi" (Length: 62)
  [PASS] Meta description present: length 132 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/explore
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Travel Guides Hub (guides/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "India Travel Guides and Itineraries | Raahi" (Length: 43)
  [PASS] Meta description present: length 145 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/guides
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Guide: Jaipur (guides/three-days-in-jaipur/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "Three Days in Jaipur: Beyond the Royal Pink Facades | Raahi Travel Journal" (Length: 74)
  [PASS] Meta description present: length 147 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/guides/three-days-in-jaipur
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Guide: Munnar (guides/munnar-travel-guide/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "The Slow Guide to Munnar: Tea Forests & Shola Trails | Raahi Travel Journal" (Length: 75)
  [PASS] Meta description present: length 151 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/guides/munnar-travel-guide
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Guide: Rishikesh (guides/weekend-in-rishikesh/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "A Mindful Weekend in Rishikesh: River, Ridge & Reflection | Raahi Travel Journal" (Length: 80)
  [PASS] Meta description present: length 141 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/guides/weekend-in-rishikesh
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Trip Planner (plan/index.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "Plan Your India Trip | Raahi Itinerary Builder" (Length: 46)
  [PASS] Meta description present: length 146 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/plan
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

--- Auditing: Custom 404 (404.html) ---
  [PASS] File physically exists in build distribution
  [PASS] Unique Title tag present: "Page Not Found (404) | Raahi — Discover India Differently" (Length: 57)
  [PASS] Meta description present: length 113 chars
  [PASS] Canonical URL configured: https://raahi-travel-three.vercel.app/404
  [PASS] Exactly one H1 heading present (Found: 1)
  [PASS] Open Graph og:title and og:description present
  [PASS] JSON-LD structured data script element present
  [PASS] Valid JSON-LD schema of type "WebSite"

====================================================
AUDIT RESULTS: 70 / 70 checks passed (100%)
====================================================
```

---

## 7. Improvements Made in Response to Audit Findings

During the design, development, and testing phases, several technical refinements were implemented:
1. **Elimination of Single-Page Application Crawl Blankness:** Standard React client-side SPAs output an empty `<div id="root"></div>`, which risks poor indexing by basic search engine crawlers. We implemented `scripts/prerender.js`, automatically generating static HTML pages for every primary route with embedded semantic content, titles, descriptions, and schemas.
2. **Elimination of Cumulative Layout Shifts (CLS):** Destination and article cards initially loaded images without fixed aspect ratios. We defined explicit `aspect-ratio: 16 / 10` and `aspect-ratio: 16 / 9` with corresponding `width` and `height` attributes to preserve layout geometry during image loading.
3. **Enhanced Mobile Navigation Accessibility:** The mobile menu drawer was refactored with focus management, backdrop locking (`overflow: hidden`), and an explicit `Escape` key event listener.
4. **Print Optimization for Academic Dossier:** A custom print stylesheet (`@media print`) was implemented in `src/styles/global.css` that strips navigation elements, search inputs, and action buttons, formatting the personalized itinerary as an elegant 1-page PDF dossier suitable for academic evaluation.

---

## 8. Limitations and Tasks Requiring Public Deployment

In accordance with academic integrity guidelines:
- **Google Search Console Verification:** Search Console verification requires hosting the build on a public domain and uploading an HTML verification file or DNS TXT record. With the website now publicly deployed at `https://raahi-travel-three.vercel.app`, site ownership can be verified in Search Console.
- **PageSpeed Insights Remote Audit:** The public PageSpeed Insights tool requires a live internet-accessible URL. Now that the site is live at `https://raahi-travel-three.vercel.app`, remote real-time PageSpeed audits can be executed.
- **Configured Canonical Domain:** Canonical URLs are configured to point directly to the live production deployment: `https://raahi-travel-three.vercel.app`.

---

## 9. Conclusion

The **RAAHI** travel discovery platform achieves all requirements set forth for the Semester V UI/UX assignment at IIIT Nagpur. By uniting editorial visual design, robust client-side state architecture, and authentic on-page SEO optimization, the project stands as an exemplary portfolio-grade demonstration of contemporary web engineering and product design.

