# AI-HANDOFF.md

## Project Overview

**Whispers & Wonders** is a global tarot and spiritual wellness community website with a curated local directory for Tampa Bay, Florida. The site is built with React 19, Express 4, tRPC 11, Tailwind CSS 4, and MySQL.

**Live Site:** https://thesoftheartcollective.com  
**GitHub Repository:** https://github.com/thesacredheartcollective/whispers-wonders  
**Owner:** Kenya Ferguson / The Soft Heart Collective LLC

---

## Recent Updates (July 2026)

### Critical Fix: Tarot Spreads Restored (July 7, 2026)

The Spreads tab was completely non-functional — it only displayed spread names with empty position arrays and had no interactive card-drawing logic. This was rebuilt as a complete interactive tarot reading experience:

- **10 fully interactive spreads** with card drawing, randomization, and interpretation display
- **Fisher-Yates shuffle** for fair card randomization with 30% reversed probability
- **Animated card reveal** sequence with expandable interpretations
- **Full card details** in each position: description, keywords, affirmation, journal prompt, crystal associations, upright/reversed meanings
- **Complete user flow:** Select spread → View positions → Draw cards → See results → Draw again or choose different spread
- **Mobile-responsive** throughout all interaction states
- **Files changed:** `client/src/data/spreads.ts`, `client/src/pages/Spreads.tsx`

### Phase 1: Complete Site Rebuild & AdSense Readiness
- Rebuilt entire site from scratch with clean, documented codebase
- Removed all Minnow Pond Tarot YouTube embeds from 78 card pages
- Added original "Deeper Exploration" content to replace video embeds
- Fixed broken navigation: created functional /contact page, fixed /crystals redirect
- Rewrote About page with E-E-A-T signals (Kenya Ferguson bio, credentials, editorial policy)
- Added author bio sections to all 5 blog posts
- Expanded 7 Events listings to 300+ words each with accessibility info
- Expanded 6 Sacred Spaces listings to 300+ words each with Google Maps links
- Added JSON-LD schema markup (WebSite, BlogPosting, BreadcrumbList)
- Implemented security headers (X-Frame-Options, CSP, Referrer-Policy, X-Content-Type-Options)
- Added dynamic canonical tags to all pages
- Created contact form with backend notification system
- Wrote comprehensive project documentation (README, Architecture, Folder Map, Deployment)

### Phase 2: Homepage Messaging Update
- Updated main tagline from "A mystical tarot and spiritual wellness companion for Florida's Tampa Bay area" to "A global tarot and spiritual wellness community—with a curated guide to Tampa Bay's metaphysical and wellness resources."
- Added prominent callout section: "Wherever you are, you're welcome here" with explanation of global + local positioning
- Repositioned Tampa Bay as a feature (local directory) rather than the entire site identity
- Tested on desktop (1280x720) and mobile (375x812) — responsive design working well

---

## Site Structure

