---
summary: What the Design system page defines, which of it is worth building as a component, and what has to be decided first.
updated: 2026-09-29
related: [design-tokens.md, figma-mcp.md, index.md]
decisions: [D-013, D-002, Q-005, Q-013, Q-014, Q-015, Q-016, Q-017]
---

# Componentisation

An analysis of the Figma **Design system** page and the four case studies on the **Work** page (both fetched 2026-09-29; see [`design-system/`](../figma/design-system/README.md) and [`work-page.md`](../figma/work-page.md)), written before building the case study pages. It answers one question: **what should become a component, and what shouldn't.**

The rule it applies is the one in `AGENTS.md`: *extract a component when markup repeats or Figma defines it as a component, not in advance.* A Figma component set is evidence, not an instruction — Cass's file also contains detached copies and drawing conveniences that shouldn't become code. The Work page is the better evidence, because it shows which components are actually *instanced* and how often.

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
