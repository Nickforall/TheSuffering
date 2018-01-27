// All key combinations
var mappings = [
	{
		"name": "wasd",
		"type": "keyboard",
		"keys": {
			"LEFT": 65,
			"RIGHT": 68,
			"JUMP": 32,
			"JUMP": 87,
			"ATTACK": 69
		}
	},
	{
		"name": "arrows",
		"type": "keyboard",
		"keys": {
			"LEFT": 37,
			"RIGHT": 39,
			"JUMP": 38,
			"ATTACK": 16
		}
	},
	{
		"name": "numpad",
		"type": "keyboard",
		"keys": {
			"LEFT": 100,
			"RIGHT": 102,
			"JUMP": 104,
			"ATTACK": 101
		}
	},
	{
		"name": "SNES controler",
		"type": "gamepad",
		"id": "0079-0011-USB Gamepad ",
		"axes": [
			{
				"LEFT": -1,
				"RIGHT": 1
			},
			{
				"JUMP": -1
			}
		],
		"buttons": {
			"ATTACK": 1,
			"JUMP": 2
		}
	}
];

/**
 * Set the input profiles for both apps
 */
export default function startControlerConfig() {
	/**
	 * Set the profile for an app
	 * @param {Object} mapping The object from the mappings array
	 */
	function setProfile(mapping) {
		// Assume that everything goes right
		target.inputProfile = mapping;
		document.getElementById("overlay").children[targetIndex].className = "idle";

		// When the first user input is picked
		if (targetIndex == 0) {
			// Set the waiting text
			document.getElementById("overlay").children[targetIndex].innerHTML = `Using ${mapping.name}, pls wait for player 2`;

			// Go to the bottom app
			targetIndex++;
			target = BAPP;

			// Set the display of the bottom app
			document.getElementById("overlay").children[targetIndex].className = "waiting";
			document.getElementById("overlay").children[targetIndex].innerHTML = "Press any key";
		}
		// When the second user picks a input
		else if (targetIndex == 1) {
			// We can't have 2 oof the same controls
			if (TAPP.inputProfile.name == mapping.name) {
				document.getElementById("overlay").children[targetIndex].innerHTML = "Can't use the same as player 1, use any other key";
				document.getElementById("overlay").children[targetIndex].className = "waiting";

				target.inputProfile = false;
				return;
			}

			// Close the overlay
			document.getElementById("overlay").style.display = "none";

			// Remove the listeners
			window.removeEventListener("keydown", keyboardListener);
			window.removeEventListener("gamepadconnected", gamepadListener);
		}
	}

	/**
	 * A listener function for the keydown event
	 * @param  {Object} event The event object
	 */
	function keyboardListener(event) {
		for (let mapping of mappings) {
			// Ignore the gamepads
			if (mapping.type != "keyboard") continue;

			for (let command in mapping.keys) {
				if (!mapping.keys.hasOwnProperty(command)) continue;

				// If the key matches, we have a profile
				if (mapping.keys[command] == event.keyCode) {
					return setProfile(mapping);
				}
			}
		}
	}

	/**
	 * Listener for new gamepads
	 * @param  {Object} event The event object

	 */
	function gamepadListener(event) {
		for (let mapping of mappings) {
			// Ignore the keyboards
			if (mapping.type != "gamepad") continue;

			// Match by known ID
			if (mapping.id == event.gamepad.id) {
				let map = mapping;
				map.index = event.gamepad.index;

				return setProfile(map);
			}
		}
	}

	// Init targets
	var target = TAPP;
	var targetIndex = 0;

	// Set the first app as waiting
	document.getElementById("overlay").children[targetIndex].className = "waiting";

	// Start listening
	window.addEventListener("keydown", keyboardListener);
	window.addEventListener("gamepadconnected", gamepadListener);
}
