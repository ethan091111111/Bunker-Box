---
name: Bunker Box
description: A links bunker at first light, with a ribboned box in the sand and the waiting list as its packing slip.
colors:
  olive: "#3c492b"
  olive-deep: "#2f3a21"
  cream: "#f7f2e5"
  sage: "#b9b88e"
  page: "#f7efe4"
  card: "#fdfaf3"
  field: "#fffdf8"
  raised: "#f1e9dc"
  raised-hover: "#e9e0d0"
  ink: "#20251a"
  ink-2: "#4f5543"
  ink-3: "#666b5a"
  line: "rgba(32, 37, 26, 0.08)"
  line-2: "rgba(32, 37, 26, 0.22)"
  error: "#a3402c"
  on-olive-line: "rgba(247, 242, 229, 0.28)"
  on-olive-line-hover: "rgba(247, 242, 229, 0.48)"
  on-olive-hover: "rgba(247, 242, 229, 0.08)"
  marker-ring: "rgba(185, 184, 142, 0.6)"
  focus-halo: "rgba(60, 73, 43, 0.16)"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: "76px"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: "52px"
    letterSpacing: "-0.02em"
  name:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: "36px"
  title:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "24px"
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-large:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: "28px"
  lead:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body-small:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  button:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "20px"
  marker:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
rounded:
  logo: "4px"
  control: "8px"
  card: "16px"
  marker: "12px"
  marker-large: "28px"
  step: "16px"
spacing:
  gutter: "24px"
  gutter-phone: "16px"
  content: "min(1180px, 100% - 48px)"
  field-gap: "16px"
  card-pad: "24px 32px 28px"
  card-pad-phone: "20px 20px 24px"
  section: "96px"
  section-phone: "64px"
  last-call: "128px"
  last-call-phone: "96px"
  band-height: "72px"
  band-height-phone: "64px"
components:
  band:
    backgroundColor: "{colors.olive}"
    height: "{spacing.band-height}"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  nav-cta-hover:
    backgroundColor: "{colors.on-olive-hover}"
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.olive-deep}"
  button-secondary:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.raised-hover}"
  slip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  marker:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    typography: "{typography.marker}"
    rounded: "{rounded.marker}"
    size: "24px"
  marker-large:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    rounded: "{rounded.marker-large}"
    padding: "0 16px"
    height: "56px"
  contents:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
  footer:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.sage}"
  dock:
    backgroundColor: "{colors.card}"
    padding: "12px 16px"
---

# Bunker Box design system

## Overview

A Scottish links course at first light. A kraft cardboard box tied with olive ribbon sits in a raked bunker, with marram grass, haar and a flag on the green behind it. The headline stands on the calm sky above the scene, and the signup card rises out of the bottom of the photo like the box's packing slip. Olive bands at the top and bottom carry the team's logo.

The character is dry, sporting and a little mischievous, in the brand's own line: "A little mystery, a lot of golf". The page is warm and light: a cream ramp tinted toward the hero sky, olive as the one accent, and nothing glossy.

Process: the page was redesigned with the unslop skill (by Damir Sokolovsky, @heydamir, CC BY 4.0).

## Colors

