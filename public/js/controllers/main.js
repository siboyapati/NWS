angular.module('homeController', [])
	.controller('mainController', ['$scope','$http','Books','toaster', function($scope, $http, Books, toaster) {
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
					$scope.book = null;//clean the forms
					toaster.pop('success', "Book has been saved", "to database");
				});
		}

		Books.get()
			.success(function(data) {
				$scope.books = data;
				console.log(data);
				$scope.loading = false;
			});
	}]);