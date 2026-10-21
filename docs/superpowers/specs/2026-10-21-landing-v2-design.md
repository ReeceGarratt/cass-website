# Landing v2 (stream `landing`): design

Stream 3A of the [2026-10-20 macro plan](../plans/2026-10-20-macro-plan.md). It rebuilds the home page from Figma `267:1855` (D-051), adds Resume back to the nav and standardises the copy tick. Agreed with Reece on 2026-10-21 in a brainstorm.

- **Branch / worktree:** `reece/feature/landing-v2`, `../cass-website-landing`, based on `main`.
- **Sources:** [`docs/figma/landing-v2-desktop/`](../../figma/landing-v2-desktop/context.md) (the frame, its sections and its assets) and [`docs/figma/components/`](../../figma/components/) (nav, detailed card). No Figma calls: only `cs4` calls Figma (macro plan, phase 3).
- **Conventions:** [wiki/parallel-streams.md](../../wiki/parallel-streams.md): temporary `Q-<stream>-n` / `D-<stream>-n` IDs, a labelled token block, and the finishing steps before the PR. This stream finishes **last** (`fixes`, then `cs4`, then `landing`).

## Reece's clarifications (2026-10-21)

| Topic | Answer |
|---|---|
| Frames | `267:1855` is the page. `272:2302` is the email pill's copied state. The client band (`272:2308` in the copied-state frame, `267:1887` in the main frame) is an animated carousel |
| Nav | Reuse phase 2's two variants (`purple`, `white`). Hover and selected states stay as they are, in each variant's colours |
| Images | In the repo for now. Off-repo hosting (Q-018) is a later task |
| Fourth card | At first a layout placeholder while `cs4` updated the copy. `cs4` merged (PR #10) before the plan was written, so all four cards render real `case-studies.json` data (D-052) |
| Card count | Four. It shows that there are more than three case studies |
| Resume | Keep it in the nav. It will link to a document in a later task, which may be hosted off-site so it can change without a deploy |
| Small screens | Minimal effort. Mobile designs arrive in the next few days |

## Page structure

[`src/pages/index.astro`](../../../src/pages/index.astro) is rebuilt, top to bottom. It keeps `BaseLayout` with `navVariant="white"`.

| Section | Figma | Built as | Headings |
|---|---|---|---|
| Hero | `267:1857` | Inline. The headline is Inter Black 140px in Black: "effective & / empathetic / design". The Flower (106px) sits in line 1's indent, with the curved "open to work" SVG over it. The Purple pill (319 × 97) ends line 3. Then the intro sentence (Sub Title, with "ux/ui designer", "inclusive technology" and "user advocacy" bold), then an `EmailPill` | `h1` |
| Client strip | `267:1887` | `ClientStrip.astro` (below) | none, as designed |
| Projects | `267:1902` | Inline. The heading "some of my favourite projects", with "favourite" and its caret as live La Belle Aurore text, so the heading reads as one string. Then four detailed cards in one row at 1920px | `h2`; card titles `h3` |
| About | `282:917` | Inline. A Light purple band: the heading and statement on the left, and three principles with 18%-opacity Purple dividers on the right. Build from the text, not the stale layer names | `h2`; principles `h3` |
| Contact | `267:1938` | Inline. "let's make something meaningful." (Title 1, Purple, centred), an `EmailPill`, and a decorative 66px Flower | `h2` |

There's no footer.

**Accessibility notes:**
- The curved "open to work" text is outlined in its SVG. The SVG is `aria-hidden`, and a visually hidden "Open to work" carries the meaning.
- Before inlining it, strip the export's background `<rect>`s and Figma layer `id`s (see [figma-mcp → usage notes](../../wiki/figma-mcp.md#usage-notes)).
- Client names are plain text. The Figma `<a>`s to `standardbank.co.za` are a copied-link artefact.

**Flower:** the export (`docs/figma/landing-v2-desktop/flower.svg`) isn't byte-identical to [`src/assets/flower.svg`](../../../src/assets/flower.svg). Compare the paths. If they're the same shape, keep the existing file. If they differ, ask Reece.

## Components

### `EmailPill.astro` (new)

Figma: "Contact pill · Email" (`267:1865`), copied state `272:2302`.

- A Light purple pill, 8px by 16px padding, 25px radius. The address is in H3 (Inter Bold 14, lowercase, Purple), with a 24px copy icon 10px after it.
- After copying, the copy icon is swapped for the tick in the same slot. Nothing else changes.
- It's a `mailto:` link with `data-copy-email`, so it uses the shared copy script, and without JS it opens the mail client.
- The address comes from one shared constant, used by the nav as well. It's still `hello@cassandragarratt.com`, which is open as Q-040.

### `ClientStrip.astro` (new)

It's used once, but it's a separate component because it's the only part of the page that reads a build variable and runs an animation.

- **Layout:** a full-bleed Purple band with 40px padding. Seven names (Cell C, Transearch, Mercedes Benz, Manhattan Iced Tea, Clover, Standard Bank, MiX Telematics) in Off-white Inter Bold 20px, with the hand-drawn separator (`separator.svg`) between them.
- **List:** one `<ul>` with `aria-label="Clients I've worked with"`.
- **Carousel (D-053):** CSS only.
  - The list renders **three times**. The second and third copies are `aria-hidden`.
  - One copy is 1646px wide, narrower than a 1920px screen, so two copies would leave a gap on every loop. Three cover screens up to about 3300px.
  - A linear, infinite `translateX` keyframe moves the track by one copy's width per loop. Each copy ends with a separator, so the join is seamless.
  - `animation-play-state: paused` on `:hover`.
  - D-053 also names `:focus-within`, but the names aren't focusable, so it never fires. The keyboard and touch gap is Q-039, already accepted.
  - Under `prefers-reduced-motion: reduce` there's no animation, the copies are hidden, and the row is static as in Figma. It wraps if it doesn't fit.
- **Speed (D-054):**
  - In the frontmatter, read `import.meta.env.PUBLIC_CLIENT_STRIP_LOOP_SECONDS`. Use it if it parses to a finite number above 0, otherwise 40.
  - Write it as `style="--client-strip-loop: <n>s"` on the strip. The CSS uses it as the `animation-duration`.
- **Workflow:** add `PUBLIC_CLIENT_STRIP_LOOP_SECONDS: ${{ vars.CLIENT_STRIP_LOOP_SECONDS }}` to the build step's `env:` in `.github/workflows/deploy-pages.yml`, next to `BASE_PATH`.
  - No stream owns that file.
  - An unset repository variable passes an empty string, which falls back to 40.
  - The Cloudflare deploy (D-009) will need the same variable.

### `CaseStudyCard.astro` (extended)

One skeleton, as [componentisation](../../wiki/componentisation.md#the-card-family--the-one-decision-that-matters) found. Reece: the Read More cards are the "minimised" card, the landing cards the "maximised" one.

- **New props:**
  - `size?: 'compact' | 'detailed'`, defaulting to `'compact'`.
  - `image?: ImageMetadata`, used only when `size` is `'detailed'`.
- **Existing uses don't change:** the current home page (being replaced) and `ReadMoreSection`. `ReadMoreSection` passes neither prop, so it renders exactly as now.
- **Detailed** (Figma `129:3554`):
  - 405px wide, 32px padding, a 24px gap, 25px radius.
  - The client `Pill` above the title (as with `showClient`).
  - A **thumbnail** between the skills and the summary: 341 × 211, 25px radius, a 1px Light grey border, clipped.
- **Hover** is Figma's `Variant2`: a Purple card, White title and summary, a Light purple pill and skills, and the Red hover arrow. Reuse the existing hover rules and add only what differs.
- **Title breaks (D-057, Reece 2026-10-21):** Figma breaks two detailed titles by hand: "consolidating / import collections" and "designing an / interactive book". Measured on 2026-10-21, no single title width reproduces all four cards: at 341px those two wrap after "import" and "interactive", and narrower widths break Absa's. So `case-studies.json` gets an optional `cardTitleBreak`: the words before the break, which must be the start of `title`. The schema fails the build if it isn't. Detailed cards break there with a `<br>`; compact cards ignore it. It's set on those two entries only. This edits `case-studies.json`, which `cs4` owned until it merged.
- **Thumbnail:** Astro `<Image>` with `alt=""`. It's decorative, because the title link names the card. Widths are 341 and 682 for 1× and 2×.

### `SiteNav.astro` (changed)

- **Resume** goes back into the utility area, on both variants, before Email me.
  - Text, then a 24px download icon, 17px apart.
  - Email me starts 140px after Resume's start. Resume is 104px wide (63px of text, the 17px gap, the 24px icon), so the gap between the two links is 36px. (An earlier draft said 77px, which measured from the end of the text only.)
  - The download icon is one SVG with `fill="currentColor"`, made from the saved purple/white exports in `docs/figma/components/navigation/`. It's hidden from screen readers.
  - It links to `RESUME_URL`, a single constant set to `withBase('/resume.pdf')`, with `download`.
  - Its accessible name is "Resume (PDF)", using a visually hidden "(PDF)".
  - A `TODO(Q-011)` comment says the file or host is still to come.
- **Until the document exists, the link 404s.** Reece accepted that.
- **About** stays out (D-049 still applies to it).
- **The copy script** moves to `src/scripts/copy-email.ts` (below). The live region (`[data-copy-status]`) stays in the nav, which is on every page.

### Shared copy script and tick

- **`CopyStateIcon.astro` (new):** the 24px slot holding the copy icon and the tick, with the swap keyed on an ancestor's `data-copied`. The nav's Email me and `EmailPill` both use it, since the markup repeats.

- **`src/scripts/copy-email.ts`:** phase 2's script, generalised from one link to every `[data-copy-email]` link.
  - Imported by `SiteNav` and `EmailPill`. Astro bundles it once.
  - **Kept from phase 2:**
    - The invariant 3 reason comment.
    - Modified clicks are left to the browser.
    - The `mailto:` fallback when the clipboard fails.
    - The 3-second copied state.
    - Clearing and re-filling the live region, so each copy is announced.
  - **Per link:** each link has its own `data-copied` and timer.
- **Tick:** [`src/assets/icons/check.svg`](../../../src/assets/icons/check.svg) is replaced with the landing tick, the Material Symbols `check` from `272:2302`.
  - That's a different glyph from phase 2's provisional one: sharp corners, not rounded.
  - Clean it to one path with `fill="currentColor"`, without the mask, the bounding box or the Figma `id`s.
  - Remove the "PROVISIONAL" comment. This closes D-048's follow-up.

## Images

- **Sources:** the staged rasters in `F:/Code/cass-website-staging/figma-2026-10-20/landing-v2/`: `card-absa.png`, `card-standard-bank.png`, `card-mix.png`, `card-transearch.png`. Their Figma URLs expire on 2026-10-27, but the files are already local.
- **Crop:** in a one-off script in the scratchpad (not committed), crop each image to the region the 341 × 211 thumbnail shows. Take the offsets and sizes from the selected work section of the snapshot (`I267:1908;129:3536` and so on), and export at 2× (about 682 × 422). Expect tens of KB each.
- **Store:** commit them as `src/assets/landing/card-<case-study-id>.png`. This is separate from `cs4`'s `src/assets/case-studies/`, so there's no path collision.
- **Map:** `index.astro` holds a map from case study id to its imported image. **If a featured case study has no entry, the build fails** with a message naming the id. That catches `cs4` renaming the TRANSEARCH id when the streams merge.
- **Featured cards:** the first four entries by `order`. `cs4` has already updated their copy (D-052), and the TRANSEARCH id is still `designing-an-interactive-workbook`.

## Tokens

- The `--hero-*` / `--size-hero-*` tokens are only used by `index.astro`. They're **replaced in place** with the new hero's values (Reece approved).
- Everything new goes in a `/* --- stream: landing --- */` block at the end of `src/styles/tokens.css`:
  - The curved text colour `#EE0E0E` (a local exception, per the style guide).
  - The detailed card sizes.
  - The strip padding, track gap and default loop.
  - The projects, about and contact spacing.
  - The 160px gap between root sections.
  - The 114px main inset.
- The block is folded into the right groups before the PR (parallel-streams, finishing step 4).
- Values come from the snapshot. None are guessed.

## Below 1920px

Minimal, because mobile designs are coming.
- The headline scales the way the current hero does.
- The card row wraps (`auto-fill`).
- The About band stacks into one column on narrow screens.
- The strip still loops.
- **Checked:** nothing overlaps and nothing scrolls sideways at 1280px and 375px. No further tuning.
- **Follow-up:** build the mobile layouts when the designs arrive. This goes in the stream's Status row.

## Docs

| Where | What |
|---|---|
| `decisions.md` | **D-055:** Resume returns to the nav, linked to `/resume.pdf` through `RESUME_URL` until the document exists. It replaces D-049's Resume clause; About stays out. **D-056:** the home page shows four detailed cards, the first four by `order`. It answers Q-019's "how many" for now. **D-057:** an optional `cardTitleBreak` in `case-studies.json` (below) |
| `questions.md` | **Q-011:** update with the interim link, and the caveat that browsers ignore `download` on links to other domains, so an off-site resume opens instead of downloading. **Q-019:** narrow it to what happens at five or more case studies, and which ones are featured then |
| `architecture.md` | `EmailPill`, `ClientStrip`, the card's `size`, `src/scripts/`, `src/assets/landing/` and the build variable |
| `wiki/componentisation.md` | The Detailed Card is now built, as `CaseStudyCard size="detailed"` |
| `wiki/github-pages.md` | The `CLIENT_STRIP_LOOP_SECONDS` repository variable: what it does, its default, and that changing it needs a redeploy |
| `test-plan.md` | The landing page's manual checks (below) |
| `wiki/log.md` | The session entry |
| Macro plan | Stream `landing`'s Status row only |

Q-012 (brand link), Q-020 (`/work` 404s) and Q-040 (email address) stay open and untouched.

## Testing

- **Checks:** `npm run build`, `npm run check` and `npm run format:check` pass.
- **Visual:** compare the page at 1920px in the dev server with `screenshot.png`, section by section. It's 1:1, so Figma coordinates crop directly. Also compare one case study page, to show the "Read more" cards and the nav haven't changed apart from Resume and the tick.
- **Keyboard:**
  - Tab order: skip link → brand → Home → Work → Resume → Email me → hero email → four card links → contact email.
  - Focus is visible on every stop, in both nav variants.
  - Enter on an email link copies it and shows the tick. The live region announces it.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the strip is static and shows one copy.
- **Build variable:** build with `PUBLIC_CLIENT_STRIP_LOOP_SECONDS=12`, then `=abc`, then unset. Check that the built HTML has `--client-strip-loop: 12s`, then `40s`, then `40s`.
- **Small screens:** at 1280px and 375px, nothing overlaps and there's no horizontal scroll.
- **Manual checks** for the deployed preview go into `docs/test-plan.md`: copying on a real phone, carousel smoothness, and the Resume link once the file exists.

## Out of scope

- Mobile and tablet layouts (designs pending).
- The resume document and where it's hosted.
- Off-repo images (Q-018).
- The `/work` index (Q-020).
- An About page or nav item.
- A pause control for the strip (Q-039).
- Card copy changes, which belong to `cs4` (D-052).
