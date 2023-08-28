import { ctx } from "../app.js";
import Chip from "./Chip.js";

export default class IOChip extends Chip {
    constructor(x, y, name) {
        super(x, y, name, "#FFF")

        this.w = 64;
        this.h = 64;
    }

    render() {
        // Render body
        ctx.fillStyle = this.inputs[0] || this.outputs[0] ? "red" : "white";
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2);
        ctx.fill();

        this.renderOverlays();

        // Render text
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "32px Arial monospace"
        ctx.fillText(this.name, this.x + this.w / 2, this.y + this.w / 2);

        this.renderIO(); // Render IO pins
        this.renderConections(); // Render conection wires
    }

    renderOverlays() {
        // Moving overlay
        if (this.isMoving) {
            ctx.fillStyle = "#114A";
            ctx.beginPath();
            ctx.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hover overlay
        if (this.isHovered || this.isSelected) {
            ctx.fillStyle = "#FFF1";
            ctx.beginPath();
            ctx.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2 + 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}