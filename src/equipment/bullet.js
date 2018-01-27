import GameObject from "../gameobject";

export default class Bullet extends GameObject {
    constructor(player) {
        super(player.world, player.sprite.x, player.sprite.y, 0);
        this.player = player;

        this.sprite = new PIXI.Sprite(
			PIXI.loader.resources["test"].texture
		);
        
        this.world.context.stage.addChild(this.sprite);

        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;
        
        this.sprite.y = this.player.sprite.y + 30;
        this.sprite.x = this.player.sprite.x + this.player.sprite.width;
        
    }

    update() {
        super.update();

        this.sprite.x += 10;
    }
}