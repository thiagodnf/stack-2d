export default class BinaryUtils {

    constructor() {
        this.matrix = [
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],
            // [0, 0, 0, 0, 0, 0, 0, 0],

            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
        ];

        this.floors = [
            [1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0]
        ];
    }

    getMatch() {

        const array = Array(8).fill(0);

        for (let j = 0; j < 8; j++) {
            if (this.floors[0][j] === 1 && this.floors[1][j] === 1) {
                array[j] = 1;
            } else {
                array[j] = 0;
            }
        }

        return array;
    }

    createBlock(initialPos, size) {

        if (initialPos < 0) {
            throw new Error("Initial Position should be >= 0");
        }

        if (initialPos >= 8) {
            throw new Error("Initial Position should be <= 7");
        }

        if (size > 8) {
            throw new Error("Size should be <= 8");
        }

        if (initialPos + size > 8) {
            throw new Error("Initial Position + Size should be <= 8");
        }

        const array = Array(8).fill(0);

        for (let i = initialPos; i < initialPos + size; i++) {
            array[i] = 1;
        }

        return array;
    }

    pushDown() {
        const el = this.matrix.pop();
        this.matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    countOnes(i) {
        return this.matrix[i].reduce((c, v) => c + v, 0);
    }

    moveToTheLeft(i) {
        this.matrix[i] = this.matrix[i].sort((a, b) => b - a);
    }

    getNumberOfRows() {
        return this.matrix.length;
    }

    resetRow(i) {
        this.matrix[i] = [1, 1, 1, 1, 1, 0, 0, 0];
    }

    setValue(i, j, value) {
        this.matrix[i][j] = value;
    }

    getValue(i, j) {
        return this.matrix[i][j];
    }

    isTrue(i, j) {
        return this.getValue(i, j) === 1;
    }

    shiftOnceRight(i) {

        if (this.matrix[i][7] !== 1) {
            const el = this.matrix[i].pop();
            this.matrix[i].unshift(el);

            const a = this.floors[0].pop();
            this.floors[0].unshift(a);
        }


    }

    shiftOnceLeft(i) {

        if (this.matrix[i][0] !== 1) {
            const el = this.matrix[i].shift();
            this.matrix[i].push(el);

            const a = this.floors[0].shift();
            this.floors[0].push(a);
        }


    }

    roll(i) {
        const el = this.matrix[i].pop();
        this.matrix[i].unshift(el);
    }
}