angular.module('homeController', [])
	.controller('mainController', ['$scope','$http','Books', function($scope, $http, Books) {
		$scope.formData = {};
		$scope.loading = true;

		$scope.getBooksList = function(){
			Books.get()
				.success(function(data) {
					$scope.books = data;
				});
		}

		$scope.createBook = function(book){
			console.log(book);
			Books.create(book)
				.success(function(data) {
					console.log('success');
					$scope.getBooksList();
					//$scope.formData = {};
				});
		}

		Books.get()
			.success(function(data) {
				$scope.books = data;
				console.log(data);
				$scope.loading = false;
			});

		$scope.createTodo = function() {
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				Todos.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
					});
			}
		};
		$scope.createUser = function () {
			$scope.user=[];
			$scope.user.name = "siva boyapti";
			Users.create($scope.formData)
				.success(function (data) {
					console.log(data);
				});
		};

		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
		};
	}]);