- **Brand (supplied by the team, must be followed):**
  - Olive `#3c492b`: the brand surface (header band, footer, share-image panel) and the primary action. Cream on olive is about 8.6:1.
  - Cream `#f7f2e5`: text on olive, and the light tone the page ramp is built from.
  - Sage `#b9b88e`: the golfer in the logo, and quiet details on olive (footer body text, about 4.7:1; the marker's inner ring). Sage is never text on cream; it is about 1.8:1 there.
- **Olive deep (olive-deep `#2f3a21`):** primary button hover and the disabled "Joining…" state.
- **Cream ramp (page, card, field, raised):** page `#f7efe4` is close to the hero sky; cards (the slip, the contents list, the dock) are a lighter `#fdfaf3`; inputs are the lightest `#fffdf8`; the secondary button is the darker `#f1e9dc`, `#e9e0d0` on hover.
- **Ink (ink, ink-2, ink-3):** deep olive-ink, never grey. `#20251a` for headings and primary text (about 13.7:1 on page), `#4f5543` for secondary copy and field labels (about 6.8:1), `#666b5a` for muted text such as the count line, table headers and placeholders (about 4.8:1 on page, 5.3:1 on card).
- **Hairlines (line, line-2):** ink at 8% for card borders and row rules; ink at 22% for field borders, the dashed tear lines, step rules and the secondary button border.
- **On olive:** the header link uses cream at 28% for its border (48% on hover) and cream at 8% as its hover fill.
- **Error (error `#a3402c`):** invalid field borders and the error message only.
- Red is not used in the chrome. The only red on the page is the flag in the hero photo.
- Keyboard focus is a 2px olive outline, offset 2px; on the olive band and footer it is cream. Focused inputs get an olive border plus a 3px olive halo at 16%.
- Text selection is olive with cream text; the input caret is olive.

## Typography

- **Instrument Serif 400** is for headlines only: the hero headline (72/76px), section headings (48/52px) and the visitor's name in the joined state (32/36px). Letter spacing -0.02em on headlines, `text-wrap: balance`. It sits well with the logo's serif.
- **Instrument Sans** (400/500/600) is the interface face: body 16/24px, the hero subline 19/28px, section leads 18/28px, list titles 18/24px at 500, field labels 14/20px at 500, small text 14/20px, buttons 16/20px at 500 (15/20px for the secondary button and the header link), the marker numeral at 600.
- Both are self-hosted woff2 in `/fonts` with their OFL licences; Instrument Serif 400 and Instrument Sans 400 are preloaded. `font-display: swap`.
- Sentence case everywhere. No uppercase tracked labels.
- Numerals are tabular everywhere.
- Phone sizes (760px and below): hero headline 40/44px, section headings 36/40px, subline 17/26px, leads 17/26px, joined name 28/32px. Between 761 and 1099px the hero headline is 56/60px.

## Layout

- Content width `min(1180px, 100% - 48px)`, 16px gutters at 760px and below; both subtract the safe-area insets.
- Order: olive band (logo, "Join the waiting list" link), hero (headline, subline, scene, slip), "What's in the box", "Buying for a golfer?", "Who's behind the box", a centred last call, olive footer.
- Sections are spaced 96px apart (64px on phones); the last call has 128px above and below (96px on phones). "Buying for a golfer?" and "Who's behind the box" are two equal columns with a 64px gap, stacked on phones.
- Breakpoints:
  - **1100px and up:** the scene is a full-bleed background behind the hero, `clamp(640px, 50vw, 860px)` tall, cropped `object-position: 0% 35%` and fading out over its bottom 30%. The headline sits on the sky 136px from the top; the slip starts 160px above the scene's bottom edge.
  - **Below 1100px:** headline and subline first, then the scene in flow (pulled up 96px, 48px below 600px), faded at both top and bottom so it melts into the page; the slip overlaps the bottom of the photo by 80px (64px on phones).
  - **760px and below:** the band is 64px tall, the slip fields stack in one column, the consent and submit stack with a full-width button, the contents table drops its header row and becomes a two-column grid per row, buttons go full width, and the phone dock appears.
  - **Below 600px:** the scene switches to `images/hero-phone.webp`, a tighter crop with the box centred.
  - **359px and below:** logo 32px tall, header link 13px with 8px padding, slip padding 16/20px.
- The phone dock is a fixed bar at the bottom of the screen with a full-width "Join the waiting list" button. It shows once the page has scrolled past 200px and none of the form, the last call or the footer is on screen, and never after joining.
- Safe-area insets are respected in the band, the content width, the dock and the footer.

## Elevation & Depth

- Mostly flat. Depth comes from the cream ramp and hairlines, not shadows.
- Slip: a small close shadow plus a soft one (`0 1px 2px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.06)`), so it reads as a piece of paper lying on the scene.
- Contents list: the close shadow only (`0 1px 2px rgba(0,0,0,0.05)`).
- Dock: `0 -8px 24px rgba(0,0,0,0.06)` above a 1px hairline.
- The olive band and footer are flat. No gradients except the alpha masks that fade the hero photo into the page.

## Shapes

- Cards (slip, contents list): 16px corners, 1px `line` border.
- Controls (buttons, inputs, select, header link): 8px corners.
- The logo link has a 4px corner so its focus outline is tidy.
- Circles: the ball marker (24px, or a 56px pill holding the queue number) and the step numbers (32px with a 1px `line-2` border, neutral, not markers).
- The packing-slip tear line is a 1px dashed `line-2` rule, used under the slip's "Ship to" header and under the contents table header. Other rules are 1px solid.
- Icons are inline SVG on a 24 grid, 1.5 stroke, round caps and joins, drawn at 18px: the arrow on primary buttons, the chevron in the select, the tick in the contents list.

## Components

- **Logo:** `images/logo.png` (990x289), the team's logo cut out on transparency: "BUNKER BOX" in a cream high-contrast serif, a sage woman golfer mid-swing between the two words, and the tagline "A LITTLE MYSTERY, A LOT OF GOLF" underneath. Rules:
  - Olive surfaces only (the band, the footer, the share-image panel). Its edges carry olive fringing, so it never goes on cream, a card or the photo.
  - Use it whole: never recolour it, separate the tagline, re-typeset the wordmark or redraw the golfer.
  - Heights: 52px in the band (36px on phones, 32px at 359px and below), 44px in the footer (36px on phones). Always with `width="990" height="289"` and `alt="Bunker Box"`.
  - `images/logo-square.png` is the original square artwork on its olive field. It is the source file and is not used on the page.
- **Header band:** olive, 72px tall, logo left, a ghost "Join the waiting list" link right (cream text, cream hairline border, 40px tall, 44px on phones).
- **Hero scene:** `images/hero.webp` (1344x752) with `images/hero-phone.webp` (690x752) below 600px, in a `<picture>` with `fetchpriority="high"` and a descriptive alt. The headline "Put your name on a box" and the subline sit on the calm sky; the photo is never covered by a scrim or tint.
- **Packing slip (signup card):** the card with id `board`, max 760px wide. A "Ship to" header with the count line ("N names on the list", shown only from 5 names) on the right, a dashed tear line, then first name, email and "How often do you play?" in a `1fr 1.25fr 1.2fr` grid, then the consent checkbox beside the primary button. Field labels sit above the fields. The honeypot is off-screen.
- **Joined state:** the form is replaced by the queue-number marker (the large marker holding the number, or "In" when there is none), the visitor's first name in Instrument Serif, "Number N on the waiting list" in muted text, a confirmation line and a secondary "Send to a golf mate" button.
- **Ball marker (signature):** a small flat olive disc with a cream numeral and a thin sage inner ring, like a golf ball marker. It appears in exactly two places: as the "?" on the surprise line of the contents list, and as the large marker holding the queue number in the joined state. Nowhere else.
- **Contents list ("What's in the box"):** a card holding a table with a muted header row, ticks for golf balls and tees and accessories, and the "?" marker on the surprise line. On phones each row becomes a grid: icon left, item title, then its description.
- **Primary button:** olive, cream text, 48px tall, with a trailing arrow. Hover olive-deep on hover-capable fine pointers only; press scales to 0.98.
- **Secondary button:** raised cream, ink text, `line-2` border, 44px tall.
- **Steps ("Buying for a golfer?"):** three rows between `line-2` rules, each with a neutral numbered circle, an 18px title and a secondary line.
- **Footer:** olive, logo left, small sage text right with the first line in cream.
- **Messages:** validation and server errors appear under the slip in the error colour at 500 weight, and the invalid field gets an error border.

## Motion

- One curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover and press: 150ms on background, border and transform; press is `scale(0.98)`. Hover effects only on `(hover: hover) and (pointer: fine)`.
- Focus: input border and halo ease in over 150ms.
- Load: a single entrance. The headline, the subline and the slip rise 8px and fade in over 400ms, at 0, 60 and 120ms.
- Joining: the joined state fades in over 400ms.
- Errors: the slip nudges sideways once, 4px each way, over 240ms.
- Dock: slides up and away in 300ms.
- In-page links scroll smoothly.
- No loops, no scroll-triggered reveals, no pulsing.
- Reduced motion: animations off, transitions cut to 1ms, instant scrolling, no nudge and no fade on joining.

## Rasters

- **Hero:** `images/hero.webp` (1344x752) and `images/hero-phone.webp` (690x752) are a Higgsfield-generated scene saved in the repo: a closed kraft box tied with olive ribbon in a raked links bunker at first light, marram grass on the bank, haar over the dunes, a red flag on a distant green, and a calm pale sky in the upper left for the headline. To regenerate, generate the same scene again with Higgsfield, keep the olive ribbon and the empty sky, export a wide desktop crop and a tighter phone crop with the box centred as WebP under the same names, and update the `width` and `height` attributes in `index.html` if the sizes change.
- **Favicon and touch icon:** `favicon-32.png` (32x32) and `apple-touch-icon.png` (180x180) are the sage golfer cut from the logo, centred on a flat olive square. Regenerate them from `images/logo-square.png` when the logo changes.
- **Share image:** `og.png` (1200x630) is a 528px olive panel on the left holding `images/logo.png` (in a 408x120 box) above two centred lines in Instrument Sans 400 28/36px, cream at 80%: "Join the waiting list" and "Boxes before Christmas 2026". The right 672px shows `images/hero.webp` scaled to 630px tall and aligned right so the box sits right of centre. It is rendered from an HTML template with Playwright at 1200x630 and device scale 1, waiting for the fonts and images to decode before the screenshot. Regenerate it the same way when the logo, the hero or the launch wording changes.

## Do's and Don'ts

- Do follow the team's colours: olive, cream and sage, with the cream ramp and olive-ink text built from them.
- Do keep olive as the one accent. Use it for the band, the footer, the primary action, focus and the marker.
- Do keep the logo on olive only, whole and unaltered.
- Do keep the ball marker to the surprise line and the queue number.
- Do keep the hero photo as it is: no scrim or tint over it, only the alpha fades into the page.
- Don't put sage text on cream.
- Don't add red, gradients, glows, uppercase tracked labels, emoji or pulsing elements to the chrome.
- Don't add more serif than the headlines and the joined name.
- Don't show other people's names; only the visitor's own entry appears.
- Don't invent prices, dates, reviews or item lists. The launch wording is "before Christmas 2026".
- Don't put small labels above headings; headings stand on their own.
