import GameObject from "../gameobject";
import Gun from "../equipment/gun";
import Vector2D from "../utils/vector2d";

export default class Player extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 1);

        this.gun = new Gun(this);

        this.sprite = new PIXI.Sprite(
			PIXI.loader.resources["test"].texture
		);
		this.sprite.scale.x = 0.1;
        this.sprite.scale.y = 0.1;

        this.world.context.stage.addChild(this.sprite);

        this.pressedButtons = []

        window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    }

    handleKeyEvent(ev) {
        switch(ev.keyCode) {
            // A key or left on gamepad
            case 65:
                this.position.x -= 5
                break;
            // D key or right on gamepad
            case 68:
                this.position.x += 5(-1, gp.axes[1], 32
                break;
            // SPACE or B on gamepad
            case 32:
                this.applyForce(new Vector2D(0, -7));
                break;
            // E key or A on gamepad
            case 69:
                this.gun.spawnBullet();
                break;
        }
    }

    _pollGamepad() {
        /**
         * Translate the button index on a gamepad to a keyboard keyCode
         * @param  {Int} button The button index
         * @return {Int}        A keycode
         */
        function translateButton(button) {
            // Default mapping for SNES controller
            let mapping = {
                1: 69,
                2: 32
            }

            // Return -1 if the index is not bound
            return mapping[button] ? mapping[button] : -1
        }

        /**
         * Make a fake key event and send it to the handler
         * @param  {Int} key     The keycode to send
         * @param  {Obj} context Context of the class
         */
        function sendKeyEvent(key, context) {
            context.handleKeyEvent({
                keyCode: key
            })
        }

        /**
         * Do a check on change of asis buttons
         * @param  {Int}  truethy If the value is this, the button is pressed
         * @param  {Int}  value   The current button state
         * @param  {Int}  keyCode Keycode to send if pressed
         * @param  {Obj}  context Context of the class
         */
        function checkAxis(truethy, value, keyCode, context) {
            // On button press
            if (value == truethy && !context.pressedButtons[keyCode]) {
                sendKeyEvent(keyCode, context)
                context.pressedButtons[keyCode] = true
            }

            // On button release
            else if (value != truethy && context.pressedButtons[keyCode]) {
                context.pressedButtons[keyCode] = false
            }
        }

        // Get all gamepads
        let gamepads = navigator.getGamepads()

        // TODO: Add some sore of thingy to select what gamepad to use for what app
        if (gamepads[0]) {
            let gp = gamepads[0]

            // Loop through all buttons to get their state
            for (var i = 0; i < gp.buttons.length; i++) {
                let key = translateButton(i)

                // Ignore keys that we haven't bound
                if (key == -1) {
                    continue
                }

                // On button press
                if (gp.buttons[i].pressed && !this.pressedButtons[key]) {
                    console.debug(`Button ${i}(${key}) pressed on ${gp.id}`);

                    sendKeyEvent(key, this)

                    this.pressedButtons[key] = true
                }

                // On button release
                else if (!gp.buttons[i].pressed && this.pressedButtons[key]) {
                    this.pressedButtons[key] = false
                }
            }

            // Check left, up and down keys
            checkAxis(-1, gp.axes[0], 65, this)
            checkAxis(1, gp.axes[0], 68, this)
            checkAxis(-1, gp.axes[1], 32, this)
        }
    }

    update() {
        super.update();

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;

        this._pollGamepad()
    }
}
