---
frame: Design system / Definition Tip
node_id: "99:2845"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=99-2845
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
---

## Outline

```xml
<frame id="144:630" name="Definition Tip" x="-1704" y="1175" width="519" height="209">
  <symbol id="99:2845" name="Definition Tip" x="28" y="34" width="463" height="141" />
</frame>
```

## Section: Definition Tip (node 99:2845)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/4a3d8df9-382b-4bb4-8469-04aaaebc0d9b";
const imgPolygon1 = `${assetPathPrefix}/eea09.svg`;

export default function DefinitionTip({ className }: { className?: string }) {
  return (
    <div className={className || "h-[141px] relative w-[463px]"} data-node-id="99:2845" data-name="Definition Tip">
      <div className="-translate-y-1/2 [word-break:break-word] absolute bg-white content-stretch drop-shadow-[0px_-2px_4.4px_rgba(0,0,0,0.08)] flex flex-col gap-[8px] items-center justify-center leading-[27px] left-0 not-italic p-[16px] right-0 rounded-[25px] text-[20px] text-[color:var(--purple,#4832a1)] top-[calc(50%-9.5px)] tracking-[-0.8px]" data-node-id="99:2839" data-name="Definition">
        <p className="font-['Inter:Bold'] font-bold relative shrink-0 w-[431px]" data-node-id="99:2836">
          Absa
        </p>
        <p className="font-['Inter:Regular'] font-normal relative shrink-0 w-[431px]" data-node-id="144:627">
          A multinational banking and financial services provider, based in Johannesburg ZA.
        </p>
      </div>
      <div className="absolute flex inset-[80.14%_86.18%_0_7.78%] items-center justify-center" data-node-id="99:2842" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="relative size-full">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <img alt="" className="block max-w-none size-full" src={imgPolygon1} />
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
Sub Title: Font(family: "Inter", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)
```

## Notes

- A speech-bubble tooltip: White, 25px radius, 16px padding, 8px gap, a soft upward drop shadow, and an SVG tail pointing down-left (a rotated polygon, positioned at ~7.8% from the left edge).
- Both lines are Purple at 20px/27px: the term in Inter Bold, the definition in Inter Regular.
- **Only the popup is drawn.** The design doesn't show the trigger — which word in the body copy opens it, or how. That's an open question, and the first component in the system that implies interaction, so it decides whether the case study pages stay zero-JS.
