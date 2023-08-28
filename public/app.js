/** @type {HTMLCanvasElement} */
import { start, update, fixedUpdate } from "./src/main.js";

/** Canvas Element
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("simCanvas");
/** 2D Canvas Rendering Context */
export const ctx = canvas.getContext("2d");
/** Contains info about the display canvas  */
export const display = {
    /** The width of the display */
    w: 0,
    /** The height of the display */
    h: 0,
}

/**
 * Handles the Input
 */
export const input = {
    /** Contains the key if it was pressed */
    keys: {},
    /** Contains properties for mouse input */
    mouse: {
        /** X position of the mouse */
        x: 0,
        /** Y position of the mouse */
        y: 0,
        /** Left mouse button */
        left: false,
        /** Middle mouse button */
        middle: false,
        /** Right mouse button */
        right: false,
    }
}

// Timing
let timestamp = 0;
let timer = 0;
/** 
 * The Update Rate In Miliseconds. 
 * Changes how frequently the fixedUpdate() function gets called 
 */
export let updateRate = 50;

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    display.w = parseInt(canvas.width.toString());
    display.h = parseInt(canvas.height.toString());
}

const frameUpdate = (time = 0) => {
    requestAnimationFrame(frameUpdate);

    const deltatime = time - timestamp;
    timestamp = time;

    update(deltatime);
    if (timer >= updateRate) {
        timer = 0;
        fixedUpdate();
        return;
    }

    timer += deltatime;
}

window.onresize = resizeCanvas;

document.addEventListener("keydown", (e) => input.keys[e.key] = true)
document.addEventListener("keyup", (e) => input.keys[e.key] = false)
document.addEventListener("mousedown", (e) => {
    if (e.button == 0) input.mouse.left = true
    else if (e.button == 1) input.mouse.middle = true
    else if (e.button == 2) input.mouse.right = true
})
document.addEventListener("mouseup", (e) => {
    if (e.button == 0) input.mouse.left = false
    else if (e.button == 1) input.mouse.middle = false
    else if (e.button == 2) input.mouse.right = false
})
document.addEventListener("mousemove", (e) => {
    input.mouse.x = e.clientX;
    input.mouse.y = e.clientY;
})

document.addEventListener("contextmenu", (e) => e.preventDefault());

resizeCanvas();
start();
frameUpdate();
