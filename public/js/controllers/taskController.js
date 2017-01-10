angular.module('mainApp.task')
	.controller('TaskController', TaskController);

// inject the Task service into our controller
TaskController.$inject = ['$http', '$q', '$scope', '$timeout', '$log', '$rootScope', 'Task', 'Alert'];


function TaskController($http, $q, $scope, $timeout, $log, $rootScope, Task, Alert) {
	var taskCtrl = this;

	// object to hold all the data for the new task form
	taskCtrl.taskData = {};

	//helper used for number of tasks to go
	$rootScope.myTasks = {};

	// loading variable to show the spinning loading icon
	taskCtrl.loading = true;
	taskCtrl.isCollapsed = false;

	// function to handle editing a task
	taskCtrl.deleteTask = deleteTask;

	// function to handle editing a task
	taskCtrl.completeTask = completeTask;

	taskCtrl.severitylevels = {
		"Low"        : "default",
		"Medium Low" : "warning",
		"Medium"     : "warning",
		"Medium High": "danger",
		"High"       : "danger",
	};


	/**
	 *  get all the tasks first and bind it to the taskCtrl.tasks object
	 * @return {[type]} [description]
	 */
	Task.get()
		.success(function (data) {
			loadTasks();
		});

	/**
	 * Triger delete action for taskid
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	function deleteTask(id) {
		taskCtrl.loading = true;
		// use the function we created in our service
		Task.destroy(id)
			.success(function (data) {
				// if successful, we'll need to refresh the task list
				loadTasks();
			});
	}

	/**
	 * Trigger complete task action
	 * @param  {[type]} task [description]
	 * @return {[type]}      [description]
	 */
	function completeTask(task) {
		//This valuw will toggle true to false, and false to true
		task.status=task.status? 0 :1 ;// inversing

		//Making a deep copy, the taskvalue is used elsewhere
		//this ensures, data sent back is modified by user
		taskCopy={};
		angular.copy(task, taskCopy);

		//collect tag_list[] required by api
		taskCopy.tag_list = task.tags.map(function (tag) {
			return tag.id;
		});

		//Log action
		$log.debug("[TaskController]: Task marked as complete");
		$log.debug(taskCopy);

		//Process update
		Task.update(taskCopy);
	}

	/**
	 * load alll tasks in the view, and set the task counter
	 * @return {[type]} [description]
	 */
	function loadTasks() {
		taskCtrl.loading = true;
		$timeout(function () {
			Task.get()
				.success(function (data) {
					taskCtrl.tasks = data.tasks;
					$rootScope.myTasks.count=data.tasks.length;
					taskCtrl.loading = false;
				});
		}, 1000);
	}

	/**
	 * watch for emmitted event task:load, from TaskFormController::class
	 * @param  {[type]} 'task:load'     [description]
	 * @param  {[type]} function(event, data          [description]
	 * @return {[type]}                 [description]
	 */
	$scope.$on('task:load', function(event, data) {
		$log.debug("[TaskLoadController]: load");
		loadTasks();
	});
}
