# Session Guide: Part 2 — Defying Gravity, Jumping & World Building

**Target Audience:** Absolute beginners continuing from Part 1.  
**Estimated Duration:** 45–55 Minutes  
**Focus:** 2D physics (velocity & gravity), bounding box collisions (AABB), pairing with Gemini to design platform courses, and "game juice" (coyote time & jump buffers).

---

## The Teacher's Talk Track: Core Mental Models

Before coding physics, give beginners these 3 intuitive mental models:

1. **Velocity vs. Position:**
   - Position ($X, Y$) is where you **are**.
   - Velocity ($VX, VY$) is where you are **going**.
   - Every single frame, we simply add velocity to position: `player.y += player.vy`.
2. **Gravity is Just a Persistent Push:**
   - Gravity doesn't teleport things downward; it accelerates them.
   - Every frame, gravity pushes down on our vertical velocity: `player.vy += GRAVITY`.
   - Jumping is simply setting `player.vy = -JUMP_FORCE` (a negative number pushes $Y$ upward!).
3. **Collision Detection (The "Are We Touching?" Test):**
   - We check if two rectangles overlap. If our feet hit the floor while falling, we set `player.vy = 0` and rest on top.

---

## Milestone 2.1: Gravity & The Spacebar Jump (Minutes 0–15)

### 🎯 Objective
Give our player physical weight, downward acceleration, and a responsive jump using the Space key.

### Talk Track
> *"Right now, our hero floats in empty space like an astronaut. Let's turn on Earth's gravity. When we press Space, we catapult upward with negative velocity, and gravity gently slows us down until we fall back."*

### Live Coding
In `js/config.js` (or top of `js/game.js`):
```javascript
const GRAVITY = 0.22;
const JUMP_VELOCITY = -4.8;
const MAX_FALL_SPEED = 6.0;

let player = {
  x: 50,
  y: 50,
  w: 10,
  h: 13,
  vx: 0,
  vy: 0,
  isGrounded: false
};
```

In `js/input.js`, add `Space` key:
```javascript
keys.jump = false;

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    keys.jump = true;
    e.preventDefault(); // Prevents browser page from scrolling down!
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') keys.jump = false;
});
```

In `update()`:
```javascript
// Horizontal movement
player.vx = 0;
if (keys.left) player.vx = -1.8;
if (keys.right) player.vx = 1.8;
player.x += player.vx;

// Vertical movement & gravity
if (keys.jump && player.isGrounded) {
  player.vy = JUMP_VELOCITY;
  player.isGrounded = false;
}

// Gravity pulls downward
player.vy += GRAVITY;
if (player.vy > MAX_FALL_SPEED) player.vy = MAX_FALL_SPEED;
player.y += player.vy;

// Temporary ground floor at y = 140
if (player.y >= 140) {
  player.y = 140;
  player.vy = 0;
  player.isGrounded = true;
}
```

### ✅ Milestone 2.1 Checklist
- [x] Character drops with natural acceleration when the game starts.
- [x] Pressing `Space` causes the character to jump in a smooth arc.
- [x] Player lands safely on the temporary floor without falling through.

---

## Milestone 2.2: Solid Ground & Platforms (Minutes 15–30)

### 🎯 Objective
Create floating rectangular platforms and teach the computer how to make our character stand on top of them.

### Talk Track
> *"Computers are fast, but they don't have eyes. To know if a player is standing on a platform, we check if their rectangular hitboxes overlap. In game dev, this is known as Axis-Aligned Bounding Box (AABB) collision."*

### 1. The Overlap Function
Explain the 4-sided check:
```javascript
function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}
```

### 2. Resolving Platform Landings
```javascript
// Test platform
const testPlatform = { x: 80, y: 110, w: 60, h: 10 };

// In update(), after moving player vertically:
player.isGrounded = false;

// If we are falling downward and land on top of the platform:
if (rectsOverlap(player, testPlatform)) {
  if (player.vy > 0 && (player.y + player.h - player.vy) <= testPlatform.y) {
    player.y = testPlatform.y - player.h; // Snap feet to top
    player.vy = 0;
    player.isGrounded = true;
  }
}
```

### 3. Draw Platform in `render()`
```javascript
ctx.fillStyle = COLOR_FG;
ctx.fillRect(testPlatform.x, testPlatform.y, testPlatform.w, testPlatform.h);
```

