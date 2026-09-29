---
summary: How agents connect to the Figma designs, plan rate limits, the tools used, and measured calls for the build.
updated: 2026-09-17
related: [agent-tooling.md, design-tokens.md]
decisions: [D-005, D-008, D-012]
---

# Figma MCP

The Figma files are the source of truth for visuals and content. Agents read them through an MCP server; they shouldn't guess values from screenshots or descriptions.

## Configuration

Project scope, in `.mcp.json` at the repo root:

```json
{ "mcpServers": { "figma": { "type": "http", "url": "https://mcp.figma.com/mcp" } } }
```

It was added with `claude mcp add --transport http --scope project figma https://mcp.figma.com/mcp`.

## Why the remote server (D-005)

- Figma offers two MCP servers: the **remote** one (`https://mcp.figma.com/mcp`, signs in with OAuth) and the **local Dev Mode** one (`http://127.0.0.1:3845/mcp`, served by the Figma desktop app).
- On 2026-09-16 the desktop app wasn't installed on the dev machine, and nothing was listening on port 3845. That left the remote server.
- If the desktop app is installed later, the local server is an option. Switching it would be a new decision that supersedes D-005.

## Sign-in (one-time, per machine)

1. Start Claude Code **interactively** in the repo and approve the project MCP server when asked.
2. Run `/mcp`, choose `figma`, and complete the OAuth flow in the browser.
3. Check with `claude mcp list`: `figma` should show as connected.

Non-interactive or headless sessions **can't** complete OAuth. If Figma tools are missing, sign-in hasn't been done on this machine.

## Account, plan and limits

**Which account:** the MCP is signed in as the owner of the Figma account. Professional plan, Full seat, confirmed by `whoami` on 2026-09-16 (D-012). On first sign-in, call `whoami`: it returns the seat type and doesn't count toward the limit.

**No free route found (checked 2026-09-16):** Figma's [REST API rate limits](https://developers.figma.com/docs/rest-api/rate-limits) cap requests for files on a Starter plan at 6 a month, even for someone with a Full seat on another plan. Community MCP servers that use a personal access token go through the REST API, so they hit the same cap.

