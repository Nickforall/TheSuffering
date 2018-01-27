export default class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds the value of one vector to another vector
     * @param {Vector2D} vec 
     */
    add(vec) {
        if (!(vec instanceof Vector2D)) {
            throw new Error('Uhm, vec is not a vector?');
        }

        this.x += vec.x;
        this.y += vec.y;
    }

    zero() {
        this.x = 0;
        this.y = 0;
    }

    multiply(vec) {
        if (!(vec instanceof Vector2D)) {
            this.x *= vec.x;
            this.y *= vec.y;
        }
    }
}