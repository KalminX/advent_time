/**
 * PIXEL ART SPRITES & SPRITE RENDERER
 * 2D string matrices of '#' pixels rendered in pure #39FF14.
 */

// Player: 10 wide x 13 high humanoid
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

const SPRITE_PLAYER_WALK_1 = [
  "  ####    ",
  "  ####    ",
  "   ##     ",
  " ######   ",
  " # ## #   ",
  " # ## #   ",
  "  ####    ",
  "  #  #    ",
  " ##   #   ",
  " #    ##  ",
  " #     #  ",
  "##        ",
  "##        "
];

const SPRITE_PLAYER_WALK_2 = [
  "  ####    ",
  "  ####    ",
  "   ##     ",
  " ######   ",
  " # ## #   ",
  " # ## #   ",
  "  ####    ",
  "  #  #    ",
  "  #   ##  ",
  " ##    #  ",
  " #     #  ",
  "       ## ",
  "       ## "
];

const SPRITE_PLAYER_JUMP = [
  "  ####    ",
  "  ####    ",
  "   ##     ",
  "########  ",
  "## ## ##  ",
  " ######   ",
  "  ####    ",
  " ##  ##   ",
  " #    #   ",
  "##    ##  ",
  "#      #  ",
  "          ",
  "          "
];

// Creature 1: Oversized Alien Strider (22w x 18h)
// Multi-legged patrolling arthropod/beast
const SPRITE_STRIDER_FRAME_1 = [
  "      ######          ",
  "    ##########        ",
  "   ############       ",
  "  ##############      ",
  "  ###  ####  ###      ",
  "  ###  ####  ###      ",
  "  ##############      ",
  "   ############       ",
  "    ##########        ",
  "     ########         ",
  "   ##  #  #  ##       ",
  "  ##   #  #   ##      ",
  "  #    #  #    #      ",
  " ##    #  #    ##     ",
  " #     #  #     #     ",
  " #     #  #     #     ",
  "##    ##  ##    ##    ",
  "#     #    #     #    "
];

const SPRITE_STRIDER_FRAME_2 = [
  "      ######          ",
  "    ##########        ",
  "   ############       ",
  "  ##############      ",
  "  ###  ####  ###      ",
  "  ###  ####  ###      ",
  "  ##############      ",
  "   ############       ",
  "    ##########        ",
  "     ########         ",
  "    ## #  # ##        ",
  "   ##  #  #  ##       ",
  "  ##   #  #   ##      ",
  "  #    #  #    #      ",
  " ##    #  #    ##     ",
  " #     #  #     #     ",
  " #     ## ##    #     ",
  "##              ##    "
];

// Creature 2: Oversized Cyclopean Drone / Jellyfish (20w x 20h)
// Hovering floating monolith with an eerie center eye
const SPRITE_DRONE_FRAME_1 = [
  "       ######       ",
  "     ##########     ",
  "    ############    ",
  "   ##############   ",
  "  ################  ",
  "  #####    ######   ",
  "  ####  ##  #####   ",
  "  ####  ##  #####   ",
  "  #####    ######   ",
  "  ################  ",
  "   ##############   ",
  "    ############    ",
  "     ##########     ",
  "       ######       ",
  "    #   #  #   #    ",
  "    #   #  #   #    ",
  "    #          #    ",
  "    ##  #  #  ##    ",
  "     #  #  #  #     ",
  "        #  #        "
];

const SPRITE_DRONE_FRAME_2 = [
  "       ######       ",
  "     ##########     ",
  "    ############    ",
  "   ##############   ",
  "  ################  ",
  "  #####    ######   ",
  "  ####  ##  #####   ",
  "  ####  ##  #####   ",
  "  #####    ######   ",
  "  ################  ",
  "   ##############   ",
  "    ############    ",
  "     ##########     ",
  "       ######       ",
  "   #    #  #    #   ",
  "    #   #  #   #    ",
  "    ##        ##    ",
  "     #  ####  #     ",
  "        #  #        ",
  "        ## ##       "
];

// Exit Portal Monolith (20w x 28h)
const SPRITE_PORTAL = [
  "   ##############   ",
  "  ################  ",
  "  ##            ##  ",
  "  ##  ########  ##  ",
  "  ##  ########  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ## ## ##  ##  ",
  "  ##  ## ## ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ########  ##  ",
  "  ##  ########  ##  ",
  "  ##            ##  ",
  "  ##  ########  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ## ## ##  ##  ",
  "  ##  ## ## ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ##    ##  ##  ",
  "  ##  ########  ##  ",
  "  ##            ##  ",
  "  ################  ",
  "  ################  ",
  " ################## ",
  "####################",
  "####################"
];

/**
 * Draws a sprite matrix onto the canvas in pure #39FF14 pixels.
 * @param {string[]} matrix Array of strings representing pixel rows
 * @param {number} x World X coordinate
 * @param {number} y World Y coordinate
 * @param {boolean} flipX Whether to flip horizontally
 */
function drawSprite(matrix, x, y, flipX = false) {
  const h = matrix.length;
  const w = matrix[0].length;
  const px = Math.floor(x - cameraX);
  const py = Math.floor(y);

  // Cull if completely off screen
  if (px + w < 0 || px > SCREEN_WIDTH || py + h < 0 || py > SCREEN_HEIGHT) {
    return;
  }

  ctx.fillStyle = COLOR_FG;

  for (let r = 0; r < h; r++) {
    const row = matrix[r];
    for (let c = 0; c < w; c++) {
      if (row[c] === '#') {
        const drawC = flipX ? (w - 1 - c) : c;
        ctx.fillRect(px + drawC, py + r, 1, 1);
      }
    }
  }
}
