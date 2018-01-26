const world = require("./world.js");

// This is called when the window is ready loading
window.addEventListener("DOMContentLoaded", () => {
	/**
	 * Start a new application context
	 * @param  {String} global The name of the global to store the new application in
	 */
	function initApp(global) {
		// add stuff to the global scope (APP can now be accessed from anywhere)
		window[global] = new PIXI.Application(window.innerWidth, window.innerHeight / 2, {
			backgroundColor: global,
			forceCanvas: true
		});

		// Let the context resize
		window[global].renderer.autoResize = true;

		window[global].world = new world()

		// Add it to the DOM
		document.body.appendChild(window[global].view);

		// Start game loop bound to the app
		window.requestAnimationFrame(window[global].world.render.bind(window[global]));
	}

	PIXI.loader
		.add("person", "recources/in.png")
		.load(() => {
			// Start both the top and the bottom app
			initApp("TAPP")
			initApp("BAPP")

			let person = new PIXI.Sprite(
				PIXI.loader.resources["person"].texture
			);

			TAPP.stage.addChild(person);
		});

	console.debug("2 applications loaded");
});
