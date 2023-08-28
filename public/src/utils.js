import { input } from "../app.js"

export const hoverCheck = (x, y, w, h) => {
    return (
        input.mouse.x > x &&
        input.mouse.y > y &&
        input.mouse.x < x + w &&
        input.mouse.y < y + h
    )
}