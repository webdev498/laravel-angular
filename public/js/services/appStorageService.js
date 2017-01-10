angular.module('mainApp')
	.factory('appStorage', appStorage);

appStorage.$inject = ['$q', '$window', '$rootScope'];

function appStorage($q, $window, $rootScope) {
	angular.element($window)
		.on('storage', function (event) {
			if (event.key === 'token') {
				$rootScope.$apply();
			}
		});

	var service = {
		setData: function (key, val) {
			$window.localStorage && $window.localStorage.setItem(key, val);
			return this;
		},
		getData: function (key) {
			return $window.localStorage && $window.localStorage.getItem(key);
		},
		deleteData: function (key) {
			return $window.localStorage && $window.localStorage.removeItem(key);
		}
	};
	return service;
}
