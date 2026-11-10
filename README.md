# 🎮 NEON MONO PLATFORMER — Live Coding Series with Gemini

An authentic, two-tone retro arcade platformer built from scratch in pure vanilla JavaScript and HTML5 Canvas, designed for an interactive **3-Part Beginner Live Coding Series** paired with **Gemini**.

Zero external dependencies. Zero build tools. Zero installation required.

🌐 **Play Live in Your Browser**: **[https://kalminx.github.io/advent_time/](https://kalminx.github.io/advent_time/)**

---

## 🕹️ Controls & Gameplay

| Action | Keyboard Input | Touch / Mobile Controller |
|---|---|---|
| **Move Left / Right** | `A` / `D` or `ArrowLeft` / `ArrowRight` | On-screen Left (`◄`) / Right (`►`) D-Pad |
| **Jump** | `Space` (Hold for high, tap for low) | On-screen `JUMP` Button (Hold / tap) |
| **Pause Game** | `P` or `Escape` | `PAUSE` Button |
| **Fullscreen Toggle** | `F` | `FS` Button |
| **Restart Run** | `R` | `RESET` Button |

### ✨ Features
- **Strict 2-Tone Visuals**: Pure Black (`#000000`) & Neon Green (`#39FF14`) with nearest-neighbor crisp pixel scaling and subtle parallax starfield.
- **Full Mobile & Tablet Responsiveness**: Dynamic viewport units (`100dvh`/`100dvw`), notch safety margins (`env(safe-area-inset-*)`), and seamless multi-touch controls.
- **Dual-Orientation Handheld Console Mode**:
  - **Landscape & Tablets**: Centered 16:9 view with ergonomic thumb controls placed in the lateral pillarbox areas.
  - **Portrait Phones**: Automatically adapts into a retro handheld deck (Game Boy style) with the screen up top and controller below.
- **7 Collectible Data Chips**: Floating spinning chips scattered along optional high-challenge routes.
- **Mid-Level Checkpoint**: Interactive beacon pylon to save your progress halfway through the course.
- **Speedrun Timer & Stats**: Tracks run time and deaths, saving your personal best clear time directly to `localStorage`.
- **Zero-Dependency Web Audio Synth**: 8-bit square and sawtooth waves for jumps, landing, collecting chips, checkpoints, deaths, and victory fanfare.

## 🔄 How to Switch Between Branches & Acts

This repository uses a step-by-step branch architecture so presenters and learners can instantly jump to any stage of the game:

| Stage | Focus / What's Playable | Switch Command |
|---|---|---|
| **`00-starter`** | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** | Euler gravity, spacebar jump, AABB platform collisions, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | Master teaching repository with all session guides, presenter script, and starter template | `git checkout main` |

### Terminal Quick Commands:
```bash
# Jump to the clean starter:
git checkout 00-starter

# Jump to Session 1:
git checkout 01-session-1

# Jump to Session 2:
git checkout 02-session-2

# Jump to Session 3:
git checkout 03-session-3

# Return to Main:
git checkout main
```

### ⚡ Quick Tip: Dealing with Uncommitted Changes
If you wrote experimental code during a live stream and git blocks switching:
```bash
# Discard test edits and jump cleanly:
git reset --hard && git checkout <branch-name>

# OR stash your changes to review later:
git stash && git checkout <branch-name>
```

### 🚀 How to Run in Any Branch
Every branch is self-contained. Simply open `index.html` in your browser:
- **Mac**: `open index.html`
- **Windows**: `start index.html`
- **Linux**: `xdg-open index.html`

---

## 📖 Live Coding Guides & Teleprompter

Everything you need to deliver the sessions is included in the [`guides/`](guides/) directory:

- 🧠 **[Pedagogical Pacing Cheat Sheet](guides/pedagogical_pacing_cheat_sheet.md)**: Cognitive load limits (3 concepts max), line count budgets (35–42 lines), the 8-minute heartbeat rhythm, and common beginner pitfalls.
- 🎙️ **[Master Presenter Script](guides/master_presenter_script.md)**: A complete, word-for-word spoken script covering game programming concepts for beginners, session orientation, and milestone-by-milestone commentary up to game completion.
- 📘 **[Part 1 Guide](guides/part_1_guide.md)**: The Magic Canvas & Moving Our Hero (Milestones 1.1–1.4).
- 📙 **[Part 2 Guide](guides/part_2_guide.md)**: Defying Gravity & Jumping on Platforms (Milestones 2.1–2.4).
- 📕 **[Part 3 Guide](guides/part_3_guide.md)**: Hazards, Polish & Shipping with Gemini (Milestones 3.1–3.4).
- 🧭 **[Curriculum Overview](guides/README.md)**: Master timetable, concepts, and code metrics.

---

## 🕹️ Controls & Gameplay

| Action | Key / Input |
|---|---|
| **Move Left / Right** | `A` / `D` or `ArrowLeft` / `ArrowRight` |
| **Jump** | `Space` (Hold for higher jump, tap for low hop) |
| **Restart Run** | `R` |

---

## 🤖 Built with Gemini
Demonstrates modern human-AI pair programming:
- **Human Coded**: Engine architecture, 60 FPS flipbook loop, Euler physics equations, AABB collision resolution, and camera tracking.
- **Gemini Accelerated**: 8-bit ASCII character sprite matrices, multi-screen level platform coordinate arrays, and zero-dependency Web Audio API square-wave synthesizer.
