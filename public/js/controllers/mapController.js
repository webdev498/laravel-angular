angular.module('mainApp.map')
.controller('MapController', MapController);

// inject the Task service into our controller
MapController.$inject = ['$scope', '$rootScope', '$q', '$log'];

function MapController($scope, $rootScope, $q, $log) {
	var mapCtrl = this;

	mapCtrl.mapOptions = {
		center: new google.maps.LatLng(35.784, -78.670),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
}
