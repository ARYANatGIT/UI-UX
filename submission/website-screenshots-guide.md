# RAAHI — Website Screenshots & Interface Guide
**Course:** UI/UX (Semester V) • **Branch:** CSH  
**Department:** Computer Science & Engineering  
**Institution:** Indian Institute of Information Technology, Nagpur (IIITN)  
**Project:** RAAHI — Discover India Differently (Editorial Travel Discovery & Planning Platform)  

---

## 1. Overview & Capture Methodology

This document presents high-resolution screenshots of the developed **RAAHI** travel discovery and itinerary planning application. All screenshots were genuinely captured from the live application running in headless Chrome via automated Puppeteer scripts (`npm run screenshot`).

### Testing & Viewport Specifications:
- **Desktop Standard Viewport:** 1440 × 900 px (Device Scale Factor: 1.5×, High-DPI Retina)
- **Mobile Responsive Viewport:** 390 × 844 px (iPhone 12/13/14 baseline, Touch-enabled, DPR: 2.0×)
- **Tablet / Medium Viewport:** 768 × 1024 px (Fluid breakpoint validation)
- **Asset Storage Directory:** `submission/screenshots/` and `submission/seo-evidence/`

---

## 2. Professional Screenshot Checklist & Directory Index

| No. | File Name | Route / Context | Viewport | Key Features & Interaction Demonstrated |
|:---:|:---|:---|:---:|:---|
| 01 | [`01-homepage-desktop.png`](screenshots/01-homepage-desktop.png) | `/` (Home) | 1440 × 900 | Sticky header with blur, brand compass wordmark, editorial hero typography ("India is more than a destination. It's a feeling."), integrated live search, CTA buttons, and elevation caption. |
| 02 | [`02-homepage-mobile.png`](screenshots/02-homepage-mobile.png) | `/` (Mobile) | 390 × 844 | Responsive mobile layout, mobile hamburger trigger, fluid clamp typography, stacked search box, and full touch-target buttons. |
| 03 | [`03-explore-desktop.png`](screenshots/03-explore-desktop.png) | `/explore` | 1440 × 900 | Destination catalog grid, result counter (Showing 14 of 14), sort order selector, left-hand facet filter sidebar (moods, regions, durations, budget tiers), and multi-badge destination cards. |
| 04 | [`04-explore-filtered.png`](screenshots/04-explore-filtered.png) | `/explore?category=Culture+%26+Heritage&region=North` | 1440 × 900 | Active filter state with interactive removable filter pills, synchronized URL query parameters, refined destination grid showing North Indian heritage circuits. |
| 05 | [`05-explore-empty-state.png`](screenshots/05-explore-empty-state.png) | `/explore?q=NonExistentCityXYZ` | 1440 × 900 | Polished empty-state design pattern with custom compass icon, clear explanation, accessible ARIA live-region, and "Reset All Filters" recovery button. |
| 06 | [`06-guides-desktop.png`](screenshots/06-guides-desktop.png) | `/guides` | 1440 × 900 | The Raahi Travel Journal landing page, category filter tabs, search field, large featured cover story layout, reading times, author attribution, and publication dates. |
| 07 | [`07-guide-article-jaipur.png`](screenshots/07-guide-article-jaipur.png) | `/guides/three-days-in-jaipur` | 1440 × 900 | Long-form editorial article: Breadcrumb navigation, category and duration badges, distinct H1, author metadata, Web Share action, high-res photography of Amer Fort, and sticky Table of Contents. |
| 08 | [`08-trip-planner-initial.png`](screenshots/08-trip-planner-initial.png) | `/plan` | 1440 × 900 | Trip Itinerary Planner initial workflow: Stepper progress indicator, destination search autocomplete, form inputs for dates and party size, and summary sidebar. |
| 09 | [`09-trip-planner-populated.png`](screenshots/09-trip-planner-populated.png) | `/plan?add=hampi` | 1440 × 900 | Fully populated multi-stop itinerary (Jaipur, Munnar, Hampi), reordering controls, day-by-day visual schedule, indicative budget calculation breakdown, and toast feedback. |
| 10 | [`10-mobile-navigation.png`](screenshots/10-mobile-navigation.png) | Mobile Drawer Open | 390 × 844 | Full-height accessible mobile navigation drawer, route descriptions, focus management, quick itinerary action, and backdrop overlay. |
| 11 | [`01-metadata-and-schema-inspection.png`](seo-evidence/01-metadata-and-schema-inspection.png) | `/guides/munnar-travel-guide` | 1440 × 900 | In-depth guide view verifying structured data, canonical link, breadcrumbs, and LCP image loading. |
| 12 | [`02-sitemap-xml-inspection.png`](seo-evidence/02-sitemap-xml-inspection.png) | `/sitemap.xml` | 1200 × 800 | Raw XML sitemap inspection verifying canonical URLs, change frequencies, last-modified dates, and priorities. |

