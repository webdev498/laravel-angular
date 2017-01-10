// bootstrap element
function onGoogleReady() {
	angular.bootstrap(document.getElementById("map"), ['mainApp.map']);
}

//dependencies
angular.module('mainApp.map', [
  'ui.map',
  'ui.event'
]);
