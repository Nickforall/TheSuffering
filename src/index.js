function render() {
	// This is the game loop, and is executed every frame.
	window.requestAnimationFrame(render);

	// Make pixy rerender
	TAPP.render();
	BAPP.render();
}

// This is called when the window is ready loading
window.addEventListener("DOMContentLoaded", () => {
	/**
	 * Start a new application context
	 * @param  {String} global The name of the global to store the new application in
	 */
	function initApp(global) {
		// add stuff to the global scope (APP can now be accessed from anywhere)
		window[global] = new PIXI.Application(window.innerWidth, window.innerHeight / 2, {
			backgroundColor: 0x111111,
			forceCanvas: true
		});

		// Let the context resize
		window[global].renderer.autoResize = true;

		// Add it to the DOM
		document.body.appendChild(window[global].view);
	}

	// Start both the top and the bottom app
	initApp("TAPP")
	initApp("BAPP")

	console.debug("2 applications loaded");

	// Start game loop
	window.requestAnimationFrame(render);
});
