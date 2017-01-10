angular.module('mainApp')
	.constant('keyCodes', keyCodes);

function keyCodes() {
    return {
		 esc: 27,
		 space: 32,
		 enter: 13,
		 tab: 9,
		 backspace: 8,
		 shift: 16,
		 ctrl: 17,
		 alt: 18,
		 capslock: 20,
		 numlock: 144
 };
}
