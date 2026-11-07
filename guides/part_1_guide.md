# Session Guide: Part 1 — The Magic Canvas & Moving Our Hero

**Target Audience:** Absolute beginners with little or no prior coding experience.  
**Estimated Duration:** 45–55 Minutes  
**Focus:** Mental models of game programming, Canvas coordinate space, the game loop, keyboard input, and pairing with Gemini to create pixel art.

---

## The Teacher's Talk Track: Core Mental Models

Before typing any code, share these 3 simple mental models with your audience:

1. **The Digital Graph Paper (Canvas):**
   - In math class, $(0,0)$ is at the center or bottom-left, and $Y$ goes up.
   - On computer screens, **$(0,0)$ is at the top-left corner**.
   - As $X$ increases, you move **RIGHT** $\rightarrow$.
   - As $Y$ increases, you move **DOWN** $\downarrow$.
2. **The Infinite Flipbook (Game Loop):**
   - Video games do not have "moving" objects; they have illusions.
   - 60 times every second, we wipe the canvas clean, calculate where our character moved, and redraw it.
3. **Gemini as our Art & Math Assistant:**
   - We write the core logic. When we need repetitive data (like drawing every single pixel of an 8-bit character), we let Gemini do the heavy lifting!

---

## Milestone 1.1: The Digital Graph Paper (Minutes 0–10)

### 🎯 Objective
Open the project, explore the starter files, and draw a neon green character box on a black screen.

### Talk Track
> *"Welcome! Today we are creating a retro arcade game from scratch. If you've never written JavaScript before, don't worry. A game is just a digital sketchbook where we draw pictures rapidly."*

### 1. Show the Starter Files
Point out:
- `index.html`: The container for our `<canvas>` (size: 320 pixels wide by 180 high).
- `style.css`: Stretches our tiny 320x180 retro canvas to fit modern screens without blurring pixels (`image-rendering: pixelated`).
- `js/config.js`: Our settings (colors, canvas width/height).
- `js/game.js`: The brain of our game.

### 2. Live Coding the First Shape
In `js/game.js`:
```javascript
// In render():
ctx.fillStyle = COLOR_BG;
ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

// Draw our hero box
ctx.fillStyle = COLOR_FG;
ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
```

### ✅ Milestone 1.1 Checklist
- [x] Open `index.html` in browser.
- [x] Verify a sharp neon green rectangle sitting on a pure black background.

---

## Milestone 1.2: The 60 FPS Infinite Flipbook (Minutes 10–22)

### 🎯 Objective
Make the green box glide smoothly across the screen on its own using `requestAnimationFrame`.

### Talk Track
> *"If we just change the position once, nothing looks alive. We need a heartbeat. In programming, that heartbeat is called `requestAnimationFrame`. The browser calls our code 60 times a second. Every frame: update math $\rightarrow$ render drawing."*

### Live Coding
In `js/game.js`, update `update()`:
```javascript
function update() {
  // Move 1.5 pixels to the right every single frame
  playerX += 1.5;

  // Wrap around the screen when reaching the edge
  if (playerX > SCREEN_WIDTH) {
    playerX = -playerWidth;
  }
}
```

### 💡 Beginner "Aha!" Moment
Ask attendees: *"What happens if we remove `ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)` in render?"*  
Comment it out live: the box smears across the screen like wet paint! Explain that this is why clearing the screen every frame is essential.

### ✅ Milestone 1.2 Checklist
- [x] The green rectangle steadily glides from left to right and loops back.

---

## Milestone 1.3: Taking Control (Keyboard Input) (Minutes 22–35)

### 🎯 Objective
Connect keyboard events so the player controls movement with **A / D** or **Left / Right arrow keys**.

### Talk Track
> *"Now we want the player to hold the steering wheel. Computers listen for events: 'Key went DOWN' and 'Key came UP'. We keep a small memory card (a JavaScript object) that remembers whether a key is currently being held."*

### 1. Create `js/input.js` (or add to `js/game.js`)
```javascript
const keys = {
  left: false,
  right: false
};

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = true;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = false;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = false;
});
```

### 2. Update Movement Logic
In `update()`:
```javascript
const MOVE_SPEED = 1.8;

function update() {
  if (keys.left) {
    playerX -= MOVE_SPEED;
  }
  if (keys.right) {
    playerX += MOVE_SPEED;
  }

  // Prevent walking off the left side of the screen
  if (playerX < 0) playerX = 0;
}
```

### ✅ Milestone 1.3 Checklist
- [x] Pressing `A` or `Left Arrow` moves the box left.
- [x] Pressing `D` or `Right Arrow` moves the box right.
- [x] Box stops when keys are released.

---

## Milestone 1.4: Pairing with Gemini — From Box to Pixel Hero (Minutes 35–50)

### 🎯 Objective
Use Gemini live to transform the plain rectangle into a retro 8-bit character sprite using an ASCII matrix.

### Talk Track
> *"A green box is fun, but games need heroes! In the 1980s, game developers drew pixel art on graph paper. We can ask Gemini to act as our pixel artist and generate a string matrix for our character."*

### 🤖 Live Gemini Prompt
Copy and paste this exact prompt into Gemini:
```
I am building a retro 2D JavaScript platformer using HTML5 Canvas with a pure black and neon green (#39FF14) palette.
Please generate:
1. A 10 wide by 13 high ASCII string matrix of a cute cyberpunk runner character named `SPRITE_PLAYER_IDLE`. Use '#' for solid green pixels and ' ' (space) for transparent pixels.
2. A lightweight JavaScript function `drawSprite(matrix, x, y, color)` that loops through the string rows and columns and draws each '#' character using `ctx.fillRect(x + col, y + row, 1, 1)`.
Keep it simple and readable for beginner programmers.
```

### Live Integration
1. Gemini will produce something like:
```javascript
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
```
2. Replace `ctx.fillRect(playerX, playerY, ...)` in `render()` with:
```javascript
drawSprite(SPRITE_PLAYER_IDLE, playerX, playerY);
```

### ✅ Milestone 1.4 Checklist
- [x] The green rectangle is replaced with an authentic pixel art humanoid.
- [x] The character walks left and right smoothly across the screen!

---

## Session 1 Wrap-up & Beginner Recap
- **What we learned:**
  1. Screens are $(X, Y)$ coordinate grids starting at top-left $(0,0)$.
  2. Games are 60 FPS flipbooks powered by `requestAnimationFrame`.
  3. User input works by saving key state flags.
  4. Pixel art can be stored as simple text strings and drawn pixel-by-pixel.
- **Preview of Part 2:** Defying gravity, spacebar jumping, and standing on solid platforms!
