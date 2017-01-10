angular.module('mainApp.task')
	.factory('Task', Task);

Task.$inject = ['$http', '$log', 'url'];

function Task($http, $log, url) {

	var service = {
		// get all the tasks
		get: function () {
			return $http.get(url.BASE_API + '/tasks');
		},

		// get single tasks
		show: function (id) {
			return $http.get(url.BASE_API + '/tasks/' + id);
		},

		// save a task (pass in task data)
		save: function (taskData) {
			// console.log($.param(taskData));
			return $http({
				method: 'POST',
				url: url.BASE_API + '/tasks',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: $.param(taskData)
			});
		},

		// update a task (pass in task data)
		update: function (taskData) {
			return $http({
				method: 'PUT',
				url: url.BASE_API + '/tasks/' + taskData.id,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: $.param(taskData)
			});
		},

		// destroy a task
		destroy: function (id) {
			return $http.delete(url.BASE_API + '/tasks/' + id);
		}
	};
	return service;
}
