angular.module('mainApp.task')
	.directive('taskCreateField', taskCreateField);

function taskCreateField() {
    return {
				link: function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    }
	};
}
