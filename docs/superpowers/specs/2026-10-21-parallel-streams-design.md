# Parallel streams convention (design, 2026-10-21)

## Problem

Parallel work in separate worktrees (phase 3 of the [2026-10-20 macro plan](../plans/2026-10-20-macro-plan.md)) needs rules so that streams don't collide in the shared docs. Today those rules live only in the macro plan, and they contradict AGENTS.md step 6, which tells agents to edit `questions.md` and `decisions.md` directly. The workaround, a notes file per stream, hides entries from the files agents search: Q-017 was answered in phase 1b's notes but is still open in `questions.md`. Two branches have already taken the same D numbers (D-041 to D-044).

We'll run parallel streams again, so the rules should be a reusable part of the repo, not part of one plan.

## Decisions (agreed with Reece, 2026-10-21)

- **Each stream reaches its base through its own PR.** The base is `main` by default, or an integration branch if the plan names one. Both use the same steps.
- **Entries go where they normally go, with temporary IDs** (option A). The rejected options were a section per stream in each shared file (more steps for the same result) and notes files per stream (they hide entries).
- **Temporary IDs get real numbers just before the stream's PR,** one stream at a time, so the base never holds temporary IDs.

## Design

### AGENTS.md

- **A "Parallel streams" section** of about six lines. It applies only when the starting prompt or a plan's streams table says the agent is in a stream; otherwise nothing changes. It covers temporary IDs, swapping in real numbers before the PR, labelled token blocks, files owned by one stream, one Figma caller at a time, and a link to the wiki page.
- **Workflow step 6** gets a clause pointing streams to that section.
- **Repo layout:** no change (`docs/test-plan.md` was added in the same PR).

### `questions.md` and `decisions.md`

One bullet in each "How to use" header: in a stream, use `Q-<stream>-<n>` / `D-<stream>-<n>`, which get real numbers before the stream's PR (link to the wiki page).

### `docs/wiki/parallel-streams.md` (new how-to)

- **Planning:** the plan has a streams table with each stream's ID (short, lowercase, e.g. `landing`), branch (`reece/<type>/<slug>`), worktree (`../cass-website-<id>`), base, scope, and the files only it may edit.
- **Setup:** create the worktree from `origin/<base>`, then `npm install`.
- **While building:**
  - Temporary IDs in the normal places: the summary table, the entries, `log.md`, and references in code comments.
  - Page-specific tokens in a `/* --- stream: <id> --- */` block at the end of `tokens.css`.
  - Test plan checks under their feature's section in `docs/test-plan.md`.
  - Edit only your own row of the plan's status table.
  - Figma: AGENTS.md's rules, and only one stream calls Figma at a time; the plan says which.
- **Finishing (before the PR):** tell Reece, so only one stream finishes at a time. Then:
  1. Merge `origin/<base>`.
  2. Resolve conflicts in append-only docs (`questions.md`, `decisions.md`, `log.md`, `test-plan.md`, the wiki index) by keeping both sides; keep `log.md` in date order.
  3. Give each temporary ID the next free number (check both files, since resolved questions keep theirs), and replace it everywhere with `git grep`.
  4. Fold the tokens block into the main tokens.
  5. Run the checks, then PR into the base. Pushing needs Reece's approval.
- **Integration branch variant:** the same steps with the integration branch as the base; its final PR to `main` needs no clean-up.
- **After merging:** remove the worktree and delete the branch.

### Moving the current work onto it

- **Macro plan:** the "Constraints" bullets about streams and the phase 4 description point to the wiki page instead of restating rules. The phase 3 table gets stream IDs (`fixes`, `cs4`, `landing`) and a base column (`main`). Phase 4 shrinks to what's left after the streams' own PRs: cleanup and a full visual check.
- **Phase 1b notes:** numbered now, while nothing else is running.
  - Decisions: Q-017 resolved (`267:1855` is the landing); new designs are the source of truth for content; the client strip is a looping carousel with no pause button; its speed comes from `CLIENT_STRIP_LOOP_SECONDS` (default 40s). Q-017 is removed from `questions.md`.
  - Questions: the copied-link artefact; the carousel's WCAG 2.2.2 gap (accepted for now; revisit a pause control); the email address. The extra CS4 copy defects extend Q-023, and the "staging outside the repo is fine for now" ruling updates Q-018, both in place.
  - The notes file is deleted, and links to it are repointed.
- **Test plan:** the stream sections become plain feature sections.
- **Index:** the wiki index lists the new page; `log.md` gets one entry.

## Out of scope

- Merge tooling such as a `.gitattributes` union driver. Keeping both sides by hand is enough at this scale.
- Changing how single-branch work runs.

## Testing

`npm run format:check`, `npm run build` and `npm run check` pass. `git grep` finds no links to the deleted notes file, and no Q-017 references that read as still open.
