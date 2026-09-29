---
frame: Design system / Cards / Detailed Card
node_id: "129:3554"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=129-3554
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
variants:
  - "Property 1=Default (129:3553)"
  - "Property 1=Variant2 (129:3555)"
---

## Outline

```xml
<frame id="129:3554" name="Detailed Card" x="595" y="170" width="488" height="1354">
  <symbol id="129:3553" name="Property 1=Default" x="20" y="20" width="405" height="633" />
  <symbol id="129:3555" name="Property 1=Variant2" x="20" y="679" width="405" height="633" />
</frame>
```

## Section: Detailed Card (node 129:3554)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/43ca95f3-18f0-4e33-9ae4-271f60d2c1e8";
const imgFlower = `${assetPathPrefix}/2fc17.svg`;
const imgProperty1Default = `${assetPathPrefix}/6a12f.svg`;
const imgProperty1Hover = `${assetPathPrefix}/aeb50.svg`;
const imgScoringPageUpdatedAnonymised4 = `${assetPathPrefix}/9228a.png`;
const imgImportCollectionsProductPageTradeOfficer4 = `${assetPathPrefix}/b58ac.png`;
const imgMix = `${assetPathPrefix}/d546e.png`;
const imgTransearch = `${assetPathPrefix}/1f1f0.png`;

function Flower({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[77px]"} data-node-id="1:162" data-name="Flower">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFlower} />
    </div>
  );
}

type ButtonCircleArrowProps = {
  className?: string;
  property1?: "Default" | "Hover";
};

function ButtonCircleArrow({ className, property1 = "Default" }: ButtonCircleArrowProps) {
  const isHover = property1 === "Hover";
  return (
    <div className={className || "relative size-[50px]"} id={isHover ? "node-4_138" : "node-4_98"}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={isHover ? imgProperty1Hover : imgProperty1Default} />
    </div>
  );
}

type PillsProps = {
  className?: string;
  property1?: "Client name";
};

function Pills({ className, property1 = "Client name" }: PillsProps) {
  return (
    <div className={className || "bg-[var(--purple,#4832a1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px]"} data-node-id="30:417">
      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] whitespace-nowrap" data-node-id="30:415">
        Absa Banking
      </p>
    </div>
  );
}

type DetailedCardProps = {
  className?: string;
  property1?: "Default" | "Variant2";
};

