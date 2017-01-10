angular.module('mainApp')
.config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/_home.html',
            data: { isPublic: true },
        })

        // nested list with custom controller
        .state('home.credits', {
            url: '/credits',
            templateUrl: 'views/_home-credits.html',
            data: { isPublic: true },
        })

        .state('map', {
            url: '/map',
            controller: 'MapController',
            controllerAs: 'mapCtrl',
            templateUrl: 'views/_map.html',
        })

        .state('cal', {
            url: '/cal',
            controller: 'CalController',
            controllerAs: 'calCtrl',
            templateUrl: 'views/_cal.html',
        })

        .state('tasks', {
            url: '/tasks',
            controller: 'TaskController',
            controllerAs: 'taskCtrl',
            templateUrl: 'views/_tasks.html',
        })

        .state('tasks.edit', {
            url: '/tasks/:id/edit',
            controller: 'TaskController',
            controllerAs: 'taskCtrl',
            templateUrl: 'views/_tasks-edit.html',
        })

        .state('register', {
            url: '/register',
            templateUrl: 'views/_home-register.html',
            controller: 'UserAuthController',
            controllerAs: 'userCtrl',
            data: { isPublic: true },
        });
}
