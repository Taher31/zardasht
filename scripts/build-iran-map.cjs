/**
 * Generates the Iran outline + customs-post coordinates for the trade map page.
 *
 * The outline is derived from the same Natural Earth data the world map already
 * uses (public/data/countries.geojson), so the two maps agree. Everything is
 * projected once here, at build-authoring time, and written out as plain SVG
 * path data - the page then needs no projection code and no mapping library.
 */
const fs = require('fs');

const VB = { w: 1000, h: 760 };
const PAD = 26;

const g = JSON.parse(fs.readFileSync('public/data/countries.geojson', 'utf8'));
const iran = g.features.find((f) => f.properties?.['ISO3166-1-Alpha-2'] === 'IR');
const polys =
  iran.geometry.type === 'Polygon' ? [iran.geometry.coordinates] : iran.geometry.coordinates;

// Drop the specks (Gulf islands with 4-point rings) - at this size they render
// as dirt rather than islands. Keep any ring with real shape to it.
const rings = polys.map((p) => p[0]).filter((r) => r.length >= 10);

const lons = rings.flat().map((c) => c[0]);
const lats = rings.flat().map((c) => c[1]);
// Pad the frame outward so there is open water around the coast for the
// Persian Gulf / Caspian labels to sit in, instead of them being clipped or
// forced onto the land.
const PAD_DEG = 1.6;
const minLon = Math.min(...lons) - PAD_DEG, maxLon = Math.max(...lons) + PAD_DEG;
const minLat = Math.min(...lats) - PAD_DEG, maxLat = Math.max(...lats) + PAD_DEG;

/**
 * Equirectangular, with longitude squeezed by cos(mid-latitude). At Iran's
 * ~32°N that keeps the country from looking stretched sideways, and is far
 * simpler than a real projection for a single country at this scale.
 */
const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
const lonScale = Math.cos(midLat);

const spanX = (maxLon - minLon) * lonScale;
const spanY = maxLat - minLat;
const scale = Math.min((VB.w - PAD * 2) / spanX, (VB.h - PAD * 2) / spanY);
const offX = (VB.w - spanX * scale) / 2;
const offY = (VB.h - spanY * scale) / 2;

const project = (lon, lat) => [
  offX + (lon - minLon) * lonScale * scale,
  offY + (maxLat - lat) * scale, // SVG y grows downward
];

const r2 = (n) => Math.round(n * 10) / 10;

const toPath = (ring) =>
  ring
    .map(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      return `${i === 0 ? 'M' : 'L'}${r2(x)} ${r2(y)}`;
    })
    .join('') + 'Z';

const outline = rings.map(toPath).join('');

/**
 * Neighbouring countries, drawn faintly behind Iran so the map reads as a
 * region rather than a shape floating in a void. Their rings are decimated
 * hard (they are context, not data) and everything outside the frame is left
 * to an SVG clipPath rather than being trimmed here.
 */
const NEIGHBOURS = ['TR', 'IQ', 'SY', 'AZ', 'AM', 'GE', 'TM', 'AF', 'PK', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'KZ', 'UZ', 'RU'];

// Drop points that sit within `eps` degrees of the previously kept one. At this
// zoom a neighbour's coastline detail is invisible, so this cuts the payload by
// roughly an order of magnitude with no visible change.
const decimate = (ring, eps) => {
  const out = [ring[0]];
  for (const p of ring) {
    const q = out[out.length - 1];
    if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= eps) out.push(p);
  }
  if (out.length < 4) return null;
  return out;
};

// Only keep rings with a chance of touching the frame.
const FRAME = { minLon: minLon - 6, maxLon: maxLon + 6, minLat: minLat - 6, maxLat: maxLat + 6 };
const touchesFrame = (ring) =>
  ring.some(([x, y]) => x > FRAME.minLon && x < FRAME.maxLon && y > FRAME.minLat && y < FRAME.maxLat);

