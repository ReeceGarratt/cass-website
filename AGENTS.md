# AGENTS.md

A portfolio website for Cass, a UX designer: home, case studies, about and contact pages. It's built with Astro and TypeScript, static first, hosted on Cloudflare Workers, with design tokens taken from Figma.

**Status:** scaffolded; the desktop home page POC is built.

`CLAUDE.md` is a symlink to this file, so **edit `AGENTS.md`, never `CLAUDE.md`**. This file loads in every session, so keep it short and put detail in the docs it links to.

## Repo layout

| Path | Contains |
|---|---|
| `src/` | The Astro site: `pages/`, `layouts/`, `components/`, `content/` (card metadata, JSON collection), `styles/` (tokens), `utils/` (`withBase` for base-path-safe links) |
| `public/` *(planned)* | Static assets served as-is |
| `docs/architecture.md` | Repo map, data flow, invariants |
| `docs/questions.md` | Open questions (Q-xxx): decisions waiting on the user, some spanning several features |
| `docs/decisions.md` | Decisions that have been made (D-xxx) |
| `docs/wiki/` | Knowledge built up along the way: how-tos, gotchas, research. Start at `index.md` |
| `docs/raw/` | Source material from the user (briefs, notes). Never edited |
| `docs/figma/` | Saved copies of what the Figma MCP returned, so frames aren't fetched twice (D-008) |
| `docs/superpowers/` | Specs and implementation plans from the superpowers skills |
| `.github/workflows/` | GitHub Actions: the interim GitHub Pages preview deploy (D-019) |
| `.mcp.json` | Project MCP servers (Figma) |

## Lookup routing

| You need… | Go to |
|---|---|
| Where something lives, what uses what, the current structure | **The code.** Use `grep` or `find` via Bash. |
| The big picture: boundaries, data flow, rules that must hold | `docs/architecture.md` |
| Whether something is still undecided | `docs/questions.md` |
| Why something is the way it is | `docs/decisions.md` |
| How to do something, tooling setup, known gotchas | `docs/wiki/index.md`, then the relevant page |
| What something should look like, or its text | `docs/figma/` first, then **Figma** via the `figma` MCP server. Never guess values. |
| What the user originally asked for | `docs/raw/` |

If the docs and the code disagree, trust the code and fix the doc.

## Workflow

1. **Orient.**
   - Read `docs/wiki/index.md` and the relevant pages.
   - Check `docs/questions.md` for open questions that affect the task. If one blocks it, ask the user; don't pick an answer yourself.
2. **Brainstorm.** Use `superpowers:brainstorming` for every task. Only skip it for tiny changes such as a typo, a copy tweak or a one-line doc fix.
3. **Size the change.**
   - **Significant:** plan with `superpowers:writing-plans`. Significant means any of: touching several pages or components, adding a new pattern or dependency, changing an invariant or the architecture, or unclear requirements.
   - **Small and bounded:** skip planning. Example: adding a page that mirrors an existing one.
   - **Unsure:** treat it as significant and plan.
