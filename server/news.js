var request = require('request');
var xml2js = require('xml2js').parseString;
var fs = require('fs');
var urls = ["http://www.alingsastidning.se/kategori/nyheter/alingsas/feed/", "http://www.gp.se/1.16943", "http://www.gp.se/1.16942"];

function getNews(number, cb){
	makeAPIRequest(function(err, data){
		if(err){ cb(err, null); }else{
			cb(null, getInterestingData(data, number));
		}
	});
}

function getInterestingData(newsResponse, number){
	var newsList = newsResponse.rss.channel[0].item;
	var tempNewsList = [];
	for(var i in newsList){
		if(number <= i){ break; }

		// tempNewsList.push({
		// 	title: newsList[i].title,
		// 	description: newsList[i].description,
		// 	date: +new Date(newsList[i].pubDate),
		// 	author: newsList[i]['dc:creator']
		// });

		tempNewsList.push({
			title: newsList[i].title[0],
			description: newsList[i].description[0],
			date: +new Date(newsList[i].pubDate[0]),
			author: newsList[i]['dc:creator'][0]
		});
	}
	return tempNewsList;
}

function makeAPIRequest(cb){
	request.get(urls[0], function(err, xmlData, body){
		xml2js(body, cb);
	});
}

module.exports = {
	getNews: getNews
}