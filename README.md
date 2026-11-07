# 🎮 NEON MONO PLATFORMER — Live Coding Series with Gemini

An authentic, two-tone retro arcade platformer built from scratch in pure vanilla JavaScript and HTML5 Canvas, designed for an interactive **3-Part Beginner Live Coding Series** paired with **Gemini**.

Zero external dependencies. Zero build tools. Zero installation required.

---

## 🌿 Switchable Branch Architecture

This repository is organized into distinct, runnable Git branches so you can switch between stages live during a stream or workshop:

| Branch | Stage & Focus | What's Playable in this Branch | Switch Command |
|---|---|---|---|
| **`00-starter`** | **The Clean Slate** | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line flipbook loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** | **Canvas & Controls** | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** | **Physics & World** | Euler gravity, spacebar jumps, AABB platform collisions, 4-screen level, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** | **Polished Game** | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | **Teaching Master** | Completed game + all presenter guides + teleprompter script + starter template | `git checkout main` |

> 💡 **Tip:** Simply check out any branch and double-click `index.html` in that branch to run that exact stage immediately in any browser!

---

## 📖 Live Coding Guides & Teleprompter

Everything you need to deliver the sessions is included in the [`guides/`](guides/) directory:

- 🎙️ **[Master Presenter Script](guides/master_presenter_script.md)**: A complete, word-for-word spoken script covering game programming concepts for beginners, session orientation, and milestone-by-milestone commentary up to game completion.
- 📘 **[Part 1 Guide](guides/part_1_guide.md)**: The Magic Canvas & Moving Our Hero (Milestones 1.1–1.4).
- 📙 **[Part 2 Guide](guides/part_2_guide.md)**: Defying Gravity & Jumping on Platforms (Milestones 2.1–2.4).
- 📕 **[Part 3 Guide](guides/part_3_guide.md)**: Hazards, Polish & Shipping with Gemini (Milestones 3.1–3.4).
- 🧭 **[Curriculum Overview](guides/README.md)**: Master timetable and beginner pedagogical principles.

---

## 🕹️ Controls & Gameplay

| Action | Key / Input |
|---|---|
| **Move Left / Right** | `A` / `D` or `ArrowLeft` / `ArrowRight` |
| **Jump** | `Space` (Hold for higher jump, tap for low hop) |
| **Restart Run** | `R` |

---

## 🚀 Quick Start for Learners

1. Clone the repository:
   ```bash
   git clone https://github.com/KalminX/advent_time.git
   cd advent_time
   ```
2. Open `index.html` directly in your browser:
   - **Mac**: `open index.html`
   - **Windows**: `start index.html`
   - **Linux**: `xdg-open index.html`
3. To start coding from scratch alongside the stream, switch to the starter branch:
   ```bash
   git checkout 00-starter
   ```

---

## 🤖 Built with Gemini
Demonstrates modern human-AI pair programming:
- **Human Coded**: Engine architecture, 60 FPS flipbook loop, Euler physics equations, AABB collision resolution, and camera tracking.
- **Gemini Accelerated**: 8-bit ASCII character sprite matrices, multi-screen level platform coordinate arrays, and zero-dependency Web Audio API square-wave synthesizer.
