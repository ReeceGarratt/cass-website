# Decisions

The record of calls that have been made (D-xxx). Questions still waiting on a decision live in [questions.md](questions.md) until they're settled.

## How to use this doc

- **When a call is made,** add a `D-` entry at the bottom with **Date · Status**, **Context**, **Decision**, **Alternatives considered** and **Consequences**. If it answers an open question, add `Resolves Q-xxx` and remove the question from [questions.md](questions.md).
- **Never reuse or renumber IDs.** Don't delete decisions. When a decision is replaced, set its status to `Superseded by D-xxx` and add the new entry.
- **Keep each entry short.** Longer research belongs in the [wiki](wiki/index.md).
- Add a line to [`wiki/log.md`](wiki/log.md) whenever a decision is made or superseded.

---

## Decisions

### D-001 · Framework: Astro with TypeScript
- **Date:** 2026-09-16 · **Status:** Accepted
- **Context:** Content-heavy portfolio site. Priorities are accessibility, performance, reusable components, design tokens, and trying tech outside Reece's usual stack.
- **Decision:** Astro with TypeScript, static output by default, islands only where interactivity is needed.
- **Alternatives considered:**
  - **Eleventy:** excellent performance and minimal abstraction, but component support is weaker (WebC) and content has no typed schema.
  - **SvelteKit:** the most to learn, but ships a small runtime and adds more framework concepts.
  - **Hugo:** weak component model, and Go templates don't carry over to other work.
  - **Next.js / Nuxt:** too heavy for a content site, and not new to Reece.
  - **Lit + Vite:** routing and content handling would have to be built by hand.
- **Consequences:** `.astro` components with scoped styles. Hosting adapters get added when Q-001 is resolved.
- **Revisit if:** Astro gets in the way. The site is small, and tokens, MDX content and CSS all carry over to another framework.

### D-002 · Design tokens as CSS custom properties sourced from Figma
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** Figma variables are the source of truth. They're turned into CSS custom properties in a single tokens file. Components use `var(--…)` values only, with no hard-coded colour, type, spacing or radius values.
- **Consequences:** How tokens are generated is still open (Q-005).

### D-003 · Case studies as an Astro content collection (MDX)
- **Date:** 2026-09-16 · **Status:** Superseded by D-013
- **Decision:** Each case study is an MDX file in a content collection with a typed frontmatter schema, rendered by one `[slug]` route and listed on an index page.
- **Consequences:** Invalid frontmatter fails the build. A CMS can be added on top later (Q-003).

### D-004 · SEO deferred past the first pass
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** The first pass has no meta/Open Graph tags, sitemap or structured data. Markup should still be semantic so SEO is easy to add later.

### D-005 · Figma access through the remote Figma MCP server
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** Use Figma's remote MCP server (`https://mcp.figma.com/mcp`), configured at project scope in `.mcp.json`.
- **Alternatives considered:** the local Dev Mode MCP server, which needs the Figma desktop app. The app isn't installed on the dev machine.
- **Consequences:** You must sign in once through `/mcp` in an interactive Claude Code session. See [wiki/figma-mcp.md](wiki/figma-mcp.md).

### D-006 · `CLAUDE.md` is a symlink to `AGENTS.md`
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** One instructions file (`AGENTS.md`) serves all agents. `CLAUDE.md` is a real symlink to it, stored in git as mode `120000`.
- **Alternatives considered:** a `CLAUDE.md` containing just `@AGENTS.md`. It works on every OS, but the user preferred a real symlink.
- **Consequences:** Windows clones need Developer Mode and `core.symlinks=true`. See [wiki/windows-dev-environment.md](wiki/windows-dev-environment.md).

