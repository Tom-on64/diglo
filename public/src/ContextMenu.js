import { ctx, input } from "../app.js";
import Button from "./Button.js";

export default class ContextMenu {
    /**
     * Create a basic context menu
     * @param {Button[]} buttons An array of buttons that are in the ctx menu (x, y, w and h don't matter)
     * @param {number?} w Width
     * @param {number?} btnH Common Button Height
     */
    constructor(buttons, w = 144, btnH = 32) {
        this.x = input.mouse.x;
        this.y = input.mouse.y;
        this.w = w;
        this.h = buttons.length * (btnH + 4) + 16;
        this.buttons = buttons;

        this.buttons.forEach((btn, i) => {
            btn.w = this.w - 16;
            btn.h = btnH;
            
            btn.x = this.x + 8;
            btn.y = this.y + 8 + (btn.h + 2) * i;
        });
    }

    update() {
        this.buttons.forEach(btn => btn.update());
    }

    render() {
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.buttons.forEach(btn => btn.render());
    }
}