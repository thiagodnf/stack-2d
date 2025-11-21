import Matrix from "./Matrix.js";
import CanvasUtils from "./utils/CanvasUtils.js"
import BlockDirection from "./enums/BlockDirection.js";

const SIZE = 20;
const LEFT = 0;
const RIGHT = 1;

let speed = 400;
let time = 0;
let mode = "bounce";

export default class Stack2D {

    constructor(screenSize = { rows: 8, cols: 8 }) {
        this.screenSize = screenSize;
        this.reset();
    }

    reset() {

        this.m = new Matrix(this.screenSize);

        this.dir = RIGHT;
        this.speed = 400;
        this.score = 1;
        this.isGameOver = false;

        this.line = this.m.getNumberOfRows() - 2;
        this.m.resetRow(this.line);

        this.settings = {
            direction: {
                block: "",
                game: ""
            },
            blockDirection: BlockDirection.BOUNCE,
            drawDirection: "bottomUp"
        }
    }

    spacePressed() {

        if (this.isGameOver) {
            this.reset();
            return;
        }

        if (this.line <= 4) {
            this.m.pushDown();
        } else {
            this.line--;
        }
        // line--;

        const array = this.m.getMatch();

        // Replace the current line with the matching blocks
        this.m.floors[0] = [...array];

        this.m.matrix[this.line + 1] = [...array];

        const total = this.m.countOnes(this.line + 1);

        if (total === 0) {
            this.isGameOver = true;
            return;
        }

        this.score++;

        const nextBlock = this.m.createBlock(0, total)

        // Add the matching blocks in the next floors
        this.m.floors.unshift([...nextBlock]);

        // Move all 1's to the left
        this.m.matrix[this.line] = [...nextBlock];

        this.dir = RIGHT;
    }

    moveAsBounce() {

        if (this.dir === RIGHT) {

            this.m.shiftOnceRight(this.line);

            if (this.m.floors[0][this.screenSize.cols - 1] === 1) {
                this.dir = LEFT;
            }

        } else if (this.dir === LEFT) {

            this.m.shiftOnceLeft(this.line);

            if (this.m.floors[0][0] === 1) {
                this.dir = RIGHT;
            }
        }
    }

    moveAsRoll() {
        this.m.roll(this.line);
    }

    move() {

        if (this.isGameOver) {
            return;
        }

        time++;

        if (time % 25 === 0) {

            if (this.speed >= 20) {
                this.speed = parseInt(this.speed * 0.85);
            }
        }

        this.moveAsBounce();
        // if (this.blockDirection === BlockDirection.BOUNCE) {
        //     this.moveAsBounce();
        // } else {
        //     this.moveAsRoll();
        // }
    }

    draw() {

        this.drawFromBottomUp();

        // if (this.drawDirection === "bottomUp") {
        //     this.drawFromBottomUp();
        // } else if (this.drawDirection === "topDown") {
        //     this.drawFromTopDown();
        // }
    }

    drawFromBottomUp() {

        const maxFloorsDrawn = this.screenSize.rows / 2;

        const totalFloors = this.m.floors.length;

        let row = Math.max(this.screenSize.rows - totalFloors, maxFloorsDrawn);

        const max = Math.min(totalFloors, maxFloorsDrawn);

        for (let i = 0; i < max; i++, row++) {

            for (let j = 0; j < this.screenSize.cols; j++) {
                if (this.m.floors[i][j] === 1) {
                    CanvasUtils.fillSquare(j * SIZE + 2, row * SIZE + 2, SIZE - 4);
                }
            }
        }
    }

    drawFromTopDown() {

        const maxFloorsDrawn = 4;

        const totalFloors = this.m.floors.length;

        const max = Math.min(totalFloors, maxFloorsDrawn);

        for (let i = 0; i < max; i++) {

            let row = max - 1 - i;

            for (let j = 0; j < this.screenSize.rows; j++) {
                if (this.m.floors[i][j] === 1) {
                    CanvasUtils.fillSquare(j * SIZE + 2, row * SIZE + 2, SIZE - 4);
                }
            }
        }
    }

}
