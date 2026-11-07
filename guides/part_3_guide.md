# Session Guide: Part 3 — Hazards, Polish & Shipping with Gemini

**Target Audience:** Absolute beginners completing the series.  
**Estimated Duration:** 45–55 Minutes  
**Focus:** Camera scrolling, hazard detection and respawn effects, game state machines (Title $\rightarrow$ Playing $\rightarrow$ Won), and synthesizing 8-bit arcade audio live with Gemini.

---

## The Teacher's Talk Track: Core Mental Models

Before coding the final polish, share these 3 core concepts:

1. **The Camera is Just an Offset Brush:**
   - The world doesn't move; our drawing brush moves!
   - If our player is at $X = 500$, we subtract the camera's position ($cameraX$) from everything we draw: `x - cameraX`.
2. **Game States are a Traffic Light:**
   - A game is in one mode at a time:
     - `STATE_TITLE` (Waiting to start)
     - `STATE_PLAYING` (Running, jumping, dodging)
     - `STATE_WON` (Victory banner)
3. **Sound Without Audio Files (Web Audio API):**
   - We don't need to find or download `.mp3` or `.wav` files.
   - The browser has an analog synthesizer chip built right in! Gemini can write a tiny function to generate square waves that sound like an authentic 1980s Game Boy.

---

## Milestone 3.1: The Scrolling Camera (Minutes 0–12)

### 🎯 Objective
Allow the player to explore the entire 1280px world by having the camera follow the hero smoothly.

### Talk Track
> *"Our level is 1280 pixels wide, but our screen only fits 320 pixels. Instead of cramping the level into one screen, we point a virtual camera at our hero that tracks them as they run forward."*

### Live Coding
In `js/config.js`:
```javascript
let cameraX = 0;
const LEVEL_WIDTH = 1280;
```

In `update()`:
```javascript
// Keep player in the left-third of the screen
cameraX = player.x - 100;

// Clamp camera so it never scrolls past the level boundaries
if (cameraX < 0) cameraX = 0;
if (cameraX > LEVEL_WIDTH - SCREEN_WIDTH) cameraX = LEVEL_WIDTH - SCREEN_WIDTH;
```

In `render()`:
Adjust all draw calls by subtracting `cameraX`:
```javascript
// Draw platforms with camera offset
for (let p of platforms) {
  ctx.fillRect(p.x - cameraX, p.y, p.w, p.h);
}

// Draw player with camera offset
drawSprite(SPRITE_PLAYER_IDLE, player.x - cameraX, player.y);
```

### ✅ Milestone 3.1 Checklist
- [x] Running to the right reveals new platforms smoothly scrolling onto the screen.
- [x] Camera stops scrolling when reaching the start or end of the level.

---

## Milestone 3.2: Lethal Spikes & Respawn Flash (Minutes 12–25)

### 🎯 Objective
Add hazardous spike pits that kill the player on touch, trigger a retro screen flash, and reset them to the spawn point.

### Talk Track
> *"A platformer without danger is just a walking simulator. We need tension! Let's place spike traps in the gaps between platforms. If the player touches a spike, we invert the screen colors for 5 frames and send them back to the start."*

### 1. Spikes Definition
```javascript
const spikes = [
  { x: 120, y: 172, w: 52, h: 8 },
  { x: 284, y: 172, w: 16, h: 8 },
  { x: 576, y: 146, w: 24, h: 8 }
];
```

### 2. Hazard Collision & Screen Flash
In `js/config.js`:
```javascript
let deathFlashTimer = 0;
```

In `update()`:
```javascript
// Countdown death flash
if (deathFlashTimer > 0) deathFlashTimer--;

// Check spike collisions
for (let s of spikes) {
  if (rectsOverlap(player, s)) {
    // Player dies!
    deathFlashTimer = 8; // Flash screen white/inverted for 8 frames
    player.x = 20;       // Reset to spawn point
    player.y = 120;
    player.vy = 0;
    if (typeof playSfx === 'function') playSfx('death');
    break;
  }
}
```

### 3. Draw Spikes and Flash Effect in `render()`
```javascript
// Draw spikes
for (let s of spikes) {
  ctx.fillStyle = COLOR_FG;
  ctx.fillRect(s.x - cameraX, s.y, s.w, s.h);
}

// Death flash overlay: Invert colors by filling screen with white
if (deathFlashTimer > 0) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
```

### ✅ Milestone 3.2 Checklist
- [x] Falling into pit spikes instantly resets the player to the beginning.
- [x] A crisp visual flash emphasizes the mistake without feeling sluggish.

---

## Milestone 3.3: Title Screen & Victory States (Minutes 25–38)

