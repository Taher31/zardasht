/**
 * Levels and physics for the parking game on the 404 page
 * (components/ParkingGame.astro draws it and runs the UI). Kept free of the
 * DOM and of imports so the whole game can be simulated outside a browser.
 *
 * Three fleets, each with its own handling: a rigid box truck, a tractor and
 * semi-trailer, and a container ship. The yard is a fixed 640x400 world scaled
 * to whatever width the page gives it, so every level plays the same on a
 * phone and on a desktop.
 */

export type Fleet = 'truck' | 'trailer' | 'ship';
export type Kind =
  | 'container'
  | 'truck'
  | 'trailer'
  | 'building'
  | 'kerb'
  | 'barrier'
  | 'cone'
  | 'quay'
  | 'ship'
  | 'buoy'
  | 'rocks';
export type Control = 'forward' | 'reverse' | 'left' | 'right';
type Nose = 'e' | 's' | 'w' | 'n';

export interface Pt { x: number; y: number }
/** Oriented box: centre, length `w` along heading `a`, width `h` across it. */
export interface Box { x: number; y: number; w: number; h: number; a: number }
export interface Obstacle extends Box { kind: Kind; color: string }
export interface Bay extends Box {
  /** The body's nose must point along `a`: a dock, which is backed into.
   *  Otherwise either way round will do. */
  face: boolean;
}
export type Decor =
  | { t: 'line'; x0: number; y0: number; x1: number; y1: number; dash?: boolean }
  | { t: 'door'; x0: number; y0: number; x1: number; y1: number }
  /** A weighbridge's steel plate. */
  | { t: 'plate'; x0: number; y0: number; x1: number; y1: number }
  /** A ship-to-shore crane on the quay at (x, y), its boom reaching out over
   *  the water along `a`. Overhead, so nothing collides with it. */
  | { t: 'crane'; x: number; y: number; a: number; reach: number }
  /** Which way the water is running. */
  | { t: 'arrow'; x: number; y: number; a: number };
export interface Level {
  /** Stable key for saved best times, and for the level's name and hint. */
  id: LevelId;
  fleet: Fleet;
  start: { x: number; y: number; a: number };
  bay: Bay;
  obstacles: Obstacle[];
  decor: Decor[];
  /** Water current carrying a ship along, in world units a second. */
  current?: Pt;
  /** Seconds inside which the bay earns three stars. */
  par: number;
}
export interface Rig {
  wheelbase: number;
  back: number;
  front: number;
  half: number;
  maxSteer: number;
  steerRate: number;
  maxFwd: number;
  maxRev: number;
}
/** A truck is placed by its (tractor's) rear axle; `trailer` is the trailer's
 *  heading, whose kingpin sits on that axle. A ship is placed by its middle. */
export interface Vehicle {
  x: number;
  y: number;
  a: number;
  /** Speed along the heading: a truck's road speed, a ship's way ahead. */
  v: number;
  /** Wheel or rudder angle. */
  steer: number;
  trailer: number;
  /** A ship's rate of turn, which builds and dies away slowly. */
  yaw: number;
  /** A ship's sideways drift through the water. */
  sway: number;
  /** Speed over the ground in the last step, current and all. */
  speed: number;
}
export type Input = Record<Control, boolean>;
export type Outcome = 'crash' | 'jackknife' | 'parked' | null;
/** Why a vehicle sitting on the bay doesn't count yet. */
export type Tip = 'facing' | 'inside' | 'straight' | null;

export const W = 640;
export const H = 400;
export const STEP = 1 / 120;
export const HOLD = 0.7; // seconds stopped in the bay to count as parked

const HALF_PI = Math.PI / 2;
const ACCEL = 120;
const BRAKE = 260;
const DRAG = 90;
const ALIGN = 0.21; // ~12° either side of the bay's axis
const JACKKNIFE = 1.35; // ~77° between cab and trailer
// Walls, kerbs, barriers and quays are padded: backing into one, or touching
// it slower than this, just stops the vehicle, which is how a dock or a quay
// is meant to be used. Only hitting one hard is a crash.
const BUMP = 25;
const SHIP_BUMP = 18;
const SOFT: Kind[] = ['building', 'kerb', 'barrier', 'quay'];

