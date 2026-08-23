# Zardasht Mahd Binaloud Trading

International commodity trading company website. Built with [Astro](https://astro.build) + Tailwind CSS, fully static, in four languages (English, Persian, Arabic, Russian — Persian and Arabic render right-to-left).

## 🧞 Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start the dev server at `localhost:4321`      |
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the production build locally          |
| `npm run astro check` | Type-check the project                      |

## 🚀 Project structure

```text
public/
├── data/
│   ├── trade-countries.json   ← Trade Map: the country roster (English content)
│   └── countries.geojson      ← world map shapes, used to validate country codes
├── images/                    ← all site photos (.webp)
└── scripts/                   ← trade-map.js, fx-rates.js (plain JS, not bundled)

src/
├── i18n.ts                    ← all UI labels + page copy, per language
├── config/contact.ts          ← WhatsApp number
├── data/
│   ├── contact.json           ← address / phone / email, per language
│   ├── products.json          ← product groups & items, per language
│   ├── news.json              ← news/blog posts (content lives here)
│   ├── news.ts                ← helpers that read news.json
│   └── country-locale.ts      ← Trade Map country names/notes in fa/ar/ru
├── components/                ← Header, Footer, ProductCard, CallButton
├── layouts/Layout.astro       ← shared page shell (SEO, fonts, header/footer)
└── pages/
    ├── [lang]/                ← the real pages (fa/ar/ru), e.g. [lang]/news.astro
    └── *.astro                ← thin English shims, e.g. news.astro → <Page lang="en" />
```

Every page exists twice: once as the real implementation under `src/pages/[lang]/`, and once as a one-line English shim at the matching path under `src/pages/`. When adding a new page, build it in `[lang]/` and add a shim that imports it with `lang="en"` — copy the pattern from an existing pair (e.g. `news.astro`).

## ✏️ Editing content

There is no admin panel or database — all content is plain files in the repo, edited directly and deployed via a normal `npm run build`.

### Brand, navigation labels, page copy

`src/i18n.ts`. One object per language (`en`, `fa`, `ar`, `ru`), each following the same `Translation` shape. Change a string in one language without touching the others.

### Products

`src/data/products.json`. One array per language; each entry is a commodity group (`id`, `badge`, `title`, `description`, `products: [...]`). Keep the same `id`s and array order across all four languages — the site matches groups across languages by position, not by `id`.

### Contact details

`src/data/contact.json` — address, phone, email, per language. The WhatsApp number is separate, in `src/config/contact.ts`.

### News / blog posts

`src/data/news.json` — a flat array, newest-first isn't required (the site sorts by `date`). Each post:

```json
{
  "slug": "unique-url-slug",
  "date": "2026-07-15",
  "image": "/images/02_bitumen.webp",
  "featured": true,
  "title": { "en": "...", "fa": "...", "ar": "...", "ru": "..." },
  "excerpt": { "en": "...", "fa": "...", "ar": "...", "ru": "..." },
  "body": { "en": ["paragraph one", "paragraph two"], "fa": [...], "ar": [...], "ru": [...] }
}
```

- `slug` becomes the URL: `/news/<slug>` (and `/fa/news/<slug>`, etc.).
- `featured: true` posts lead the homepage news strip (top 3; if fewer than 3 are featured, the newest others fill the row).
- Images go in `public/images/news/` (or reuse an existing image under `public/images/`).
- Delete a post by removing its object from the array — no other file references it.

### Trade Map countries

Two files, in this order.

**1. `public/data/trade-countries.json`** — add an entry. `country_code` must be the ISO 3166-1 **alpha-2** code (2 letters — not the 3-letter code), and must exist in `public/data/countries.geojson`:

```bash
grep -o '"ISO3166-1-Alpha-2": "XX"' public/data/countries.geojson
```

```json
{
  "country_code": "IQ",
  "country_name": "Iraq",
  "capital": "Baghdad",
  "currency": "IQD - Iraqi dinar",
  "status": true,
  "notes": "Bitumen, steel, and agricultural commodity exports to Iraqi buyers, based on agreed specification and delivery terms.",
  "main_exports": ["Bitumen", "Iron & steel products"],
  "main_imports": [],
  "compliance_notes": "Export and import documentation confirmed per shipment.",
  "page_slug": "iraq"
}
```

**2. `src/data/country-locale.ts`** — add the same code to `names` and `notes` under `fa`, `ar`, `ru`. English needs nothing; it falls back to the JSON above. If you used a *new* commodity or compliance sentence, add it to `items` / `compliance` too — otherwise it renders in English on the translated pages.

That's it — `npm run build` regenerates everything:

- the country turns gold and becomes clickable on the world map (filled with its actual flag);
- `/trade-map/<code>` detail pages are generated for all four languages;
- the mobile market cards, the homepage flag ring, and the "active markets" counter all update automatically.

Set `"status": false` to keep a country in the file but hide it from the map.

⚠️ Every field in a new country entry needs real data — the map has no fallback for a copy-pasted placeholder (wrong capital/currency/notes left over from another country).

## 🚢 Deploying

Static site, no server runtime required — works on Vercel, Netlify, Cloudflare Pages, or any static host.

Set the **`SITE_URL`** environment variable to your production domain (e.g. `https://www.zardasht-co.com`) before building — `astro.config.mjs` uses it to generate the sitemap, canonical URLs, and Open Graph tags. Without it, those are silently skipped.

```bash
npm run build   # outputs to ./dist/
```
