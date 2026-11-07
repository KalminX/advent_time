# 🎮 Neon Mono Platformer — Branch `01-session-1`

This branch represents the complete, working code at the end of **Session 1: The Magic Canvas & Moving Our Hero**.

## What is in this branch:
- **Canvas Setup & 60 FPS Loop**: Foundation from `00-starter`.
- **Keyboard Input Handling (`js/input.js`)**: Tracks `A` / `D` and arrow keys with clean state mapping.
- **Gemini ASCII Pixel Sprite (`js/sprites.js`)**: 10x13 cyberpunk humanoid matrix rendered pixel-by-pixel.
- **Player Movement**: Smooth left/right walking clamped to screen boundaries.

## How to run:
Open `index.html` in your browser and use `A`/`D` or the Arrow keys to move!

---

## 🔄 How to Switch Between Branches & Acts

| Stage | Focus / What's Playable | Switch Command |
|---|---|---|
| **`00-starter`** | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** (current) | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** | Euler gravity, spacebar jump, AABB platform collisions, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | Master teaching repository with all session guides, presenter script, and starter template | `git checkout main` |

### Terminal Quick Commands:
```bash
git checkout 00-starter    # Jump back to clean starter
git checkout 02-session-2  # Advance to Session 2
git checkout 03-session-3  # Advance to Session 3
git checkout main          # Return to Main (Teaching Guides)
```
