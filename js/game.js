/**
 * CORE GAME LOOP & ENGINE - SESSION 1
 * Controls player movement using input listeners and renders Gemini ASCII sprite.
 */

let player = {
  x: 50,
  y: 120,
  w: 10,
  h: 13,
  speed: 1.8
};

// 1. UPDATE: Handle keyboard input and screen bounds
function update() {
  if (keys.left) {
    player.x -= player.speed;
  }
  if (keys.right) {
    player.x += player.speed;
  }

  // Clamping to screen boundaries
  if (player.x < 0) player.x = 0;
  if (player.x > SCREEN_WIDTH - player.w) player.x = SCREEN_WIDTH - player.w;
}

// 2. RENDER: Draw the frame
function render() {
  // Wipe screen clean with black
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Draw our Gemini pixel art hero
  drawSprite(SPRITE_PLAYER_IDLE, player.x, player.y);
}

// 3. GAME LOOP: 60 FPS flipbook
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start loop
requestAnimationFrame(gameLoop);
