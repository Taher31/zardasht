// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// astro.config.mjs runs before Astro's own env loading, so `.env` isn't
// merged into `process.env` yet here — load it explicitly (falls back to a
// real shell-level SITE_URL, e.g. one set by a host's build environment).
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || SITE_URL,
  // honour a PORT assigned by the harness/tooling; falls back to Astro's default
  server: { port: Number(process.env.PORT) || 4321 },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fa: 'fa',
          ar: 'ar',
          ru: 'ru',
        },
      },
    }),
  ],
});
