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
| Q-005 | Token pipeline tooling | Tokens file; needs the Figma file |
| Q-006 | Testing, linting and formatting | AGENTS.md Testing/Commands; best settled at scaffolding |
| Q-008 | Monitoring: how much, and which tools | Deferred to a later pass (D-010) |
| Q-009 | Deploy pipeline and account ownership | **Blocks the first production deploy** (an interim Pages preview exists, D-019) |
| Q-010 | Home page below 1880px | Nothing yet |
| Q-011 | Resume link target | Nothing yet |
| Q-012 | Brand link | Nothing yet |
| Q-013 | Card shadow, hover timing and alignment from Figma | Nothing; placeholders in use (D-020) |

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

### Q-005 · Token pipeline tooling
- **Raised:** 2026-09-16
- **Context:** D-002 fixes the output (CSS custom properties) but not how it's generated.
- **Options:** an agent regenerates the tokens file directly from Figma variables through the MCP server · export tokens to DTCG-format JSON and build CSS with Style Dictionary.
- **Unknowns until we see the Figma file:** how the variables are organised into collections and modes (e.g. light/dark themes), and whether naming follows a primitive → semantic structure.
- **Update (2026-09-16, D-014):** a hand-written `src/styles/tokens.css` exists for the POC; its header comment lists the sources. This question stays open for a real pipeline. The Figma file has 6 colour variables and 5 text styles, and no spacing variables — spacing, size and radius tokens are named by us.

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
- **Update (2026-09-16, D-016):** the baseline (`astro check` plus a successful build) and Prettier are in place. Accessibility automation, Lighthouse, lint and CI are still open.

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
- **Raised:** 2026-09-16 · **Updated:** 2026-09-17 (interim Pages preview, D-019)
- **Blocks:** the first production deploy
- **Options:**
  - **Build in GitHub Actions and deploy with `cloudflare/wrangler-action` (proposed):** the Q-006 checks can block a deploy, the pipeline works with any host, and pull request previews come from `wrangler versions upload --preview-alias`. Login is a long-lived API token.
  - **Workers Builds (Cloudflare's git integration):** less setup, 3,000 free build minutes a month, but checks in Actions can't block the deploy. Never enable both, or every push deploys twice.
- **Sub-questions:**
  - Whose Cloudflare account holds the site: Reece's or Cass's? This affects handover, and who can fix things later.
  - Is any case-study content under NDA? `workers.dev` preview URLs are public unless protected with Cloudflare Access.
  - Will the repo be public or private? This affects GitHub Actions minutes, and whether draft content is visible.
  - Where is the domain registered? DNS is on Cloudflare; turn on registrar lock and MFA wherever the domain is registered.
- **Update (2026-09-17, D-019):** an interim preview deploys to GitHub Pages. It doesn't settle this question. Remove `.github/workflows/deploy-pages.yml` once the Cloudflare pipeline is running.

### Q-010 · Home page below 1880px
- **Raised:** 2026-09-16
- **Blocks:** nothing yet
- **Context:** The Figma composition (the overlapping hero grid and card row) only fits at 1880px and wider. Below that, the POC uses an undesigned stacked layout: the headline and intro stacked at the top, the card row below, left-aligned with the gutter.
- **Options:**
  - Cass designs a laptop frame (1280–1536px).
  - Cass approves the stacked layout as-is.
- **Note (2026-09-17):** an accepted residual from the caption font change (browser vs Figma Inter shaping) means card 2's caption fits on one line in the browser at 373px, where Figma now wraps it to 391px like card 1. See [wiki/design-tokens.md](wiki/design-tokens.md).

### Q-011 · Resume link target
- **Raised:** 2026-09-16
- **Blocks:** nothing yet
- **Context:** The nav currently points to `/resume`, which 404s.
- **Options:** a PDF in `public/` · a page · an external link.

### Q-012 · Brand link
- **Raised:** 2026-09-16
- **Blocks:** nothing yet
- **Context:** The brand ("cassandra garratt") links to `/` (D-017), which duplicates the Home nav item.
- **Options:** keep both · make the brand plain text · drop the Home item.

### Q-013 · Card shadow, hover timing and alignment from Figma
- **Raised:** 2026-09-17
- **Blocks:** nothing; placeholder values are in use (D-020)
- **Context:** Cass is updating the Figma files with the card drop shadow and the card-to-headline alignment, and possibly hover motion. Until then `--shadow-card`, `--duration-hover` and `--ease-hover` in `tokens.css` are placeholders, and the cards' bottom edge sits on the first headline baseline.
- **Options:** replace the placeholders with values from the updated frames · keep the placeholders for anything Figma doesn't define.
