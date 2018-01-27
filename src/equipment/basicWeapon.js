export default class BasicWeapon {
    constructor(player, damage, range) {
        this.cooldown = 0;
        this.player = player;
        this.damage = damage;
        this.hasCooldown = false;
        this.range = range;
    }
}