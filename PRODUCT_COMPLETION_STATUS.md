# Product Completion Status — tweets

Canonical branch: `ai/product-completion/tweets`
Canonical PR: `#2`
Product boundary: maintained derivative of Luis Alvarez / `lfades/static-tweet`. Upstream authorship is preserved. This branch repairs build resilience and current dependency security without claiming the original demo as a new product.

## T01–T10 core tasks

| ID | Status | Task / verification |
| --- | --- | --- |
| T01 | DONE | Inspected source, build pipeline and Vercel failure history. |
| T02 | DONE | Reproduced homepage prerender failure on malformed/empty Twitter syndication JSON. |
| T03 | DONE | Syndication parsing now fails soft for empty/malformed successful responses. |
| T04 | DONE | Homepage build falls back to a recoverable tweet skeleton instead of aborting SSG. |
| T05 | DONE | Added regression contracts for syndication, homepage fallback and link semantics. |
| T06 | DONE | Added deterministic npm CI with production build verification. |
| T07 | DONE | Production audit exposed and removed critical/high historical runtime advisories. |
| T08 | DONE | Runtime advanced to Next 16.3.5 / React 19.3 / Node 22. |
| T09 | DONE | Permanent Quality blocks production/full high-severity audits, tests, zero-warning lint and build. |
| T10 | IN PROGRESS | Hosted preview exists for the pre-link-fix head; exact post-fix preview is currently rate-limited. |

## I01–I10 improvements

| ID | Status | Improvement |
| --- | --- | --- |
| I01 | DONE | Prevent `res.json()` from turning upstream malformed success bodies into build crashes. |
| I02 | DONE | Keep non-404 upstream failures explicit while treating 404/invalid embed data as missing content. |
| I03 | DONE | Serialize missing showcase tweet as `null` rather than `undefined`. |
| I04 | DONE | Render existing skeleton recovery UI when showcase data is unavailable. |
| I05 | DONE | Preserve upstream repository/author/license metadata. |
| I06 | DONE | Add production and full high-severity dependency audits to permanent Quality CI. |
| I07 | DONE | Guard lockfile migrations with test/build/audit before committing generated dependency state. |
| I08 | DONE | Upgrade `remark-parse` to 9.0.0 while retaining unified-8 pipeline compatibility. |
| I09 | DONE | Upgrade `@mapbox/rehype-prism` to 0.9.0; remaining Prism advisory is moderate with no upstream fix. |
| I10 | IN PROGRESS | Hosted smoke found and fixed invalid nested anchor markup; exact post-fix HTML recheck awaits the next accepted preview. |

## F01–F10 product features

| ID | Status | Feature / reason |
| --- | --- | --- |
| F01 | DONE | Existing static tweet rendering retained. |
| F02 | DONE | Existing dynamic tweet route retained. |
| F03 | DONE | Existing random-tweet demo retained with valid single-anchor navigation semantics. |
| F04 | DONE | Existing skeleton fallback is now part of actual failure recovery. |
| F05 | DONE | Existing tweet API route remains available after runtime migration. |
| F06 | DEFERRED WITH REASON | No arbitrary social-network expansion; this repository is an upstream demo derivative. |
| F07 | DEFERRED WITH REASON | No invented auth/account layer. |
| F08 | DEFERRED WITH REASON | No invented persistence/dashboard layer. |
| F09 | DEFERRED WITH REASON | No AI feature added without a validated need. |
| F10 | DEFERRED WITH REASON | No production promotion is performed automatically. |

## Verification evidence

Historical Vercel deployment `dpl_oeFfQwTigh2tYDotJEZRSzYv3ppa` failed while prerendering `/` with `SyntaxError: Unexpected end of JSON input` inside the Twitter syndication path. The regression test was added before the fix and failed RED. After the fail-soft parser and homepage fallback changes, Quality run `35037951161` passed contracts, frozen install and the same production build.

A subsequent production audit found 1 critical and 5 high advisories in the historical runtime/markdown graph. Patched markdown boundaries removed that class, while Next 15 still carried a high PostCSS advisory. A second RED contract required Next 16.3.5 / React 19.3. Guarded sync run `35038751292` then passed all contracts, regenerated the lockfile, clean-installed it, built the Pages Router app successfully, passed the high/critical production audit, and committed verified lock state `b7f2dd3b4f3091af1e763bffd541f541cfd9744b`.

Second sweep found that the workflow did not actually execute the lint/full-audit gates previously described by the registry. That mismatch was corrected at `d02be06783d5ae53db2dea85aa67fd55e983718c`; Quality run `35127757207` passed `npm ci`, regressions, production audit, full audit, zero-warning lint and production build. Documentation head `b1e350b41cf90abbca20ceeec22d6f4a3bcb1adb` then passed the same full gate in run `35127897388` and received exact-head Vercel deployment `dpl_HWBY8ESRHA1WRLqxniiLRB5DJKny` READY with homepage HTTP 200.

That hosted smoke exposed invalid nested `<a><a>` markup in the random-tweet navigation, caused by the legacy `Link(passHref)` wrapper around the custom anchor after the Next 16 migration. A regression was added first at `f40d379ecf2c57db8ced37af9936b6e905852a63`; Quality run `35128149411` failed exactly on the new link-semantics assertion while the previous regressions stayed green. The minimal fix replaced the nested custom anchor with a single styled `next/link` at `015011ca72d9feed8e3ad0c9660a4ba7dfce7ebf`. Quality run `35128242092` then passed install, all regressions, both high-severity audits, zero-warning lint and production build.

The exact post-fix SHA is again being rejected by Vercel with the Hobby build-rate limit, so the hosted HTML recheck for the single-anchor fix is not yet claimed.

Remaining audit signal: PrismJS remains a moderate transitive advisory through `@mapbox/rehype-prism`; the audit reports no upstream fix. It does not bypass the high/critical gate and is tracked rather than hidden.

No merge, production promotion, Twitter credential mutation, or external data mutation is performed automatically.

**BLOCKED ONLY BY:** Vercel accepting a fresh exact post-fix preview for final HTML/browser verification.

Status: **PARTIAL** — exact post-fix repository gates are GREEN; final hosted recheck remains external.
