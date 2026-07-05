# Project Architecture

## System Overview

Whispers & Wonders is a full-stack web application using a monorepo structure with shared TypeScript types between client and server. The application follows a **tRPC-first** architecture where the server defines typed procedures consumed directly by the React frontend without any REST boilerplate.

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                   │
│  React 19 + Tailwind 4 + Wouter + tRPC React Query  │
└────────────────────────┬────────────────────────────┘
                         │ HTTP (tRPC over /api/trpc)
┌────────────────────────▼────────────────────────────┐
│                Express Server (Node.js)               │
│  Security Headers → OAuth → tRPC → Static/Vite      │
└────────────────────────┬────────────────────────────┘
                         │ SQL (Drizzle ORM)
┌────────────────────────▼────────────────────────────┐
│              MySQL / TiDB Database                    │
│              (Users, Sessions)                        │
└─────────────────────────────────────────────────────┘
```

---

## Request Flow

1. **Browser** sends request to Express server.
2. **Security middleware** adds X-Frame-Options, CSP, Referrer-Policy headers.
3. **Storage proxy** handles `/manus-storage/*` asset requests.
4. **OAuth routes** handle `/api/oauth/*` authentication flows.
5. **tRPC middleware** handles `/api/trpc/*` typed API calls.
6. **Vite (dev)** or **static files (prod)** serve the React SPA for all other routes.

---

## Data Architecture

The site uses a **static data + dynamic auth** hybrid model:

### Static Data (Client-Side)
All content data is compiled into the client bundle as TypeScript modules:

| Data File | Content | Records |
|-----------|---------|---------|
| `cards.ts` | 78 tarot card definitions | 78 |
| `blog.ts` | Blog post content | 5 |
| `events.ts` | Event listings | 7 |
| `sacredSpaces.ts` | Sacred space guides | 6 |
| `directory.ts` | Business directory | 23 |
| `spreads.ts` | Tarot spread layouts | 10 |

This approach was chosen because:
- Content changes infrequently (editorial, not user-generated).
- Eliminates database queries for read-heavy pages.
- Enables instant page loads with no API latency.
- Simplifies SEO (all content in initial HTML via SSR-like bundle).

### Dynamic Data (Server-Side)
The database stores only authentication/user data:
- `users` table — OAuth identity, roles, timestamps.

---

## Component Architecture

### Layout System
```
App.tsx
├── ThemeProvider (dark theme)
├── TooltipProvider
├── Toaster (notifications)
├── ScrollToTop (route change handler)
├── CanonicalTag (dynamic SEO)
└── Layout (header + footer wrapper)
    └── Switch (route matching)
        ├── Home
        ├── Cards / CardDetail
        ├── Blog / BlogPost
        ├── Events
        ├── SacredSpaces
        ├── Directory
        ├── MoonCalendar
        ├── CrystalGuide
        ├── Spreads
        ├── About
        ├── Contact
        ├── Privacy / Terms
        └── NotFound
```

### Shared Components
- `Layout.tsx` — Site-wide header navigation and footer with social links.
- `AuthorBio.tsx` — Reusable author attribution block for blog posts.
- `JsonLd.tsx` — Schema.org structured data components (WebSite, BlogPosting, BreadcrumbList, LocalBusiness).
- `CanonicalTag.tsx` — Dynamic canonical URL management.
- `ErrorBoundary.tsx` — Graceful error handling.

---

## SEO Strategy

### Per-Page Schema Markup
| Page Type | Schema Types |
|-----------|-------------|
| Homepage | WebSite + LocalBusiness |
| Blog posts | BlogPosting + BreadcrumbList |
| Card pages | BreadcrumbList |
| All pages | Dynamic canonical tag |

### Security Headers (Server-Side)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: default-src 'self'; ...`

---

## Build & Deploy Pipeline

```
Source (TypeScript)
    │
    ├── pnpm run build
    │   ├── vite build → client/dist/ (React SPA)
    │   └── esbuild → dist/index.js (Express server)
    │
    └── pnpm start → Node.js serves both API and static files
```

The production server is a single Node.js process that:
1. Serves the tRPC API at `/api/trpc`.
2. Handles OAuth callbacks at `/api/oauth/*`.
3. Proxies storage assets at `/manus-storage/*`.
4. Serves the compiled React SPA for all other routes (SPA fallback).

---

## Key Design Decisions

1. **No video embeds** — All card pages use original written content only (AdSense compliance).
2. **Static content in bundle** — Faster loads, simpler infrastructure, no CMS dependency.
3. **Dark theme** — Matches the mystical/spiritual aesthetic of the brand.
4. **tRPC over REST** — End-to-end type safety with zero boilerplate.
5. **Wouter over React Router** — Lightweight routing (2KB vs 30KB+).
6. **Tailwind 4** — Utility-first CSS with OKLCH color support.
