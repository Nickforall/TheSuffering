import GameObject from "../gameobject";
import Gun from "../equipment/gun";
import Vector2D from "../utils/vector2d";

export default class Player extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 1);

        /**
         * Add a listener to key events
         * @param {String}   name    The event name
         * @param {Function} func    The callback
         * @param {Object}   context The this object passed
         */
        function addListener(name, func, context) {
            window.addEventListener(name, function(event) {
                if (context.app.inputProfile.type != "keyboard") return;

                for (var command in context.app.inputProfile.keys) {
                    if (!context.app.inputProfile.keys.hasOwnProperty(command)) continue;

                    if (context.app.inputProfile.keys[command] == event.keyCode) {
                        func.bind(context)(command);
                    }
                }
            }.bind(context));
        }

        this.gun = new Gun(this);

        //Player sprite and startanimation

        let playerTextures = window.spriteUtils.frameSeries(0, 37, "player ", ".ase");

        let player = window.spriteUtils.sprite(playerTextures);
        player.show(12);
        player.fps = 8;

        player.scale.set(3, 3);
        player.playAnimation([0, 3]);
        this.world.context.stage.addChild(player);


        this.pressedButtons = {};
        this.app = world.context;

        // Listen to the keydown event and call the handler if it's a bound one
        addListener("keydown", this._handleDown, this)
        addListener("keyup", this._handleUp, this)

        this.addCollisionHandler(this.testCollision.bind(this));
    }

    testCollision() {
        console.log("We handled a collision");
    }

    /**
     * Handle a key/button down event
     * @param  {String} code Uppercase action command
     */
    _handleDown(code) {
        this.pressedButtons[code] = true;

        switch (code) {
            case "LEFT":
                this.pressedButtons.LEFT = true;
                break;
            case "RIGHT":
                this.pressedButtons.RIGHT = true;
                break;
            case "JUMP":
                this.applyForce(new Vector2D(0, -7));
                break;
            case "ATTACK":
                this.gun.spawnBullet();
                break;
        }
    }

    /**
     * Handle a key/button up event
     * @param  {String} code Uppercase action command
     */
    _handleUp(code) {
        switch (code) {
            case "LEFT":
                this.pressedButtons.LEFT = false;
                break;
            case "RIGHT":
                this.pressedButtons.RIGHT = false;
                break;
        }
    }

    _pollGamepad() {
        /**
         * Do a check on change of asis buttons
         * @param  {Int}  truethy If the value is this, the button is pressed
         * @param  {Int}  value   The current button state
         * @param  {Int}  command Command to send if pressed
         * @param  {Obj}  context Context of the class
         */
        function checkAxis(truethy, value, command, context) {
            // On button press
            if (value == truethy && !context.pressedButtons[command]) {
                context._handleDown(command);
            }

            // On button release
            else if (value != truethy && context.pressedButtons[command]) {
                context._handleUp(command);
            }
        }

        // If the active profile isn't a gamepad this does not need to be executed
        if (this.app.inputProfile.type != "gamepad") return

        // Get all gamepads
        let gamepads = navigator.getGamepads();

        // Only get the picked controler
            let gp = gamepads[0];

        // Loop through all buttons to get their state
        for (var i = 0; i < gp.buttons.length; i++) {
            let command = false;

            for (let _command in this.app.inputProfile.buttons) {
				if (!this.app.inputProfile.buttons.hasOwnProperty(_command)) continue;

                if (this.app.inputProfile.buttons[_command] == i) {
                    command = _command;
                }
            }

            // Ignore keys that we haven't bound
            if (!command) continue;

            // On button press
            if (gp.buttons[i].pressed && !this.pressedButtons[command]) {
                console.debug(`Button ${command} pressed on ${gp.id}`);
                console.log(this.pressedButtons);
                this._handleDown(command);
            }

            // On button release
            else if (!gp.buttons[i].pressed && this.pressedButtons[command]) {
                this.pressedButtons[command] = false;
                this._handleUp(command);
            }
        }

        // Check left, up and down keys
        checkAxis(-1, gp.axes[0], "LEFT", this);
        checkAxis(1, gp.axes[0], "RIGHT", this);
        checkAxis(-1, gp.axes[1], "JUMP", this);
    }

    update() {
        super.update();

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;

        if (this.pressedButtons["LEFT"]) {
            this.position.x -= 5;
        }
        if (this.pressedButtons["RIGHT"]) {
            this.position.x += 5;
        }

        this._pollGamepad();
    }
}
