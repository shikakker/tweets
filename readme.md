# Static Tweet — Historical Next.js Rendering Experiment

Historical Next.js experiment based on Luis Alvarez's open-source **Static Tweet** project.

The repository renders tweet-like / Twitter content as customizable static React / Next.js UI rather than relying entirely on the standard embedded Twitter widget.

The current package metadata still points to the upstream repository and original author, so this checkout should be treated as an **imported / adapted example**, not an original Static Tweet library authored here.

## Upstream provenance

Original repository:

```text
https://github.com/lfades/static-tweet
```

Original package author:

```text
Luis Alvarez
```

The previous README's demo URL and `create-next-app --example` command referred to that upstream project.

Preserve the upstream MIT license and attribution when redistributing derived code.

## What the project demonstrates

The historical implementation includes concepts such as:

- server-rendered / static tweet presentation;
- rich tweet elements;
- polls / media metadata paths;
- tweet formatting utilities;
- Next.js rendering;
- HTML / Markdown parsing helpers;
- syntax / content sanitization utilities.

## Tech stack

- Next.js 12
- React 18
- TypeScript 4
- date-fns
- Cheerio
- unified / remark / rehype utilities
- Prism-oriented syntax rendering

## Historical Twitter API boundary

The original project could use a Twitter API token for richer tweet elements such as polls.

Twitter has since become X, and API products, authentication rules, endpoint availability, pricing, terminology, and access tiers have changed significantly since this codebase was created.

Do not assume the old `TWITTER_API_TOKEN` / Twitter Labs instructions still work unchanged.

If reviving this repository, verify the currently supported X / Twitter API and update the integration accordingly.

## Environment files

The repository contains:

```text
.env
.env.local.example
```

The tracked `.env` currently contains feature flags rather than an API credential.

A real API token should remain in a local / deployment secret store and should **not** be committed to Git.

Use an ignored local file or platform environment configuration for secrets.

## Local development

### Install this repository

```bash
git clone https://github.com/shikakker/tweets.git
cd tweets
npm install
```

Run:

```bash
npm run dev
```

Build / start:

```bash
npm run build
npm start
```

If rich tweet data requires an external API, configure credentials according to the currently supported provider API rather than blindly following the historical upstream instructions.

## Current status

**Historical adapted Next.js / static-tweet rendering experiment.** The repository is useful as evidence of early Next.js component / content-rendering exploration, but it should not be presented as an original social-media platform or as a currently validated X API integration.

## License

The package declares MIT. Preserve the upstream `lfades/static-tweet` license and notices.