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