const neighbours = NEIGHBOURS.map((code) => {
  const f = g.features.find((x) => x.properties?.['ISO3166-1-Alpha-2'] === code);
  if (!f) return null;
  const ps = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const paths = ps
    .map((poly) => poly[0])
    .filter((r) => r.length >= 8 && touchesFrame(r))
    .map((r) => decimate(r, 0.22))
    .filter(Boolean)
    .map(toPath);
  return paths.length ? { code, d: paths.join('') } : null;
}).filter(Boolean);

/**
 * Customs posts. Coordinates are the towns the posts sit at; `kind` drives the
 * marker shape so a reader can tell a seaport from a land crossing at a glance.
 * The set is weighted toward the routes this company actually runs - Central
 * Asia, Russia and the Gulf - rather than being an exhaustive national list.
 */
const CUSTOMS = [
  // --- Sea ports -----------------------------------------------------------
  { id: 'bandar-abbas',  lon: 56.28, lat: 27.19, kind: 'sea' },
  { id: 'khorramshahr',  lon: 48.17, lat: 30.44, kind: 'sea' },
  { id: 'imam-khomeini', lon: 49.08, lat: 30.42, kind: 'sea' },
  { id: 'abadan',        lon: 48.30, lat: 30.34, kind: 'sea' },
  { id: 'bushehr',       lon: 50.84, lat: 28.92, kind: 'sea' },
  { id: 'genaveh',       lon: 50.51, lat: 29.58, kind: 'sea' },
  { id: 'lengeh',        lon: 54.88, lat: 26.55, kind: 'sea' },
  { id: 'qeshm',         lon: 55.98, lat: 26.95, kind: 'sea' },
  { id: 'chabahar',      lon: 60.64, lat: 25.29, kind: 'sea' },
  { id: 'anzali',        lon: 49.46, lat: 37.47, kind: 'sea' },
  { id: 'amirabad',      lon: 53.38, lat: 36.85, kind: 'sea' },
  { id: 'noshahr',       lon: 51.50, lat: 36.65, kind: 'sea' },

  // --- Land borders --------------------------------------------------------
  // Turkey
  { id: 'bazargan',      lon: 44.38, lat: 39.38, kind: 'land' },
  { id: 'razi',          lon: 44.05, lat: 38.92, kind: 'land' },
  { id: 'sero',          lon: 44.60, lat: 37.72, kind: 'land' },
  // Azerbaijan / Armenia
  { id: 'astara',        lon: 48.87, lat: 38.43, kind: 'land' },
  { id: 'bilesavar',     lon: 48.35, lat: 39.38, kind: 'land' },
  { id: 'jolfa',         lon: 45.63, lat: 38.94, kind: 'land' },
  { id: 'nordooz',       lon: 46.18, lat: 38.89, kind: 'land' },
  // Turkmenistan
  { id: 'sarakhs',       lon: 61.16, lat: 36.54, kind: 'land' },
  { id: 'incheh-borun',  lon: 54.73, lat: 37.63, kind: 'land' },
  { id: 'bajgiran',      lon: 58.42, lat: 37.60, kind: 'land' },
  { id: 'lotfabad',      lon: 59.34, lat: 37.53, kind: 'land' },
  // Afghanistan
  { id: 'dogharoun',     lon: 60.90, lat: 34.66, kind: 'land' },
  { id: 'mahirud',       lon: 60.32, lat: 32.62, kind: 'land' },
  { id: 'milak',         lon: 61.42, lat: 31.02, kind: 'land' },
  // Pakistan
  { id: 'mirjaveh',      lon: 61.43, lat: 29.01, kind: 'land' },
  { id: 'rimdan',        lon: 61.60, lat: 25.60, kind: 'land' },
  // Iraq
  { id: 'shalamcheh',    lon: 48.03, lat: 30.46, kind: 'land' },
  { id: 'chazabeh',      lon: 47.65, lat: 31.65, kind: 'land' },
  { id: 'mehran',        lon: 46.16, lat: 33.12, kind: 'land' },
  { id: 'khosravi',      lon: 45.82, lat: 34.36, kind: 'land' },
  { id: 'parviz-khan',   lon: 45.87, lat: 34.18, kind: 'land' },
  { id: 'bashmaq',       lon: 45.75, lat: 35.75, kind: 'land' },
  { id: 'tamarchin',     lon: 45.02, lat: 36.70, kind: 'land' },

  // --- Inland clearance and airports --------------------------------------
  { id: 'tehran',        lon: 51.39, lat: 35.69, kind: 'air' },
  { id: 'mashhad',       lon: 59.61, lat: 36.30, kind: 'air' },
  { id: 'isfahan',       lon: 51.67, lat: 32.65, kind: 'air' },
  { id: 'tabriz',        lon: 46.29, lat: 38.08, kind: 'air' },
  { id: 'shiraz',        lon: 52.53, lat: 29.59, kind: 'air' },
  { id: 'yazd',          lon: 54.37, lat: 31.90, kind: 'air' },
];

