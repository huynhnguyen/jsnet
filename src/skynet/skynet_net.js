var _ = require('underscore');
var nb = require('skynet_Numbjs');
// var Helper = require('./skynet_helper')
// Log = Helper().logger;

function net(){
	this.params = [];
}

net.prototype.tanh = function(argument){
	let grad = [];
	// params = W + b
	// var func = params
	// let W = params[:]; 
	// let b = params[-1];
	// return math.dot(X,w)
	return [0,1,1,0];
};

net.prototype.sigmoid = function(size){
	this.params = new nb(size);
	// fw = params[:]
	// bw = 
 	return {'params': this.params};
};
function Net(){
	return new net();
}
module.exports = Net;