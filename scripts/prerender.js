import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const SITE_URL = process.env.VITE_SITE_URL || 'https://raahi-travel.example.com';

// Define route metadata and static semantic content for crawler prerendering
const routes = [
  {
    path: '/',
    outputPath: 'index.html',
    title: 'Raahi — Discover Beautiful Places to Visit in India | Travel Discovery & Planning',
    description: 'Discover India differently with Raahi. Explore authentic travel guides, curated destinations from Munnar to Spiti, and craft personalized journey itineraries.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    h1: "India is more than a destination. It's a feeling.",
    contentSnippet: `
      <section>
        <p>Journey past commercial tourist loops. Discover high Himalayan passes, misty tea slopes in the Western Ghats, living artisan traditions, and secluded coastal havens across India.</p>
        <nav aria-label="Curated Destinations">
          <ul>
            <li><a href="/explore?category=Culture+%26+Heritage">Culture & Heritage in Jaipur, Hampi, and Varanasi</a></li>
            <li><a href="/explore?category=Mountains+%26+Mist">Mountains & Mist in Munnar, Spiti, and Ladakh</a></li>
            <li><a href="/guides/three-days-in-jaipur">Field Guide: Three Days in Jaipur</a></li>
            <li><a href="/guides/munnar-travel-guide">Slow Guide to Munnar</a></li>
            <li><a href="/guides/weekend-in-rishikesh">Mindful Weekend in Rishikesh</a></li>
            <li><a href="/plan">Interactive Itinerary Planner</a></li>
          </ul>
        </nav>
      </section>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Raahi",
      "url": `${SITE_URL}/`,
      "description": "Discover India differently. An editorial guide to curated destinations, authentic travel guides, and personalized journey planning.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/explore?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  },
  {
    path: '/explore',
    outputPath: 'explore/index.html',
    title: 'Explore Indian Destinations by Region and Travel Style | Raahi',
    description: 'Search and filter through 14+ authentic Indian destinations by landscape mood, geographical region, duration, and indicative budget.',
    canonical: `${SITE_URL}/explore`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    h1: 'Find your kind of India.',
    contentSnippet: `
      <section>
        <p>Discover verified destinations across 6 Indian geographical regions: North, South, East, West, Northeast, and Central India. Filter by category, budget tier, and duration.</p>
        <ul>
          <li><a href="/guides/three-days-in-jaipur">Jaipur, Rajasthan — The Pink City</a></li>
          <li><a href="/guides/munnar-travel-guide">Munnar, Kerala — Emerald Tea Terraces</a></li>
          <li><a href="/guides/weekend-in-rishikesh">Rishikesh, Uttarakhand — Himalayan Yoga Capital</a></li>
          <li><a href="/explore?region=South">Hampi, Karnataka — Vijayanagara Stone Ruins</a></li>
          <li><a href="/explore?region=Northeast">Meghalaya — Living Root Bridges</a></li>
          <li><a href="/explore?region=West">South Goa — Quiet Susegad Coastline</a></li>
          <li><a href="/explore?region=North">Spiti Valley — High Altitude Desert</a></li>
        </ul>
      </section>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Explore Indian Destinations — Raahi",
      "description": "Catalog of curated Indian destinations across North, South, Northeast, West, and Central India.",
      "url": `${SITE_URL}/explore`
    }
  },
  {
    path: '/guides',
    outputPath: 'guides/index.html',
    title: 'India Travel Guides and Itineraries | Raahi',
    description: 'Read in-depth, culturally rooted travel itineraries and field guides for India: Jaipur, Munnar, Rishikesh, Spiti Valley, and living root bridges.',
    canonical: `${SITE_URL}/guides`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    h1: 'Stories, Routes & Contemplations — The Raahi Journal',
    contentSnippet: `
      <section>
        <p>Long-form field guides exploring the architectural histories, artisan workshops, and quiet trails of India.</p>
        <article>
          <h2><a href="/guides/three-days-in-jaipur">Three Days in Jaipur: Beyond the Royal Pink Facades</a></h2>
          <p>From geometric astronomical observatories to generational block-printing ateliers in Sanganer.</p>
        </article>
        <article>
          <h2><a href="/guides/munnar-travel-guide">The Slow Guide to Munnar: Tea Forests & Shola Trails</a></h2>
          <p>A mindful journey into Kerala’s misty highlands, endemic biodiversity, and estate heritage.</p>
        </article>
        <article>
          <h2><a href="/guides/weekend-in-rishikesh">A Mindful Weekend in Rishikesh: River, Ridge & Reflection</a></h2>
          <p>Where Himalayan waters meet ancient contemplative practices and quiet forest trails.</p>
        </article>
      </section>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "The Raahi Travel Journal",
      "url": `${SITE_URL}/guides`
    }
  },
  {
    path: '/guides/three-days-in-jaipur',
    outputPath: 'guides/three-days-in-jaipur/index.html',
    title: 'Three Days in Jaipur: Beyond the Royal Pink Facades | Raahi Travel Journal',
    description: 'Discover Jaipur beyond the surface with this curated 3-day itinerary covering Amer Fort, royal observatories, artisan bazaars, and heritage dining.',
    canonical: `${SITE_URL}/guides/three-days-in-jaipur`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    h1: 'The Pink City Beyond Palaces: A 3-Day Heritage & Craft Guide',
    contentSnippet: `
      <article>
        <p>While most travelers check off Jaipur in a frantic blur of palace gates, India’s first planned city rewards deliberate, unhurried exploration. Designed in 1727 under Maharaja Sawai Jai Singh II, Jaipur represents a rare urban confluence of Rajput martial fortifications, Mughal geometry, and Vastu Shastra.</p>
        <h2>Day 1: The Royal Core & Astronomical Wonders</h2>
        <p>Hawa Mahal, City Palace complex, and Jantar Mantar UNESCO stone observatory.</p>
        <h2>Day 2: Fortresses, Water Engineering & Sunsets</h2>
        <p>Amer Fort, Panna Meena Ka Kund stepwell, and Nahargarh sunset ramparts.</p>
        <h2>Day 3: Living Craft Ateliers & Sanganer</h2>
        <p>Sanganer hand block printing cooperatives and Kot Jewar blue pottery studios.</p>
        <nav><a href="/plan?add=jaipur">Add Jaipur to Your Itinerary</a></nav>
      </article>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "The Pink City Beyond Palaces: A 3-Day Heritage & Craft Guide",
      "datePublished": "2026-10-15",
      "author": { "@type": "Person", "name": "Aditi Sharma" }
    }
  },
  {
    path: '/guides/munnar-travel-guide',
    outputPath: 'guides/munnar-travel-guide/index.html',
    title: 'The Slow Guide to Munnar: Tea Forests & Shola Trails | Raahi Travel Journal',
    description: 'Explore Munnar mindfully: trekking shola-grasslands, observing the Nilgiri Tahr, discovering tea heritage, and experiencing restorative mountain stays.',
    canonical: `${SITE_URL}/guides/munnar-travel-guide`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    h1: 'Mists, Shola Forests & Tea Estates: The Slow Guide to Munnar',
    contentSnippet: `
      <article>
        <p>Rising to 1,600 metres in the Idukki district of Kerala, Munnar is an extraordinary ecological sanctuary where shola cloud forests coexist with 19th-century orthodox tea estates.</p>
        <h2>Eravikulam & The Nilgiri Tahr Sanctuary</h2>
        <p>Home to the largest surviving population of the endangered Nilgiri Tahr and summit of Anamudi.</p>
        <h2>Walking the Historic Tea Trails</h2>
        <p>KDHP Tea Museum and guided walks watching skilled estate workers harvest orthodox tea.</p>
        <h2>Kolukkumalai: The World’s Highest Tea Estate</h2>
        <p>Pre-dawn 4x4 ascent to 2,400 metres for sunrise above drifting clouds.</p>
        <nav><a href="/plan?add=munnar">Add Munnar to Your Itinerary</a></nav>
      </article>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Mists, Shola Forests & Tea Estates: The Slow Guide to Munnar",
      "datePublished": "2026-10-18",
      "author": { "@type": "Person", "name": "Dr. Vivek Menon" }
    }
  },
  {
    path: '/guides/weekend-in-rishikesh',
    outputPath: 'guides/weekend-in-rishikesh/index.html',
    title: 'A Mindful Weekend in Rishikesh: River, Ridge & Reflection | Raahi Travel Journal',
    description: 'Plan the perfect mindful weekend in Rishikesh: sunrise yoga, forest ashrams, respectful river adventures, and the sacred Ganga aarti at dusk.',
    canonical: `${SITE_URL}/guides/weekend-in-rishikesh`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    h1: 'Between River and Ridge: A Mindful Weekend in Rishikesh',
    contentSnippet: `
      <article>
        <p>Where the Ganga rushes from Himalayan gorges into Rishikesh, quiet ashrams and pine-forested ridges create a sanctuary for reflection and outdoor exploration.</p>
        <h2>Saturday: Dawn Prana, Beatles Ashram & Evening Aarti</h2>
        <p>Sunrise meditation by the Ganga, exploring the 84 stone caves of Chaurasi Kutia, and the sacred oil lamp ritual at Triveni Ghat.</p>
        <h2>Sunday: Neer Garh Forest Trail & Regulated River Run</h2>
        <p>Morning hike to cascading limestone pools and certified whitewater rafting runs.</p>
        <nav><a href="/plan?add=rishikesh">Add Rishikesh to Your Itinerary</a></nav>
      </article>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Between River and Ridge: A Mindful Weekend in Rishikesh",
      "datePublished": "2026-10-22",
      "author": { "@type": "Person", "name": "Rohan Deshmukh" }
    }
  },
  {
    path: '/plan',
    outputPath: 'plan/index.html',
    title: 'Plan Your India Trip | Raahi Itinerary Builder',
    description: 'Craft a personalized, day-by-day travel itinerary across India. Choose destinations, customize pace, calculate indicative costs, and save offline.',
    canonical: `${SITE_URL}/plan`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    h1: 'Plan your personalized journey.',
    contentSnippet: `
      <section>
        <p>Interactive client-side itinerary planner for India. Choose stops from 14+ destinations, configure trip duration and travelers, reorder itinerary days, and export a print-ready travel dossier.</p>
        <nav>
          <a href="/explore">Browse destinations catalog</a>
        </nav>
      </section>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Raahi Trip Itinerary Planner",
      "applicationCategory": "TravelApplication",
      "url": `${SITE_URL}/plan`
    }
  },
  {
    path: '/404',
    outputPath: '404.html',
    title: 'Page Not Found (404) | Raahi — Discover India Differently',
    description: 'The requested travel route or guide cannot be found. Return to Raahi homepage or explore our destination catalog.',
    canonical: `${SITE_URL}/404`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    h1: 'You’ve wandered off the map.',
    contentSnippet: `
      <section>
        <p>The page you requested is not available. Explore known routes below:</p>
        <nav>
          <a href="/">Return to Home</a> | <a href="/explore">Explore All Destinations</a> | <a href="/guides">Read Travel Journal</a>
        </nav>
      </section>
    `
  }
];

function prerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template not found at ${templatePath}. Run 'npm run build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');

  console.log(`Starting static prerendering for ${routes.length} routes...`);

  routes.forEach((route) => {
    let html = baseHtml;

    // 1. Replace <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Replace or update <meta name="description">
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Replace or update canonical
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // 4. Update OpenGraph tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:image" content="${route.ogImage}" />`
    );

    // 5. Update Twitter card tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:image" content="${route.ogImage}" />`
    );

    // 6. Inject Schema.org JSON-LD if present
    if (route.schema) {
      const schemaScript = `\n    <script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>`;
      html = html.replace('</head>', `${schemaScript}\n  </head>`);
    }

    // 7. Inject crawler-accessible semantic fallback content into <div id="root">
    const prerenderedBody = `
      <header class="site-header prerender-header">
        <div class="container" style="display:flex; justify-content:space-between; align-items:center; padding:1rem 0;">
          <a href="/" style="font-weight:bold; font-size:1.4rem; color:#173F35; text-decoration:none;">RAAHI</a>
          <nav aria-label="Prerender Navigation">
            <a href="/" style="margin-right:1rem;">Home</a>
            <a href="/explore" style="margin-right:1rem;">Explore</a>
            <a href="/guides" style="margin-right:1rem;">Guides</a>
            <a href="/plan">Plan a Trip</a>
          </nav>
        </div>
      </header>
      <main id="main-content" class="prerender-main" style="padding: 2rem 0;">
        <div class="container">
          <h1 style="color:#173F35; font-family:serif;">${route.h1}</h1>
          ${route.contentSnippet}
        </div>
      </main>
    `;

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${prerenderedBody}</div>`
    );

    // Write file to output location
    const targetFile = path.join(distDir, route.outputPath);
    const targetDir = path.dirname(targetFile);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`  ✓ Generated ${route.outputPath} (${route.canonical})`);
  });

  console.log('Static prerendering complete! All static routes now contain indexable HTML and metadata.');
}

prerender();

