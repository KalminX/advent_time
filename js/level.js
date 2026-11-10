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

// Checkpoint Beacons: {x, y, w, h, active}
const checkpoints = [
  { x: 632, y: 124, w: 8, h: 16, active: false }
];

// Collectibles: Data Chips {x, y, w, h, collected}
const chips = [
  { x: 193, y: 84, w: 6, h: 6, collected: false },
  { x: 476, y: 86, w: 6, h: 6, collected: false },
  { x: 540, y: 96, w: 6, h: 6, collected: false },
  { x: 725, y: 48, w: 6, h: 6, collected: false },
  { x: 759, y: 92, w: 6, h: 6, collected: false },
  { x: 1024, y: 98, w: 6, h: 6, collected: false },
  { x: 1090, y: 114, w: 6, h: 6, collected: false }
];
let chipsCollected = 0;

// Run metrics and states
let runTimer = 0;
let runDeaths = 0;
let isPaused = false;
let isNewBestRecord = false;

// Subtle Parallax Starfield (Fixed positions, 1-bit pixels)
const stars = [];
for (let i = 0; i < 36; i++) {
  stars.push({
    x: (i * 37 + 19) % LEVEL_WIDTH,
    y: (i * 23 + 11) % 150,
    size: (i % 6 === 0) ? 2 : 1
  });
}

// Minimal Particle System
const particles = [];

function spawnParticles(x, y, count = 5, speed = 1.5) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const mag = (Math.random() * 0.7 + 0.3) * speed;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * mag,
      vy: Math.sin(angle) * mag,
      life: 10 + Math.floor(Math.random() * 8)
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function renderParticles() {
  ctx.fillStyle = COLOR_FG;
  for (let p of particles) {
    const px = Math.floor(p.x - cameraX);
    const py = Math.floor(p.y);
    if (px >= 0 && px < SCREEN_WIDTH && py >= 0 && py < SCREEN_HEIGHT) {
      ctx.fillRect(px, py, 1, 1);
    }
  }
}

// Player state
const player = {
  x: 24,
  y: 141,
  w: 10,
  h: 13,
  vx: 0,
  vy: 0,
  isGrounded: true,
  wasGrounded: true,
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
  if (gameState === STATE_PLAYING) {
    runDeaths++;
  }
  spawnParticles(player.x + 5, player.y + 6, 16, 2.4);
  player.x = player.spawnX;
  player.y = player.spawnY;
  player.vx = 0;
  player.vy = 0;
  player.isGrounded = true;
  player.wasGrounded = true;
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
  player.spawnX = 24;
  player.spawnY = 141;
  killPlayer();
  runDeaths = 0;
  runTimer = 0;
  chipsCollected = 0;
  isPaused = false;
  isNewBestRecord = false;
  chips.forEach(c => c.collected = false);
  checkpoints.forEach(cp => cp.active = false);
  particles.length = 0;
  gameState = STATE_PLAYING;
  // Reset creature positions
  creatures[0].x = 420;
  creatures[0].vx = 0.65;
  creatures[1].hoverOffset = 0;
}
