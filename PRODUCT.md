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

Boxes go on sale before Christmas 2026. Until then the only action is joining the waiting list (first name, email, optional "how often do you play", consent). Signups are stored as contacts in the Resend "Waiting list" segment (Upstash Redis is optional and also stores them when configured). Each signup sends an alert email to the team via Resend, at the address in the `NOTIFY_EMAIL` setting. Welcome emails to people who join start once the sending domain mail.bunkerbox.uk is verified in Resend.

## Capabilities and Constraints

- Static `index.html` plus Vercel serverless functions in `api/` (`join.js`, `export.js`). No build step.
- The signup form fields, consent wording, honeypot and `/api/join` contract must keep working.
- Undecided: price, exact launch date, the exact item list. Do not show any of these.

## Brand Commitments

- Name: Bunker Box.
- Logo and colours supplied by the team: the Bunker Box logo (cream serif wordmark with a sage woman golfer, on olive) and the colour scheme olive `#3c492b`, cream `#f7f2e5` and sage `#b9b88e`. Follow them.
- Tagline: "A little mystery, a lot of golf".
- Bunker Box is a Young Enterprise company run by a team of S5 pupils at George Watson's College, Edinburgh. The site says so.
- Launch timing wording: "before Christmas 2026".

## Evidence on Hand

- The supplied logo, with its tagline "A little mystery, a lot of golf": `images/logo.png` (cut out, for olive surfaces) and `images/logo-square.png` (the original artwork).
- One Higgsfield-generated hero image of a kraft box tied with olive ribbon in a links bunker at first light, saved in the repo as `images/hero.webp` and `images/hero-phone.webp`. The old reference to an image on Higgsfield's CDN is gone; nothing is hot-linked.
- No testimonials, customers, reviews, press, prices or item lists exist. Never invent them.

## Product Principles

1. The mystery is the draw: show enough to excite, never spoil what is inside.
2. Speak to the gift buyer and the golfer with equal weight.
3. Joining the list must be effortless on a phone.
4. Only state what is true.
