# Brand assets

## Source artwork

`logo-source-original.png` — the original supplied logo (1024×1024 raster). House outline
with a Bitcoin coin inside, wordmark alongside. Colours as supplied:

| Element | Hex |
|---|---|
| House outline, "Equity"/"Bitcoin" | `#0A2A4A` deep navy |
| Coin, the "2" | `#F7931A` Bitcoin brand orange |
| Background | white, baked in |

Kept as the reference for the mark's construction. Not used on the site directly.

## What ships instead, and why

The concept was kept exactly — house containing a coin, "2" picked out in the accent
colour. Three things had to change for it to work on this site:

1. **Navy is invisible on our ground.** The site runs on near-black (`#08080a`). The
   house outline now takes `currentColor` so it inherits whatever it sits on.
2. **Bitcoin orange fights our gold.** `#F7931A` and `#C9A227` are close enough in hue
   to read as an inconsistency rather than two deliberate accents. The coin now uses the
   site gold `#C9A227`.
3. **Raster with a baked white background can't sit on dark.** Redrawn as vector, so it
   is ~800 bytes instead of 1 MB and stays sharp at any size.

The redraw also closes the house symmetrically. The source raster had an unclosed right
wall with a detached vertical stub floating beside it — a generation artifact rather than
a design choice.

## Files

| File | Use |
|---|---|
| `src/components/Logo.tsx` | `<LogoMark>` — what the site actually renders. Inherits `currentColor`. |
| `public/favicon.svg` | Browser tab. Dark rounded plate so it holds against light or dark chrome. |
| `public/apple-touch-icon.png` | 180×180 iOS home screen. |
| `public/og-image.png` | 1200×630 social preview. Regenerate via the script noted below. |
| `public/logo-mark-dark-bg.svg` | Standalone mark for dark backgrounds. Transparent. |
| `public/logo-mark-light-bg.svg` | Standalone mark for light backgrounds — documents, letterhead, print. Uses the deeper gold `#A8841C` so the coin holds contrast on white. |

## Clear space and minimum size

Give the mark clear space equal to the height of its roof peak on all sides. Minimum
legible size is **20px** — below that the ₿ inside the coin fills in, though the house
silhouette still reads, which is why the favicon works at 16px.

Do not recolour the coin to Bitcoin orange on site surfaces. If the brand later moves to
the navy/orange palette wholesale, change the design tokens in `src/styles/tokens.css`
and the mark follows automatically for the house; only the `coin` default in `Logo.tsx`
needs touching.

## Regenerating the raster assets

`og-image.png` and `apple-touch-icon.png` are rendered from HTML/SVG via Playwright with
the site's real webfonts embedded. The generator scripts are not checked in — they were
one-shot. If the tagline or mark changes, regenerate by rendering `public/favicon.svg` at
180×180 for the touch icon, and a 1200×630 page using Fraunces 600 for the wordmark and
headline with Inter for body copy.
