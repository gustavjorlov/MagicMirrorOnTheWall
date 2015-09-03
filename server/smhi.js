var request = require("request");
var url = "http://opendata-download-metfcst.smhi.se/api/category" +
	"/pmp1.5g/version/1/geopoint/lat/57.933/lon/12.533/data.json";

function getWeather(cb){
	request.get(url, function(err, response, body){
		var weatherTemp = [];
		var parsedBody = JSON.parse(body);

		// var futureData = getFutureData(parsedBody.timeseries);
		var futureData = parsedBody.timeseries.filter(getFutureData).map(makeNiceData);

		weatherTemp = aggregateIntervals(futureData);

		
		cb(null, futureData.slice(0, 5));
	});
}



function getFutureData(item){
	return +new Date(item.validTime) > +new Date();
}

function makeNiceData(item){
	return {
		"temperature": item.t,
		"time": +new Date(item.validTime),
		"windspeed": item.ws,
		"winddirection": item.wd,
		"totalcloudamount": item.tcc,
		"precipitation": item.pit,
		"precipitationtype": item.pcat
	};
}

function aggregateIntervals(futureData){
	var tempIntervals = [], oneInterval = {};
	for(var i in futureData){
		if(i % 4 === 0){
			var dataPoint = futureData[i];
			console.log(dataPoint);
		}
	}
	return tempIntervals;
}

module.exports = {
	getWeather: getWeather
};