angular.module('mainApp')
	.factory('Alert', Alert);

Alert.$inject = ['$timeout', '$rootScope'];

function Alert($timeout, $rootScope) {
	var alertTimeout;
	var service = {
		showAlert: function (type, title, message, scope, timeout) {
			$rootScope.alert = {
				hasBeenShown: true,
				show: true,
				type: type,
				scope: scope||'global',
				message: message,
				title: title
			};
			$timeout.cancel(alertTimeout);
			alertTimeout = $timeout(function () {
				$rootScope.alert.show = false;
			}, timeout || 5000);
		}
	};
	return service;
}
