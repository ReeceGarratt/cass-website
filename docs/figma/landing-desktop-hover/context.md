---
frame: Landing (hover state), desktop
node_id: "4:489"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=4-489
fetched: 2026-09-16
tools: [get_metadata, get_screenshot, get_variable_defs, get_design_context]
screenshot: screenshot.png
---

**This frame has the correct layout values** (user, 2026-09-16): where the default frame [`1:79`](../landing-desktop/) differs in anything other than hover styling, use this one.

## Outline

See [outline-landing-page.md](../outline-landing-page.md), node `4:489`. Children: Content `4:490` (Titles `4:491`, Case Studies `4:496`) and the Navigation instance `4:500`.

## Section: Content (node 4:490)

`get_design_context`, screenshot excluded. The short-lived asset URL is replaced with `<asset-url>`. The `Flower`, `ArrowUpward` and `CaseStudyCard` helper functions at the top were **byte-for-byte the same** as in [components/case-study-card/context.md](../components/case-study-card/context.md), so they're elided here and marked `/* … */`. Everything else is unedited.

```tsx
const assetPathPrefix = "<asset-url>";
const imgFlower = `${assetPathPrefix}/006f6.svg`;
const imgProperty1Default = `${assetPathPrefix}/6a12f.svg`;
const imgProperty1Hover = `${assetPathPrefix}/f9b7f.svg`;
const imgVector12 = `${assetPathPrefix}/4cf9b.svg`;
const imgVector11 = `${assetPathPrefix}/d3d20.svg`;

/* … Flower, ArrowUpward, CaseStudyCard: identical to components/case-study-card/context.md … */

export default function Content() {
  return (
    <div className="contents relative size-full" data-node-id="4:490" data-name="Content">
      <div className="absolute contents left-[110px] top-[565px]" data-node-id="4:491" data-name="Titles">
        <div className="absolute flex h-[295.183px] items-center justify-center left-[110px] top-[565px] w-[655.298px]" data-node-id="4:492">
          <div className="flex-none rotate-[0.1deg]">
            <div className="[word-break:break-word] font-['Inter:Black'] font-black leading-[0] not-italic relative text-[100px] text-black tracking-[-4px] w-[654.768px] whitespace-pre-wrap">
              <p className="leading-[98px] mb-0">{`      effective & `}</p>
              <p className="leading-[98px] mb-0">{`empathetic `}</p>
              <p className="leading-[98px]">design</p>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[108.799px] items-center justify-center left-[490.95px] top-[788px] w-[442.174px]" data-node-id="4:493">
          <div className="flex-none rotate-[0.1deg]">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative text-[0px] text-[color:var(--purple,#4832a1)] tracking-[-0.8px] w-[441.979px]">
              <span className="leading-[27px] text-[#4832a1] text-[20px]">{`I am a proactive designer with a passion for `}</span>
              <span className="font-['Inter:Bold'] font-bold leading-[27px] text-[#4832a1] text-[20px]">inclusive technology</span>
              <span className="leading-[27px] text-[#4832a1] text-[20px]">{` and `}</span>
              <span className="font-['Inter:Bold'] font-bold leading-[27px] text-[#4832a1] text-[20px]">user advocacy</span>
              <span className="leading-[27px] text-[#4832a1] text-[20px]">. I create intuitive, user-centred designs that solve real problems and delight users.</span>
            </p>
          </div>
        </div>
        <Flower className="absolute left-[110px] size-[90px] top-[571px]" />
        <div className="absolute bg-[#4832a1] h-[72px] left-[660px] rounded-[54px] top-[683px] w-[269px]" data-node-id="4:495" />
      </div>
      <div className="absolute content-stretch flex gap-[15px] items-center left-[751px] top-[276px]" data-node-id="4:496" data-name="Case Studies">
        <CaseStudyCard className="bg-[var(--purple,#4832a1)] content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] shrink-0" property1="Variant2" />
        <div className="bg-white content-stretch flex flex-col gap-[22px] h-[373px] items-start p-[30px] relative rounded-[25px] shrink-0" data-node-id="4:498" data-name="Case study Card">
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[83px] leading-[0] not-italic relative shrink-0 text-[30px] text-[color:var(--purple,#4832a1)] tracking-[-0.6px] w-[272px]" data-node-id="I4:498;4:55">
            <p className="leading-[0.98] mb-0">Consolidating</p>
            <p className="leading-[0.98]">import collections</p>
          </div>
          <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-[color:var(--purple,#4832a1)] tracking-[-0.132px] w-[283px] whitespace-pre-wrap" data-node-id="I4:498;4:423" style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  |  Workshops  |  Usability Testing`}</p>
          <div className="h-[96px] relative shrink-0 w-[283px]" data-node-id="I4:498;4:471" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[color:var(--grey,#6b6b6b)] top-0 tracking-[-0.176px] w-[283px]" data-node-id="I4:498;4:63">
              An interface replacing a five-platform and paper-heavy capture process with one cohesive, trackable journey.
            </p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[278px]" data-node-id="I4:498;4:103" data-name="Arrow">
            <ArrowUpward className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] shrink-0" data-node-id="4:499" data-name="Case study Card">
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[83px] leading-[0] not-italic relative shrink-0 text-[30px] text-[color:var(--purple,#4832a1)] tracking-[-0.6px] w-[272px] whitespace-pre-wrap" data-node-id="I4:499;4:55">
            <p className="leading-[0.98] mb-0">{`Using research to build a better `}</p>
            <p className="leading-[0.98]">sales workflow</p>
          </div>
          <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-[color:var(--purple,#4832a1)] tracking-[-0.132px] w-[283px] whitespace-pre-wrap" data-node-id="I4:499;4:423" style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  |  Workshops  |  Journey Mapping`}</p>
          <div className="h-[96px] relative shrink-0 w-[283px]" data-node-id="I4:499;4:471" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[color:var(--grey,#6b6b6b)] top-0 tracking-[-0.176px] w-[283px]" data-node-id="I4:499;4:63">{`A research-based review and journey redesign of the sales platform's workflow, cutting it from 22 steps to 14 steps.`}</p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[278px]" data-node-id="I4:499;4:103" data-name="Arrow">
            <ArrowUpward className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Trailing tool text (summary): convert to the project's stack, don't install Tailwind; node IDs are added as data attributes; styles in the design: Title, Sub Title, Red, Purple, H1, Caption Text, Body copy, White (values as in [tokens.md](../tokens.md)); image assets expire after 7 days.

## Notes

- **No annotations** on the content section. The only annotations found so far are on the Navigation set.
- **Page:** 1920×1080 frame with an Off-white background (from the screenshot; `get_design_context` doesn't say). Content sits 110px in from both sides, so it spans 1700px.
- **Everything is absolutely positioned in Figma.** Rebuild the layout with flow and grid, matching the positions at 1920px:
  - **Card row:** top 276, left 751, three 343×373 cards with a 15px gap, ending at the right margin (1810).
  - **Headline block:** top 565, left 110.
- **Headline ("Title" style):** Inter Black 100px, line height 98px, letter spacing −4px (−4%), colour **black `#000`**, which isn't a variable (maybe one of the unaccounted palette colours; see [tokens.md](../tokens.md)). The first line's leading spaces (`      effective & `) leave room for the 90px **Flower** at (110, 571). Build that as a real inline or positioned element, not spaces.
- **Purple pill** `4:495`: 269×72, radius 54, Purple, at (660, 683), next to "empathetic". Decorative.
- **Intro paragraph ("Sub Title" style):** Inter Regular 20px, line height 27px, letter spacing −0.8px (−4%), Purple. "inclusive technology" and "user advocacy" are Bold. Width 442, at (491, 788).
- **Card copy (all three):**
  1. "Streamlining scoring for multiple products" · `User Research | Process Design | Systems Thinking` · "A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call."
  2. "Consolidating import collections" · `User Research | Workshops | Usability Testing` · "An interface replacing a five-platform and paper-heavy capture process with one cohesive, trackable journey."
  3. "Using research to build a better sales workflow" · `User Research | Workshops | Journey Mapping` · "A research-based review and journey redesign of the sales platform's workflow, cutting it from 22 steps to 14 steps."
- **Card links:** not in the design. Case study pages don't exist yet.