**Rate limits** (from [Figma's docs](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/), read 2026-09-16):

| Seat | Starter (free) | Professional | Organization / Enterprise |
|---|---|---|---|
| View, Collab | ~6 calls/month | 6/month | 6/month |
| Dev, Full | not available | **200/day, 15/min** | 600/day, 20/min |

- **What counts:** read tools only. Write tools and `whoami` don't count.
- **Uncertain:** two reads of the docs page disagreed on some cells. The Starter figure could be 6 or 20 a month, and Professional could be 10 or 15 a minute. [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) says 6 a month for Starter and for View/Collab seats. The Professional Dev/Full row is the one that matters here.
- **Shared allowance (likely, not confirmed):** limits apply per user, so every session signed in as the owner, in any MCP client, uses the same 200 a day.
- **Not documented:** when the daily limit resets, and whether failed calls count.

## Tools this project uses

These are all read tools, so they count toward the limit unless marked otherwise. Full list: [Figma MCP tools](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/).

| Tool | Use it for |
|---|---|
| `whoami` | Checking the account and seat type. Doesn't count toward the limit. |
| `get_metadata` | A sparse XML outline of a page or frame, used to find node IDs. With no node ID, it lists the file's pages. Figma recommends it for large designs. |
| `get_design_context` | Layout and styles for one section. Returns React + Tailwind by default. Too large to call on whole pages. |
| `get_variable_defs` | Variables and styles *used in the selection*. It may not list every variable in the file in one call (unverified). |
| `get_screenshot` | An image of one node. |
| `download_assets` | Image and icon exports, up to 20 nodes per call. Remote server only. |

Write tools (`use_figma`, `generate_figma_design`, `upload_assets`, `create_new_file`, …) change Cass's real files. Agents don't use them; see AGENTS.md.

## Measured call budget

Replaces the original estimate now that the first screen is built.

| Work | Calls |
|---|---|
| First pass (desktop home): frames, nav, card, tokens, content | 9 |
| Card refetch, 2026-09-17, after the caption font changed | 3 (1 `get_design_context`, 2 `get_metadata`) |
| Design system page, 2026-09-29: 11 frames and component sets | 15 (7 `get_design_context`, 3 `get_variable_defs`, 2 `get_metadata`, 2 `download_assets`, 1 `get_screenshot`) |
| Work and Landing pages, 2026-09-29: outlines and case study screenshots | 6 (2 `get_metadata`, 4 `get_screenshot`) |
| Case Study 1 (Absa) content, 2026-09-29: outline, 7 sections, images | 10 (1 `get_metadata`, 7 `get_design_context`, 2 `download_assets`) |
| **Total so far** | **43** |

A whole design-system page costs roughly **15 calls**, or about 1.5 per component set. Mapping a content page — outline plus one screenshot per frame — is much cheaper, about 6. **A full content page's design context (one outline plus `get_design_context` per section, skipping sections already covered by shared components) measured at 10 calls for Case Study 1**: 1 `get_metadata` (outline fit inline, no file needed) + 7 `get_design_context` (one per section, `Navigation` and `Read More` skipped as already built/saved) + 2 `download_assets` (one per section with raster images: Introduction, Design). Budget ~10-12 calls per case study page on this basis for the remaining three.

Well inside the 200/day, 15/minute limit (D-012). The limit is only likely to bite through the per-minute cap (parallel calls) or through fetching the same frames again. Hence the working rules in [AGENTS.md → Working with Figma](../../AGENTS.md#working-with-figma) and the snapshots in [`docs/figma/`](../figma/README.md) (D-008).

Claude's context window is the other cost: `get_design_context` output can be large. Fetching one section at a time and reading saved snapshots keeps it down.

## Usage notes

- **Sign-in** worked from the VS Code panel's `/mcp` (not just the terminal `/mcp`).
- **Annotations** come back as `data-annotations` attributes in `get_design_context` output, not as separate text.
- **`get_screenshot`** returns a short-lived URL, not a file — download it straight away (see [figma/README.md](../figma/README.md#screenshots-and-assets)). Pass `maxDimension` equal to the frame's longer edge to get it at 1:1; the default is smaller.
- **`get_design_context` on a component set** also returns the nested component sets it uses (e.g. the card's `arrow_upward` set and `Flower` symbol come back in the same call).
- **`get_design_context` requires** Figma's `figma-design-to-code` guidance resource to be loaded first. That's an MCP resource fetch, not a read call, so it doesn't count toward the limit.
- **Whether screenshots can be saved to disk:** yes, by downloading the short-lived URL with `curl`.
- **`get_variable_defs` doesn't work on a page (canvas) node.** Passing a page ID fails with *"You currently have nothing selected"* even though the ID is valid. Call it on a frame inside the page instead. Because it only returns what the selection *uses*, call it on two or three frames that between them cover the whole system (2026-09-29: Colours, Text styles and Case Study).
- **`get_metadata` with no node ID does not reliably list every page (2026-09-29).** On the portfolio file it returned only `📕 Cover` and `Design system`, omitting `Landing` (`0:1`) and `Work` (`19:104`), which both exist and open normally in the Figma UI. Acting on that listing produced two wrong conclusions — that the Landing page had been deleted and that the case studies lived in another file. **Treat the listing as a hint, not an inventory.** If a page you expect is missing, ask the user for its URL (the `node-id` query parameter is the page's node ID) rather than concluding it's gone. Querying a page ID directly works fine even when the listing omits it.
- **`get_metadata` output can exceed the tool's response limit.** The `Work` page returned ~94k characters and was written to a file instead. Parse that file rather than re-calling with a smaller scope; a re-call costs another read against the daily limit.
- **`download_assets` on a frame returns loose, unnamed vectors.** The `svgAssets` entries carry no layer names — only sizes and internal SVG ids (`face`, `face_2`, …) — so matching them back to Figma layers means comparing sizes against the `get_metadata` outline and checking the `export` PNG. For assets where the exact one matters, call it per symbol node rather than on the parent frame.
- **Exported asset sizes don't always match the placed size.** The avatar icons are all placed at 24px but export at 20–24px, and the Flower exported at 77px here versus 90px in the earlier fetch. Size at the call site.

## Figma files

- **Portfolio Website:** <https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website>. Everything is in this one file, across four pages:

  | Page | Node ID | Holds |
  |---|---|---|
  | `Landing` | `0:1` | Home page frames (`1:79`, `127:3171`), iPad and iPhone frames |
  | `Work` | `19:104` | A `Landing` frame plus the four desktop case studies and a mobile case study |
  | `Design system` | `129:3321` | Component sets, styles and variables |
  | `📕 Cover` | `129:3336` | Cover art |
