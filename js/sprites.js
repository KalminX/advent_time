/**
 * PIXEL ART SPRITES - SESSION 1
 * Generated live with Gemini: 10x13 ASCII matrix rendered pixel-by-pixel.
 */

// Player Idle Sprite: 10 wide x 13 high humanoid
const SPRITE_PLAYER_IDLE = [
  "  ####    ",
  "  ####    ",
  "   ##     ",
  " ######   ",
  "## ## ##  ",
  "## ## ##  ",
  " ######   ",
  "  ####    ",
  "  #  #    ",
  "  #  #    ",
  "  #  #    ",
  " ##  ##   ",
  " ##  ##   "
];

/**
 * Draws an ASCII sprite matrix to the canvas.
 * '#' characters are drawn as 1x1 pixel rectangles in neon green.
 */
function drawSprite(sprite, x, y) {
  ctx.fillStyle = COLOR_FG;
  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      if (sprite[row][col] === '#') {
        ctx.fillRect(Math.floor(x + col), Math.floor(y + row), 1, 1);
      }
    }
  }
}
