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
