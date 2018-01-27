import { WEAPON_UPGRADE } from "./boosttypes";

export default class Boost {
    constructor(player, isBuff, type) {
        this.player = player;
        this.isBuff = isBuff;
        this.type = type;
    }

    use() {
        if (this.type === WEAPON_UPGRADE) {
            // give player weapon
        }
    }
}