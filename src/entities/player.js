import GameObject from "../gameobject";
import Gun from "../equipment/gun";

export default class Player extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 1);

        this.gun = new Gun(this);

        this.sprite = new PIXI.Sprite(
			PIXI.loader.resources["test"].texture
		);
		this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        
        this.world.context.stage.addChild(this.sprite);

        window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    }
    handleKeyEvent(ev) {

        switch(ev.keyCode) {
            case 32:
                this.gun.spawnBullet();
        break;
            default:
                return;
        }
    }

    update() {
        super.update();

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
}