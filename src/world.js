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

		this.addEntity(new Player(this, 0, 0))
		this.addEntity(new Enemy(this, 300, 500))

		this.createColliders();

		// Listen for new gamepads
		window.addEventListener("gamepadconnected", function (event) {
			console.info(`New gamepad connected: ${event.gamepad.id}`);
		});
	}

	createColliders() {
		this.colliders.push(new Collider(0, 200, 100, 100));
		this.colliders.push(new Collider(100, 250, 100, 100));


		for (const colliderObject of this.colliders) {
			this.context.stage.addChild(colliderObject.rectangle);
		}
	}

	willCollide(predictedLocation) {
		for (const colliderObject of this.colliders) {
			if (this.bump.hit({ x: predictedLocation.x, y: predictedLocation.y }, colliderObject.rectangle)) {
				return colliderObject
			}
		}

		for (const entity of this.entities) {
			if (entity.sprite) {
				if (this.bump.hit({ x: predictedLocation.x, y: predictedLocation.y }, entity.sprite)) {
					return colliderObject
				}
			}
		}

		return null;
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