// Distances are world units measured from the rear axle; the rigid truck is
// 62 long and 24 wide, the same proportions as the one in the page footer.
export const RIGID: Rig = { wheelbase: 38, back: 11, front: 51, half: 12, maxSteer: 0.6, steerRate: 2.4, maxFwd: 95, maxRev: 45 };
// The tractor steers slower and reverses at a crawl: a trailer being backed
// folds up fast, and on a keyboard every correction is all-or-nothing.
export const TRACTOR: Rig = { wheelbase: 22, back: 9, front: 29, half: 12, maxSteer: 0.5, steerRate: 1.3, maxFwd: 80, maxRev: 30 };
export const TRAILER = { hitch: 50, front: 6, back: 12, half: 12 };
// A ship carries its way: it takes time to get going, longer to stop (astern
// is the brake), and its rudder only bites with water running past it.
export const SHIP = {
  length: 96,
  beam: 24,
  bow: 18, // length of the tapered bow
  maxAhead: 40,
  maxAstern: 20,
  thrust: 18,
  astern: 16,
  drag: 0.4, // share of its speed the water takes away each second
  rudder: 0.6,
  rudderRate: 1.4,
  turn: 1.7,
  lag: 0.6, // seconds for a rate of turn to build or die away
  wash: 10, // flow the propeller throws over the rudder when going ahead
  skid: 0.25,
};

export const COLORS = {
  asphalt: '#2a3247',
  water: '#1d4674',
  navy: '#19266a',
  deep: '#0b1338',
  gold: '#f3c623',
  blue: '#3d53b0',
  rust: '#c4583a',
  teal: '#2f8f83',
  white: '#e4e9f2',
  slate: '#8b95ab',
};

// ------------------------------------------------------------------ levels

const NOSE: Record<Nose, number> = { e: 0, s: HALF_PI, w: Math.PI, n: -HALF_PI };

/** Axis-aligned obstacle from its corners; `nose` says which end is the front. */
const rect = (x0: number, y0: number, x1: number, y1: number, kind: Kind, color = '', nose: Nose = 'e'): Obstacle => {
  const vertical = nose === 'n' || nose === 's';
  return {
    x: (x0 + x1) / 2,
    y: (y0 + y1) / 2,
    w: vertical ? y1 - y0 : x1 - x0,
    h: vertical ? x1 - x0 : y1 - y0,
    a: NOSE[nose],
    kind,
    color,
  };
};
const cone = (x: number, y: number): Obstacle => ({ x, y, w: 10, h: 10, a: 0, kind: 'cone', color: '' });
/** Channel buoy: red to port, green to starboard. */
const buoy = (x: number, y: number, color: 'red' | 'green'): Obstacle => ({ x, y, w: 12, h: 12, a: 0, kind: 'buoy', color });
const line = (x0: number, y0: number, x1: number, y1: number, dash = false): Decor => ({ t: 'line', x0, y0, x1, y1, dash });
const door = (x0: number, y0: number, x1: number, y1: number): Decor => ({ t: 'door', x0, y0, x1, y1 });
const crane = (x: number, y: number, a: number, reach = 70): Decor => ({ t: 'crane', x, y, a, reach });
const arrow = (x: number, y: number, a: number): Decor => ({ t: 'arrow', x, y, a });

/** A column of containers filling a rectangle, two units apart. */
const stack = (x0: number, y0: number, x1: number, y1: number, colors: string[]) => {
  const boxes: Obstacle[] = [];
  for (let y = y0, i = 0; y1 - y >= 18; i += 1) {
    const bottom = Math.min(y + 28, y1);
    boxes.push(rect(x0, y, x1, bottom, 'container', colors[i % colors.length]));
    y = bottom + 2;
  }
  return boxes;
};

/** A row of containers along a strip of quay, two units apart. */
const row = (x0: number, x1: number, y0: number, y1: number, colors: string[]) => {
  const boxes: Obstacle[] = [];
  for (let x = x0, i = 0; x1 - x >= 40; i += 1) {
    const right = Math.min(x + 58, x1);
    boxes.push(rect(x, y0, right, y1, 'container', colors[i % colors.length]));
    x = right + 3;
  }
  return boxes;
};

const { gold, blue, rust, teal, white, slate } = COLORS;

export type LevelId =
  | 'truck-1'
  | 'truck-2'
  | 'truck-3'
  | 'truck-4'
  | 'truck-5'
  | 'truck-6'
  | 'truck-7'
  | 'trailer-1'
  | 'trailer-2'
  | 'trailer-3'
  | 'trailer-4'
  | 'ship-1'
  | 'ship-2'
  | 'ship-3'
  | 'ship-4';

