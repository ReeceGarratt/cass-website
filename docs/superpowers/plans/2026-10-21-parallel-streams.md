# Parallel streams convention Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make parallel streams in worktrees a reusable repo convention, and move the 2026-10-20 macro plan and phase 1b's notes onto it.

**Architecture:** Docs only. A conditional section in AGENTS.md, one bullet in each of `questions.md` and `decisions.md`, and the full how-to in a new wiki page. Existing work moves onto it.

**Tech Stack:** Markdown, Prettier.

**Spec:** [docs/superpowers/specs/2026-10-21-parallel-streams-design.md](../specs/2026-10-21-parallel-streams-design.md)

## Global Constraints

- Branch `reece/docs/test-plan` (PR #9), worktree `F:/Code/cass-website-foundation`. Pushing needs Reece's approval (given for this PR).
- Temporary ID format: `Q-<stream>-<n>` and `D-<stream>-<n>`, where `<stream>` is short and lowercase. Phase 3's streams are `fixes`, `cs4` and `landing`.
- Never edit old `log.md` entries; only append.
- Every commit passes `npm run format:check`, `npm run build` and `npm run check`.

---

### Task 1: The convention

**Files:**

- Create: `docs/wiki/parallel-streams.md` (frontmatter per `docs/wiki/conventions.md`; sections: When to use, Planning, Setup, While building, Finishing, Integration branch variant, After merging, as in the spec)
- Modify: `AGENTS.md`: a new `## Parallel streams` section after `## Workflow`; a clause in Workflow step 6
- Modify: `docs/questions.md`, `docs/decisions.md`: one "How to use" bullet each
- Modify: `docs/wiki/index.md`: one line under Tooling & environment

- [ ] **Step 1:** Write the wiki page and the three pointers.
- [ ] **Step 2:** Run `npx prettier --write` on the changed files, then the three checks. Expected: all pass.
- [ ] **Step 3:** Commit `docs: add the parallel streams convention`.

### Task 2: Number phase 1b's notes

**Files:**

- Modify: `docs/decisions.md`: append D-051 (Q-017 resolved: `267:1855` is the landing, Resolves Q-017), D-052 (new designs are the source of truth for case study content), D-053 (the client strip is a looping carousel, stopping on hover, with no pause button; CSS only, static under reduced motion; WCAG 2.2.2 gap accepted, see Q-039), and D-054 (speed from `CLIENT_STRIP_LOOP_SECONDS`, default 40s, baked in at build)
- Modify: `docs/questions.md`: remove Q-017 (row and entry); add Q-038 (the copied-link artefact), Q-039 (a pause control for touch and keyboard users), Q-040 (is `hello@cassandragarratt.com` the real address); update Q-018 in place (staging outside the repo is fine for now, raw images at `F:/Code/cass-website-staging/figma-2026-10-20/`) and Q-023 in place (the CS4 frame's defects)
- Modify: `docs/figma/landing-v2-desktop/context.md:572`, `docs/superpowers/plans/2026-10-20-macro-plan.md`: repoint links from the notes file to the new IDs
- Delete: `docs/superpowers/notes/2026-10-20-phase-1b.md`

- [ ] **Step 1:** Write the entries, then repoint the links.
- [ ] **Step 2:** `git grep -n "notes/2026-10-20-phase-1b"` finds nothing outside `log.md` (old log entries stay as they are).
- [ ] **Step 3:** Checks pass. Commit `docs: number phase 1b's notes (D-051 to D-054, Q-038 to Q-040)`.

### Task 3: Move the macro plan and test plan onto the convention

**Files:**

- Modify: `docs/superpowers/plans/2026-10-20-macro-plan.md`: the stream bullets in Constraints point to the wiki page; the phase 3 table gets an ID and a base column; phase 4 becomes cleanup and a full visual check; the starting prompt for 3A, 3B and 3C names the stream ID
- Modify: `docs/test-plan.md`: rename the stream sections to plain feature sections, and point the "Adding checks" bullet at features rather than streams
- Modify: `docs/wiki/log.md`: append one entry covering tasks 1 to 3

- [ ] **Step 1:** Make the edits.
- [ ] **Step 2:** Checks pass. Commit `docs: move the macro plan onto the parallel streams convention`.
- [ ] **Step 3:** Push `reece/docs/test-plan` and update PR #9's description.
