# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🧩 Using this as a template

All of the labels and page copy live in `src/i18n.ts`. Update the `templateContent` object to swap in your brand name, contact info, and page text, then adjust the `languages` array or `defaultLang` as needed. The header and footer brand mark are generated from the `labels.brand` value, so your initials will render automatically.

## 🗺️ Adding a country to the Trade Map

Two files, in this order.

**1. `public/data/trade-countries.json`** — add an entry. The `country_code` must be
the ISO 3166-1 alpha-2 code, and must exist in `public/data/countries.geojson`
(check with `grep -o '"ISO3166-1-Alpha-2": "XX"' public/data/countries.geojson`):

```json
{
  "country_code": "IQ",
  "country_name": "Iraq",
  "capital": "Baghdad",
  "currency": "IQD - Iraqi dinar",
  "status": true,
  "notes": "Bitumen export destination, supplied against agreed specification and delivery terms.",
  "main_exports": ["Bitumen"],
  "main_imports": [],
  "compliance_notes": "Export documentation confirmed per shipment.",
  "page_slug": "iraq"
}
```

**2. `src/data/country-locale.ts`** — add the code to `names` and `notes` for `fa`,
`ar` and `ru`. English needs nothing; it falls back to the JSON above. If you used a
*new* commodity or compliance sentence, add that string to `items` / `compliance` too,
otherwise it renders in English on the translated pages.

That's it — `npm run build` then regenerates everything automatically:

- the country turns gold and becomes clickable on the world map;
- `/trade-map/<code>` detail pages are generated for all four languages;
- the mobile market cards and the "active countries" count update;
- the homepage "Active markets" counter re-derives itself from this JSON.

Set `"status": false` to keep a country in the file but hide it from the map.
