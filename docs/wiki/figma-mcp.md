---
summary: How agents connect to the Figma designs, plan rate limits, the tools used, and estimated calls for the build.
updated: 2026-09-16
related: [agent-tooling.md]
decisions: [D-005, D-008, Q-007]
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

**Which account:** the MCP will be signed in as the owner of the Figma account. As of 2026-09-16 the plan hasn't been chosen. Professional is recommended, and the choice is open as Q-007. On first sign-in, call `whoami`: it returns the seat type and doesn't count toward the limit.

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

## Estimated call budget

These are **estimates from the tool list, not measured usage** (2026-09-16). Replace them with real figures once the first screen is built.

| Work | Calls |
|---|---|
| Setup: page list, tokens, shared components | ~20–35 |
| Each unique screen: outline, screenshot, 3–8 sections, assets, comparison | ~8–15 |
| Each extra breakpoint of a screen | ~4–6 |
| Content of each case study | ~5–10 |

For about 5 layouts at 3 breakpoints, the whole build should take roughly **200–300 calls, spread over several days**, including rework. The limit is only likely to bite through the per-minute cap (parallel calls) or through fetching the same frames again. Hence the working rules in [AGENTS.md → Working with Figma](../../AGENTS.md#working-with-figma) and the snapshots in [`docs/figma/`](../figma/README.md) (D-008).

Claude's context window is the other cost: `get_design_context` output can be large. Fetching one section at a time and reading saved snapshots keeps it down.

## Usage notes

_TBD once signed in:_ the node-ID and URL formats the tools expect, how big `get_design_context` output is in practice, whether screenshots can be saved to disk, and the real number of calls per screen.

## Figma files

_TBD: links to be added when shared. Also list them in `AGENTS.md` → Design source of truth._
