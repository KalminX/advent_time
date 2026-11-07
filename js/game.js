/**
 * CORE GAME LOOP & ENGINE - SESSION 2
 * Euler physics, AABB platform collisions, coyote time, and jump buffering.
 */

function update() {
  // Jump buffer countdown
  if (jumpBufferTimer > 0) jumpBufferTimer--;

  // Coyote timer (allows jumping a few frames after leaving platform edge)
  if (player.isGrounded) {
    coyoteTimer = 6;
  } else if (coyoteTimer > 0) {
    coyoteTimer--;
  }

  // Horizontal movement
  player.vx = 0;
  if (keys.left) {
    player.vx = -MOVE_SPEED;
    player.facingLeft = true;
    player.animTimer++;
  } else if (keys.right) {
    player.vx = MOVE_SPEED;
    player.facingLeft = false;
    player.animTimer++;
  } else {
    player.animTimer = 0;
  }

  player.x += player.vx;
  if (player.x < 0) player.x = 0;

  // Horizontal collision resolution
  for (let p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  // Jump execution: intent buffered + coyote grace window
  if (jumpBufferTimer > 0 && coyoteTimer > 0) {
    player.vy = JUMP_VELOCITY;
    player.isGrounded = false;
    coyoteTimer = 0;
    jumpBufferTimer = 0;
  }

  // Apply Euler gravity
  player.vy += GRAVITY;
  if (player.vy > MAX_FALL_SPEED) player.vy = MAX_FALL_SPEED;

  // Vertical movement
  player.y += player.vy;
  player.isGrounded = false;

  // Vertical collision resolution
  for (let p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vy > 0) {
        // Landing on top of platform
        player.y = p.y - player.h;
        player.vy = 0;
        player.isGrounded = true;
      } else if (player.vy < 0) {
        // Bumping ceiling
        player.y = p.y + p.h;
        player.vy = 0;
      }
    }
  }

  // Pit reset if falling into the void
  if (player.y > SCREEN_HEIGHT + 20) {
    player.x = 20;
    player.y = 130;
    player.vy = 0;
  }
}

function render() {
  // Wipe screen clean with black
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Draw all platforms in neon green
  ctx.fillStyle = COLOR_FG;
  for (let p of platforms) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }

  // Select sprite frame
  let sprite = SPRITE_PLAYER_IDLE;
  if (!player.isGrounded) {
    sprite = SPRITE_PLAYER_JUMP;
  } else if (player.vx !== 0) {
    const frame = Math.floor(player.animTimer / 6) % 2;
    sprite = frame === 0 ? SPRITE_PLAYER_WALK_1 : SPRITE_PLAYER_WALK_2;
  }

  // Draw player
  drawSprite(sprite, player.x, player.y, player.facingLeft);
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
