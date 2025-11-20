
export default class BinaryUtils {

    static setValue(bin, pos, value) {
        if (value == 1) {
            return bin | (1 << pos);
        } else {
            return bin & ~(1 << pos);
        }
    }

    static toString(bin) {
        return bin.toString(2).padStart(8, '0');
    }
}