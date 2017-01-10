angular.module('mainApp')
	.run(runBlock);

runBlock.$inject = ['$rootScope', '$state', '$log', 'appStorage', 'User', 'loginModal'];

function runBlock($rootScope, $state, $log, appStorage, User, loginModal) {

	//at run time
  //override the default log level globally
  // $log.currentLevel = $log.LEVELS.info;
  // $log.debug($log.currentLevel);

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		// any public action is allowed
		var isPublicAction = angular.isObject(toState.data) && toState.data.isPublic === true;
		// token
		var token = appStorage.getData('token');
		var user = appStorage.getData('user');

		if (isPublicAction || token) {
			$log.debug("[appRun]: checking public routes/auth routes");
			return;
		}
		// stop state change
		$log.warn("[appRun]: stop route");
		event.preventDefault();
		// async load user
		if (token && user) {
				$log.debug("[appRun]: fukeri");
				// let's continue, use is allowed
				$state.go(toState, toParams);
				return;
		}else{
			loginModal()
        .then(function () {
					$log.debug("[appRun]: go next");
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
					$log.warn("[appRun]: probs");
          return $state.go('tasks');
        });
			return;
		}
	});
	$rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	});
}
