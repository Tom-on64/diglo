import { input } from "../app.js";
import IOChip from "./IOChip.js";

export default class InputChip extends IOChip {
    constructor(x, y) {
        super(x, y, "I");

        this.outputs.push(false);

        this.hasChanged = true;
    }

    update() {
        super.update();

        if (this.isHovered && input.mouse.left && !this.hasChanged) {
            this.outputs[0] = !this.outputs[0];
            this.hasChanged = true;
        } else if (!input.mouse.left && this.hasChanged) this.hasChanged = false;
    }
}