/** Every level, fleet by fleet; within a fleet they get harder in order. */
export const LEVELS: Level[] = [
  // Truck 1 · Straight in: a row of stalls dead ahead.
  {
    id: 'truck-1',
    fleet: 'truck',
    start: { x: 90, y: 200, a: 0 },
    bay: { x: 500, y: 200, w: 84, h: 38, a: 0, face: false },
    obstacles: [
      rect(462, 110, 538, 138, 'truck', white),
      rect(462, 148, 538, 176, 'container', blue),
      rect(462, 224, 538, 252, 'truck', teal),
      rect(462, 262, 538, 290, 'container', rust),
      rect(572, 40, 640, 360, 'building'),
      rect(150, 10, 240, 38, 'container', gold),
      rect(244, 10, 334, 38, 'container', teal),
      rect(338, 10, 428, 38, 'container', white),
      rect(200, 362, 290, 390, 'container', blue),
      rect(294, 362, 384, 390, 'container', gold),
      cone(36, 110),
      cone(36, 290),
    ],
    decor: [
      ...[105, 143, 181, 219, 257, 295].map((y) => line(458, y, 542, y)),
      line(542, 105, 542, 295),
      line(20, 200, 430, 200, true),
    ],
    par: 8,
  },
  // Truck 2 · Turn in: a free stall in a row along the warehouse wall.
  {
    id: 'truck-2',
    fleet: 'truck',
    start: { x: 70, y: 290, a: 0 },
    bay: { x: 367, y: 80, w: 84, h: 44, a: -HALF_PI, face: false },
    obstacles: [
      rect(0, 0, 640, 32, 'building'),
      rect(168, 40, 198, 118, 'truck', blue, 'n'),
      rect(214, 42, 244, 118, 'container', gold, 'n'),
      rect(306, 40, 336, 118, 'truck', white, 's'),
      rect(398, 42, 428, 118, 'container', teal, 'n'),
      rect(444, 40, 474, 118, 'truck', rust, 'n'),
      rect(490, 42, 520, 118, 'container', white, 'n'),
      rect(220, 366, 310, 394, 'container', rust),
      rect(314, 366, 404, 394, 'container', blue),
      rect(408, 366, 498, 394, 'container', gold),
      cone(600, 240),
      cone(600, 290),
    ],
    decor: [
      ...[160, 206, 252, 298, 344, 390, 436, 482, 528, 574].map((x) => line(x, 36, x, 122)),
      line(30, 200, 610, 200, true),
    ],
    par: 10,
  },
  // Truck 3 · Loading dock: back in square to the door.
  {
    id: 'truck-3',
    fleet: 'truck',
    start: { x: 110, y: 290, a: 0 },
    // The bay starts at the dock face, so a truck backed onto the bumpers is in.
    bay: { x: 335, y: 99, w: 90, h: 50, a: HALF_PI, face: true },
    obstacles: [
      rect(0, 0, 640, 54, 'building'),
      rect(139, 58, 171, 140, 'truck', blue, 's'),
      rect(229, 58, 261, 138, 'trailer', white, 's'),
      rect(409, 58, 441, 138, 'trailer', gold, 's'),
      rect(0, 372, 640, 400, 'kerb'),
      cone(590, 230),
      cone(606, 256),
    ],
    decor: [
      ...[155, 245, 335, 425, 515].map((x) => door(x - 22, 48, x + 22, 54)),
      ...[132, 178, 222, 268, 310, 360, 402, 448, 492, 538].map((x) => line(x, 54, x, 144)),
    ],
    par: 14,
  },
  // Truck 4 · Parallel: a gap along the kerb between two parked trucks.
  {
    id: 'truck-4',
    fleet: 'truck',
    start: { x: 70, y: 240, a: 0 },
    bay: { x: 330, y: 326, w: 104, h: 36, a: 0, face: false },
    obstacles: [
      rect(0, 348, 640, 400, 'kerb'),
      rect(84, 313, 170, 339, 'truck', white),
      rect(184, 313, 270, 339, 'truck', blue),
      rect(390, 313, 476, 339, 'truck', rust),
      rect(490, 313, 590, 339, 'truck', white),
      rect(30, 24, 120, 52, 'container', gold),
      rect(124, 24, 214, 52, 'container', teal),
      rect(262, 24, 352, 52, 'container', rust),
      rect(356, 24, 446, 52, 'container', white),
      rect(494, 24, 584, 52, 'container', blue),
      rect(60, 56, 150, 84, 'container', blue),
      rect(300, 56, 390, 84, 'container', gold),
      rect(520, 56, 610, 84, 'container', slate),
    ],
    decor: [line(0, 200, 640, 200, true), line(278, 309, 278, 345), line(382, 309, 382, 345)],
    par: 16,
  },
  // Truck 5 · Container yard: an S through two stacks, then up into a slot.
  {
    id: 'truck-5',
    fleet: 'truck',
    start: { x: 50, y: 330, a: 0 },
    bay: { x: 570, y: 110, w: 84, h: 44, a: -HALF_PI, face: false },
    obstacles: [
      ...stack(150, 172, 210, 400, [gold, blue, rust, white, teal]),
      ...stack(380, 0, 440, 230, [teal, white, gold, rust, blue]),
      rect(470, 0, 640, 38, 'building'),
      rect(508, 50, 540, 175, 'container', rust, 's'),
      rect(600, 50, 636, 175, 'container', blue, 's'),
      cone(600, 356),
      cone(620, 330),
      cone(250, 20),
    ],
    decor: [line(548, 64, 548, 156), line(592, 64, 592, 156)],
    par: 20,
  },
  // Truck 6 · Weighbridge: thread a barriered lane and stop on the plate.
  {
    id: 'truck-6',
    fleet: 'truck',
    start: { x: 80, y: 340, a: -HALF_PI },
    bay: { x: 416, y: 140, w: 74, h: 36, a: 0, face: false },
    obstacles: [
      rect(250, 98, 580, 122, 'barrier'),
      rect(250, 158, 580, 182, 'barrier', '', 'w'),
      rect(440, 44, 520, 90, 'building'),
      ...row(220, 600, 350, 378, [blue, gold, rust, teal, white, slate]),
      rect(0, 0, 200, 30, 'container', teal),
      cone(236, 94),
      cone(236, 186),
      cone(600, 250),
    ],
    decor: [{ t: 'plate', x0: 379, y0: 124, x1: 453, y1: 156 }, line(120, 140, 244, 140, true)],
    par: 12,
  },
  // Truck 7 · Three-point turn: turn round in a dead-end street, park facing out.
  {
    id: 'truck-7',
    fleet: 'truck',
    start: { x: 420, y: 200, a: 0 },
    bay: { x: 130, y: 200, w: 84, h: 40, a: Math.PI, face: true },
    obstacles: [
      rect(0, 0, 640, 118, 'building'),
      rect(0, 118, 640, 142, 'kerb', '', 'w'),
      rect(0, 258, 640, 282, 'kerb'),
      rect(0, 282, 640, 400, 'building'),
      rect(604, 142, 640, 258, 'building'),
      cone(580, 160),
      cone(580, 240),
    ],
    decor: [line(200, 200, 560, 200, true), line(88, 178, 172, 178), line(88, 222, 172, 222)],
    par: 18,
  },
  // Trailer 1 · Pull-through: an S across the yard, then straight through a stall.
  {
    id: 'trailer-1',
    fleet: 'trailer',
    start: { x: 110, y: 320, a: 0 },
    bay: { x: 440, y: 200, w: 104, h: 50, a: 0, face: false },
    obstacles: [
      rect(394, 136, 486, 164, 'trailer', white),
      rect(490, 138, 518, 162, 'truck', blue),
      rect(394, 236, 486, 264, 'trailer', rust),
      rect(490, 238, 518, 262, 'truck', teal),
      rect(0, 0, 640, 30, 'building'),
      ...row(160, 360, 40, 68, [gold, blue, teal]),
      cone(250, 250),
      cone(600, 330),
    ],
    decor: [...[125, 175, 225, 275].map((y) => line(386, y, 494, y))],
    par: 16,
  },
  // Trailer 2 · Straight back: reverse square onto a dock, a touch off line.
  {
    id: 'trailer-2',
    fleet: 'trailer',
    start: { x: 380, y: 214, a: Math.PI },
    bay: { x: 545, y: 200, w: 94, h: 46, a: Math.PI, face: true },
    obstacles: [
      rect(592, 0, 640, 400, 'building'),
      rect(506, 96, 590, 124, 'trailer', white, 'w'),
      rect(506, 276, 590, 304, 'trailer', gold, 'w'),
      rect(20, 180, 110, 208, 'container', rust),
      rect(20, 212, 110, 240, 'container', blue),
      cone(430, 60),
      cone(430, 340),
    ],
    decor: [
      ...[110, 200, 290].map((y) => door(586, y - 24, 592, y + 24)),
      ...[87, 133, 177, 223, 267, 313].map((y) => line(496, y, 592, y)),
    ],
    par: 12,
  },
  // Trailer 3 · Offset dock: reverse a semi-trailer onto the middle dock.
  {
    id: 'trailer-3',
    fleet: 'trailer',
    start: { x: 250, y: 150, a: Math.PI },
    bay: { x: 545, y: 200, w: 94, h: 46, a: Math.PI, face: true },
    obstacles: [
      rect(592, 0, 640, 400, 'building'),
      rect(506, 96, 590, 124, 'trailer', white, 'w'),
      rect(506, 276, 590, 304, 'trailer', gold, 'w'),
      rect(20, 20, 110, 48, 'container', teal),
      rect(20, 52, 110, 80, 'container', gold),
      rect(20, 320, 110, 348, 'container', rust),
      rect(20, 352, 110, 380, 'container', blue),
      cone(430, 60),
      cone(430, 340),
    ],
    decor: [
      ...[110, 200, 290].map((y) => door(586, y - 24, 592, y + 24)),
      ...[87, 133, 177, 223, 267, 313].map((y) => line(496, y, 592, y)),
    ],
    par: 25,
  },
  // Trailer 4 · Alley dock: back the trailer in at ninety degrees.
  {
    id: 'trailer-4',
    fleet: 'trailer',
    start: { x: 470, y: 250, a: 0 },
    bay: { x: 340, y: 99, w: 94, h: 56, a: HALF_PI, face: true },
    obstacles: [
      rect(0, 0, 640, 52, 'building'),
      rect(234, 54, 266, 140, 'trailer', white, 's'),
      rect(414, 54, 446, 140, 'trailer', gold, 's'),
      rect(0, 372, 640, 400, 'kerb'),
      cone(40, 300),
      cone(600, 300),
    ],
    decor: [
      ...[160, 250, 340, 430, 520].map((x) => door(x - 22, 46, x + 22, 52)),
      ...[137, 183, 227, 273, 312, 368, 407, 453, 497, 543].map((x) => line(x, 52, x, 146)),
    ],
    par: 30,
  },
  // Ship 1 · Alongside: come in slowly and lie alongside the quay.
  {
    id: 'ship-1',
    fleet: 'ship',
    start: { x: 90, y: 290, a: 0 },
    bay: { x: 400, y: 92, w: 132, h: 44, a: 0, face: false },
    obstacles: [
      rect(0, 0, 640, 70, 'quay'),
      ...row(20, 300, 12, 40, [gold, blue, rust, teal, white]),
      rect(90, 72, 206, 100, 'ship', rust),
      buoy(560, 240, 'red'),
      buoy(560, 340, 'green'),
    ],
    decor: [crane(360, 44, HALF_PI), crane(450, 44, HALF_PI), crane(150, 44, HALF_PI)],
    par: 20,
  },
  // Ship 2 · Between two ships: a berth with a ship moored either end.
  {
    id: 'ship-2',
    fleet: 'ship',
    start: { x: 560, y: 300, a: Math.PI },
    bay: { x: 311, y: 92, w: 140, h: 44, a: 0, face: false },
    obstacles: [
      rect(0, 0, 640, 70, 'quay'),
      ...row(40, 600, 12, 40, [teal, white, gold, blue, rust]),
      rect(118, 72, 236, 100, 'ship', teal),
      rect(386, 72, 504, 100, 'ship', blue),
      buoy(90, 330, 'green'),
      buoy(300, 360, 'red'),
    ],
    decor: [crane(280, 44, HALF_PI), crane(345, 44, HALF_PI)],
    par: 26,
  },
  // Ship 3 · Crosscurrent: the river runs south past the berth.
  {
    id: 'ship-3',
    fleet: 'ship',
    start: { x: 110, y: 120, a: 0 },
    bay: { x: 538, y: 190, w: 132, h: 44, a: HALF_PI, face: false },
    current: { x: 0, y: 7 },
    obstacles: [
      rect(560, 0, 640, 400, 'quay'),
      rect(530, 280, 558, 396, 'ship', gold, 'n'),
      buoy(330, 40, 'red'),
      buoy(330, 360, 'green'),
      buoy(180, 300, 'green'),
    ],
    decor: [
      crane(590, 160, Math.PI, 60),
      crane(590, 230, Math.PI, 60),
      ...[80, 250, 420].flatMap((x) => [arrow(x, 70, HALF_PI), arrow(x, 210, HALF_PI), arrow(x, 350, HALF_PI)]),
    ],
    par: 28,
  },
  // Ship 4 · Harbour basin: in through the breakwater, then round to the quay.
  {
    id: 'ship-4',
    fleet: 'ship',
    start: { x: 120, y: 330, a: 0 },
    bay: { x: 500, y: 72, w: 132, h: 44, a: 0, face: false },
    obstacles: [
      rect(0, 0, 640, 50, 'quay'),
      rect(0, 205, 280, 230, 'rocks'),
      rect(400, 205, 640, 230, 'rocks'),
      rect(100, 52, 216, 80, 'ship', white),
      buoy(270, 250, 'red'),
      buoy(410, 250, 'green'),
    ],
    decor: [crane(470, 26, HALF_PI, 60), crane(540, 26, HALF_PI, 60), crane(160, 26, HALF_PI, 60)],
    par: 32,
  },
];

