function render() {
	// This is the game loop, and is executed every frame.
	window.requestAnimationFrame(render);

	// make pixy rerender
	RENDERER.render();
}

// This is called when the window is ready loading
window.addEventListener('DOMContentLoaded', () => {
	// add stuff to the global scope (RENDERER can now be accessed from anywhere)
	window.RENDERER = new PIXI.Application(800, 600, {
		backgroundColor : 0x111111
	});

	// add canvas to document
	document.body.appendChild(RENDERER.view);

	console.log(' > We loaded!');

	// start game loop
	window.requestAnimationFrame(render);	
});
