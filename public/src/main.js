import Chip from "./Chip.js"

const chips = []

/**
 * Gets called once at start
 */
export const start = () => {
    
}

/**
 * Gets called every frame
 */
export const update = () => {
    chips.forEach(c => c.update())
    chips.forEach(c => c.render())
}

/**
 * Gets called at a constant interval (50ms by default)
 */
export const fixedUpdate = () => { }
