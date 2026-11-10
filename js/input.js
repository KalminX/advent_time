/**
 * INPUT HANDLING
 * Keyboard & pointer listeners with jump buffering, variable jump height,
 * and on-screen mobile/tablet arcade controls.
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

// Keyboard input
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
  if (e.code === 'KeyP' || e.code === 'Escape') {
    if (typeof gameState !== 'undefined' && gameState === STATE_PLAYING) {
      isPaused = !isPaused;
    }
  }
  if (e.code === 'KeyF') {
    toggleFullscreen();
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

// Fullscreen helper
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// Click / tap canvas to start or restart
const canvasEl = document.getElementById('gameCanvas');
if (canvasEl) {
  canvasEl.addEventListener('pointerdown', () => {
    unlockAudio();
    if (typeof gameState !== 'undefined') {
      if (gameState === STATE_TITLE) {
        gameState = STATE_PLAYING;
      } else if (gameState === STATE_WON) {
        resetGame();
      }
    }
  });
}

// AudioContext warmup on first user gesture
function unlockAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (err) {}
}
window.addEventListener('pointerdown', unlockAudio, { passive: true });

// Prevent unwanted context menu on touch controls / canvas
window.addEventListener('contextmenu', (e) => {
  if (e.target.closest('#game-container')) {
    e.preventDefault();
  }
});

// Automatic touch detection
function enableTouchMode() {
  document.body.classList.add('touch-active');
}
window.addEventListener('touchstart', enableTouchMode, { once: true, passive: true });
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  enableTouchMode();
}

// ==========================================
// VIRTUAL TOUCH CONTROLLER BINDINGS
// ==========================================
function setupTouchButton(buttonId, onDown, onUp) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    unlockAudio();
    try {
      btn.setPointerCapture(e.pointerId);
    } catch (err) {}
    btn.classList.add('is-pressed');
    onDown(e);
  });

  const release = (e) => {
    btn.classList.remove('is-pressed');
    onUp(e);
  };

  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointercancel', release);
}

// Directional Left / Right
setupTouchButton('btn-left',
  () => { keys.left = true; },
  () => { keys.left = false; }
);

setupTouchButton('btn-right',
  () => { keys.right = true; },
  () => { keys.right = false; }
);

// Jump Action Button
setupTouchButton('btn-jump',
  () => {
    if (typeof gameState !== 'undefined') {
      if (gameState === STATE_TITLE) {
        gameState = STATE_PLAYING;
        return;
      } else if (gameState === STATE_WON) {
        resetGame();
        return;
      }
    }
    jumpBufferTimer = 6;
    keys.jump = true;
  },
  () => {
    keys.jump = false;
    if (typeof player !== 'undefined' && player.vy < -2.0) {
      player.vy = -2.0;
    }
  }
);

// Utility Buttons: Pause, Reset, Fullscreen
const btnPause = document.getElementById('btn-pause');
if (btnPause) {
  btnPause.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    unlockAudio();
    if (typeof gameState !== 'undefined' && gameState === STATE_PLAYING) {
      isPaused = !isPaused;
    }
  });
}

const btnRestart = document.getElementById('btn-restart');
if (btnRestart) {
  btnRestart.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    unlockAudio();
    resetGame();
  });
}

const btnFs = document.getElementById('btn-fs');
if (btnFs) {
  btnFs.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    toggleFullscreen();
  });
}
