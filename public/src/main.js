import { ctx, display } from "../app.js";
import { setupUI } from "./ui.js"

export const chips = []

/**
 * Gets called once at start
 */
export const start = () => {
    setupUI();
}

/**
 * Gets called every frame
 */
export const update = () => {
    ctx.clearRect(0, 0, display.w, display.h)
    chips.forEach(c => c.update())
    chips.forEach(c => c.render())
}
