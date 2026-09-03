/**
 * Presentation data for the five commodity groups, keyed by the ids in
 * products.json.
 *
 * Lives here rather than inside a page because three places need it: the
 * /products hub, each /products/<group> page, and the header menu. Keeping one
 * copy is what stops a group getting a new photo in the menu but not on its
 * own page.
 *
 * Copy (title, description, the four offerings) is not here — that is
 * translated content and belongs in i18n / products.json.
 */

export interface GroupAccent {
  /** Sequence label shown as a quiet ordinal on the hub. */
  code: string;
  /** Short uppercase note above the group title. */
  note: string;
  image: string;
  video?: string;
}

export const groupAccents: Record<string, GroupAccent> = {
  'energy-bitumen': {
    code: '01',
    note: 'EB',
    image: '/images/02_bitumen.webp',
    video: '/video/02_bitumen.mp4',
  },
  'metals-steel': {
    code: '02',
    note: 'MS',
    image: '/images/03_metals_steel.webp',
  },
  'agricultural-commodities': {
    code: '03',
    note: 'AG',
    image: '/images/04_agricultural_grain.webp',
    video: '/video/04_agricultural_grain.mp4',
  },
  'textile-raw-materials': {
    code: '04',
    note: 'TX',
    image: '/images/05_textile_yarn.webp',
  },
  'chemicals-petrochemicals': {
    code: '05',
    note: 'CP',
    // Bagged goods on pallets — how polymer grades and dry chemicals actually ship.
    image: '/images/08_warehouse_logistics.webp',
  },
};

export const groupFallbackImage = '/images/06_road_logistics_truck.webp';

/** Root-relative path for a group, before the language prefix is applied. */
export const groupPath = (id: string) => `/products/${id}`;
