import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://thesoftheartcollective.com';

const staticRoutes = [
  '/',
  '/cards',
  '/blog',
  '/events',
  '/sacred-spaces',
  '/directory',
  '/moon-calendar',
  '/crystal-guide',
  '/spreads',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

const cardSlugs = [
  "the-fool", "the-magician", "the-high-priestess", "the-empress", "the-emperor",
  "the-hierophant", "the-lovers", "the-chariot", "strength", "the-hermit",
  "wheel-of-fortune", "justice", "the-hanged-man", "death", "temperance",
  "the-devil", "the-tower", "the-star", "the-moon", "the-sun", "judgement", "the-world",
  "ace-of-wands", "two-of-wands", "three-of-wands", "four-of-wands", "five-of-wands",
  "six-of-wands", "seven-of-wands", "eight-of-wands", "nine-of-wands", "ten-of-wands",
  "page-of-wands", "knight-of-wands", "queen-of-wands", "king-of-wands",
  "ace-of-cups", "two-of-cups", "three-of-cups", "four-of-cups", "five-of-cups",
  "six-of-cups", "seven-of-cups", "eight-of-cups", "nine-of-cups", "ten-of-cups",
  "page-of-cups", "knight-of-cups", "queen-of-cups", "king-of-cups",
  "ace-of-swords", "two-of-swords", "three-of-swords", "four-of-swords", "five-of-swords",
  "six-of-swords", "seven-of-swords", "eight-of-swords", "nine-of-swords", "ten-of-swords",
  "page-of-swords", "knight-of-swords", "queen-of-swords", "king-of-swords",
  "ace-of-pentacles", "two-of-pentacles", "three-of-pentacles", "four-of-pentacles", "five-of-pentacles",
  "six-of-pentacles", "seven-of-pentacles", "eight-of-pentacles", "nine-of-pentacles", "ten-of-pentacles",
  "page-of-pentacles", "knight-of-pentacles", "queen-of-pentacles", "king-of-pentacles"
];

const blogSlugs = [
  "beginners-guide-tarot",
  "tarot-and-the-moon",
  "crystals-for-tarot",
  "spiritual-tampa-bay",
  "daily-tarot-ritual"
];

const allRoutes = [
  ...staticRoutes,
  ...cardSlugs.map(slug => `/cards/${slug}`),
  ...blogSlugs.map(slug => `/blog/${slug}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : (staticRoutes.includes(route) ? '0.8' : '0.6')}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'client/public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
