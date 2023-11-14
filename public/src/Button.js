import { ctx, input } from "../app.js";
import { hoverCheck } from "./utils.js";

export default class Button {
    /**
     * Create a basic button
     * @param {number} x X position of button
     * @param {number} y Y position of button
     * @param {number} w Width of button
     * @param {number} h Height of button
     * @param {string} text Text content of button
     * @param {Function} onClick A callback function that gets called when the button is pressed
     * @param {object} style Style of the button
     */
    constructor(x, y, w, h, text, onClick, style = { color: "#B3B3B3", textColor: "#000000", font: "16px Arial", borderColor: "#7A7A7A", borderWidth: 3, hoverColor: "#8F8F8F", pressedColor: "#686868" }) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
        this.style = style;

        this.isHovered = false;
        this.canBePressed = false;
        this.isPressed = false;
    }
    
    update() {
        this.isHovered = hoverCheck(this.x, this.y, this.w, this.h)

        if (this.isHovered && !this.isPressed && (!input.mouse.left || this.canBePressed)) this.canBePressed = true;
        else this.canBePressed = false;

        if (this.canBePressed && input.mouse.left) {
            this.onClick();
            this.isPressed = true;
        } else if (!this.isHovered && this.isPressed) this.isPressed = false;
        else if (!input.mouse.left && this.isPressed) this.isPressed = false;
    }

    render() {
        if (this.isPressed) ctx.fillStyle = this.style.pressedColor;
        else if (this.isHovered) ctx.fillStyle = this.style.hoverColor;
        else ctx.fillStyle = this.style.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.lineWidth = this.style.borderWidth;
        ctx.strokeStyle = this.style.borderColor;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.lineWidth = 1

        ctx.fillStyle = this.style.textColor;
        ctx.font = this.style.font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2)
    }
}