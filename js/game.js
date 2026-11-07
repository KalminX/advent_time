/**
 * CORE GAME LOOP & ENGINE
 * Handles physics updates, collision resolution, camera tracking, and rendering.
 */

// Web Audio API 8-Bit Retro Sound Synthesizer (Zero Dependencies)
let audioCtx = null;
function playSfx(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'jump') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'death') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'win') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // AudioContext blocked by browser policy until gesture
  }
}

// URL query parameter support for direct testing/preview
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('state') === 'playing') {
  gameState = STATE_PLAYING;
} else if (urlParams.get('state') === 'won') {
  gameState = STATE_WON;
}

if (urlParams.has('x')) {
  player.x = parseFloat(urlParams.get('x'));
  player.spawnX = player.x;
  cameraX = player.x - 100;
}

// ==========================================
// 1. GAME LOGIC & UPDATES
// ==========================================
function update() {
  // Title Screen State
  if (gameState === STATE_TITLE) {
    if (keys.jump || jumpBufferTimer > 0) {
      gameState = STATE_PLAYING;
      jumpBufferTimer = 0;
      keys.jump = false;
    }
    return;
  }

  // Victory State
  if (gameState === STATE_WON) {
    if (keys.restart) {
      resetGame();
    }
    return;
  }

  // Restart key handling
  if (keys.restart) {
    resetGame();
    return;
  }

  // Decrement jump buffer
  if (jumpBufferTimer > 0) {
    jumpBufferTimer--;
  }

  // Coyote timer (allows jumping a few frames after leaving a platform)
  if (player.isGrounded) {
    coyoteTimer = 6;
  } else if (coyoteTimer > 0) {
    coyoteTimer--;
  }

  // --- PLAYER HORIZONTAL MOVEMENT ---
  player.vx = 0;
  if (keys.left) {
    player.vx = -MOVE_SPEED;
    player.facingLeft = true;
  }
  if (keys.right) {
    player.vx = MOVE_SPEED;
    player.facingLeft = false;
  }

  // Apply horizontal movement
  player.x += player.vx;
  // Left level boundary
  if (player.x < 0) player.x = 0;

  // Horizontal Collision Resolution against solid platforms
  for (let p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vx > 0) {
        player.x = p.x - player.w;
      } else if (player.vx < 0) {
        player.x = p.x + p.w;
      }
    }
  }

  // --- PLAYER VERTICAL MOVEMENT & JUMPING ---
  // Jump is allowed only if grounded or within coyote time window
  if (jumpBufferTimer > 0 && coyoteTimer > 0) {
    player.vy = JUMP_VELOCITY;
    player.isGrounded = false;
    coyoteTimer = 0;
    jumpBufferTimer = 0;
    playSfx('jump');
  }

  // Apply gravity
  player.vy += GRAVITY;
  if (player.vy > MAX_FALL_SPEED) {
    player.vy = MAX_FALL_SPEED;
  }

  player.y += player.vy;
  player.isGrounded = false;

  // Vertical Collision Resolution against solid platforms
  for (let p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vy > 0) {
        // Landing on top of a platform
        player.y = p.y - player.h;
        player.vy = 0;
        player.isGrounded = true;
      } else if (player.vy < 0) {
        // Hitting ceiling
        player.y = p.y + p.h;
        player.vy = 0;
      }
    }
  }

  // Update walk animation timer
  if (player.vx !== 0 && player.isGrounded) {
    player.walkTimer += 0.2;
  } else {
    player.walkTimer = 0;
  }

  // --- PIT / FALLING OFF LEVEL ---
  if (player.y > SCREEN_HEIGHT + 20) {
    killPlayer();
  }

  // --- SPIKE COLLISIONS (Generous 2px inner margin) ---
  for (let s of spikes) {
    const spikeHitbox = {
      x: s.x + 2,
      y: s.y + 2,
      w: s.w - 4,
      h: s.h - 2
    };
    if (rectsOverlap(player, spikeHitbox)) {
      killPlayer();
      break;
    }
  }

  // --- CREATURE UPDATES & COLLISIONS ---
  for (let c of creatures) {
    if (c.type === 'strider') {
      // Horizontal patrol
      c.x += c.vx;
      c.animTimer += 0.12;
      if (c.x <= c.minX) {
        c.x = c.minX;
        c.vx = Math.abs(c.vx);
      } else if (c.x >= c.maxX) {
        c.x = c.maxX;
        c.vx = -Math.abs(c.vx);
      }
    } else if (c.type === 'drone') {
      // Sinusoidal vertical hover
      c.hoverOffset += c.hoverSpeed;
      c.y = c.baseY + Math.sin(c.hoverOffset) * c.hoverRadius;
      c.animTimer += 0.08;
    }

    // Creature collision with player (lethal)
    const creatureHitbox = {
      x: c.x + 3,
      y: c.y + 3,
      w: c.w - 6,
      h: c.h - 6
    };
    if (rectsOverlap(player, creatureHitbox)) {
      killPlayer();
    }
  }

  // --- EXIT GOAL REACHED ---
  if (rectsOverlap(player, exitDoor)) {
    if (gameState !== STATE_WON) {
      playSfx('win');
    }
    gameState = STATE_WON;
  }

  // --- CAMERA UPDATE ---
  // Camera smoothly tracks player, keeping them offset
  const targetCamX = player.x - 100;
  cameraX += (targetCamX - cameraX) * 0.15;
  // Clamp camera within level bounds
  if (cameraX < 0) cameraX = 0;
  if (cameraX > LEVEL_WIDTH - SCREEN_WIDTH) {
    cameraX = LEVEL_WIDTH - SCREEN_WIDTH;
  }
}

