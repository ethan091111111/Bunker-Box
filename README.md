# Bunker Box Casino

A standalone casino-style **testnet and play-credit demo**. Original Bunker Box branding, Geist Sans, and Remix Icon throughout the interface. Includes the two supplied photos in the lobby.

## Run

Requires Node.js 20 or later. No install or build step is needed to run the website.

```sh
npm start
```

Open `http://localhost:8124`. ES modules need an HTTP server; do not open `index.html` directly with `file://`.

```sh
npm test
```

This runs 17 tests for game mathematics, stake/payout handling, network restrictions, transaction verification and confirmations.

## Games

- Mines: 25 tiles, selectable mine count, manual or automatic cash-out.
- Dice: selectable 5–95% win chance and exact roll threshold.
- Crash: preselected crash point, elapsed-time cash-out, 100× cap.
- Plinko: 8 independent bounces, two risk profiles, labelled payout bins.
- Coin Flip: heads/tails with a 1.94× winning payout.
- Roulette: 37 outcomes, red/black/green-zero bets.

Balances use integer hundredths of a demo credit. Stakes are deducted once per round. Browser cryptographic randomness chooses outcomes. Interrupting the page restores any unfinished demo stake on the next load. Results, favourites and balances are stored locally on this browser only.

## Test deposit setup

Free demo-credit top-ups work immediately. **On-chain deposits are disabled until a public Sepolia receiving address is provided.**

1. Put a dedicated, public Sepolia test address in `config.js` under `depositAddress`. Never put a private key or seed phrase in any file.
2. Serve the site over HTTPS or localhost.
3. Open Wallet → Crypto testnet in an Ethereum wallet browser, or a desktop browser with an injected EIP-1193 wallet.
4. Connect and switch to Ethereum Sepolia (chain ID `11155111`, hex `0xaa36a7`). The code independently enforces this chain even if other configuration changes.
5. Send a small test deposit. Allowed range is 0.0000001–0.1 Sepolia ETH. The wallet shows the actual recipient and amount for confirmation.
6. Press **Check pending deposit** until it has two confirmations. After successful receipt verification, the default rate is 100,000 demo credits per test ETH, so 0.001 test ETH gives 100 demo credits.

The verification checks chain ID, transaction hash, sender, recipient, exact amount, successful receipt, canonical block hash and confirmations. The same hash is credited at most once in the current browser's stored ledger. A pending hash persists across reloads. No RPC provider, API key, wallet secret or smart contract deployment is required; reads use the connected wallet provider.

**This is not a financial ledger or a production gambling system.** The local ledger and client-side outcomes are editable by users. Deduplication is local, not server-authoritative. There are no cash-value prizes, crypto withdrawals, automatic payouts, custodial accounts or real-money deposits. The receiving address can receive Sepolia test ETH; the UI only grants non-redeemable demo credits. Do not configure a mainnet or real-money product using this demo.

## Deployment

Upload this folder's contents into the website root. It runs on any static host. The included Vercel settings use the root directory with no build command. No environment variables are required.

GitHub writes to `ethan091111111/Bunker-Box` were rejected by the connected integration during this session. This ZIP has not been pushed or deployed. The existing live site has not been changed.

## Files

- `index.html`, `styles.css`, `app.js`: interface, game screens and orchestration.
- `engine.js`: random generation and game mathematics.
- `wallet.js`: Sepolia-only connection, transfer request and verification.
- `config.js`: public test deposit recipient and demo conversion settings.
- `assets/fonts`: locally bundled Geist Sans and Remix Icon fonts plus licenses.
- `assets/remix.css`: the Remix Icon glyphs used by this site.
- `assets/icon.svg`: unmodified Remix Icon `box-3-fill` icon.
- `tests`: Node test suite.
- `server.mjs`: small local static server.

Geist is distributed under the SIL Open Font License; Remix Icon is distributed under the bundled Remix Icon License. This project is independently branded and is not affiliated with Roobet.

## Verification limits

The game and wallet modules passed 17 tests with deterministic inputs and mocked wallet responses. DOM integration checks also exercised all six games, search, favourites, free top-ups, missing-wallet handling and disabled unconfigured deposits. Static asset delivery and font MIME types were checked. No test ETH was sent, because no receiving address was supplied. A real-wallet connection and visual checks across desktop/mobile browsers remain to be performed on a running deployment.
