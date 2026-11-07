/**
 * CONFIGURATION & CONSTANTS - SESSION 2
 * Canvas settings, colors, and physics parameters.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 180;
const LEVEL_WIDTH = 1280;

const COLOR_BG = '#000000';
const COLOR_FG = '#39FF14';

ctx.imageSmoothingEnabled = false;

// Physics constants
const GRAVITY = 0.22;
const JUMP_VELOCITY = -4.8;
const MOVE_SPEED = 1.7;
const MAX_FALL_SPEED = 6.0;

// Camera offset (static in Session 2, active in Session 3)
let cameraX = 0;
