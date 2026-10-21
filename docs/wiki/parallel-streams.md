---
summary: How to run several streams of work at once in git worktrees — the streams table, temporary Q/D IDs, labelled token blocks, and the finishing steps before each stream's PR.
updated: 2026-10-21
related: [agent-tooling.md, figma-mcp.md, log.md]
decisions: []
---

# Parallel streams

How to split a batch of work into streams that run at the same time, each in its own chat, branch and git worktree, without colliding in the shared docs. AGENTS.md has the short version; this page has the steps. First used for phase 3 of the [2026-10-20 macro plan](../superpowers/plans/2026-10-20-macro-plan.md).

## When to use it

When a plan splits work into streams that build at the same time. Single-branch work doesn't change: if nobody told you you're in a stream, ignore this page.

## Planning

The plan that splits the work has a **streams table**, one row per stream:

| Column | Example |
|---|---|
| ID: short and lowercase, used in temporary IDs and the worktree name | `landing` |
| Branch | `reece/feature/landing-v2` |
| Worktree | `../cass-website-landing` |
| Base: where its PR goes. `main` by default, or an integration branch | `main` |
| Scope | The new home page |
| Owns: files only this stream may edit | `src/pages/index.astro`, `SiteNav` |

The plan also says which stream may call Figma, if any need to.

## Setup

From any checkout:

```sh
git fetch origin
git worktree add -b <branch> ../cass-website-<id> origin/<base>
cd ../cass-website-<id> && npm install
```

## While building

Follow AGENTS.md as normal, with these differences:

- **Temporary IDs.** A new question is `Q-<id>-<n>` and a new decision is `D-<id>-<n>` (e.g. `Q-abc-1` for a stream called `abc`), numbered from 1 per stream. Put them where entries normally go: the summary table, the full entry, `log.md`, and any references in code comments or other docs. Two streams can't take the same number this way.
- **Resolving an existing question** works as normal: the new `D-<id>-<n>` entry says `Resolves Q-xxx`, and the question is removed.
- **Tokens.** Page-specific tokens go in a labelled block at the end of `src/styles/tokens.css`: `/* --- stream: <id> --- */`. Changing an existing token is a shared change: ask Reece first.
- **Owned files.** Only edit a file another stream owns if Reece agrees; otherwise note what you need in your summary.
- **Test plan.** Add manual checks under their feature's section in [`docs/test-plan.md`](../test-plan.md).
- **The plan's status table.** Edit only your own row.
- **Figma.** AGENTS.md's rules apply, and only the stream the plan names calls Figma. The allowance is shared, and calls must not run in parallel.

## Finishing (before the PR)

Tell Reece you're finishing, so **only one stream finishes at a time**. Two streams finishing together could both take the same next number.

1. **Merge the base:** `git fetch origin && git merge origin/<base>`.
2. **Resolve conflicts.** In the append-only docs (`questions.md`, `decisions.md`, `wiki/log.md`, `wiki/index.md`, `test-plan.md`), keep both sides. Keep `log.md` in date order. Anything else (code, or two edits to the same entry) needs a real resolution; ask Reece if it isn't clear.
3. **Give each temporary ID a real number.** Take the next free number, checking both `questions.md` and `decisions.md`, since resolved questions keep their numbers. Replace every use, then check nothing is left:

   ```sh
   git grep -n "Q-<id>-\|D-<id>-"
   ```

   Move the new summary rows into ID order.
4. **Fold the tokens block** into the right groups in `tokens.css`, and delete the label.
5. **Run the checks** in AGENTS.md's Testing section, commit, and open a PR into the base. Pushing needs Reece's approval.

Once the PR merges, the next stream can finish. Its merge of the base (step 1) picks up the numbers just taken.

## Integration branch variant

If the plan names an integration branch as the base, streams run the same steps against it. When every stream has merged into it, it opens one PR to `main`. Each stream has already fixed its IDs and tokens, so there's no extra cleanup.

## After merging

```sh
git worktree remove ../cass-website-<id>
git branch -d <branch>
```

Update the stream's row in the plan's status table.
