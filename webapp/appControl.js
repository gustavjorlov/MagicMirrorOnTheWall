var myApp = angular.module('app', []);

myApp.controller("MainCtrl", ['$http', MainCtrl]);

function MainCtrl($http){
	var self = this;
	self.news = [];
	self.weather = [];
	self.title = "";

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

	$http.get('/day').then(function(data){
		console.log(data.data.body);
		if(data.status === 200){
			if(JSON.parse(data.data.body).helgdag){
				self.title = JSON.parse(data.data.body).helgdag;
			}else{
				self.title = JSON.parse(data.data.body).dag.substr(0,3) + ", V" + JSON.parse(data.data.body).vecka;
			}
			
		}
	});


}	