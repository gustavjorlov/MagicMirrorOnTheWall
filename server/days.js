var request = require('request');

var specialDaysUrl = "http://api.dryg.net/dagar/v1/?datum=";

function getToday(cb){
	var today = new Date();
	request.get(specialDaysUrl + today.getFullYear() + ('00'+today.getMonth()).slice(-2) + ('00'+today.getDate()).slice(-2), function(err, data){
		cb(err, data);
	});
}

module.exports = {
	getToday: getToday
}