import CanvasUtils from "./utils/CanvasUtils.js"
import BinaryUtils from "./utils/BinaryUtils.js";
import Matrix from "./Matrix.js";

const $score = $("#score");

const settingsModal = new bootstrap.Modal(document.getElementById('settings-modal'));

const SIZE = 20;
const LEFT = 0;
const RIGHT = 1;

let last = 0;
let dir = RIGHT;
let drawDirection = "bottomUp";

let mode = "bounce";

let speed = 400;
let line = 0;
let isGameOver;
let score;
let time = 0;

let m = new Matrix();

function resetGame() {

    m = new Matrix();

    dir = RIGHT;
    speed = 400;
    score = 1;
    time = 0;
    isGameOver = false;

    line = m.getNumberOfRows() - 2;
    m.resetRow(line);

    resizeCanvas();
}

function setGameOver() {

    isGameOver = true;
    $score.text(score)
    console.log(score, m.getNumberOfRows())

    if (score === m.getNumberOfRows()) {

        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                y: 0.25
            },
        });
    }
}

function spacePressed() {

    if (isGameOver) {
        resetGame();
        return;
    }

    if (line <= 4) {
        m.pushDown();
    } else {
        line--;
    }
    // line--;

    const array = m.getMatch();

    // Replace the current line with the matching blocks
    m.floors[0] = [...array];

    m.matrix[line + 1] = [...array];

    const total = m.countOnes(line + 1);

    if (total === 0) {
        console.log(m.floors)
        setGameOver();
        return;
    }

    score++;

    const nextBlock = m.createBlock(0, total)

    // Add the matching blocks in the next floors
    m.floors.unshift([...nextBlock]);

    // Move all 1's to the left
    m.matrix[line] = [...nextBlock];

    dir = RIGHT;

    console.log(m.floors)
}

function moveAsBounce() {

    if (dir === RIGHT) {

        m.shiftOnceRight(line);

        if (m.isTrue(line, 7)) {
            dir = LEFT;
        }

    } else if (dir === LEFT) {

        m.shiftOnceLeft(line);

        if (m.isTrue(line, 0)) {
            dir = RIGHT;
        }
    }
}

function moveAsRoll() {
    m.roll(line);
}

function move() {

    if (isGameOver) {
        return;
    }

    time++;

    if (time % 25 === 0) {

        if (speed >= 20) {
            speed = parseInt(speed * 0.85);
        }
    }

    if (mode === "bounce") {
        moveAsBounce();
    } else {
        moveAsRoll();
    }
}

function animate(ts) {

    requestAnimationFrame(animate);

    if (ts - last >= speed) {
        move();
        last = ts;
    }

    $score.text(score)

    CanvasUtils.clear();

    drawMatrix();

    if (drawDirection === "bottomUp") {
        drawFromBottomUp();
    } else if (drawDirection === "topDown") {
        drawFromTopDown();
    }
}

function drawMatrix() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            CanvasUtils.drawSquare(j * SIZE, i * SIZE, SIZE);
        }
    }
}

function drawFromBottomUp() {

    const maxFloorsDrawn = 4;

    const totalFloors = m.floors.length;

    let row = Math.max(8 - totalFloors, maxFloorsDrawn);

    const max = Math.min(totalFloors, maxFloorsDrawn);

    for (let i = 0; i < max; i++, row++) {

        for (let j = 0; j < 8; j++) {
            if (m.floors[i][j] === 1) {
                CanvasUtils.fillSquare(j * SIZE + 2, row * SIZE + 2, SIZE - 4);
            }
        }
    }
}

function drawFromTopDown() {

    const maxFloorsDrawn = 4;

    const totalFloors = m.floors.length;

    const max = Math.min(totalFloors, maxFloorsDrawn);

    for (let i = 0; i < max; i++) {

        let row = max - 1 - i;

        for (let j = 0; j < 8; j++) {
            if (m.floors[i][j] === 1) {
                CanvasUtils.fillSquare(j * SIZE + 2, row * SIZE + 2, SIZE - 4);
            }
        }
    }
}

function resizeCanvas() {

    CanvasUtils.setWidth(8 * SIZE);
    CanvasUtils.setHeight(m.getNumberOfRows() * SIZE);
}

$(function () {

    CanvasUtils.init("#canvas");

    animate();

    $(document).on('keydown', function (e) {
        if (e.code === "Space") {
            spacePressed();
        }
    });

    $("#settings-form").submit(function (event) {

        event.preventDefault();

        speed = parseInt($(this).find('select[name="speed"]').val());
        mode = $(this).find('select[name="mode"]').val()
        drawDirection = $(this).find('select[name="direction"]').val()

        settingsModal.hide();

        resetGame();

        return false;
    });

    $("#btn-open-settings").click(function () {
        settingsModal.show();
    });

    resetGame();
})

// const m = [
//     0b00000000,
//     0b00000000,
//     0b00000000,
//     0b00000000,
//     0b00000000,
//     0b00000000,
//     0b00000000,
//     0b00000000,
// ];

// let n = 0b11111111;
// let b = 1 << 0;

// n = BinaryUtils.setValue(n, 0, 0);
// n = BinaryUtils.setValue(n, 1, 1);
// n = BinaryUtils.setValue(n, 2, 0);
// n = BinaryUtils.setValue(n, 3, 1);

// console.log(BinaryUtils.toString(n));


// // console.log(Number(1 << 2).toString(8))

// console.log(m.createBlock(1, 4));
