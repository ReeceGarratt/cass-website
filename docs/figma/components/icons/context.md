---
frame: Design system / Icons
node_id: "144:1321"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=144-1321
fetched: 2026-09-29
tools: [get_metadata, download_assets]
---

## Outline

```xml
<frame id="144:1321" name="Icons" x="-2842" y="1650" width="228" height="50">
  <symbol id="144:1315" name="Icons/Woman 1" x="17" y="13" width="24" height="24" />
  <symbol id="144:1316" name="Icons/Woman 2" x="51" y="13" width="24" height="24" />
  <symbol id="144:1317" name="Icons/Woman 3" x="85" y="13" width="24" height="24" />
  <symbol id="144:1318" name="Icons/Man 1" x="119" y="13" width="24" height="24" />
  <symbol id="144:1319" name="Icons/Man 2" x="153" y="13" width="24" height="24" />
  <symbol id="144:1320" name="Icons/Man 3" x="187" y="13" width="24" height="24" />
</frame>
```

## Files

`reference.png` is the `download_assets` export of the whole frame, kept as a visual key.

| File | Figma layer | Node | Export size | SVG root id |
|---|---|---|---|---|
| `woman-1.svg` | Icons/Woman 1 | `144:1315` | 20 | `face` |
| `woman-2.svg` | Icons/Woman 2 | `144:1316` | 24.01 x 23.99 | `face_2` |
| `woman-3.svg` | Icons/Woman 3 | `144:1317` | 24 | `face_3` |
| `man-1.svg` | Icons/Man 1 | `144:1318` | 20 | `face_6` |
| `man-2.svg` | Icons/Man 2 | `144:1319` | 20 | `face_5` |
| `man-3.svg` | Icons/Man 3 | `144:1320` | 22 | `face_4` |
| `bounding-box.svg` | — | — | 24 | `Bounding box` |

## Notes

- Six Purple avatar glyphs, all placed at **24px** in Figma even though the exports come back at 20-24px. Size them to 24px at the call site rather than trusting the export size.
- **The filename mapping is inferred, not stated by Figma.** `download_assets` returns loose vectors whose only labels are `face`, `face_2` … `face_6`; the names above assume they come back in the frame's left-to-right layer order (Woman 1-3, then Man 1-3). The reference export shows the three women first (hair/bun details) then three plainer faces, which matches. Confirm before shipping any specific icon.
- `bounding-box.svg` is a transparent 24px square Figma emits as part of an icon's frame. Not an asset to ship.
- **Used by the `User types` [pill](../pills/context.md)**, which pairs one icon with a user-group label at 24px with an 8px gap. That's the only usage seen so far.
