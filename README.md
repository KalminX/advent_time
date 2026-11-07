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
