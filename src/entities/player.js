import GameObject from "../gameobject";
import Gun from "../equipment/gun";
import Vector2D from "../utils/vector2d";
<<<<<<< HEAD
import Enemy from "./enemy";
=======
import xpbar from "../../ui/xpbar";
>>>>>>> 579c3078a5a7f9b99ec94cd3b124eadb4c76c2bd

//some definitions
let punching = false;
let playerOrientation = "right";
let jumped = false;

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
            window.addEventListener(name, function (event) {
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

        this.sprite = window.spriteUtils.sprite(playerTextures);
        this.sprite.show(12);
        this.sprite.fps = 8;

        this.sprite.scale.set(3, 3);
        this.sprite.playAnimation([0, 3]);

        this.sprite.vy = y;
        this.sprite.vx = x;

        this.world.context.stage.addChild(this.sprite);

        this.pressedButtons = {};
        this.app = world.context;

<<<<<<< HEAD
        this.isBeingDamaged = false;
        this.lives = 3;
=======
        //adding value to player
        this.experience;

        //making instances of xpdrawer
        this.xpBar = new xpbar(this);
>>>>>>> 579c3078a5a7f9b99ec94cd3b124eadb4c76c2bd

        // Listen to the keydown event and call the handler if it's a bound one
        addListener("keydown", this._handleDown, this)
        addListener("keyup", this._handleUp, this)

        // this.addCollisionHandler(this.testCollision.bind(this));
    }

    /**
     * Handle a key/button down event
     * @param  {String} code Uppercase action command
     */
    _handleDown(code) {
        this.punching = false;

        switch (code) {
            case "LEFT":
                if (this.pressedButtons.LEFT !== true) {
                    this.sprite.playAnimation([16, 23]);
                }

                this.pressedButtons.LEFT = true;
                this.playerOrientation = "left";
                break;
            case "RIGHT":
                if (this.pressedButtons.RIGHT !== true) {
                    this.sprite.playAnimation([8, 15]);
                }

                this.pressedButtons.RIGHT = true;
                this.playerOrientation = "right";
                break;
            case "JUMP":
                if (this.pressedButtons.JUMP !== true) {
                    this.pressedButtons.JUMP = true;
                    this._jump();
                }
                break;
            case "ATTACK":
                this.pressedButtons.ATTACK = true;
                this.sprite.playAnimation([4, 7]);
                // this.gun.spawnBullet();
                this._attack();

                break;
            case "BUFF":
                console.log("BUFF");
                break;
            case "DEBUFF":
                console.log("DEBUFF");
                break;
        }
    }

    _jump() {
        this.sprite.vy = -20;
        // this.jumped = true;
        if (this.pressedButtons.JUMP) {
            if (this.playerOrientation === "right") {
                this.sprite.show(32);
            } else if (this.playerOrientation === "left") {
                this.sprite.show(35);
            }
        }
    }

    _attack() {
        if (this.punching === false) {
            this.punching = true;
            this.sprite.vx = 0;
            if (this.playerOrientation === "right") {
                this.sprite.playAnimation([4, 7]);
                setTimeout(() => {
                    // player.playAnimation([0, 3]);
                    if (this.sprite.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.sprite.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.sprite.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        this.playerOrientation = "right";
                    } else if (this.sprite.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                    this.punching = false;
                }, 400);
            } else if (this.playerOrientation === "left") {
                this.sprite.playAnimation([24, 27]);
                setTimeout(() => {
                    // player.playAnimation([28, 31]);
                    if (this.sprite.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.sprite.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.sprite.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        playerOrientation = "right";
                    } else if (this.sprite.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                    this.punching = false;
                }, 400);
            }
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
                if (!this.pressedButtons.RIGHT && punching === false) {
                    this.sprite.playAnimation([28, 31]);
                    this.playerOrientation = "left";
                }
                break;
            case "RIGHT":
                this.pressedButtons.RIGHT = false;
                if (!this.pressedButtons.LEFT && punching === false) {
                    this.sprite.playAnimation([0, 3]);
                    this.playerOrientation = "right";
                }
                break;
            case "JUMP":
                this.pressedButtons.JUMP = false;
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

    _damage() {
        this.lives -= 1;

        if (this.lives <= 0) {
            // game over

            this.sprite.scale.x = 0;
            this.sprite.scale.y = 0;
        }
    }

    update() {
        // super.update();
        let collision = this.world.willCollide(this.sprite);

        if (collision == "left" && this.pressedButtons.LEFT) {
            this.sprite.playAnimation([28, 31]);
            this.playerOrientation = "left";
        }
        else if (collision == "right" && this.pressedButtons.RIGHT) {
            this.sprite.playAnimation([0, 3]);
            this.playerOrientation = "right";
        }

<<<<<<< HEAD
        let entityCollision = this.world.getCollidedEntites(this.sprite)
        if (entityCollision !== null) {
            if(entityCollision instanceof Enemy && !this.isBeingDamaged) {
                this.isBeingDamaged = true;

                setTimeout(() => {
                    this.isBeingDamaged = false;
                }, 2000);

                this._damage();
            }
        }
=======
>>>>>>> 579c3078a5a7f9b99ec94cd3b124eadb4c76c2bd

        if (this.sprite.vy < 10) {
            this.sprite.vy += 1;
        }

        if (this.pressedButtons["LEFT"]) {
            this.sprite.vx = -5;
        }
        if (this.pressedButtons["RIGHT"]) {
            this.sprite.vx = 5;
        }

        // check player position (testing)
        // console.log("player X:" + this.sprite.position.x + " Y:" + this.sprite.position.y);

        // check if player is under map
        if (this.sprite.position.y > 600) {
            // let currentvy = this.sprite.vy;wd
            let currentvx = this.sprite.position.x;

            this.sprite.position.y = 0;
            this.sprite.position.x = (currentvx - 200);
        }

        // if(this.jumped === true){
        //     if(this.sprite.vy >= 0){
        //         if(this.playerOrientation === "right"){
        //             this.sprite.show(33);
        //         } else if (this.playerOrientation === "left") {
        //             this.sprite.show(36);
        //         }
        //     }
        //     this.jumped = false

        //     console.log(this.jumped);

        // }


        this.sprite.y += this.sprite.vy;
        this.sprite.x += this.sprite.vx;

        this.world.context.stage.position.x = this.world.context.view.width / 2;
        this.world.context.stage.position.y = this.world.context.view.height / 2;

        this.world.context.stage.pivot.x = this.sprite.x;
        this.world.context.stage.position.y = this.world.context.view.height / 6;

        this.sprite.vx = 0;

        this._pollGamepad();
    }
}
