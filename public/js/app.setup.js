// Declare app level module which depends on views, and components
angular.module('mainApp')
	.config(configure);

configure.$inject = ['$httpProvider', 'cfpLoadingBarProvider'];

function configure($httpProvider, cfpLoadingBarProvider) {

	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = false;

	$httpProvider.interceptors.push('authInterceptor');

}
