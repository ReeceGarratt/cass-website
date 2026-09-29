# Figma: build workflow and snapshots

How screens get from Figma into the site, and the saved copies of what the Figma MCP server returned, so later sessions can work from them instead of fetching the same frames again (D-008). The rules for each call (one at a time, one section at a time, read only) are in [AGENTS.md → Working with Figma](../../AGENTS.md#working-with-figma).

Figma is still the source of truth. A snapshot is a copy dated when it was fetched. If the user says a design has changed, fetch it again and overwrite the snapshot.

## Build workflow

Each phase needs the one before it.

### Phase 0 · Access (user)

- A Figma plan with a Dev or Full seat for the account the MCP signs in as (D-012: Professional, Full seat).
- The MCP signed in through `/mcp`. See [figma-mcp](../wiki/figma-mcp.md).
- Figma file links added to the *Figma files* section of [figma-mcp](../wiki/figma-mcp.md).
- **Agent:** call `whoami` first. If the seat isn't Dev or Full, stop and tell the user, because every other call would come out of the 6-a-month allowance.

### Phase 1 · Foundations (once)

1. **Map the file.** Call `get_metadata` with no node ID to list the pages, then once per page to list its frames. Add one row per frame, including each breakpoint, to the [frame index](#frame-index), and note which frames are breakpoint variants of another screen.
2. **Tokens.** Call `get_variable_defs` on frames that between them use every style, and save the output to `tokens.md`. Generating the tokens CSS waits on Q-005.
3. **Shared components** (header, footer, nav, buttons, cards…): call `get_design_context` and `get_screenshot` for each one, and save them to `components/<name>/`.

You can fetch before the project is set up. Building waits on scaffolding (styling settled by D-011).

### Phase 2 · Screens (one at a time)

Agree the order with the user. Home is a good first screen because it uses the most shared components. Finish each screen before starting the next:

1. **Check the snapshot.** If `<frame>/context.md` exists and the design hasn't changed, skip to step 5.
2. **Outline:** call `get_metadata` on the frame to get its sections' node IDs.
3. **Reference:** call `get_screenshot` on the frame.
4. **Detail:** call `get_design_context` for each section, and `download_assets` for images and icons, batched up to 20 per call. Save everything to `<frame>/` and update the frame index.
5. **Build** from Astro components and tokens, reusing the Phase 1 components.
6. **Compare** the page in the dev server with the saved screenshot. Take a new screenshot only if the saved one isn't enough.
7. **Other breakpoints:** get the outline and a screenshot, and call `get_design_context` only for sections that differ from the breakpoint already built.

**On the first screen,** count the calls it took and replace the estimates in [figma-mcp](../wiki/figma-mcp.md#estimated-call-budget).

### Phase 3 · Wrap-up (before any change to the Figma plan)

- Check that every row in the frame index has a snapshot fetched after the latest design change.
- Tell the user about any frames that are missing or out of date, so they can decide whether to keep the plan (D-012).

## Layout

One folder per Figma frame, named `<page>-<breakpoint>` in kebab-case (e.g. `home-desktop`, `case-study-mobile`). Shared components go in `components/<name>/`.

```
docs/figma/
  README.md             this file, including the frame index below
  tokens.md             output of get_variable_defs, plus the frames it came from
  outline-<page>.md     get_metadata output for a whole Figma page; frame folders link to it
  home-desktop/
    context.md          metadata outline + design context, one section at a time
    screenshot.png      only if it could be saved (see below)
  components/
    site-header/
      context.md
```

## `context.md` format

```markdown
---
frame: Home / Desktop           # name as shown in Figma
node_id: "12:345"
url: https://www.figma.com/design/<file-key>/...?node-id=12-345
fetched: YYYY-MM-DD
tools: [get_metadata, get_design_context, get_screenshot]
---

## Outline
<get_metadata output>

## Section: <name> (node <id>)
<get_design_context output, unedited>
```

Keep tool output unedited so it can be compared against a fresh fetch. Put your own notes under a separate `## Notes` heading.

## Screenshots and assets

**Screenshots (checked 2026-09-16):** `get_screenshot` returns a short-lived URL, not a file. Download it straight away with `curl -sL -o <folder>/screenshot.png "<url>"`. Pass `maxDimension` equal to the frame's longer edge (e.g. `1920`) to get it at 1:1; the default is 1024. Don't commit or paste the URL, because Figma says to treat it like a secret.

**`download_assets`:** not tried yet. Check what it returns on first use and update this section.

Images that ship with the site go in `src/` or `public/`, not here.

## Frame index

| Frame | Folder | Node ID | Fetched |
|---|---|---|---|
| **Design system page** | [`design-system/`](design-system/README.md) | `129:3321` | 2026-09-29 (outline, variables, screenshot) |
| Detailed Card (component set) | [`components/detailed-card/`](components/detailed-card/) | `129:3554` | 2026-09-29 (outline, context) |
| Sub Nav (component set) | [`components/sub-nav/`](components/sub-nav/) | `185:2566` | 2026-09-29 (outline, context) |
| Pills (component set) | [`components/pills/`](components/pills/) | `144:592` | 2026-09-29 (outline, context) |
| Definition Tip | [`components/definition-tip/`](components/definition-tip/) | `99:2845` | 2026-09-29 (outline, context) |
| Read More (other case studies row) | [`components/read-more/`](components/read-more/) | `99:2461` | 2026-09-29 (outline, context) |
| Case Study / Intro | [`components/case-study-intro/`](components/case-study-intro/) | `144:1045` | 2026-09-29 (outline, context) |
| Case Study / Business Problem Heading | [`components/case-study-intro/`](components/case-study-intro/business-problem-heading.md) | `144:1870` | 2026-09-29 (context) |
| Icons (6 avatar symbols) | [`components/icons/`](components/icons/) | `144:1321` | 2026-09-29 (outline, assets) |
| Shapes & Arrows | [`components/shapes-arrows/`](components/shapes-arrows/) | `129:3457` | 2026-09-29 (outline, assets) |
| Navigation (component set) | [`components/navigation/`](components/navigation/) | `20:703` | 2026-09-16 (outline, screenshot, context, assets) — a 5th `Prototype` variant (`181:2514`) has since been added and is **not** in the snapshot |
| Case study Card / Compact Card (component set) | [`components/case-study-card/`](components/case-study-card/) | `4:123` | 2026-09-16 (outline, context, assets) |
| arrow_upward / Button_Circle Arrow (component set) | [`components/arrow/`](components/arrow/) (context is in `case-study-card/`) | `4:137` | 2026-09-16 (assets) |
| Flower (symbol) | [`components/flower/`](components/flower/) (context is in `case-study-card/`) | `1:162` | 2026-09-16 (asset) |
| Landing (default), desktop | [`landing-desktop/`](landing-desktop/) | `1:79` | 2026-09-16 (outline, screenshot; context taken from `4:489`) — **frame no longer exists in Figma** |
| Landing (hover state), desktop | [`landing-desktop-hover/`](landing-desktop-hover/) | `4:489` | 2026-09-16 (outline, screenshot, variables, context of `4:490`) — **frame no longer exists in Figma** |
| iPad Pro 11" - 1 | _never fetched_ | `19:327` | outline only — **frame no longer exists in Figma** |
| iPhone 16 - 1 | _never fetched_ | `19:328` | outline only — **frame no longer exists in Figma** |
| iPhone 16 - 2 (mobile menu) | _never fetched_ | `19:665` | outline only — **frame no longer exists in Figma** |

### The file was restructured (2026-09-29)

The file (`z037c50FocJthsq5WRzJcd`) now has **two** pages: `📕 Cover` (`129:3336`) and `Design system` (`129:3321`). The `Landing` page it had on 2026-09-16 **is gone**, along with the desktop, iPad and iPhone frames. Component node IDs (`4:123`, `20:703`, `4:137`, `1:162`) still resolve, so this is the same file reorganised rather than a new one.

Two consequences:

- **The snapshots in [`landing-desktop/`](landing-desktop/) and [`landing-desktop-hover/`](landing-desktop-hover/) are now the only record of the home page design.** Don't delete them, and treat [`outline-landing-page.md`](outline-landing-page.md) as history.
- **There is no `Work` page in this file**, so the case study designs are somewhere else. Tracked as Q-017.