// ---------------------------------------------------------------- geometry

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const wrap = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

const place = (b: Box, points: number[][]): Pt[] => {
  const c = Math.cos(b.a);
  const s = Math.sin(b.a);
  return points.map(([lx, ly]) => ({ x: b.x + lx * c - ly * s, y: b.y + lx * s + ly * c }));
};

/** Corners of a box, front pair first. */
export const boxQuad = (b: Box): Pt[] => {
  const hw = b.w / 2;
  const hh = b.h / 2;
  return place(b, [
    [hw, -hh],
    [hw, hh],
    [-hw, hh],
    [-hw, -hh],
  ]);
};

/** A ship's hull in the box: square stern, parallel sides, tapered bow. */
export const hull = (b: Box): Pt[] => {
  const hw = b.w / 2;
  const hh = b.h / 2;
  const shoulder = hw - SHIP.bow;
  return place(b, [
    [hw, 0],
    [shoulder, hh],
    [-hw, hh],
    [-hw, -hh],
    [shoulder, -hh],
  ]);
};

/** Box for a body that runs `back` behind and `front` ahead of (x, y). */
const along = (x: number, y: number, a: number, back: number, front: number, half: number): Box => {
  const mid = (front - back) / 2;
  return { x: x + Math.cos(a) * mid, y: y + Math.sin(a) * mid, w: back + front, h: half * 2, a };
};

