angular.module('mainApp.user')
	.factory('User', User);

User.$inject = ['$q', '$rootScope', '$log', 'appStorage', 'Auth'];

function User($q, $rootScope, $log, appStorage, Auth) {

	var user = undefined;

	var service = {
		// async way how to load user from Server API
		getAuthObject: function () {
			var deferred = $q.defer();
			Auth.me()
				.success(function (data) {
					$log.debug("[userService]: user/me is here");
					user = {
						data: data.user,
						isAuthenticated: true
					};
					name = data.user.name;
					$log.debug(user);
					$log.debug(data.user);
					$log.debug("[userService]: user is ready");
					appStorage.setData('user', name);
					$rootScope.$broadcast('user:me',user);
					deferred.resolve(user);
				});
			// later we can use this quick way -
			// - once user is already loaded
			if (user) {
				$log.debug("[userService]: user is ready");
				appStorage.setData('user', name);
				$rootScope.$broadcast('user:me',user);
				return $q.when(user);
			}
			return deferred.promise;
		},

		// sync, quick way how to check IS authenticated...
		isAuthenticated: function () {
			$log.debug("[userService]: check if user is auth");
			return user !== undefined && user.isAuthenticated;
		}
	};
	return service;
}
