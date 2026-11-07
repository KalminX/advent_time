/**
 * CONFIGURATION & CONSTANTS
 * Welcome to game dev! This file holds our canvas setup and global settings.
 */

// 1. Grab our canvas element from the HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. Set our internal virtual resolution (Crisp retro arcade size)
const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 180;

// 3. Strict retro two-tone palette
const COLOR_BG = '#000000'; // Pure black
const COLOR_FG = '#39FF14'; // Electric neon green

// 4. Ensure nearest-neighbor pixel rendering (no blurry pixels)
ctx.imageSmoothingEnabled = false;
