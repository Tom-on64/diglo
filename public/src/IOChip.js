import { ctx } from "../app.js";
import Chip from "./Chip.js";

export default class IOChip extends Chip {
    constructor(x, y, type, name = "Pin") {
        super(x, y, name, "#FFF")

        this.type = type;

        this.w = 64;
        this.h = 64;
    }

    render() {
        // Render body
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2);
        ctx.fill();

        this.renderOverlays();

        // Render text
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "32px 'Roboto Mono', monospace"
        ctx.fillText(this.type, this.x + this.w / 2, this.y + this.w / 2);

        ctx.fillStyle = "white";
        ctx.font = "16px 'Roboto Mono', monospace"
        ctx.fillText(this.name, this.x + this.w / 2, this.y - this.w / 4);

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

        // Active overlay
        if (this.inputs[0] || this.outputs[0]) {
            ctx.fillStyle = "#E20A";
            ctx.beginPath();
            ctx.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}