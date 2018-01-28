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

				document.getElementById("audioBackground").volume = 0.7
				document.getElementById("audioBackground").play()
				setTimeout(() => {
					document.getElementById("loader").style.display = "none"
				}, 200);
			}, 400);
		});

	document.getElementById("loader").style.backgroundImage = 'url("resources/loadWater.png")'
});

window.setWinner = function(winner, reason) {
	if (window.won === true) return
	window.won = true

	let winnerElement = document.getElementsByTagName("canvas")[0]
	let loserElement = document.getElementsByTagName("canvas")[1]

	if (winner == "BAPP") {
		winnerElement = document.getElementsByTagName("canvas")[1]
		loserElement = document.getElementsByTagName("canvas")[0]
	}

	let moveElem = Array.prototype.slice.call(document.getElementsByClassName("xpbar"))
	moveElem.push(document.getElementById("heartsTop"))
	moveElem.push(document.getElementById("heartsBottom"))

	for (var i = 0; i < moveElem.length; i++) {
		function saveI(i) {
			moveElem[i].style.top = "-30px"
		}

		moveElem[i].style.opacity = 0
		saveI(i)
	}

	document.getElementById("audioBackground").pause()

	setTimeout(() => {
		document.getElementById("audioLost").currentTime = 0
		document.getElementById("audioLost").play()
	}, 100)

	winnerElement.className = "prepair"
	loserElement.className = "prepair"

	setTimeout(function () {
		winnerElement.className = "win"
		loserElement.className = "lose"
	}, 500)

	setTimeout(function () {
		let first = "winTop"
		let last = "winBottom"

		if (winner == "BAPP") {
			document.getElementById("winTop").innerHTML = reason
			first = "winBottom"
			last = "winTop"
		}
		else {
			document.getElementById("winBottom").innerHTML = reason
		}

		document.getElementById(first).className = "win"
		document.getElementById(first).style.opacity = 1
		document.getElementById(first).style.transform = "translate(-50%, -50%) scale(1)"

		setTimeout(function () {
			document.getElementById(last).className = "lose"
			document.getElementById(last).style.opacity = 1
			document.getElementById(last).style.transform = "translate(-50%, -50%) scale(.8)"
		}, 1000)
	}, 2000)
}
