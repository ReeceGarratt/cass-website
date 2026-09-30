# Case study pages — design

- **Date:** 2026-09-29
- **Status:** Approved, ready for an implementation plan
- **Scope:** One case study end to end (Case Study 1, Absa — "streamlining scoring for multiple products"), plus the shared token, style and component layers it needs.

## Goal

Ship `/work/streamlining-scoring` as a complete, accessible, static page, and let the shared component set fall out of building it rather than designing the components up front. The other three case studies inform every component's *interface*, but only what CS1 needs gets *built*.

## Why CS1 first

It is the shortest frame (6003px vs 7400–9337px) and contains the highest-frequency blocks — intro, process strip, section headings, four finding blocks, purple panels, the Read More row — while containing none of the rare ones (personas, the detailed card's thumbnail). It exercises what we want to build and doesn't tempt us into what we don't.

CS1 is the oldest frame and draws its sub nav in place rather than instancing the component. That is a Figma-authoring difference, not a visual one. **Take the sub nav's spec from the design system component (`185:2566`), not from CS1's copy.**

## Decisions this depends on

Settled during brainstorming (2026-09-29); each becomes a `D-` entry:

| Topic | Decision | Resolves |
|---|---|---|
| Content model | Bespoke `.astro` page per case study, composing section components. Prose lives in the markup. Revisit a data-driven model post-MVP. | Q-015 (amends D-013) |
| Interactivity | Popover API for the Definition Tip; small vanilla module script for the sub nav progress. No scroll-driven CSS, no UI framework. | Q-016 |
| Style layer | Semantic type classes (one per Figma text style) plus a numeric spacing scale, in `global.css`. | — |
| Fonts | **Inter only.** Roboto retired (Cass's ruling, 2026-09-29). La Belle Aurore retained as the decorative handwritten face. | Q-014 (font) |
| Card unification | One card component for the home row and the Read More row. The Read More cards' other two drifts follow from that — Grey `#6b6b6b` summary rather than `rgba(0,0,0,0.58)`, and they **gain** the hover state Figma doesn't draw for them. | Q-014 (rest) |
| Light purple | `#c4cdf4` is correct; `#C1CBFF` treated as a Figma mistake this pass. | — |
| Shadows | Use Figma's `Portfolio Drop` and `Portfolio Card drop` effect styles. | Q-013 (Figma half) |
| `H1` line height | Take Figma's 0.92, replacing 0.98. Confirmed correct against the current home page frame. | — |
| `/work` index | Out of scope; the route keeps 404ing and is tracked. | new question |
| Images | In-repo under `src/assets/` for MVP, downscaled before committing. | Q-018 (MVP only) |

## Architecture

### Routing

`src/pages/work/streamlining-scoring.astro` — matches the existing `caseStudies` collection id and the `/work/<id>` link `CaseStudyCard` already emits. `/work` itself stays a 404 for now.

### Layering

```
BaseLayout.astro              existing — html/head, skip link, SiteNav, <main>
  └─ CaseStudyLayout.astro    new — page grid, sub nav, <h1>, Read More row
       └─ page content        bespoke composition of section components
```

`CaseStudyLayout` takes the collection entry and the sub nav links, renders the chrome every case study shares, and `<slot />`s the body. It owns the grid, so pages are pure composition:

```astro
<CaseStudyLayout entry={entry} subNav={subNav}>
  <CaseStudyIntro ... />
  <ProcessStrip class="u-bleed" steps={[...]} />
  <SectionHeading eyebrow="the" title="business problem" align="end" />
  ...
</CaseStudyLayout>
```

The sub nav, `<h1>` and Read More row are identical across all four case studies, and the sub nav carries the JS — hand-copying that into four files is where inconsistency would creep in. Everything *between* them stays bespoke, which is D-013's intent.

### Layout system: default to content, opt out to bleed

A named grid on the layout, with sections constrained by default:

```css
.case-study {
  display: grid;
  grid-template-columns:
    [full-start] var(--space-gutter)
    [content-start] 1fr [content-end]
    var(--space-gutter) [full-end];
}
.case-study > *        { grid-column: content; }
.case-study > .u-bleed { grid-column: full; }
```

Chosen for its **failure mode**: forgetting a class yields a correctly constrained section, and the only possible mistake is a band that should have bled and didn't — visible and harmless. The opt-in alternative fails the other way, silently breaking the layout.

Full-bleed purple bands work natively here, with no `100vw` negative-margin trick and so no horizontal overflow when a scrollbar is present.

**Constraint:** `> *` places *direct children only*. A section component's root element must be a direct child of the grid; it cannot be wrapped in a stray `<div>` without losing its placement.

**Open:** whether body copy needs a narrower measure than images. If so, add a third `text` track inside `content`. Check against the frames during implementation before committing to two tracks or three.

### Data flow

The `caseStudies` collection stays the source for card-level metadata, so the same entry drives both a case study's card and its page.

- **Added:** `client` (the pill on Read More cards), and a fourth entry for TRANSEARCH ("designing an interactive workbook").
- **Not added:** `thumbnail` — nothing in scope uses it.
- **Stays in the page file:** `subNav` links. A case study's section structure belongs with its markup, and the labels differ per case study.

## Components

Built for CS1; props designed against all four frames.

### New

| Component | CS1 uses | All 4 | Notes |
|---|---|---|---|
| `CaseStudySubNav` | 1 | 4 | Carries the JS. Links are a prop — labels differ per case study (CS1 shows User Testing/Handover; CS2 and CS4 show Personas/User Journey) |
| `CaseStudyIntro` | 1 | 4 | Eyebrow, Red title, user-type pills, lead paragraph, and the goal/outcome pair with its hairline rule. The goal/outcome block is *part of* this, not separate |
| `SectionHeading` | 4 | ~20 | Handwritten article + Red `Title 2` + optional standfirst. Needs `align: 'start' \| 'end'` — `end` in CS1/CS2, `start` in CS4. Rebuild in flow layout; Figma's output is all absolute insets |
| `FindingBlock` | 4 | ~16 | Image plus labelled paragraphs. **Labels are data, not fixed slots** — CS1 alone uses `problem`/`solution`/`outcome` and `problem`/`design decision`/`outcome`; other frames add `insight` and `reflection`. Needs `side` for image left/right |
| `ProcessStrip` | 1 | 4 | Full-bleed Purple band, six steps joined by five hand-drawn arrows. Steps are content |
| `Pill` | 1 direct, 3 via cards | many | Two colourways (`client`: Purple/White; `userType`: Light purple/Purple + 24px avatar icon) |
| `CircleArrow` | 3 via cards | many | Extracted from `CaseStudyCard`; this is its second real use |
| `DefinitionTip` | 1 | unknown | Popover API. The only confirmed trigger anywhere is "Absa" in the lead paragraph. Four `Definition Tip` instances float on the Work page canvas beside the case studies, unplaced — so roughly one per case study, but where each attaches is undesigned |
| `ReadMoreSection` | 1 | 4 | "Other case studies" heading in `Title 1` + three cards, filtered to exclude the current entry |

### Changed

`CaseStudyCard` gains an optional `client` prop, and **loses its fixed width to the layout** — the home row and the Read More row use different widths for the same card. This is what prevents three "card variants" existing at all.

Three deliberate divergences from the Read More cards as drawn, all following from using one card component. Invariant 6 says Figma wins unless a decision says otherwise, so these are recorded rather than silent:

| Figma draws | We build | Why |
|---|---|---|
| Roboto Bold 15px skills | Inter Bold 12px | Cass's ruling: Inter only |
| `rgba(0,0,0,0.58)` summary | Grey `#6b6b6b` | Matches the maintained card components; the 58% black is a leftover |
| No hover state | Hover state, as the other cards | They are links to case studies; giving them no affordance when the identical card elsewhere has one would be worse than diverging |

Flag all three to Cass so the Figma copies can be updated.

### Deliberately not built

- **Thumbnail slot** — no surface in scope uses it.
- **Persona cards** — CS1 has none; CS2's and CS4's are different shapes.
- **Purple band as a component** — it is `u-bleed` plus a background and padding, i.e. a utility class. Contents differ every time (pull quote, stat, two columns), so a component would be a div with a slot.
- **`FindingsList`** — the rule-separated statements beside a section heading. Appears in all four but is a `<ul>` with a border. Build as markup in CS1; extract only if the second case study makes it awkward.

## Token and style layer

### Fonts

Add **La Belle Aurore** (Regular) to `astro.config.mjs` alongside Inter, via the same Fonts API + fontsource provider (D-015). It appears above the fold in the intro, so it gets `preload` like Inter.

### Type classes

One class per Figma text style, in `global.css`. Each sets only family/size/weight/line-height/letter-spacing — **colour stays with the component**, because the same style appears in Red, Purple, Black and White depending on context. The raw custom properties stay for cases needing one value rather than the bundle.

| Class | Figma style | Value |
|---|---|---|
| `.type-title` | Title | Inter Black, fluid 72→100px / 0.98 — existing hero, unchanged |
| `.type-title-1` | Title 1 | Inter Black 50 / 48px / −4% |
| `.type-title-2` | Title 2 | Inter Black 45 / 1.0 / −2% |
| `.type-subtitle` | Sub Title | Inter Regular 20 / 27px / −4% |
| `.type-h1` | H1 | Inter Bold 30 / **0.92** / −2% |
| `.type-h2` | H2 | Inter Bold 20 / 1.12 / **0** |
| `.type-body` | Body Reg | Inter Regular 16 / 1.48 / −1.1% |
| `.type-body-med` | Body Med | Inter Medium 16 / 1.48 / −1.1% |
| `.type-caption` | Caption Text | Inter Regular 12 / 1.5 / −1.1% |
| `.type-handwritten` | Hand written | La Belle Aurore 28 / 1.11 / −2% |

**Note:** Figma's `Caption Text` is Regular 400, but the card skills render Inter **Bold** 12. Components may override weight on top of the class; don't add a second caption class for it.

### Spacing scale

Numeric, where the number is the px value: `--space-8` = `0.5rem`, `--space-16` = `1rem`, through 24 / 32 / 40 / 48 / 56 / 64 / 96. Self-documenting against Figma measurements.

Figma's two real spacing variables alias onto it so the link stays traceable:

- `Headings & Body` (16) → `--space-16`
- `Sub-Sub Sections` (48) → `--space-48`

Genuine one-offs — the 110px gutter, the 30px card padding — keep their existing named tokens rather than being forced into the scale.

### Colour and effects

- Add `--color-light-grey: #e7e6e6` (now a Figma variable).
- `--color-black` becomes a Figma-backed variable rather than a noted hard-coded fill.
- Replace the placeholder `--shadow-card` with `Portfolio Drop`: `0 1px 3px 1px #0000000D, 0 1px 2px 0 #0000001A`.
- Add `--shadow-card-warm` from `Portfolio Card drop`: `-1px 3px 3.5px 1px #F5EFE6AB`.
- `--duration-hover` and `--ease-hover` **stay placeholders** — Figma still defines no motion.

### Knock-on: the `H1` change

Tightening `H1` from 0.98 to 0.92 changes the **existing home page**. `tokens.css` carries measured values that depend on it — `--size-card-title-height` (83px, "fixed in Figma so captions align") and `--size-card-title-width` (tuned to 264px so card 3 wraps like Figma). Card heights and wrapping may shift.

The value is confirmed correct against the current Figma frame, so we take it — but **re-verifying the home page against Figma is part of this work**, not a free change.

## Progressive enhancement

Both behaviours ship complete HTML first. Scripts are module scripts inside the `.astro` components; Astro bundles and defers them, so they attach after paint. Total JS across both: well under 2KB, no dependencies.

### Sub nav progress

Static HTML is a `<nav>` with an "All projects" back link and six in-page anchors. The underline is one element whose width is driven by a custom property.

An `IntersectionObserver` (`rootMargin: '0px 0px -80% 0px'`) marks the section crossing the top fifth of the viewport as current, sets `--progress` to the distance from the first link's left edge to that link's right edge, and sets `aria-current="true"` on it. CSS transitions the width and snaps instead under `prefers-reduced-motion`.

**Without JS:** anchors work, the underline sits at its start position, nothing looks broken.

**Assumption to verify:** the sub nav is **sticky** under the main nav. A progress indicator is meaningless otherwise, but Figma can't show stickiness and nothing states it. If it turns out not to be sticky, drop the growing underline and just mark the current section. Sticky also means anchors need `scroll-margin-top` so headings don't land under the bar.

### Definition Tip

```html
<button popovertarget="def-absa" class="definition-trigger">Absa</button>
<div popover id="def-absa" class="definition-tip">…</div>
```

Opening, closing, Escape, light dismiss, top-layer stacking and focus handling are all native. The one gap is position: popovers render in the top layer and can't be positioned by an ancestor. CSS anchor positioning is the clean fix but its cross-browser support isn't certain enough to depend on, and two code paths for one effect was explicitly rejected — so ~8 lines on `beforetoggle` position the bubble under the word.

**Without JS:** the popover **still opens and closes**, because `popovertarget` is declarative. It appears centred in the viewport rather than anchored to the word, which is an acceptable fallback.

### Not using JS for

Smooth scrolling (`scroll-behavior: smooth` inside a reduced-motion guard), image loading (native `loading="lazy"`), card hover states (CSS, as now).

## Content and assets

### Fetching

Section by section on the CS1 frame (`53:156`), per the Phase 2 workflow: `get_metadata` for section node IDs, then `get_design_context` per section, then `download_assets` batched. **Estimate ~15 calls**, inside the daily 200. This is the first real measurement of what a content page costs — update the budget in `wiki/figma-mcp.md` afterwards.

Everything fetched is saved unedited to `docs/figma/case-study-1-desktop/context.md` (D-008), so a rebuild never re-fetches.

### Images

`download_assets` returns `rawImages` — the original uploads, not re-renders. They land in `src/assets/case-studies/streamlining-scoring/` and go through Astro's `<Image>` for AVIF/WebP, `srcset` and intrinsic dimensions against layout shift. **Downscale before committing**; git history is permanent and Q-018 may move them off-repo later.

### Alt text

These are dense product UI screenshots. Accessibility is a stated requirement (invariant 5), and alt text can be drafted from the surrounding copy — but what each image is meant to *demonstrate* is Cass's intent, not something to infer. **Draft it and mark it for review**; do not present it as finished.

## Verification

Beyond `npm run build`, `npm run check` and `npm run format:check`:

- **Visual** — dev server against `docs/figma/case-study-1-desktop/screenshot.png`, **plus a re-check of the home page** after the `H1` change.
- **Keyboard** — focus order through sub nav and cards; visible focus; popover opens on Enter/Space, Escape closes, focus returns to the trigger.
- **No-JS** — scripts disabled: page renders fully, anchors navigate, popover still opens (centred), underline sits at its start position.
- **Reduced motion** — no smooth scroll, no underline animation.
- **Contrast** — **measure, don't assume.** Red `#CD2B2B` on Off-white `#f8f9ff` appears to land near 4.9:1: passes AA for body text, but not by much. The small Red `problem` / `solution` / `outcome` labels are the case to check. If it fails, that's a question for Cass, not a silent change.

Automated accessibility and Lighthouse checks stay out of scope — Q-006 is still open, and adding a test stack mid-feature would widen this considerably.

## Risks and open items

| Risk | Handling |
|---|---|
| **Client work is publicly deployed.** Absa, Standard Bank, MiX Telematics and TRANSEARCH screenshots go to a public GitHub Pages preview (D-019). Q-009 lists NDA status as open. | **Needs a call before publishing**, not before building. Flagged to the user 2026-09-29. |
| Sub nav stickiness is an assumption | Verify early; the progress underline depends on it |
| `H1` change may shift home page card wrapping | Re-verify the home page as part of this work |
| Red-on-off-white contrast may be marginal | Measure during verification |
| Repo size as images land | In-repo for MVP with downscaling; Q-018 decides long term |
| Body copy measure may need a third grid track | Check against the frames during implementation |

## Out of scope

- The `/work` index route.
- Mobile and responsive polish. Build fluid and don't actively fight responsiveness, but mobile is a later task: "basic, readable, responsive where possible, outliers case by case."
- Case studies 2–4.
- The Detailed Card and its thumbnail.
- Automated accessibility and performance testing (Q-006).
- A token pipeline (Q-005) — `tokens.css` stays hand-written.
