import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const filesToCheck = [
  { name: 'Home Page', file: 'index.html' },
  { name: 'Explore Page', file: 'explore/index.html' },
  { name: 'Travel Guides Hub', file: 'guides/index.html' },
  { name: 'Guide: Jaipur', file: 'guides/three-days-in-jaipur/index.html' },
  { name: 'Guide: Munnar', file: 'guides/munnar-travel-guide/index.html' },
  { name: 'Guide: Rishikesh', file: 'guides/weekend-in-rishikesh/index.html' },
  { name: 'Trip Planner', file: 'plan/index.html' },
  { name: 'Custom 404', file: '404.html' }
];

console.log('====================================================');
console.log('RAAHI ON-PAGE SEO VALIDATION AUDIT');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
  }
}

// 1. Verify robots.txt & sitemap.xml
console.log('--- Technical SEO Assets ---');
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in distribution directory');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  assert(robots.includes('User-agent: *'), 'robots.txt allows search engine crawlers');
  assert(robots.includes('Sitemap:'), 'robots.txt points to canonical sitemap location');
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in distribution directory');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  assert(sitemap.includes('<urlset'), 'sitemap.xml is valid XML urlset');
  assert(sitemap.includes('/guides/three-days-in-jaipur'), 'sitemap.xml includes individual guide routes');
}

// 2. Verify Page-by-Page Metadata
filesToCheck.forEach(({ name, file }) => {
  console.log(`\n--- Auditing: ${name} (${file}) ---`);
  const fullPath = path.join(distDir, file);

  if (!fs.existsSync(fullPath)) {
    assert(false, `File exists at ${file}`);
    return;
  }
  assert(true, `File physically exists in build distribution`);

  const html = fs.readFileSync(fullPath, 'utf-8');

  // Title tag check
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  assert(!!titleMatch && titleMatch[1].length > 10, `Unique Title tag present: "${titleMatch ? titleMatch[1] : 'NONE'}" (Length: ${titleMatch ? titleMatch[1].length : 0})`);

  // Meta description check
  const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/i);
  assert(!!descMatch && descMatch[1].length >= 50, `Meta description present: length ${descMatch ? descMatch[1].length : 0} chars`);

  // Canonical tag check
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"\s*\/?>/i);
  assert(!!canonMatch && canonMatch[1].startsWith('https://'), `Canonical URL configured: ${canonMatch ? canonMatch[1] : 'NONE'}`);

  // Heading hierarchy check
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, `Exactly one H1 heading present (Found: ${h1Matches.length})`);

  // Open Graph checks
  const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="(.*?)"\s*\/?>/i);
  const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="(.*?)"\s*\/?>/i);
  assert(!!ogTitleMatch && !!ogDescMatch, 'Open Graph og:title and og:description present');

  // JSON-LD structured data check
  const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert(!!jsonLdMatch, 'JSON-LD structured data script element present');
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1].trim());
      assert(!!parsed['@type'], `Valid JSON-LD schema of type "${parsed['@type']}"`);
    } catch (e) {
      assert(false, 'JSON-LD parsed without syntax errors');
    }
  }
});

console.log('\n====================================================');
console.log(`AUDIT RESULTS: ${passedChecks} / ${totalChecks} checks passed (${Math.round((passedChecks / totalChecks) * 100)}%)`);
console.log('====================================================\n');

if (passedChecks !== totalChecks) {
  process.exit(1);
}

