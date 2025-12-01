import Stack2D from "./Stack2D.js";
import CanvasUtils from "./utils/CanvasUtils.js"

const $score = $("#score");
const settingsModal = new bootstrap.Modal(document.getElementById('settings-modal'));

const SIZE = 20;

let stack2D;

let last = 0;
let speed = 400;

const screenSize = {
    rows: 8,
    cols: 8
}

function animate(ts) {

    requestAnimationFrame(animate);

    if (!stack2D) return;

    if (ts - last >= speed) {
        stack2D.move();
        last = ts;
    }

    CanvasUtils.clear();

    for (let i = 0; i < screenSize.rows; i++) {
        for (let j = 0; j < screenSize.cols; j++) {
            CanvasUtils.drawSquare(j * SIZE, i * SIZE, SIZE);
        }
    }

    $score.text(stack2D.score)

    stack2D.draw();
}


function init() {
    stack2D = new Stack2D(screenSize);
    resizeCanvas();
}

function resizeCanvas() {
    CanvasUtils.setWidth(screenSize.cols * SIZE);
    CanvasUtils.setHeight(screenSize.rows * SIZE);
}

$(function () {

    CanvasUtils.init("#canvas");

    $(document).on('keydown', function (e) {
        // 32 is the Space button being pressed
        if (e.keyCode === 32) {
            stack2D.spacePressed();
        }
    });

    $("#settings-form").submit(function (event) {

        event.preventDefault();

        stack2D.speed = parseInt($(this).find('select[name="speed"]').val());
        stack2D.blockDirection = $(this).find('select[name="mode"]').val()
        stack2D.drawDirection = $(this).find('select[name="direction"]').val()

        settingsModal.hide();

        init();

        return false;
    });

    $("#btn-open-settings").click(function () {
        settingsModal.show();
    });

    init();
    animate();
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
