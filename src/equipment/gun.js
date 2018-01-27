import BasicWeapon from './basicWeapon'
import Bullet from './bullet';
export default class Gun extends BasicWeapon{
    constructor(player){
        super(player, 5, 30)
        
    }
    spawnBullet(){
        let bullet = new Bullet(this.player);

        this.player.world.addEntity(bullet);
    }
}