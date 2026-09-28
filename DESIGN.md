---
name: Bunker Box
description: A hand-operated tournament leaderboard on a mown fairway, used as a waiting list.
colors:
  turf: "#1d5a37"
  turf-stripe: "#21633d"
  turf-deep: "#123d27"
  turf-ink: "#0b2718"
  board: "#f4f5f0"
  plate: "#fbfcf8"
  slot: "#dfe3da"
  rule: "#c9cec2"
  ink: "#111512"
  ink-soft: "#4a5249"
  score-red: "#c4122f"
  on-turf: "#f1f6ef"
  on-turf-soft: "#c3dccb"
  putting-green: "#2b7a4b"
  field-border: "#b9bfb1"
  placeholder: "#636b61"
  placeholder-display: "#6f776c"
  focus-ring: "#ffd84d"
typography:
  display:
    fontFamily: "Big Shoulders, Barlow Condensed, sans-serif"
    fontSize: "clamp(40px, 6vw, 76px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  plate:
    fontFamily: "Big Shoulders, Barlow Condensed, sans-serif"
    fontSize: "calc(tile height * 0.8)"
    fontWeight: 800
    lineHeight: 1
  title:
    fontFamily: "Big Shoulders, Barlow Condensed, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "0.03em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  body-large:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  mark: "2px"
  plate: "3px"
  board: "4px"
spacing:
  gutter: "16px"
  board-pad: "clamp(14px, 3vw, 40px)"
  section: "clamp(56px, 8vw, 104px)"
components:
  button-post:
    backgroundColor: "{colors.turf-deep}"
    textColor: "#ffffff"
    typography: "{typography.display}"
    rounded: "{rounded.plate}"
    padding: "18px 30px"
  button-post-hover:
    backgroundColor: "{colors.turf-ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
  tile:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.plate}"
    rounded: "{rounded.plate}"
  tile-gap:
    backgroundColor: "{colors.slot}"
  tile-score:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.score-red}"
  button-dock:
    backgroundColor: "{colors.board}"
    textColor: "{colors.turf-deep}"
    typography: "{typography.display}"
    rounded: "{rounded.plate}"
    padding: "16px"
  button-cta:
    backgroundColor: "{colors.board}"
    textColor: "{colors.turf-deep}"
    typography: "{typography.display}"
    rounded: "{rounded.plate}"
    padding: "18px 26px 18px 30px"
  input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.plate}"
    height: "52px"
---

# Bunker Box design system

## Overview

The Tournament Leaderboard. The waiting list is a painted scoreboard standing on a mown fairway: flat white plates slotted into a board, black condensed lettering, red numerals for positions. Joining is getting your name posted on the board. There is no photography; the board is the image. The mood is a golf club on tournament day: public, legible, a little theatrical, never luxurious.

## Colors

- **Fairway (turf, turf-stripe):** the page field. Two greens in 160px vertical bands, like mowing stripes. Green owns most of the page.
- **Board frame (turf-deep, turf-ink):** header bands, board frames, primary buttons, footer.
- **Painted board (board, plate, slot, rule):** the white board, the individual plates, empty slots, and thin column rules.
- **Ink (ink, ink-soft):** lettering on the board and secondary copy on white.
- **Score red (score-red):** positions and the mystery mark only. Never decorative.
- **On turf (on-turf, on-turf-soft):** headings and body text on the fairway. Secondary text is tinted green, never gray.
- Field borders use field-border; placeholders use placeholder (placeholder-display in the name slot).
- The putting green in the last section is putting-green.
- Keyboard focus is a 3px focus-ring outline on the fairway and turf-deep on the white board.
- Text selection is score red with white text; the caret is score red.

## Typography

- **Big Shoulders** (variable, self-hosted in `/fonts`) is the board lettering: tiles, section headings, buttons, the wordmark. Always uppercase, weight 800.
- **Barlow** (400/500/600) is the reading face for paragraphs and inputs.
- **Barlow Condensed 600** carries small uppercase labels: column headers, board header meta, field labels, table headers. Tracked 0.08 to 0.14em.
- Numerals are tabular everywhere.

