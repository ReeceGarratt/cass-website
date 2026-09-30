---
frame: Design system / Pills
node_id: "144:592"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=144-592
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
variants:
  - "Property 1=Client name (30:417)"
  - "Property 1=User types (144:593)"
---

## Outline

```xml
<frame id="144:626" name="Pills" x="-2409" y="1185" width="359" height="316">
  <frame id="144:592" name="Pills" x="37" y="35" width="243" height="132">
    <symbol id="30:417" name="Property 1=Client name" x="20" y="15" width="138" height="40" />
    <symbol id="144:593" name="Property 1=User types" x="20" y="68" width="204" height="40" />
  </frame>
</frame>
```

## Section: Pills (node 144:592)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/2e7e5aa7-3ed7-453d-b9fd-a9de20c4f1cb";
const imgIconsWoman2 = `${assetPathPrefix}/ca844.svg`;

type PillsProps = {
  className?: string;
  property1?: "Client name" | "User types";
};

export default function Pills({ className, property1 = "Client name" }: PillsProps) {
  const isUserTypes = property1 === "User types";
  return (
    <div className={className || `content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[25px] ${isUserTypes ? "bg-[var(--light-purple,#c4cdf4)] gap-[8px] h-[40px]" : "bg-[var(--purple,#4832a1)]"}`} id={isUserTypes ? "node-144_593" : "node-30_417"}>
      {property1 === "Client name" && (
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--white,white)] tracking-[-0.176px] whitespace-nowrap" data-node-id="30:415">
          Absa Banking
        </p>
      )}
      {isUserTypes && (
        <>
          <div className="relative shrink-0 size-[24px]" data-node-id="144:1356" data-name="Icons/Woman 2">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsWoman2} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap" data-node-id="144:594">
            Call centre agents
          </p>
        </>
      )}
    </div>
  );
}
```

### Styles reported for this node

```
Body Reg: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.48, letterSpacing: -1.1)
```

## Notes

- **One shape, two colourways.** 16px/8px padding, 25px radius, 16px Inter Bold label. `Client name` is Purple on White text; `User types` is Light purple on Purple text, 40px tall, with an 8px gap and a 24px icon.
- **The Detailed Card's hover variant uses a third colourway** (Light purple background, Purple text, no icon) that isn't in this component set — it's a local override on the card.
- **`User types` pills carry an avatar icon** from the `Icons` frame (144:1321): Woman 1-3 and Man 1-3, all 24px.
