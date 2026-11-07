/**
 * INPUT HANDLING - SESSION 2
 * Keyboard listeners with jump buffering, coyote time, and variable jump height.
 */

const keys = {
  left: false,
  right: false,
  jump: false,
  restart: false
};

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
    // Variable jump height: releasing early cuts upward velocity
    if (typeof player !== 'undefined' && player.vy < -2.0) {
      player.vy = -2.0;
    }
  }
  if (e.code === 'KeyR') {
    keys.restart = false;
  }
});
