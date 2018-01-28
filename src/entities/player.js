import GameObject from "../gameobject";
import Gun from "../equipment/gun";
import Vector2D from "../utils/vector2d";
import Enemy from "./enemy";
import xpbar from "../ui/xpbar"
import Buff from "../equipment/buff";
import Debuff from "../equipment/debuff"

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

        //some definitions
        this.punching = false;
        this.playerOrientation = "right";
        this.jumped = false;
        this.shooting = false;
        this.lastPlayerY;
        this.currentPlayerY;

        // create container
        let container = window.spriteUtils.group();
        // make container global
        this.container = container;
        this.container.x = x;
        this.container.y = y;

        this.gun = new Gun(this);

        //Player sprite and startanimation
        let playerTextures = window.spriteUtils.frameSeries(0, 47, "player ", ".ase");

        this.sprite = window.spriteUtils.sprite(playerTextures);
        this.sprite.show(12);
        this.sprite.fps = 12;

        this.sprite.scale.set(3, 3);
        this.sprite.playAnimation([0, 3]);

        this.container.vy = y;
        this.container.vx = x;

        //uncomment fills to see colliders (in case of dev emergency)
        this.hitbox = new PIXI.Graphics();
        // this.hitbox.beginFill(?0xff0000);
        this.hitbox.drawRect(0, 0, 86, 128);
        // this.hitbox.endFill();
        this.hitbox.x = this.sprite.x;
        this.hitbox.y = this.sprite.y;
        this.hitbox.pivot.set(-36 , -86);

        this.container.addChild(this.sprite);

        this.attackhitbox = new PIXI.Graphics();
        //this.attackhitbox.beginFill(0xff0000);
        this.attackhitbox.drawRect(0, 0, 148, 128);
        //this.attackhitbox.endFill();
        this.attackhitbox.x = this.sprite.x;
        this.attackhitbox.y = this.sprite.y;
        this.attackhitbox.pivot.set(-36 , -86);

        this.world.context.stage.addChild(this.attackhitbox);

        this.world.context.stage.addChild(this.hitbox);
        this.world.context.stage.addChild(this.container);

        this.pressedButtons = {};
        this.app = world.context;

        this.isBeingDamaged = false;
        this.heartsShown = 3;
        this.lives = 3;
        //adding value to player
        this.experience;

        //this method is to check if player has buff
        this.holdBuff;

        //this method is to check if player has debuff
        this.holdDebuff;

        //making instances of xpdrawer
        this.xpBar = new xpbar(this);

        //making buff instance
        this.buff = new Buff(this);

        //making debuff instance
        this.debuff = new Debuff(this);

        //Jump shizz
        // setTimeout(() => {
        //     if(this.container.y === this.lastPlayerY){
        //         this.jumped = false;
        //     }
        //     this.lastPlayerY = this.container.y;
        //     console.log("last: " + this.lastPlayerY + " Current: " + this.container.y);
        // }, 2000);

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
        this.shooting = false;

        switch (code) {
            case "LEFT":
                if (this.pressedButtons.LEFT !== true) {
                    this.sprite.playAnimation([16, 23]);
                }

                this.pressedButtons.LEFT = true;
                this.playerOrientation = "left";

                this.attackhitbox.pivot.set(44, -86);
                break;
            case "RIGHT":
                if (this.pressedButtons.RIGHT !== true) {
                    this.sprite.playAnimation([8, 15]);
                }

                this.pressedButtons.RIGHT = true;
                this.playerOrientation = "right";

                this.attackhitbox.pivot.set(-36 , -86);

                break;
            case "JUMP":
                if (this.pressedButtons.JUMP !== true) {
                    this.pressedButtons.JUMP = true;
                    this._jump();
                }
                break;
            case "ATTACK":
                this.pressedButtons.ATTACK = true;
                if(this.gotGun){
                    // Shoot
                    this.gun.spawnBullet();
                    this._shoot();
                }else{
                    // melee
                    this._attack();
                    this.sprite.playAnimation([4, 7]);
                }
                break;
            case "BUFF":
                this.buff.gotBuff();
                console.log("BUFF");
                break;
            case "DEBUFF":
                this.debuff.gotDebuff();
                console.log("DEBUFF");
                break;
        }
    }

    _jump() {
        if(this.jumped === false){
            this.jumped = true;
            this.container.vy = -20;
            if (this.pressedButtons.JUMP) {
                if (this.playerOrientation === "right") {
                    this.sprite.show(32);
                } else if (this.playerOrientation === "left") {
                    this.sprite.show(35);
                }
            }
        }    
    }

    _attack() {
        if (this.punching === false) {
            this.punching = true;
            this.container.vx = 0;

            let attackedEntity = this.world.getCollidedEntites(this.attackhitbox);
            if (attackedEntity instanceof Enemy) {
                console.log(attackedEntity)
                attackedEntity.damage(100)
            }

            if (this.playerOrientation === "right") {
                this.sprite.playAnimation([4, 7]);
                setTimeout(() => {
                    // player.playAnimation([0, 3]);
                    if (this.container.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.container.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                    this.punching = false;
                }, 400);
            } else if (this.playerOrientation === "left") {
                this.sprite.playAnimation([24, 27]);
                setTimeout(() => {
                    // player.playAnimation([28, 31]);
                    if (this.container.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.container.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        playerOrientation = "right";
                    } else if (this.container.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                    this.punching = false;
                }, 400);
            }
        }
    }

    _shoot() {
        if (this.shooting === false) {
            this.shooting = true;
            this.container.vx = 0;

            let attackedEntity = this.world.getCollidedEntites(this.attackhitbox);
            if (attackedEntity instanceof Enemy) {
                console.log(attackedEntity)
                attackedEntity.damage(100)
            }

            if (this.playerOrientation === "right") {
                this.sprite.playAnimation([38, 42]);
                setTimeout(() => {
                    this.shooting = false;
                    if (this.container.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.container.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                }, 400);
            } else if (this.playerOrientation === "left") {
                this.sprite.playAnimation([43, 47]);
                setTimeout(() => {
                    // player.playAnimation([28, 31]);
                    if (this.container.vx > 0) {
                        this.sprite.playAnimation([8, 15]);
                        this.playerOrientation = "right";
                    } else if (this.container.vx < 0) {
                        this.sprite.playAnimation([16, 23]);
                        this.playerOrientation = "left";
                    } else if (this.container.vx === 0 && this.playerOrientation == "right") {
                        this.sprite.playAnimation([0, 3]);
                        playerOrientation = "right";
                    } else if (this.container.vx === 0 && this.playerOrientation == "left") {
                        this.sprite.playAnimation([28, 31]);
                        this.playerOrientation = "left";
                    };
                    this.shooting = false;
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
                if (!this.pressedButtons.RIGHT && this.punching === false) {
                    this.sprite.playAnimation([28, 31]);
                    this.playerOrientation = "left";
                }
                break;
            case "RIGHT":
                this.pressedButtons.RIGHT = false;
                if (!this.pressedButtons.LEFT && this.punching === false) {
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
                // console.log(this.pressedButtons);
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
        if (!this.app.ready) return

        // super.update();
        let collision = this.world.willCollide(this.container);

        if (collision == "left" && this.pressedButtons.LEFT) {
            this.sprite.playAnimation([28, 31]);
            this.playerOrientation = "left";
        }
        else if (collision == "right" && this.pressedButtons.RIGHT) {
            this.sprite.playAnimation([0, 3]);
            this.playerOrientation = "right";
        }

        let entityCollision = this.world.getCollidedEntites(this.hitbox)
        if (entityCollision !== null) {
            if(entityCollision instanceof Enemy) {
                setTimeout(() => {
                    this.isBeingDamaged = false;
                }, 2000);

                if (entityCollision.alive && !this.isBeingDamaged) {
                    this.isBeingDamaged = true;
                    this._damage();
                }
            }
        }

        if (this.container.vy < 10) {
            this.container.vy += 1;
        }

        if (this.pressedButtons["LEFT"]) {
            this.container.vx = -8;
        }
        if (this.pressedButtons["RIGHT"]) {
            this.container.vx = 8;
        }

        // check player position (testing)
        // console.log("player X:" + this.sprite.position.x + " Y:" + this.sprite.position.y);

        // check if player is under map
        if (this.container.position.y > 600) {
            // let currentvy = this.container.vy;wd
            let currentvx = this.container.position.x;

            this.container.position.y = 0;
            this.container.position.x = (currentvx - 200);
        }

        if (this.heartsShown != this.lives) {
            let id = ""

            if (this.world.isTop()) {
                id = "heartsTop"
            }
            else if (this.world.isBottom()) {
                id = "heartsBottom"
            }

            let hearts = document.getElementById(id).children

            for (var i = hearts.length - 1; i >= 0; i--) {
                if (i + 1 > this.lives) {
                    hearts[hearts.length - i - 1].className = "gone"
                }
                else {
                    hearts[hearts.length - i - 1].className = ""
                }

                // console.log(hearts[i])
            }

            // console.log(this.world.isTop())

            this.heartsShown = this.lives
        }


        this.container.y += this.container.vy;
        this.container.x += this.container.vx;

        this.hitbox.y = this.container.y - 64;
        this.hitbox.x = this.container.x;

        this.attackhitbox.y = this.container.y - 64;
        this.attackhitbox.x = this.container.x;

        this.currentPlayerY = this.container.y;
        // console.log(this.currentPlayerY, this.lastPlayerY);
        if(this.currentPlayerY === this.lastPlayerY ){
            if(this.currentPlayerY > -30){
                console.log(this.currentPlayerY);
                this.jumped = false;
            }
        };

        console.log(this.jumped);

        this.world.context.stage.position.x = this.world.context.view.width / 2;
        this.world.context.stage.position.y = this.world.context.view.height / 2;

        if (this.container.x < this.world.context.view.width / 2) {
            this.world.context.stage.pivot.x = this.world.context.view.width / 2;
        } else {
            this.world.context.stage.pivot.x = this.container.x;
        }
        this.world.context.stage.position.y = this.world.context.view.height / 6;

        this.container.vx = 0;

        this._pollGamepad();

        this.lastPlayerY = this.container.y;
        
    }
}
