import { ctx, display, input } from "../app.js";
import Button from "./Button.js";
import ContextMenu from "./ContextMenu.js";
import { renameCircuit, setupUI } from "./ui.js"

export const metadata = {
    holdingChip: false, 
    ctxExists: false, 
    ctxMenu: null, 
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
export const update = (dt) => {
    if (input.mouse.right) {
        const buttons = [
            new Button(0, 0, 0, 0, "Rename Circuit", () => { const newName = prompt("Rename circuit: "); if (newName) renameCircuit(newName); }),
        ]
        metadata.ctxMenu = new ContextMenu(buttons);
        metadata.ctxExists = true;
    }

    chips.forEach((c, i) => {
        // Check if the chip is destroyed
        if (c.isDestroyed) {
            chips.splice(i, 1);
            return;
        }

        c.update();
        c.render();
    })

    if (metadata.ctxExists) { metadata.ctxMenu.render(); metadata.ctxMenu.update(); }

    if (input.mouse.left && metadata.ctxExists) metadata.ctxExists = false;
}
