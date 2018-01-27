import GameObject from "../gameobject";

export default class Bullet extends GameObject {
    constructor(player) {
        super(player.world, player.position.x, player.position.y, 0);
        this.player = player;
        this.sprite = new PIXI.Sprite(
			PIXI.loader.resources["test"].texture
		);
		
        
        this.world.context.stage.addChild(this.sprite);

        this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;    
    }

    update() {
        super.update();

        this.position.x += 1;

        this.sprite.x = this.position.x;
        this.sprite.y = this.player.position.y;
    }
}