/**
 * Natural Earth's outline is simplified, so a post that genuinely sits on the
 * border - or on a jetty a few hundred metres offshore - can land outside the
 * drawn polygon and read as if it were in the neighbouring country. Any point
 * that falls outside gets pulled to the nearest point on the drawn coast and
 * then a hair inland, so every marker sits on the landmass the reader sees.
 * The correction is only ever a few kilometres and never moves a post past
 * another one.
 */
function pointInRings(lon, lat) {
  let inside = false;
  for (const ring of rings) {
    let c = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
    }
    if (c) inside = !inside;
  }
  return inside;
}

function nearestOnCoast(lon, lat) {
  let best = null;
  let bestD = Infinity;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ax, ay] = ring[j];
      const [bx, by] = ring[i];
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((lon - ax) * dx + (lat - ay) * dy) / len2));
      const px = ax + t * dx;
      const py = ay + t * dy;
      const d = Math.hypot(lon - px, lat - py);
      if (d < bestD) {
        bestD = d;
        best = [px, py];
      }
    }
  }
  return { point: best, dist: bestD };
}

const CENTROID = [53.7, 32.4]; // roughly central Iran, used only as an inward direction
const snapped = [];
function place(c) {
  if (pointInRings(c.lon, c.lat)) return { lon: c.lon, lat: c.lat };
  const { point, dist } = nearestOnCoast(c.lon, c.lat);
  // Step inland from the coast point, more for inland border posts than for
  // ports - a port should still read as sitting on the water's edge.
  const step = c.kind === 'sea' ? 0.03 : 0.09;
  const vx = CENTROID[0] - point[0];
  const vy = CENTROID[1] - point[1];
  const vlen = Math.hypot(vx, vy) || 1;
  const lon = point[0] + (vx / vlen) * step;
  const lat = point[1] + (vy / vlen) * step;
  snapped.push({ id: c.id, km: Math.round(dist * 111) });
  return { lon, lat };
}

const points = CUSTOMS.map((c) => {
  const at = place(c);
  const [x, y] = project(at.lon, at.lat);
  return { id: c.id, kind: c.kind, x, y, x0: x, y0: y };
});

/**
 * Displacement pass. A few posts are genuinely within a dozen kilometres of
 * each other - Khorramshahr and Shalamcheh are ~14km apart, and at this scale
 * that is five pixels, so they render as one blob and neither can be hovered.
 * Standard cartographic practice: push the colliding markers apart just far
 * enough to be separately readable, and cap how far any one is allowed to
 * travel so the map stays honest. The list below the map carries the real
 * geography; these markers only have to be findable.
 */
// The drawn halo has r=13, so two markers need at least 26 units between
// centres before their halos stop touching; 21 (the previous value) left
// several pairs visibly merged into one blob at rest, not just on hover.
const MIN_SEP = 30;
const MAX_SHIFT = 24;
for (let pass = 0; pass < 200; pass++) {
  let moved = false;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d = Math.hypot(dx, dy);
      if (d >= MIN_SEP) continue;
      if (d < 0.001) {
        dx = 1;
        dy = 0;
        d = 1;
      }
      const push = (MIN_SEP - d) / 2 + 0.05;
      const ux = (dx / d) * push;
      const uy = (dy / d) * push;
      a.x -= ux;
      a.y -= uy;
      b.x += ux;
      b.y += uy;
      moved = true;
    }
  }
  // Rein each marker back inside its allowance every pass, so the cap holds
  // rather than being checked once at the end.
  for (const p of points) {
    const dx = p.x - p.x0;
    const dy = p.y - p.y0;
    const d = Math.hypot(dx, dy);
    if (d > MAX_SHIFT) {
      p.x = p.x0 + (dx / d) * MAX_SHIFT;
      p.y = p.y0 + (dy / d) * MAX_SHIFT;
    }
  }
  if (!moved) break;
}

