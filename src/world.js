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

	createColliders() {
		// this.colliders.push(new Collider(0, 200, 100, 100));
		this.colliders.push(new Collider(0, 140, 100, 860, this));
		this.colliders.push(new Collider(1050, 140, 100, 500, this));
		this.colliders.push(new Collider(1550, 180, 100, 200, this));

		for (const colliderObject of this.colliders) {
			this.context.stage.addChild(colliderObject.rectangle);
		}
	}

	willCollide(sprite) {
		var collidables = [];
		for (const coll of this.colliders) {
			collidables.push(coll.rectangle)
		}

		// todo, do something later
		/*for (const entity of this.entities) {
			if (entity.sprite && !(entity instanceof Player)) {
				collidables.push(entity.sprite)
			}
		}*/

		return this.bump.hit(sprite, collidables, true, false, false)
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
