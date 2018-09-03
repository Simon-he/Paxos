var express = require('express')
var app = express();
var http = require('http');
var proposer = require('./proposer');
var accepter = require('./accepter');
app.roundInfo = {currentRound:1,data:{}};

app.get('/main',function(req,res){
	var param = req['query'];
	console.log('client data is :' + param);
	proposer.prePropose({
		weight:Math.random(),
		proposeValue:param.proposeValue,
		roundNumber:app.roundInfo.currentRound
	},res);
});
app.get('/preAccept',function(req,res){
	var param = req['query'];
	if(param){
		if(app.roundInfo.currentRound == param.roundNumber){
			accepter.preAccept(param,res);
		}
		
	}
});
app.get('/accept',function(req,res){
	var param = req['query'];
	if(param){
		if(app.roundInfo.currentRound == param.roundNumber){
			accepter.accept(param,res,app);
		}
	}

});
var server = http.createServer(app);
server.listen(process.env.paxosPort,function(){
	console.log('server started on port '+ process.env.paxosPort);
	setInterval(function(){
		console.log('-----------------------------------------');
		console.log(app.roundInfo);
	},15000);
})