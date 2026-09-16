---
summary: Working notes for hosting on Cloudflare Workers — free-plan limits, zone settings to change, previews, CI with GitHub Actions, email for the contact form, bot controls and security.
updated: 2026-09-16
related: [hosting-options.md, monitoring-options.md]
decisions: [D-009, Q-002, Q-009]
---

# Cloudflare Workers hosting

The site is hosted on Cloudflare Workers with static assets ([D-009](../decisions.md)). The comparison with other hosts is on [hosting-options.md](hosting-options.md). **None of this has been set up yet.** It's research checked on 2026-09-16, not tested setup steps. Update the page when things are actually configured.

## Workers, not Pages

Cloudflare Pages still works, but Cloudflare recommends Workers for new projects, and new features only land on Workers. Don't create a Pages project.

Astro's core team works at Cloudflare (acquired January 2026). Astro stays MIT-licensed and platform-agnostic, and `@astrojs/cloudflare` is the official adapter. A fully static build doesn't need the adapter. Add it only when a route renders on demand (the contact form, Q-002).

## Free-plan limits (checked 2026-09-16)

| Item | Limit |
|---|---|
| Static asset requests | Free and unlimited; storage free |
| Worker requests (on-demand routes) | 100k a day, then errors (no bill) |
| CPU per request | 10 ms *(unverified; from memory)* |
| Workers Builds (if used instead of Actions) | 3,000 minutes a month, 1 build at a time, 20-minute limit |
| Workers Logs | 200k events a day, kept 3 days |
| OpenTelemetry export (logs and traces) | **Not on free.** Workers Paid ($5 a month): 10M events a month included, billed from 2026-10-01 |
| WAF | 5 custom rules, 1 rate-limiting rule, no managed rulesets |

## Zone settings to check

- **Turn off Email Address Obfuscation** (Scrape Shield). It rewrites `mailto:` links and injects a script, which breaks the no-client-JS rule and can confuse screen readers.
- **Turn off Rocket Loader.** It rewrites how scripts load.
- **Bot Fight Mode:** leave it off. On the free plan it can't have exceptions, so it can challenge our own uptime checks and CI runs against the live site, and the challenge injects JS.
- **AI crawlers:** the free plan can block them by category (enforced, not just a `robots.txt` request). Block training crawlers and allow search crawlers, then revisit in the SEO pass (D-004).
- **Rate limiting:** use the one free rule on the contact form's path.

## URLs, 404s and headers

- Set Astro's `trailingSlash` and `build.format` to match how Workers serves HTML, or every page load starts with an extra redirect. Workers assets have an `html_handling` setting for this. *(Its defaults are unverified; check them when scaffolding.)*
- Add `src/pages/404.astro` so a real 404 page exists. *(How Workers assets fall back when it's missing is unverified.)*
- Set security and cache headers in a `_headers` file: CSP, HSTS, `X-Content-Type-Options`, long-lived caching for hashed `/_astro/*` files, and revalidation for HTML.

## Previews

- `wrangler versions upload --preview-alias <alias>` gives a stable URL: `<alias>-<worker>.<subdomain>.workers.dev`. It needs Wrangler 4.21 or later.
- **Preview URLs are public by default.** Protect them with Cloudflare Access (Zero Trust free plan) if any case study is under NDA (Q-009).
- Preview URLs only work on `workers.dev`, and Workers Logs aren't available for them.

## CI with GitHub Actions

The proposed setup (Q-009): build and run checks in Actions, then deploy with `cloudflare/wrangler-action@v3`.

- **Secrets:** `CLOUDFLARE_API_TOKEN` (permission: Edit Cloudflare Workers) and `CLOUDFLARE_ACCOUNT_ID`. Cloudflare has no OIDC login for GitHub Actions, so the token is long-lived: keep its scope narrow and rotate it regularly.
- **Production:** `wrangler deploy` from `main`, through a protected GitHub environment.
- **Pull requests:** `wrangler versions upload --preview-alias pr-<number>`.
  - Aliases can't contain slashes, so a branch name like `feat/x` has to be converted first.
  - `wrangler-action` doesn't output the aliased URL ([issue #384](https://github.com/cloudflare/wrangler-action/issues/384)), so read it from Wrangler's output to post it as a PR comment.
- **Don't also enable Workers Builds** (Cloudflare's git integration), or every push deploys twice.
- **Never use `pull_request_target` with these secrets.**

## Email

For the contact form (Q-002):
- **Sending:** the Email Service `send_email` binding is **free to verified destination addresses on every plan**. Sending to any other address needs Workers Paid. The form only emails Cass, so the free rule covers it.
- **Receiving:** Email Routing (inbound forwarding, e.g. `hello@`) is free and unlimited.
- **Form hygiene:**
  - Check Turnstile on the server.
  - Keep the recipient fixed.
  - Put no user input in From, To or Subject; only a validated Reply-To.
  - Send plain text or escape the body.
  - Limit the request size.

## Account security

DNS, hosting and email all sit in one Cloudflare account, so compromising it compromises everything. Use passkeys or MFA on Cloudflare, GitHub and the domain registrar, and turn on registrar lock.

## Sources

- [Workers static assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) · [Migrate from Pages](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)
- [Workers Builds limits](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/) · [Workers + GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/) · [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)
- [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) · [OpenTelemetry export](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/)
- [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
- [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) · [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) · [Managing AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers)
- [Astro joins Cloudflare](https://astro.build/blog/joining-cloudflare/) · [Astro Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
