import IOChip from "./IOChip.js";

export default class OutputChip extends IOChip {
    constructor(x, y) {
        super(x, y, "O");
    }
}