/**
 * INPUT HANDLING - SESSION 1
 * Tracks keyboard state for smooth player movement.
 */

const keys = {
  left: false,
  right: false
};

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
    keys.left = true;
  }
  if (e.code === 'KeyD' || e.code === 'ArrowRight') {
    keys.right = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
    keys.left = false;
  }
  if (e.code === 'KeyD' || e.code === 'ArrowRight') {
    keys.right = false;
  }
});
