/**
 * 3x5 PIXEL BITMAP FONT & TEXT RENDERER
 * Guarantees zero anti-aliasing / pure 1-bit pixel text.
 */

const FONT_GLYPHS = {
  'A': [
    "###",
    "#.#",
    "###",
    "#.#",
    "#.#"
  ],
  'B': [
    "##.",
    "#.#",
    "##.",
    "#.#",
    "##."
  ],
  'C': [
    "###",
    "#..",
    "#..",
    "#..",
    "###"
  ],
  'D': [
    "##.",
    "#.#",
    "#.#",
    "#.#",
    "##."
  ],
  'E': [
    "###",
    "#..",
    "##.",
    "#..",
    "###"
  ],
  'F': [
    "###",
    "#..",
    "##.",
    "#..",
    "#.."
  ],
  'G': [
    "###",
    "#..",
    "#.#",
    "#.#",
    "###"
  ],
  'H': [
    "#.#",
    "#.#",
    "###",
    "#.#",
    "#.#"
  ],
  'I': [
    "###",
    ".#.",
    ".#.",
    ".#.",
    "###"
  ],
  'J': [
    "..#",
    "..#",
    "..#",
    "#.#",
    "###"
  ],
  'K': [
    "#.#",
    "#.#",
    "##.",
    "#.#",
    "#.#"
  ],
  'L': [
    "#..",
    "#..",
    "#..",
    "#..",
    "###"
  ],
  'M': [
    "#.#",
    "###",
    "#.#",
    "#.#",
    "#.#"
  ],
  'N': [
    "###",
    "#.#",
    "#.#",
    "#.#",
    "#.#"
  ],
  'O': [
    "###",
    "#.#",
    "#.#",
    "#.#",
    "###"
  ],
  'P': [
    "###",
    "#.#",
    "###",
    "#..",
    "#.."
  ],
  'Q': [
    "###",
    "#.#",
    "#.#",
    "###",
    "..#"
  ],
  'R': [
    "###",
    "#.#",
    "##.",
    "#.#",
    "#.#"
  ],
  'S': [
    "###",
    "#..",
    "###",
    "..#",
    "###"
  ],
  'T': [
    "###",
    ".#.",
    ".#.",
    ".#.",
    ".#."
  ],
  'U': [
    "#.#",
    "#.#",
    "#.#",
    "#.#",
    "###"
  ],
  'V': [
    "#.#",
    "#.#",
    "#.#",
    "#.#",
    ".#."
  ],
  'W': [
    "#.#",
    "#.#",
    "#.#",
    "###",
    "#.#"
  ],
  'X': [
    "#.#",
    "#.#",
    ".#.",
    "#.#",
    "#.#"
  ],
  'Y': [
    "#.#",
    "#.#",
    "###",
    ".#.",
    ".#."
  ],
  'Z': [
    "###",
    "..#",
    ".#.",
    "#..",
    "###"
  ],
  '0': [
    "###",
    "#.#",
    "#.#",
    "#.#",
    "###"
  ],
  '1': [
    ".#.",
    "##.",
    ".#.",
    ".#.",
    "###"
  ],
  '2': [
    "###",
    "..#",
    "###",
    "#..",
    "###"
  ],
  '3': [
    "###",
    "..#",
    "###",
    "..#",
    "###"
  ],
  '4': [
    "#.#",
    "#.#",
    "###",
    "..#",
    "..#"
  ],
  '5': [
    "###",
    "#..",
    "###",
    "..#",
    "###"
  ],
  '6': [
    "###",
    "#..",
    "###",
    "#.#",
    "###"
  ],
  '7': [
    "###",
    "..#",
    ".#.",
    ".#.",
    ".#."
  ],
  '8': [
    "###",
    "#.#",
    "###",
    "#.#",
    "###"
  ],
  '9': [
    "###",
    "#.#",
    "###",
    "..#",
    "###"
  ],
  ':': [
    "...",
    ".#.",
    "...",
    ".#.",
    "..."
  ],
  '-': [
    "...",
    "...",
    "###",
    "...",
    "..."
  ],
  '!': [
    ".#.",
    ".#.",
    ".#.",
    "...",
    ".#."
  ],
  '>': [
    "#..",
    ".#.",
    "..#",
    ".#.",
    "#.."
  ],
  '<': [
    "..#",
    ".#.",
    "#..",
    ".#.",
    "..#"
  ],
  '/': [
    "..#",
    "..#",
    ".#.",
    "#..",
    "#.."
  ],
  '.': [
    "...",
    "...",
    "...",
    "...",
    ".#."
  ],
  ',': [
    "...",
    "...",
    "...",
    ".#.",
    "#.."
  ],
  '%': [
    "#.#",
    "..#",
    ".#.",
    "#..",
    "#.#"
  ],
  ' ': [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
};

/**
 * Draws text onto canvas using the 3x5 1-bit bitmap font.
 * @param {string} text Text to render (converted to uppercase)
 * @param {number} x Screen X
 * @param {number} y Screen Y
 * @param {number} scale Pixel scale multiplier (default 1)
 */
function drawPixelText(text, x, y, scale = 1) {
  const upper = text.toUpperCase();
  let cursorX = Math.floor(x);
  const startY = Math.floor(y);

  ctx.fillStyle = COLOR_FG;

  for (let i = 0; i < upper.length; i++) {
    const char = upper[i];
    const glyph = FONT_GLYPHS[char] || FONT_GLYPHS[' '];

    for (let r = 0; r < 5; r++) {
      const row = glyph[r];
      for (let c = 0; c < 3; c++) {
        if (row[c] === '#') {
          ctx.fillRect(cursorX + c * scale, startY + r * scale, scale, scale);
        }
      }
    }
    // 3 pixels glyph + 1 pixel letter-spacing
    cursorX += 4 * scale;
  }
}

/**
 * Draws horizontally centered text on the screen.
 * @param {string} text Text to render
 * @param {number} y Screen Y
 * @param {number} scale Pixel scale multiplier (default 1)
 */
function drawPixelTextCentered(text, y, scale = 1) {
  const textWidth = text.length * 4 * scale - scale;
  const x = Math.floor((SCREEN_WIDTH - textWidth) / 2);
  drawPixelText(text, x, y, scale);
}

/**
 * Draws a crisp 1-pixel hollow rectangle using exact integer pixels.
 */
function drawPixelBox(x, y, w, h) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iw = Math.floor(w);
  const ih = Math.floor(h);

  ctx.fillStyle = COLOR_FG;
  ctx.fillRect(ix, iy, iw, 1);
  ctx.fillRect(ix, iy + ih - 1, iw, 1);
  ctx.fillRect(ix, iy, 1, ih);
  ctx.fillRect(ix + iw - 1, iy, 1, ih);
}
