import GameObject from "../gameobject";

export default class Player extends GameObject {
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

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
}