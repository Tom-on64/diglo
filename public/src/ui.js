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
    const newIc = new IC(input.mouse.x, input.mouse.y - 300);
    chips.push(newIc);
}

export const setupUI = () => {
    // Menu
    document.getElementById("saveBtn").onclick = () => { }
    document.getElementById("openBtn").onclick = () => { }
    document.getElementById("resetBtn").onclick = () => { }
    document.getElementById("optionsBtn").onclick = () => { }
    document.getElementById("helpBtn").onclick = () => { }

    // ICs
    // Since there's only one IC we get that one (NAND)
    document.getElementById("ic").onclick = () => spawnIc(Nand);
    document.getElementById("inputBtn").onclick = () => spawnIc(InputChip);
    document.getElementById("outputBtn").onclick = () => spawnIc(OutputChip);
}

