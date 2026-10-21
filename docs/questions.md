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
- **In a parallel stream,** use a temporary ID, `Q-<stream>-<n>`, instead of the next number. It gets a real number before the stream's PR ([wiki/parallel-streams.md](wiki/parallel-streams.md)).
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
| Q-013 | Card hover timing from Figma | Nothing; placeholder in use (D-020) |
| Q-018 | Image delivery: in-repo with Astro's pipeline, or hosted off-repo | **Blocks the case study pages at scale**; MVP can proceed in-repo |
| Q-019 | Which case studies the home page features | Nothing yet; first three by `order` in use as a placeholder |
| Q-020 | The `/work` index route | Nothing yet; the route 404s (alongside Q-011's `/resume`) |
| Q-021 | A third undocumented light purple, `#E3E7FF` | Nothing yet; `--color-white` used as the nearest tokenised stand-in |
| Q-022 | Finding blocks' inconsistent drop shadow in Figma | Nothing; one shadow token used consistently in the build |
| Q-023 | Copy defects transcribed faithfully from Figma | Nothing; copy is live as transcribed |
| Q-024 | Case study alt text needs Cass's review | Nothing; drafted text is live, marked for review |
| Q-025 | Is the redaction blur on the Standard Bank "before" screenshot strong enough? | Nothing; shipped as Cass drew it (D-032) |
| Q-026 | Case study pages below desktop width | Nothing yet; the responsive pass |
| Q-cs4-1 | TRANSEARCH: "interactive book" on the card, "interactive workbook" on the page | Nothing; built as the designs have it |
| Q-cs4-2 | TRANSEARCH International: confirm the drafted definition | Nothing; drafted text is live, marked for review |
| Q-035 | Cass: Regular weight on blue cards: rounded cards only, or the full-bleed bands too? | Nothing; bands are included for now (D-044) |
| Q-036 | Cass: what should a Read More card's client pill look like on hover and focus? | Nothing; the pill is invisible on the hovered card for now |
| Q-037 | Reece: fix the skip link comment typo now, or with the next edit to `global.css`? | Nothing; comment only |
| Q-038 | Cass: the copied `standardbank.co.za` links on CS4 and the landing client strip | Nothing; built as plain text |
| Q-039 | A pause control for the client strip carousel (WCAG 2.2.2) | Nothing; the gap is accepted for now (D-053) |
| Q-040 | Is `hello@cassandragarratt.com` the real address for "Email me"? | Nothing; the nav already copies it, and the landing will show it |

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
- **Update 2026-10-20:** still undecided. The new nav design has a "Resume" utility link with a download icon; it's left out of the built nav until this is settled (D-049).

### Q-012 · Brand link
- **Raised:** 2026-09-16
- **Blocks:** nothing yet
- **Context:** The brand ("cassandra garratt") links to `/` (D-017), which duplicates the Home nav item.
- **Options:** keep both · make the brand plain text · drop the Home item.

### Q-013 · Card hover timing from Figma
- **Raised:** 2026-09-17
- **Blocks:** nothing; a placeholder is in use (D-020)
- **Context:** Cass is updating the Figma files with hover motion for the cards. Until then `--duration-hover` and `--ease-hover` in `tokens.css` stay placeholders (200ms, `ease-out`).
- **Options:** replace the placeholders with values from the updated frames · keep the placeholders indefinitely if Figma never defines motion.
- **Update (2026-09-29):** the card drop shadow and the card-to-headline alignment, this question's other two subjects, are now settled and out of scope here. The shadows exist in Figma as effect styles and are the real values in `tokens.css` — `--shadow-card` (`Portfolio Drop`): `0 1px 3px 1px #0000000D, 0 1px 2px 0 #0000001A`; `--shadow-card-warm` (`Portfolio Card drop`): `-1px 3px 3.5px 1px #F5EFE6AB`. `--shadow-card` is in use on the home page cards and every case study image/panel; `--shadow-card-warm` is defined but has no call site yet — worth checking against Figma when case study 2 is built, in case it belongs on a panel or finding block this page doesn't have. The card-to-headline baseline alignment was settled by D-020 (`--hero-title-baseline`); re-checking it in a browser against the current Figma frame is still a deferred visual check (no browser in this environment — see the case-study-page-one report). Retitled from "Card shadow, hover timing and alignment" to reflect that only hover timing is still open.

---

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
- **Update (2026-09-29):** Case Study 1 (Absa) committed 5 images under `src/assets/case-studies/streamlining-scoring/` — the intro hero screenshot and one per finding block — totalling **259,729 bytes (about 254 KiB / 260 KB)**, from 19.5 KB to 97.6 KB each. At that rate, four case studies of similar length would be roughly 1 MB of committed PNGs; CS2–4 are longer frames (7400–9337px vs CS1's 6003px) with more finding blocks, so the real total is likely somewhat higher. Numbers are pre-`astro:assets` processing (the committed source files); build output (AVIF/WebP/`srcset`) isn't counted here.
- **Update (2026-10-20):** Reece: staging images outside the repo is fine for now. Phase 1b's raw TRANSEARCH and landing images are at `F:/Code/cass-website-staging/figma-2026-10-20/`, not committed; their Figma URLs expire 2026-10-27. Settle this before the TRANSEARCH stream commits images.
- **Update (2026-10-21, stream `cs4`):** Reece: in-repo now, off-repo later. CS4's 14 images were committed under `src/assets/case-studies/designing-an-interactive-workbook/`, downscaled to 2× their rendered width (770,666 bytes). The move off-repo is still wanted, so this stays open. No case study image has a `srcset` yet, so phones download the 2× desktop files; worth settling with the off-repo move.

### Q-019 · Which case studies the home page features
- **Raised:** 2026-09-29
- **Blocks:** nothing yet; the current behaviour is a placeholder
- **Context:** The `caseStudies` collection reached four entries (Task 7 of the case-study-page-one batch added TRANSEARCH). The home page hero composition is built for exactly three cards — at `>=1880px` the row is `grid-auto-flow: column` with a fixed `grid-auto-columns: var(--size-card-width)`, so a fourth card extends the row rather than wrapping, and the Figma landing frame only ever shows three. `src/pages/index.astro` now takes the first three entries by `order` (`featuredCaseStudies`), so which three are shown is decided by each entry's `order` field, not by code.
- **Options:**
  - **Keep "first three by `order`"** (in use now): simplest, but the meaning of `order` becomes overloaded — it controls both the "Other case studies" ranking and home page inclusion.
  - **A separate `featured: boolean` field** in the schema: explicit, decoupled from ordering, but another field to keep in sync as case studies are added.
  - **Cass redesigns the hero for four (or however many) cards.**
- **Also decide:** what should happen as a fifth case study is added — does the home page still show only three, or does the count change too?

### Q-020 · The `/work` index route
- **Raised:** 2026-09-29
- **Blocks:** nothing yet
- **Context:** The case study spec scoped the `/work` index route out ("Out of scope: The `/work` index route"), so it still 404s. `CaseStudySubNav.astro`'s "All projects" back link already points at it (`withBase('/work')`), and every case study card links to `/work/<id>`, so the site has working links to a page that doesn't exist. Same shape as Q-011's `/resume`.
- **Options:** build a simple index page listing all four case studies, reusing `CaseStudyCard` · redirect `/work` to `/` for now · leave it 404ing until Cass says what it should contain.

### Q-021 · A third undocumented light purple, `#E3E7FF`
- **Raised:** 2026-09-29
- **Blocks:** nothing yet
- **Context:** [figma/tokens.md](figma/tokens.md) already flags two conflicting light purple variables, `Light purple` `#c4cdf4` (in use as `--color-light-purple`) and `Light Purple` `#C1CBFF`. Building the case study page's Interviews panel turned up a third: the pull quote (86:212) is filled `Light x 2` (`#E3E7FF`), which has no token at all. At 28px on the Purple panel background it reads near-identical to White, so the build uses `--color-white` there as the nearest tokenised stand-in.
- **Options:** confirm which of the three light purples (if any) is the intended one and consolidate the tokens · treat `#E3E7FF` as a one-off Figma slip, same as the `C1CBFF` case · add a fourth colour token if all three are meant to coexist.

### Q-022 · Finding blocks' inconsistent drop shadow in Figma
- **Raised:** 2026-09-29
- **Blocks:** nothing; one shadow used consistently in the build
- **Context:** In the Design section's four finding-block images, P1 and P2 use the `Portfolio Drop` effect style and P3 and P4 use `Portfolio Card drop` — the same drift pattern already flagged for the card shadows (see Q-013's history). `FindingBlock.astro` applies `--shadow-card` (`Portfolio Drop`) to every image consistently rather than reproducing the split.
- **Update 2026-09-30 (CS2):** the Status tracker screenshot (`91:1036`) uses a third effect, `Image Drop` (2, 4, 10.2, −36, `#0000000D`); its −36px spread makes it effectively invisible. `CaseStudyFigure` uses `--shadow-card` for it like every other screenshot.
- **Update 2026-10-04 (CS3):** both renders of the sales journey map, the intro hero (`99:2503`) and the "realistic user journey" figure (`98:2268`), use `Portfolio Card drop` (`--shadow-card-warm`, still with no call site). The AS-IS journey (`99:2625`) uses `Portfolio Drop`, and the five pain point cards use the invisible `Image Drop`. The build keeps `--shadow-card` on every screenshot and no shadow on the cards, pending this question.
- **Options:** confirm `Portfolio Drop` is correct for all four and fix the drifted Figma layers · confirm the split is intentional (e.g. image vs. screenshot-with-UI) and give `FindingBlock` a shadow prop.

### Q-023 · Copy defects transcribed faithfully from Figma
- **Raised:** 2026-09-29
- **Blocks:** nothing; the copy is live as transcribed
- **Context:** Case study prose was transcribed exactly as Figma has it, defects included, rather than silently corrected — copy is Cass's content, not something to edit without asking. Known defects in `src/pages/work/streamlining-scoring.astro`:
  - P2 (Giving the agent control, problem): "Agents had to manually keep track of Customers products, monthly repayments and benefits manually." — "manually" appears twice.
  - P3 (A variety of choices, solution): "...The products suggested would also be driven by customer data" — no full stop.
  - Key learnings, bullet 2: "Customers come to Agents with problems they need solved rather then products in mind." — "then" should be "than".

  In `src/pages/work/consolidating-import-collections.astro` (added 2026-09-30):
  - Project outcome: "…through journey mapping to development , and left…" — a space before the comma.
  - Step by step: "…due to legal restraints." — probably "restrictions".
  - Checker persona, pain point 2: "long feedback threads via email;" starts lowercase where the others are capitalised.
  - Trade officer flow insight: "swopping" — a valid variant spelling of "swapping", listed only for Cass to confirm.

  In `src/pages/work/sales-workflow-research.astro` (added 2026-10-04):
  - Intro lead: "MiX Telematics , a local…" — a space before the comma; and "…identified that their out of date Salesforce sales platform that impacted their ability…" doesn't parse (perhaps "…platform was impacting…").
  - AS-IS band: "…platforms and processes ." — a space before the full stop.
  - Pain point 01: "wiki’s" — an apostrophe in a plural. Pain point 02: "early enough  resulting" has a double space in Figma (it collapses in HTML).
  - **The caption "AS-IS map"** sits under the "building a realistic user journey" figure, which shows the new journey (the same image is the intro hero). Possibly a copy slip for "to-be map" or similar; it's Cass's call.

  In the TRANSEARCH frame (`144:269`, not built yet; recheck if newer content turns up):
  - "the feature tutorial mentioned above": nothing above mentions one.
  - Both screenshot captions say "reader Dashboard".
  - "my developer this made handover…" doesn't parse.
  - "a interface": should be "an interface".
- **Options:** Cass confirms and the typos are fixed as a copy change · Cass says these are intentional (unlikely) and they stay.

### Q-024 · Case study alt text needs Cass's review
- **Raised:** 2026-09-29
- **Blocks:** nothing; drafted text is live, marked for review
- **Context:** The case study spec calls for alt text to be drafted from the surrounding copy but not presented as finished, because what each screenshot is meant to *demonstrate* is Cass's design intent, not something inferable from the image alone. Every image in `src/pages/work/streamlining-scoring.astro` has drafted alt text and a `TODO(cass)` comment above it.
- **Update 2026-09-30:** `src/pages/work/consolidating-import-collections.astro` adds 10 more drafted alt strings (the intro hero, the as-is journey, three journey flows, the before and after capture screens, the two reviewing screens, and the Status tracker dashboard), each with a `TODO(cass)` comment. Persona illustrations and the capture arrow are decorative (`aria-hidden`).
- **Update 2026-10-04:** `src/pages/work/sales-workflow-research.astro` adds 4 more (the intro hero, the workshop photo, the AS-IS journey and the new journey map), each with a `TODO(cass)` comment. The "workshop artifact" arrow is decorative.
- **Options:** Cass reviews and edits the 19 drafted `alt` strings across the three pages · Cass supplies replacement copy directly.

### Q-025 · Is the redaction blur on the Standard Bank "before" screenshot strong enough?
- **Raised:** 2026-09-30
- **Blocks:** nothing; shipped as drawn (D-032)
- **Context:** Cass redacted client data in the Easier Data Capture "before" screenshot (`91:1087`) with blurred overlay slices. At the 2× export used on the site, some values are close to legible, including what look like a customer name and a person's name in the comments panel. The unredacted raw image was never saved.
- **Options:** Cass is happy with it as is · Cass strengthens the blur in Figma and the render is re-exported (a one-file swap: `src/assets/case-studies/consolidating-import-collections/capture-before-redacted.png`).

### Q-026 · Case study pages below desktop width
- **Raised:** 2026-10-01
- **Blocks:** nothing yet; the responsive pass
- **Context:** Figma only has 1920px case study frames. The process strip now scales and then wraps (D-033), so it no longer sets a minimum width, but the rest of the case study grid does: both pages scroll sideways below ~1100px (1108px for CS1, 1091px for CS2 at a 1024 viewport). The strip's wrapped layout (arrows trailing each row) and its 20px minimum are undesigned placeholders.
- **Update 2026-10-04 (CS3):** CS3 fits at 1280 and wider, and scrolls sideways below 1155px. Measuring each grid child's min-content at 1024 shows the floor on every page is the **Read More row** (1059px of content on CS3, 995px on CS2): its heading, gap and three cards don't shrink below their longest words. The floor therefore depends on which three cards a page shows. CS3's intro image bleeds into the end gutter and stays inside the viewport at every width tested.
- **Options:** Cass designs tablet and mobile frames for the case study pages · agree general rules (stack the two-column sections, wrap or stack the strip) and build without frames, then review with Cass.

### Q-035 · Cass: Regular weight on blue cards: cards only, or bands too?
- **Raised:** 2026-10-20 (Reece)
- **Blocks:** nothing; built with bands included
- **Context:** D-044 sets body text on every "blue card" to Regular. The case studies have two purple surfaces: rounded, inset cards (`.panel`) and full-bleed bands (`.band--purple`). Cass's own example, Standard Bank's user journey, is a band, so both are included (one rule in `global.css`). The rule also makes CS3's "users spoken to" stat caption (`src/pages/work/sales-workflow-research.astro`, around line 196) Regular.
- **Options:** both (as built) · rounded cards only (drop `.band--purple` from the rule).

### Q-036 · Cass: what should a Read More card's client pill look like on hover and focus?
- **Raised:** 2026-10-20 (Reece)
- **Blocks:** nothing
- **Context:** A Read More card turns Purple on hover and focus, so the Purple client pill disappears into it and only its white text is left. The Read More cards have no hover variant in Figma (`figma/components/read-more/context.md`, around lines 118 to 133), while the compact and detailed cards do. The card already turned Purple on hover before phase 2; phase 2 only fixed the pill's width and alignment.
- **Options:** Cass draws a hover state for the Read More card · reuse the detailed card's hover pill (Light purple background, Purple text) · leave the pill as text only.

### Q-037 · Reece: fix the skip link comment typo now, or with the next edit to `global.css`?
- **Raised:** 2026-10-20 (phase 2 final review, ruling R15)
- **Blocks:** nothing; it's a comment, so the built site is unaffected
- **Context:** The phase 2 fix wave reworded the skip link comment in `src/styles/global.css` (line 74) and left a typo: "which is may be what Cass saw" should read "which may be what Cass saw". The re-review caught it after the single fix wave, and the process allows no second wave, so it was parked rather than fixed.
- **Options:** fix it in its own `style:` commit · fix it in the next commit that touches `global.css` (phase 3).

### Q-038 · Cass: the copied `standardbank.co.za` links on CS4 and the landing
- **Raised:** 2026-10-20 (phase 1b)
- **Blocks:** nothing; built as plain text
- **Context:** Almost every text block on the TRANSEARCH frame (`144:269`), and every client name on the landing's client strip, carries a Figma hyperlink to `https://www.standardbank.co.za/southafrica/business`, apparently copied from CS2. It's invisible in the design (only "TRANSEARCH International" is styled like a link) and shows up as `<a href>` in `get_design_context` output.
- **Options:** plain text everywhere (the default) · Cass gives "TRANSEARCH International" in the CS4 intro a real target.

### Q-039 · A pause control for the client strip carousel (WCAG 2.2.2)
- **Raised:** 2026-10-20 (phase 1b)
- **Blocks:** nothing; the gap is accepted for now (D-053)
- **Context:** WCAG 2.2.2 (Pause, Stop, Hide, level A) requires a way to pause content that moves automatically for more than 5 seconds. The carousel stops on hover and focus, and is static under reduced motion, but touch and keyboard users can't pause it. Reece ruled out a button for now.
- **Options:** keep as built · add a pause control (Cass designs it) · a static strip on touch devices.

### Q-040 · Is `hello@cassandragarratt.com` the real address?
- **Raised:** 2026-10-20 (phase 1b)
- **Blocks:** nothing; the nav's "Email me" already copies it (`SiteNav.astro`), and the landing will show it
- **Context:** The landing frame (`267:1855`) shows `hello@cassandragarratt.com`.
- **Options:** Cass confirms it · Cass gives the real address.

### Q-cs4-1 · Cass: "interactive book" or "interactive workbook" for TRANSEARCH
- **Raised:** 2026-10-21 (stream `cs4`)
- **Blocks:** nothing; built as the designs have it
- **Context:** The landing card (`267:1911`) titles TRANSEARCH "Designing an interactive book". The case study frame (`144:269`), confirmed current by Reece on 2026-10-21, says "interactive workbook" in its title and throughout its copy. By Reece's call, the card data (`case-studies.json`, which also sets the page's `<title>`) follows the landing card (D-052), and the page heading and copy follow the frame. The slug stays `designing-an-interactive-workbook`.
- **Options:** keep both (the default) · "book" everywhere, with a copy change to the page · "workbook" everywhere, overriding the landing card's title.

### Q-cs4-2 · Cass: the TRANSEARCH International definition
- **Raised:** 2026-10-21 (stream `cs4`)
- **Blocks:** nothing; drafted text is live, marked `TODO(cass)`
- **Context:** The CS4 intro styles "TRANSEARCH International" like the other pages' Definition Tip triggers, but Figma has no definition text for it (CS1–3 each had one). Reece chose to draft one: "A global executive search and leadership consulting firm."
- **Options:** Cass confirms it · Cass gives her own wording.
