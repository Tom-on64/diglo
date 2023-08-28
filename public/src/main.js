import { ctx, display } from "../app.js";
import { setupUI } from "./ui.js"

export const metadata = {
    holdingChip: false
};
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
    chips.forEach((c, i) => {
        // Check if the chip is destroyed
        if (c.isDestroyed) {
            chips.splice(i, 1);
            return;
        }

        c.update();
        c.render();
    })
}
