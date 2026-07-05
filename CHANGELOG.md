# CHANGELOG

All notable changes to Whispers & Wonders are documented in this file.

## [2.0.0] - 2026-07-05

### Major Changes

#### Phase 1: Complete Site Rebuild & AdSense Readiness
- **Rebuilt entire site** from scratch with clean, documented codebase
- **Removed all third-party video embeds** — Eliminated all Minnow Pond Tarot YouTube embeds from 78 card pages
- **Added original content** — Replaced video embeds with original "Deeper Exploration" sections on every card
- **Fixed broken navigation** — Created functional /contact page with form and site owner identification; fixed /crystals redirect
- **Rewrote About page** — Added Kenya Ferguson bio, The Soft Heart Collective LLC identification, credentials, editorial policy, social media links
- **Enhanced blog posts** — Added author bio sections to all 5 blog posts (Beginner's Guide, Tarot & Moon, Crystals for Tarot, Daily Ritual, Spiritual Tampa Bay)
- **Expanded Events** — Increased all 7 event listings to 300+ words each with detailed descriptions, visitor expectations, accessibility info, and practical tips
- **Expanded Sacred Spaces** — Increased all 6 sacred space listings to 300+ words each with visitor guidance, best times to visit, accessibility info, practical tips, and Google Maps links
- **Added JSON-LD schema markup** — Implemented WebSite, BlogPosting, and BreadcrumbList schema on key pages for improved SEO
- **Implemented security headers** — Added X-Frame-Options, Content-Security-Policy, Referrer-Policy, and X-Content-Type-Options headers
- **Added canonical tags** — Dynamic canonical URL tags on every page to prevent duplicate content issues
- **Created contact form** — Functional contact form with backend notification system (sends submissions to Kenya Ferguson)
- **Comprehensive documentation** — Created README.md, Architecture.md, Folder-Map.md, and Deployment.md

#### Phase 2: Homepage Messaging Update
- **Updated main tagline** — Changed from "A mystical tarot and spiritual wellness companion for Florida's Tampa Bay area" to "A global tarot and spiritual wellness community—with a curated guide to Tampa Bay's metaphysical and wellness resources."
- **Added global welcome callout** — New prominent section: "Wherever you are, you're welcome here" with explanation of global content + local Tampa Bay directory
- **Repositioned Tampa Bay** — Shifted from primary identity to featured local resource, clarifying that tarot, cards, blog, and spiritual content are for worldwide audience
- **Tested responsive design** — Verified homepage renders correctly on desktop (1280x720) and mobile (375x812) viewports

### Added

- **78 Tarot Card Pages** — Complete deck with meanings, keywords, crystal pairings, related cards, and original deeper exploration content
- **5 Blog Posts** — Long-form educational content with author bios and editorial disclaimers
- **7 Event Listings** — Expanded with full descriptions, accessibility info, and practical visitor guidance
- **6 Sacred Spaces** — Natural sanctuaries with coordinates, descriptions, and Google Maps integration
- **23 Directory Listings** — Metaphysical shops, readers, and wellness centers organized by category
- **10 Tarot Spreads** — Curated layouts with position guidance
- **Moon Calendar** — Lunar phase data and ritual guidance
- **Crystal Guide** — Crystals organized by tarot card pairing
- **Contact Form** — Functional form with backend notification system
- **About Page** — Kenya Ferguson bio, site mission, editorial policy, social media links
- **Privacy & Terms Pages** — Legal documentation
- **JSON-LD Schema** — WebSite, BlogPosting, BreadcrumbList markup for SEO
- **Security Headers** — CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options
- **Canonical Tags** — Dynamic URL tags on all pages
- **Project Documentation** — README, Architecture, Folder Map, Deployment, AI-HANDOFF, CHANGELOG

### Fixed

- **Broken /contact route** — Now functional with form and site owner identification
- **Broken /crystals route** — Now redirects to /crystal-guide without 404
- **Navigation links** — All menu items now resolve correctly
- **Mobile responsiveness** — All pages tested and optimized for mobile viewports
- **SEO issues** — Added schema markup, canonical tags, meta tags, and security headers

### Changed

- **Homepage tagline** — Repositioned site as global community with local Tampa Bay features
- **Homepage layout** — Added global welcome callout section below hero
- **Site identity** — Clarified that tarot and spiritual content are for worldwide audience
- **Navigation** — All links now point to working pages

### Removed

- **All Minnow Pond Tarot YouTube embeds** — Removed from 78 card pages
- **YouTube references** — No third-party video embeds anywhere on site
- **Broken links** — Fixed or removed all 404 routes

### Technical

- **Framework:** React 19 + Express 4 + tRPC 11 + Tailwind CSS 4
- **Database:** MySQL with Drizzle ORM
- **Authentication:** Manus OAuth (configured but not required for public site)
- **Hosting:** Manus Autoscale (serverless, Cloud Run)
- **Build:** Vite + esbuild
- **Testing:** Vitest with 24 tests passing
- **Version Control:** Git with GitHub integration

### Testing

- **Unit Tests:** 24 tests passing (auth, site content integrity, data validation)
- **Visual Testing:** Homepage tested on desktop and mobile viewports
- **Responsive Design:** All pages tested at multiple breakpoints
- **SEO Validation:** Schema markup, canonical tags, meta tags verified
- **Security:** Headers configured and tested

### Documentation

- **README.md** — Project overview, quick start, feature checklist
- **Architecture.md** — System design, data flow, component structure
- **Folder-Map.md** — Complete directory tree with file descriptions
- **Deployment.md** — Deployment instructions, environment variables, troubleshooting
- **AI-HANDOFF.md** — Comprehensive handoff guide for future AI agents
- **CHANGELOG.md** — This file

### Deployment

- **Live Site:** https://thesoftheartcollective.com
- **GitHub:** https://github.com/thesacredheartcollective/whispers-wonders
- **Hosting:** Manus Autoscale
- **Status:** Ready for Google AdSense submission

---

## [1.0.0] - 2026-06-XX

### Initial Release

- Initial Manus project scaffold
- Basic site structure with placeholder content
- Navigation framework
- Styling setup with Tailwind CSS

---

## Future Roadmap

### Phase 3: Engagement & Growth
- [ ] Google AdSense submission and approval
- [ ] Newsletter/email capture system
- [ ] User accounts and saved readings
- [ ] Tarot reading booking system
- [ ] Testimonials/reviews section (genuine, not fabricated)
- [ ] Expanded directory (reach out to more local businesses)
- [ ] Additional blog posts (monthly content updates)
- [ ] Social media integration
- [ ] Analytics dashboard

### Phase 4: Monetization & Community
- [ ] Affiliate links for crystals and tarot decks
- [ ] Digital product sales (e-books, courses)
- [ ] Premium membership tier
- [ ] Community forum or discussion board
- [ ] Live chat support
- [ ] API for third-party integrations

---

## Version History

| Version | Date       | Status      | Notes                              |
|---------|------------|-------------|----------------------------------|
| 2.0.0   | 2026-07-05 | Current     | Complete rebuild + homepage update |
| 1.0.0   | 2026-06-XX | Archived    | Initial scaffold                  |

---

**Last Updated:** July 5, 2026  
**Maintained By:** Manus AI Agent & Kenya Ferguson  
**Repository:** https://github.com/thesacredheartcollective/whispers-wonders
