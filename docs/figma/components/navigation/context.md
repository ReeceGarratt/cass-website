---
frame: Navigation (component set)
node_id: "20:703"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=20-703
fetched: 2026-09-16
tools: [get_metadata, get_screenshot, get_design_context]
screenshot: screenshot.png   # whole set: Default, Selcted, Hover state, Ipad (top to bottom)
assets: [ellipse.svg]        # the 10×10 dot, node 24:157
---

## Outline

See [outline-landing-page.md](../../outline-landing-page.md), node `20:703`.

## Section: Navigation component set (node 20:703)

`get_design_context`, screenshot excluded. Unedited except that the short-lived asset URL is replaced with `<asset-url>` (the file is saved as `ellipse.svg`).

```tsx
const assetPathPrefix = "<asset-url>";
const imgEllipse1 = `${assetPathPrefix}/9f660.svg`;

type NavigationProps = {
  className?: string;
  property1?: "Default" | "Selcted" | "Hover state" | "Ipad";
};

export default function Navigation({ className, property1 = "Default" }: NavigationProps) {
  const isHoverState = property1 === "Hover state";
  const isIpad = property1 === "Ipad";
  const isSelcted = property1 === "Selcted";
  const isSelctedOrHoverState = ["Selcted", "Hover state"].includes(property1);
  return (
    <div className={className || `content-stretch flex items-center justify-between relative ${isSelctedOrHoverState ? "bg-[#4832a1] px-[110px] py-[25px] w-[1920px]" : isIpad ? "bg-[var(--purple,#4832a1)] px-[69px] py-[15px] w-[1192px]" : "bg-[var(--purple,#4832a1)] px-[110px] py-[25px] w-[1920px]"}`} id={isHoverState ? "node-23_134" : isSelcted ? "node-20_704" : isIpad ? "node-24_166" : "node-2_21"} data-annotations={isHoverState ? "Hover" : isSelcted ? "Selected" : property1 === "Default" ? "default" : undefined}>
      <p className={`[word-break:break-word] font-["Inter:Black"] font-black leading-[1.48] not-italic relative shrink-0 whitespace-nowrap ${isSelctedOrHoverState ? "text-[27px] text-white tracking-[-0.297px]" : isIpad ? "text-[17px] text-[color:var(--white,white)] tracking-[-0.187px]" : "text-[27px] text-[color:var(--white,white)] tracking-[-0.297px]"}`} id={isHoverState ? "node-23_135" : isSelcted ? "node-20_705" : isIpad ? "node-24_167" : "node-1_163"}>
        cassandra garratt
      </p>
      {["Default", "Ipad", "Hover state"].includes(property1) && (
        <div className="content-stretch flex gap-[43px] items-center relative shrink-0" id={isHoverState ? "node-23_137" : isIpad ? "node-24_168" : "node-2_2"} data-name="Right Nav Items">
          <div className={`flex items-center justify-center relative shrink-0 ${isIpad ? "h-[18.056px] w-[31.032px]" : "h-[26.08px] w-[44.047px]"}`} id={isHoverState ? "node-23_138" : isIpad ? "node-24_169" : "node-19_424"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className={`[word-break:break-word] font-["Inter:Bold"] font-bold leading-[1.5] not-italic relative whitespace-nowrap ${isHoverState ? "text-[17px] text-[color:var(--light-purple,#c4cdf4)] tracking-[-0.187px]" : isIpad ? "text-[12px] text-[color:var(--white,white)] tracking-[-0.132px]" : "text-[17px] text-[color:var(--white,white)] tracking-[-0.187px]"}`}>Work</p>
            </div>
          </div>
          <div className={`flex items-center justify-center relative shrink-0 ${isIpad ? "h-[18.065px] w-[36.032px]" : "h-[26.092px] w-[51.047px]"}`} id={isHoverState ? "node-23_139" : isIpad ? "node-24_170" : "node-1_101"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className={`[word-break:break-word] font-["Inter:Bold"] font-bold leading-[1.5] not-italic relative whitespace-nowrap ${isHoverState ? "text-[17px] text-white tracking-[-0.187px]" : isIpad ? "text-[12px] text-[color:var(--white,white)] tracking-[-0.132px]" : "text-[17px] text-[color:var(--white,white)] tracking-[-0.187px]"}`}>About</p>
            </div>
          </div>
          <div className={`flex items-center justify-center relative shrink-0 ${isIpad ? "h-[18.085px] w-[47.032px]" : "h-[26.121px] w-[67.047px]"}`} id={isHoverState ? "node-33_578" : isIpad ? "node-24_171" : "node-33_572"}>
            <div className="flex-none rotate-[0.1deg]">
              <p className={`[word-break:break-word] font-["Inter:Bold"] font-bold leading-[1.5] not-italic relative text-[color:var(--white,white)] whitespace-nowrap ${isIpad ? "text-[12px] tracking-[-0.132px]" : "text-[17px] tracking-[-0.187px]"}`}>{isIpad ? "Contact" : isHoverState ? "Resume" : "Resume"}</p>
            </div>
          </div>
          {["Default", "Hover state"].includes(property1) && (
            <div className="flex h-[26.119px] items-center justify-center relative shrink-0 w-[66.047px]" id={isHoverState ? "node-23_140" : "node-1_102"}>
              <div className="flex-none rotate-[0.1deg]">
                <p className={`[word-break:break-word] font-["Inter:Bold"] font-bold leading-[1.5] not-italic relative text-[17px] tracking-[-0.187px] whitespace-nowrap ${isHoverState ? "text-white" : "text-[color:var(--white,white)]"}`}>Contact</p>
              </div>
            </div>
          )}
        </div>
      )}
      {isSelctedOrHoverState && (
        <div className={`absolute ${isHoverState ? "left-[1470px] size-[10px] top-[58px]" : "bg-[var(--light-purple,#c4cdf4)] h-[50px] left-[1430px] rounded-[54px] top-[20px] w-[91px]"}`} id={isHoverState ? "node-24_157" : "node-20_710"}>
          {isHoverState && <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />}
        </div>
      )}
      {isSelcted && (
        <div className="content-stretch flex gap-[43px] items-center relative shrink-0" data-node-id="20:706" data-name="Right Nav Items">
          <div className="flex h-[26.08px] items-center justify-center relative shrink-0 w-[44.047px]" data-node-id="20:707">
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative text-[17px] text-[color:var(--purple,#4832a1)] tracking-[-0.187px] whitespace-nowrap">Work</p>
            </div>
          </div>
          <div className="flex h-[26.092px] items-center justify-center relative shrink-0 w-[51.047px]" data-node-id="20:708">
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative text-[17px] text-white tracking-[-0.187px] whitespace-nowrap">About</p>
            </div>
          </div>
          <div className="flex h-[26.121px] items-center justify-center relative shrink-0 w-[67.047px]" data-node-id="33:575">
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative text-[17px] text-[color:var(--white,white)] tracking-[-0.187px] whitespace-nowrap">Resume</p>
            </div>
          </div>
          <div className="flex h-[26.119px] items-center justify-center relative shrink-0 w-[66.047px]" data-node-id="20:709">
            <div className="flex-none rotate-[0.1deg]">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.5] not-italic relative text-[17px] text-white tracking-[-0.187px] whitespace-nowrap">Contact</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

Trailing tool text (summary): convert to the project's stack, don't install Tailwind; node IDs are added as data attributes; styles in the design: White #FFFFFF; image assets expire after 7 days; elements with annotation data attributes carry implementation notes and the attributes shouldn't appear in final code.

## Notes

- **Annotations (Figma):** `2:21` = "default", `20:704` "Selcted" (light pill behind the item) = **"Selected"**, `23:134` "Hover state" (10px dot under the item, item text turns light purple) = **"Hover"**.
- **Conflict (2026-09-16):** the user said the *dot* marks the selected page and the *pill* is hover, which is the opposite of the annotations. Waiting on the user to confirm which is right.
- **Home item:** not in the design. The user asked for a Home item on desktop for now (2026-09-16).
- **Letter spacing is a percentage:** `tracking-[-0.187px]` at 17px = −1.1%, and −0.297px at 27px = −1.1%. That matches `letterSpacing: -1.1` in [tokens.md](../../tokens.md).
- **Nav values:** bar 90px tall, `padding: 25px 110px`, Purple background. Name is Inter Black 27px, line height 1.48, White. Items are Inter Bold 17px, line height 1.5, White, 43px gap. Pill 91×50, radius 54, Light purple, item text Purple. Dot is 10×10 Light purple, centred under the item (58px from the top).
- The iPad variant (`24:166`) has only Work/About/Contact and is out of scope for now.
