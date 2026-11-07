# The Master Presenter Script: Building a Retro Platformer with Gemini

> **Note for the Presenter:**  
> This script is written for you to deliver directly to camera and screen-share.  
> Cues are marked with brackets:  
> - `[ON CAMERA]`: Speak directly to the lens, warm, welcoming, eye contact.  
> - `[SCREEN SHARE]`: Switch to showing your desktop, code editor, or browser.  
> - `[TYPE CODE]`: Code you write live on stream.  
> - `[PROMPT GEMINI]`: Verbatim prompt to paste into Gemini live on screen.  
> - `[VERIFY ON SCREEN]`: The visual result to celebrate with the audience.

---

# ACT I: GENERAL GAME PROGRAMMING CONCEPTS

`[ON CAMERA]`

"Hello everyone, and welcome! 

If you have ever looked at a video game and thought, *'That looks like pure magic, and I could never build that,'* I want you to erase that thought right now. 

Today, we are going to demystify game development. We are going to build an authentic, neon-drenched retro platformer from scratch using nothing but vanilla JavaScript and HTML5 Canvas. And here is the best part: you do not need years of computer science experience, you don't need expensive game engines, and you don't need complex math.

Before we write our very first line of code, I want to share the core mental models that every video game in history—from *Pong* and *Super Mario* to modern indie masterpieces like *Celeste*—is built on. Once you understand these fundamental concepts, everything we write today will make complete sense.

---

### Concept 1: What Actually is a Video Game?

`[ON CAMERA]`

"Most websites or desktop apps are what we call **event-driven**. They sit there, completely still, waiting for you to click a button or submit a form. If you don't click anything, the app is asleep.

A video game is different. A video game is a **living simulation**. Even if you put your controller down and walk away, water still flows, clouds drift across the sky, enemies pace back and forth, and gravity continues to pull your character downward.

At its heart, any game is built on a simple formula:

$$\text{Game} = \text{State} + \text{Input} + \text{The Infinite Loop}$$

- **State** is the memory: where the player is, how much health you have, and which platforms exist.
- **Input** is your hands: arrow keys, gamepad buttons, or mouse clicks.
- **The Infinite Loop** is the heartbeat that updates that memory and draws the picture over and over again.

---

### Concept 2: The Digital Graph Paper (Canvas Coordinates)

`[SCREEN SHARE: Blank canvas or diagram]`

"When we draw on a computer screen, we use something called a **Canvas**. Think of the canvas as a piece of digital graph paper.

Now, in school math class, you probably learned about Cartesian coordinates where the center is $(0, 0)$ and the $Y$-axis goes *up*. 

In computer graphics, we flip that upside down. 

On a digital screen:
- The top-left corner is **$(0, 0)$**.
- As the $X$ coordinate gets bigger, you move **RIGHT** $\rightarrow$.
- As the $Y$ coordinate gets bigger, you move **DOWN** $\downarrow$.

Why? Because back in the 1970s and 80s, old CRT television sets used an electron beam that drew pictures line by line, from the top-left to the bottom-right—just like reading a book. Computer graphics still honor that heritage today. So if you want your character to fall down, you *add* to their $Y$ position. If you want them to jump up, you *subtract* from their $Y$ position.

---

### Concept 3: The Infinite Flipbook (The Game Loop)

`[ON CAMERA with a smile]`

"Have you ever made a flipbook as a kid on the corner of a notebook? You draw a stick figure on page one, then on page two you draw him slightly to the right, and when you flip the pages with your thumb, your brain perceives movement.

Computers do not actually have 'moving' objects. There is no physical ball rolling across your monitor. 

Instead, 60 times every single second:
1. We **wipe the screen completely clean** with a fresh coat of black paint.
2. We **calculate the new position** of our character based on speed.
3. We **draw the character** in their new spot.

Because this happens in less than 16 milliseconds, human eyes cannot see the wipe. We only perceive buttery-smooth 60 frames-per-second motion. In JavaScript, the browser gives us a built-in heartbeat function called `requestAnimationFrame` that handles this exact rhythm.

---

### Concept 4: Velocity & Gravity (Physics in 2 Lines of Math)

`[SCREEN SHARE: Diagram of Euler Physics]`

"Physics engines sound terrifying, but 2D arcade physics is just simple grade-school addition.

We track two things for our player:
1. **Position ($X, Y$)**: Where the player is standing right now.
2. **Velocity ($VX, VY$)**: How fast the player is moving in each direction.