## Layout

- Content width `min(1180px, 100% - 32px)`.
- The board is the first viewport: header band, board header strip, headline tiles with the lede beside them (stacked below 1000px), then the POS / NAME / STATUS entry row and the rest of the form. On desktop the submit button is visible without scrolling.
- Below 760px: headline tiles regroup into three rows sized to fill the board width, the STATUS column hides, the "What's in the box" table stacks each row, buttons go full width, mowing stripes narrow to 72px, and a dock with "Post my name" appears at the bottom of the screen once the form has scrolled away (hidden again near the last call to action, and after joining).
- Safe-area insets are respected at the top band, the dock and the footer.
- Sections on the fairway are separated by generous vertical space (`section` spacing); boards sit inside that rhythm.

## Elevation & Depth

- Boards: a large soft drop shadow (`0 30px 60px -24px`) plus a closer one, suggesting a board standing proud of the grass.
- Plates: one small soft shadow (`0 2px 3px -1px`). Plates are flat painted surfaces; no gradients, bevels or highlights.
- Empty slots are recessed with a soft inset shadow.
- Buttons carry a soft blurred shadow. No hard offset shadows.

## Shapes

- Plates and controls: 3px corners. Board frames: 10px solid turf-ink border (6px on phones), 4px corners.
- Rules are 1px (`rule`), with a 2px ink rule under column headers.

## Components

- **Tile:** one character per plate, width 0.78 × height. Spaces render as recessed `tile-gap` slots. Score tiles use score red.
- **Entry row:** POS tile, a large name input set in board lettering, STATUS text. After signup the input is replaced by the visitor's name in tiles and the POS by their queue number.
- **Post button:** turf-deep, board lettering, presses to `scale(0.97)`; hover darkens only on hover-capable pointers.
- **Outline button:** ink border, label type; fills ink on hover.
- **Table:** a board with a turf-deep header row and ruled rows; the mystery row is set in score red.

## Motion

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for arrivals. Press feedback 160ms (`scale(0.97)`). Hover effects only on hover-capable pointers.
- The motion material is a plate dropping into its slot: about a third of its height, out of a 3px blur. Everything else is built from it:
  - Load: headline plates slot in, 520ms, 28ms per plate, 220ms per row.
  - Typing: each letter of the name appears as a plate as it is typed (240ms, 24ms stagger); a dashed empty plate with a blinking red bar marks the cursor. Plates shrink to fit long names.
  - The unknown: the red "?" plates (headline and the surprise row) periodically swap through random letters before settling back on "?". Only while visible and the tab is active.
  - Joining: the name plates seat with a small press wave, then the red position plates slot in, then the status and confirmation fade up out of a blur.
- Scroll: section headings rise out of a clip (800ms), paragraphs and rows fade up out of a 4px blur with short staggers, ticks stamp onto the scorecard, step numbers slot in as red plates.
- The putt: when the last section is in view, a ball rolls across the green and drops into the cup, the flag flutters and the call-to-action button gives one small pulse. Runs once.
- The board nudges sideways once on a form error (260ms). The dock slides up in 320ms and away in 220ms.
- Reduced motion: plates fade without movement, reveals are instant, the cursor stops blinking, the ball is already holed, no shuffles, no nudge.

## Rasters

- `og.png` (1200x630 share preview), `apple-touch-icon.png` (180) and `favicon-32.png` (32) are rendered from an HTML template of the board in the site's own fonts and colours, using a headless browser. Regenerate them the same way when the board changes; do not replace them with photography.

## Do's and Don'ts

- Do keep plates flat and painted. Do use score red only for positions and the unknown.
- Do let the board carry the page; add new content as more boards or plain fairway text.
- Don't add photography or glossy product renders to the board world without a new direction.
- Don't show other people's names on the board; only the visitor's own entry appears.
- Don't invent prices, dates, reviews or item lists. The launch wording is "before Christmas 2026".
- Don't put small labels above headings; headings stand on their own.
