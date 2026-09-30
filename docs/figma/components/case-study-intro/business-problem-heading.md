---
frame: Design system / Case Study / Business Problem Heading
node_id: "144:1870"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=144-1870
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
---

## Section: Business Problem Heading (node 144:1870)

```tsx
export default function BusinessProblemHeading({ className }: { className?: string }) {
  return (
    <div className={className || "[word-break:break-word] h-[184px] not-italic relative w-[391.809px]"} data-node-id="144:1870" data-name="Business Problem Heading">
      <p className="absolute font-['Inter:Regular'] font-normal inset-[68.98%_-1.02%_1.67%_23.69%] leading-[27px] text-[#4832a1] text-[20px] tracking-[-0.8px]" data-node-id="86:192">
        During a full day workshop with my key stakeholders I identified:
      </p>
      <div className="absolute contents inset-[0_48.44%_44.06%_0] lowercase" data-node-id="86:193" data-name="H1">
        <div className="absolute font-['Inter:Black'] font-black inset-[14.5%_48.44%_44.06%_0] leading-[0] text-[#cd2b2b] text-[45px] text-right tracking-[-0.9px]" data-node-id="86:194">
          <p className="leading-none mb-0">business</p>
          <p className="leading-none">problem</p>
        </div>
        <p className="absolute font-['La_Belle_Aurore:Regular'] inset-[0_92.6%_83.94%_0] leading-[1.11] text-[#4832a1] text-[28px] tracking-[-0.56px]" data-node-id="86:195">
          the
        </p>
      </div>
    </div>
  );
}
```

### Styles reported for this node

```
Purple: #4832A1
Sub Title: Font(family: "Inter", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)
Red: #CD2B2B
Title 2: Font(family: "Inter", style: Black, size: 45, weight: 900, lineHeight: 1, letterSpacing: -2)
Hand written: Font(family: "La Belle Aurore", style: Regular, size: 28, weight: 400, lineHeight: 1.11, letterSpacing: -2)
```

## Notes

- **A section-heading pattern, not a one-off.** Three parts: a small handwritten article ("the") in La Belle Aurore Purple, top-left; a two-line, right-aligned heading in **Title 2** (Inter Black 45/1.0) in Red, lowercase; and an optional Sub Title standfirst in Purple, indented to start under the heading's midpoint.
- The same shape should cover the other case study sections (Interviews, Design, User Testing, Handover) — only one is drawn, so the eyebrow word and the heading text would be props.
- **Everything is absolutely positioned** in the Figma output, and the standfirst's indentation is expressed as a percentage inset. Rebuild it with flow layout rather than copying the insets.
- The Figma layer is named "H1" but uses the Title 2 style — not the `H1` text style. Layer names here don't map to heading levels; choose heading levels from the page outline instead.
