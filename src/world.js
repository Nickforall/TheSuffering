import GameObject from "./gameobject";
import Player from "./entities/player";

export default class World {
	constructor(context) {
		this.context = context;
		this.entities = [];
		this.gravity = 1;

		this.addEntity(new Player(this, 0, 0))

		// Listen for new gamepads
		window.addEventListener("gamepadconnected", function(event) {
            console.info(`New gamepad connected: ${event.gamepad.id}`);
        });
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