const shifts = points
  .map((p) => ({ id: p.id, d: Math.hypot(p.x - p.x0, p.y - p.y0) }))
  .filter((s) => s.d > 0.5)
  .sort((a, b) => b.d - a.d);

for (const p of points) {
  p.x = r2(p.x);
  p.y = r2(p.y);
  delete p.x0;
  delete p.y0;
}

// Label anchors for the two bodies of water, placed by eye in projected space.
const [pgx, pgy] = project(51.3, 27.4);   // Persian Gulf
const [omx, omy] = project(59.0, 24.2);   // Gulf of Oman - sits below the bbox
const [csx, csy] = project(51.5, 39.0);   // Caspian Sea

/**
 * Neighbour names.
 *
 * Placing these by eye went badly: an anchor near the border ends up under
 * Iran's opaque outline (the labels are drawn beneath it) and renders half-cut.
 * Simply maximising the distance from Iran went badly too - that pushes every
 * name into a corner of the frame, so they line up along the edges instead of
 * sitting in their countries.
 *
 * So each name goes at the pole of inaccessibility of the country's *visible*
 * area, tested against the label's actual drawn rectangle rather than against
 * a bare point: an anchor that is merely far from a marker can still put a
 * wide word on top of it, since the word extends a long way to either side of
 * its anchor. The four languages render at very different widths for the same
 * country (Cyrillic "Turkmenistan" draws about twice as wide as its Persian
 * equivalent), so the rectangle used here is sized from the widest string
 * that actually appears in the data - see LG.halfW etc. below - rather than
 * per-language, so the same geometry is safe in all four.
 *
 * Two sizes are tried: the full size first, and if a country's visible area
 * has no room for that, the smaller size (for a narrow band like Azerbaijan's
 * or the UAE's, which can hold a short name set smaller but not a wide one).
 * A country with room for neither is dropped rather than crammed in.
 */
const NEIGHBOUR_LABEL_COUNTRIES = [
  { id: 'turkey', code: 'TR' },
  { id: 'iraq', code: 'IQ' },
  { id: 'turkmenistan', code: 'TM' },
  { id: 'afghanistan', code: 'AF' },
  { id: 'pakistan', code: 'PK' },
  { id: 'saudi', code: 'SA' },
  { id: 'azerbaijan', code: 'AZ' },
  { id: 'armenia', code: 'AM' },
  { id: 'uae', code: 'AE' },
  { id: 'oman', code: 'OM' },
  { id: 'kuwait', code: 'KW' },
  { id: 'qatar', code: 'QA' },
];

function toSegments(ringList) {
  const segs = [];
  for (const ring of ringList) {
    let prev = project(ring[0][0], ring[0][1]);
    for (let i = 1; i < ring.length; i++) {
      const cur = project(ring[i][0], ring[i][1]);
      // Only segments anywhere near the frame can ever be the nearest one.
      if (
        Math.min(prev[0], cur[0]) < VB.w + 300 &&
        Math.max(prev[0], cur[0]) > -300 &&
        Math.min(prev[1], cur[1]) < VB.h + 300 &&
        Math.max(prev[1], cur[1]) > -300
      ) {
        segs.push([prev[0], prev[1], cur[0], cur[1]]);
      }
      prev = cur;
    }
  }
  return segs;
}

function distToSegs(x, y, segs) {
  let best = Infinity;
  for (let i = 0; i < segs.length; i++) {
    const ax = segs[i][0];
    const ay = segs[i][1];
    const dx = segs[i][2] - ax;
    const dy = segs[i][3] - ay;
    const len2 = dx * dx + dy * dy;
    const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2));
    const d = Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
    if (d < best) best = d;
  }
  return best;
}

