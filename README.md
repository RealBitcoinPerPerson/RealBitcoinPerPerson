# realbitcoinperperson.com

Bitcoin per person, but subtract the coins held by corporations, countries, ETFs, and lost wallets.

## File layout

```
index.html                      # the whole site (single file)
og-image.png                    # 1200x630 social preview
data/holdings.json              # editable snapshot of ETF/country/private/lost holdings
scripts/refresh-holdings.mjs    # weekly refresh script (runs in GitHub Actions)
.github/workflows/refresh.yml   # weekly cron that runs the script
```

## How the data works

Three tiers:

1. **Live (no action needed)** — Public company holdings are pulled on every page load from CoinGecko's public-treasury endpoint. Strategy, Marathon, Metaplanet, Tesla, etc. update daily automatically.
2. **Auto-bumped weekly** — A GitHub Action runs every Monday and updates the `last_updated` timestamp in `data/holdings.json`. You can extend the script to actually scrape new ETF/country data later.
3. **Manual edits** — When you see news ("BlackRock crossed 700k BTC", "Bhutan added 5k", etc.), edit `data/holdings.json` directly on GitHub:
   - Go to the repo → click `data/holdings.json` → pencil icon
   - Change the number → commit
   - Site updates next time anyone loads the page

## Updating holdings manually

Open `data/holdings.json` in the GitHub web UI. The structure is self-explanatory:

```json
{
  "entities": {
    "etf": [ { "name": "...", "btc": 612000 } ],
    "country": [ ... ],
    "private": [ ... ],
    "lost": [ ... ]
  }
}
```

Public companies aren't in here — those come from CoinGecko. Don't try to add them here or you'll get duplicates.

## Good sources for updating

- **ETFs** — [farside.co.uk/btc/](https://farside.co.uk/btc/) (cumulative flows)
- **Countries** — Arkham Intelligence, news coverage of seizures, [treasuries.bitbo.io](https://treasuries.bitbo.io/)
- **Private cos.** — SEC filings, X disclosures
- **Public cos.** — handled automatically, no action

## Local dev

```bash
# just serve the folder
python3 -m http.server 8000
open http://localhost:8000
```

## License

MIT. Fork it, ship your own version.
