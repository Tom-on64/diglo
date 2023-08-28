import { ctx } from "../app.js";

export default class Chip {
    constructor(x, y, name = "Chip", color = "#028") {
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;

        ctx.font = "16px Arial";
        this.w = ctx.measureText(this.name) + 8;
        this.h = 32;

        this.inputs = [];
        this.outputs = [];
    }

    update() { }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, 32);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x + this.w / 2, this.y + 16);
    }
}
