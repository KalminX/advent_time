/**
 * LEVEL GEOMETRY & ENTITIES
 * Platform layouts, hazards, player state, creatures, and collision helpers.
 */

// Solid terrain platforms: {x, y, w, h}
const platforms = [
  // SECTION 1: Spawn area & introductory ledges (x: 0 - 320)
  { x: 0, y: 154, w: 120, h: 26 },
  { x: 100, y: 124, w: 48, h: 10 },
  { x: 172, y: 98, w: 48, h: 10 },
  { x: 236, y: 124, w: 48, h: 10 },
  { x: 300, y: 154, w: 80, h: 26 },

  // SECTION 2: Ground area & Strider patrol (x: 320 - 640)
  { x: 380, y: 154, w: 220, h: 26 },
  // High route platforms above the strider
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

// Spikes: lethal hazards {x, y, w, h}
const spikes = [
  // Pit hazard in section 1
  { x: 120, y: 172, w: 52, h: 8 },
  // Spikes between section 1 and 2
  { x: 284, y: 172, w: 16, h: 8 },
  // Spike barrier before section 3
  { x: 576, y: 146, w: 24, h: 8 },
  // Chasm floor spikes in section 3
  { x: 654, y: 172, w: 31, h: 8 },
  { x: 717, y: 172, w: 29, h: 8 },
  { x: 778, y: 172, w: 30, h: 8 },
  { x: 844, y: 172, w: 26, h: 8 },
  // Gap before the final plateau
  { x: 1114, y: 172, w: 20, h: 8 }
];

// Exit Portal destination
const exitDoor = {
  x: 1210,
  y: 120,
  w: 20,
  h: 28
};

// Player state
const player = {
  x: 24,
  y: 141,
  w: 10,
  h: 13,
  vx: 0,
  vy: 0,
  isGrounded: true,
  facingLeft: false,
  walkTimer: 0,
  spawnX: 24,
  spawnY: 141
};

// Creatures
const creatures = [
  // Creature 1: Oversized Strider patrolling horizontally on the ground
  {
    type: 'strider',
    x: 420,
    y: 136, // Sits directly on top of y: 154 ground
    w: 22,
    h: 18,
    vx: 0.65,
    minX: 386,
    maxX: 570,
    animTimer: 0
  },
  // Creature 2: Oversized Cyclopean Drone hovering above the chasm
  {
    type: 'drone',
    x: 718,
    y: 72,
    w: 20,
    h: 20,
    baseY: 72,
    hoverOffset: 0,
    hoverSpeed: 0.05,
    hoverRadius: 20,
    animTimer: 0
  }
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

/**
 * Resets player position back to starting point after hazard contact.
 */
function killPlayer() {
  player.x = player.spawnX;
  player.y = player.spawnY;
  player.vx = 0;
  player.vy = 0;
  player.isGrounded = true;
  coyoteTimer = 0;
  jumpBufferTimer = 0;
  deathFlashTimer = 6; // Brief 1-bit screen glitch
  if (typeof playSfx === 'function') {
    playSfx('death');
  }
}

/**
 * Full game restart.
 */
function resetGame() {
  killPlayer();
  gameState = STATE_PLAYING;
  // Reset creature positions
  creatures[0].x = 420;
  creatures[0].vx = 0.65;
  creatures[1].hoverOffset = 0;
}
