# 🎮 3-Part Beginner Live Coding Series: Retro Platformer with Gemini

Welcome to the live coding teaching toolkit! This repository is organized to let you run an engaging, zero-stress 3-part live coding series for complete beginners, using **Gemini** as your live AI co-pilot.

---

## 📅 Series Breakdown & Timetable

| Session | Title | Key Beginner Concepts | Gemini Collaboration | Duration | Guide |
|---|---|---|---|---|---|
| **Part 1** | **The Magic Canvas & Moving Our Hero** | Canvas coordinates, 60 FPS flipbook loop, key listeners | Generating 8-bit ASCII character sprite & matrix renderer | ~50 min | [part_1_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_1_guide.md) |
| **Part 2** | **Defying Gravity & Jumping on Platforms** | Velocity & gravity, AABB collision, coyote time, jump buffer | Designing a multi-screen platform course layout array | ~50 min | [part_2_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_2_guide.md) |
| **Part 3** | **Hazards, Polish & Shipping with Gemini** | Scrolling camera, spike traps, state machine (Title/Win) | Micro Web Audio API 8-bit sound synthesizer | ~50 min | [part_3_guide.md](file:///Users/kalmin/projects/advent_time/guides/part_3_guide.md) |

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
   - Keep the corresponding session guide (`part_1_guide.md`, etc.) open on a secondary monitor or tablet.
   - Follow the **Talk Track** for beginner-friendly analogies.
   - Use the **Copy-Paste Gemini Prompts** directly into Gemini during the live stream.
   - Check off each **Milestone Checklist** before moving to the next section.