4. **Execute.** If there's a plan, follow it with `superpowers:executing-plans`. Make the minimum viable change, meaning only what the task needs.
5. **Validate.** Run the checks under [Testing](#testing) and look at the results (`superpowers:verification-before-completion`). Don't say it's done without evidence.
6. **Update docs.** Record what you learned in the wiki, new questions in `questions.md`, decisions in `decisions.md` (removing any question they resolve), and structural changes in `architecture.md`.
7. **Summarise.** Say what changed, how it was validated, what's left or uncertain, and any new open questions.

If superpowers skills aren't available (a different agent or machine), follow the same steps without them.

## Working with Figma

The Figma MCP limits read calls to about **200 a day and 15 a minute**, and every session signed in to the same Figma account shares that allowance. Tool details and estimated calls per screen are in [figma-mcp](docs/wiki/figma-mcp.md).

**How screens get built.** Full steps are in the [Figma README](docs/figma/README.md#build-workflow).
1. **Access:** the user sets up a paid seat and signs in (D-012: Professional, Full seat). Call `whoami` first, and stop if the seat isn't Dev or Full.
2. **Foundations, once:** map every frame, then pull the tokens and shared components.
3. **Screens, one at a time:** fetch, save, build and compare each screen before starting the next.
4. **Wrap-up:** confirm every frame has an up-to-date snapshot before the user changes the Figma plan.

**Rules for every call:**

- **Check `docs/figma/` first.** If the frame is already saved and the user hasn't said the design changed, work from the saved copy.
- **Start with the outline.** Use `get_metadata` to find the frame's node IDs and sections. Then call `get_design_context` one section at a time, never on a whole page.
- **Screenshots:** take one `get_screenshot` per frame as a reference. Take more only to compare the build against the design.
- **Batch assets.** `download_assets` accepts up to 20 nodes per call.
- **Make calls one after another.** Don't make calls in parallel, and don't have several agents query Figma at once.
- **Save what you fetch** to `docs/figma/` in the same session, in the format described in its [README](docs/figma/README.md) (D-008).
- **Don't paste `get_design_context` output into the site.** It returns React + Tailwind, so use it as a reference and rebuild the design as Astro components that use tokens.
- **Read only.** Never call Figma write tools (`use_figma`, `generate_figma_design`, `upload_assets`, `create_new_file`, `add_code_connect_map`, and similar) unless the user asks. The MCP is signed in as the account owner, so any edit changes Cass's real files.
- **Long copy:** for case study text and other long content, ask the user for a text export before pulling it through many calls.
- **If you hit the limit,** stop and tell the user. Don't retry in a loop.

## Prerequisites

- **Node.js 24 LTS** (`.nvmrc`) **and npm.**
- **Windows:** Developer Mode on and `git config core.symlinks true`, so that `CLAUDE.md` stays a symlink. See [windows-dev-environment](docs/wiki/windows-dev-environment.md).
- **Claude Code:** the superpowers plugin installed and the Figma MCP signed in through `/mcp`. See [agent-tooling](docs/wiki/agent-tooling.md) and [figma-mcp](docs/wiki/figma-mcp.md).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type-check `.astro` and TypeScript files (`astro check`) |
| `npm run format` | Format the repo with Prettier |
| `npm run format:check` | Check formatting without writing |

Lint and test scripts: TBD (Q-006).

## Testing

Every change needs at least:

- A successful `npm run build`, `npm run check` passing, and `npm run format:check` passing.
- **Visual changes:** compare the page in the dev server against Figma.
- **Interactive or layout changes:** check keyboard navigation, focus order and visible focus.

The wider approach (accessibility automation, performance budgets, lint, CI) is still open (Q-006).

## Commit messages

- **Agents commit as they go.** Work on a branch, not `main`.
- **One commit per task or section of work,** e.g. one per plan task. The history should be complete without being noisy: don't commit every file edit, and don't squash a whole feature into one commit.
- **Pushing needs the user's approval every time.** Ask before each `git push`, even when earlier pushes were approved. Never force-push.
- Use [Conventional Commits](https://www.conventionalcommits.org): `type(scope): summary`, where type is one of `feat`, `fix`, `docs`, `style`, `refactor`, `test` or `chore`.
- Write the summary in the imperative, 72 characters max. Explain *why* in the body when it isn't obvious.
- One logical change per commit. Only commit work that passes the checks under [Testing](#testing).

## Principles

**Project**
- Accessibility and performance are requirements, not polish.
- Figma is the visual source of truth. Pull values through the MCP server.
- No hard-coded design values; use tokens only.
- Static first. Only add client-side JS with a stated reason.
- SEO comes later (D-004), so keep markup semantic in the meantime.

**Working**
- Prefer small, bounded changes over large refactors. Don't refactor unrelated code in passing; suggest it instead.
- Build the minimum that solves the task. Extract a component when markup repeats or Figma defines it as a component, not in advance.
- Flag architecturally significant changes (a new dependency, a new pattern, a changed invariant) before making them.
- Don't resolve open questions yourself.
- Updating the docs is part of being done.

## Documentation

- **Wiki:** read `docs/wiki/index.md` before starting a task. When adding material, editing pages or checking the wiki, follow [`docs/wiki/conventions.md`](docs/wiki/conventions.md).
- **`docs/questions.md`, `docs/decisions.md` and `docs/architecture.md`:** each one says at the top how to maintain it.
