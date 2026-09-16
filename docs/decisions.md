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
- **Date:** 2026-09-16 · **Status:** Accepted
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
