export default class Collider {
    constructor(x, y, height, width, innercontext) {
        this.x = x;
        this.y = -y + (innercontext.context.view.height);
        this.height = height;
        this.width = width;

        let platform = new PIXI.Graphics();
        // platform.beginFill(0xCCFF99);
        platform.drawRect(0, 0, this.width, this.height);
        // platform.endFill();
        platform.x = this.x;
        platform.y = this.y;
        platform.pivot.set(0 , 1);

        this.rectangle = platform
    }
}