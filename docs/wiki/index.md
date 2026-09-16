# Wiki index

A knowledge base maintained by agents, following Karpathy's "LLM wiki" pattern. It stores what's been learned while building this repo (how-tos, gotchas, research, conventions), so later agents don't have to work it out again.

- **Rules for maintaining it:** see [conventions.md](conventions.md). You don't need them just to read the wiki.
- **History:** [log.md](log.md).
- **Source material:** [`../raw/`](../raw/). Never edited.

One line per page: `[Title](file.md): one-sentence summary`. Every wiki page must appear here.

## Meta

- [Wiki conventions](conventions.md): layers, the ingest/update/query/lint operations, and page format.

## Project docs (outside the wiki)

- [Architecture](../architecture.md): repo map, planned structure and invariants.
- [Open questions](../questions.md): decisions still waiting on the user (Q-xxx), with a summary table.
- [Decisions](../decisions.md): numbered decisions that have been made (D-xxx).
- [Figma build workflow and snapshots](../figma/README.md): the phases for building screens from Figma, saved MCP output (one folder per frame), and the frame index.

## Tooling & environment

- [Agent tooling](agent-tooling.md): the Claude Code plugins and MCP servers this repo relies on, and where each one is configured.
- [Figma MCP](figma-mcp.md): how agents connect to the Figma designs, plan rate limits, the tools used, and estimated calls for the build.
- [Windows dev environment](windows-dev-environment.md): symlink and text-encoding gotchas on the Windows dev machine.

## Hosting & operations

- [Hosting options](hosting-options.md): research behind D-009: six hosts compared, cost at our traffic, bot and cost-spike risk, security and GitHub Actions support (prices checked 2026-09-16).
- [Cloudflare Workers hosting](cloudflare-workers.md): free-plan limits, zone settings to change, previews, CI with GitHub Actions, email for the contact form, and security notes.
- [Monitoring options](monitoring-options.md): observability research for the later monitoring pass (D-010): Sentry, Grafana Cloud, Datadog and Workers observability limits.

## Design

_No pages yet. Planned: design tokens, and a component inventory once the Figma file is available._

## Sources

- [2026-09-16 project brief](../raw/2026-09-16-project-brief.md): original requirements, preferences and hosting candidates.
