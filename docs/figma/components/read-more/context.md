---
frame: Design system / Other case studies cards / Read More
node_id: "99:2461"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=99-2461
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
---

## Outline

```xml
<frame id="180:914" name="Other case studies cards" x="1092" y="3954" width="1832" height="486">
  <symbol id="99:2461" name="Read More" x="83" y="42" width="1698" height="391" />
</frame>
```

## Section: Read More (node 99:2461)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/3eab3f4f-383c-435b-9de6-611784c84903";
const imgProperty1Default = `${assetPathPrefix}/6a12f.svg`;

type ButtonCircleArrowProps = {
  className?: string;
  property1?: "Default";
};

function ButtonCircleArrow({ className, property1 = "Default" }: ButtonCircleArrowProps) {
  return (
    <div className={className || "relative size-[50px]"} data-node-id="4:98">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1Default} />
    </div>
  );
}

export default function ReadMore({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[60px] items-center relative"} data-node-id="99:2461" data-name="Read More">
      <div className="[word-break:break-word] font-['Inter:Black'] font-black h-[163px] leading-[0] not-italic relative shrink-0 text-[50px] text-[color:var(--purple,#4832a1)] text-right tracking-[-2px] w-[262px] whitespace-pre-wrap" data-node-id="19:112">
        <p className="leading-[48px] mb-0">{`Other case `}</p>
        <p className="leading-[48px]">studies</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="88:649">
        <div className="bg-white content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] shrink-0 w-[448px]" data-node-id="88:583" data-name="Case study Card">
          <div className="bg-[var(--purple,#4832a1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" data-node-id="88:584" data-name="Pills">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] whitespace-nowrap" data-node-id="I88:584;30:415">
              Standard Bank
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[58px] leading-[0] lowercase min-w-full not-italic relative shrink-0 text-[30px] text-black tracking-[-0.6px] w-[min-content]" data-node-id="88:585">
            <p className="leading-[0.92] mb-0">consolidating</p>
            <p className="leading-[0.92]">import collections</p>
          </div>
          <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[1.5] relative shrink-0 text-[15px] text-[color:var(--purple,#4832a1)] tracking-[-0.165px] w-[364px] whitespace-pre-wrap" data-node-id="88:586" style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  | Workshops  |  Usability Testing`}</p>
          <div className="h-[72px] relative shrink-0 w-full" data-node-id="88:598" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[rgba(0,0,0,0.58)] top-0 tracking-[-0.176px] w-[378px]" data-node-id="88:599">
              An interface replacing a five-platform and paper-heavy capture process with one cohesive, trackable journey.
            </p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[379px]" data-node-id="88:600" data-name="Arrow">
            <ButtonCircleArrow className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] shrink-0 w-[448px]" data-node-id="88:602" data-name="Case study Card">
          <div className="bg-[var(--purple,#4832a1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" data-node-id="88:603" data-name="Pills">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] whitespace-nowrap" data-node-id="I88:603;30:415">
              MiX Telematics
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[58px] leading-[0.92] lowercase min-w-full not-italic relative shrink-0 text-[30px] text-black tracking-[-0.6px] w-[min-content]" data-node-id="88:604">
            Using research to build a better sales workflow
          </p>
          <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[1.5] relative shrink-0 text-[15px] text-[color:var(--purple,#4832a1)] tracking-[-0.165px] w-[364px] whitespace-pre-wrap" data-node-id="88:605" style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  |  Workshops  |  Journey Mapping`}</p>
          <div className="h-[72px] relative shrink-0 w-full" data-node-id="88:617" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[rgba(0,0,0,0.58)] top-0 tracking-[-0.176px] w-[378px]" data-node-id="88:618">{`A research-based review and journey redesign of the sales platform's workflow, cutting it from 22 steps to 14 steps.`}</p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[379px]" data-node-id="88:619" data-name="Arrow">
            <ButtonCircleArrow className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[22px] items-start p-[30px] relative rounded-[25px] shrink-0 w-[448px]" data-node-id="165:2537" data-name="Case study Card">
          <div className="bg-[var(--purple,#4832a1)] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" data-node-id="165:2538" data-name="Pills">
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] whitespace-nowrap" data-node-id="I165:2538;30:415">
              TRANSEARCH
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter:Bold'] font-bold h-[58px] leading-[0] lowercase min-w-full not-italic relative shrink-0 text-[30px] text-black tracking-[-0.6px] w-[min-content] whitespace-pre-wrap" data-node-id="165:2539">
            <p className="leading-[0.92] mb-0">{`Designing an `}</p>
            <p className="leading-[0.92]">interactive book</p>
          </div>
          <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[1.5] relative shrink-0 text-[15px] text-[color:var(--purple,#4832a1)] tracking-[-0.165px] w-[364px] whitespace-pre-wrap" data-node-id="165:2540" style={{ fontVariationSettings: '"wdth" 100' }}>{`User Research  |  Process Design  |  Systems Thinking`}</p>
          <div className="h-[72px] relative shrink-0 w-full" data-node-id="165:2550" data-name="Intro">
            <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[1.48] left-0 not-italic text-[16px] text-[rgba(0,0,0,0.58)] top-0 tracking-[-0.176px] w-[378px]" data-node-id="165:2551">
              An interactive workbook that enabled users to engage with the content in a way similar to how they would with a physical workbook.
            </p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0 w-[379px]" data-node-id="165:2552" data-name="Arrow">
            <ButtonCircleArrow className="flex items-center justify-center relative shrink-0 size-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Styles reported for this node

```
Title 1: Font(family: "Inter", style: Black, size: 50, weight: 900, lineHeight: 48, letterSpacing: -4)
Body Reg: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.48, letterSpacing: -1.1)
H1: Font(family: "Inter", style: Bold, size: 30, weight: 700, lineHeight: 0.92, letterSpacing: -2)
```

## Notes

- The end-of-case-study row: a right-aligned "Other case studies" heading in **Title 1** (Inter Black 50/48, Purple, 262px wide), a 60px gap, then three cards 16px apart.
- **These cards are a third card shape, and they've drifted from the component set.** They are detached copies (`data-name="Case study Card"`, not instances), 448px wide with a pill, no thumbnail:

  | | Compact Card (`4:123`) | Detailed Card (`129:3554`) | Read More card (`88:583`) |
  |---|---|---|---|
  | Width | 343px | 405px | 448px |
  | Padding | 30px | 32px | 30px |
  | Gap | 22px | 24px | 22px |
  | Client pill | no | yes | yes |
  | Work thumbnail | no | yes | no |
  | Skills type | Inter Bold 12 | Inter Bold 12 | **Roboto Bold 15** |
  | Summary colour | Grey `#6b6b6b` | Grey `#6b6b6b` | **`rgba(0,0,0,0.58)`** |
  | Hover variant | yes | yes | **none drawn** |

  The Roboto 15px skills and the 58% black summary look like leftovers from before the caption font changed to Inter (see `wiki/design-tokens.md`) — worth confirming with Cass rather than building both.
- Only three cards are shown, i.e. the other case studies excluding the current one. With four case studies total (Absa, Standard Bank, MiX Telematics, TRANSEARCH) that's "all except this one".
- No hover state is drawn for these cards, though the compact and detailed cards both have one.
