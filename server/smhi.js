var request = require("request");
var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/57.933/lon/12.533/data.json";

function getWeather(cb){
	request.get(url, function(err, response, body){
		var weatherTemp = [];
		var parsedBody = JSON.parse(body);
		console.log(parsedBody.timeseries);
		for(var i in parsedBody.timeseries){
			console.log(parsedBody.timeseries[i])
			weatherTemp.push({
				"temperature": parsedBody.timeseries[i].t,
				"time": +new Date(parsedBody.timeseries[i].validTime),
				"windspeed": parsedBody.timeseries[i].ws,
				"winddirection": parsedBody.timeseries[i].wd,
				"totalcloudamount": parsedBody.timeseries[i].tcc,
				"precipitation": parsedBody.timeseries[i].pit,
				"precipitationtype": parsedBody.timeseries[i].pcat
			});
		}



		cb(null, weatherTemp.slice(0, 5));
	});
}

module.exports = {
	getWeather: getWeather
}