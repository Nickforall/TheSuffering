export default class Collider {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;

        let platform = new PIXI.Graphics();
        platform.beginFill(0xCCFF99);
        platform.drawRect(0, 0, this.height, this.width);
        platform.endFill();
        platform.x = this.x;
        platform.y = this.y;

        this.rectangle = platform
    }
}