const toLocal = (b: Box, p: Pt): Pt => {
  const dx = p.x - b.x;
  const dy = p.y - b.y;
  const c = Math.cos(b.a);
  const s = Math.sin(b.a);
  return { x: dx * c + dy * s, y: -dx * s + dy * c };
};

/** Separating-axis test for two convex polygons. */
const overlaps = (p: Pt[], q: Pt[]) => {
  for (const poly of [p, q]) {
    for (let i = 0; i < poly.length; i += 1) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      const nx = b.y - a.y;
      const ny = a.x - b.x;
      let pMin = Infinity;
      let pMax = -Infinity;
      let qMin = Infinity;
      let qMax = -Infinity;
      for (const v of p) {
        const d = v.x * nx + v.y * ny;
        pMin = Math.min(pMin, d);
        pMax = Math.max(pMax, d);
      }
      for (const v of q) {
        const d = v.x * nx + v.y * ny;
        qMin = Math.min(qMin, d);
        qMax = Math.max(qMax, d);
      }
      if (pMax <= qMin || qMax <= pMin) return false;
    }
  }
  return true;
};

/** A round obstacle (cone, buoy) against a convex polygon. */
const circleHits = (poly: Pt[], cx: number, cy: number, r: number) => {
  let sign = 0;
  let inside = true;
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const cross = ex * (cy - a.y) - ey * (cx - a.x);
    if (cross !== 0) {
      if (sign === 0) sign = Math.sign(cross);
      else if (Math.sign(cross) !== sign) inside = false;
    }
    const t = clamp(((cx - a.x) * ex + (cy - a.y) * ey) / (ex * ex + ey * ey), 0, 1);
    if (Math.hypot(a.x + ex * t - cx, a.y + ey * t - cy) < r) return true;
  }
  return inside;
};