### 🎯 Objective
Turn the mechanics into a complete game with a Title Screen, Play state, and Victory Gate at the end of the level.

### Talk Track
> *"To make this a real game, it needs a beginning and an ending. We will create a State Machine with three states: TITLE, PLAYING, and WON."*

### 1. Game State Setup
In `js/config.js`:
```javascript
const STATE_TITLE = 0;
const STATE_PLAYING = 1;
const STATE_WON = 2;

let gameState = STATE_TITLE;

const exitDoor = { x: 1210, y: 120, w: 20, h: 28 };
```

### 2. State Logic in `update()`
```javascript
function update() {
  if (gameState === STATE_TITLE) {
    if (keys.jump) {
      gameState = STATE_PLAYING;
    }
    return;
  }

  if (gameState === STATE_WON) {
    if (keys.restart) {
      player.x = 20;
      player.y = 120;
      gameState = STATE_PLAYING;
    }
    return;
  }

  // Check victory condition
  if (rectsOverlap(player, exitDoor)) {
    gameState = STATE_WON;
    if (typeof playSfx === 'function') playSfx('win');
  }

  // Normal physics update continues below...
}
```

### 3. Render Overlays in `render()`
```javascript
if (gameState === STATE_TITLE) {
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(40, 30, 240, 120);
  ctx.strokeStyle = COLOR_FG;
  ctx.strokeRect(40, 30, 240, 120);

  // Beginner-friendly canvas text
  ctx.fillStyle = COLOR_FG;
  ctx.font = '12px monospace';
  ctx.fillText("NEON PLATFORMER", 95, 70);
  ctx.fillText("PRESS SPACE TO START", 75, 110);
} else if (gameState === STATE_WON) {
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(40, 30, 240, 120);
  ctx.strokeStyle = COLOR_FG;
  ctx.strokeRect(40, 30, 240, 120);

  ctx.fillStyle = COLOR_FG;
  ctx.font = '12px monospace';
  ctx.fillText("MISSION COMPLETE!", 90, 75);
  ctx.fillText("PRESS R TO PLAY AGAIN", 70, 115);
}
```

### ✅ Milestone 3.3 Checklist
- [x] Game starts on title screen and waits for Spacebar.
- [x] Reaching the final door shows the victory banner.
- [x] Pressing `R` restarts the run.

---

## Milestone 3.4: Pairing with Gemini — The 8-Bit Audio Synth (Minutes 38–50)

### 🎯 Objective
Use Gemini live to write a browser Web Audio synthesizer from scratch, giving our game authentic retro sound effects without any external files!

### Talk Track
> *"The final ingredient that brings video games to life is audio. Instead of searching Google for `.wav` files and dealing with file loading errors, we can ask Gemini to write a micro-synthesizer using the browser's built-in Web Audio API."*

### 🤖 Live Gemini Prompt
Copy and paste this exact prompt into Gemini:
```
I am building a retro HTML5 Canvas game in JavaScript with no external dependencies.
Please generate a single, self-contained JavaScript function `playSfx(type)` using the browser's native `AudioContext`.
Support three sound types:
1. 'jump': A quick retro upward pitch frequency slide (150Hz to 400Hz over 0.15s, square wave).
2. 'death': A harsh low-frequency buzzer/downward drop (250Hz down to 60Hz over 0.25s, sawtooth wave).
3. 'win': A cheerful high-pitched two-tone arcade fanfare (523Hz then 659Hz over 0.3s).
Keep it under 35 lines, handle user-interaction AudioContext unlocking, and make it beginner-friendly.
```

### Live Integration
1. Gemini will produce something like:
```javascript
let audioCtx = null;

function playSfx(type) {
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
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'death') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.22);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.22);
  } else if (type === 'win') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}
```
2. Trigger `playSfx('jump')` on jump, `playSfx('death')` on spike hit, and `playSfx('win')` on exit gate touch!

### ✅ Milestone 3.4 Checklist
- [x] Jumping produces a snappy retro chirp.
- [x] Spikes produce a low crunchy buzzer.
- [x] Winning plays an energetic victory chime.

---

## Series Finale & Showcase
1. Play through the game from Title Screen $\rightarrow$ obstacle course $\rightarrow$ exit portal!
2. Show beginners how all the pieces came together:
   - Canvas + Game Loop (Part 1)
   - Physics + Collisions + Level Layout (Part 2)
   - Camera + Hazards + Game States + Audio (Part 3)
3. Share next challenge ideas:
   - Ask Gemini to design a second level!
   - Add moving platforms or a walking patrol enemy.
   - Change the neon color scheme from green to cyberpunk cyan (`#00F0FF`) or hot magenta (`#FF007F`).
