"use strict";
const nd = require('../ndarray');
const Ops  = require('../operators');
const Number = require('../number');

console.warn(Ops);

const Autograd = {};

if (typeof module !== 'undefined') {
  module.exports   = Autograd;
} 
if (typeof window !== 'undefined') {
  window.Autograd = Autograd;
}

// for(let func in Ops){
// 	console.warn(func);
// }

Autograd.grad = function(func){
	this.nodes = [];
	const wrapper = (...inputs)=>{
		console.warn('wrapper', inputs);
		for(let $0 of inputs){
			if(Number().isNumber($0)){
				this.nodes[0] = [];
			}
		}
		return func(...inputs$);
	}
	return wrapper;
}