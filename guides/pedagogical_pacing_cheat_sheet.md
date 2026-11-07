# 🧠 Pedagogical Pacing & Code Metrics Cheat Sheet

> **Quick Reference for the Presenter:**  
> Use this cheat sheet to keep your live coding sessions on pace, prevent beginner cognitive overload, and balance live typing with Gemini co-piloting.

---

## 🎯 The Three Golden Rules for Beginner Live Coding

1. **The Rule of 3 Concepts**:
   - Never introduce more than **3 core conceptual models** in a single 50-minute session.
   - Any fourth or fifth concept will overwrite earlier concepts in working memory.
2. **The 40-Line Typing Ceiling**:
   - Limit live typing to **35–42 lines of code per session**.
   - Type in small bites of **$\le 10$ lines** at a time.
   - If you write more than 50 lines live, beginners stop understanding and regress into blind copy-pasting.
3. **The 8-Minute Heartbeat**:
   - **2 min**: Explain the physical metaphor (flipbook, gravity, bounding box).
   - **4 min**: Type 8–10 lines of code live while talking.
   - **2 min**: Save, refresh browser, and celebrate the visual change on screen.
   - *Never write code for 10 straight minutes without a browser refresh!*

---

## 📊 Session-by-Session Metrics Breakdown

| Session | Core Concepts Introduced (3 Max) | Lines Typed Live | Lines Delegated to Gemini | Total New Code | Visual Milestone Payoff |
|---|---|---|---|---|---|
| **Session 1** | 1. Digital Graph Paper<br>2. 60 FPS Infinite Flipbook<br>3. Input State Mapping | **34 lines** | **24 lines** *(ASCII Sprite & 1px Rasterizer)* | **~58 lines** | Neon cyberpunk hero running left/right across screen |
| **Session 2** | 1. Euler Physics ($Y += VY$, $VY += G$)<br>2. AABB Box Collisions<br>3. Coyote Time & Jump Buffers | **42 lines** | **30 lines** *(4-Screen Level Platform Array)* | **~72 lines** | Hero jumping, landing on floating ledges with forgiving controls |
| **Session 3** | 1. Relative Camera Brush ($X - \text{camX}$)<br>2. Finite State Machine (Title/Play/Win)<br>3. Web Audio Synthesis | **38 lines** | **32 lines** *(Browser AudioContext 8-Bit Synth)* | **~70 lines** | Full arcade game loop with scrolling camera, hazards & sound FX |

---

## 🔍 Detailed Session Breakdown & Line Chunks

### Session 1: The Magic Canvas & Moving Our Hero
- **Concept 1: The Digital Graph Paper**
  - *Metaphor*: Screen $(0,0)$ is top-left because CRT electron guns scanned top-to-bottom.
  - *Live-Typed (6 lines)*:
    ```javascript
    let playerX = 50; let playerY = 120;
    const playerWidth = 10; const playerHeight = 14;
    ctx.fillStyle = COLOR_BG; ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.fillStyle = COLOR_FG; ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    ```
- **Concept 2: The Infinite Flipbook (Game Loop)**
  - *Metaphor*: 60 FPS flipbook on the corner of a notebook.
  - *Live-Typed (8 lines)*:
    ```javascript
    function update() { playerX += 1.5; if (playerX > SCREEN_WIDTH) playerX = -playerWidth; }
    function gameLoop() { update(); render(); requestAnimationFrame(gameLoop); }
    requestAnimationFrame(gameLoop);
    ```
  - *The "Break It Live" Moment*: Comment out `ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)` to show graphics smearing like wet paint!
- **Concept 3: Input State Mapping**
  - *Metaphor*: The computer keeps a small notepad remembering which keys are currently held down.
  - *Live-Typed (20 lines)*:
    ```javascript
    const keys = { left: false, right: false };
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = true;
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = false;
    });
    // In update():
    if (keys.left) playerX -= 1.8;
    if (keys.right) playerX += 1.8;
    if (playerX < 0) playerX = 0;
    ```
- **Gemini Co-Pilot Delegation (24 lines)**:
  - Ask Gemini to generate the 10x13 ASCII matrix `SPRITE_PLAYER_IDLE` and `drawSprite()` loop.
  - *Time Saved*: ~25 minutes of tedious character bit-mapping.

---

### Session 2: Defying Gravity & Jumping on Platforms
- **Concept 1: Euler Physics in Grade-School Addition**
  - *Metaphor*: Position is where you are; velocity is where you're heading. Gravity is a constant downward tug.
  - *Live-Typed (14 lines)*:
    ```javascript
    const GRAVITY = 0.22; const JUMP_VELOCITY = -4.8;
    let player = { x: 50, y: 50, w: 10, h: 13, vx: 0, vy: 0, isGrounded: false };
    if (keys.jump && player.isGrounded) { player.vy = JUMP_VELOCITY; player.isGrounded = false; }
    player.vy += GRAVITY;
    player.y += player.vy;
    if (player.y >= 150) { player.y = 150; player.vy = 0; player.isGrounded = true; }
    ```
