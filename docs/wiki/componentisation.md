---
summary: What actually got built for Case Studies 1 and 2 against the pre-build predictions below, plus the original analysis of the Figma Design system page.
updated: 2026-09-30
related: [design-tokens.md, figma-mcp.md, index.md]
decisions: [D-013, D-002, D-022, D-025, D-028, D-029, D-030, Q-005, Q-013, Q-017]
---

# Componentisation

## What was actually built (Case Study 1, 2026-09-29)

The predictions below were written *before* building the first case study page. They're kept as-is further down this page for the reasoning; this section is the correction pass the case-study-page-one plan's Task 18 calls for — what got built, and where the predictions were right or wrong.

**The component set as built matches the prediction well.** Ten new pieces went in: the `CaseStudyLayout` layout plus nine components (`CaseStudySubNav`, `CaseStudyIntro`, `SectionHeading`, `FindingBlock`, `ProcessStrip`, `Pill`, `CircleArrow`, `DefinitionTip`, `ReadMoreSection`). Every one of them was named and scoped in the "Worth building as components" list below before CS1 existed, and nothing in that list turned out to be a component that shouldn't have been built. The deltas were all small prop additions discovered while building, not structural surprises:

| Component | Predicted | What actually happened |
|---|---|---|
| `CaseStudyIntro` | eyebrow, Red title, user-type pills, lead paragraph, goal/outcome pair | Built as predicted, plus an `id?: string` prop not foreseen at design time — needed so the sub nav's first anchor (`#project-overview`) has somewhere to land, since the intro is the grid's first section (C2 in the plan's pre-flight conflict scan). |
| `SectionHeading` | eyebrow + `Title 2` + optional standfirst, needs `align` | Built as predicted, plus `level` (`h2`/`h3`) and a `titleWidth` prop not foreseen — needed once the business-problem heading's Figma title box turned out narrower than its containing block, which changes where "business problem" wraps. Without it the title fits on one line where Figma has two. |
| `ProcessStrip` | full-bleed Purple band, fiddly, identical structure every time | Built as predicted. The real surprise was defensive, not structural: without per-label measured widths, flex-shrink lets a long label collapse below its own min-content and the six-step row overflows a narrow viewport — needed a measured-width lookup table plus a safety-net `max-inline-size` cap that the original component sketch didn't anticipate. |
| `CircleArrow` | "extract when the Detailed Card is built — not before, that's its second real use" | Extracted earlier than predicted — for the Read More row's reuse of `CaseStudyCard` (`showClient`), not the Detailed Card, which still isn't built. Right call (it needed extracting), wrong predicted trigger. |
| `FindingBlock`, `Pill`, `CaseStudySubNav`, `DefinitionTip`, `ReadMoreSection` | as described below | Built exactly as predicted, no prop deltas worth noting. |

**`FindingsList` — predicted correctly.** The rule-separated statements beside the business-problem heading were predicted to need *no* component: "Build as markup in CS1; extract only if the second case study makes it awkward." That's exactly what shipped — a `.findings-list` `<ul>` with a border-bottom rule between items, as page markup in `streamlining-scoring.astro`, no component. It genuinely wasn't needed. Whether it holds at case study 2 is still an open question — one case study isn't enough data to know if the awkwardness threshold gets hit.

**The Purple band prediction was half right.** It predicted *no component* — "it is `u-bleed` plus a background and padding, i.e. a utility class... a component would be a div with a slot" — and that call was correct: the two Purple panels (Interviews, User Testing) are page-level `.panel` CSS in `streamlining-scoring.astro`, not a component. But the `u-bleed` (full-bleed) half of the prediction was wrong: measuring the actual outline geometry mid-build (Task 17) showed both panels are **inset rounded cards at 1448px**, not full-bleed at all — only the Process Strip genuinely bleeds edge to edge. That correction is recorded as D-026 (the shared `--size-inset-measure` token) and D-027. The lesson: the low-resolution reference screenshot the prediction was written from was good enough to call "componentise or not" but not good enough to call the geometry — that needed the outline's actual coordinates.

**Counts, so far — and a correction to the `SectionHeading` estimate.** `FindingBlock` was used 4 times in CS1 (`grep -c '<FindingBlock' streamlining-scoring.astro`), in line with the "~4 per case study" estimate.

`SectionHeading` the *component* was used only **3** times (Business Problem, Design, Handover) — not 5. The page has five visually equivalent headings, but the other two, Interviews ("talking to the experts") and User Testing ("Testing my work"), are hand-rolled `<h2 class="…__heading type-title-2">` elements inside their panels, not `<SectionHeading>` instances. That's a deliberate, defensible divergence, not a miss: `SectionHeading` is specifically the handwritten-eyebrow + Red `Title 2` + optional-standfirst pattern set on the page background, while the two panel headings are White `Title 2` on Purple, with no eyebrow and no standfirst — a different pattern that only shares the type class, so reusing the *class* but not the *component* is the right call, and it's what the CSS comments in `streamlining-scoring.astro` already say.

The real correction is to the estimate, not the code: "~5 section headings per case study" was counting five *visually* heading-shaped elements, but only three of them turned out to be the `SectionHeading` component — the other two belong to a distinct panel-heading pattern. For case study 2's estimate, that means the useful number to plan component reuse against is closer to 3 `SectionHeading` instances per case study, with panel-style headings (White-on-Purple, no eyebrow/standfirst) counted separately. Whether that second pattern is common enough across CS2–4 to be worth its own small component, or stays a one-line class reuse as here, is worth checking once CS2 is built. The totals across all four case studies (`FindingBlock` ~16, `SectionHeading` now better estimated at ~12 rather than ~20) stay unconfirmed until CS2–4 are built — CS1 alone can only confirm the per-case-study rate, not the total.

---

An analysis of the Figma **Design system** page and the four case studies on the **Work** page (both fetched 2026-09-29; see [`design-system/`](../figma/design-system/README.md) and [`work-page.md`](../figma/work-page.md)), written before building the case study pages. It answers one question: **what should become a component, and what shouldn't.**

The rule it applies is the one in `AGENTS.md`: *extract a component when markup repeats or Figma defines it as a component, not in advance.* A Figma component set is evidence, not an instruction — Cass's file also contains detached copies and drawing conveniences that shouldn't become code. The Work page is the better evidence, because it shows which components are actually *instanced* and how often.

## What case study 2 added (Standard Bank, 2026-09-30)

The second page is where "extract on second use" was tested. Counts are from `grep -c` on the two page files.

| Piece | CS1 | CS2 | What happened |
|---|---|---|---|
| `SectionHeading` | 3 | 1 | CS2 has only one eyebrow + Red heading. Its other headings are Purple (Solutions) or Light purple (panels, bands), hand-rolled `type-title-2`. **The ~12 projection across four case studies looks high;** expect 1–3 per case study |
| `FindingBlock` | 4 | 3 | The three journey rows, on Purple, needed `tone`, `columns` and `align` (D-029). Status tracker stayed page markup: it would have needed three more props |
| `LabelledFindings` | via `FindingBlock` | 6 direct + 3 via `FindingBlock` | Extracted from `FindingBlock`: the label/body list recurs outside it in every Solutions section |
| `FindingsList` | 1 | 1 | Extracted, as predicted, at its second use |
| `.panel` | 2 | 2 | A global utility, not a component. Confirmed: the heading sits differently in all four |
| `CaseStudyFigure` | 0 | 6 | New: screenshot + handwritten caption |

**Stayed page markup:** persona cards (CS4's are a different shape), CS2's two full-bleed bands (Purple journey, White reviewing), the Easier Data Capture layout, and the business-problem grid. The grid is now duplicated in both pages, so extract it at a third use.

**The "full-bleed Purple panel" section type is really two things.** CS1 only had inset panels, but CS2 has both inset panels (`.panel`) and genuinely full-bleed bands (`u-bleed` + background), in Purple and White. Check the outline's x and width before deciding which (D-026).

## Layout gotchas

- **`display` on a `[popover]` element overrides the closed-popover hiding.** Browsers hide closed popovers with a user-agent `[popover]:not(:popover-open) { display: none }`; any author `display` beats it, so the popover renders permanently in the flow. Set `display` only under `:popover-open`, or not at all (an open popover is `position: fixed`, which already blockifies it). Check the built CSS for an unguarded `display` on any popover class.
- **Auto inline margins stop a grid item stretching.** `.panel` (`margin-inline: auto` + `max-inline-size`) shrank to its content as a `.case-study` grid item, so CS1's user-testing panel rendered 970px wide for most of its life. It now has `inline-size: 100%`. Any capped, centred grid child needs the same.
- **Astro drops the space between an inline element and a text node on the next line.** `<strong>…</strong>` followed by a newline and text renders with no space ("documentationand"). Put `{' '}` after the closing tag, as CS1 does.
- **`<main>` already carries the gutter unless a layout opts out.** `BaseLayout` puts `padding-inline: var(--space-gutter)` on `<main>` unless `fullBleed` is set. A page grid that adds its own gutter tracks (`.case-study`) must pass `fullBleed`, or it gets a double gutter and `u-bleed` stops short of the viewport edge. At 1920px the content track is 1700px (Figma measures 1699px).

## What Figma actually defines

| Figma component set | Variants | Already built? |
|---|---|---|
| Navigation (`20:703`) | Default, Selected, Hover, iPad, **Prototype** | Yes — `SiteNav.astro`. The Prototype variant is new and unfetched. |
| Sub Nav (`185:2566`) | Default, 02, 03, 04 | No |
| Compact Card (`4:123`) | Default, Hover | Yes — `CaseStudyCard.astro` |
| Detailed Card (`129:3554`) | Default, Variant2 (= hover) | No |
| Pills (`144:592`) | Client name, User types | No |
| Button_Circle Arrow (`4:137`) | Default, Hover | Inline inside `CaseStudyCard.astro` |
| Definition Tip (`99:2845`) | — | No |
| Icons (`144:1321`) | 6 avatar symbols | No |
| Flower, Rectangle, Arrow_01–03 | symbols | Flower yes (asset); Rectangle as CSS; arrows unused so far |

Plus two things that **repeat but are not components** in Figma: the Read More card (a detached copy, used 3×) and the case study section heading (a component, but more often drawn in place).

## What the case studies are actually made of

The four case studies ([work-page.md](../figma/work-page.md)) instance the Navigation, Sub Nav, Intro, Read More and `Arrow_01` components, then build everything between them from a **repeating vocabulary of section types** whose order and content differ per case study:

| Section type | Roughly how often | Notes |
|---|---|---|
| **Image + problem/solution/outcome block** | ~4 per case study, **~16 total** | The most repeated thing on the site. A screenshot on one side; on the other a small heading plus labelled paragraphs (`problem`, `solution`, `outcome`, sometimes `insight`, `design decision`, `reflection`) — label in Red, body in Purple. |
| **Section heading** | ~5 per case study, **~20 total** | Handwritten article + large Red two-line heading + optional standfirst. |
| **Full-bleed Purple panel** | 2–4 per case study | Heading plus body, often with an image or pull quote. |
| **Process strip** | 1 per case study, **4 total** | Full-bleed Purple band, 5–6 labelled steps joined by hand-drawn arrows. |
| **Findings list** | 1–2 per case study | Short statements separated by thin rules, set beside a section heading. |
| **Persona cards** | 3-up, in 2 of 4 case studies | Avatar, name, `goals` and `pain points` lists. |
| **Handwritten annotation** | scattered | A short La Belle Aurore caption under an image. |

**This is the finding that matters.** The case studies don't share a *sequence* — they share a *vocabulary*. CS2 runs business problem → step-by-step → personas → user journey → three feature blocks; CS4 runs business problem → competitor research → proto-personas → user journeys → six feature blocks. Same parts, different order and different counts.

That is the shape of a **toolkit**, not a template, and it's direct evidence for how to answer Q-015.

## The card family — the one decision that matters

Three card shapes exist, and they have drifted apart:

| | Compact (`4:123`) | Detailed (`129:3554`) | Read More (`88:583`) |
|---|---|---|---|
| Width / padding / gap | 343 / 30 / 22 | 405 / 32 / 24 | 448 / 30 / 22 |
| Client pill | — | yes | yes |
| Work thumbnail | — | yes | — |
| Skills type | Inter Bold 12 | Inter Bold 12 | **Roboto Bold 15** |
| Summary colour | Grey `#6b6b6b` | Grey `#6b6b6b` | **`rgba(0,0,0,0.58)`** |
| Hover state | yes | yes | **none drawn** |

Strip the drift and all three are **one skeleton with two optional slots**:

```
[ pill? ]
title
skills
[ thumbnail? ]
summary
arrow (bottom-right)
```

**Recommendation: one `CaseStudyCard.astro`, extended — not two or three components.** Add an optional `client` (renders the pill) and an optional `thumbnail` (renders the image frame). The existing hover behaviour, the stretched title link, the skills list and the focus handling all carry over unchanged.

**Leave width out of the component.** The three widths are a property of where the card sits — a home page row, a Work page grid, an end-of-page related row — not of the card. Let the card fill its grid track and drop `--size-card-width` from the component into the layouts. This is what stops three "variants" from existing at all.

The 12px-vs-15px skills and the two summary colours are almost certainly stale, since the Read More cards are detached copies that predate the caption font change ([design-tokens](design-tokens.md)). **Confirm before building both** (Q-014) — otherwise we implement a bug faithfully.

## Worth building as components

- **`Pill.astro`** — a real Figma component, two colourways (`client`: Purple/White; `userType`: Light purple/Purple + a 24px avatar icon), used on the detailed card, the Read More cards and the case study intro. Small, repeated, well specified. Note the detailed card's *hover* pill is a third colourway (Light purple bg, Purple text, no icon) applied as a local override — a third value of the same prop, not a third component.
- **`FindingBlock.astro`** (name to be bikeshedded) — the image + `problem`/`solution`/`outcome` block, **~16 uses across the four case studies**. The clearest win on the whole site, and it wasn't visible from the design system page alone. Needs: an image, a heading, a side (image left or right), and a list of label/body pairs, since the labels vary (`insight`, `design decision`, `reflection`).
- **`SectionHeading.astro`** — the handwritten eyebrow + `Title 2` heading in Red + optional standfirst, from [Business Problem Heading](../figma/components/case-study-intro/business-problem-heading.md). **~20 uses.** Needs an alignment prop: it appears right-aligned in CS1/CS2 and left-aligned in CS4. Rebuild it in flow layout; the Figma output is all absolute insets.
- **`ProcessStrip.astro`** — the full-bleed Purple band of labelled steps joined by hand-drawn arrows. Only 4 uses, but it's fiddly (full-bleed, 5 arrow assets, variable step count) and identical in structure every time. Steps are content.
- **`SubNav.astro`** — one per case study page, and it carries real logic (a progress underline). **Its labels are content, not fixed:** CS1 shows Project Overview / Business Needs / Interviews / Design / User Testing / Handover, while CS2 and CS4 show Personas and User Journey instead of User Testing and Handover. Take the links as a prop.
- **`CircleArrow.astro`** — currently inline in `CaseStudyCard.astro`. It is the default/hover SVG pair plus a crossfade, and the detailed and Read More cards both use it. **Extract it when the detailed card is built**, not before — that is its second real use.

## Not worth componentising

- **The Goal / Outcome block** — an H2 in Red over a Body Med paragraph, separated by a 400px hairline. Two uses, both inside the Intro. Build it as part of `CaseStudyIntro`, not separately.
- **Persona cards** — three-up, but only in two of the four case studies, and CS4's "proto-personas" are a different shape from CS2's (no avatar, no goals/pain-points split). Two near-misses aren't a component. Build them per page and extract later if a third appears.
- **The full-bleed Purple panel** — tempting, at 2–4 per case study, but its contents vary wildly: a pull quote, a stat, an image, two columns. The reusable part is the *band* (full-bleed, Purple, padding), which is a layout utility class, not a component.
- **The avatar icons** — import the six SVGs as assets and pass one into `Pill`. No wrapper component.
- **Flower, Rectangle, the three hand-drawn arrows** — assets and CSS. The Rectangle is already a CSS rounded rect in the hero; the arrows are loose decoration with no home yet.
- **A generic `Card` primitive** underneath the case study card. There is exactly one card family on this site. A shared shell would be an abstraction with one implementer.
- **`DefinitionTip`** — blocked, not rejected. See below.

## What has to be decided first

These block or reshape the work above; none should be answered by an agent.

1. **Does D-013 still hold?** It says case study pages are bespoke `.astro` files with **no shared template**. Having seen all four case studies, the evidence says D-013 is *mostly right*: they share a vocabulary of section types but no common sequence, so a rigid template would fight the designs. What they do share — nav, sub nav, intro, the finding block, section headings, the process strip, the Read More row — is a toolkit. **Recommendation: keep D-013's bespoke pages, and amend it to allow shared section components.** Still the user's call (Q-015).
2. **How much content lives in the collection vs the page?** Once the sections are components, each case study page is mostly data: ~4 finding blocks, ~5 headings, a process strip, personas. That could stay as markup in a bespoke `.astro` file (D-013's spirit) or move into the content collection. This is the real design decision under Q-015, and it decides how much of the case study text an agent can edit safely.
3. **How interactive are these pages?** Two components break the no-client-JS default (invariant 3):
   - the **sub nav's progress underline**, which sweeps left to right with scroll position;
   - the **Definition Tip**, whose popup is drawn but whose trigger and open/close behaviour are not.

   Both are answerable with a little JS or degraded to CSS-only (a static `aria-current`; a `<details>` or native `title`), and the choice changes whether they are components or islands (Q-016).
4. **The content model grows.** The `caseStudies` collection currently has `title`, `skills`, `summary`, `order`. The designs also need a **client name** (the pill), **user types** (icon + label pairs), a **thumbnail**, **sub nav links** (per case study), and per-section body content. Figma has a **fourth** case study — TRANSEARCH, "designing an interactive workbook" — that isn't in `case-studies.json`.
6. **Images are the bulk of these pages.** The case studies are 6003–9337px tall at 1920 wide and mostly product screenshots. Astro image handling, sizes and lazy loading matter more here than anywhere else, and none of it is set up yet. Worth its own pass.
7. **Mobile exists but is barely designed.** There's one mobile case study frame (`99:2978`) against four desktop ones, and Q-010 (the home page below 1880px) is still open. The responsive story for a 9000px case study is undesigned.
5. **Token drift** ([tokens.md](../figma/tokens.md)): two light purples, `H1` line height changed 0.98 → 0.92, a new **La Belle Aurore** font to register, and new `Title 2` / `H2` / `Body Med` styles. The shadow effect styles Q-013 was waiting for now exist.

## Suggested order

Nothing here is a plan — it's the dependency order implied by the above.

1. Settle Q-015 (how much is template, how much is page markup). Everything else hangs off it.
2. Reconcile tokens: add the new styles and the La Belle Aurore font, fix `H1` line height, resolve the two light purples, replace the placeholder shadows.
3. Extend `CaseStudyCard` with `client` and `thumbnail`; move width to the layouts. Extract `CircleArrow` at the same time. Add the fourth case study to the collection.
4. Add `Pill`.
5. Build **one** case study end to end — Case Study 1 is the shortest and most conventional — fetching design context section by section. Let the components fall out of it rather than designing them up front.
6. Build the second case study. Only then commit to the shared component set, having seen what the first one got wrong.
7. The Definition Tip last, once Q-016 is answered.

Note that steps 5 and 6 are where the remaining Figma budget goes: the case studies have had no `get_design_context` calls yet.
