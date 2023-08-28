import Chip from "./Chip.js";

export default class Nand extends Chip {
    constructor(x, y) {
        super(x, y, "NAND", "#028");

        this.inputs.push(false, false);
        this.outputs.push(true);

        this.calculateHeight();
    }

    update() {
        super.update();

        const [input1, input2] = this.inputs;
        this.outputs[0] = !(input1 && input2); // !A^B
    }

    render() {
        super.render();
    }
}