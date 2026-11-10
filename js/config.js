/**
 * CONFIGURATION & CONSTANTS
 * Central settings for resolution, colors, physics, and game states.
 */

// Canvas & Context Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game screen dimensions (internal pixel buffer)
const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 180;
const LEVEL_WIDTH = 1280; // 4 screens wide

// Strict two-colour palette: Pure Black & Neon Green
const COLOR_BG = '#000000';
const COLOR_FG = '#39FF14';

// Disable anti-aliasing for raw pixel rendering
ctx.imageSmoothingEnabled = false;

// Physics constants
const GRAVITY = 0.22;
const JUMP_VELOCITY = -4.8;
const MOVE_SPEED = 1.7;
const MAX_FALL_SPEED = 6.0;

// Game states
const STATE_TITLE = 0;
const STATE_PLAYING = 1;
const STATE_WON = 2;

// Shared runtime variables
let gameState = STATE_TITLE;
let cameraX = 0;
let deathFlashTimer = 0;
let audioCtx = null;
