// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
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