Every single frame, we simply add velocity to position:

$$\text{Player } X = \text{Player } X + \text{Velocity } X$$
$$\text{Player } Y = \text{Player } Y + \text{Velocity } Y$$

And what is **Gravity**? Gravity is simply a persistent downward tug on our vertical velocity:

$$\text{Velocity } Y = \text{Velocity } Y + 0.22$$

When you press the jump button, you don't calculate complex parabolic curves. You simply give the player a burst of negative velocity: `Velocity Y = -4.8`. The character instantly shoots upward. Then, frame by frame, gravity chips away at that upward speed, slows the character down to zero at the peak of the jump, and starts pulling them back toward earth. That is Euler physics—and it takes fewer than five lines of code!

---

### Concept 5: Collisions (How Computers Feel Without Eyes)

`[ON CAMERA]`

"Computers don't have eyes. A computer doesn't look at the screen and say, *'Oh look, the green character is standing on that green ledge.'*

To the computer, the player is just a bounding box: an $X$, a $Y$, a width, and a height. The platform is another bounding box.

To see if they are touching, we ask four simple questions:
1. Is the player's left side to the left of the platform's right side?
2. Is the player's right side to the right of the platform's left side?
3. Is the player's top side above the platform's bottom side?
4. Is the player's bottom side below the platform's top side?

If all four answers are **YES**, they are overlapping! In game development, this is called **AABB collision** (Axis-Aligned Bounding Box). When we detect that the player's feet have pierced the top of a platform while falling, we snap their feet right to the surface and set `Velocity Y = 0`. Instant solid ground!

---

### Concept 6: Game Feel and 'Juice'

`[ON CAMERA]`

"Here is a dirty secret of game design: **Real physics feels terrible in video games.**

If you build a platformer that strictly obeys mathematical rules, players will complain that the controls feel heavy, laggy, and clunky. Masterpiece platformers like *Super Mario* and *Celeste* secretly cheat in the player's favor!

We are going to implement two famous industry tricks:
1. **Coyote Time:** Named after Wile E. Coyote from the classic cartoons, who runs off a cliff and hangs in the air for a second before falling. We give the player a 6-frame grace window (about a tenth of a second) to press jump *after* they have already walked off a ledge.
2. **Jump Buffering:** If you hit the jump key 6 frames *before* your feet touch the ground, we remember that press and jump the exact millisecond you land. 

These tiny details make players say, *'Wow, these controls feel so responsive!'*

---

### Concept 7: Pairing with Gemini as Your Co-Pilot

`[SCREEN SHARE: Gemini interface side-by-side with editor]`

"Finally, let's talk about our secret weapon today: **Gemini**.

In the past, learning game development meant getting bogged down in endless boilerplate: spending 45 minutes manually drawing pixel art coordinates on graph paper, or wrestling with sound file formats, or plotting level obstacle arrays by hand. That causes fatigue, and it distracts from learning the core engineering concepts.

Today, we are going to treat Gemini as our senior co-pilot and digital artist. 
- **We** will write the core engine, the physics math, and the game loop live.
- **Gemini** will generate our retro ASCII pixel art matrices, design multi-screen platform layouts, and write a zero-dependency 8-bit sound synthesizer using the browser's Web Audio API.

You are going to see how a modern developer works with AI: not by copying blindly, but by giving precise architectural prompts and integrating the results into clean, understandable code."

---

# ACT II: HOW THE SESSIONS WILL GO & WORKFLOW

`[ON CAMERA]`

"Now, how is this series structured?

We are breaking this build down into **three focused, progressive sessions**:

- **Session 1: The Magic Canvas & Moving Our Hero**  
  We set up our retro canvas, launch the 60 FPS flipbook loop, hook up keyboard input, and prompt Gemini to transform our simple test box into an 8-bit cyberpunk runner sprite.
- **Session 2: Defying Gravity & Jumping on Platforms**  
  We implement Euler gravity, spacebar jumps, AABB platform collisions, ask Gemini to generate an entire parkour level layout, and add Coyote Time.
- **Session 3: Hazards, Polish & Shipping with Audio**  
  We build a smooth scrolling camera, add lethal spike traps and screen flash effects, construct our Title and Victory screens, and have Gemini synthesize authentic 8-bit arcade beeps and boops using the browser's Web Audio API.

---

### The Zero-Install Promise

