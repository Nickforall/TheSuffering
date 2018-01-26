class World {
	constructor() {

	}

	/**
	 * Render a frame of the world
	 */
	render() {
		// Request the next frame
		window.requestAnimationFrame(this.world.render.bind(this));

		// Make pixy rerender
		this.render();
	}
}

// Expose the World class
module.exports = World
