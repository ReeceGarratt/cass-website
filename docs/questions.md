# Open questions

Decisions that are still waiting on the user (Q-xxx). Some questions stay open across several features, so check this file before starting work. When a call is made, the question moves to [decisions.md](decisions.md).

## How to use this doc

- **Before starting work,** scan the summary table. If your task depends on an open question, raise it with the user; don't answer it yourself.
- **Adding a question:** add one when something needs the user's call and can't be settled within the current task.
  1. Take the next unused Q number. Check both files, because resolved questions keep their numbers.
  2. Add a row to the summary table.
  3. Add a full entry below, with **Raised**, **Blocks / Depends on**, **Context** and **Options**.
- **When the user makes a call:**
  1. Add a `D-` entry to [decisions.md](decisions.md) that says `Resolves Q-xxx`.
  2. Delete the question's entry and its summary row here.
- **When new information comes in** (e.g. from Figma or pricing research), update the entry in place. Never reuse or renumber IDs.
- **Log** when questions are opened or resolved in [`wiki/log.md`](wiki/log.md).

## Summary

| ID | Question | Blocks / depends on |
|---|---|---|
| Q-002 | Contact form approach | Blocks the Astro adapter and contact page backend |
| Q-003 | Content editing: does Cass need a CMS? | Any CMS setup |
| Q-004 | Styling: plain CSS or Tailwind v4 | **Blocks scaffolding** |
| Q-005 | Token pipeline tooling | Tokens file; needs the Figma file |
| Q-006 | Testing, linting and formatting | AGENTS.md Testing/Commands; best settled at scaffolding |
| Q-007 | Figma plan for MCP access | **Blocks all Figma fetching** |
| Q-008 | Monitoring: how much, and which tools | Deferred to a later pass (D-010) |
| Q-009 | Deploy pipeline and account ownership | **Blocks the first deploy** |

---

### Q-002 · Contact form approach
- **Raised:** 2026-09-16 · **Updated:** 2026-09-16 (hosting settled by D-009)
- **Blocks:** adding the `@astrojs/cloudflare` adapter; the contact page backend
- **Options:**
  - **A `mailto:` link:** no backend, but it exposes the address to scrapers. Don't use Cloudflare's Email Address Obfuscation to hide it, because that injects JS and breaks accessibility.
  - **A third-party form service:** no code of our own, but another vendor and usually a free-tier cap.
  - **An on-demand Worker route (proposed):** a plain HTML form posts to a server route that checks Turnstile on the server, then sends through Cloudflare's `send_email` binding. Sending to a *verified* destination address is free on every plan. This needs the adapter. Details: [wiki/cloudflare-workers.md](wiki/cloudflare-workers.md#email).
- **Considerations:**
  - Spam protection: Turnstile plus the free plan's one rate-limiting rule on the form path.
  - A fixed recipient, and no user input in email headers (only a validated Reply-To).
  - Accessible error and success states that work without client JS.
  - Whether Cass also wants a `hello@` address on the domain (Email Routing, free).

### Q-003 · Content editing / CMS
- **Raised:** 2026-09-16
- **Question:** Does Cass need to add or edit case studies without a developer? If so, add a git-based CMS (e.g. Keystatic or Decap) on top of the MDX content (D-003). If not, editing files in the repo is enough.

### Q-004 · Styling approach
- **Raised:** 2026-09-16
- **Blocks:** scaffolding
- **Options:** plain CSS with Astro scoped styles on top of token custom properties (proposed) · Tailwind v4 with a `@theme` built from tokens.
- **Tradeoff:** plain CSS keeps the markup clean and the path from token to component easy to follow. Tailwind is faster to write and adds a utility-class vocabulary.

### Q-005 · Token pipeline tooling
- **Raised:** 2026-09-16
- **Context:** D-002 fixes the output (CSS custom properties) but not how it's generated.
- **Options:** an agent regenerates the tokens file directly from Figma variables through the MCP server · export tokens to DTCG-format JSON and build CSS with Style Dictionary.
- **Unknowns until we see the Figma file:** how the variables are organised into collections and modes (e.g. light/dark themes), and whether naming follows a primitive → semantic structure.