export default function DetailedCard({ className, property1 = "Default" }: DetailedCardProps) {
  const isDefault = property1 === "Default";
  const isVariant2 = property1 === "Variant2";
  return (
    <div className={className || `content-stretch flex flex-col gap-[24px] items-start p-[32px] relative rounded-[25px] w-[405px] ${isVariant2 ? "bg-[var(--purple,#4832a1)]" : "bg-[var(--white,white)] h-[633px]"}`} id={isVariant2 ? "node-129_3555" : "node-129_3553"}>
      {isDefault && (
        <>
          <Pills className="bg-[var(--purple,#4832a1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" />
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[58px] leading-[0] lowercase min-w-full not-italic relative shrink-0 text-[30px] text-[color:var(--black,black)] tracking-[-0.6px] w-[min-content] whitespace-pre-wrap" data-node-id="129:3533">
            <p className="leading-[0.92] mb-0">{`Streamlining scoring for `}</p>
            <p className="leading-[0.92]">multiple products</p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-[color:var(--purple,#4832a1)] tracking-[-0.132px] w-[364px] whitespace-pre-wrap" data-node-id="129:3534">{`User Research  |  Process Design  |  Systems Thinking`}</p>
          <div className="border border-[var(--light-grey,#e7e6e6)] border-solid h-[211px] overflow-clip relative rounded-[25px] shrink-0 w-[341px]" data-node-id="129:3535" data-name="Work">
            <div className="absolute h-[211px] left-[-4px] rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_1px_rgba(0,0,0,0.05)] top-[-1px] w-[344px]" data-node-id="129:3536" data-name="Scoring Page_Updated_anonymised 4">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[12px] rounded-tr-[12px]">
                <img alt="" className="absolute h-[454.41%] left-[-2.64%] max-w-none top-[-88.22%] w-[138.71%]" src={imgScoringPageUpdatedAnonymised4} />
              </div>
            </div>
            <div className="absolute h-[338px] left-[-11px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_1px_rgba(0,0,0,0.05)] top-[-44px] w-[370px]" data-node-id="144:978" data-name="Import Collections - Product Page - Trade Officer 4">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImportCollectionsProductPageTradeOfficer4} />
            </div>
            <div className="absolute h-[211px] left-[-12px] rounded-[12px] shadow-[-1px_3px_3.5px_1px_rgba(245,239,230,0.67)] top-[-1px] w-[464px]" data-node-id="144:1015" data-name="MIX">
              <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                <div className="absolute bg-white inset-0 rounded-[12px]" />
                <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMix} />
                </div>
              </div>
            </div>
            <div className="absolute h-[240px] left-[-2px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_1px_rgba(0,0,0,0.05)] top-[-1px] w-[342px]" data-node-id="144:1024" data-name="Transearch">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
                <img alt="" className="absolute h-[100.02%] left-[-12.3%] max-w-none top-[-8.35%] w-[124.79%]" src={imgTransearch} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.48] min-w-full not-italic relative shrink-0 text-[16px] text-[color:var(--grey,#6b6b6b)] tracking-[-0.176px] w-[min-content]" data-node-id="129:3547">
            A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call.
          </p>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-node-id="129:3548" data-name="Arrow">
            <ButtonCircleArrow className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </>
      )}
      {isVariant2 && (
        <>
          <div className="bg-[var(--light-purple,#c4cdf4)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" data-node-id="129:3556" data-name="Pills">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap" data-node-id="I129:3556;30:415">
              Absa Banking
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[58px] leading-[0] lowercase min-w-full not-italic relative shrink-0 text-[30px] text-white tracking-[-0.6px] w-[min-content] whitespace-pre-wrap" data-node-id="129:3557">
            <p className="leading-[0.92] mb-0">{`Streamlining scoring for `}</p>
            <p className="leading-[0.92]">multiple products</p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative shrink-0 text-[12px] text-[color:var(--light-purple,#c4cdf4)] tracking-[-0.132px] w-[364px] whitespace-pre-wrap" data-node-id="129:3558">{`User Research  |  Process Design  |  Systems Thinking`}</p>
          <div className="border border-[var(--light-grey,#e7e6e6)] border-solid h-[211px] overflow-clip relative rounded-[25px] shrink-0 w-[341px]" data-node-id="181:2358" data-name="Work">
            <div className="absolute h-[211px] left-[-4px] rounded-tl-[12px] rounded-tr-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_1px_rgba(0,0,0,0.05)] top-[-1px] w-[344px]" data-node-id="181:2359" data-name="Scoring Page_Updated_anonymised 4">
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[12px] rounded-tr-[12px]">
                <img alt="" className="absolute h-[454.41%] left-[-2.64%] max-w-none top-[-88.22%] w-[138.71%]" src={imgScoringPageUpdatedAnonymised4} />
              </div>
            </div>
            <div className="absolute h-[338px] left-[-11px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_1px_rgba(0,0,0,0.05)] top-[-44px] w-[370px]" data-node-id="181:2360" data-name="Import Collections - Product Page - Trade Officer 4">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImportCollectionsProductPageTradeOfficer4} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.48] min-w-full not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] w-[min-content]" data-node-id="129:3571">
            A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call.
          </p>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-node-id="129:3572" data-name="Arrow">
            <ButtonCircleArrow className="flex items-center justify-center relative shrink-0 size-[50px]" property1="Hover" />
          </div>
        </>
      )}
    </div>
  );
}
```

### Styles reported for this node

```
Body Reg: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.48, letterSpacing: -1.1)
H1: Font(family: "Inter", style: Bold, size: 30, weight: 700, lineHeight: 0.92, letterSpacing: -2)
Caption Text: Font(family: "Inter", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.1)
Portfolio Drop: Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 1); Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0)
Portfolio Card drop: Effect(type: DROP_SHADOW, color: #F5EFE6AB, offset: (-1, 3), radius: 3.5, spread: 1)
Red: #CD2B2B
```

## Notes

- **`Variant2` is the hover state:** Purple background, White title and summary, Light purple pill and skills, and the *Hover* circle arrow (Red). The default is a White card with Black title, Purple skills and the Light purple arrow.
- **Structure is the Compact Card plus two things:** a client **Pill** above the title, and a **Work thumbnail** (341x211, 25px radius, 1px Light grey border) between the skills and the summary.
- **Card is 405px wide, 32px padding, 24px gap, 25px radius** — vs the compact card's 343px / 30px padding / 25px radius.
- **Title is `lowercase`** in Figma (the source text is title case), same as the compact card.
- **The thumbnail holds four stacked screenshots** in the Default variant and two in `Variant2`. They are absolutely positioned and overflow-clipped, i.e. a collage cropped by the frame, not one image. Per-case-study artwork — treat as content, not component structure.
- **Shadow styles now exist in Figma** (`Portfolio Drop`, `Portfolio Card drop`), which is what Q-013 was waiting for.
