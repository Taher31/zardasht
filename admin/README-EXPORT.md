# Manual fallback: admin panel → website rebuild

When the admin folder is inside the Astro project, successful edits now update
the source JSON files and news images automatically. This manual ZIP workflow
is retained for backups, deployments where the source project is elsewhere,
or recovery if automatic publishing reports an error:

1. Log into `/admin`, click **Export** in the top nav, then **Download
   exports** — this downloads `site-content-export.zip`.
2. Extract the zip. It contains:
   - `news.json` → copy to `src/data/news.json` (overwrite)
   - `contact.json` → copy to `src/data/contact.json` (overwrite)
   - `products.json` → copy to `src/data/products.json` (overwrite)
   - `trade-countries.json` → copy to `public/data/trade-countries.json` (overwrite)
   - `country-locale.json` → copy to `src/data/country-locale.json` (overwrite)
   - `images/news/*` → copy any new files into `public/images/news/`
     (create that folder if it doesn't exist yet), then make sure the
     `image` field on the corresponding news post points at
     `/images/news/<filename>`
3. From the project root, run:
   ```bash
   npm run build
   ```
4. Spot-check the pages that changed, for every language (`en`, `fa`,
   `ar`, `ru`): `/news`, `/contact`, `/products`, `/trade-map`.
5. Upload the contents of `dist/` to cPanel as usual.

## One-time setup (already done in this repo)

`news.ts`, `i18n.ts` (contact + products blocks), and `country-locale.ts`
were changed once to read from the JSON files above instead of holding
content directly — see the plan/commit that introduced the admin panel.
You should never need to touch those files again for routine content
edits; only the JSON files change.

## Known data issue, not fixed by the admin panel

`trade-countries.json` had two bad rows before the admin panel existed —
`CN`/"Togo" and `VE`/"Venezuela" both carrying Uzbekistan's data (wrong
capital, currency, exports/imports, and both sharing the `uzbekistan` page
slug). They were seeded into the database as-is. Open **Trade map
countries** in the admin panel and either fix or delete those two rows —
they were almost certainly copy-paste leftovers, not real content.
