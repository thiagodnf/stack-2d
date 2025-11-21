export default Object.freeze({
    BOUNCE: 0,
    ROLL: 1,
    valueOf(name) {
        return this[name];
    }
});