### ✅ Milestone 2.2 Checklist
- [x] Floating platform appears in neon green.
- [x] Player can jump from the floor and stand securely on top of the ledge.

---

## Milestone 2.3: Pairing with Gemini — The World Architect (Minutes 30–42)

### 🎯 Objective
Use Gemini live to design an entire obstacle course of floating platforms spanning an extended level.

### Talk Track
> *"Manually typing coordinates for 15 platforms takes 20 minutes of trial-and-error math. Let's hire Gemini as our Lead Level Designer!"*

### 🤖 Live Gemini Prompt
Copy and paste this exact prompt into Gemini:
```
We are building a 2D retro platformer in HTML5 Canvas.
Game specs:
- Internal resolution: 320px wide by 180px high
- Total level width: 1280px (horizontal scroll across 4 screens)
- Player jump height: can jump ~38 pixels high and leap ~60 pixels horizontally
- Ground floor is around y: 154

Please generate an array of platform objects `const platforms = [...]` containing 10-15 platforms with properties `{ x, y, w, h }`.
Make the difficulty progress gently:
- Screen 1 (x: 0-320): Easy warm-up steps
- Screen 2 (x: 320-640): Elevated ledges
- Screen 3 (x: 640-960): Precision stepping stones over a chasm
- Screen 4 (x: 960-1280): Final stairway to the exit
Provide clean JavaScript with no extra dependencies.
```

### Live Integration
Copy Gemini's generated `platforms` array into `js/level.js`.  
In `render()`, replace single platform drawing with:
```javascript
for (let p of platforms) {
  ctx.fillRect(p.x, p.y, p.w, p.h);
}
```
And loop through `platforms` during collision checks in `update()`.

### ✅ Milestone 2.3 Checklist
- [x] The level is populated with a complete course of varied platforms.
- [x] The player can leap from platform to platform.

---

## Milestone 2.4: Game Feel Juice — Coyote Time & Jump Buffers (Minutes 42–55)

### 🎯 Objective
Add two secret tricks used by professional platformer developers (*Celeste*, *Super Mario*) to make jumping feel responsive and forgiving.

### Talk Track
> *"Have you ever run off a cliff in a video game, pressed jump, and plummeted because you were 1 millisecond too late? Or pressed jump just before landing and nothing happened? We fix that with two game-design secrets: Coyote Time and Jump Buffering."*

### 1. Explain the Names
- **Coyote Time:** Named after Wile E. Coyote from Looney Tunes—he runs off the cliff and floats for a brief moment before falling. We give players 6 frames (0.1 seconds) to jump even after walking off a platform!
- **Jump Buffer:** If the player hits Space 6 frames before touching the ground, we remember their intent and jump the exact moment their feet touch down.

### Live Coding
In `js/input.js`:
```javascript
let coyoteTimer = 0;
let jumpBufferTimer = 0;

// When spacebar is pressed:
if (e.code === 'Space') {
  jumpBufferTimer = 6; // Remember the jump for 6 frames
}
```

In `update()`:
```javascript
// Update timers
if (player.isGrounded) {
  coyoteTimer = 6; // Fresh on ground
} else if (coyoteTimer > 0) {
  coyoteTimer--;
}

if (jumpBufferTimer > 0) {
  jumpBufferTimer--;
}

// Can jump if we have buffered a jump AND have coyote grace
if (jumpBufferTimer > 0 && coyoteTimer > 0) {
  player.vy = JUMP_VELOCITY;
  player.isGrounded = false;
  coyoteTimer = 0;
  jumpBufferTimer = 0;
}
```

### 💡 Beginner Reaction
Have the audience try running off a ledge and jumping. The game feels noticeably smoother, fairer, and more satisfying to play!

### ✅ Milestone 2.4 Checklist
- [x] Player can jump slightly after walking off platforms.
- [x] Rapidly hitting space before landing triggers immediate jump on touchdown.

---

## Session 2 Wrap-up & Beginner Recap
- **What we learned:**
  1. Euler physics: $Position + Velocity$, and $Velocity + Gravity$.
  2. AABB rectangular collision detection.
  3. Prompting Gemini with clear technical constraints to architect level layouts.
  4. Coyote time and jump buffering provide the "juice" that separates good platformers from clunky ones.
- **Preview of Part 3:** Camera tracking, spike traps, win/lose states, and generating retro 8-bit sounds with Gemini!
