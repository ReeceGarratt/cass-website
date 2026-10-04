---
frame: Design system / Case Study / Intro
node_id: "144:1045"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=144-1045
fetched: 2026-09-29
tools: [get_metadata, get_design_context]
---

## Outline

```xml
<frame id="144:1716" name="Case Study" x="-3112" y="5960" width="3558" height="2376">
  <symbol id="144:1045" name="Intro" x="104" y="90" width="687" height="753.1836547851562" />
  <symbol id="144:1870" name="Business Problem Heading" x="895" y="95" width="391.80908203125" height="184" />
</frame>
```

## Section: Intro (node 144:1045)

```tsx
const assetPathPrefix = "https://www.figma.com/api/mcp/asset/afbcc7e5-593b-4290-b285-bf18a71da7f4";
const imgIconsWoman2 = `${assetPathPrefix}/ca844.svg`;
const imgVerticalDivider = `${assetPathPrefix}/a7fff.svg`;

type PillsProps = {
  className?: string;
  property1?: "User types";
};

function Pills({ className, property1 = "User types" }: PillsProps) {
  return (
    <div className={className || "bg-[var(--light-purple,#c4cdf4)] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[25px]"} data-node-id="144:593">
      <div className="relative shrink-0 size-[24px]" data-node-id="144:1356" data-name="Icons/Woman 2">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsWoman2} />
      </div>
      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[1.48] not-italic relative shrink-0 text-[16px] text-[color:var(--purple,#4832a1)] tracking-[-0.176px] whitespace-nowrap" data-node-id="144:594">
        Call centre agents
      </p>
    </div>
  );
}

export default function Intro({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col gap-[48px] items-start relative w-[687px]"} data-node-id="144:1045" data-name="Intro">
      <div className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-full" data-node-id="53:244" data-name="Title">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="53:251" data-name="Header">
          <p className="[word-break:break-word] font-['La_Belle_Aurore:Regular'] h-[20px] leading-[1.11] lowercase not-italic relative shrink-0 text-[#4832a1] text-[28px] text-center tracking-[-0.56px] w-[154px]" data-node-id="53:249">
            ux/ui designer
          </p>
          <div className="flex h-[97.184px] items-center justify-center relative shrink-0 w-[654.94px]" data-node-id="53:159">
            <div className="flex-none rotate-[0.1deg]">
              <div className="[word-break:break-word] font-['Inter:Black'] font-black leading-[0] not-italic relative text-[50px] text-[color:var(--red,#cd2b2b)] tracking-[-2px] w-[654.768px] whitespace-pre-wrap">
                <p className="leading-[48px] mb-0">{`streamlining  scoring `}</p>
                <p className="leading-[48px]">{`for  multiple products`}</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-node-id="144:1178" data-name="Users">
            <Pills className="bg-[var(--light-purple,#c4cdf4)] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[25px] shrink-0" />
          </div>
        </div>
        <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[0px] text-[color:var(--purple,#4832a1)] tracking-[-0.8px] w-[min-content]" href="https://www.standardbank.co.za/southafrica/business" data-node-id="62:286" target="_blank">
          <p className="text-[20px]">
            <span className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Inter:Bold'] font-bold leading-[27px] underline">Absa</span>
            <span className="font-['Inter:Regular'] font-normal leading-[27px]">{` wanted to streamline its credit product scoring within their Salesforce CRM so that a single call centre Agent could handle multiple product types in one interaction.`}</span>
          </p>
        </a>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--sub-sub-sections,48px)] items-start relative shrink-0 w-[687px]" data-node-id="66:289" data-name="Goal and outcome">
        <div className="[word-break:break-word] content-stretch cursor-pointer flex flex-col gap-[var(--headings-\&-body,16px)] items-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="66:290" data-name="Project Goal">
          <a className="block font-['Inter:Bold'] font-bold h-[28px] lowercase relative shrink-0 text-[#cd2b2b] text-[20px] w-full" href="https://www.standardbank.co.za/southafrica/business" data-node-id="66:291" target="_blank">
            <p className="leading-[1.12]">project goal</p>
          </a>
          <a className="block font-['Inter:Medium'] font-medium relative shrink-0 text-[#4832a1] text-[0px] tracking-[-0.176px] w-full" href="https://www.standardbank.co.za/southafrica/business" data-node-id="66:292" target="_blank">
            <p className="text-[16px]">
              <span className="font-['Inter:Medium'] font-medium leading-[1.48]">Design</span>
              <span className="font-['Inter:Bold'] font-bold leading-[1.48]">{` a unified scoring page`}</span>
              <span className="font-['Inter:Medium'] font-medium leading-[1.48]">{` that fit into a larger multi-product onboarding journey aimed at reducing Customer time spent on the phone and increases product sales.`}</span>
            </p>
          </a>
        </div>
        <div className="h-px relative shrink-0 w-[400px]" data-node-id="66:293" data-name="Vertical Divider">
          <div className="absolute inset-[-24.99%_0_-25%_0]">
            <img alt="" className="block max-w-none size-full" src={imgVerticalDivider} />
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch cursor-pointer flex flex-col gap-[var(--headings-\&-body,16px)] items-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="66:294" data-name="Project Goal">
          <a className="block font-['Inter:Bold'] font-bold h-[22px] lowercase relative shrink-0 text-[#cd2b2b] text-[20px] w-full" href="https://www.standardbank.co.za/southafrica/business" data-node-id="66:295" target="_blank">
            <p className="leading-[1.12]">project outcome</p>
          </a>
          <a className="block font-['Inter:Medium'] font-medium relative shrink-0 text-[#4832a1] text-[0px] tracking-[-0.176px] w-full whitespace-pre-wrap" href="https://www.standardbank.co.za/southafrica/business" data-node-id="66:296" target="_blank">
            <p className="mb-[4px] text-[16px]">
              <span className="font-['Inter:Medium'] font-medium leading-[1.48] text-[#4832a1]">I designed</span>
              <span className="font-['Inter:Bold'] font-bold leading-[1.48] text-[#4832a1]">{` a consolidated scoring page`}</span>
              <span className="font-['Inter:Medium'] font-medium leading-[1.48] text-[#4832a1]">{` that allows Agents to `}</span>
              <span className="font-['Inter:Bold'] font-bold leading-[1.48] text-[#4832a1]">score, customise and add multiple credit products in a single call.</span>
              <span className="font-['Inter:Medium'] font-medium leading-[1.48] text-[#4832a1]">{` `}</span>
              <span className="font-['Inter:Medium'] font-medium leading-[1.48]">{` Usability testing showed `}</span>
              <span className="font-['Inter:Bold'] font-bold leading-[1.48]">{`14 of 15 users completed tasks unaided. `}</span>
            </p>
            <p className="leading-[1.48] mb-[4px] text-[16px]">​</p>
            <p className="leading-[1.48] text-[16px]">I owned discovery through to validating design and handed over a tested interface along with a recommended way forward.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Styles reported for this node

```
Purple: #4832A1
Hand written: Font(family: "La Belle Aurore", style: Regular, size: 28, weight: 400, lineHeight: 1.11, letterSpacing: -2)
Title 1: Font(family: "Inter", style: Black, size: 50, weight: 900, lineHeight: 48, letterSpacing: -4)
Body Reg: Font(family: "Inter", style: Regular, size: 16, weight: 400, lineHeight: 1.48, letterSpacing: -1.1)
Sub Title: Font(family: "Inter", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)
Red: #CD2B2B
H2: Font(family: "Inter", style: Bold, size: 20, weight: 700, lineHeight: 1.12, letterSpacing: 0)
Body Med: Font(family: "Inter", style: Medium, size: 16, weight: 500, lineHeight: 1.48, letterSpacing: -1.1)
Light Purple: #C1CBFF
```

## Notes

- **The case study page header:** a handwritten role eyebrow ("ux/ui designer", La Belle Aurore 28px Purple), the case study title in **Title 1** (Inter Black 50/48) but in **Red**, then a row of `User types` pills, then a 20px lead paragraph. 56px gap inside the Title block, 48px between blocks.
- **Then a Goal / Outcome pair:** each is an H2 heading in Red, lowercase, over a Body Med (Inter **Medium** 16) paragraph in Purple, with bold runs for emphasis. A 400px hairline rule separates them (named "Vertical Divider" in Figma but drawn horizontal).
- **Figma now has spacing variables.** The output references `var(--sub-sub-sections, 48px)` and `var(--headings-&-body, 16px)`. Q-005's note that the file has no spacing variables is out of date.
- **New type styles not in `tokens.css`:** `H2` (Inter Bold 20/1.12, letterSpacing 0), `Body Med` (Inter Medium 16/1.48), `Hand written` (La Belle Aurore 28/1.11). **La Belle Aurore is a second font family** and would need adding to the Astro Fonts config.
- **`Title 1` is 50px**, where the home page hero uses a 100px `Title`. Two separate title styles.
- **Two different light purples:** the variable `Light purple` is `#c4cdf4`, but the style reported here is `Light Purple: #C1CBFF`. Needs confirming with Cass.
- **The `<a href>` wrappers are prototype artifacts.** Every block links to `standardbank.co.za` — including on the Absa case study — because prototype links were attached in Figma. Don't build these as links.
- **The underlined "Absa"** in the lead paragraph is the trigger for the [Definition Tip](../definition-tip/context.md) — the only place the tooltip trigger appears.
