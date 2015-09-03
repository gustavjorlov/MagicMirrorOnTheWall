var smhi = require('./smhi');
var news = require('./news');
var days = require('./days');
var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/../webapp"));

app.get('/weather', function(req, res){
	smhi.getWeather(function(err, data){
		returnWithoutError(res, err, data);
	});
});

app.get('/news', function(req, res){
	news.getNews(5, function(err, data){
		returnWithoutError(res, err, data);
	});
});

app.get('/day', function(req, res){
	days.getToday(function(err, data){
		returnWithoutError(res, err, data);
	});
});

function returnWithoutError(res, err, data){
	if(err){
		res.send("Nope ", err);
	}else{
		res.json(data);
	}
}

app.listen(3000);