import World from './world';
import startControlerConfig from './controlerConfig'
import Bump from "./utils/bump";

import './styles/index.scss';

// This is called when the window is ready loading
window.addEventListener("DOMContentLoaded", () => {
	window.spriteUtils = new SpriteUtilities(PIXI);
	window.bump = new Bump(PIXI);
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST
	/**
	 * Start a new application context
	 * @param  {String} context The name of the global to store the new application in
	 */
	function initApp(context) {
		// add stuff to the global scope (APP can now be accessed from anywhere)
		window[context] = new PIXI.Application(window.innerWidth, window.innerHeight / 2, {
			backgroundColor: 0xFF0000,
			forceCanvas: true
		});

		// Let the context resize
		window[context].renderer.autoResize = true;
		window[context].pos = context;

		window[context].world = new World(window[context]);
		window[context].inputProfile = false;
		window[context].ready = false;

		// Add it to the DOM
		document.body.appendChild(window[context].view);

		// Start game loop bound to the app
		window.requestAnimationFrame(window[context].world.render.bind(window[context]));
	}

	PIXI.loader
		.add("test", "resources/physicstest.png")
		.add("../resources/level.png")
		.add("bullet", "resources/bullet.png")
		.add("../resources/player.json")
		.add("../resources/slime.json")
		.add("../resources/kingslime.json")
		.on("progress", (loader) => {
			document.getElementById("loaderProg").value = loader.progress
		})
		.load(() => {
			// Start both the top and the bottom app
			initApp("TAPP")
			initApp("BAPP")

			console.debug("2 applications loaded");

			// Ask the players what inputs to use
			startControlerConfig()

			setTimeout(() => {
				document.getElementById("loader").style.opacity = 0
				setTimeout(() => {
					document.getElementById("loader").style.display = "none"
				}, 200);
			}, 400);
		});

	document.getElementById("loader").style.backgroundImage = 'url("resources/loadWater.png")'
});
