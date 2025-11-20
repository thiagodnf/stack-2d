export default class CanvasUtils {

    static canvas;
    static ctx;

    static init(el) {
        CanvasUtils.canvas = document.getElementById(el);
        CanvasUtils.ctx = canvas.getContext("2d");
    }

    static clear() {
        CanvasUtils.ctx.clearRect(0, 0, CanvasUtils.ctx.canvas.width, CanvasUtils.ctx.canvas.height);
    }

    static drawLine(x0, y0, x1, y1) {

        CanvasUtils.ctx.beginPath();

        CanvasUtils.ctx.moveTo(x0, y0);
        CanvasUtils.ctx.lineTo(x1, y1);

        CanvasUtils.ctx.stroke();
    }

    static drawSquare(x, y, size) {
        CanvasUtils.drawRect(x, y, size, size);
    }

    static drawRect(x, y, width, height) {

        CanvasUtils.ctx.beginPath();

        CanvasUtils.ctx.lineWidth = 1
        CanvasUtils.ctx.rect(x + 0.5, y + 0.5, width, height);

        CanvasUtils.ctx.stroke();
    }

    static fillSquare(x, y, size, color = "red") {
        CanvasUtils.fillRect(x, y, size, size, color);
    }

    static fillRect(x, y, width, height, color = "red") {

        CanvasUtils.ctx.beginPath();

        CanvasUtils.ctx.lineWidth = 1
        CanvasUtils.ctx.fillStyle = color;
        CanvasUtils.ctx.rect(x + 0.5, y + 0.5, width, height);

        CanvasUtils.ctx.fill();
    }

    static drawSquare(x, y, size = 100, fillStyle = "") {
        CanvasUtils.drawRect(x, y, size, size, fillStyle);
    }

    static drawMatrix(matrix, size) {

        for (let i = 0; i < matrix.length; i++) {

            for (let j = 0; j < matrix[i].length; j++) {

                CanvasUtils.drawSquare(j * size, i * size, size);

                if (matrix[i][j] === 1) {
                    CanvasUtils.fillSquare(j * size + 2, i * size + 2, size - 4);
                }
            }
        }
    }

    static setWidth(width) {
        CanvasUtils.ctx.canvas.width = width+1;
    }

    static setHeight(height) {
        CanvasUtils.ctx.canvas.height = height+1;
    }
}