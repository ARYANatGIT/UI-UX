import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const screenshotsDir = path.resolve(__dirname, '../submission/screenshots');
const seoEvidenceDir = path.resolve(__dirname, '../submission/seo-evidence');

// Ensure destination directories exist
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
if (!fs.existsSync(seoEvidenceDir)) fs.mkdirSync(seoEvidenceDir, { recursive: true });

// Browser executable search
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const chromePath = CHROME_PATHS.find(p => fs.existsSync(p));
if (!chromePath) {
  console.error('No compatible Chrome or Edge executable found on system.');
  process.exit(1);
}

// MIME types for static server
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

// Start lightweight static server
const PORT = 4173;
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(distDir, reqPath);

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback to index.html for client-side routing if file doesn't exist
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Local preview server listening on http://localhost:${PORT}`);

  try {
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log('Browser launched successfully. Capturing high-resolution screenshots...\n');

    // 1. Homepage Desktop
    console.log('Capturing: 01-homepage-desktop.png (1440x900)...');
    let page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '01-homepage-desktop.png'), fullPage: false });
    await page.close();

    // 2. Homepage Mobile
    console.log('Capturing: 02-homepage-mobile.png (390x844)...');
    page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '02-homepage-mobile.png'), fullPage: false });
    await page.close();

    // 3. Explore Page Desktop
    console.log('Capturing: 03-explore-desktop.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/explore`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '03-explore-desktop.png'), fullPage: false });
    await page.close();

    // 4. Explore Filtered
    console.log('Capturing: 04-explore-filtered.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/explore?category=Culture+%26+Heritage&region=North`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '04-explore-filtered.png'), fullPage: false });
    await page.close();

    // 5. Explore Empty State
    console.log('Capturing: 05-explore-empty-state.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/explore?q=NonExistentCityXYZ`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '05-explore-empty-state.png'), fullPage: false });
    await page.close();

    // 6. Travel Guides Hub
    console.log('Capturing: 06-guides-desktop.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/guides`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '06-guides-desktop.png'), fullPage: false });
    await page.close();

    // 7. Full Article Page (Jaipur)
    console.log('Capturing: 07-guide-article-jaipur.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/guides/three-days-in-jaipur`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '07-guide-article-jaipur.png'), fullPage: false });
    await page.close();

    // 8. Trip Planner Initial
    console.log('Capturing: 08-trip-planner-initial.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/plan`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '08-trip-planner-initial.png'), fullPage: false });
    await page.close();

    // 9. Trip Planner Populated Itinerary
    console.log('Capturing: 09-trip-planner-populated.png (1440x900)...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/plan?add=hampi`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => window.scrollBy(0, 400));
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotsDir, '09-trip-planner-populated.png'), fullPage: false });
    await page.close();

    // 10. Mobile Navigation Open
    console.log('Capturing: 10-mobile-navigation.png (390x844)...');
    page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('.mobile-toggle');
    await page.evaluate(() => {
      const toggle = document.querySelector('.mobile-toggle');
      if (toggle) toggle.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotsDir, '10-mobile-navigation.png'), fullPage: false });
    await page.close();

    // 11. SEO Evidence: HTML Head & Schema Inspection
    console.log('Capturing SEO evidence: 01-metadata-and-schema-inspection.png...');
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/guides/munnar-travel-guide`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(seoEvidenceDir, '01-metadata-and-schema-inspection.png'), fullPage: false });
    await page.close();

    // 12. SEO Evidence: Technical SEO Sitemap
    console.log('Capturing SEO evidence: 02-sitemap-xml-inspection.png...');
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1.5 });
    await page.goto(`http://localhost:${PORT}/sitemap.xml`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(seoEvidenceDir, '02-sitemap-xml-inspection.png'), fullPage: false });
    await page.close();

    await browser.close();
    console.log('\nAll 12 screenshots captured and verified successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

