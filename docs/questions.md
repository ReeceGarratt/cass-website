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
| Q-014 | Card drift: Read More card skills type and summary colour | Blocks extending `CaseStudyCard` |
| Q-015 | Case study pages: shared template or bespoke (D-013)? | **Blocks the case study pages**, and shapes every component below them |
| Q-016 | Interactivity for the sub nav progress and Definition Tip | Blocks the sub nav and the Definition Tip |
| Q-017 | Which Landing frame is current, and what the second one is for | Nothing yet; matters before further home page work |
| Q-018 | Image delivery: in-repo with Astro's pipeline, or hosted off-repo | **Blocks the case study pages at scale**; MVP can proceed in-repo |

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
- **Update (2026-09-29):** the file now has **8 colour variables** (`Black` and `Light Grey` were added), **two spacing variables** (`Headings & Body` = 16, `Sub-Sub Sections` = 48), four new text styles (`Title 2`, `H2`, `Body Med`, `Hand written` in **La Belle Aurore**) and two effect styles. So the "no spacing variables" note above is out of date, though two variables is still far from a spacing scale. Naming is inconsistent enough to matter for a pipeline: `Light purple` and `Light Purple` are different colours, and `Hand written` / `Handwritten` name one style. See [figma/tokens.md](figma/tokens.md).

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
- **Update (2026-09-29):** the shadows now exist in Figma as effect styles — `Portfolio Drop` (two stacked black shadows) and `Portfolio Card drop` (a warm `#F5EFE6AB` offset shadow). See [figma/tokens.md](figma/tokens.md#effect-styles). Hover timing and the card-to-headline alignment are still undefined, so `--duration-hover` and `--ease-hover` stay placeholders.

---

### Q-014 · Card drift: Read More card skills type and summary colour
- **Raised:** 2026-09-29
- **Blocks:** extending `CaseStudyCard.astro` to cover the detailed and related-card uses
- **Context:** Figma has three card shapes. The Compact and Detailed cards both use Inter Bold 12px skills and a Grey `#6b6b6b` summary. The **Read More** cards (`88:583`, `88:602`, `165:2537`) are detached copies that use **Roboto Bold 15px** skills and a `rgba(0,0,0,0.58)` summary, and have no hover state drawn. Roboto was the caption font before it changed to Inter ([wiki/design-tokens.md](wiki/design-tokens.md)), so this looks like drift rather than intent. Full comparison: [wiki/componentisation.md](wiki/componentisation.md#the-card-family--the-one-decision-that-matters).
- **Options:** treat the Read More cards as stale and build one card with Inter 12px skills and a Grey summary (proposed) · build the difference deliberately · Cass updates the Figma copies.
- **Also:** the Read More cards have no hover state, though the other two do. Should they hover?

### Q-015 · Case study pages: shared template or bespoke?
- **Raised:** 2026-09-29
- **Blocks:** the case study pages, and the shape of every component under them
- **Context:** D-013 says case study pages are bespoke `.astro` files, styled uniquely, with no shared template. The Design system page now defines a **Sub Nav with six fixed section names** (Project Overview, Business Needs, Interviews, Design, User Testing, Handover), an **Intro** block and a **section heading** pattern. That describes a shared structure. D-013 and the design now pull in opposite directions.
- **Options:**
  - **A shared template** with per-case-study content: consistent, far less code, but constrains how different a case study can look.
  - **Bespoke pages drawing on a shared toolkit** (proposed): keep D-013's freedom, but build `SectionHeading`, `SubNav`, `Pill` etc. as components each page composes.
  - **Fully bespoke,** as D-013 reads today.
- **Sub-question:** does every case study have exactly those six sections? If not, the sub nav's labels are content, not a fixed list.

### Q-016 · Interactivity for the sub nav progress and Definition Tip
- **Raised:** 2026-09-29
- **Blocks:** `SubNav` and the Definition Tip
- **Context:** Invariant 3 says no client JS unless there's a stated reason. Two designed components need it:
  - **Sub Nav:** the selected state is one underline anchored at the first link whose right edge extends with the current section (four variants drawn, widths 38.24% → 18.97%). It reads as reading progress, which needs scroll position.
  - **Definition Tip:** a speech-bubble popup. Figma draws the bubble but not its trigger or behaviour. The only trigger visible anywhere is the underlined "Absa" in the case study intro paragraph.
- **Options:**
  - **Small islands** (proposed): an IntersectionObserver for the sub nav, a popover for the tip. Roughly 1–2 kB, and both degrade to plain anchors and inline text without JS.
  - **CSS-only:** mark the current section statically (or with `:target`) and use `<details>` or a CSS hover popup for the tip. Keeps zero JS but loses the sweep, and CSS-only tooltips are hard to make keyboard- and screen-reader-safe.
- **Also decide:** what the tip is for — a glossary of client names and UX jargon? That decides whether it's content-driven or one-off markup.

### Q-017 · Which Landing frame is current, and what the second one is for
- **Raised:** 2026-09-29 · **Rewritten:** 2026-09-29 (the original question — where the Work page lives — is answered)
- **Blocks:** nothing yet; matters before any further home page work
- **Context:** The Work page was found at `19:104` in the same file. While mapping it, three copies of the landing design turned up:
  - `1:79` on the `Landing` page — the frame the home page POC was built from;
  - `127:3171` on the `Landing` page — **new since 2026-09-16**, the same 1920x1080 size, holding the same `Navigation` and `Content` instances;
  - `30:339` on the `Work` page — another 1920x1080 `Landing` frame.

  The home page hero content is now a **`Content` component** (`144:763`), instanced into both Landing-page frames, so the hero has been componentised in Figma since we built it.
- **Questions:** which frame is the current home page design? Is `127:3171` a variant (hover, or a revision), and does the new `Content` component change the hero we've already built?
- **Note:** an earlier reading of this concluded the Landing page had been deleted. It hadn't — `get_metadata` with no node ID listed only two of the file's four pages. See [figma/README.md](figma/README.md#the-file-has-four-pages-not-two-corrected-2026-09-29).

### Q-018 · Image delivery: in-repo with Astro's pipeline, or hosted off-repo
- **Raised:** 2026-09-29
- **Blocks:** nothing for the first case study; becomes pressing once all four are built
- **Context:** No decision was ever made about image delivery. [architecture.md](architecture.md) lists "optimised images through Astro's image handling" as a cross-cutting concern, but there is no `D-` entry, and it was written when the site had five SVGs. The case studies are image-heavy — four pages, 6003–9337px tall, mostly product screenshots — so this now matters. Cloudflare Workers static assets are free and unlimited for both requests and storage ([wiki/cloudflare-workers.md](wiki/cloudflare-workers.md)), so hosting cost is not the driver; repo size is.
- **Options:**
  - **In-repo under `src/assets/` (proposed for MVP):** `astro:assets` optimises at build — AVIF/WebP, responsive `srcset`, hashed names, intrinsic `width`/`height` against layout shift. Cost: repo size, and git history is permanent. Mitigate by downscaling originals before committing.
  - **Off-repo (Cloudflare R2, or Cloudflare Images):** keeps the repo small, but Astro cannot process images it doesn't have at build time, so build-time optimisation and automatic `srcset` are lost. Responsive variants then need hand-rolling or Cloudflare Image Transformations (paid).
  - **Hybrid:** small/UI images in-repo, large case study screenshots off-repo.
- **Decide before:** committing the full image set for all four case studies. The first case study can proceed in-repo either way, as long as originals are downscaled first.
- **Note:** raised by the user (2026-09-29) with the intent that case study images should not live in the repo long term.
