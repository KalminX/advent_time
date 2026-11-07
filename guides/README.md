# 🎮 3-Part Beginner Live Coding Series: Retro Platformer with Gemini

Welcome to the live coding teaching toolkit! This repository is organized to let you run an engaging, zero-stress 3-part live coding series for complete beginners, using **Gemini** as your live AI co-pilot.

---

## 📅 Series Breakdown, Concepts & Code Metrics

| Session | Title | Concepts (3 Max) | Lines Typed Live | Lines Delegated to Gemini | Duration | Guide |
|---|---|---|---|---|---|---|
| **Part 1** | **The Magic Canvas & Moving Our Hero** | 1. Digital Graph Paper<br>2. 60 FPS Flipbook Loop<br>3. Input State Mapping | **34 lines** | **24 lines** *(ASCII Sprite & Rasterizer)* | ~50 min | [part_1_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_1_guide.md) |
| **Part 2** | **Defying Gravity & Jumping on Platforms** | 1. Euler Physics ($Y += VY$, $VY += G$)<br>2. AABB Box Collisions<br>3. Coyote Time & Jump Buffers | **42 lines** | **30 lines** *(4-Screen Platform Course)* | ~50 min | [part_2_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_2_guide.md) |
| **Part 3** | **Hazards, Polish & Shipping with Gemini** | 1. Relative Camera Offset<br>2. Finite State Machine (FSM)<br>3. Web Audio Synthesis | **38 lines** | **32 lines** *(Browser AudioContext Synth)* | ~50 min | [part_3_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_3_guide.md) |

> 🧠 **Teaching Cheat Sheet:** See the full [pedagogical_pacing_cheat_sheet.md](file:///Users/kalmin/projects/advent_time/guides/pedagogical_pacing_cheat_sheet.md) for the 8-minute heartbeat cadence and common beginner pitfalls.

---

## 📁 Repository Structure

```
advent_time/
├── index.html                   # Complete reference game (finished target)
├── style.css                    # Retro CRT pixel-perfect canvas styling
├── js/                          # Finished implementation modules
│   ├── config.js
│   ├── font.js
│   ├── sprites.js
│   ├── level.js
│   ├── input.js
│   └── game.js
├── starter/                     # 🚀 Clean cloneable starter for attendees
│   ├── index.html
│   ├── style.css
│   └── js/
│       ├── config.js
│       └── game.js
└── guides/                      # 📖 Presenter teleprompter & cheatsheets
    ├── README.md                # (This file)
    ├── pedagogical_pacing_cheat_sheet.md # Pacing, concept limits & code budgets
    ├── master_presenter_script.md       # Spoken word-for-word teleprompter
    ├── part_1_guide.md          # Session 1 talk track & code diffs
    ├── part_2_guide.md          # Session 2 talk track & code diffs
    └── part_3_guide.md          # Session 3 talk track & code diffs
```

---

## 🚀 How to Run the Sessions

1. **For Attendees / Clone Instructions:**
   - Clone or copy the `starter/` directory.
   - Open `starter/index.html` in any modern browser (Chrome, Firefox, Safari, Edge). Zero installation or build tools required!
2. **For the Presenter:**
   - Keep the [Master Presenter Script](file:///Users/kalmin/projects/advent_time/guides/master_presenter_script.md) open on a second monitor.
   - Reference the [Pedagogical Pacing Cheat Sheet](file:///Users/kalmin/projects/advent_time/guides/pedagogical_pacing_cheat_sheet.md) to keep your live typing under the 40-line ceiling.
   - Use the pre-tested **Copy-Paste Gemini Prompts** during the stream.
   - Check off each **Milestone Checklist** before advancing.
