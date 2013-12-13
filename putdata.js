var _ = require('underscore');
var request = require('request');
var fs = require('fs');
var util = require('util');

var file 	= __dirname + '/data.json';
var fetch_url  	= 'http://dautungoaihoipro.com/kanjiapp/index.php/dict/words';
var put_url		= 'http://dautungoaihoipro.com/kanjiapp/index.php/study/insert';  
 
fs.readFile(file, 'utf8', function(err, data){
	if (err) throw err;
	
	data = JSON.parse(data); 	
	_.map(data, function(words, lession_id){
		console.log(util.format('----------%d---------', lession_id));
		request.post(url, {form: {data: words.json(',')}}, handler);
	});	
});

function handler(err, res, data){
	if (err || res.statusCode != 200)
		throw err;
	data = JSON.parse(data);
	if (data.status_code != 200) {
	      msg = util.format('fail for fetch data');
	      console.log(msg);
	}	
	
	var lession_id = data.lession_id;
	var kanji_ids = data.kanji_ids;
	
	request.post(put_url, {form: { id: lession_id, data: kanji_ids }}, function(err, res, result){
		if (err || res.statusCode != 200) 
			throw err;
		
		if (result.status_code != 200){
			console.log(util.format("there are error"));
			return;
		}

		console.log(result.msg);
	});
}
