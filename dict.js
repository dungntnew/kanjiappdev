// include module
var request = require('request');
var util    = require('util'); 
var stdin   = process.stdin;

// define variables
var url = 'http://dautungoaihoipro.com/kanjiapp/index.php/dict/search';
var word = '';

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(data){
	word = data.toString().trim();
	request.post(url, {form: { keyword: word}}, handler);
});


var handler = function(err, res, data){
	if (err || res.statusCode != 200)
		 throw err;
	
	data = JSON.parse(data);
	if (data.status_code != 200){
		console.log(word + ': not found in dict\n');
	}else {
		var count = data.words_count;
		var words = data.words_array;

		// print search result
		var msg = '=======================================================\n';
		msg += util.format('SEARCH FOR: %s -- %d MATCHED -- \n', word, count);
		for(var i = 0; i < count; ++i){
			msg += util.format('%d.\n', i);
			msg += util.format('%s	%s\n', words[i].word, words[i].phonetic);
			msg += util.format('%s  %s\n', words[i].china, words[i].mean);
		}
		msg += '\n';
		console.log(msg);
	}
}

