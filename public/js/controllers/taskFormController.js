
angular.module('mainApp.task')
	.controller('TaskFormController', TaskFormController);

// inject the Task service into our controller
TaskFormController.$inject = ['$modal', '$scope', '$rootScope', '$q', '$timeout', '$log', 'Alert', 'Task'];


function TaskFormController($modal, $scope, $rootScope, $q, $timeout, $log, Alert, Task) {
	var taskFormCtrl = this;

	$scope.$on('edit', function(event, id) {
		$log.debug("[TaskFormController]: recieve");
		openTask(id);
	});

	taskTagOptions = taskPriorityOptions = {};

	taskFormCtrl.open = openTask;

	// object to hold all the data for the new task form
	taskFormCtrl.taskData = {};

	// loading variable to show the spinning loading icon
	taskFormCtrl.loading = true;

	// function to handle submitting the form
	taskFormCtrl.addOrEditTask = addOrEditTask;

	// function to handle deleting a task
	taskFormCtrl.deleteTask = deleteTask;

	// new task creation
	taskFormCtrl.newTask = newTask;

	//submit on enter
	taskFormCtrl.submitOnEnter = submitOnEnter;

	//taskcreateinput
	taskFormCtrl.createInput ="";


	// function to handle editing a task
	taskFormCtrl.completeTask = completeTask;

	/**
	 * [addOrEditTask]
	 * @param {[type]} form     [description]
	 * @param {[type]} taskData [description]
	 */
	function addOrEditTask(form, taskData) {
		taskFormCtrl.taskData=taskData;
		var deferred = $q.defer();
		taskFormCtrl.loading = true;
		if (form.$invalid) {
			alert('invalid');
			return false;
		}

		if (taskFormCtrl.currentTask) {
			taskFormCtrl.taskData.id = taskFormCtrl.currentTask.id;
			$log.debug("[TaskFormController]: passing to updating");
			$log.debug(taskFormCtrl.currentTask);
			$log.debug(taskFormCtrl.taskData);
			updateTask(taskFormCtrl.taskData).then(function () {
				deferred.resolve(true);
			}, function (data) {
				deferred.reject(data);
			});

		} else {
			// save the task. pass in task data from the form
			// use the function we created in our service
			$log.debug(taskFormCtrl.taskData);

			Task.save(taskFormCtrl.taskData)
				.success(function (data) {

					// if successful, we'll need to refresh the task list
					deferred.resolve(true);
				})
				.error(function (data) {
					for (var key in data) {
						// Alert.showAlert('danger', key, data[key], 'local');
						$log.error("[TaskController]: Saving task didint work");
						$log.error(data);
						deferred.reject(data);
					}
				});
		}
		return deferred.promise;
	}

	function submitOnEnter() {
		$log.debug('[TaskFormController]: submission entered ');

		taskData={
			'title': taskFormCtrl.createInput,
			'notes':  taskFormCtrl.createInput,
		};
		$log.debug(taskData);

		addOrEditTask(true, taskData).then(function () {
			Alert.showAlert('success', '', 'New Task Created');
		},function (data) {
			Alert.showAlert('danger', 'Task Failed', data);
		});


	}
	function newTask(id) {
		taskFormCtrl.taskData = {};
		refreshForm(taskFormCtrl.taskForm);
	}

	function deleteTask(id) {
		// use the function we created in our service
		Task.destroy(id);
	}

	function completeTask(task) {
		// taskFormCtrl.loading = true;
		task.status=task.status? 0 :1 ;// inversing
		myTask={};
		angular.copy(task, myTask);

		myTask.tag_list = task.tags.map(function (tag) {
			return tag.id;
		});

		$log.debug("[TaskController]: Task marked as complete");
		$log.debug(myTask);

		Task.update(myTask);
	}

	function updateTask(task) {
		var deferred = $q.defer();
		// save the task. pass in task data from the form
		// use the function we created in our service
		$log.debug("[TaskFormController]: Updating now");
		$log.debug(task);

		Task.update(task)
			.success(function (data) {
				$log.debug("[TaskFormController]: updated in API");
				$log.debug(data);
				// if successful, we'll need to refresh the task list
				deferred.resolve(true);
			})
			.error(function (data) {
				// for (var key in data) {
					// Alert.showAlert('danger', key, data[key], 'local');
					$log.error("[TaskController]: updating task didint work");
					$log.error(data.error);
					// deferred.reject(data);
				// }
			});
			return deferred.promise;
	}

	function setTask(data){
			$log.debug("[TaskFormController]: set");
			task={};
			taskFormCtrl.currentTask = data;
			task.title = taskFormCtrl.currentTask.title;
			task.notes = taskFormCtrl.currentTask.notes;
			task.priority_id = taskFormCtrl.currentTask.priority_id;
			task.status = taskFormCtrl.currentTask.status;
			task.tag_list = taskFormCtrl.currentTask.tags.map(function (tag) {
				return tag.id;
			});
			$log.debug(task);
			return task;
	}

	function refreshForm(form) {
		taskFormCtrl.taskData = {};
		form.$setPristine();
	}

	function loadOptions() {
		Task.get()
			.success(function (data) {
				taskFormCtrl.loading = false;
				taskTagOptions = data.tags.map(function (tag) {
					return {
						id: tag.id,
						name: tag.name
					};
				});
				taskPriorityOptions = data.priorities.map(function (priority) {
					return {
						id: priority.id,
						name: priority.name
					};
				});
			});
	}
	loadOptions();

 	  function openTask(id) {
			loadOptions();
			$log.debug("[TaskFormController]: open");
			$log.debug(id);

		var modalInstance = $modal.open({
					templateUrl: 'views/_tasks-form.html',
					controller: function ($scope, $modalInstance) {
						// set data for task in modal
						$scope.taskId=id;
						$scope.taskData = {};
						$scope.taskPriorityOptions = taskPriorityOptions;
						$scope.taskTagOptions = taskTagOptions;
						if (id){
							Task.show(id)
							.success(function (id) {
									$scope.taskData = setTask(id);
									$scope.taskPriorityOptions = taskPriorityOptions;
									$scope.taskTagOptions = taskTagOptions;
									$log.debug($scope);
							});
						}

						$scope.saveOrUpdate = function (form) {
							addOrEditTask(form, $scope.taskData);
							// .then(function () {
								$modalInstance.close($scope.taskData);
							// });
						};
						$scope.delete = function () {
							deleteTask($scope.taskId);
							$modalInstance.close($scope.taskData);
						};
						$scope.cancel = function () {
							$modalInstance.dismiss('cancel');
						};
					},
					resolve: {
						taskData: function() {
          		return $scope.taskData;
        		}
			  	},
			});

		modalInstance.result.then(function(data) {
			$rootScope.$broadcast('task:load');
    }, function() {
      $log.debug('Modal dismissed at: ' + new Date());
    });
	}


}
