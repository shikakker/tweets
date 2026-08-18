# tweets — Modernization Roadmap

The repository contains a Next.js application with pages, components, library code and a committed `.env` file. Secret hygiene is the immediate priority.

## 10 tasks

1. Treat the committed `.env` as potentially exposed: inspect its variable names, rotate any real credentials/tokens and remove secrets from Git history where warranted.
2. Keep only a sanitized `.env.local.example` with placeholder values and document setup requirements.
3. Trace the data/API layer in `lib/` and document exactly which social/Twitter/X functionality is implemented.
4. Validate external API responses and handle rate limits, authentication failures and unavailable content explicitly.
5. Add loading, empty and error states to timelines/cards/pages that depend on remote data.
6. Add tests for data normalization and the primary content-rendering flow.
7. Add CI for lint, type-check/tests where applicable and production build.
8. Upgrade the historical Next.js/API dependencies after establishing a reproducible baseline.
9. Audit user/content privacy, caching and accidental logging of tokens or personal data.
10. Rewrite the portfolio README around the verified integration and UX rather than implying ownership of the external platform or unsupported analytics capabilities.

## Priority

Security cleanup comes before cosmetic modernization because a committed environment file can invalidate otherwise strong portfolio work.