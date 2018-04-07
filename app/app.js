//Define an angular module for our app
var app = angular.module('myApp', []);
app.controller('tasksController', function($scope, $http) {
  getTask(); // Load all available tasks 
  function getTask(){  
  $http.get("ajax/getTask.php").then(function(response) {
        $scope.tasks = response.data;
    }, function(response) { 
		$scope.tasks = response;
    });
  };
$scope.addTask = function (task) {
		$http.get("ajax/addTask.php?task="+task).then(function(response) {
		$scope.tasks = response.data;
		getTask();
		$scope.taskInput = "";
    }, function(response) { 
		$scope.tasks = response.data;
		getTask();
		$scope.taskInput = "";
    });	  
  };
$scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.get("ajax/deleteTask.php?taskID="+task)
    .then(function(response) {
		getTask(); 
    }, function(response) { 
		getTask(); 
    });	
	}
  };
$scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}           
	    $http.get("ajax/updateTask.php?taskID="+item+"&status="+status).then(function(response) {
			getTask(); 
    }, function(response) { 
			getTask(); 
    });	  
};
});
