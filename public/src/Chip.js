import { ctx, input } from "../app.js";
import { chips } from "./main.js";
import { hoverCheck } from "./utils.js";

export default class Chip {
    constructor(x, y, name = "Chip", color = "#028") {
        // Info
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;

        // I/O
        this.inputs = [];
        this.outputs = [];
        this.conections = [];

        // Calculate size of chip
        ctx.font = "16px Arial";
        this.w = ctx.measureText(this.name).width + 8;
        this.h = 32;

        // User Interaction info
        this.isHovered = false;
        this.isSelected = false;
        this.isMoving = false;

        // Conections
        this.isConnecting = false;
        this.conectingFrom = null;
    }

    update() {
        this.isHovered = hoverCheck(this.x, this.y, this.w, this.h);

        // Select detect
        if (this.isHovered && input.mouse.left) this.isSelected = true
        else if (!this.isHovered && input.mouse.left) this.isSelected = false

        // Move schmoove
        if ((this.isHovered && input.mouse.left) || this.isMoving) this.move(input.mouse.x - this.w / 2, input.mouse.y - this.h / 2);
        if (!input.mouse.left) this.isMoving = false;

        // Conection detection
        // Check if we are conecting
        if (input.mouse.left && this.isConnecting) {
            const isDone = false;
            chips.forEach(chip => {
                if (isDone) return;         // For performance
                // Check for every input of a chip
                for (let i = 0; i < chip.inputs.length; i++) {
                    // Calculate position of the input pin
                    const outputPinSpace = chip.h / chip.inputs.length
                    const pinPos = outputPinSpace * i + outputPinSpace / 2;

                    // Debug
                    ctx.fillStyle = "#00FF00AA";
                    ctx.fillRect(chip.x - 20, chip.y + pinPos - 4, 24, 8)

                    // Check if we are clicking on the pin
                    if (hoverCheck(chip.x - 20, chip.y + pinPos - 4, 24, 8)) {
                        console.log(i)
                        isDone = true;
                        break;
                    }
                }
            })

            this.isConnecting = false;
        }

        // Check if we should start conecting
        if (input.mouse.left && !this.isConnecting) {
            // Check if we are clicking on any of the output pins
            for (let i = 0; i < this.outputs.length; i++) {
                // Calculate pin position
                const outputPinSpace = this.h / this.outputs.length
                const pinPos = outputPinSpace * i + outputPinSpace / 2;

                // Debug
                ctx.fillStyle = "#00FF00AA";
                ctx.fillRect(this.x + this.w - 2, this.y + pinPos - 4, 24, 8)
                // Check if we clicked the pin or not
                if (hoverCheck(this.x + this.w - 2, this.y + pinPos - 4, 24, 8)) {
                    this.isConnecting = true;
                    this.conectingFrom = i;
                    break;
                }
            }
        }
    }

    move(x, y) {
        // Move the chip
        this.isMoving = true;
        this.x = x;
        this.y = y;
    }

    render() {
        // Render body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Moving overlay
        if (this.isMoving) {
            ctx.fillStyle = "#114A";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        // Render text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x + this.w / 2, this.y + this.h / 2);

        // Render pins
        const inputPinSpace = this.h / this.inputs.length;
        const outputPinSpace = this.h / this.outputs.length;

        // Render input pins
        for (let i = 0; i < this.inputs.length; i++) {
            const y = inputPinSpace * i + inputPinSpace / 2;

            // If the input is on the pin will be red, else white
            ctx.strokeStyle = this.inputs[i] ? "red" : "white";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + y);
            ctx.lineTo(this.x - 20, this.y + y);
            ctx.stroke();
        }
        // Render output pins
        for (let i = 0; i < this.outputs.length; i++) {
            const y = outputPinSpace * i + outputPinSpace / 2;

            // If the output is on the pin will be red, else white
            ctx.strokeStyle = this.outputs[i] ? "red" : "white";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(this.w + this.x, this.y + y);
            ctx.lineTo(this.w + this.x + 20, this.y + y);
            ctx.stroke();

            // Also color the conection line accordingly
            if (this.isConnecting && i == this.conectingFrom) {
                ctx.beginPath();
                ctx.moveTo(this.w + this.x + 20, this.y + y);
                ctx.lineTo(input.mouse.x, input.mouse.y);
                ctx.stroke();
            }
        }

        // Hover overlay
        if (this.isHovered || this.isSelected) {
            ctx.fillStyle = "#FFF1";
            ctx.fillRect(this.x - 4, this.y - 4, this.w + 8, this.h + 8);
        }
    }

    // Calculates the height of the chip depending on the amount of I/O pins
    calculateHeight() {
        if (this.inputs.length >= this.outputs.length) this.h = this.inputs.length * 16;
        else this.h = this.outputs.length * 16;
    }
}
