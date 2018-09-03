var config = require('./config');
var http = require('http');
var largestValueFromAcceptor;
var preCounter = 0;
var commitCounter = 0;
var paxosDone = true;
function prePropose (data,rootRes){
	paxosDone = false;
	console.log('prePropose data is :' + data.proposeValue);
	config.nodes.forEach(function(node){
		var request = http.request({
			hostname:node.host,
			port:node.port,
			path:'/preAccept?weight=' + data.weight + '&proposeValue=' + data.proposeValue + '&roundNumber='+ data.roundNumber,
			method:'GET'
		},function (response){
			response.on('data',function(chunk){
				if(!paxosDone){
					preCounter++;
					console.log('preCounter:' + preCounter);
					if(chunk){
						largestValueFromAcceptor = chunk;
					}
					if(preCounter/config.nodes.length > 0.5){
						propose({weight:data.weight,proposeValue:largestValueFromAcceptor,roundNumber:data.roundNumber},rootRes);
					}
				}
				
			})

		})
		request.on('error',function(error){
			console.log('something wrong happen in prePropose with error:' + error);
		})
		request.end();
	});
}
function propose (data,rootRes){
	console.log('propose data is :' + data.proposeValue);
	config.nodes.forEach(function(node){
		var request = http.request({
			hostname:node.host,
			port:node.port,
			path:'/accept?weight=' + data.weight + '&proposeValue=' + data.proposeValue + '&roundNumber='+ data.roundNumber,
			method:'GET'
		},function (response){
			response.on('data',function(chunk){
				if(chunk && !paxosDone){
					commitCounter++;
					console.log(commitCounter);
					if(commitCounter/config.nodes.length > 0.5 ){
						rootRes.status(200).send(chunk);
						reset();
					}
				}
				
			})

		})
		request.on('error',function(error){
			console.log('something wrong happen in propose with error:' + error);
		})
		request.end();
	});

}
function reset (){
	preCounter = 0;
	commitCounter = 0;
	largestValueFromAcceptor = null;
	paxosDone = true;
}
module.exports = {prePropose:prePropose,propose:propose}