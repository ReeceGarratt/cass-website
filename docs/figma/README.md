# Figma: build workflow and snapshots

How screens get from Figma into the site, and the saved copies of what the Figma MCP server returned, so later sessions can work from them instead of fetching the same frames again (D-008). The rules for each call (one at a time, one section at a time, read only) are in [AGENTS.md → Working with Figma](../../AGENTS.md#working-with-figma).

Figma is still the source of truth. A snapshot is a copy dated when it was fetched. If the user says a design has changed, fetch it again and overwrite the snapshot.

## Build workflow

Each phase needs the one before it.

### Phase 0 · Access (user)

- A Figma plan with a Dev or Full seat for the account the MCP signs in as (Q-007).
- The MCP signed in through `/mcp`. See [figma-mcp](../wiki/figma-mcp.md).
- Figma file links added to the *Figma files* section of [figma-mcp](../wiki/figma-mcp.md).
- **Agent:** call `whoami` first. If the seat isn't Dev or Full, stop and tell the user, because every other call would come out of the 6-a-month allowance.

### Phase 1 · Foundations (once)

1. **Map the file.** Call `get_metadata` with no node ID to list the pages, then once per page to list its frames. Add one row per frame, including each breakpoint, to the [frame index](#frame-index), and note which frames are breakpoint variants of another screen.
2. **Tokens.** Call `get_variable_defs` on frames that between them use every style, and save the output to `tokens.md`. Generating the tokens CSS waits on Q-005.
3. **Shared components** (header, footer, nav, buttons, cards…): call `get_design_context` and `get_screenshot` for each one, and save them to `components/<name>/`.

You can fetch before the project is set up. Building waits on scaffolding, which is blocked by Q-004.

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
- Tell the user about any frames that are missing or out of date, so they can decide whether to keep the plan (Q-007).

## Layout

One folder per Figma frame, named `<page>-<breakpoint>` in kebab-case (e.g. `home-desktop`, `case-study-mobile`). Shared components go in `components/<name>/`.

```
docs/figma/
  README.md             this file, including the frame index below
  tokens.md             output of get_variable_defs, plus the frames it came from
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

## Screenshots and assets (unverified)

As of 2026-09-16, no one has checked whether an agent can write a `get_screenshot` image to disk, or what `download_assets` actually returns (files or URLs). Check this on the first fetch and update this section. If screenshots can't be saved, write `screenshot: not saved` in the frontmatter and fetch one again only when you need it.

Images that ship with the site go in `src/` or `public/`, not here.

## Frame index

| Frame | Folder | Node ID | Fetched |
|---|---|---|---|
| _None yet_ | | | |