// --------------------------------------------------------------- simulation

export interface Sim {
  level: Level;
  vehicle: Vehicle;
  /** Seconds the vehicle has sat parked; the level is won at HOLD. */
  hold: number;
  /** The load is wholly inside the bay lines. */
  inBay: boolean;
  /** ...and square to them, and stopped: the hold clock is running. */
  ready: boolean;
  /** Stopped on the bay without it counting: what is wrong. */
  tip: Tip;
  /** A ship lying slowly against a quay, lines ashore: the current no longer
   *  carries it. */
  alongside: boolean;
  quads: Pt[][];
}

export const rigOf = (level: Level) => (level.fleet === 'trailer' ? TRACTOR : RIGID);

export const createSim = (level: Level): Sim => {
  const { x, y, a } = level.start;
  return {
    level,
    vehicle: { x, y, a, v: 0, steer: 0, trailer: a, yaw: 0, sway: 0, speed: 0 },
    hold: 0,
    inBay: false,
    ready: false,
    tip: null,
    alongside: false,
    quads: level.obstacles.map((o) => (o.kind === 'ship' ? hull(o) : boxQuad(o))),
  };
};

/** The vehicle as boxes: truck; tractor then trailer; or the ship's hull. */
export const bodies = ({ level, vehicle }: Sim, inset = 0): Box[] => {
  if (level.fleet === 'ship') {
    return [along(vehicle.x, vehicle.y, vehicle.a, SHIP.length / 2 - inset, SHIP.length / 2 - inset, SHIP.beam / 2 - inset)];
  }
  const rig = rigOf(level);
  const list = [along(vehicle.x, vehicle.y, vehicle.a, rig.back - inset, rig.front - inset, rig.half - inset)];
  if (level.fleet === 'trailer') {
    const { hitch, back, front, half } = TRAILER;
    list.push(along(vehicle.x, vehicle.y, vehicle.trailer, hitch + back - inset, front - inset, half - inset));
  }
  return list;
};

