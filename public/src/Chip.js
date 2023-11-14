import { ctx, input } from "../app.js";
import Button from "./Button.js";
import ContextMenu from "./ContextMenu.js";
import { chips, metadata } from "./main.js";
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
        this.isSelected = true;
        this.isMoving = true;
        this.justSpawned = true;

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
        if ((this.isHovered && input.mouse.left && !metadata.holdingChip) || this.isMoving || this.justSpawned) this.move(input.mouse.x - this.w / 2, input.mouse.y - this.h / 2);
        if (!input.mouse.left) {
            this.isMoving = false;
            metadata.holdingChip = false;
        }

        // Context detex
        if (this.isHovered && input.mouse.right) {
            const buttons = [
                new Button(0, 0, 0, 0, "Rename", () => {
                    const newName = prompt("New name: ");
                    if (newName) this.name = newName;
                }), 
                new Button(0, 0, 0, 0, "Destroy", () => this.destory()), 
            ]

            metadata.ctxMenu = new ContextMenu(buttons);
            metadata.ctxExists = true;
        }

        this.connectionUpdate(); // Check for connecting things and update conections

        // Destroy if users presses backspace
        if (this.isSelected && input.keys["Backspace"]) this.destory();

        if (input.mouse.left) this.justSpawned = false;
    }

    connectionUpdate() {
        // Check if we are conecting
        if (input.mouse.left && this.isConnecting) {
            let isDone = false;
            chips.forEach(chip => {
                if (isDone) return;         // For performance
                // Check for every input of a chip
                for (let i = 0; i < chip.inputs.length; i++) {
                    // Calculate position of the input pin
                    const outputPinSpace = chip.h / chip.inputs.length
                    const pinPos = outputPinSpace * i + outputPinSpace / 2;

                    // Check if we are clicking on the pin
                    if (hoverCheck(chip.x - 24, chip.y + pinPos - 8, 28, 16)) {
                        // Create a connection
                        this.conections.push({ from: this.conectingFrom, to: chip, toIndex: i });

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

                // Check if we clicked the pin or not
                if (hoverCheck(this.x + this.w - 4, this.y + pinPos - 8, 28, 16)) {
                    this.isConnecting = true;
                    this.conectingFrom = i;
                    break;
                }
            }
        }

        // Update conected pins
        this.conections.forEach((c, i) => {
            // Check if the chip still exists
            if (c.to.isDestroyed) {
                this.conections = this.conections.filter(c => !c.to.isDestroyed);
                return;
            }

            c.to.inputs[c.toIndex] = this.outputs[c.from];
        })
    }

    move(x, y) {
        // Move the chip
        this.isMoving = true;
        metadata.holdingChip = true;
        this.x = x;
        this.y = y;
    }

    render() {
        // Render body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        this.renderOverlays(); // Render hover, move, etc. overlays

        // Render text
        ctx.font = "16px 'Roboto Mono', monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x + this.w / 2, this.y + this.h / 2);

        this.renderIO(); // Render IO pins
        this.renderConections(); // Render conection wires
    }

    renderOverlays() {
        // Moving overlay
        if (this.isMoving) {
            ctx.fillStyle = "#114A";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        // Hover overlay
        if (this.isHovered || this.isSelected) {
            ctx.fillStyle = "#FFF1";
            ctx.fillRect(this.x - 4, this.y - 4, this.w + 8, this.h + 8);
        }
    }

    renderIO() {
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
    }

    renderConections() {
        this.conections.forEach(c => {
            // Calculate conection start
            const outputPinSpace = this.h / this.outputs.length;
            const startY = outputPinSpace * c.from + outputPinSpace / 2;
            // Calculate conection end
            const inputPinSpace = c.to.h / c.to.inputs.length;
            const endY = inputPinSpace * c.toIndex + inputPinSpace / 2;

            // Render the conection
            ctx.lineWidth = 4;
            ctx.strokeStyle = this.outputs[c.from] ? "red" : "white" // Color the wire
            ctx.beginPath();
            ctx.moveTo(this.x + this.w + 20, this.y + startY);
            ctx.lineTo(c.to.x - 20, c.to.y + endY);
            ctx.stroke();
        })
    }

    // Calculates the height of the chip depending on the amount of I/O pins
    calculateHeight() {
        if (this.inputs.length >= this.outputs.length) this.h = this.inputs.length * 12;
        else this.h = this.outputs.length * 12;
    }

    destory() {
        // Turn on destroyed flag
        this.isDestroyed = true;

        // reset conected pins
        this.conections.forEach(c => {
            c.to.inputs[c.toIndex] = false;
        })

        // Clear connections array
        this.conections.splice(0, this.conections.length);
    }
}
