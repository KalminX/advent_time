/**
 * CORE GAME LOOP & ENGINE
 * Every video game in history runs on a loop: Update logic -> Draw frame -> Repeat!
 */

// Milestone 1.1: Our hero's position on digital graph paper
let playerX = 50;
let playerY = 120;
const playerWidth = 10;
const playerHeight = 14;

// 1. UPDATE: Calculate movements, physics, and state changes
function update() {
  // We will add controls, gravity, and collisions here!
}

// 2. RENDER: Draw everything onto the screen
function render() {
  // Wipe screen clean with black
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Draw our hero in neon green
  ctx.fillStyle = COLOR_FG;
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// 3. GAME LOOP: The infinite 60 FPS flipbook
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the flipbook!
requestAnimationFrame(gameLoop);
