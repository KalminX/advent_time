/**
 * LEVEL GEOMETRY & ENTITIES - SESSION 2
 * Platform layouts, player state, and collision helpers.
 */

// Player entity state
const player = {
  x: 20,
  y: 130,
  w: 10,
  h: 13,
  vx: 0,
  vy: 0,
  isGrounded: false,
  facingLeft: false,
  animTimer: 0
};

// Solid terrain platforms: {x, y, w, h}
// Generated with Gemini across 4 screens
const platforms = [
  // SECTION 1: Spawn area & introductory ledges (x: 0 - 320)
  { x: 0, y: 154, w: 120, h: 26 },
  { x: 100, y: 124, w: 48, h: 10 },
  { x: 172, y: 98, w: 48, h: 10 },
  { x: 236, y: 124, w: 48, h: 10 },
  { x: 300, y: 154, w: 80, h: 26 },

  // SECTION 2: Ground area & upper ledges (x: 320 - 640)
  { x: 380, y: 154, w: 220, h: 26 },
  { x: 400, y: 110, w: 38, h: 10 },
  { x: 460, y: 100, w: 38, h: 10 },
  { x: 520, y: 110, w: 38, h: 10 },

  // SECTION 3: Deep chasm & stepping pillars (x: 640 - 960)
  { x: 620, y: 140, w: 34, h: 40 },
  { x: 685, y: 122, w: 32, h: 58 },
  { x: 746, y: 106, w: 32, h: 74 },
  { x: 808, y: 124, w: 36, h: 56 },
  { x: 870, y: 144, w: 45, h: 36 },

  // SECTION 4: Final approach & Exit plateau (x: 960 - 1280)
  { x: 940, y: 130, w: 40, h: 10 },
  { x: 1005, y: 112, w: 44, h: 10 },
  { x: 1072, y: 128, w: 42, h: 10 },
  { x: 1134, y: 148, w: 146, h: 32 }
];

/**
 * Axis-Aligned Bounding Box (AABB) overlap check.
 */
function rectsOverlap(r1, r2) {
  return (
    r1.x < r2.x + r2.w &&
    r1.x + r1.w > r2.x &&
    r1.y < r2.y + r2.h &&
    r1.y + r1.h > r2.y
  );
}
