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
        
        this.sprite.y = this.player.container.y + (this.player.sprite.height/2) - 30;
        this.sprite.x = this.player.container.x + (this.player.sprite.width - 40);
        console.log(this.sprite.x);
        
    }

    update() {
        super.update();

        this.sprite.x += 10;
    }
}