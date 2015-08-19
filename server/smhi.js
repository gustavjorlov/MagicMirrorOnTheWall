var request = require("request");
var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/57.933/lon/12.533/data.json";

function getWeather(cb){
	request.get(url, function(err, response, body){
		var weatherTemp = [];
		var parsedBody = JSON.parse(body);

		var futureData = getFutureData(parsedBody.timeseries);

		aggregateIntervals(futureData);

		for(var i in futureData){
			if(i % 4 === 0){
				var dataPoint = futureData[i];
				weatherTemp.push({
					"temperature": dataPoint.t,
					"time": +new Date(dataPoint.validTime),
					"windspeed": dataPoint.ws,
					"winddirection": dataPoint.wd,
					"totalcloudamount": dataPoint.tcc,
					"precipitation": dataPoint.pit,
					"precipitationtype": dataPoint.pcat
				});
			}
			
		}
		cb(null, weatherTemp.slice(0, 6));
	});
}

function getFutureData(data){
	return data.filter(function(item){
		return +new Date(item.validTime) > +new Date();
	});
}

function aggregateIntervals(data){
	// console.log(data);
}

module.exports = {
	getWeather: getWeather
}