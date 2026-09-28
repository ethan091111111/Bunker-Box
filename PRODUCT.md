# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences in equal measure:

- Golfers buying for themselves: regular club golfers who get through balls and tees and enjoy a surprise.
- Gift buyers: people buying for a golfer for birthdays, Father's Day and Christmas.

Both arrive on the waiting-list page, usually on a phone from a shared link.

## Product Purpose

Bunker Box sells golf mystery boxes: each box holds golf balls, tees, accessories and at least one surprise item. The site exists to collect a waiting list before launch. Success is people joining the list.

## Positioning

The surprise is the product: nobody knows exactly what is inside until they open it, and every box is different.

## Operating Context

Boxes go on sale before Christmas 2026. Until then the only action is joining the waiting list (first name, email, optional "how often do you play", consent). Signups are stored in Upstash Redis when configured and emailed to the team via Resend.

## Capabilities and Constraints

- Static `index.html` plus Vercel serverless functions in `api/` (`join.js`, `export.js`). No build step.
- The signup form fields, consent wording, honeypot and `/api/join` contract must keep working.
- Undecided: price, exact launch date, the exact item list. Do not show any of these.

## Brand Commitments

- Name: Bunker Box.
- Bunker Box is a Young Enterprise company run by a team of S5 pupils at George Watson's College, Edinburgh. The site says so.
- Launch timing wording: "before Christmas 2026".

## Evidence on Hand

- One Higgsfield-generated hero image of a black box with a lime ribbon in a bunker (hosted on Higgsfield's CDN, referenced by URL in `index.html`).
- No testimonials, customers, reviews, press, prices or item lists exist. Never invent them.

## Product Principles

1. The mystery is the draw: show enough to excite, never spoil what is inside.
2. Speak to the gift buyer and the golfer with equal weight.
3. Joining the list must be effortless on a phone.
4. Only state what is true.
