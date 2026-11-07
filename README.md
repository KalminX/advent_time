# 🎮 Neon Mono Platformer — Branch `00-starter`

This is the clean starting point for the live coding series.

## What is in this branch:
- **Canvas Setup**: 320x180 retro virtual resolution (`js/config.js`)
- **CRT Pixel-Perfect Styling**: Stretched crisp canvas (`style.css`)
- **The Infinite Flipbook Loop**: 15-line `requestAnimationFrame` game loop with moving green test box (`js/game.js`)

## How to run:
Simply open `index.html` in any browser!

---

## 🔄 How to Switch Between Branches & Acts

| Stage | Focus / What's Playable | Switch Command |
|---|---|---|
| **`00-starter`** (current) | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** | Euler gravity, spacebar jump, AABB platform collisions, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | Master teaching repository with all session guides, presenter script, and starter template | `git checkout main` |

### Terminal Quick Commands:
```bash
git checkout 01-session-1  # Jump to Session 1
git checkout 02-session-2  # Jump to Session 2
git checkout 03-session-3  # Jump to Session 3
git checkout main          # Return to Main (Teaching Guides)
```
