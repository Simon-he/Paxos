var valueWithLargestWeight;
var largestWeight = 0;
function preAccept(data,rootRes){
	if(data){
		if(data.weight > largestWeight){
			valueWithLargestWeight = data.proposeValue;
			largestWeight = data.weight;
			rootRes.status(200).send(valueWithLargestWeight);
		} else {
			rootRes.status(200).send('');
		}
	}
}
function accept(data,rootRes,app){
	if(data.weight >= largestWeight){
		app.roundInfo.data['round' + app.roundInfo.currentRound] = data.proposeValue;
		app.roundInfo.currentRound ++;
		reset();
		rootRes.status(200).send(data.proposeValue);
	}else{
		rootRes.status(200).send('');
	}
}
function reset(){
	valueWithLargestWeight = null;
	largestWeight = 0;
}
module.exports = {preAccept:preAccept,accept:accept}