var Remote;

(function (s, p) {
	"use strict";

	/**
	 * Remote
	 * @constructor
	 */
	Remote = function () {
		var self = this;
		/** @type {ShortcutManager} */
		this.shortcutManager = ShortcutManager.create(this);

		document.onkeydown = function (evt) {
			self.shortcutManager.event(evt);
		};
	};

	// prototype shortcut
	p = Remote.prototype;

	/**
	 *
	 */
	p.init = function () {
		//todo dynamic
		this.audio = {
			Applause: /** @type {HTMLAudioElement} */ new Audio("sounds/applause.mp3"),
			Kazoo: /** @type {HTMLAudioElement} */ new Audio("sounds/kazoo.mp3"),
			Soda: /** @type {HTMLAudioElement} */ new Audio("sounds/soda.mp3")
		};

		registerShortcuts.call(this,
			{
				"left": this.audio.Applause,
				"enter": this.audio.Kazoo,
				"right": this.audio.Soda
			}
		);
	};

	/**
	 *
	 */
	p.destroy = function () {
		this.shortcutManager.destroy();
	};

	/**
	 * Register shortcuts
	 * @this {Remote}
	 * @param {Object} list
	 */
	function registerShortcuts(list) {
		for (var i = 0, keys = Object.keys(list), length = keys.length; i < length; i++) {
			var shortcut = keys[i],
				audio = list[keys[i]];

			registerShortcut.call(this, shortcut, audio);
		}
	}

	/**
	 * @this {Remote}
	 */
	function registerShortcut(shortcut, audio) {
		this.shortcutManager.on(shortcut, function () {
			play(audio);
		});
	}

	/**
	 * @param {HTMLAudioElement|Audio} audio
	 */
	function play(audio) {
		audio.play();
	}
}());