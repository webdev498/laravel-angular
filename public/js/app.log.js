// // Declare app level module which depends on views, and components
angular.module('mainApp')
	.config(setloglevel);
	setloglevel.$inject = ['$logProvider', 'logLevel'];
function setloglevel($logProvider, logLevel) {
	$logProvider.debugEnabled(true);
}
