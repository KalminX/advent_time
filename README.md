# 🎮 Neon Mono Platformer — Branch `02-session-2`

This branch represents the complete, working code at the end of **Session 2: Defying Gravity & Jumping on Platforms**.

## What is in this branch:
- **Euler Gravity & Jump Arc**: Realistic physics acceleration with terminal velocity clamping.
- **AABB Platform Collision Detection (`js/level.js`)**: Solid ground collision, horizontal wall blocks, and platform landing.
- **Gemini Obstacle Course**: 15+ platform stepping stones across a 4-screen level progression.
- **Game Feel Juice**:
  - **Coyote Time (6 frames)**: Jump grace period after running off ledges.
  - **Jump Buffering (6 frames)**: Pre-registers jump input before touchdown.
  - **Variable Jump Height**: Releasing spacebar cuts upward velocity for precise jump control.
- **Walk Cycle & Jump Animation**: Multi-frame animated sprite states with horizontal direction flipping.

## How to run:
Open `index.html` in your browser. Use `A`/`D` to run, `Space` to jump, and try hopping between platforms!

---

## 🔄 How to Switch Between Branches & Acts

| Stage | Focus / What's Playable | Switch Command |
|---|---|---|
| **`00-starter`** | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** (current) | Euler gravity, spacebar jump, AABB platform collisions, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | Master teaching repository with all session guides, presenter script, and starter template | `git checkout main` |

### Terminal Quick Commands:
```bash
git checkout 01-session-1  # Step back to Session 1
git checkout 03-session-3  # Advance to Session 3 (Final Game)
git checkout main          # Return to Main (Teaching Guides)
```
