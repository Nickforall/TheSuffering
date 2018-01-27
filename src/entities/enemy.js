import GameObject from "../gameobject";
import Vector2D from "../utils/vector2d";

// set enemy speed
var speed = Math.floor(Math.random() * 5) + 1

export default class Enemy extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 1);

        this.sprite = new PIXI.Sprite(
            PIXI.loader.resources["test"].texture
        );
        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;



        this.world.context.stage.addChild(this.sprite);
    }

    update() {
        super.update();

        // this.sprite.x = this.position.x;
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;

        this.position.x -= speed;

    }
}
