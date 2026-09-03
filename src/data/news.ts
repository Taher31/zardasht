import type { LanguageCode } from '../i18n';
import newsData from './news.json';

/**
 * Company news / blog posts.
 *
 * Content lives in news.json (same folder). Edit that file directly to add,
 * change, or remove a post — see the shape of NewsPost below for the fields
 * each entry needs (title/excerpt/body must have all four languages).
 */
export interface NewsPost {
  slug: string;
  date: string;
  image: string;
  featured?: boolean;
  /**
   * 'news' is a dated company item (a visit, a delegation); 'guide' is an
   * evergreen explainer. The distinction drives the schema.org type — Google
   * reserves NewsArticle for news, and an explainer that stays true for years
   * should declare Article instead.
   */
  kind?: 'news' | 'guide';
  /**
   * Internal links shown under the article. `href` is a path without the
   * language prefix — the page adds it — so one entry serves all four locales.
   */
  links?: { href: string; label: Record<LanguageCode, string> }[];
  title: Record<LanguageCode, string>;
  excerpt: Record<LanguageCode, string>;
  body: Record<LanguageCode, string[]>;
  /**
   * What the cover photo shows, for anyone hearing the page read aloud.
   * Optional and usually absent: on the listing cards the headline sits right
   * beside the image, so describing it there would just be read twice. It is
   * used on the article page, where the photo stands on its own.
   */
  imageAlt?: Partial<Record<LanguageCode, string>>;
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
      kind: post.kind ?? 'news',
      links: (post.links ?? []).map((link) => ({
        href: link.href,
        label: link.label[lang] ?? link.label.en,
      })),
      title: post.title[lang] ?? post.title.en,
      excerpt: post.excerpt[lang] ?? post.excerpt.en,
      body: post.body[lang] ?? post.body.en,
      imageAlt: post.imageAlt?.[lang] ?? post.imageAlt?.en ?? '',
    }));

/** Formats an ISO date for display — Persian and Arabic get their own calendars. */
export const formatNewsDate = (iso: string, lang: LanguageCode) =>
  new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