---

## 3. Detailed Walkthrough of Key Screens

### 3.1 Homepage Desktop (`01-homepage-desktop.png`)
- **Visual Direction:** Warm ivory background (`#F8F5ED`) paired with deep forest green (`#173F35`) and muted terracotta (`#C66D4B`) accents.
- **Editorial Typography:** Display serif (*Playfair Display*) for the hero statement and clean sans-serif (*Plus Jakarta Sans*) for supporting copy and controls.
- **Live Search & Discovery:** The central search box provides typeahead filtering into 14+ Indian destinations, instantly routing visitors to `/explore?q=...`.
- **Navigation:** Fixed sticky header with 10px blur backdrop, active route indicator, and accessible skip link for keyboard users.

### 3.2 Mobile Responsiveness (`02-homepage-mobile.png` & `10-mobile-navigation.png`)
- **Mobile First Adaptation:** Verified at 390px width without horizontal overflow.
- **Comfortable Touch Targets:** All navigation items and buttons meet the minimum 44×44 pt touch target requirement.
- **Drawer Interaction:** The hamburger menu smoothly reveals an accessible navigation sheet containing secondary subheadings and a prominent trip-planning CTA.

### 3.3 Explore India Hub & Interactive Filtering (`03-explore-desktop.png` & `04-explore-filtered.png`)
- **Faceted Sidebar:** Allows concurrent filtering across four distinct dimensions:
  1. Travel Mood & Category (e.g. *Mountains & Mist*, *Culture & Heritage*, *Slow Travel*)
  2. Geographical Region (*North*, *South*, *West*, *East*, *Northeast*, *Central*)
  3. Trip Duration (*2-3 days*, *4-5 days*, *6+ days*)
  4. Indicative Budget Tier (*Budget-conscious*, *Moderate comfort*, *Boutique & Heritage*)
- **URL Synchronization:** Filter selections are synced to browser URL search parameters (`?category=...&region=...`), enabling shareable search states and working browser back/forward buttons.
- **Result Counter & Reset:** Displays exact match counts with quick-dismiss filter tags.

### 3.4 The Raahi Travel Journal & In-Depth Guide (`06-guides-desktop.png` & `07-guide-article-jaipur.png`)
- **Editorial Architecture:** Built like a high-end travel publication rather than a generic booking directory.
- **In-Depth Content:** Three fully developed long-form guides for Jaipur, Munnar, and Rishikesh, each including:
  - Table of Contents with working in-page anchor links (`#day-1`, `#cultural-etiquette`, `#practical-logistics`)
  - Practical day-by-day itineraries with historical context
  - Cultural etiquette considerations (modesty, artisan respect, environmental care)
  - Logistics blueprints with transit hubs, entry passes, and best seasons
  - One-click "Add to Trip Planner" action button

### 3.5 Interactive Trip Itinerary Planner (`08-trip-planner-initial.png` & `09-trip-planner-populated.png`)
- **Step 1 (Destination Selector):** Multi-select search dropdown preventing accidental duplicate entries with instant toast feedback.
- **Step 2 (Travel Preferences):** Controls for start date (with validation preventing past dates), traveler count (1–15), duration (1–30 days), and travel style.
- **Step 3 (Day-by-Day Visual Itinerary):** Proportional distribution of stops across journey days, destination reordering (Up/Down arrows with keyboard triggers), and custom note inputs per day.
- **Indicative Budget Estimator:** Transparent, formula-based calculation multiplying base daily destination costs by travel style tiers and party size.
- **Offline Persistence & Export:** Saves drafts in `localStorage`, restores automatically, supports native Web Share API with clipboard copy fallback, and provides a dedicated print layout (`@media print`) that produces a clean PDF dossier.

---

## 4. Manual Screenshot Verification Procedure

If capturing additional screenshots manually:
1. Run the local preview server:
   ```bash
   npm run build
   npm run preview
   ```
2. Open Google Chrome or Microsoft Edge.
3. Open Developer Tools (`F12`), toggle the Device Toolbar (`Ctrl+Shift+M`).
4. Set dimensions to `1440 × 900` for desktop or `390 × 844` for mobile.
5. In the DevTools menu, select **Capture full size screenshot** or **Capture screenshot**.
6. Save images into `submission/screenshots/` using the established naming convention.

