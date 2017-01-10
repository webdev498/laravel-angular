angular.module('mainApp.cal')
.controller('CalController', CalController);

// inject the Task service into our controller
CalController.$inject = ['$scope', '$rootScope', '$q', '$log'];

function CalController($scope, $rootScope, $q, $log) {
	var calCtrl = this;

	/* config object */
     calCtrl.uiConfig = {
       calendar:{
         height: 450,
         editable: true,
         header:{
           left: 'month basicWeek basicDay agendaWeek agendaDay',
           center: 'title',
           right: 'today prev,next'
         },
         dayClick: $scope.alertEventOnClick,
         eventDrop: $scope.alertOnDrop,
         eventResize: $scope.alertOnResize
       }
     };
}
