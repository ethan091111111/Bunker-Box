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
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
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
- Text selection is score red with white text; the caret is score red.

## Typography

- **Big Shoulders** (variable, self-hosted in `/fonts`) is the board lettering: tiles, section headings, buttons, the wordmark. Always uppercase, weight 800.
- **Barlow** (400/500/600) is the reading face for paragraphs and inputs.
- **Barlow Condensed 600** carries small uppercase labels: column headers, board header meta, field labels, table headers. Tracked 0.08 to 0.14em.
- Numerals are tabular everywhere.

## Layout

- Content width `min(1180px, 100% - 32px)`.
- The board is the first viewport: header band, board header strip, headline tiles with the lede beside them (stacked below 1000px), then the POS / NAME / STATUS entry row and the rest of the form. On desktop the submit button is visible without scrolling.
- Below 760px: headline tiles regroup into three rows, the STATUS column hides, the "What's in the box" table stacks each row, and the primary button goes full width.
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

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for arrivals. Press feedback 160ms.
- The one authored moment is plates slotting into the board: each plate drops about a third of its height into place out of a 3px blur, 520ms, staggered 28ms per plate and 220ms per row. The same motion posts the visitor's name and position after signup.
- Form errors nudge the board sideways once (260ms).
- Reduced motion: plates fade in without movement; the nudge is skipped.

## Do's and Don'ts

- Do keep plates flat and painted. Do use score red only for positions and the unknown.
- Do let the board carry the page; add new content as more boards or plain fairway text.
- Don't add photography or glossy product renders to the board world without a new direction.
- Don't show other people's names on the board; only the visitor's own entry appears.
- Don't invent prices, dates, reviews or item lists. The launch wording is "before Christmas 2026".
- Don't put small labels above headings; headings stand on their own.
