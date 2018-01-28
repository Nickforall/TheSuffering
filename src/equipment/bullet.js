import GameObject from "../gameobject";
import Enemy from "../entities/enemy";

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

        this.isUsed = false;
        
        this.travelDistance = 0;
    }

    _kill() {
        this.sprite.visible = false;
        this.isUsed = true;
    }

    update() {
        if (this.isUsed) return;

        super.update();

        if (this.travelDistance > 500) {
            this._kill();
        }

        let attackedEntity = this.world.getCollidedEntites(this.sprite);
        if (attackedEntity instanceof Enemy) {
            console.log(attackedEntity)
            attackedEntity.damage(100);
            this._kill();
        }

        this.sprite.x += 10;
        this.travelDistance += 10;  
    }
}