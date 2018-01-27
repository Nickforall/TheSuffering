import World from './world';

// This is called when the window is ready loading
window.addEventListener("DOMContentLoaded", () => {
	/**
	 * Start a new application context
	 * @param  {String} context The name of the global to store the new application in
	 */
	function initApp(context) {
		// add stuff to the global scope (APP can now be accessed from anywhere)
		window[context] = new PIXI.Application(window.innerWidth, window.innerHeight / 2, {
			backgroundColor: 0x000000,
			forceCanvas: true
		});

		// Let the context resize
		window[context].renderer.autoResize = true;

		window[context].world = new World(window[context]);

		// Add it to the DOM
		document.body.appendChild(window[context].view);

		// Start game loop bound to the app
		window.requestAnimationFrame(window[context].world.render.bind(window[context]));
	}

	PIXI.loader
		.add("person", "resources/in.png")
		.add("test", "resources/physicstest.png")		
		.load(() => {
			// Start both the top and the bottom app
			initApp("TAPP")
			initApp("BAPP")
		});

	console.debug("2 applications loaded");
});