### Key Pages
- **Homepage** (`/`) — Hero, global welcome callout, Card of the Moment, quick links, blog preview
- **Cards** (`/cards`) — 78 tarot cards with filters (Major Arcana, Wands, Cups, Swords, Pentacles)
- **Card Detail** (`/cards/:slug`) — Full card meaning, keywords, crystal pairings, related cards, deeper exploration content
- **Blog** (`/blog`) — 5 long-form posts with author bios (Beginner's Guide, Tarot & Moon, Crystals for Tarot, Daily Ritual, Spiritual Tampa Bay)
- **Blog Post** (`/blog/:slug`) — Individual post with author bio, editorial policy disclaimer
- **Events** (`/events`) — 7 expanded event listings (Full Moon Market, New Moon Circle, Reiki Share, Sound Bath, Tarot 101, Crystal Grids, Psychic Fair)
- **Sacred Spaces** (`/sacred-spaces`) — 6 natural sanctuaries with Google Maps links
- **Crystal Guide** (`/crystal-guide`) — Crystals organized by tarot card pairing
- **Directory** (`/directory`) — 23 metaphysical shops, readers, wellness centers
- **Spreads** (`/spreads`) — 10 fully interactive tarot spread readings with card drawing, randomization, and interpretation
- **Moon Calendar** (`/moon-calendar`) — Lunar phases and rituals
- **About** (`/about`) — Kenya Ferguson bio, site mission, editorial policy, social links
- **Contact** (`/contact`) — Contact form with site owner identification, backend notification system
- **Privacy** (`/privacy`) — Privacy policy
- **Terms** (`/terms`) — Terms of service

### Data Structure
- All site data is stored in `/client/src/data/` as TypeScript files:
  - `cards.ts` — 78 tarot cards with meanings, keywords, crystals, related cards
  - `events.ts` — 7 events with descriptions, accessibility info, practical tips
  - `sacredSpaces.ts` — 6 sacred spaces with coordinates, descriptions, Google Maps links
  - `directory.ts` — 23 directory listings organized by category
  - `spreads.ts` — 10 tarot spreads
  - `moonCalendar.ts` — Lunar phase data
  - `blog.ts` — 5 blog posts with full content
  - `index.ts` — Exports all data

### Backend
- **Contact Form Endpoint** (`trpc.contact.submit`) — Accepts name, email, subject, message; sends notification to site owner
- **Auth System** — Manus OAuth integration (not currently used for public site)
- **Notification System** — Uses built-in `notifyOwner()` helper to alert Kenya Ferguson of contact form submissions

---

## Design & Styling

- **Color Palette:**
  - `--ww-cream` (#F5E6D3) — Primary text, headings
  - `--ww-gold` (#D4AF37) — Accents, links, highlights
  - `--ww-body` (#C9B8A8) — Body text
  - `--ww-muted` (#8B7D6B) — Muted text, secondary info
  - `--ww-card` (#2A2520) — Card backgrounds
  - `--ww-surface` (#1F1B18) — Section backgrounds
  - `--ww-divider` (#3D3530) — Borders
  - `--ww-bg` (#0F0D0B) — Page background

- **Typography:**
  - Headings: Serif font (Crimson Text or similar)
  - Body: Sans-serif (Inter or similar)
  - Font sizes scale responsively with Tailwind breakpoints

- **Components:**
  - Buttons: `.ww-btn` class with gold background, rounded corners
  - Cards: Rounded corners, subtle borders, hover scale effect
  - Forms: Dark backgrounds with gold accents, proper contrast for accessibility

---

## Testing & Verification

- **Unit Tests:** 24 tests passing (auth, site content integrity, data validation)
- **Visual Testing:** Homepage tested on desktop (1280x720) and mobile (375x812)
- **Responsive Design:** All pages tested at multiple breakpoints
- **SEO:** JSON-LD schema markup in place, canonical tags on all pages, meta tags configured
- **Security:** Headers configured (CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options)

---

## Deployment & Hosting

### Hosting Platform
- **Provider:** Manus WebDev (Autoscale / serverless)
- **Space ID:** `Zau8dmvozkdrurVQPRoobs`
- **Domain:** thesoftheartcollective.com (custom domain configured via Manus Settings > Domains)
- **CDN/SSL:** Automatically provided by Manus hosting
- **Analytics:** Manus Analytics (manus-analytics.com/umami)

### CRITICAL: Deployment Is NOT Automatic

**Pushing to GitHub does NOT automatically deploy the site.**

The site uses Manus WebDev hosting, which requires a **manual Publish step** within the Manus platform. There is no CI/CD pipeline, no GitHub Actions, and no webhook-based auto-deploy configured.

### How to Deploy (Step-by-Step)

1. **Commit and push code to `main` branch** on GitHub
   ```bash
   git add -A && git commit -m "description" && git push origin main
   ```

2. **Open the Manus task/project** that manages this site
   - Go to https://manus.im
   - Navigate to the project: "Whispers & Wonders - Tarot Site"

3. **Trigger a new deployment** by either:
   - **Option A:** Start a new task in the project asking Manus to "deploy the latest code" or "publish the site"
   - **Option B:** If the Manus workspace shows the site preview, look for a **"Publish"** or **"Deploy"** button in the site management UI
   - **Option C:** The site auto-deploys when Manus runs the dev server during a task and the task completes with a checkpoint

4. **Verify deployment** by visiting https://thesoftheartcollective.com and confirming the changes are live

### Build Commands
- **Build:** `pnpm build` → outputs frontend to `dist/public/` and server to `dist/index.js`
- **Start:** `pnpm start` → runs Node.js server on port 3000
- **Dev:** `pnpm dev` → runs dev server with Vite HMR
- **Type Check:** `pnpm check` → TypeScript validation
- **Test:** `pnpm test` → Vitest unit tests

### Deployment Verification
To confirm which version is deployed, check the JS bundle filename in the page source:
- View source at https://thesoftheartcollective.com
- Look for `<script src="/assets/index-XXXXXXXX.js">`
- Compare the hash to your local build output in `dist/public/assets/`
- If they match, the latest code is deployed

### Important Notes
- The GitHub repository is the source of truth for code
- Manus hosting serves the built artifacts, not the GitHub repo directly
- There is no GitHub webhook or GitHub Actions workflow connecting the two
- Every deployment requires an explicit action within the Manus platform

---

## Next Steps for Future Development

1. **Submit to Google AdSense** — Site now meets AdSense requirements; ready for review
2. **Add favicon and Open Graph image** — Strengthen visual branding in browser tabs and social shares
3. **Write additional blog posts** — Google favors regular content updates; add 2-3 posts before AdSense review
4. **Implement email capture/newsletter** — Build audience engagement with optional newsletter signup
5. **Add testimonials/reviews section** — Build social proof with client testimonials (ensure genuine, not fabricated)
6. **Expand directory with more listings** — Reach out to local businesses to expand the 23-shop directory
7. **Create tarot reading booking system** — Allow users to book readings with Kenya or other practitioners
8. **Add user accounts & saved readings** — Let users save favorite cards, spreads, and readings

---

## Important Notes

- **No AI-generated content:** All content is original, written by Kenya Ferguson from personal practice and research
- **No fake reviews/testimonials:** Never fabricate customer reviews or testimonials (Shopify/AdSense policy violation)
- **Contact form:** Sends notifications to Kenya Ferguson via Manus owner notification system
- **Mobile-first design:** All pages are mobile-responsive and tested on multiple viewports
- **Accessibility:** Proper color contrast, semantic HTML, keyboard navigation support

---

## Handoff Checklist

- [x] All Phase 1 features implemented and tested
- [x] Homepage messaging updated to reflect global + local positioning
- [x] Code committed to GitHub
- [x] Site deployed and live at thesoftheartcollective.com
- [x] Documentation complete (README, Architecture, Folder Map, Deployment, this file)
- [x] 24 tests passing
- [x] **Spreads tab fully functional** — All 10 spreads working with interactive card drawing (July 7, 2026)
- [ ] Submit to Google AdSense (next step)
- [ ] Monitor analytics and user feedback
- [ ] Plan Phase 2 features (newsletter, booking system, etc.)

---

**Last Updated:** July 7, 2026  
**Updated By:** Manus AI Agent  
**Contact:** Kenya Ferguson (The Soft Heart Collective LLC)