// ==========================================
// 2. RENDERING
// Strict monochrome: #000000 background, #39FF14 foreground
// ==========================================
function render() {
  // Clear screen with pure black
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Screen death flash effect (single frame invert)
  if (deathFlashTimer > 0) {
    deathFlashTimer--;
    ctx.fillStyle = COLOR_FG;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    return;
  }

  // --- 1. RENDER PLATFORMS & TERRAIN ---
  ctx.fillStyle = COLOR_FG;
  for (let p of platforms) {
    const rx = Math.floor(p.x - cameraX);
    const ry = Math.floor(p.y);

    // Skip off-screen platforms
    if (rx + p.w < 0 || rx > SCREEN_WIDTH) continue;

    // Platform solid green body
    ctx.fillRect(rx, ry, p.w, p.h);

    // Retro detail: carve a 1px black accent line beneath top surface
    if (p.h >= 8 && p.w >= 8) {
      ctx.fillStyle = COLOR_BG;
      ctx.fillRect(rx + 2, ry + 2, p.w - 4, p.h - 3);
      ctx.fillStyle = COLOR_FG;
    }
  }

  // --- 2. RENDER SPIKES ---
  for (let s of spikes) {
    const sx = Math.floor(s.x - cameraX);
    const sy = Math.floor(s.y);

    if (sx + s.w < 0 || sx > SCREEN_WIDTH) continue;

    // Draw individual sharp pixel teeth (each 4px wide)
    const teethCount = Math.floor(s.w / 4);
    for (let i = 0; i < teethCount; i++) {
      const toothX = sx + i * 4;
      ctx.fillRect(toothX + 1, sy + 0, 2, 2);
      ctx.fillRect(toothX + 1, sy + 2, 2, 2);
      ctx.fillRect(toothX + 0, sy + 4, 4, 2);
      ctx.fillRect(toothX + 0, sy + 6, 4, 2);
    }
  }

  // --- 3. RENDER EXIT GATEWAY ---
  drawSprite(SPRITE_PORTAL, exitDoor.x, exitDoor.y);
  // Pulsing central beacon core
  const pulse = Math.floor(Date.now() / 200) % 2;
  if (pulse === 0) {
    const ex = Math.floor(exitDoor.x - cameraX);
    ctx.fillStyle = COLOR_FG;
    ctx.fillRect(ex + 8, exitDoor.y + 10, 4, 8);
  }

  // --- 4. RENDER CREATURES ---
  for (let c of creatures) {
    if (c.type === 'strider') {
      const frame = Math.floor(c.animTimer) % 2;
      const sprite = frame === 0 ? SPRITE_STRIDER_FRAME_1 : SPRITE_STRIDER_FRAME_2;
      drawSprite(sprite, c.x, c.y, c.vx < 0);
    } else if (c.type === 'drone') {
      const frame = Math.floor(c.animTimer) % 2;
      const sprite = frame === 0 ? SPRITE_DRONE_FRAME_1 : SPRITE_DRONE_FRAME_2;
      drawSprite(sprite, c.x, c.y, false);
    }
  }

  // --- 5. RENDER PLAYER ---
  let playerSprite = SPRITE_PLAYER_IDLE;
  if (!player.isGrounded) {
    playerSprite = SPRITE_PLAYER_JUMP;
  } else if (player.vx !== 0) {
    const walkFrame = Math.floor(player.walkTimer) % 2;
    playerSprite = walkFrame === 0 ? SPRITE_PLAYER_WALK_1 : SPRITE_PLAYER_WALK_2;
  }
  drawSprite(playerSprite, player.x, player.y, player.facingLeft);

  // --- 6. MINIMAL IN-GAME HUD ---
  if (gameState === STATE_PLAYING) {
    // Minimal corner progress indicator
    const progress = Math.min(100, Math.floor((player.x / (exitDoor.x)) * 100));
    drawPixelText(`DIST:${progress}%`, 8, 8, 1);
    drawPixelText("R:RESET", SCREEN_WIDTH - 38, 8, 1);
  }

  // --- 7. OVERLAY SCREENS ---
  if (gameState === STATE_TITLE) {
    // Black background card
    ctx.fillStyle = COLOR_BG;
    ctx.fillRect(28, 16, 264, 148);

    // Green border box
    drawPixelBox(28, 16, 264, 148);

    // Title & prompt
    drawPixelTextCentered("NEON MONO PLATFORMER", 38, 1);
    drawPixelTextCentered("--------------------", 50, 1);
    drawPixelTextCentered("A / D   : MOVE", 68, 1);
    drawPixelTextCentered("SPACE   : JUMP", 80, 1);
    drawPixelTextCentered("R       : RESTART", 92, 1);

    // Prompt with blinking indicator arrows
    const blink = Math.floor(Date.now() / 400) % 2 === 0;
    const arrowL = blink ? ">> " : "   ";
    const arrowR = blink ? " <<" : "   ";
    drawPixelTextCentered(`${arrowL}PRESS SPACE TO START${arrowR}`, 124, 1);
  } else if (gameState === STATE_WON) {
    // Victory banner box
    ctx.fillStyle = COLOR_BG;
    ctx.fillRect(28, 28, 264, 124);

    drawPixelBox(28, 28, 264, 124);

    drawPixelTextCentered("MISSION COMPLETE!", 54, 1);
    drawPixelTextCentered("YOU REACHED THE EXIT GATE", 72, 1);

    const blink = Math.floor(Date.now() / 400) % 2 === 0;
    const arrowL = blink ? ">> " : "   ";
    const arrowR = blink ? " <<" : "   ";
    drawPixelTextCentered(`${arrowL}PRESS R TO PLAY AGAIN${arrowR}`, 108, 1);
  }
}

// ==========================================
// 3. ANIMATION LOOP
// ==========================================
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the loop
requestAnimationFrame(gameLoop);
