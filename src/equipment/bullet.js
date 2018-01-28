import GameObject from "../gameobject";

export default class Bullet extends GameObject {
    constructor(player) {
        super(player.world, player.sprite.x, player.sprite.y, 0);
        this.player = player;

        this.sprite = new PIXI.Sprite(
			PIXI.loader.resources["bullet"].texture
		);
        
        this.world.context.stage.addChild(this.sprite);

        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;
        
        this.sprite.y = this.player.hitbox.y + (this.player.hitbox.height - 20);
        this.sprite.x = this.player.hitbox.x = (this.player.hitbox.width * 2);
        
    }

    update() {
        super.update();

        this.sprite.x += 10;
    }
}