function ringsFor(code) {
  const f = g.features.find((x) => x.properties?.['ISO3166-1-Alpha-2'] === code);
  if (!f) return [];
  const ps = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  return ps.map((poly) => poly[0]);
}

function insideAny(lon, lat, list) {
  for (const ring of list) {
    let c = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
    }
    if (c) return true;
  }
  return false;
}

// Distance from a point to the boundary of an axis-aligned rectangle centred
// at (x, y) - zero if the point is inside it. Used to test a label's rectangle
// against a marker's circle.
function rectToPointDist(x, y, halfW, halfH, px, py) {
  const dx = Math.max(Math.abs(px - x) - halfW, 0);
  const dy = Math.max(Math.abs(py - y) - halfH, 0);
  return Math.hypot(dx, dy);
}

// How cleanly two axis-aligned rectangles miss each other. Two AABBs do NOT
// overlap as soon as either axis alone separates them, so the best-case gap is
// the larger of the two axis gaps (not the smaller) - this returns that value,
// positive when they miss, non-positive when they collide.
function aabbGap(x, y, halfW, halfH, ox, oy, oHalfW, oHalfH, gap) {
  const dx = Math.abs(x - ox) - halfW - oHalfW - gap;
  const dy = Math.abs(y - oy) - halfH - oHalfH - gap;
  return Math.max(dx, dy);
}

const IRAN_SEGS = toSegments(rings);
// Anchors for the three water labels, tagged with which font tier draws them
// (the Persian Gulf gets the larger, emphasised one) so their rectangles are
// sized correctly below.
const gulfAnchor = project(51.3, 27.4);
const omanAnchor = project(59.0, 24.2);
const caspianAnchor = project(51.5, 39.0);
const WATER_LABELS = [
  { x: gulfAnchor[0], y: gulfAnchor[1], tier: 'major' },
  { x: omanAnchor[0], y: omanAnchor[1], tier: 'minor' },
  { x: caspianAnchor[0], y: caspianAnchor[1], tier: 'minor' },
];
const MARKER_XY = points.map((p) => [p.x, p.y]);
// Half-width/height of each drawn rectangle, in the same user units as the
// map. These are measured from the widest string that actually appears in
// `src/data/iran-customs.ts` for that role, across all four languages, plus a
// margin - not computed here, since this script has no access to real font
// metrics. If a future translation is added and runs noticeably longer, re-
// measure it on the live page and raise the matching constant.
// The blanket figures below sized every "lg" label from the single widest
// string in the whole dataset (Cyrillic "Туркменистан"), which reserved far
// more room than a short name like "Iraq" ever needs and dropped several
// countries that would otherwise fit comfortably. PER_COUNTRY_HALF_W instead
// uses the width actually measured for each specific country's own name,
// across all four languages, on the live page at this font size, plus a
// margin. The four countries with no room at all in earlier passes (Armenia,
// Oman, Kuwait, Qatar) were never rendered to measure, so they keep the
// conservative blanket default rather than a guess. This script has no way to
// know the CSS also bumps these font sizes up on a narrow phone screen, so
// whatever it places here still has to be re-verified against the real
// mobile-rendered page - see the verification pass this was built alongside.
const LG = { halfW: 122, halfH: 21 };
const SM = { halfW: 84, halfH: 16 };
const SEA_MAJOR = { halfW: 270, halfH: 33 };
const SEA_MINOR = { halfW: 152, halfH: 24 };
const PER_COUNTRY_HALF_W = {
  turkey: { lg: 66, sm: 48 },
  iraq: { lg: 45, sm: 33 },
  turkmenistan: { lg: 124, sm: 89 },
  afghanistan: { lg: 107, sm: 77 },
  pakistan: { lg: 85, sm: 62 },
  saudi: { lg: 110, sm: 79 },
  azerbaijan: { lg: 87, sm: 87 },
  uae: { lg: 40, sm: 40 },
};
const MARKER_R = 19; // drawn halo r=13 + the same 6px pad the page's own a11y check uses
const LABEL_GAP = 8;
const FRAME_MARGIN = 10;
// Open-area thresholds for roomAt(): how much clear space a spot needs before
// the full-size label is even attempted, and the lower bar for the small one.
const MIN_ROOM = 26;
const BIG_ROOM = 55;

