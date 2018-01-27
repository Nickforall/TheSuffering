import GameObject from "../gameobject";
import Vector2D from "../utils/vector2d";

// set enemy speed
// var speed = Math.floor(Math.random() * 5) + 1

export default class Enemy extends GameObject {
    constructor(world, x, y, speed, health) {
        super(world, x, y, 1);

        // create container
        let container = window.spriteUtils.group();
        // make container global
        this.container = container;
        this.container.position.x = x;
        this.container.position.y = y;
        this.container.pivot.set(0, -16);

        // set speed and health (global)
        this.speed = speed;
        this.health = health;

        // slime sprite and startanimation
        let slimeTextures = window.spriteUtils.frameSeries(0, 4, "slime ", ".ase");

        // make enemy
        let slime = window.spriteUtils.sprite(slimeTextures);
        this.sprite = slime;
        slime.show(0);
        slime.fps = 8;
        slime.scale.set(3, 3);
        slime.pivot.set(-1, 0);
        slime.playAnimation([0, 3]);
        this.container.addChild(slime); // add slime to container

        // add bottom healthbar
        let bottomHealthbar = new PIXI.Graphics();
        bottomHealthbar.beginFill(0x444444);
        bottomHealthbar.drawRect(0, 0, 100, 15);
        bottomHealthbar.endFill();
        this.container.addChild(bottomHealthbar); // add bottom healthbar to container
        // add healthbar
        let healthbar = new PIXI.Graphics();
        this.healthbar = healthbar;
        this.healthbar.beginFill(0xF33636);
        this.healthbar.drawRect(0, 0, 80, 15);
        this.healthbar.endFill();
        this.container.addChild(this.healthbar); // add top healthbar to container

        // add container to world
        this.world.context.stage.addChild(container);

        // set health to 100 (can be variable in future)
        this.health = 100;

        // set container velocity
        this.container.vy = 10;
    }

    update() {
        super.update();

        // trigger healthbar update function
        this.healthbarUpdate();

        // make container move
        this.container.position.x -= this.speed;
        this.container.position.y += this.container.vy;

        this.world.willCollide(this.container)

    }

    healthbarUpdate() {
        // set healthbar width to enemy health
        this.healthbar.width = this.health;
        if (this.health <= 0) {
            this.world.player.xpBar.addXP(10);
        } else {
            // for testing purposes
            this.health -= 0.1;
        }
    }
}