`[SCREEN SHARE: The project folder]`

"One of my favorite things about web game development is the **Zero-Install Promise**.

You do not need to install Node.js, you do not need Docker, you do not need Webpack or Vite, and you do not need a terminal. All you need is:
1. Any text editor (VS Code, Cursor, or even Notepad).
2. Any web browser (Chrome, Firefox, Safari, or Edge).

In our project repository, you will find a folder called `starter/`. Let's take a look inside:
- `starter/index.html`: Our HTML shell containing the canvas element.
- `starter/style.css`: Modern CSS that centers our canvas and applies `image-rendering: pixelated` so our pixels stay tack-sharp on Retina screens.
- `starter/js/config.js`: Our global settings (canvas dimensions and colors).
- `starter/js/game.js`: The initial skeleton for our game loop.

Every single step in this series is broken into **Milestones**. At the end of every milestone, we will save, refresh our browser, and verify that something tangible, interactive, and fun is happening on screen.

Are you ready? Let's dive into Session 1!"

---

# ACT III: THE MILESTONE ROADBOOK (UP TO GAME COMPLETION)

---

## SESSION 1: THE MAGIC CANVAS & MOVING OUR HERO

### Milestone 1.1: The Digital Graph Paper

`[ON CAMERA]`  
"Let's get our boots on the ground. Milestone 1.1 is all about initializing our canvas and drawing our very first shape."

`[SCREEN SHARE: Open starter/js/config.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"Let's look at `config.js`. We grab our `<canvas>` element from the HTML, create a 2D rendering context called `ctx`, and lock our resolution to 320 by 180 pixels. This gives us that authentic 1980s low-res arcade look."

`[SCREEN SHARE: Open starter/js/game.js]`  
`[TYPE CODE]`
```javascript
// starter/js/game.js
let playerX = 50;
let playerY = 120;
const playerWidth = 10;
const playerHeight = 14;