### Q-006 · Testing, linting and formatting
- **Raised:** 2026-09-16
- **Blocks:** the Testing and Commands sections of `AGENTS.md`; best settled at scaffolding
- **Context:** Accessibility and performance are requirements, so automated checks for them matter more than unit tests, since the site has little logic.
- **Candidates:**
  - **Baseline:** `astro check` plus a successful build.
  - **Accessibility:** Playwright smoke tests that run axe-core on every page.
  - **Performance:** Lighthouse CI with budgets.
  - **Unit tests:** Vitest, only if real logic appears.
  - **Lint and format:** ESLint with the Astro and accessibility plugins, plus Prettier with the Astro plugin, or Biome (check its current Astro support first).
- **Also decide:** whether the checks run locally only, or in CI too. Hosting is settled (D-009). If CI builds in GitHub Actions (Q-009), the checks can block a deploy there.

### Q-007 · Figma plan for MCP access
- **Raised:** 2026-09-16
- **Blocks:** all Figma fetching (Phase 0 of the [Figma build workflow](figma/README.md#build-workflow))
- **Context:** on the free Starter plan the MCP allows about 6 calls a month. Reading Starter files through the REST API is also capped at 6 requests a month, even for someone with a paid seat elsewhere. The build is estimated at about 200–300 calls in total ([wiki/figma-mcp.md](wiki/figma-mcp.md)).
- **Options:**
  - **Professional, billed monthly, for the build only (recommended):** upgrade when the designs are ready, check that snapshots cover every frame (Phase 3), then decide whether to keep it. About $20 a month for a Full seat or $15 for a Dev seat, from third-party pricing summaries; not checked on figma.com.
  - **Professional, kept long term:** simplest if designs keep changing after launch.
  - **Stay on Starter:** one REST call to download the whole file as JSON plus a call for image exports, then work from the copies. Untested. The variables API is Enterprise-only, so tokens would be pieced together by hand, and a design change could use up the month's allowance.
- **Seat:** Full if Cass edits designs from this account. A Dev seat can't edit design files.
- **Before downgrading:** check what happens to Cass's files and projects on Starter. Not yet researched.

### Q-008 · Monitoring
- **Raised:** 2026-09-16
- **Blocks:** nothing. Observability is deferred to a later pass (D-010). Settle this when that pass starts, and after Q-002, since the form is the main thing to watch.
- **Context:** Most monitoring for a static site doesn't depend on the host: uptime checks, real-user monitoring in the browser, and an SDK in the form handler. Browser scripts for real-user monitoring conflict with the no-client-JS priority. Research: [wiki/monitoring-options.md](wiki/monitoring-options.md).
- **Options:**
  - **Minimal (proposed as the starting point), $0:** uptime checks, plus Sentry in the form handler emailing alerts.
  - **Plus Grafana Cloud, $0:** dashboards, synthetic checks and real-user monitoring (Faro). Good for learning; more to maintain.
  - **Plus Workers Paid, $5 a month:** automatic export of Worker logs and traces to Sentry or Grafana.
  - **Ruled out:** Datadog, because its free tier has no logs, real-user monitoring or synthetic checks.
- **Also decide:** whether to use Cloudflare Web Analytics for Core Web Vitals instead of a heavier real-user monitoring SDK.

### Q-009 · Deploy pipeline and account ownership
- **Raised:** 2026-09-16
- **Blocks:** the first deploy
- **Options:**
  - **Build in GitHub Actions and deploy with `cloudflare/wrangler-action` (proposed):** the Q-006 checks can block a deploy, the pipeline works with any host, and pull request previews come from `wrangler versions upload --preview-alias`. Login is a long-lived API token.
  - **Workers Builds (Cloudflare's git integration):** less setup, 3,000 free build minutes a month, but checks in Actions can't block the deploy. Never enable both, or every push deploys twice.
- **Sub-questions:**
  - Whose Cloudflare account holds the site: Reece's or Cass's? This affects handover, and who can fix things later.
  - Is any case-study content under NDA? `workers.dev` preview URLs are public unless protected with Cloudflare Access.
  - Will the repo be public or private? This affects GitHub Actions minutes, and whether draft content is visible.
  - Where is the domain registered? DNS is on Cloudflare; turn on registrar lock and MFA wherever the domain is registered.
