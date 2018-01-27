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
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
        this.mass = mass;
    }

    applyForce(force) {
        if (!(force instanceof Vector2D)) {
            throw new Error('Uhm, vec is not a vector?');
        }

        this.acceleration.add(force);
    }

    update() {
        this.applyForce(new Vector2D(0, this.world.gravity * this.mass))

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // DO COLLISION DETECTION HERE

        this.acceleration.zero();
    }
}