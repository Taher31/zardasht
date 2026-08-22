import type { LanguageCode } from '../i18n';
import newsData from './news.json';

/**
 * Company news / blog posts.
 *
 * Content is managed through the admin panel (see admin/README-EXPORT.md).
 * This file no longer holds the posts directly — it reads them from
 * news.json, which the admin panel's export regenerates.
 */
export interface NewsPost {
  slug: string;
  date: string;
  image: string;
  featured?: boolean;
  title: Record<LanguageCode, string>;
  excerpt: Record<LanguageCode, string>;
  body: Record<LanguageCode, string[]>;
}

export const newsPosts: NewsPost[] = newsData as NewsPost[];

/** Posts newest-first, flattened to a single language. */
export const getNewsPosts = (lang: LanguageCode) =>
  [...newsPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post) => ({
      slug: post.slug,
      date: post.date,
      image: post.image,
      featured: Boolean(post.featured),
      title: post.title[lang] ?? post.title.en,
      excerpt: post.excerpt[lang] ?? post.excerpt.en,
      body: post.body[lang] ?? post.body.en,
    }));

/** Formats an ISO date for display — Persian and Arabic get their own calendars. */
export const formatNewsDate = (iso: string, lang: LanguageCode) =>
  new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
