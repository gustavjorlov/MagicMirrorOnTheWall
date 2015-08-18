var myApp = angular.module('app', []);

myApp.controller("MainCtrl", ['$scope', '$http', MainCtrl]);

function MainCtrl($scope, $http){
	var self = this;
	self.news = [];
	self.weather = [];
	self.title = "God Morgon";

	$http.get('/news').then(function(data){
		if(data.status === 200){
			self.news = data.data
		}
	});

	$http.get('/weather').then(function(data){
		if(data.status === 200){
			self.weather = data.data
		}
	});


}	