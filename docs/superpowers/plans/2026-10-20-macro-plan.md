# Macro plan: design system refresh, new landing, TRANSEARCH, Cass's feedback (2026-10-20)

The batch of work from 2026-10-20, split into phases that each run in **their own chat**. This file is the hand-off between those chats: read it first, do your phase, then update [Status](#status) before ending the session.

**Priority if time runs short:** foundation (design system, nav, shared feedback) → Cass's page-specific feedback → TRANSEARCH → landing. Finishing tomorrow is acceptable; the site is needed soon for recruiters.

## The work

1. **Design system.** The Figma Design system page (`129:3321`) is now the source of truth for components, hover states and colours. Where another frame conflicts with it, the design system wins. **If unsure, ask Reece before applying it.**
2. **New landing page and new nav bar.** Some of it reuses content we've built, laid out differently. Reece has details to clarify before it's built.
3. **TRANSEARCH case study** (the existing CS4 frame, probably edited since its 2026-09-29 screenshot), plus the new nav and sub-nav on **every** case study page.
4. **Cass's feedback** on the existing case studies: [`docs/raw/2026-10-20-cass-feedback-case-studies.md`](../../raw/2026-10-20-cass-feedback-case-studies.md). Triaged [below](#cass-feedback-triage).

## Constraints that shape the plan

- **Figma reads are serial.** One shared allowance (~15 calls/min, ~200/day) and no parallel calls (AGENTS.md). So Figma reading is front-loaded into phase 1, and later phases build from `docs/figma/` snapshots. **Only one chat calls Figma at a time.**
- **The design system and most of Cass's feedback hit the same shared files:** `tokens.css`, `global.css`, `SiteNav`, `CaseStudySubNav`, `CaseStudyIntro`, `CaseStudyCard`, `Pill`, `ProcessStrip`, `DefinitionTip`. They go in one serial phase (2) before anything is parallelised.
- **Parallel streams (phase 3) must not collide in shared docs or tokens:**
  - New Q/D entries and wiki notes go in a stream notes file, `docs/superpowers/notes/2026-10-20-<stream>.md`, not in `questions.md` / `decisions.md` (two streams would both take the next free number). Phase 4 numbers and moves them.
  - Page-specific tokens go in a labelled block per stream at the end of `tokens.css` (`/* --- landing (2026-10-20) --- */`); phase 4 folds them in.
  - Only stream B edits `src/content/case-studies.json`.
- **Base branch is `origin/main`.** It already contains CS3 and the case study UI fixes (PRs #6, #7); local `main` is just stale.

## Phases

```
1a Figma: design system + nav + CS1–3 recheck ──▶ 2 Foundation (build) ──▶ PR to main ──┬─▶ 3A Landing      ─┐
                       1b Figma: landing + TRANSEARCH (runs alongside 2) ───────────────┼─▶ 3B TRANSEARCH   ─┼─▶ 4 Integrate
                                                                                         └─▶ 3C Page fixes   ─┘
```

### Phase 1a: setup and Figma refresh (design system side)

- **Branch:** `reece/feature/design-system-refresh` from `origin/main`.
- **Setup:** `git fetch`, fast-forward local `main`, create the branch. Remove the stale `F:/Code/cass-website-ui-fixes` worktree (clean, merged as PR #7) and its branch. Commit this plan and the raw feedback file (they were written uncommitted on `reece/feature/case-study-3`).
- **Figma (≈20–25 calls):** `whoami`, then:
  - Re-map the Design system page and compare it with [`docs/figma/design-system/README.md`](../../figma/design-system/README.md): variables, text styles, effect styles, component sets and their hover/variant states.
  - The **new nav** and **sub-nav** components (including any scroll/hover states).
  - A fresh screenshot of CS1, CS2 and CS3, plus the `Case Study / Intro` component. Cass says intro spacing was "updated in designs", and several feedback items say "see design".
- **Output:**
  - Updated snapshots in `docs/figma/` (D-008 format).
  - **A design system delta doc**, `docs/figma/design-system/delta-2026-10-20.md`: every token, style and component that differs from what's built, each marked *apply*, *conflict (needs Reece)* or *no change*. Include what the CS1–3 rechecks show changed.
  - Add the [questions for Cass](#questions-for-cass) to `questions.md` as Q entries (phase 1a is serial, so numbering is safe).
- **Stop for Reece** to rule on every *conflict* row before phase 2 starts.

### Phase 1b: Figma refresh (landing and TRANSEARCH)

Runs while phase 2 builds, because phase 2 makes no Figma calls. **Phase 2 must not call Figma while 1b is running.**

- **Branch:** commit snapshots to `reece/feature/design-system-refresh` (docs only, so no conflict with phase 2's code), or to a `reece/docs/figma-landing-cs4` branch if that's easier to keep separate.
- **Figma (≈20 calls):**
  - **TRANSEARCH:** a new screenshot first; compare with [`docs/figma/case-study-4-desktop/screenshot.png`](../../figma/case-study-4-desktop/screenshot.png) and note what changed. Then `get_metadata` and `get_design_context` per section, and `download_assets` for the images (≈10–12 calls, per the CS1 measurement).
  - **Landing:** resolve Q-017 (which frame is current), then outline, screenshot and design context per section (≈8 calls).
- **Ask Reece** for a text export of TRANSEARCH's long copy before pulling it call by call.

### Phase 2: Foundation

- **Branch:** `reece/feature/foundation`, in the worktree `../cass-website-foundation`. It was first planned on `reece/feature/design-system-refresh`, but that branch was retired (see [Branches](#branches)) so phase 1b and phase 2 could run side by side without colliding. **Plan with `superpowers:writing-plans`.** It changes shared components and adds a client script pattern, so it's significant.
- **Scope:**
  - Apply the delta doc's *apply* rows and Reece's rulings on the conflicts (tokens, type, shadows, hover states).
  - Build the **new nav** and **new sub-nav**, and swap them into the home page and all three existing case studies.
  - The [shared feedback items](#shared-feedback-items).
  - Reece's rulings from phase 1a: D-037 to D-040 and D-046 to D-049 (style guide as the source of truth, 55px arrow hover, Email me copies with a provisional tick, a per-item sub-nav underline, nav variant per page, rendered-gap intro spacing, a 22px pill icon, and a nav of Home, Work and Email me only).
- **Exit:** checks pass, visual compare against the saved snapshots, docs updated. **PR to `main`** (push needs Reece's approval). Getting this to `main` early puts the feedback fixes in front of recruiters sooner, and gives phase 3 a clean base.

### Phase 2 notes for Reece

**1. The branch changed.** The plan named `reece/feature/design-system-refresh`. Phase 1a was already committed there and phase 1b needed its own docs-only branch, so phase 2 moved to `reece/feature/foundation` in its own worktree (D-046 to D-049 were renumbered at the same time). The old branch is retired.

**2. Check the intro gaps (D-046).** The gaps were measured in the browser on CS1 at 1920px, as ink to ink (eyebrow ink to title ink, title ink to the pill's top):

| Page | Before (eyebrow to title / title to pill) | After | Target |
|---|---|---|---|
| CS1 | 13 / 11 | 7 / 13 | 6.5 / 13.2, met |
| CS2 | 13 / 11 | 7 / 13 | 6.5 / 13.2, met |
| CS3 | 31 / 21 (no descenders in its eyebrow) | 25 / 23 | 15.5 / 25.2, missed |

CS1 set the two shared tokens: the margins went from 16px to 10px and 18px (13 to 7px and 11 to 13px of ink gap). CS3 misses its own targets because its eyebrow has no descenders, so its ink gap was 31px to begin with (CS1 and CS2: 13px) and a 6px margin change can't halve it. One shared pair was kept (ruling R8) rather than tuning spacing to glyph shapes; a per-page override is a one-line change. Crops to compare: [before](2026-10-20-foundation/intro-before.png) and [after](2026-10-20-foundation/intro-after.png).

Also: `woman-3.svg` was cropped to its artwork (its export already included its 24px frame), and the user-type icons are sized by height (22px tall, width from the aspect ratio), so `woman-3` renders 23.62px by 22px (ruling R9).

### Phase 3: three parallel streams (worktrees off `main` after phase 2 merges)

Each runs in its own chat and worktree (`superpowers:using-git-worktrees`), with `npm install` in each. Each does a brief brainstorm and plan per AGENTS.md. Streams build from snapshots; if one needs a Figma call, check that no other chat is calling Figma.

| Stream | Branch | Worktree | Scope |
|---|---|---|---|
| **C** page fixes | `reece/fix/cass-feedback-pages` | `../cass-website-page-fixes` | The [page-specific feedback items](#page-specific-feedback-items). Small; well suited to a subagent. Run first if time is short. |
| **B** TRANSEARCH | `reece/feature/case-study-4` | `../cass-website-cs4` | The fourth case study page, its `case-studies.json` entry and images. **Q-018 (image delivery)** is pressing at this point; raise it before committing images. **First step: confirm the TRANSEARCH content is current.** New designs are the source of truth, and the landing card (`267:1911`) already disagrees with both the CS4 frame and `case-studies.json`: it says "interactive book" (not "workbook") and lists the skills "UI Design | Interaction Design | Typography". Before building, ask Reece whether `144:269` (snapshotted 2026-10-20) is still the current TRANSEARCH design or newer case study content exists. Then update the JSON entry to the new designs (including Absa's "Absa Banking" badge, since only B edits the JSON). See [phase 1b notes](../notes/2026-10-20-phase-1b.md). |
| **A** landing | `reece/feature/landing-v2` | `../cass-website-landing` | The new home page. **Starts with Reece's clarifications.** Touches Q-017, Q-019, Q-012, Q-011 and probably Q-020. **Also standardise the tick icons:** the nav's "Email me" copy tick (D-048, built in phase 2 as provisional) must match the landing page's tick, so use one shared tick everywhere. The landing tick is now saved: `272:2302`, a Purple Material Symbols `check` (`docs/figma/landing-v2-desktop/icon-check-copied.svg`). Q-017 is confirmed: build from `267:1855`. **Client strip:** a scrolling, looping carousel that stops on hover, otherwise as designed (no pause button). CSS only, static under reduced motion. Speed comes from the GitHub variable `CLIENT_STRIP_LOOP_SECONDS`, defaulting to 40s per loop. That's a new build-config pattern, so flag it in 3A's plan. Details and the accepted WCAG 2.2.2 gap are in the [phase 1b notes](../notes/2026-10-20-phase-1b.md). |

### Phase 4: Integrate

Merge C, B, A (in that order, smallest first) into `main` via PRs or one integration branch, whichever Reece prefers. Fold the stream token blocks into `tokens.css`. Number the Q/D entries from the stream notes files (and from [phase 1b's notes](../notes/2026-10-20-phase-1b.md)) and move them into `questions.md` / `decisions.md`. Update `architecture.md`, the wiki and `log.md`. Run the full checks, visually compare every page, then push with Reece's approval.

## Branches

Agreed with Reece on 2026-10-20, after phase 1b finished and while phase 2 was in progress.

```
origin/main ──(phase 1a commits)── 2a83323  ← reece/feature/design-system-refresh (1a only)
                                    ├── reece/feature/foundation       phase 2, worktree ../cass-website-foundation
                                    └── reece/docs/figma-landing-cs4   phase 1b, worktree ../cass-website-figma-1b (docs only)
```

1. **`reece/feature/design-system-refresh` is retired.** It holds only phase 1a, which both branches above already contain, so nothing merges into it.
2. **Phase 2 doesn't wait for 1b.** If it needs a 1b file before the merge, it reads it from the branch without merging, e.g. `git show reece/docs/figma-landing-cs4:docs/figma/landing-v2-desktop/icon-check-copied.svg` (the landing's copy tick, D-048).
3. **At the end of phase 2, before its PR, merge 1b into `foundation`.** In the foundation worktree, run `git merge --no-ff reece/docs/figma-landing-cs4`. Use a merge, not a rebase, so 1b stays one unit in the history. Only two files are expected to conflict:
   - `docs/wiki/log.md`: keep both sides' entries, in date order.
   - This plan: keep phase 2's version, then re-add 1b's Status row and its additions to the 3A and 3B rows in the phase 3 table.

   Then re-run the [checks](../../../AGENTS.md#testing). 1b's docs already use phase 2's renumbered decisions (D-046 to D-049).
4. **One PR, `reece/feature/foundation` → `main`,** carrying phases 1a, 1b and 2. A separate 1b PR gains nothing: phase 3 can't start until phase 2 lands, and streams 3A and 3B need 1b's snapshots at that point. Pushing needs Reece's approval.
5. **After it merges:**
   - Cut the phase 3 worktrees from `origin/main`, **not local `main`** (see 6).
   - Remove the 1b worktree (`git worktree remove ../cass-website-figma-1b`), and delete `reece/docs/figma-landing-cs4` and `reece/feature/design-system-refresh`.
   - Keep `F:/Code/cass-website-staging/figma-2026-10-20/` (the raw images) until stream 3B has used it.
6. **Local `main` has a stray commit,** `5133022` (2026-09-16, "docs(docs): further context"), that isn't on `origin/main`. Reece inspects it, then either cherry-picks it onto a branch or resets local `main` to `origin/main`. The reset would discard it, so no agent does it unasked.

## Cass feedback triage

Source: [`docs/raw/2026-10-20-cass-feedback-case-studies.md`](../../raw/2026-10-20-cass-feedback-case-studies.md).

### Shared feedback items

These go in phase 2.

| Item | Touches | Notes |
|---|---|---|
| Nav font 16px | `SiteNav` / new nav | Check against the new nav in Figma |
| Show the nav when scrolling up | Nav, `BaseLayout` | A small client script, a new pattern (invariant 3: state the reason). Hides on scroll down, returns on scroll up; **the sub-nav always stays visible** (D-045) |
| "All projects" arrow → Material `arrow_back` | `CaseStudySubNav` | Inline SVG from Material Symbols; no icon font or new dependency |
| "Skip to content" button | `BaseLayout`, `global.css` | **Keep it**: it's an accessibility requirement (invariant 5). Restyle it to the design system, and find out what focused it for Cass (D-041) |
| Intro: space above the intro halved, eyebrow-to-title halved, title-to-pill +20% | `CaseStudyIntro` | "Updated in designs": measure from Figma; don't apply the percentages blindly |
| Call centre agent icon 22px at 1920 | `Pill` / icons | |
| Company name bold + underlined; info block on hover | `DefinitionTip` | Opens on click today. Opens on hover, focus and tap; stays open while hovered; closes on Escape (D-042) |
| Process arrows `#C4CDF4` | `ProcessStrip` | That's `--color-light-purple` |
| Read More: client pills left-aligned and not full width; arrow buttons right-aligned | `CaseStudyCard` | |
| Regular weight for description text on blue cards | `.panel`, `LabelledFindings`, `FindingsList` | Every case study (D-044) |

### Page-specific feedback items

These go in phase 3C.

| Page | Item | Notes |
|---|---|---|
| Standard Bank | Business needs: not all text bold | Check the design |
| Standard Bank | Reviewing section: left-align the right-hand text with the checker summary image | |
| Absa | User testing arrow closer to the text | Check the design |

### Questions for Cass

The first five were answered on 2026-10-20 ([raw answers](../../raw/2026-10-20-cass-feedback-answers.md)), resolving Q-027 to Q-031:

| Q | Answer | Decision |
|---|---|---|
| Q-027 Skip to content | Keep it, restyled | D-041 |
| Q-028 Info on hover | Hover, focus and tap; stays open while hovered | D-042 |
| Q-029 Other case studies in a blue block | Ignore the request; follow the designs | D-043 |
| Q-030 Regular weight on blue cards | Every case study | D-044 |
| Q-031 Nav on scroll up | Hides on scroll down; the sub-nav stays visible | D-045 |

**Still with Cass** (raised in phase 1a; see `questions.md`): Q-032 intro spacing not in the design, Q-033 pill icon 22px or 24px, Q-034 the "Email me" copied state. Q-032 and Q-033 affect phase 2; if they're unanswered when it starts, build to Figma and leave them flagged.

## Starting prompts

Paste one of these to start each chat.

- **1a:** `Start phase 1a of docs/superpowers/plans/2026-10-20-macro-plan.md.`
- **1b:** `Start phase 1b of docs/superpowers/plans/2026-10-20-macro-plan.md. Phase 2 is running in another chat and won't call Figma.`
- **2:** `Start phase 2 of docs/superpowers/plans/2026-10-20-macro-plan.md. Phase 1a is done; the delta doc and my conflict rulings are in docs/figma/design-system/delta-2026-10-20.md.`
- **3A / 3B / 3C:** `Start stream <A|B|C> of phase 3 in docs/superpowers/plans/2026-10-20-macro-plan.md, in its own worktree.`
- **4:** `Start phase 4 of docs/superpowers/plans/2026-10-20-macro-plan.md.`

## Status

Update this table at the end of each phase.

| Phase | State | Branch | Notes |
|---|---|---|---|
| 1a | **Done** | `reece/feature/design-system-refresh` | 19 Figma reads. Delta: `docs/figma/design-system/delta-2026-10-20.md`; rulings recorded as D-037 to D-040. Questions for Cass: Q-027 to Q-034. Local `main` was **not** fast-forwarded: it has a stray local commit (`5133022`, 2026-09-16) that isn't on `origin/main`; the branch was cut from `origin/main` directly. Built token values weren't compared (reading `tokens.css` was blocked by a tool permission), so phase 2 checks the rows marked *check token*. |
| 1b | **Done** | `reece/docs/figma-landing-cs4` (own worktree, because phase 2 was working in the main one) | 23 Figma reads (one of them the email copied state, `272:2302`). Snapshots: `docs/figma/case-study-4-desktop/context.md` (what changed since 2026-09-29 is in its Notes) and `docs/figma/landing-v2-desktop/context.md` (`267:1855`). Raw images **not committed** (Q-018): staged at `F:/Code/cass-website-staging/figma-2026-10-20/`; their Figma URLs expire 2026-10-27. No text export was needed: the outline already has every string. New questions and the **duplicate D-041 to D-044 numbers** (since renumbered as D-046 to D-049) are in `docs/superpowers/notes/2026-10-20-phase-1b.md`. Q-017 confirmed by Reece: `267:1855` is the landing. Stream 3B now starts by confirming the TRANSEARCH content is current. |
| 2 | **In review** | `reece/feature/foundation` | Built in the worktree `../cass-website-foundation`; Tasks 2 to 10 of the foundation plan, plus a final-review fix wave. The renumbering fix (the second D-041 to D-044 became D-046 to D-049) is in the log. New: D-050 (undesigned nav details), Q-035 and Q-036 for Cass, Q-037 for Reece. **PR #8** to `main`; 1b merged into the branch (Branches items 3 and 4). Two items for Reece to check: the branch change, and the measured intro gaps (see [Phase 2 notes](#phase-2-notes-for-reece)). Manual checks: the Definition Tip (Escape and click-outside), a touch tap on Android, the skip link on a real Mac and phone, and the Read More pill on hover. |
| 3A landing | Not started | | Waiting on Reece's clarifications |
| 3B TRANSEARCH | Not started | | |
| 3C page fixes | Not started | | |
| 4 | Not started | | |
