angular.module('mainApp.user')
	.controller('UserAuthController', UserAuthController);

UserAuthController.$inject = ['$state', '$q', '$window', '$location', '$log', '$scope','$rootScope', 'Auth', 'User', 'appStorage', 'Alert', 'loginModal', 'url'];

function UserAuthController($state, $q, $window, $location, $log, $scope,$rootScope, Auth, User, appStorage, Alert, loginModal, url) {
	var userCtrl = this;
	userCtrl.signin = signin;
	userCtrl.register = register;
	userCtrl.logout = logout;
	userCtrl.open = open;
	userCtrl.userLoggedIn = userLoggedIn;
	userCtrl.cancel = $scope.$dismiss;
	$rootScope.isLoggedIn = false;
	userCtrl.login={
		fb : url.BASE_API + '/auth/with/facebook'
	};

	// loading variable
	userCtrl.loading = true;

	if ( $location.search()) {
			var attempt = {};
			var search = $location.search();
			for (var key in search) {
				attempt[key] = search[key];
				$location.search(key, null);
			}
			if ( attempt.first_name && attempt.last_name ) {
				attempt.name = attempt.first_name + ' ' + attempt.last_name;
			}

			if(attempt && attempt.token) {
				//set token. get current user;
				appStorage.setData('token',attempt.token);
				getMe()
				.then(function (value) {
					userLoggedIn()
					.then(function () {
						userCtrl.loading = false;
						Alert.showAlert('success', '', 'Welcome!');
						$state.go('tasks');
					});
				});
			}
			else if(attempt && attempt.provider==='facebook'){
				console.log(attempt);
				var word=makeid();
				var formData = {
					name: attempt.name,
					email: attempt.email,
					password: word,
					password_confirmation: word,
					provider: attempt.provider,
					provider_id: attempt.provider_id,
					provider_token: attempt.provider_token
				};
				console.log(formData);

				Auth.register(formData, function (res) {
					appStorage.setData('token',res.token);
					getMe()
					.then(function (value) {
						userLoggedIn()
						.then(function () {
							userCtrl.loading = false;
							Alert.showAlert('success', '', 'Welcome!');
							$state.go('tasks');
						});
					});
				}, function() {
					Alert.showAlert('danger', 'Signup', 'Failed to signup', 'local');
				});
			}
		}

	function userLoggedIn() {
		userCtrl.loading = true;
		var token = appStorage.getData('token');
		var user = appStorage.getData('user');

		$log.debug("[userAuthController]: verify user state");
		var deferred = $q.defer();

		if(token && user){
			userCtrl.me = {'name':user};
			getMe();
			$rootScope.isLoggedIn = true;

			$log.debug("[userAuthController]: user and token are present");
			deferred.resolve(true);
		}else{
			$rootScope.isLoggedIn = false;
			deferred.reject(false);
		}
		userCtrl.loading = false;
		return deferred.promise;
	}

	 function open() {
		 loginModal()
			 .then(function () {
				 $log.debug("[UserAuthController]: go next");
			 })
			 .catch(function () {
				 $log.warn("[UserAuthController]: probs");
				 return $state.go('tasks');
			 });
	 }
	 function signin() {
		userCtrl.loading = true;
		var formData = {
			email: userCtrl.email,
			password: userCtrl.password
		};

		Auth.signin(formData)
			.then(function (res) {
				getMe()
				.then(function (value) {
					userLoggedIn()
					.then(function () {
						userCtrl.loading = false;
						$scope.$close(userCtrl.me);
						Alert.showAlert('success', '', 'Welcome!'.userCtrl.me.name);
						$state.go('tasks');
					});
				});
			}, function () {
				console.log("bozo");
				Alert.showAlert('danger', 'Hmmm....', 'you must have entered wrong credentials!', 'local');
			});
	}

	 function register() {
		var formData = {
			name: userCtrl.name,
			email: userCtrl.email,
			password: userCtrl.password,
			password_confirmation: userCtrl.password_confirmation
		};

		Auth.register(formData, function (data) {
			appStorage.setData('token',data.token);
			getMe()
			.then(function (value) {
				userLoggedIn()
				.then(function () {
					userCtrl.loading = false;
					// $scope.$close(userCtrl.me);
					Alert.showAlert('success', '', 'Welcome!');
					$state.go('tasks');
				});
			});
		}, function() {
			Alert.showAlert('danger', 'Signup', 'Failed to signup', 'local');
		});


	}

	 function logout() {
		$log.error("loggging out");
			Auth.logout(function (res) {
				userCtrl.me = false;
		});
		$state.go('home');
		userLoggedIn();
	}
	function getMe() {
		 userCtrl.loading = true;

		 $log.debug("[userAuthController]: retrieve and save to storage current user");
		 var deferred = $q.defer();

		 User.getAuthObject()
		 .then(function (user) {
			 var isAuthenticated = user.isAuthenticated === true;
			 if (isAuthenticated) {
				 deferred.resolve(true);
			 }
		 }, function () {
			 deferred.reject(false);
		 });
		 return deferred.promise;
	}

	$scope.$on('user:me', function(event,data) {
		$log.debug("[userAuthController]: listenner");
	   $log.debug(data.data);
	   userCtrl.me = {
			 'name': data.data.name,
			 'avatar': data.data.avatar,
		 };
	 });
	 function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 10; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}
}
