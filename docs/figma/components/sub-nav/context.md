---
frame: Design system / Navigation / Sub Nav (case study navigation)
node_id: "185:2566"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=185-2566
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
variants:
  - "Property 1=Default (144:542)"
  - "Property 1=02 (185:2567)"
  - "Property 1=03 (185:2580)"
  - "Property 1=04 (188:2593)"
---

## Outline

```xml
<frame id="185:2566" name="Sub Nav" x="60" y="862" width="1960.392578125" height="420">
  <symbol id="144:542" name="Property 1=Default" x="20" y="20" width="1920.392578125" height="80.00001525878906" />
  <symbol id="185:2567" name="Property 1=02" x="20" y="120.00001525878906" width="1920.392578125" height="80.00001525878906" />
  <symbol id="185:2580" name="Property 1=03" x="20" y="220.00001525878906" width="1920.392578125" height="80.00001525878906" />
  <symbol id="188:2593" name="Property 1=04" x="20" y="320" width="1920.392578125" height="80.00001525878906" />
</frame>
```

## Section: Sub Nav (node 185:2566)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/87c93bc0-4602-411f-ad98-03563fb131a6";
const imgSelectedState = `${assetPathPrefix}/962f7.svg`;
const imgArrowUpward = `${assetPathPrefix}/997c4.svg`;
const imgSelectedState1 = `${assetPathPrefix}/51f94.svg`;
const imgSelectedState2 = `${assetPathPrefix}/a3802.svg`;
const imgSelectedState3 = `${assetPathPrefix}/ae1ff.svg`;

type SubNavProps = {
  className?: string;
  property1?: "Default" | "02" | "03" | "04";
};

export default function SubNav({ className, property1 = "Default" }: SubNavProps) {
  const is02 = property1 === "02";
  const is03 = property1 === "03";
  const is04 = property1 === "04";
  return (
    <div className={className || "h-[80px] relative w-[1920.393px]"} id={is04 ? "node-188_2593" : is03 ? "node-185_2580" : is02 ? "node-185_2567" : "node-144_542"}>
      <div className={`absolute bottom-0 left-[54.52%] top-full ${is04 ? "right-[18.97%]" : is03 ? "right-[23.87%]" : is02 ? "right-[30.22%]" : "right-[38.24%]"}`} id={is04 ? "node-188_2594" : is03 ? "node-185_2581" : is02 ? "node-185_2568" : "node-144_529"} data-name="Selected state">
        <div className="absolute inset-[-1.5px_0]">
          <img alt="" className="block max-w-none size-full" src={is04 ? imgSelectedState3 : is03 ? imgSelectedState2 : is02 ? imgSelectedState1 : imgSelectedState} />
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex gap-[812px] inset-[0_0_2.18%_0] items-center px-[110px] py-[26px]" id={is04 ? "node-188_2595" : is03 ? "node-185_2582" : is02 ? "node-185_2569" : "node-144_530"} data-name="Navigation Content">
        <div className="content-stretch flex gap-[14px] items-center relative shrink-0" id={is04 ? "node-188_2596" : is03 ? "node-185_2583" : is02 ? "node-185_2570" : "node-144_538"} data-name="Next">
          <div className="flex h-[21.481px] items-center justify-center relative shrink-0 w-[22.065px]" id={is04 ? "node-188_2597" : is03 ? "node-185_2584" : is02 ? "node-185_2571" : "node-144_540"}>
            <div className="-scale-y-100 flex-none rotate-90">
              <div className="h-[22.065px] relative w-[21.481px]" data-name="arrow_upward">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowUpward} />
              </div>
            </div>
          </div>
          <div className="flex h-[24.157px] items-center justify-center relative shrink-0 w-[87.043px]" id={is04 ? "node-188_2598" : is03 ? "node-185_2585" : is02 ? "node-185_2572" : "node-144_539"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">All projects</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[40px] items-center relative shrink-0" id={is04 ? "node-188_2599" : is03 ? "node-185_2586" : is02 ? "node-185_2573" : "node-144_531"} data-name="Right Nav Items">
          <div className="flex h-[24.239px] items-center justify-center relative shrink-0 w-[132.043px]" id={is04 ? "node-188_2600" : is03 ? "node-185_2587" : is02 ? "node-185_2574" : "node-144_532"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">Project Overview</p>
            </div>
          </div>
          <div className="flex h-[24.222px] items-center justify-center relative shrink-0 w-[123.043px]" id={is04 ? "node-188_2601" : is03 ? "node-185_2588" : is02 ? "node-185_2575" : "node-144_533"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">Business Needs</p>
            </div>
          </div>
          <div className="flex h-[24.148px] items-center justify-center relative shrink-0 w-[82.043px]" id={is04 ? "node-188_2602" : is03 ? "node-185_2589" : is02 ? "node-185_2576" : "node-144_534"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">Interviews</p>
            </div>
          </div>
          <div className="flex h-[24.098px] items-center justify-center relative shrink-0 w-[54.043px]" id={is04 ? "node-188_2603" : is03 ? "node-185_2590" : is02 ? "node-185_2577" : "node-144_535"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">Design</p>
            </div>
          </div>
          <div className="flex h-[24.177px] items-center justify-center relative shrink-0 w-[98.043px]" id={is04 ? "node-188_2604" : is03 ? "node-185_2591" : is02 ? "node-185_2578" : "node-144_536"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">User Testing</p>
            </div>
          </div>
          <div className="flex h-[24.136px] items-center justify-center relative shrink-0 w-[75.043px]" id={is04 ? "node-188_2605" : is03 ? "node-185_2592" : is02 ? "node-185_2579" : "node-144_537"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap">Handover</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Styles reported for this node

```
Body Reg: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.48, letterSpacing: -1.1)
```

## Notes

- **A second, case-study-only nav bar:** White, 80px tall, 110px inline padding (the same gutter as the main nav), an "All projects" back link on the left with a left-pointing `arrow_upward` (rotated), and six section links on the right: Project Overview, Business Needs, Interviews, Design, User Testing, Handover.
- **The selected state is a growing underline, not a per-item one.** It's a single SVG rule anchored at `left: 54.52%` (the start of "Project Overview") whose right edge moves with the variant: 38.24% → 30.22% → 23.87% → 18.97%. So it reads as *progress through the case study*, sweeping left to right as you scroll, rather than highlighting one item.
- **That progress behaviour needs scroll position**, so this is the component that would break the no-client-JS default (invariant 3). A CSS-only fallback (marking the current section only, via `:target` or a static `aria-current`) would lose the sweep.
- Only four variants are drawn for six links, so the mapping from section to underline width isn't fully specified.
- **The six section names are fixed in the component.** Whether every case study has exactly these six sections decides whether the labels are props or hard-coded.
