import Vector2D from './utils/vector2d';

export default class GameObject {
    /**
     * A gameobject is anything where physics apply to.
     * @param {World} world The world the gameobject is in
     * @param {Number} x
     * @param {Number} y
     * @param {Number} mass
     */
    constructor(world, x, y, mass) {
        this.world = world;
        this.mass = mass;

        this.hasUncollided = true;

        this.collisionHandlers = [];
    }

    addCollisionHandler(fun) {
        this.collisionHandlers.push(fun);
    }

    handleCollision(objectB) {
        if(!this.hasUncollided) {
            return;
        }

        for (let handler of this.collisionHandlers) {
            handler(this, objectB);
        }
    }

    update() {
    }
}
