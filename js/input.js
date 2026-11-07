/**
 * INPUT HANDLING
 * Keyboard & pointer listeners with jump buffering and variable jump height.
 */

const keys = {
  left: false,
  right: false,
  jump: false,
  restart: false
};

// Jump feel: Coyote time and jump buffering
let coyoteTimer = 0;
let jumpBufferTimer = 0;

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
    keys.left = true;
  }
  if (e.code === 'KeyD' || e.code === 'ArrowRight') {
    keys.right = true;
  }
  if (e.code === 'Space') {
    jumpBufferTimer = 6; // Buffer jump for 6 frames
    keys.jump = true;
    e.preventDefault();
  }
  if (e.code === 'KeyR') {
    keys.restart = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
    keys.left = false;
  }
  if (e.code === 'KeyD' || e.code === 'ArrowRight') {
    keys.right = false;
  }
  if (e.code === 'Space') {
    keys.jump = false;
    // Allow variable jump height by cutting upward velocity on early release
    if (typeof player !== 'undefined' && player.vy < -2.0) {
      player.vy = -2.0;
    }
  }
  if (e.code === 'KeyR') {
    keys.restart = false;
  }
});

// Click / tap support to start or restart
window.addEventListener('pointerdown', () => {
  if (typeof gameState !== 'undefined') {
    if (gameState === STATE_TITLE) {
      gameState = STATE_PLAYING;
    } else if (gameState === STATE_WON) {
      resetGame();
    }
  }
});
