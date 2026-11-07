# 🎮 Neon Mono Platformer — Branch `03-session-3`

This branch represents the complete, fully polished game at the end of **Session 3: Hazards, Polish & Shipping with Gemini**.

## What is in this branch:
- **1280px Dynamic Scrolling Camera**: Smooth camera lerp that tracks the player across a 4-screen world.
- **Spike Hazards & Death Flash**: Spike pits, contact damage, screen-space color inversion glitch, and respawn logic.
- **Finite State Machine**:
  - `STATE_TITLE`: Retro title screen with blinking "PRESS SPACE TO START" prompt.
  - `STATE_PLAYING`: Full platforming gameplay loop with corner distance progress meter.
  - `STATE_WON`: Victory gate banner ("MISSION COMPLETE! PRESS R TO PLAY AGAIN").
- **Zero-Dependency 8-Bit Web Audio Synthesizer**: Native square and sawtooth wave sound effects for jump chirps, death buzzers, and victory arpeggios.
- **Enemies & Obstacles**: Patrolling terrestrial Strider and aerial hovering Cyclops Drone.

## How to run:
Simply open `index.html` in your browser! Press `Space` to begin, run and jump to the golden gate, and enjoy the 8-bit sound effects.

---

## 🔄 How to Switch Between Branches & Acts

| Stage | Focus / What's Playable | Switch Command |
|---|---|---|
| **`00-starter`** | Minimal canvas boilerplate (`320x180`), CRT styling, and 15-line loop with green test box | `git checkout 00-starter` |
| **`01-session-1`** | Keyboard input (`A`/`D`/Arrows) and Gemini-generated 10x13 ASCII character sprite | `git checkout 01-session-1` |
| **`02-session-2`** | Euler gravity, spacebar jump, AABB platform collisions, coyote time & jump buffering | `git checkout 02-session-2` |
| **`03-session-3`** (current) | 1280px scrolling camera, spike hazards, death flash, Title & Victory states, 8-bit Web Audio synth | `git checkout 03-session-3` |
| **`main`** | Master teaching repository with all session guides, presenter script, and starter template | `git checkout main` |

### Terminal Quick Commands:
```bash
git checkout 00-starter    # Step back to clean starter
git checkout 01-session-1  # Step back to Session 1
git checkout 02-session-2  # Step back to Session 2
git checkout main          # Return to Main (Teaching Guides)
```
