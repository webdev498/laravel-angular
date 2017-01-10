angular.module('mainApp.user')
	.factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$q', '$window', '$log', '$injector', 'Alert', 'appStorage'];

function authInterceptor($q, $window, $log, $injector, Alert, appStorage) {
	var service = {
		request: function (config) {
			config.headers = config.headers || {};
			var token = appStorage.getData('token');
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		responseError: function (rejection) {
			var $state = $injector.get('$state');
			var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
			angular.forEach(rejectionReasons, function(value, key) {
				if(rejection !== 'undefined' && rejection.data !== 'undefined' && rejection.data.error === value) {
					Alert.showAlert('danger', 'rejection.data.error', 'you need to be logged in to view this page!');
					localStorage.removeItem('user');
					$window.localStorage.removeItem('token');
					$state.go('tasks');
				}
			});
			if (rejection.status === 401 || rejection.status === 403 || rejection.status === 400) {
				Alert.showAlert('danger', 'Hmmm....', 'you need to be logged in to view this page!');
				$window.localStorage.removeItem('token');
				delete $window.localStorage;
			}
			return $q.reject(rejection);
		}
	};
	return service;
}
