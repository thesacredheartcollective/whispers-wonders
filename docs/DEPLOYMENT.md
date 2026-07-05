# Deployment Instructions

## Manus Hosting (Primary — Recommended)

The site is deployed via Manus Autoscale hosting, which provides serverless deployment with automatic SSL, CDN, and scaling.

### Deploy Process

1. **Make changes** in the Manus sandbox or commit to the GitHub repository.
2. **Save a checkpoint** — In the Manus task interface, ensure a checkpoint is saved (this happens automatically when committing via Manus).
3. **Click Publish** — In the Manus Management UI header (top-right), click the Publish button.
4. **Verify** — The site will be live at `https://www.thesoftheartcollective.com` within 1-2 minutes.

### Custom Domain

The domain `thesoftheartcollective.com` is configured via:
- Management UI → Settings → Domains

DNS records point to Manus infrastructure. SSL certificates are auto-provisioned.

### Environment Variables

All environment variables are managed via:
- Management UI → Settings → Secrets

Or programmatically via the `webdev_request_secrets` tool during development.

---

## Alternative Deployment (Self-Hosted)

If deploying outside Manus, the application is a standard Node.js server:

### Requirements

- Node.js 22+
- MySQL 8+ or TiDB database
- S3-compatible storage (for file uploads)

### Build

```bash
pnpm install
pnpm run build
```

This produces:
- `dist/index.js` — Compiled Express server (ESM)
- `client/dist/` — Compiled React SPA (static files served by Express)

### Run

```bash
NODE_ENV=production node dist/index.js
```

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `JWT_SECRET` | Session cookie signing key | Yes |
| `PORT` | Server port (default: 3000) | No |
| `VITE_APP_ID` | OAuth app ID | For auth |
| `OAUTH_SERVER_URL` | OAuth server URL | For auth |

### Reverse Proxy (Nginx Example)

```nginx
server {
    listen 443 ssl;
    server_name thesoftheartcollective.com www.thesoftheartcollective.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Docker (Optional)

```dockerfile
FROM node:22-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Database Setup

The application uses Drizzle ORM with MySQL/TiDB. On first deployment:

```bash
# Generate migration SQL from schema
pnpm drizzle-kit generate

# Apply migrations to the database
pnpm drizzle-kit migrate
```

The schema is minimal (only a `users` table for authentication). All content data is compiled into the frontend bundle.

---

## Monitoring

- **Analytics**: Umami (privacy-friendly, self-hosted compatible)
- **Error tracking**: Client-side ErrorBoundary with console logging
- **Health check**: `GET /api/trpc/system.health`

---

## Rollback

If a deployment causes issues:

1. **Manus**: Use the Management UI → Version History to rollback to a previous checkpoint.
2. **Self-hosted**: Redeploy the previous Git commit.

---

## Security Checklist

- [x] HTTPS enforced (SSL/TLS)
- [x] X-Frame-Options: SAMEORIGIN
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Content-Security-Policy configured
- [x] HttpOnly session cookies
- [x] CORS restricted to same origin
- [x] No sensitive data in client bundle
