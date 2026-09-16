# cass-website

Personal portfolio website for Cass, a UX designer.

> **Status:** Pre-development. Built with Astro (not yet scaffolded), to be hosted on Cloudflare Workers.

## Design

The designs live in Figma. They are the source of truth for layout, typography, colour and spacing. Coding agents read them through the Figma MCP server, which is configured in [`.mcp.json`](.mcp.json).

## Tech stack

[Astro](https://astro.build) with TypeScript, with design tokens as CSS custom properties generated from Figma. See [`AGENTS.md`](AGENTS.md) for details and open decisions.

## Getting started

_TBD. Setup, dev server and build instructions will go here once the project is scaffolded._

## Hosting & deployment

Hosted on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) with static assets. See [decision D-009](docs/decisions.md). The deploy pipeline isn't set up yet ([Q-009](docs/questions.md)).

## Contributing with AI agents

Agent instructions live in [`AGENTS.md`](AGENTS.md). Project documentation: [architecture](docs/architecture.md), [open questions](docs/questions.md), [decisions](docs/decisions.md), and the [wiki](docs/wiki/index.md).
