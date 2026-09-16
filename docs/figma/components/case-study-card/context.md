---
frame: Case study Card (component set)
node_id: "4:123"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=4-123
fetched: 2026-09-16
tools: [get_metadata, get_design_context]
screenshot: not saved   # returned inline only; the hover state is visible in ../../landing-desktop-hover/screenshot.png
assets:
  - corner-bottom-left.svg        # Vector 12 (node 4:167), drawn unrotated; the design rotates it 180°
  - corner-top-right.svg          # Vector 11 (node 4:169)
  - ../arrow/arrow-default.svg    # arrow_upward Default (4:98)
  - ../arrow/arrow-hover.svg      # arrow_upward Hover (4:138): red flower with white arrow
  - ../flower/flower.svg          # Flower symbol (1:162)
---

## Outline

See [outline-landing-page.md](../../outline-landing-page.md), node `4:123`. The response also covers the `arrow_upward` set (`4:137`) and the `Flower` symbol (`1:162`), so those have no context of their own.

## Section: Case study Card component set (node 4:123)

`get_design_context`, unedited except that the short-lived asset URL is replaced with `<asset-url>`.

```tsx
const assetPathPrefix = "<asset-url>";
const imgFlower = `${assetPathPrefix}/006f6.svg`;
const imgProperty1Default = `${assetPathPrefix}/6a12f.svg`;
const imgProperty1Hover = `${assetPathPrefix}/f9b7f.svg`;
const imgVector12 = `${assetPathPrefix}/4cf9b.svg`;
const imgVector11 = `${assetPathPrefix}/d3d20.svg`;

function Flower({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[90px]"} data-node-id="1:162" data-name="Flower">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFlower} />
    </div>
  );
}

type ArrowUpwardProps = {
  className?: string;
  property1?: "Default" | "Hover";
};

function ArrowUpward({ className, property1 = "Default" }: ArrowUpwardProps) {
  const isHover = property1 === "Hover";
  return (
    <div className={className || "relative size-[50px]"} id={isHover ? "node-4_138" : "node-4_98"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isHover ? imgProperty1Hover : imgProperty1Default} />
    </div>
  );
}

type CaseStudyCardProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

export default function CaseStudyCard({ className, property1 = "Default" }: CaseStudyCardProps) {
  const isDefault = property1 === "Default";
  const isVariant2 = property1 === "Variant2";
  return (
    <div className={className || `content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] ${isVariant2 ? "bg-[var(--purple,#4832a1)]" : "bg-white"}`} id={isVariant2 ? "node-4_124" : "node-4_105"}>
      <div className={`[word-break:break-word] font-["Inter:Bold"] font-bold h-[83px] leading-[0] not-italic relative shrink-0 text-[30px] tracking-[-0.6px] w-[272px] whitespace-pre-wrap ${isVariant2 ? "text-[color:var(--off-white,#f8f9ff)]" : "text-[color:var(--purple,#4832a1)]"}`} id={isVariant2 ? "node-4_125" : "node-4_55"}>
        <p className="leading-[0.98] mb-0">{`Streamlining scoring for `}</p>
        <p className="leading-[0.98]">multiple products</p>
      </div>
      <p className={`[word-break:break-word] font-["Roboto:Bold"] font-bold leading-[1.5] relative shrink-0 text-[12px] tracking-[-0.132px] whitespace-pre-wrap ${isVariant2 ? "min-w-full text-[color:var(--white,white)] w-[min-content]" : "text-[color:var(--purple,#4832a1)] w-[283px]"}`} id={isVariant2 ? "node-4_436" : "node-4_423"} style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  |  Process Design  |  Systems Thinking`}</p>
      {isDefault && (
        <>
          <div className="h-[96px] relative shrink-0 w-[283px]" data-node-id="4:471" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[color:var(--grey,#6b6b6b)] top-0 tracking-[-0.176px] w-[283px]" data-node-id="4:63">
              A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call.
            </p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[278px]" data-node-id="4:103" data-name="Arrow">
            <ArrowUpward className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </>
      )}
      {isVariant2 && (
        <>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--off-white,#f8f9ff)] tracking-[-0.176px] w-[283px]" data-node-id="4:130">
            A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call.
          </p>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[283px]" data-node-id="4:131" data-name="Arrow">
            <ArrowUpward className="flex items-center justify-center relative shrink-0 size-[50px]" property1="Hover" />
          </div>
          <div className="absolute flex h-[28px] items-center justify-center left-[18px] top-[326.52px] w-[61px]" data-node-id="4:167">
            <div className="flex-none rotate-180">
              <div className="h-[28px] relative w-[61px]">
                <div className="absolute inset-[-5.36%_-2.46%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector12} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[37px] left-[237px] top-[18.52px] w-[85px]" data-node-id="4:169">
            <div className="absolute inset-[-4.05%_-1.76%]">
              <img alt="" className="block max-w-none size-full" src={imgVector11} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

Trailing tool text (summary): convert to the project's stack, don't install Tailwind; node IDs are added as data attributes; styles in the design: H1 (Inter Bold 30, line height 0.98, letter spacing −2), Caption Text (Roboto Regular 12, line height 1.5, letter spacing −1.1), Body copy (Inter Regular 16, line height 1.48, letter spacing −1.1), Red #CD2B2B, White #FFFFFF; image assets expire after 7 days.

## Notes

- **No annotations** on the card, arrow or flower.
- **"Variant2" is the hover state** (the user's description, and the hover frame `4:489` shows it on the first card).
- **Card:** 343×373, `padding: 30px`, column with 22px gap, radius 25. Default is White with Purple title and caption, Grey body, and the arrow on Light purple. Hover is Purple with Off-white title and body, White caption, the arrow as a red flower, and two white corner strokes (3px, round caps): top-right 85×37 at (237, 18.5), and bottom-left 61×28 at (18, 326.5), rotated 180°.
- **Letter spacing is a percentage** of the font size: H1 −2% (30px → −0.6px), Caption and Body −1.1%.
- **Caption font mismatch:** the text uses **Roboto Bold** (`font-bold`), but the "Caption Text" style says Roboto Regular. The screenshots look bold. Build it as bold and check the text style with the user.
- **Hard-coded content:** the title and body text in the component are placeholders (the "Streamlining…" copy). The real text for all three cards is visible in [landing-desktop/screenshot.png](../../landing-desktop/screenshot.png).
- **Caption separators** use two spaces on each side: `User Research  |  Process Design  |  Systems Thinking`.

## Refetch 2026-09-17 (caption font changed to Inter)

Cass changed the caption text style in Figma on 2026-09-16. Fetched again on 2026-09-17 with `get_design_context` (4:123, screenshot excluded), `get_metadata` (4:105) and `get_metadata` (4:496, the Case Studies row in the hover frame).

**`get_design_context` (4:123):** the output is identical to the section above except for the caption line and the trailing style summary. Changed line, unedited except for the `node-4_…` ids, which are unchanged:

```tsx
      <p className={`[word-break:break-word] font-["Inter:Bold"] font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] tracking-[-0.132px] whitespace-pre-wrap ${isVariant2 ? "min-w-full text-[color:var(--white,white)] w-[min-content]" : "text-[color:var(--purple,#4832a1)] w-[283px]"}`} id={isVariant2 ? "node-4_436" : "node-4_423"}>{`User Research  |  Process Design  |  Systems Thinking`}</p>
```

Trailing style summary: `Caption Text: Font(family: "Inter", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.100000023841858)` (the rest as before).

**`get_metadata` (4:105, card Default variant):**

```xml
<symbol id="4:105" name="Property 1=Default" x="20" y="20" width="343" height="391">
  <text id="4:55" name="Streamlining scoring for multiple products" x="30" y="30" width="272" height="83" />
  <text id="4:423" name="User Research | Process Design | Systems Thinking" x="30" y="135" width="283" height="36" />
  <frame id="4:339" name="Skills used" x="34" y="179" width="293" height="58" hidden="true">
    <frame id="4:56" name="Pills" x="0" y="0" width="293" height="24">
      <instance id="4:89" name="Pill" x="0" y="0" width="100" height="24" />
      <instance id="4:92" name="Pill" x="104" y="0" width="82" height="24" />
      <instance id="4:95" name="Pill" x="190" y="0" width="107" height="24" />
    </frame>
    <frame id="4:310" name="Pills" x="0" y="34" width="293" height="24">
      <instance id="4:311" name="Pill" x="0" y="0" width="100" height="24" />
      <instance id="4:312" name="Pill" x="104" y="0" width="82" height="24" />
      <instance id="4:313" name="Pill" x="190" y="0" width="107" height="24" />
    </frame>
  </frame>
  <frame id="4:471" name="Intro" x="30" y="193" width="283" height="96">
    <text id="4:63" name="A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call." x="0" y="0" width="283" height="96" />
  </frame>
  <frame id="4:103" name="Arrow" x="30" y="311" width="278" height="50.00000762939453">
    <instance id="4:99" name="arrow_upward" x="278" y="0.0000021855692011740757" width="49.99999837087228" height="50.00000600026647" />
  </frame>
</symbol>
```

**`get_metadata` (4:496, Case Studies row in Landing hover frame):**

```xml
<frame id="4:496" name="Case Studies" x="751" y="276" width="1059" height="391">
  <instance id="4:497" name="Case study Card" x="0" y="0" width="343" height="391" />
  <instance id="4:498" name="Case study Card" x="358" y="0" width="343" height="391" />
  <instance id="4:499" name="Case study Card" x="716" y="9" width="343" height="373" />
</frame>
```

### Notes (refetch)

- **Caption is now Inter Bold 12px** (the text uses `font-bold`; the "Caption Text" style still says Regular). Letter spacing −0.132px (−1.1%), line height 1.5, width 283.
- **Captions now wrap on cards 1 and 2** (caption height 36 = two lines), so those cards are **391px** tall. Card 3's caption fits on one line, so it stays **373px** and is **vertically centred** in the row (`y: 9`; the row is `items-center`, per the Case Studies context).
- The Intro and Arrow move down by 18px on the wrapping cards (Intro `y` 175 → 193, Arrow `y` 293 → 311).
- Screenshots in `landing-desktop/` and `landing-desktop-hover/` are from before this change, so their card heights are out of date.
