# Completion plan

1. Treat the committed `.env` as a P0 security review item. Identify every value and consumer, determine whether any token/key is real, rotate exposed credentials where necessary, remove secrets from the tracked branch and keep only a documented example file.
2. Establish repository provenance before portfolio use. The specialized tweet rendering/layout components and landing/demo structure may derive from an existing Twitter/tweet rendering example; identify upstream/version and separate authored changes.
3. Map the actual data path for a tweet: URL/ID input, server/API fetch if present, normalization, HTML/MDX rendering, media handling and final page. Document which data comes from Twitter/X APIs versus fixtures or embedded markup.
4. Harden any remote tweet/media fetching against SSRF and unbounded downloads: allow only expected hosts/protocols, enforce timeouts/size limits and never fetch arbitrary user-supplied internal URLs.
5. Sanitize tweet HTML/content and external links. Do not execute arbitrary embedded HTML/scripts; handle deleted/protected/unavailable tweets and missing media deterministically.
6. Review caching/rate-limit behavior for external API calls and random-tweet selection. Avoid unnecessary API consumption, cache private/protected content incorrectly, or expose upstream error details/tokens.
7. Audit visual fidelity/accessibility of light/dark/Twitter-style layouts: text direction, long URLs, emoji, alt text/media descriptions, keyboard links, contrast and responsive overflow.
8. Add fixtures/tests for text-only, image/video metadata, quote/reply, deleted/protected, malformed IDs and upstream rate-limit/error states; external API calls are mocked in CI.
9. Pin a supported Node/Next version and add lint/test/build CI. Remove obsolete demo/Lighthouse claims unless they are reproducible against the current deployment.
10. Rewrite README with provenance, verified rendering/data flow, API/env requirements, privacy/caching behavior, supported tweet types, screenshots and explicit limitations versus an official X/Twitter client.
