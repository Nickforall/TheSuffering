import GameObject from "../gameobject";
import Vector2D from "../utils/vector2d";

// set enemy speed
// var speed = Math.floor(Math.random() * 5) + 1

export default class Enemy extends GameObject {
    constructor(world, x, y, speed) {
        super(world, x, y, 1);

        let container = window.spriteUtils.group();

        this.speed = speed;

        //slime sprite and startanimation
        let slimeTextures = window.spriteUtils.frameSeries(0, 4, "slime ", ".ase");

        let slime = window.spriteUtils.sprite(slimeTextures);
        this.sprite = slime;
        slime.show(0);
        slime.fps = 8;

        slime.scale.set(3, 3);
        slime.pivot.set(0, -5);
        slime.playAnimation([0, 3]);
        container.addChild(slime);

        this.world.context.stage.addChild(container);

        this.health = 1;
    }

    update() {
        super.update();

        // this.sprite.x = this.position.x;
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;

        // this.position.x -= this.speed;

    }

    damage() {

    }

    healthbar() {

    }
}
