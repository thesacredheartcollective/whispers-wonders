# Whispers & Wonders

A tarot, crystal, and spiritual wellness resource for Florida's Tampa Bay area. Built and maintained by **Kenya Ferguson** through **The Soft Heart Collective LLC**.

Live site: [thesoftheartcollective.com](https://www.thesoftheartcollective.com)

---

## Overview

Whispers & Wonders is a content-rich, SEO-optimized web application providing:

- **78 Tarot Card Pages** — Full meanings, keywords, crystal pairings, journal prompts, and suggested spreads for every card in the Rider-Waite-Smith tradition.
- **Crystal Guide** — A reference of crystals paired with tarot cards, including properties and usage guidance.
- **Blog** — Long-form educational articles (1,300+ words each) on tarot practice, crystals, rituals, and local spirituality.
- **Events** — 7 detailed Tampa Bay spiritual event listings (300+ words each) with visitor guidance, accessibility info, and practical tips.
- **Sacred Spaces** — 6 detailed Tampa Bay sacred site guides (300+ words each) with Google Maps links, best times to visit, and ritual suggestions.
- **Metaphysical Directory** — Local shops, practitioners, and resources categorized by type.
- **Moon Calendar** — Current moon phase display with ritual guidance.
- **Tarot Spreads** — 10 spread layouts with position meanings and guidance.
- **Contact Form** — Direct contact with site owner identification.
- **Privacy Policy & Terms** — Legal pages for AdSense compliance.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.x |
| Routing | Wouter | 3.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui (Radix) | Latest |
| Animations | Framer Motion | 12.x |
| Backend | Express | 4.x |
| API Layer | tRPC | 11.x |
| Database | MySQL (TiDB) | — |
| ORM | Drizzle ORM | 0.44.x |
| Build Tool | Vite | 7.x |
| Language | TypeScript | 5.9 |
| Package Manager | pnpm | 10.x |
| Testing | Vitest | 2.x |

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- MySQL/TiDB database (connection string via `DATABASE_URL`)

### Installation

```bash
git clone https://github.com/thesacredheartcollective/whispers-wonders.git
cd whispers-wonders
pnpm install
```

### Environment Variables

Create a `.env` file (or configure via your hosting platform):

```env
DATABASE_URL=mysql://user:pass@host:port/dbname
JWT_SECRET=your-jwt-secret
PORT=3000
```

Additional system-managed variables (auto-injected in Manus hosting):
- `VITE_APP_ID` — OAuth application ID
- `OAUTH_SERVER_URL` — OAuth backend URL
- `VITE_OAUTH_PORTAL_URL` — Login portal URL
- `BUILT_IN_FORGE_API_URL` / `BUILT_IN_FORGE_API_KEY` — Manus API access
- `VITE_ANALYTICS_ENDPOINT` / `VITE_ANALYTICS_WEBSITE_ID` — Analytics

### Development

```bash
pnpm run dev
```

Server starts at `http://localhost:3000` with Vite HMR for instant frontend updates.

### Production Build

```bash
pnpm run build
pnpm start
```

### Database Migrations

```bash
pnpm drizzle-kit generate   # Generate migration SQL from schema changes
pnpm drizzle-kit migrate    # Apply migrations
```

---

## Deployment

The site is deployed via **Manus Autoscale** (serverless) hosting:

1. Make changes and commit to the `main` branch.
2. In the Manus Management UI, click **Publish** (requires a saved checkpoint).
3. The site auto-deploys with SSL, CDN, and autoscaling.

Custom domain `thesoftheartcollective.com` is configured via Manus Settings > Domains.

For manual deployment to other platforms, the build output is:
- Frontend: `dist/` (Vite build)
- Backend: `dist/index.js` (esbuild bundle)

---

## SEO & AdSense Features

- **JSON-LD Schema Markup** — WebSite, BlogPosting, BreadcrumbList, and LocalBusiness schemas on all key pages.
- **Dynamic Canonical Tags** — Automatically set per route via the `CanonicalTag` component.
- **Security Headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Content-Security-Policy applied server-side.
- **Open Graph & Twitter Cards** — Meta tags for social sharing.
- **Google AdSense** — Script tag pre-loaded in `index.html` (publisher ID: `ca-pub-1452252933699181`).
- **Umami Analytics** — Privacy-friendly analytics integration.

---

## Content Guidelines

- All content is original, written by Kenya Ferguson.
- No third-party video embeds (YouTube, Vimeo, etc.) on any page.
- No AI-generated content published as editorial.
- No fabricated reviews, testimonials, or ratings.
- Tarot content is for educational/entertainment purposes with appropriate disclaimers.

---

## License

Proprietary. All rights reserved by The Soft Heart Collective LLC.