const placedLabels = []; // { x, y, halfW, halfH }
const NEIGHBOUR_LABELS = [];

for (const country of NEIGHBOUR_LABEL_COUNTRIES) {
  const cRings = ringsFor(country.code);
  if (!cRings.length) continue;
  const ownSegs = toSegments(cRings);

  // How open the wedge is at (x, y): distance to the nearest thing a label
  // must not be drawn on top of that is itself a *boundary* rather than
  // another label - the frame, Iran's outline, this country's own coast. This
  // is a point measurement, deliberately not inflated by the label's own
  // half-width: doing that here (rather than in the rectangle checks below)
  // over-penalised the narrow countries, since it demanded the same clearance
  // in every direction around the anchor regardless of which way the text
  // actually runs.
  const roomAt = (x, y) =>
    Math.min(
      x - FRAME_MARGIN,
      VB.w - x - FRAME_MARGIN,
      y - FRAME_MARGIN,
      VB.h - y - FRAME_MARGIN,
      distToSegs(x, y, IRAN_SEGS),
      distToSegs(x, y, ownSegs),
    );

  // Slack against the things a label's actual rectangle can collide with:
  // markers (circles), water labels and already-placed names (both other
  // rectangles). The largest slack among valid spots is the most comfortable
  // fit, not merely the first spot that clears everything.
  const rectSlack = (x, y, halfW, halfH) => {
    let s = Infinity;
    // roomAt() above only tested the anchor point against the coastline, not
    // the label's actual corners - a wide box can still clip a concave bit of
    // the outline near one edge even though its centre sits well clear (this
    // is exactly what put a chunk of "Pakistan" onto Iran's coast). Nine probes
    // at just the corners and edge midpoints missed that intrusion, so this
    // walks the full perimeter at a fixed spacing instead: fine enough that
    // nothing between two probes can dip in and out of a boundary undetected.
    const probes = [[x, y]];
    const STEP = 12;
    const top = y - halfH;
    const bottom = y + halfH;
    const left = x - halfW;
    const right = x + halfW;
    for (let px = left; px <= right; px += STEP) {
      probes.push([px, top], [px, bottom]);
    }
    for (let py = top; py <= bottom; py += STEP) {
      probes.push([left, py], [right, py]);
    }
    const coastMargin = 6;
    for (const [px, py] of probes) {
      s = Math.min(s, distToSegs(px, py, IRAN_SEGS) - coastMargin);
      s = Math.min(s, distToSegs(px, py, ownSegs) - coastMargin);
      if (s <= 0) return s;
    }
    for (const [mx, my] of MARKER_XY) {
      s = Math.min(s, rectToPointDist(x, y, halfW, halfH, mx, my) - MARKER_R);
      if (s <= 0) return s;
    }
    for (const w of WATER_LABELS) {
      const wHalf = w.tier === 'major' ? SEA_MAJOR : SEA_MINOR;
      s = Math.min(s, aabbGap(x, y, halfW, halfH, w.x, w.y, wHalf.halfW, wHalf.halfH, LABEL_GAP));
      if (s <= 0) return s;
    }
    for (const other of placedLabels) {
      s = Math.min(
        s,
        aabbGap(x, y, halfW, halfH, other.x, other.y, other.halfW, other.halfH, LABEL_GAP),
      );
      if (s <= 0) return s;
    }
    return s;
  };

  const findBest = (halfW, halfH, minRoom) => {
    let best = null;
    const scan = (lo0, lo1, la0, la1, step) => {
      for (let lon = lo0; lon <= lo1; lon += step) {
        for (let lat = la0; lat <= la1; lat += step) {
          if (!insideAny(lon, lat, cRings)) continue;
          const [x, y] = project(lon, lat);
          if (roomAt(x, y) < minRoom) continue;
          const s = rectSlack(x, y, halfW, halfH);
          if (s > 0 && (!best || s > best.slack)) best = { slack: s, x, y };
        }
      }
    };
    // Coarse sweep for the right region, then refine around it - a fine grid
    // over the whole frame for every country would be needlessly slow.
    scan(minLon, maxLon, minLat, maxLat, 0.15);
    if (!best) return null;
    const c = best;
    const clon = minLon + (c.x - offX) / (lonScale * scale);
    const clat = maxLat - (c.y - offY) / scale;
    scan(clon - 0.45, clon + 0.45, clat - 0.45, clat + 0.45, 0.06);
    return best;
  };

  const perCountry = PER_COUNTRY_HALF_W[country.id];
  const lgHalfW = perCountry ? perCountry.lg : LG.halfW;
  const smHalfW = perCountry ? perCountry.sm : SM.halfW;

  let hit = findBest(lgHalfW, LG.halfH, BIG_ROOM);
  let tier = 'lg';
  let halfW = lgHalfW;
  let halfH = LG.halfH;
  if (!hit) {
    hit = findBest(smHalfW, SM.halfH, MIN_ROOM);
    tier = 'sm';
    halfW = smHalfW;
    halfH = SM.halfH;
  }
  if (!hit) continue;

  placedLabels.push({ x: hit.x, y: hit.y, halfW, halfH });
  NEIGHBOUR_LABELS.push({ id: country.id, x: r2(hit.x), y: r2(hit.y), size: tier });
}

