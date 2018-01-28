import GameObject from "../gameobject";
import Vector2D from "../utils/vector2d";

// set enemy speed
// var speed = Math.floor(Math.random() * 5) + 1

export default class Boss extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 1);

        // create container
        let container = window.spriteUtils.group();
        // make container global
        this.container = container;
        this.container.position.x = x;
        this.container.position.y = y;
        this.container.pivot.set(0, -30);

        // set speed and health (global)
        this.speed = 0;
        // slime sprite and startanimation
        let slimeTextures = window.spriteUtils.frameSeries(0, 4, "kingslime ", ".ase");

        // make enemy
        let slime = window.spriteUtils.sprite(slimeTextures);
        this.sprite = slime;
        slime.show(0);
        slime.fps = 4;
        slime.scale.set(6, 6);
        slime.pivot.set(0, 0);
        slime.playAnimation([0, 3]);
        this.container.addChild(slime); // add slime to container

        // add bottom healthbar
        let bottomHealthbar = new PIXI.Graphics();
        bottomHealthbar.beginFill(0x444444);
        bottomHealthbar.drawRect(0, 0, 200, 15);
        bottomHealthbar.endFill();
        this.container.addChild(bottomHealthbar); // add bottom healthbar to container
        // add healthbar
        let healthbar = new PIXI.Graphics();
        this.healthbar = healthbar;
        this.healthbar.beginFill(0xF33636);
        this.healthbar.drawRect(0, 0, 180, 15);
        this.healthbar.endFill();
        this.container.addChild(this.healthbar); // add top healthbar to container

        // add container to world
        this.world.context.stage.addChild(container);

        // set health to 100 (can be variable in future)
        this.health = 500;

        // set container velocity
        this.container.vy = 10;

        this.alive = true;

        this.counter = 0;
        this.diversifier =  Math.random() * 30 - 15;

        setInterval(() => {
            this.diversifier = Math.random() * 30 - 15;
        }, 4000);

    }

    update() {
        super.update();

        this.counter++;

        // trigger healthbar update function
        this.healthbarUpdate();

        this.direction = this.counter % 100 > 50 + this.diversifier

        if (this.direction) {
            this.container.position.x -= 5;
        } else {
            this.container.position.x += 5;
        }


        this.container.position.y += this.container.vy;

        this.world.willCollide(this.container)

    }

    damage(x) {
        this.health -= x;

        if (this.health <= 0 && this.alive) {
            this.alive = false;
            this.container.visible = false;
            // winner winner chicken dinner
            setWinner(this.world.isTop() ? "TAPP" : "BAPP", "Not quick enough")
        }
    }

    healthbarUpdate() {
        // set healthbar width to enemy health
        this.healthbar.width = this.health / 250 * 100;
    }
}
