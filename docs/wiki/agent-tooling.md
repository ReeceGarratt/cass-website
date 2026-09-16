---
summary: The Claude Code plugins and MCP servers this repo relies on, and where each one is configured.
updated: 2026-09-16
related: [figma-mcp.md, windows-dev-environment.md]
decisions: [D-005, D-007]
---

# Agent tooling

| Tool | Kind | Scope / config location | In the repo? |
|---|---|---|---|
| superpowers | Claude Code plugin (skills) | User scope (`~/.claude`) | **No.** Install it on each machine. |
| figma | MCP server (remote HTTP) | Project scope (`.mcp.json`) | Yes, but each machine needs to sign in once. See [figma-mcp.md](figma-mcp.md). |

## superpowers

A skills plugin by Jesse Vincent (obra). Installed version: **6.3.0** (2026-09-16).

**Install on a new machine:**

```bash
claude plugin marketplace add obra/superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace
```

Restart Claude Code afterwards so the skills load.

**Skills included:**
- **Planning and running work:** brainstorming, writing-plans, executing-plans, subagent-driven-development, dispatching-parallel-agents
- **Writing and fixing code:** test-driven-development, systematic-debugging, verification-before-completion
- **Code review:** requesting-code-review, receiving-code-review
- **Git workflow:** using-git-worktrees, finishing-a-development-branch
- **Meta:** using-superpowers, writing-skills

Because the plugin is installed per user, not in the repo, agents on other machines or in CI won't have these skills unless someone installs them.

## Instructions file

`AGENTS.md` is the single instructions file. `CLAUDE.md` is a symlink to it (D-006), so Claude Code and other agents read the same rules.