// A scale bar the page can draw without knowing anything about the projection.
// y is linear in latitude here, so a degree of latitude is a fixed number of
// user units and 111.32 km/deg converts it to a real distance.
const SCALE_KM = 400;
const scaleBar = { km: SCALE_KM, units: r2((SCALE_KM / 111.32) * scale) };

const out = {
  viewBox: `0 0 ${VB.w} ${VB.h}`,
  neighbourLabels: NEIGHBOUR_LABELS,
  scaleBar,
  outline,
  neighbours,
  points,
  labels: {
    persianGulf: { x: r2(pgx), y: r2(pgy) },
    gulfOfOman: { x: r2(omx), y: r2(omy) },
    caspian: { x: r2(csx), y: r2(csy) },
  },
};

const ts = `// GENERATED by scripts/build-iran-map.js - do not edit by hand.
// Outline projected from public/data/countries.geojson (Natural Earth), the
// same source the world map uses, so the two never disagree.
export const iranMap = ${JSON.stringify(out, null, 2)} as const;
`;
fs.writeFileSync(process.argv[2], ts, 'utf8');
console.log('outline path chars:', outline.length);
console.log('neighbours:', neighbours.length, '| total chars:', neighbours.reduce((a, n) => a + n.d.length, 0));
console.log('points:', points.length, '| by kind:', JSON.stringify(points.reduce((a,p)=>{a[p.kind]=(a[p.kind]||0)+1;return a;},{})));
console.log('neighbour labels placed:', NEIGHBOUR_LABELS.length + '/' + NEIGHBOUR_LABEL_COUNTRIES.length,
  '| dropped:', NEIGHBOUR_LABEL_COUNTRIES.filter((c) => !NEIGHBOUR_LABELS.some((l) => l.id === c.id)).map((c) => c.id).join(',') || 'none');
console.log('  sizes:', NEIGHBOUR_LABELS.map((l) => `${l.id}:${l.size}`).join(' '));
console.log('displaced for legibility:', shifts.length, shifts.map((s) => `${s.id}(${s.d.toFixed(0)}u)`).join(' '));
console.log('snapped onto the drawn coast:', snapped.length, snapped.map((s) => `${s.id}(${s.km}km)`).join(' '));
console.log('sample:', JSON.stringify(points.slice(0, 3)));
console.log('persianGulf anchor:', out.labels.persianGulf);
console.log('scale bar:', `${scaleBar.km}km = ${scaleBar.units} units`);
