/**
 * Shrink public/data/countries.geojson for the trade map.
 *
 * The source file carries 6-decimal coordinates (~10cm precision) and half a
 * million points. The map renders the whole world across roughly 1000px, where
 * one pixel spans ~0.36 degrees of longitude — so the file is around fifty
 * times more detailed than anything that can be seen, and every visitor to the
 * trade map downloads all of it.
 *
 * Two passes:
 *   1. Ramer-Douglas-Peucker simplification per ring, at a tolerance well
 *      under one rendered pixel.
 *   2. Coordinate rounding to a fixed number of decimals.
 *
 * WINDING IS LOAD-BEARING. d3.geoPath treats polygons as spherical, so a ring
 * whose orientation flips is drawn as the whole globe minus the shape — one
 * bad ring turns the entire map into a grey blob. Two rules keep that from
 * happening: a ring that cannot survive simplification as a real polygon is
 * dropped rather than replaced with a fabricated one, and every ring that is
 * kept is checked to have the same signed-area sign it started with.
 *
 * Dropped rings are sub-pixel islands. A feature never loses its largest ring,
 * so no country disappears from the map.
 *
 * Usage:  node scripts/simplify-geojson.mjs [tolerance] [decimals]
 */
import fs from 'node:fs';
import path from 'node:path';

const SOURCE = path.join(process.cwd(), 'public', 'data', 'countries.geojson');
const TOLERANCE = Number(process.argv[2] ?? 0.05); // degrees; ~1/7 of a rendered pixel
const DECIMALS = Number(process.argv[3] ?? 3); // ~110m at the equator

/** Twice the signed area of a ring. Sign encodes winding direction. */
const signedArea = (ring) => {
  let total = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    total += (ring[j][0] - ring[i][0]) * (ring[j][1] + ring[i][1]);
  }
  return total;
};

const perpendicularDistance = ([px, py], [sx, sy], [ex, ey]) => {
  const dx = ex - sx;
  const dy = ey - sy;
  if (dx === 0 && dy === 0) return Math.hypot(px - sx, py - sy);
  const t = ((px - sx) * dx + (py - sy) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (sx + clamped * dx), py - (sy + clamped * dy));
};

/** Iterative Ramer-Douglas-Peucker, so a long ring cannot blow the stack. */
const simplifyLine = (points, tolerance) => {
  if (points.length <= 2) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;

  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxDistance = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const distance = perpendicularDistance(points[i], points[first], points[last]);
      if (distance > maxDistance) {
        maxDistance = distance;
        index = i;
      }
    }
    if (maxDistance > tolerance && index !== -1) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }

  const out = [];
  for (let i = 0; i < points.length; i++) if (keep[i]) out.push(points[i]);
  return out;
};

const round = (value, decimals) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Simplify one closed ring. Returns null when the ring cannot be represented
 * as a closed polygon at this tolerance, or when rounding would flip its
 * winding — the caller drops those rather than drawing them wrong.
 */
const simplifyRing = (ring, tolerance, decimals) => {
  const originalSign = Math.sign(signedArea(ring));

  let simplified = simplifyLine(ring, tolerance);
  simplified = simplified.map(([x, y]) => [round(x, decimals), round(y, decimals)]);

  // Rounding can collapse neighbouring points onto each other.
  const deduped = simplified.filter(
    (point, i) => i === 0 || point[0] !== simplified[i - 1][0] || point[1] !== simplified[i - 1][1],
  );

  // Re-close the ring if rounding separated the endpoints.
  const first = deduped[0];
  const last = deduped[deduped.length - 1];
  if (first && last && (first[0] !== last[0] || first[1] !== last[1])) deduped.push([first[0], first[1]]);

  // A closed ring needs three distinct corners plus the repeat.
  if (deduped.length < 4) return null;
  if (Math.sign(signedArea(deduped)) !== originalSign) return null;

  return deduped;
};

/** Ring area magnitude, used only to decide which ring of a shape is largest. */
const ringExtent = (ring) => Math.abs(signedArea(ring));

const simplifyPolygon = (rings, tolerance, decimals) => {
  const kept = rings.map((ring) => simplifyRing(ring, tolerance, decimals));
  // The exterior ring is the first one; without it the polygon means nothing.
  if (!kept[0]) return null;
  return kept.filter(Boolean);
};

const simplifyGeometry = (geometry, tolerance, decimals) => {
  if (!geometry) return { geometry, dropped: 0 };
  const { type, coordinates } = geometry;
  let dropped = 0;

  if (type === 'Polygon') {
    const rings = simplifyPolygon(coordinates, tolerance, decimals);
    if (!rings) return { geometry: null, dropped: coordinates.length };
    dropped += coordinates.length - rings.length;
    return { geometry: { ...geometry, coordinates: rings }, dropped };
  }

  if (type === 'MultiPolygon') {
    const polygons = [];
    for (const polygon of coordinates) {
      const rings = simplifyPolygon(polygon, tolerance, decimals);
      if (!rings) {
        dropped += polygon.length;
        continue;
      }
      dropped += polygon.length - rings.length;
      polygons.push(rings);
    }
    if (!polygons.length) return { geometry: null, dropped };
    return { geometry: { ...geometry, coordinates: polygons }, dropped };
  }

  return { geometry, dropped };
};

/**
 * Last resort for a feature whose every ring collapsed: keep its single
 * largest ring, simplified as little as possible, so the country still shows.
 */
const rescueLargestRing = (geometry, decimals) => {
  const rings =
    geometry.type === 'Polygon' ? [geometry.coordinates[0]] : geometry.coordinates.map((polygon) => polygon[0]);
  const largest = rings.reduce((best, ring) => (ringExtent(ring) > ringExtent(best) ? ring : best), rings[0]);
  const kept = simplifyRing(largest, 0, decimals);
  if (!kept) return null;
  return { type: 'Polygon', coordinates: [kept] };
};

const countPoints = (node) =>
  typeof node[0] === 'number' ? 1 : node.reduce((total, child) => total + countPoints(child), 0);

const raw = fs.readFileSync(SOURCE, 'utf8');
const geo = JSON.parse(raw);

const before = geo.features.reduce(
  (total, feature) => total + (feature.geometry ? countPoints(feature.geometry.coordinates) : 0),
  0,
);

let droppedRings = 0;
let rescued = 0;

geo.features = geo.features.map((feature) => {
  if (!feature.geometry) return feature;
  const { geometry, dropped } = simplifyGeometry(feature.geometry, TOLERANCE, DECIMALS);
  droppedRings += dropped;

  if (geometry) return { ...feature, geometry };

  const fallback = rescueLargestRing(feature.geometry, DECIMALS);
  if (fallback) rescued += 1;
  return { ...feature, geometry: fallback };
});

const after = geo.features.reduce(
  (total, feature) => total + (feature.geometry ? countPoints(feature.geometry.coordinates) : 0),
  0,
);

const output = JSON.stringify(geo);
fs.writeFileSync(SOURCE, output);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + 'MB';
console.log(`features:       ${geo.features.length} (unchanged)`);
console.log(`points:         ${before} -> ${after}`);
console.log(`size:           ${mb(raw.length)} -> ${mb(output.length)}`);
console.log(`sub-pixel rings dropped: ${droppedRings}`);
console.log(`features rescued via largest ring: ${rescued}`);
console.log(`features left without geometry: ${geo.features.filter((f) => !f.geometry).length}`);
