import { input } from "../app.js";
import Chip from "./Chip.js";
import InputChip from "./InputChip.js";
import Nand from "./Nand.js"
import OutputChip from "./OutputChip.js";
import { chips } from "./main.js";

/**
 * Spawns an IC
 * @param {Chip} IC Integrated Circuit
 */
const spawnIc = (IC) => {
    const newIc = new IC(input.mouse.x, input.mouse.y);
    chips.push(newIc);
}

const reset = () => {
    chips.forEach(c => c.isDestroyed = true);
}

export const renameCircuit = (newName) => {
    document.getElementById("cirName").innerText = newName;
}

export const setupUI = () => {
    // Menu
    // document.getElementById("saveBtn").onclick = () => { }
    // document.getElementById("openBtn").onclick = () => { }
    document.getElementById("resetBtn").onclick = () => reset();
    // document.getElementById("optionsBtn").onclick = () => { }
    // document.getElementById("helpBtn").onclick = () => { }

    // ICs
    document.getElementById("ic").onclick = () => spawnIc(Nand); // Since the only IC is NAND we use this
    document.getElementById("inputBtn").onclick = () => spawnIc(InputChip);
    document.getElementById("outputBtn").onclick = () => spawnIc(OutputChip);
}

