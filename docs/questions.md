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
| Q-001 | Hosting provider: Cloudflare or AWS | Blocks Q-002, deployment, Astro adapter |
| Q-002 | Contact form approach | Depends on Q-001 |
| Q-003 | Content editing: does Cass need a CMS? | Any CMS setup |
| Q-004 | Styling: plain CSS or Tailwind v4 | **Blocks scaffolding** |
| Q-005 | Token pipeline tooling | Tokens file; needs the Figma file |
| Q-006 | Testing, linting and formatting | AGENTS.md Testing/Commands; best settled at scaffolding |
| Q-007 | Figma plan for MCP access | **Blocks all Figma fetching** |

---

### Q-001 · Hosting provider
- **Raised:** 2026-09-16
- **Blocks:** Q-002 (contact form), deployment setup, Astro adapter choice
- **Context:** Cost and convenience will decide it. There's an existing domain to use. AWS is attractive partly as a way to learn AWS.
- **Options:**
  - **Cloudflare** (Pages or Workers static assets): simple static hosting with a free tier, an official Astro adapter for any server routes, and simple DNS if the domain is managed there.
  - **AWS, full setup** (S3 + CloudFront + ACM, optionally Route 53; Lambda + SES for the contact form): the most to learn, the most setup, and small recurring costs.
  - **AWS Amplify Hosting:** less setup than building it yourself on AWS, but you learn less of the underlying AWS services.
- **Sub-questions:** Where is the domain registered, and where is its DNS managed? Should the infrastructure be defined in code (e.g. CDK or Terraform) if we choose AWS?
- **Note:** check current pricing before deciding. None of the options above have been costed.

### Q-002 · Contact form approach
- **Raised:** 2026-09-16
- **Depends on:** Q-001
- **Options:** a `mailto:` link (no backend) · a third-party form service · a server endpoint that sends email (a Cloudflare Worker or AWS Lambda plus an email service).
- **Considerations:** spam protection, accessible error and success states, and whether it needs any client-side JS.

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
- **Also decide:** whether the checks run locally only, or in CI too (which depends on Q-001 hosting).

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
