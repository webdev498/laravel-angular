angular.module('mainApp.task')
	.directive('keyCodesField', keyCodesField);

taskFormField.$inject = ['$log'];

function keyCodesField($log) {

	var service = {
		restrict: 'A',
		link: function ($scope, $element, $attrs) {
			$element.bind("keypress", function (event) {
				var keyCode = event.which || event.keyCode;
				// $log.debug(keyCode);
				if (keyCode == $attrs.code) {
					$log.debug('KEY MATCH');
					$scope.$apply(function () {
					$log.debug($attrs.keyCodesField);
						$scope.$eval($attrs.keyCodesField, {
							$event: event
						});
					});

				}
			});
		}

	};
	return service;
}
