var http = require('http');
var config = require('./config');
config.nodes.forEach(function(node){
	var request = http.request(
		{
			hostname:node.host,
			port:node.port,
			path:'/main?proposeValue=test' + node.port,
			method:'GET'
		},
		function(response){
			response.on('data',function(chunk){
				console.log(node.port + 'success set proposeValue: ' + chunk);
			})

		});
	request.on('error',function(err){
		console.log(node.port + 'error with: ' + err);
	});
	request.end();
});