/** Collision outlines: boxes for trucks, the tapered hull for a ship. */
const outlines = (sim: Sim, inset = 0) => bodies(sim, inset).map(sim.level.fleet === 'ship' ? hull : boxQuad);

const moveTruck = (sim: Sim, input: Input, dt: number) => {
  const { level, vehicle: truck } = sim;
  const rig = rigOf(level);
  const { forward, reverse } = input;

  let v = truck.v;
  if (forward && !reverse) v = v < -1 ? v + BRAKE * dt : v + ACCEL * dt;
  else if (reverse && !forward) v = v > 1 ? v - BRAKE * dt : v - ACCEL * dt;
  else {
    const slow = (forward && reverse ? BRAKE : DRAG) * dt;
    v = Math.abs(v) <= slow ? 0 : v - Math.sign(v) * slow;
  }
  truck.v = clamp(v, -rig.maxRev, rig.maxFwd);

  const target = ((input.right ? 1 : 0) - (input.left ? 1 : 0)) * rig.maxSteer;
  const rate = (target === 0 ? 1.6 : 1) * rig.steerRate * dt;
  truck.steer += clamp(target - truck.steer, -rate, rate);

  // Kinematic bicycle model about the rear axle; the trailer's kingpin sits
  // on the tractor's rear axle and follows it round.
  truck.a += (truck.v / rig.wheelbase) * Math.tan(truck.steer) * dt;
  truck.x += truck.v * Math.cos(truck.a) * dt;
  truck.y += truck.v * Math.sin(truck.a) * dt;
  if (level.fleet === 'trailer') truck.trailer += (truck.v / TRAILER.hitch) * Math.sin(truck.a - truck.trailer) * dt;
};

const moveShip = (sim: Sim, input: Input, dt: number) => {
  const { level, vehicle: ship } = sim;
  const { forward, reverse } = input;

  if (forward && !reverse) ship.v += SHIP.thrust * dt;
  else if (reverse && !forward) ship.v -= SHIP.astern * dt;
  ship.v -= ship.v * SHIP.drag * dt;
  ship.v = clamp(ship.v, -SHIP.maxAstern, SHIP.maxAhead);

  const target = ((input.right ? 1 : 0) - (input.left ? 1 : 0)) * SHIP.rudder;
  const rate = SHIP.rudderRate * dt;
  ship.steer += clamp(target - ship.steer, -rate, rate);

  // The rudder steers by the water running past it: the ship's own way (weak
  // and backwards when going astern) plus the propeller's wash going ahead.
  const flow = (ship.v >= 0 ? ship.v : ship.v * 0.5) + (forward ? SHIP.wash : 0);
  const turn = (SHIP.turn * ship.steer * flow) / SHIP.length;
  ship.yaw += (turn - ship.yaw) * Math.min(1, dt / SHIP.lag);
  ship.a += ship.yaw * dt;
  // Turning, a hull skids a little to the outside; the water soon damps it.
  ship.sway += (-SHIP.skid * ship.yaw * ship.v - ship.sway * 1.5) * dt;

  const c = Math.cos(ship.a);
  const s = Math.sin(ship.a);
  const current = (!sim.alongside && level.current) || { x: 0, y: 0 };
  ship.x += (ship.v * c - ship.sway * s + current.x) * dt;
  ship.y += (ship.v * s + ship.sway * c + current.y) * dt;
};

/** Contact after a move. Collisions are tested half a unit inside the
 *  paintwork, so a scrape that looks clear on screen is clear. */
const collide = (sim: Sim): 'crash' | 'bump' | null => {
  const { level, vehicle } = sim;
  let bump = false;
  for (const outline of outlines(sim, 0.5)) {
    if (outline.some((p) => p.x < 0 || p.x > W || p.y < 0 || p.y > H)) return 'crash';
    for (let i = 0; i < level.obstacles.length; i += 1) {
      const o = level.obstacles[i];
      const round = o.kind === 'cone' || o.kind === 'buoy';
      if (!(round ? circleHits(outline, o.x, o.y, o.w / 2) : overlaps(outline, sim.quads[i]))) continue;
      if (!SOFT.includes(o.kind)) return 'crash';
      const gentle = level.fleet === 'ship' ? vehicle.speed < SHIP_BUMP : vehicle.v < BUMP;
      if (!gentle) return 'crash';
      bump = true;
    }
  }
  return bump ? 'bump' : null;
};

