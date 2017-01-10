angular.module('mainApp')
	.controller('AppController', AppController);

// inject the Task service into our controller
AppController.$inject = ['$rootScope', '$log', 'User'];

/**
 * Main app controller for entire app
 * @param {[type]} $rootScope [description]
 * @param {[type]} $log       [description]
 * @param {[type]} User       [description]
 */
function AppController($rootScope, $log, User) {
	var appCtrl = this;
	appCtrl.visible=false;

	//crazy toggle idea, show webpage, and on click, show otherwise
	function itemClick(){
		appCtrl.visible=!appCtrl.visible;
		$log.debug("[AppController]: toggling entire view");
	}
}