function render() {
  // 1. Wipe screen with pure black
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // 2. Draw our test player box in neon green
  ctx.fillStyle = COLOR_FG;
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}
```

`[SCREEN SHARE: Switch to Browser and Refresh]`  
`[VERIFY ON SCREEN]`  
"Look at that! Save your file and refresh your browser. We have an authentic arcade display with a sharp neon green rectangle sitting on deep black. Milestone 1.1 is complete!"

---

### Milestone 1.2: The 60 FPS Infinite Flipbook

`[ON CAMERA]`  
"A static rectangle is just a painting. Let's make it alive with the heartbeat of video games: `requestAnimationFrame`."

`[SCREEN SHARE: starter/js/game.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"In `game.js`, we have our `update()` function. Every single frame, we are going to nudge `playerX` to the right by 1.5 pixels. And when the player reaches the right edge, we'll wrap them back to the left side."

`[TYPE CODE]`
```javascript
function update() {
  playerX += 1.5;

  if (playerX > SCREEN_WIDTH) {
    playerX = -playerWidth;
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the loop!
requestAnimationFrame(gameLoop);
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Look at your browser now! The green box is steadily gliding across the screen, wrapping around endlessly at 60 frames per second. That is the flipbook in action. Milestone 1.2 is locked in!"

---

### Milestone 1.3: Taking Control (Keyboard Input)

`[ON CAMERA]`  
"Now let's put the steering wheel in the player's hands. We want to listen for arrow keys and the A and D keys."

`[SCREEN SHARE: starter/js/game.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"We create a small `keys` object that keeps track of whether the left or right keys are currently pressed. When a key goes DOWN, we mark it `true`. When a key goes UP, we mark it `false`."

`[TYPE CODE]`
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

"Now, in `update()`, instead of moving automatically, we check our `keys` object:"

`[TYPE CODE]`
```javascript
const MOVE_SPEED = 1.8;

function update() {
  if (keys.left) {
    playerX -= MOVE_SPEED;
  }
  if (keys.right) {
    playerX += MOVE_SPEED;
  }

  // Left screen boundary check
  if (playerX < 0) playerX = 0;
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Save, refresh, and tap A and D or your arrow keys. You are directly controlling the motion! You just wrote your first interactive input controller. Milestone 1.3 done!"

---

### Milestone 1.4: Pairing with Gemini — The Pixel Hero

`[ON CAMERA]`  
"A plain green box proved our math works, but we want an actual hero. Let's bring in Gemini to act as our 8-bit pixel artist."

`[SCREEN SHARE: Switch to Gemini window]`  
`[PROMPT GEMINI]`  
"Here is the exact prompt we are giving Gemini:"
```
I am building a retro 2D JavaScript platformer using HTML5 Canvas with a pure black and neon green (#39FF14) palette.
Please generate:
1. A 10 wide by 13 high ASCII string matrix of a cute cyberpunk runner character named `SPRITE_PLAYER_IDLE`. Use '#' for solid green pixels and ' ' (space) for transparent pixels.
2. A lightweight JavaScript function `drawSprite(matrix, x, y)` that loops through the string rows and columns and draws each '#' character using `ctx.fillRect(Math.floor(x + col), Math.floor(y + row), 1, 1)`.
Keep it simple, clean, and readable for beginners.
```

`[SCREEN SHARE: Show Gemini's response]`  
`[PRESENTER COMMENTARY]`  
"Look at how clean that is. Gemini generated a 10x13 array of strings where each row represents a line of pixels, and a tiny loop that draws 1x1 rectangles for every hashtag character. Let's paste this into our project!"

`[TYPE CODE in js/sprites.js or js/game.js]`
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

"Now, in `render()`, we replace `ctx.fillRect(playerX, playerY, ...)` with our new `drawSprite` call:"

`[TYPE CODE]`
```javascript
drawSprite(SPRITE_PLAYER_IDLE, playerX, playerY);
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Refresh your browser. Look at that! Our boring green square has transformed into an authentic 8-bit cyberpunk character running across the screen. That wraps up Session 1!"

---

## SESSION 2: DEFYING GRAVITY & JUMPING ON PLATFORMS

### Milestone 2.1: Gravity & The Spacebar Jump

`[ON CAMERA]`  
"Welcome to Session 2! Today, our hero learns to jump and navigate platforms. Let's start with Euler gravity."

`[SCREEN SHARE: starter/js/game.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"We are going to upgrade our player into a full object that holds position ($X, Y$), velocity ($VX, VY$), and a flag called `isGrounded`."

`[TYPE CODE]`
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

"In our key listeners, we listen for the Spacebar:"

`[TYPE CODE]`
```javascript
keys.jump = false;

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    keys.jump = true;
    e.preventDefault();
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') keys.jump = false;
});
```

"And in `update()`, we apply gravity every frame and allow jumping when grounded:"

`[TYPE CODE]`
```javascript
// Jump impulse
if (keys.jump && player.isGrounded) {
  player.vy = JUMP_VELOCITY;
  player.isGrounded = false;
}

// Apply gravity
player.vy += GRAVITY;
if (player.vy > MAX_FALL_SPEED) player.vy = MAX_FALL_SPEED;
player.y += player.vy;

// Temporary floor at y = 150
if (player.y >= 150) {
  player.y = 150;
  player.vy = 0;
  player.isGrounded = true;
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Refresh and tap the Spacebar. Watch that jump arc! It feels natural because gravity decelerates the player smoothly. Milestone 2.1 complete!"

---

### Milestone 2.2: Standing on Platforms (AABB Collisions)

`[ON CAMERA]`  
"Now let's add floating ledges and teach our game the AABB bounding-box formula so our hero can land on them."

`[SCREEN SHARE: js/game.js]`  
`[TYPE CODE]`
```javascript
function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

const testPlatform = { x: 80, y: 110, w: 60, h: 10 };
```

"Now, in `update()`, we check if the player falls onto the ledge from above:"

`[TYPE CODE]`
```javascript
player.isGrounded = false;

if (rectsOverlap(player, testPlatform)) {
  // If falling downward and our feet were above or at the platform top
  if (player.vy > 0 && (player.y + player.h - player.vy) <= testPlatform.y) {
    player.y = testPlatform.y - player.h;
    player.vy = 0;
    player.isGrounded = true;
  }
}
```

"And we draw the platform in `render()`:"
```javascript
ctx.fillStyle = COLOR_FG;
ctx.fillRect(testPlatform.x, testPlatform.y, testPlatform.w, testPlatform.h);
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Look at that! Leap into the air and land on the platform. The player's feet snap to the surface, and you can jump again right off the ledge. Milestone 2.2 nailed!"

---

### Milestone 2.3: Pairing with Gemini — The World Architect

`[ON CAMERA]`  
"One platform is a test; ten platforms is an adventure. Let's prompt Gemini to design an entire 4-screen platforming course for us!"

`[SCREEN SHARE: Switch to Gemini window]`  
`[PROMPT GEMINI]`
```
We are building a 2D retro platformer in HTML5 Canvas.
Game specs:
- Internal resolution: 320px wide by 180px high
- Total level width: 1280px (horizontal scroll across 4 screens)
- Player jump height: can jump ~38 pixels high and leap ~60 pixels horizontally
- Ground floor is around y: 154

Please generate an array of platform objects `const platforms = [...]` containing 10-15 platforms with properties `{ x, y, w, h }`.
Make the difficulty progress gently across the 4 screens:
- Screen 1 (x: 0-320): Warm-up stepping stones
- Screen 2 (x: 320-640): Elevated ledges
- Screen 3 (x: 640-960): Precision pillars over gaps
- Screen 4 (x: 960-1280): Final approach to the exit
Provide clean JavaScript with no external dependencies.
```

`[SCREEN SHARE: Show Gemini output and paste into js/level.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"Gemini just generated a beautifully paced level layout. Now all we do is loop through `platforms` in our collision check and in our `render()` function:"

`[TYPE CODE]`
```javascript
// In render():
for (let p of platforms) {
  ctx.fillRect(p.x, p.y, p.w, p.h);
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Save and refresh! An entire obstacle course is now rendered across our game world. Milestone 2.3 complete!"

---

### Milestone 2.4: Game Feel Juice — Coyote Time & Jump Buffers

`[ON CAMERA]`  
"Now for the secret sauce: let's add Coyote Time and Jump Buffering so jumping feels silky smooth."

`[SCREEN SHARE: js/game.js]`  
`[TYPE CODE]`
```javascript
let coyoteTimer = 0;
let jumpBufferTimer = 0;

// When spacebar is pressed:
if (e.code === 'Space') {
  jumpBufferTimer = 6; // Remember the intent for 6 frames
}
```

"In `update()`:"
```javascript
// Keep coyote timer full while grounded, decrement when in air
if (player.isGrounded) {
  coyoteTimer = 6;
} else if (coyoteTimer > 0) {
  coyoteTimer--;
}

if (jumpBufferTimer > 0) jumpBufferTimer--;

// Execute jump if we have both intent and grace!
if (jumpBufferTimer > 0 && coyoteTimer > 0) {
  player.vy = JUMP_VELOCITY;
  player.isGrounded = false;
  coyoteTimer = 0;
  jumpBufferTimer = 0;
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Test it out! Run off a ledge and hit jump a split-second late: you still leap! Mash jump just before landing: you instantly bounce upon touchdown. It feels ten times better. That is Session 2 in the books!"

---

## SESSION 3: HAZARDS, POLISH & SHIPPING WITH AUDIO

### Milestone 3.1: The Scrolling Camera

`[ON CAMERA]`  
"Welcome to the finale! Session 3 is about taking our mechanics and turning them into a complete, polished, playable game. First step: the camera."

`[SCREEN SHARE: js/game.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"Our level is 1280 pixels wide, but our screen is only 320 pixels wide. We create `cameraX` and have it track the player, clamped between zero and the end of the level."

`[TYPE CODE]`
```javascript
let cameraX = 0;
const LEVEL_WIDTH = 1280;

function update() {
  // Track player with camera offset
  cameraX = player.x - 100;
  if (cameraX < 0) cameraX = 0;
  if (cameraX > LEVEL_WIDTH - SCREEN_WIDTH) cameraX = LEVEL_WIDTH - SCREEN_WIDTH;
}
```

"Now, whenever we draw anything in `render()`, we subtract `cameraX`:"

`[TYPE CODE]`
```javascript
// Draw platforms offset by camera
for (let p of platforms) {
  ctx.fillRect(p.x - cameraX, p.y, p.w, p.h);
}

// Draw player offset by camera
drawSprite(SPRITE_PLAYER_IDLE, player.x - cameraX, player.y);
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Walk to the right. The entire world scrolls smoothly! We have a true sprawling side-scrolling platformer. Milestone 3.1 done!"

---

### Milestone 3.2: Lethal Spikes & Respawn Flash

`[ON CAMERA]`  
"Time to add stakes: spike hazards that kill the player and flash the screen."

`[SCREEN SHARE: js/game.js]`  
`[TYPE CODE]`
```javascript
const spikes = [
  { x: 120, y: 172, w: 52, h: 8 },
  { x: 284, y: 172, w: 16, h: 8 },
  { x: 576, y: 146, w: 24, h: 8 }
];

let deathFlashTimer = 0;

// In update():
if (deathFlashTimer > 0) deathFlashTimer--;

for (let s of spikes) {
  if (rectsOverlap(player, s)) {
    deathFlashTimer = 8;
    player.x = 20; // Respawn at beginning
    player.y = 120;
    player.vy = 0;
    if (typeof playSfx === 'function') playSfx('death');
    break;
  }
}
```

"In `render()`, if `deathFlashTimer > 0`, we fill the screen with white:"

`[TYPE CODE]`
```javascript
if (deathFlashTimer > 0) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"Walk into a spike pit. BOOM! A dramatic retro screen flash and an instant respawn at the start line. Milestone 3.2 accomplished!"

---

### Milestone 3.3: Title Screen & Victory States

`[ON CAMERA]`  
"Now let's wrap this into a real game loop with a Title Screen and a Victory Gate at the end of the course."

`[SCREEN SHARE: js/game.js]`  
`[TYPE CODE]`
```javascript
const STATE_TITLE = 0;
const STATE_PLAYING = 1;
const STATE_WON = 2;

let gameState = STATE_TITLE;
const exitDoor = { x: 1210, y: 120, w: 20, h: 28 };

// In update():
if (gameState === STATE_TITLE) {
  if (keys.jump) gameState = STATE_PLAYING;
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

// Reaching the exit door:
if (rectsOverlap(player, exitDoor)) {
  gameState = STATE_WON;
  if (typeof playSfx === 'function') playSfx('win');
}
```

`[SCREEN SHARE: Browser]`  
`[VERIFY ON SCREEN]`  
"When you launch, the game waits for you to press Space. When you reach the golden door at the end of the level, the Victory screen appears! Milestone 3.3 complete!"

---

### Milestone 3.4: Pairing with Gemini — The 8-Bit Audio Synth

`[ON CAMERA]`  
"For our grand finale, let's give our game voice! We don't want to hunt down `.wav` files. Let's ask Gemini to build a native Web Audio micro-synthesizer."

`[SCREEN SHARE: Switch to Gemini window]`  
`[PROMPT GEMINI]`
```
I am building a retro HTML5 Canvas game in JavaScript with no external dependencies.
Please generate a single, self-contained JavaScript function `playSfx(type)` using the browser's native `AudioContext`.
Support three sound types:
1. 'jump': A quick retro upward pitch frequency slide (150Hz to 400Hz over 0.15s, square wave).
2. 'death': A harsh low-frequency buzzer/downward drop (250Hz down to 60Hz over 0.25s, sawtooth wave).
3. 'win': A cheerful high-pitched two-tone arcade fanfare (523Hz then 659Hz over 0.3s).
Keep it under 35 lines, handle user-interaction AudioContext unlocking, and make it beginner-friendly.
```

`[SCREEN SHARE: Show Gemini's generated synth code and paste into js/game.js]`  
`[PRESENTER TALKS WHILE TYPING]`  
"Gemini just created an electronic sound synthesizer in 30 lines using pure browser math! Let's wire it up:
- On jump: `playSfx('jump')`
- On spike collision: `playSfx('death')`
- On victory: `playSfx('win')`"

`[SCREEN SHARE: Browser with Sound On]`  
`[VERIFY ON SCREEN]`  
"Listen to that! 

`[Play game live: jump chirps, spike buzz, and final victory fanfare!]`

Jump chirps! Spike buzzes! Victory fanfare! We didn't download a single audio file, and we didn't install a single library."

---

## SERIES FINALE & SIGN-OFF

`[ON CAMERA]`

"Look at what you have built!

In three short sessions, starting from an empty text file and a blank canvas, you have created a complete, authentic 2D retro platformer with:
- A custom 60 FPS game engine loop
- Euler physics and jump arcs
- AABB collision detection and floating platform ledges
- Coyote Time and Jump Buffering game juice
- A 4-screen scrolling camera
- Spike hazards, screen flash, and finite state machines
- Live ASCII pixel art and an 8-bit audio synthesizer built in collaboration with Gemini!

You now understand the fundamental principles that power every video game in the world. 

Where you take this next is up to you: ask Gemini to generate enemies with patrol behavior, add collectible coins, or design whole new worlds.

Thank you so much for coding along with me. Don't forget to share what you built, and happy game developing!"
