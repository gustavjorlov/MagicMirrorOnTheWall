var request = require('request');
var xml2js = require('xml2js').parseString;
var fs = require('fs');
var url = "http://www.alingsastidning.se/kategori/nyheter/alingsas/feed/";

var response = '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/"><channel><title>Alingsås Tidning Alingsås</title></channel></rss>';


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
	request.get(url, function(err, xmlData, body){
		xml2js(body, cb);
	});
}

module.exports = {
	getNews: getNews
}