/**
 * A ship resting slowly against a quay swings round to lie flat along its
 * fenders, as a real one does once it touches. Without this, straightening up
 * alongside would swing the stern into the quay, which the fenders stop, and
 * the ship would be stuck at whatever angle it arrived.
 */
const FLATTEN = 0.35; // radians a second
const FLATTEN_BELOW = 8; // only at berthing speed, not when steaming past
const lieAlongside = (sim: Sim, dt: number) => {
  const { level, vehicle: ship } = sim;
  sim.alongside = false;
  if (ship.speed >= FLATTEN_BELOW) return;
  const [hullBox] = bodies(sim);
  const reach = hull({ ...hullBox, w: hullBox.w + 8, h: hullBox.h + 8 }); // within 4 of the fenders
  const index = level.obstacles.findIndex((o, i) => o.kind === 'quay' && overlaps(reach, sim.quads[i]));
  if (index < 0) return;
  sim.alongside = true;
  const quay = level.obstacles[index];

  // Quays run the width or height of the harbour: lie along that line, and
  // back off towards open water whenever the swing would press into it.
  const along = quay.w >= quay.h ? 0 : HALF_PI;
  const target = along + Math.round((ship.a - along) / Math.PI) * Math.PI;
  const swing = clamp(target - ship.a, -FLATTEN * dt, FLATTEN * dt);
  if (!swing) return;
  ship.a += swing;
  const out = quay.w >= quay.h ? { x: 0, y: Math.sign(H / 2 - quay.y) } : { x: Math.sign(W / 2 - quay.x), y: 0 };
  for (let i = 0; i < 40 && overlaps(outlines(sim, 0.5)[0], sim.quads[index]); i += 1) {
    ship.x += out.x * 0.25;
    ship.y += out.y * 0.25;
  }
};

/** Moves the game on by `dt` seconds; says if that ended the level. */
export const advance = (sim: Sim, input: Input, dt: number): Outcome => {
  const { level, vehicle } = sim;
  const { x, y, a, trailer } = vehicle;
  if (level.fleet === 'ship') moveShip(sim, input, dt);
  else moveTruck(sim, input, dt);
  vehicle.speed = Math.hypot(vehicle.x - x, vehicle.y - y) / dt;

  const contact = collide(sim);
  if (contact === 'crash') return 'crash';
  if (contact === 'bump') Object.assign(vehicle, { x, y, a, trailer, v: 0, yaw: 0, sway: 0, speed: 0 }); // held
  if (level.fleet === 'ship') lieAlongside(sim, dt);
  if (level.fleet === 'trailer' && Math.abs(wrap(vehicle.a - vehicle.trailer)) > JACKKNIFE) return 'jackknife';

  // Parked: the load (the trailer, on an artic) wholly inside the lines,
  // square to them, and stopped - held there for a moment.
  const all = bodies(sim);
  const load = level.fleet === 'trailer' ? all[1] : all[0];
  const heading = level.fleet === 'trailer' ? vehicle.trailer : vehicle.a;
  const { bay } = level;
  sim.inBay = (level.fleet === 'ship' ? hull(load) : boxQuad(load)).every((p) => {
    const local = toLocal(bay, p);
    return Math.abs(local.x) <= bay.w / 2 + 0.5 && Math.abs(local.y) <= bay.h / 2 + 0.5;
  });
  let off = Math.abs(wrap(heading - bay.a));
  if (!bay.face) off = Math.min(off, Math.PI - off);
  const stopped = vehicle.speed < 4;
  sim.ready = sim.inBay && off < ALIGN && stopped;
  sim.hold = sim.ready ? sim.hold + dt : Math.max(0, sim.hold - dt * 3);

  // Stopped with the load's middle on the bay but not counting: say why.
  const middle = toLocal(bay, load);
  const onBay = Math.abs(middle.x) <= bay.w / 2 && Math.abs(middle.y) <= bay.h / 2;
  sim.tip = null;
  if (onBay && stopped && !sim.ready) {
    if (bay.face && Math.abs(wrap(heading - bay.a)) > HALF_PI) sim.tip = 'facing';
    else if (off >= ALIGN) sim.tip = 'straight';
    else sim.tip = 'inside';
  }
  return sim.hold >= HOLD ? 'parked' : null;
};
