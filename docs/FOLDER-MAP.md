# Folder Map

```
whispers-wonders/
│
├── client/                          # Frontend (React SPA)
│   ├── index.html                   # HTML entry point (fonts, meta tags, AdSense)
│   ├── public/                      # Static assets served at root
│   │   └── __manus__/              # Manus runtime files (do not edit)
│   └── src/
│       ├── App.tsx                  # Route definitions and app shell
│       ├── main.tsx                 # React entry point with providers
│       ├── index.css                # Global styles, theme variables, Tailwind
│       ├── const.ts                 # Frontend constants
│       ├── _core/
│       │   └── hooks/useAuth.ts    # Authentication hook
│       ├── components/
│       │   ├── Layout.tsx           # Site header + footer wrapper
│       │   ├── AuthorBio.tsx        # Author attribution block
│       │   ├── CanonicalTag.tsx     # Dynamic canonical URL per route
│       │   ├── JsonLd.tsx           # Schema.org structured data
│       │   ├── ErrorBoundary.tsx    # Error boundary wrapper
│       │   └── ui/                  # shadcn/ui component library (40+ components)
│       ├── contexts/
│       │   └── ThemeContext.tsx     # Dark/light theme provider
│       ├── data/
│       │   ├── index.ts            # Re-exports all data modules
│       │   ├── cards.ts            # 78 tarot card definitions
│       │   ├── blog.ts             # 5 blog posts with full body content
│       │   ├── events.ts           # 7 event listings (300+ words each)
│       │   ├── sacredSpaces.ts     # 6 sacred space guides (300+ words each)
│       │   ├── directory.ts        # 23 metaphysical directory listings
│       │   └── spreads.ts          # 10 tarot spread layouts
│       ├── hooks/
│       │   ├── useComposition.ts   # Input composition handling
│       │   ├── useMobile.tsx       # Mobile breakpoint detection
│       │   └── usePersistFn.ts     # Stable function reference hook
│       ├── lib/
│       │   ├── trpc.ts             # tRPC client binding
│       │   └── utils.ts            # Utility functions (cn, etc.)
│       └── pages/
│           ├── Home.tsx            # Landing page with Card of the Moment
│           ├── Cards.tsx           # 78-card index with suit filters
│           ├── CardDetail.tsx      # Individual card page (no video embeds)
│           ├── Blog.tsx            # Blog listing page
│           ├── BlogPost.tsx        # Individual blog post with author bio
│           ├── Events.tsx          # Events listing with expandable details
│           ├── SacredSpaces.tsx    # Sacred spaces with maps links
│           ├── Directory.tsx       # Metaphysical business directory
│           ├── MoonCalendar.tsx    # Current moon phase + rituals
│           ├── CrystalGuide.tsx    # Crystal reference guide
│           ├── Spreads.tsx         # Tarot spread layouts
│           ├── About.tsx           # About page (Kenya Ferguson bio, editorial policy)
│           ├── Contact.tsx         # Contact form + owner identification
│           ├── Privacy.tsx         # Privacy policy
│           ├── Terms.tsx           # Terms of service
│           └── NotFound.tsx        # 404 page
│
├── server/                          # Backend (Express + tRPC)
│   ├── _core/                      # Framework internals (do not edit)
│   │   ├── index.ts               # Server entry point + security headers
│   │   ├── context.ts             # tRPC context builder
│   │   ├── cookies.ts             # Cookie configuration
│   │   ├── env.ts                 # Environment variable access
│   │   ├── oauth.ts               # Manus OAuth handler
│   │   ├── trpc.ts                # tRPC initialization
│   │   ├── vite.ts                # Vite dev middleware
│   │   ├── storageProxy.ts        # S3 storage proxy
│   │   ├── systemRouter.ts        # System health routes
│   │   └── ...                    # Other integrations (LLM, maps, etc.)
│   ├── db.ts                       # Database query helpers
│   ├── routers.ts                  # tRPC procedure definitions
│   ├── storage.ts                  # S3 storage helpers
│   └── auth.logout.test.ts        # Example test file
│
├── shared/                          # Shared between client and server
│   ├── const.ts                    # Shared constants
│   ├── types.ts                    # Shared TypeScript types
│   ├── _core/errors.ts            # Error definitions
│   └── data/                       # Raw JSON data files (source of truth)
│       ├── cards_data.json
│       ├── blog_data.json
│       ├── events_data.json
│       ├── sacred_spaces_data.json
│       ├── directory_data.json
│       └── spreads_data.json
│
├── drizzle/                         # Database schema and migrations
│   ├── schema.ts                   # Table definitions (users)
│   ├── relations.ts                # Table relations
│   └── meta/                       # Migration metadata
│
├── references/                      # Integration documentation
│   ├── llm-integration.md
│   ├── file-storage.md
│   ├── image-generation.md
│   ├── maps-integration.md
│   ├── data-api.md
│   ├── owner-notifications.md
│   ├── manus-oauth.md
│   ├── periodic-updates.md
│   └── voice-transcription.md
│
├── docs/                            # Project documentation
│   ├── ARCHITECTURE.md             # System architecture overview
│   ├── FOLDER-MAP.md              # This file
│   └── DEPLOYMENT.md              # Deployment instructions
│
├── package.json                     # Dependencies and scripts
├── pnpm-lock.yaml                  # Lockfile
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── vitest.config.ts                # Test configuration
├── drizzle.config.ts               # Drizzle ORM configuration
├── components.json                 # shadcn/ui configuration
├── README.md                       # Project overview
└── todo.md                         # Feature tracking
```