- **Concept 2: AABB Bounding Box Collision**
  - *Metaphor*: Computers don't have eyes; they ask 4 boundary questions to detect touch.
  - *Live-Typed (20 lines)*:
    ```javascript
    function rectsOverlap(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
    // Vertical landing resolution:
    for (let p of platforms) {
      if (rectsOverlap(player, p)) {
        if (player.vy > 0) { player.y = p.y - player.h; player.vy = 0; player.isGrounded = true; }
      }
    }
    ```
- **Concept 3: Game Juice (Coyote Time & Jump Buffering)**
  - *Metaphor*: "Why bad platformers feel clunky and great platformers feel magical."
  - *Live-Typed (8 lines)*:
    ```javascript
    if (player.isGrounded) coyoteTimer = 6; else if (coyoteTimer > 0) coyoteTimer--;
    if (jumpBufferTimer > 0) jumpBufferTimer--;
    if (jumpBufferTimer > 0 && coyoteTimer > 0) {
      player.vy = JUMP_VELOCITY; player.isGrounded = false;
      coyoteTimer = 0; jumpBufferTimer = 0;
    }
    ```
- **Gemini Co-Pilot Delegation (30 lines)**:
  - Ask Gemini to generate the 15-platform course array `{x, y, w, h}` across 4 difficulty sections.
  - *Time Saved*: ~20 minutes of plotting coordinates.

---

### Session 3: Hazards, Polish & Shipping with Gemini
- **Concept 1: The Relative Camera Offset**
  - *Metaphor*: The world doesn't move in 3D; our drawing paintbrush shifts by `cameraX`.
  - *Live-Typed (8 lines)*:
    ```javascript
    cameraX = player.x - 100;
    if (cameraX < 0) cameraX = 0;
    if (cameraX > LEVEL_WIDTH - SCREEN_WIDTH) cameraX = LEVEL_WIDTH - SCREEN_WIDTH;
    // In render:
    ctx.fillRect(p.x - cameraX, p.y, p.w, p.h);
    drawSprite(sprite, player.x - cameraX, player.y);
    ```
- **Concept 2: Finite State Machine (FSM)**
  - *Metaphor*: Traffic light—the game is only ever in one mode at a time.
  - *Live-Typed (24 lines)*:
    ```javascript
    const STATE_TITLE = 0; const STATE_PLAYING = 1; const STATE_WON = 2;
    let gameState = STATE_TITLE;
    if (gameState === STATE_TITLE && keys.jump) gameState = STATE_PLAYING;
    if (gameState === STATE_WON && keys.restart) { player.x = 20; gameState = STATE_PLAYING; }
    if (rectsOverlap(player, exitDoor)) gameState = STATE_WON;
    // Hazard collision & flash
    for (let s of spikes) {
      if (rectsOverlap(player, s)) { deathFlashTimer = 8; player.x = 20; player.y = 120; }
    }
    ```
- **Concept 3: Web Audio Synthesis Without Audio Files**
  - *Metaphor*: The browser has an electronic synthesizer chip built into it; we just tell it the note frequency and duration.
  - *Live-Typed (6 lines)*:
    ```javascript
    if (keys.jump && player.isGrounded) playSfx('jump');
    if (deathFlashTimer === 8) playSfx('death');
    if (gameState === STATE_WON) playSfx('win');
    ```
- **Gemini Co-Pilot Delegation (32 lines)**:
  - Ask Gemini to create the single `playSfx(type)` native Web Audio API synthesizer.
  - *Time Saved*: ~25 minutes of Web Audio node routing boilerplate.

---

## ⚠️ 4 Common Beginner Pitfalls & How to Counter Them

1. **Typo Panic**:
   - *Issue*: A beginner misses a closing curly bracket `}` or comma `,` and the screen goes blank.
   - *Fix*: Teach them to open DevTools Console (`F12` or `Cmd+Option+I`) immediately. Reassure them: *"Red text in the console is not an insult; it's a treasure map pointing to the exact line number!"*
2. **The "Nothing Moved" Mystery**:
   - *Issue*: They pressed a key, but the character didn't move.
   - *Fix*: Almost always forgetting to call `update()` inside `gameLoop()` or forgetting `e.preventDefault()` on Spacebar.
3. **Corner Sticking in Platforms**:
   - *Issue*: The player gets stuck on the side of a platform.
   - *Fix*: Show why separating horizontal movement/collision and vertical movement/collision into two distinct passes eliminates the corner-catching bug.
4. **Copy-Paste Fatigue**:
   - *Issue*: If a prompt is too long, attendees get confused about where to paste it.
   - *Fix*: Keep prompt cards in a separate clear file and show the exact file and line number to drop the output into.
