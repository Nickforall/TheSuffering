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

    applyForce(force) {
        if (!(force instanceof Vector2D)) {
            throw new Error('Uhm, vec is not a vector?');
        }

        this.acceleration.add(force);
    }

    update() {
        this.applyForce(new Vector2D(0, this.world.gravity * this.mass))

        // DO COLLISION  DETECTION HERE
        this.velocity.add(this.acceleration);

        // prevent from falling from world, will probably need a bit more advanced collision detection soon.

        let predictedX = (this.position.x + this.velocity.x + this.sprite.width);
        let predictedY = (this.position.y + this.velocity.y + this.sprite.height);

        let collision = this.world.willCollide(new Vector2D(predictedX, predictedY));
        
        if (collision !== null) {
            this.velocity.zero();
            this.acceleration.zero();

            this.handleCollision(collision);            
            this.hasUncollided = false;            
        } else {
            this.position.add(this.velocity);
            this.acceleration.zero();
            
            this.hasUncollided = true;
        }        

        /*if ((this.position.y + this.velocity.y + this.sprite.height) > this.world.context.view.height) {
            
        } else {
            this.position.add(this.velocity);
            this.acceleration.zero();
        }*/
    }
}
