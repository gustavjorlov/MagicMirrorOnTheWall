var smhi = require('./smhi');
var news = require('./news');
var express = require('express');

var app = express();

app.use(express.static(__dirname + "/../webapp"));

app.get('/weather', function(req, res){
	smhi.getWeather(function(err, data){
		if(err){
			res.send("Nope");
		}else{
			res.json(data);
		}
	});
});

app.get('/news', function(req, res){
	news.getNews(5, function(err, data){
		if(err){
			res.send("Nope");
		}else{
			res.json(data);
		}
	});
});

app.listen(3000);