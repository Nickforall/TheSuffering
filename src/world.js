import GameObject from "./gameobject";
import Player from "./entities/player";
import Enemy from "./entities/enemy";
import Collider from "./collider";
import Bump from "./utils/bump";

export default class World {
	constructor(context) {
		this.context = context;
		this.entities = [];
		this.colliders = [];
		this.gravity = 1;

		this.bump = new Bump();

		this.worldsprite = window.spriteUtils.sprite("../resources/level.png", 0, (this.context.view.height));
		this.worldsprite.anchor.set(0, 1);
		this.worldsprite.scale.set(3, 3);

		this.context.stage.addChild(this.worldsprite);
		
		this.player = new Player(this,0,0)

		this.addEntity(this.player)
		// Add Enemy enitities
		// this.addEntity(new Enemy(this, 300, 500))
		let x = (Math.floor(Math.random() * 1500) + 100);
		console.log("slime position: " + x);
		let speed = (Math.floor(Math.random() * 5) + 1);
		this.addEntity(new Enemy(this, x, -200, speed, 100))
		// for (var i = 0; i < 25; i++) {
		// 	let speed = (Math.floor(Math.random() * 5) + 1);
		// 	let x = (Math.floor(Math.random() * 1500) + 100);
		// 	this.addEntity(new Enemy(this, x, 0, speed))
		// }
	

		this.createColliders();

		// Listen for new gamepads
		window.addEventListener("gamepadconnected", function (event) {
			console.info(`New gamepad connected: ${event.gamepad.id}`);
		});
	}

	isTop() {
		return this.context.pos === "TAPP";
	}

	isBottom() {
		return this.context.pos === "BAPP";
	}

	//make a shit load of colliders
	createColliders() {
		//block the beginning
		this.colliders.push(new Collider(-100, 1000, 1200, 100, this));

		this.colliders.push(new Collider(0, 140, 100, 860, this));
		this.colliders.push(new Collider(1050, 140, 100, 500, this)); //190 water
		this.colliders.push(new Collider(1550, 180, 100, 550, this));
		this.colliders.push(new Collider(2300, 140, 100, 300, this)); //200 water
		this.colliders.push(new Collider(2600, 180, 100, 300, this));
		this.colliders.push(new Collider(2900, 230, 100, 550, this));
		this.colliders.push(new Collider(3650, 140, 100, 770, this)); //200 water
		this.colliders.push(new Collider(4420, 230, 100, 470, this));
		this.colliders.push(new Collider(4890, 180, 100, 300, this));
		this.colliders.push(new Collider(5190, 140, 100, 100, this));

		this.colliders.push(new Collider(5290, 140, 100, 850, this));
		this.colliders.push(new Collider(6330, 140, 100, 500, this)); //190 water
		this.colliders.push(new Collider(6830, 180, 100, 560, this));
		this.colliders.push(new Collider(7580, 140, 100, 300, this)); //190 water
		this.colliders.push(new Collider(7880, 180, 100, 300, this));
		this.colliders.push(new Collider(8180, 230, 100, 550, this));
		this.colliders.push(new Collider(8930, 140, 100, 770, this)); //200 water
		this.colliders.push(new Collider(9700, 230, 100, 470, this));
		this.colliders.push(new Collider(10170, 180, 100, 300, this));
		this.colliders.push(new Collider(10470, 140, 100, 100, this));

		this.colliders.push(new Collider(10570, 140, 100, 850, this));
		this.colliders.push(new Collider(11610, 140, 100, 500, this)); //190 water
		this.colliders.push(new Collider(12110, 180, 100, 560, this));
		this.colliders.push(new Collider(12860, 140, 100, 300, this)); //190 water
		this.colliders.push(new Collider(13160, 180, 100, 300, this));
		this.colliders.push(new Collider(13460, 230, 100, 550, this));
		this.colliders.push(new Collider(14210, 140, 100, 770, this)); //200 water
		this.colliders.push(new Collider(14980, 230, 100, 470, this));
		this.colliders.push(new Collider(15450, 180, 100, 300, this));
		this.colliders.push(new Collider(15750, 140, 100, 100, this));

		this.colliders.push(new Collider(15850, 140, 100, 850, this));
		this.colliders.push(new Collider(16890, 140, 100, 500, this)); //190 water
		this.colliders.push(new Collider(17390, 180, 100, 560, this));
		this.colliders.push(new Collider(18140, 140, 100, 300, this)); //190 water
		this.colliders.push(new Collider(18440, 180, 100, 300, this));
		this.colliders.push(new Collider(18740, 230, 100, 550, this));
		this.colliders.push(new Collider(19490, 140, 100, 770, this)); //200 water
		this.colliders.push(new Collider(20260, 230, 100, 470, this));
		this.colliders.push(new Collider(20730, 180, 100, 300, this));
		this.colliders.push(new Collider(21030, 140, 100, 100, this));

		this.colliders.push(new Collider(21130, 140, 100, 850, this));
		this.colliders.push(new Collider(22170, 140, 100, 500, this)); //190 water
		this.colliders.push(new Collider(22670, 180, 100, 560, this));
		this.colliders.push(new Collider(23420, 140, 100, 300, this)); //190 water
		this.colliders.push(new Collider(23720, 180, 100, 300, this));
		this.colliders.push(new Collider(24020, 230, 100, 550, this));
		this.colliders.push(new Collider(24770, 140, 100, 770, this)); //200 water
		this.colliders.push(new Collider(25540, 230, 100, 470, this));
		this.colliders.push(new Collider(26010, 180, 100, 300, this));
		this.colliders.push(new Collider(26310, 140, 100, 100, this));

		//end of 5x looping part, now boss plane
		this.colliders.push(new Collider(26410, 140, 100, 3580, this));

		//block the end
		this.colliders.push(new Collider(29990, 1000, 1200, 100, this));


		for (const colliderObject of this.colliders) {
			this.context.stage.addChild(colliderObject.rectangle);
		}
	}

	willCollide(sprite) {
		var collidables = [];
		for (const coll of this.colliders) {
			collidables.push(coll.rectangle)
		}

		return this.bump.hit(sprite, collidables, true, false, false);
	}

	getCollidedEntites(collidingSprite) {
		for (const entity of this.entities) {
			if (!(entity instanceof Player)) {
				var sprite;
				if(entity instanceof Enemy) {
					sprite = entity.container;
				}

				let collision = this.bump.hit(collidingSprite, sprite);

				if (collision) {
					return entity;
				} else {
					return null;
				}
			}
		}
	}

	getContext() {
		return this.context;
	}

	addEntity(entity) {
		if (!(entity instanceof GameObject)) {
			throw new Error('Entity to add is not a gameobject, so doesn\'t have physics to update');
		}

		this.entities.push(entity);
	}

	/**
	 * Render a frame of the world
	 */
	render() {
		// Request the next frame
		window.requestAnimationFrame(this.world.render.bind(this));

		// update every entity.
		for (const entity of this.world.entities) {
			try {
				entity.update();
			} catch (ex) {
				console.error('Error updating entity', ex);
			}
		}

		// Make pixy rerender
		this.render();
	}
}