### D-007 · Documentation system: architecture doc, decision log, LLM wiki
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** [`architecture.md`](architecture.md) is the map of the repo, this file records decisions, [`questions.md`](questions.md) tracks open questions, and a Karpathy-style wiki (`docs/raw/` plus `docs/wiki/`) holds knowledge built up along the way. `AGENTS.md` sets the rules for maintaining them.
- **Consequences:** Agents must keep these docs up to date as part of finishing any task (see the Workflow section of `AGENTS.md`). Wiki maintenance rules live in [`wiki/conventions.md`](wiki/conventions.md), so AGENTS.md stays short. (Updated 2026-09-16: open questions moved from this file into `questions.md`, so they're quick to look up between features.)

### D-008 · Save Figma MCP output in `docs/figma/`
- **Date:** 2026-09-16 · **Status:** Accepted
- **Context:** The Figma MCP on a Professional Full seat allows about 200 read calls a day and 15 a minute, shared by every session on the account. Each new agent session would otherwise fetch the same frames again, which uses up calls and fills Claude's context. See [wiki/figma-mcp.md](wiki/figma-mcp.md).
- **Decision:** Save tool output unedited in `docs/figma/`, one folder per frame, with its node ID, URL and fetch date. Agents read these saved copies before querying Figma, and fetch again only when the user says a design has changed. Format: [figma/README.md](figma/README.md).
- **Alternatives considered:** always querying Figma live, which is simpler and always current but repeats calls in every session.
- **Consequences:** Saved copies can go stale without anyone noticing, so Figma stays the source of truth (architecture invariant 6). Whether screenshots can be saved to disk hasn't been checked.

### D-009 · Hosting: Cloudflare Workers with static assets
- **Date:** 2026-09-16 · **Status:** Accepted · **Resolves Q-001**
- **Context:** A low-traffic portfolio (about 100–200 visits a month). Free is preferred and cheap is acceptable. The domain's DNS is already on Cloudflare. Learning AWS was a secondary motive. Research, pricing and sources: [wiki/hosting-options.md](wiki/hosting-options.md).
- **Decision:** Host on Cloudflare Workers with static assets, on the free plan. The site stays static. Add the `@astrojs/cloudflare` adapter only when a route has to render on demand, e.g. the contact form (Q-002).
- **Alternatives considered:**
  - **S3 + CloudFront (flat-rate Free plan):** about $0.00–0.10 a month, the most AWS learning, and GitHub Actions login through OIDC. Against it: it needs an AWS account on the Paid plan, 1–2 days of setup, and you build previews, rollback and folder-URL rewriting yourself. The Free plan's WAF also can't filter on headers.
  - **Cloudflare Pages:** still supported, but Cloudflare recommends Workers for new projects and new features only land there.
  - **AWS Amplify:** pay-as-you-go with no spending cap, it hides the AWS services underneath, and it loses git-based previews if builds run in GitHub Actions.
  - **Netlify:** free credits run out (15 per production deploy), and the site is paused when they do.
  - **Vercel Hobby:** its non-commercial clause is a grey area for a freelancer's portfolio.
  - **GitHub Pages:** no custom headers, no previews, and the repo must be public on a free account.
- **Consequences:**
  - Hosting costs $0 a month with a hard cap: static requests are unlimited, and the free plan returns errors rather than billing.
  - DNS, hosting and email all sit in one Cloudflare account, so it needs strong MFA.
  - CI logs in with a long-lived API token. Keep its scope narrow and rotate it.
  - Some Cloudflare zone features rewrite HTML and must stay off (see [wiki/cloudflare-workers.md](wiki/cloudflare-workers.md)).
  - Exporting logs and traces to other tools needs Workers Paid at $5 a month (Q-008).
  - This project won't be the vehicle for learning AWS.
- **Revisit if:** the site needs something Workers can't do, or learning AWS becomes a goal of this project. The output is static, so moving is cheap.

### D-010 · Observability deferred past the first pass
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** The first pass ships with no monitoring stack: no error tracking SDK, no real-user monitoring script, no uptime checks and no log export. Observability is added in a later pass, and the tool choice stays open as Q-008.
- **Consequences:** Keep the contact form handler (Q-002) small and isolated, so an SDK can wrap it later. Research is filed in [wiki/monitoring-options.md](wiki/monitoring-options.md), so the later pass doesn't have to repeat it.

### D-011 · Styling: plain CSS with scoped styles
- **Date:** 2026-09-16 · **Status:** Accepted · **Resolves Q-004**
- **Context:** The home page POC needed a styling approach before scaffolding could start.
- **Decision:** Astro scoped `<style>` blocks on top of token custom properties. No Tailwind.
- **Alternatives considered:** Tailwind v4 with a `@theme` built from tokens. Faster to write, but adds a utility-class vocabulary on top of the token system.
- **Consequences:** Components read design values with `var(--…)` only; no build step turns tokens into utility classes.

### D-012 · Figma access: Professional plan, Full seat
- **Date:** 2026-09-16 · **Status:** Accepted · **Resolves Q-007**
- **Context:** Figma fetching for the home page POC was blocked on a plan decision (Q-007).
- **Decision:** Professional plan, Full seat. `whoami` on 2026-09-16 returned a Full seat on the "pro" tier.
- **Consequences:** 200 read calls a day, 15 a minute, shared by every session signed in as the account owner.

### D-013 · Case studies: bespoke pages plus a JSON card collection
- **Date:** 2026-09-16 · **Status:** Accepted · **Supersedes D-003** · **Resolves Q-003**
- **Context:** D-003 assumed one shared MDX template per case study. The user doesn't want content abstracted into a CMS-friendly shape.
- **Decision:** Each case study is its own `.astro` page at `/work/<id>`, styled uniquely, with no shared MDX template. Card metadata (title, skills, summary, order) lives in the `caseStudies` data collection (`src/content/case-studies.json`, `file()` loader, schema in `src/content.config.ts`).
- **Alternatives considered:** the original MDX + `[slug]` route (D-003); a CMS on top of MDX (Q-003), ruled out because Cass doesn't need to edit content without a developer.
- **Consequences:** No CMS work. Case study pages don't share layout automatically, so shared structure (if any) is pulled out only when it repeats.

### D-014 · Tokens written by hand for the POC
- **Date:** 2026-09-16 · **Status:** Accepted
- **Context:** D-002 fixed the output (CSS custom properties) but not how tokens are generated (Q-005), and the POC couldn't wait on a pipeline.
- **Decision:** `src/styles/tokens.css` is written by hand from `docs/figma/`. Q-005 stays open for a real pipeline. Spacing, size and radius tokens are named by us, because Figma has no variables for them.
- **Consequences:** The tokens file must be kept in sync with Figma by hand (architecture invariant 2).

### D-015 · Fonts: the Astro Fonts API
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** Inter at weights 400, 700 and 900 through `fontProviders.fontsource()` and `<Font cssVariable="--font-inter" preload />`.
- **Alternatives considered:** the `@fontsource-variable/inter` package, which was in the spec until the built-in API turned up during planning.
- **Consequences:** The first build needs network access, to download the font files.

### D-016 · Node 24 LTS, and baseline checks
- **Date:** 2026-09-16 · **Status:** Accepted · **Partly resolves Q-006**
- **Decision:** `.nvmrc` and `"engines"` pin Node 24. Scripts: `check` (`astro check`, with `typescript` pinned to 6.x for `@astrojs/check` 0.9) and `format` / `format:check` (Prettier with `prettier-plugin-astro`). Prettier ignores `**/*.md` and `docs/figma/`.
- **Consequences:** Accessibility automation, Lighthouse, lint and CI are still open (Q-006).

### D-017 · Navigation items and state semantics
- **Date:** 2026-09-16 · **Status:** Accepted
- **Decision:** Adds a Home item that isn't in the design. The **Selected** pill marks `aria-current="page"`, and the **Hover** dot shows on hover and focus, matching the Figma annotations on component `20:703` (confirmed by the user). The brand links to `/`.
- **Consequences:** The brand link duplicates the Home item (Q-012). The Resume item points to `/resume`, which 404s until its target is decided (Q-011).

### D-018 · Commit per task, approval before push
- **Date:** 2026-09-16 · **Status:** Accepted
- **Context:** Agents were making many small edits per task without a clear commit boundary.
- **Decision:** Agents commit as they go, one commit per task or section of work. Pushing needs the user's approval every time, even when earlier pushes were approved. Enforced by a `.claude/settings.json` ask rule on `git push`.
- **Consequences:** History stays readable without being noisy. See `AGENTS.md` → Commit messages.

### D-019 · GitHub Pages as an interim preview
- **Date:** 2026-09-17 · **Status:** Accepted
- **Context:** The user wants a shareable deployed copy of the site before the Cloudflare pipeline (Q-009) is settled. D-009 turned down GitHub Pages as the *production* host. The repo is public, so Pages is free.
- **Decision:** Deploy an interim preview to GitHub Pages from `.github/workflows/deploy-pages.yml`, on push to `main` or a manual run. D-009 stands: Cloudflare Workers is still the production host. The preview lives at `https://reecegarratt.github.io/cass-website/`, so the workflow passes `--site` and `--base` to `astro build`, and root-relative links go through `withBase` in `src/utils/base-path.ts`. Local and future Cloudflare builds have no base.
- **Alternatives considered:**
  - **Replace Cloudflare with Pages:** turned down. D-009's reasons still hold (no custom headers, no previews).
  - **Build the Cloudflare pipeline now (Q-009's proposed option):** needs the account-ownership answers first.
  - **A custom subdomain on Pages:** no base path or code changes, but needs DNS work for something temporary.
- **Consequences:** Every new root-relative link or `public/` asset URL must use `withBase` (architecture invariant 7). The workflow, and `withBase` if it's no longer needed, go when the Cloudflare pipeline is running. Setup and gotchas: [wiki/github-pages.md](wiki/github-pages.md).

### D-020 · Home page cards: equal heights, baseline alignment, shadow and hover fade
- **Date:** 2026-09-17 · **Status:** Accepted
- **Context:** Requested by the user ahead of updated Figma frames. The current Figma row lets cards differ in height (391 / 391 / 373px) and centres them, which read as uneven. The hover swap was instant and felt jarring. Figma has no shadow or motion values yet.
- **Decision:**
  - **Equal heights:** the card list is a grid with `grid-auto-rows: 1fr`, so every card matches the tallest, including when the stacked layout wraps. At 1880px and wider it's a single auto-flow column row.
  - **Baseline alignment (1880px and wider):** the hero grid's first row ends on the baseline of "effective &" (`--hero-titles-offset-top` + `--hero-title-baseline`), and the cards sit at the end of that row, so taller cards grow upward.
  - **Shadow:** a small Purple-tinted `--shadow-card`, a placeholder until Figma defines one.
  - **Hover:** colours fade over `--duration-hover` (200ms, `ease-out`). The arrow icons and corner strokes crossfade via opacity (option A of three offered; a rotating or scaling flower and a shape morph were the others).
- **Alternatives considered:** a flex row with `align-items: stretch` for equal heights. It matches the grid in the single-row desktop layout, but only equalises cards on the same line once the row wraps.
- **Consequences:** The build now differs from the current Figma frames on card height and position, which invariant 6 allows through this entry. Shadow, timing and alignment values get replaced when Cass's updated frames land (Q-013).
- **Update (2026-09-29):** the real shadow values landed with the case study work — `--shadow-card` and `--shadow-card-warm` are no longer placeholders. See Q-013.

### D-021 · Fonts: Inter only, Roboto retired
- **Date:** 2026-09-29 · **Status:** Accepted · **Resolves Q-014**
- **Context:** The Read More cards (`88:583`, `88:602`, `165:2537`) render Roboto Bold 15px skills, a leftover from before the card caption font changed to Inter on 2026-09-17 ([wiki/design-tokens.md](wiki/design-tokens.md)). Cass ruled on this directly during the case-study-page-one brainstorming (2026-09-29).
- **Decision:** Inter is the only text font on the site. Roboto is retired everywhere, including the Read More cards. La Belle Aurore is kept as the decorative handwritten face (section-heading eyebrows, quote marks, interview markers, the definition-tip term).
- **Alternatives considered:** keep Roboto for the Read More cards specifically, matching Figma's detached copies exactly. Rejected — it reproduces stale drift as if it were intent, and the maintained card components had already moved to Inter.
- **Consequences:** `CaseStudyCard.astro`'s skills list uses `.type-caption` (Inter Bold 12px) for every card, including Read More (see D-025 for the rest of that card's divergence). `astro.config.mjs` only ever needed an Inter and a La Belle Aurore font entry; no Roboto entry was added (D-015 stands).

### D-022 · Case study pages: bespoke `.astro` files composing shared section components
- **Date:** 2026-09-29 · **Status:** Accepted · **Amends D-013** · **Resolves Q-015**
- **Context:** D-013 said case study pages are bespoke `.astro` files with no shared template. Having mapped all four case studies ([wiki/componentisation.md](wiki/componentisation.md)), they share a vocabulary of section types — finding block, section heading, process strip, intro, sub nav, Read More row — in different orders and counts per case study, not a common sequence. That's the shape of a toolkit, not a template.
- **Decision:** Case study pages stay bespoke `.astro` files — D-013's freedom for each page to differ holds — but they compose a shared set of section components (`CaseStudyLayout`, `CaseStudySubNav`, `CaseStudyIntro`, `SectionHeading`, `FindingBlock`, `ProcessStrip`, `Pill`, `CircleArrow`, `DefinitionTip`, `ReadMoreSection`). Prose and section-specific markup stay in the page file. A data-driven content model (moving that prose into the collection) is deferred to post-MVP.
- **Alternatives considered:** a shared template with per-case-study content — rejected, constrains how different a case study can look, and the four frames don't share a sequence. Fully bespoke pages sharing nothing — rejected, the sub nav's progress script and the page grid would be hand-copied into four files, which is exactly where inconsistency creeps in.
- **Consequences:** amends D-013 rather than reversing it. Building case study 2 should mostly mean composing the existing components in a new order, with new bespoke sections only where CS2 genuinely differs (personas, user journey). Revisit if CS2 shows the toolkit isn't holding.

### D-023 · Progressive enhancement over a UI framework
- **Date:** 2026-09-29 · **Status:** Accepted · **Resolves Q-016**
- **Context:** Two case study components need interactivity that invariant 3 (no client JS without a stated reason) requires be justified: the sub nav's progress underline, which needs scroll position, and the Definition Tip's popup, whose open/close/Escape/focus behaviour Figma draws but doesn't specify.
- **Decision:** The Definition Tip uses the native `popover` attribute (Popover API): opening, closing, `Escape`, light dismiss, top-layer stacking and focus handling are all native, with about 8 lines of script only to position the bubble under its trigger on `beforetoggle` (popovers render in the top layer and can't be positioned by an ancestor with CSS alone). The sub nav's progress underline uses a small `IntersectionObserver` module script. No UI framework, and no scroll-driven CSS (`animation-timeline`) — cross-browser support wasn't certain enough to depend on for the only implementation.
- **Alternatives considered:** CSS-only (`:target` or `<details>` for the tip, a static current-section marker for the sub nav) — rejected, loses the sweeping progress indicator entirely and CSS-only tooltips are hard to make keyboard- and screen-reader-safe.
- **Consequences:** total JS across both features is under 2KB with no dependencies. Both degrade to complete, functioning HTML with no JS by design (verified by code review only — the no-JS browser pass itself is still a deferred visual check, see the report).

### D-024 · Type classes and a numeric spacing scale
- **Date:** 2026-09-29 · **Status:** Accepted
- **Context:** The case study page introduced many more Figma text styles (Title 1, Title 2, H2, Body Med, Hand written, Stats, H3) and far more spacing values than the home page's bespoke named tokens were built for.
- **Decision:** One CSS class per Figma text style in `global.css` (`.type-title-1`, `.type-title-2`, `.type-h2`, `.type-body-med`, `.type-handwritten`, `.type-stats`, `.type-h3`, alongside the existing `.type-title`/`.type-h1`/`.type-body`/`.type-caption`/`.type-subtitle`), setting only family/size/weight/line-height/letter-spacing — colour stays on the component, because the same style appears in Red, Purple, Black and White depending on context. A numeric spacing scale (`--space-8` through `--space-96`, where the number is the px value) sits alongside the existing bespoke named tokens, with Figma's two real spacing variables aliased onto it (`Headings & Body` → `--space-16`, `Sub-Sub Sections` → `--space-48`).
- **Alternatives considered:** keep extending the home page's one-off-named-token approach for every new value. Rejected — it doesn't scale to ~20 section headings and ~16 finding blocks each re-declaring the same handful of styles and gaps.
- **Consequences:** genuine one-off measurements (the 110px gutter, the 30px card padding, the 1448px inset measure) keep their own named tokens rather than being forced onto the scale. Full naming scheme in [wiki/design-tokens.md](wiki/design-tokens.md).

### D-025 · Sanctioned divergences on the Read More cards
- **Date:** 2026-09-29 · **Status:** Accepted
- **Context:** Unifying the Compact, Detailed and Read More card shapes into one `CaseStudyCard.astro` component ([wiki/componentisation.md](wiki/componentisation.md)) meant picking one behaviour where Figma drew three different ones. Invariant 6 requires divergences from Figma be written down, not silent.
- **Decision:** The Read More cards diverge from Figma in three ways, all following from using one shared card component:
  | Figma draws | We build | Why |
  |---|---|---|
  | Roboto Bold 15px skills | Inter Bold 12px (D-021) | Cass's ruling: Inter only |
  | `rgba(0,0,0,0.58)` summary | Grey `#6b6b6b` | Matches the maintained Compact/Detailed cards; the 58% black reads as a leftover |
  | No hover state drawn | Hover state, as the other cards | They are links to case studies; no affordance where the identical card elsewhere has one would be worse than diverging |
- **Alternatives considered:** build the Read More cards exactly as drawn, as a second component or a style variant carrying the stale values. Rejected — that would faithfully implement drift as though it were intent.
- **Consequences:** flagged to Cass so the Figma copies can be updated to match (open item in the case-study-page-one report). No code change needed if Figma is updated to agree instead.

### D-026 · The two-measure case study page layout
- **Date:** 2026-09-29 · **Status:** Accepted
- **Context:** While building the case study page, the Design section and two Purple panels (Interviews, User Testing) turned out to be inset to 1448px inside the 1699px content track — not full-bleed, and not filling the track — contradicting the plan's initial assumption of a full-bleed Purple band for every panel. The spec left open whether body copy needed a narrower third grid track.
- **Decision:** Share one token, `--size-inset-measure` (1448px = 90.5rem), across the Design section and both Purple panels, applied as `max-inline-size` plus `margin-inline: auto` inside the existing two-track grid — not a third grid track.
- **Alternatives considered:** a third, narrower `text` grid track nested inside `content`. Rejected as premature — the spec said explicitly not to add one pre-emptively, and a shared token covers all three call sites with far less structural change.
- **Consequences:** the page now visibly steps between two measures at 1920px (about 125px either side) where the Introduction (1699px) meets the panels and Design section (1448px) — flagged as a deferred visual check, since it's the first place the difference is visible. If more sections adopt the inset measure, a dedicated grid track becomes worth revisiting.

### D-027 · Two deliberate departures from Figma on the case study page
- **Date:** 2026-09-29 · **Status:** Accepted
- **Context:** Two of CS1's Figma frames use techniques that don't survive a viewport width Figma didn't consider: the user-testing annotation (arrow + caption) is placed with absolute positioning that overlaps the Insight text at exactly one fixed size; the Handover section is centred with fixed `px-[550px]` side padding, which collapses the content to nothing below a 1100px viewport.
- **Decision:** Build the user-testing annotation in flow, as a caption that follows the paragraph it points back to, rather than absolutely positioned on top of it. Build the Handover row inside the page's normal content grid track (capped at its measured 903px, centred) rather than with fixed pixel side padding.
- **Alternatives considered:** reproduce the absolute overlap and the fixed padding exactly as drawn. Rejected — neither is responsive, and invariant 6's write-it-down exception exists for cases like this.
- **Consequences:** both flagged to Cass so the Figma frames can be corrected or the departure endorsed (open items in the report). The same techniques are likely to recur on case studies 2–4 and will need the same call.

### D-028 · ProcessStrip takes measured label widths as props
- **Date:** 2026-09-30 · **Status:** Accepted
- **Context:** `ProcessStrip` looked each label's measured wrap width up in a table keyed by CS1's six label strings. CS2's labels would all have fallen through to the safety cap, and one label ("user research") has a different measured width in each frame (129px vs 126px).
- **Decision:** `steps` is `{ label, width }[]`, where `width` is a `--size-process-step-*` token. The table is gone; the `max-inline-size` safety net stays.
- **Alternatives considered:** extend the table per case study (it can't express the same label at two widths) · drop fixed widths (reintroduces the overflow D-026's work fixed).
- **Consequences:** each case study declares its six measured widths as tokens. CS1 re-verified pixel-identical.

### D-029 · Shared case study patterns extracted on second use
- **Date:** 2026-09-30 · **Status:** Accepted
- **Context:** Case study 2 repeats patterns that were page markup in CS1: the inset Purple panel, the rule-separated findings list, and the label/body findings list. It also adds a screenshot-with-handwritten-caption figure six times.
- **Decision:** `.panel` becomes a global utility class, not a component (the heading sits differently in every panel, so a component would be a section with a slot). `FindingsList`, `LabelledFindings` (also used inside `FindingBlock`) and `CaseStudyFigure` become components. `FindingBlock` gains `tone`, `columns` and `align`. Persona cards, the Solutions layouts and CS2's two full-bleed bands stay page markup (first use).
- **Alternatives considered:** copy CS1's page CSS into CS2 (duplication drifts) · a `Panel.astro` wrapper (slot-only) · Status tracker as a fourth `FindingBlock` (would have needed three props for one caller).
- **Consequences:** CS1 moved onto the shared pieces, verified pixel-identical. The business-problem grid is still duplicated between the two pages; extract it at a third use. `.panel` also gained `inline-size: 100%`: auto margins stopped the grid item stretching, so CS1's user-testing panel had rendered 970px wide instead of Figma's 1451px (a visible fix to CS1).

### D-030 · Case study images: crops baked into assets, redactions exported as renders
- **Date:** 2026-09-30 · **Status:** Accepted
- **Context:** Figma crops several CS2 screenshots inside fixed frames, and redacts one ("before", `91:1087`) with blurred overlay slices rather than in the image itself.
- **Decision:** Figma's crops are applied to the asset files at import (`sharp`), so components take no crop props. Any image redacted by overlays is saved as a render of the composed node (here at 2×, shadow bleed cropped), never as the raw fill, which is unredacted.
- **Alternatives considered:** `object-position`/`aspect-ratio` props on `CaseStudyFigure` · reproducing the blur slices in CSS (fragile, and the raw file would still ship).
- **Consequences:** re-cropping means re-exporting from Figma. The redaction's strength is Cass's call (Q-025).

### D-031 · Headless Edge is the visual check
- **Date:** 2026-09-30 · **Status:** Accepted
- **Context:** CS1's keyboard, no-JS and visual checks were never run because the environment was assumed to have no browser. Microsoft Edge is installed on the dev machine.
- **Decision:** Verify pages with headless Edge over the DevTools protocol, no new dependencies: full-page and per-section shots, no-JS (scripts stripped via request interception), reduced motion, and a Tab-order focus trace. Refactors must leave pages pixel-identical to baselines taken before the change. The scripts live in the git-ignored `.superpowers/sdd/2026-09-30-case-study-two/` (`shoot.mjs`, `diff.mjs`); see [figma-mcp](wiki/figma-mcp.md#working-without-a-browser-two-techniques-from-the-case-study-build).
- **Alternatives considered:** Playwright (a new dependency, and Q-006 is still open) · manual checks only.
- **Consequences:** keyboard *operation* (Enter/Escape on the Definition Tip) is still a manual checklist. If the scripts prove their worth, promoting them into the repo belongs with Q-006.

### D-032 · Trust Cass's redaction as drawn
- **Date:** 2026-09-30 · **Status:** Accepted
- **Context:** The CS2 "before" screenshot's blur leaves some values near-legible at 2×.
- **Decision:** Ship it as Cass drew it; a more strongly blurred image can be swapped in later as a one-file change. Raised with Cass as Q-025.
- **Alternatives considered:** blocking publication until Cass confirms · blurring further ourselves (changes Cass's work without asking).
- **Consequences:** Q-025 stays open as a non-blocking note.

### D-033 · ProcessStrip scales to fit, then wraps
- **Date:** 2026-10-01 · **Status:** Accepted
- **Context:** The strip's labels had fixed px widths, so the row needed ~1432px and case study pages scrolled sideways below that (76px at 1280). Shrinking the labels alone can't fix it: each measured width is within 1–27px of its longest word, and the 5 arrows and 10 gaps (~530px) never shrink.
- **Decision:** Figma's 30px is the default. Every strip size (label widths, arrows, gaps) is in `em` of the label type, and the type is fitted to the band with `clamp(20px, (100cqi - 2 gutters) / 47.75, 30px)`, so the whole row scales as one and keeps Figma's line breaks. Below the 20px minimum (`--type-process-min-size`) the row wraps and the band grows taller. 20px is a starting value to revisit after testing.
- **Alternatives considered:** percentage or `vw` label widths (they save at most 38px, since the words themselves are the limit) · a breakpoint to a stacked layout (a design call Figma doesn't cover; the wrap covers it for now) · measuring each strip's own row length (one constant from the widest row is simpler; CS1 starts scaling slightly earlier than strictly needed).
- **Consequences:** introduces the site's first container query (`container-type: inline-size` on the band; `vw` would count a classic scrollbar). Both case studies are pixel-identical at 1920 and fit at 1280; the strip wraps without overflowing down to 390. Pages still overflow below ~1100px from the rest of the case study grid (Q-026).
