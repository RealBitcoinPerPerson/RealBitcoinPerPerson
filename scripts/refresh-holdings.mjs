// scripts/refresh-holdings.mjs
// Weekly refresh: pings public data sources and updates data/holdings.json.
// For now it only bumps the `last_updated` date, but it's wired so you
// can add ETF/country scrapers later without touching the workflow.
//
// Public companies are NOT updated here — the frontend fetches them
// live from CoinGecko on every page load.
//
// Run: `node scripts/refresh-holdings.mjs`

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("data/holdings.json");
const raw = fs.readFileSync(FILE, "utf8");
const data = JSON.parse(raw);

// --- Hook: add ETF scrapers here --------------------------------------
// Example stub (commented until you find a stable free source):
//
// async function fetchFarsideETFs() {
//   const r = await fetch("https://farside.co.uk/bitcoin-etf-flow-all-data/");
//   const html = await r.text();
//   // parse cumulative totals per ticker…
//   return [{ name: "BlackRock iShares (IBIT)", btc: 615000 }, ...];
// }
// const etfs = await fetchFarsideETFs();
// if (etfs?.length) data.entities.etf = etfs;

// Always bump the timestamp so the footer stays honest
const today = new Date().toISOString().slice(0,10);
data.last_updated = today;

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Updated holdings.json → last_updated=${today}`);
