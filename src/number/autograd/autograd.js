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
const backward = (nd$child, nd$pDiff)=>{
	const grad = nd$child.grad;
	// console.group(nd$child, nd$pDiff);
	if(grad == null){
		return nd$pDiff;
	}	
	else{
		return  grad.map( g => {
					if(g===false){ return null }
					if(g.bw===null || g.vjp===null){
						return nd$pDiff;
					}else{
						let nd$diff = Ops.dot(Ops.T(nd$pDiff),g.vjp);
						// console.warn('[backward] g');
						// console.table( g );
						// console.warn('[backward] nd$diff');
						// console.table( nd$diff );
						return backward(g.bw, nd$diff);	
					}
				} )
				.filter(d=>d);
	}
}

Autograd.grad = function(func){
	const wrapper = (...inputs)=>{
		for( let [nd$0, c] of nd.enummerate(inputs) ) {
			if(Number().isNumber(nd$0) && nd$0.grad !== false){
				nd$0.grad = [{ vid: c, bw: null, vjp:null}];
			}
		}
		let nd$ret  = func(...inputs);
		//reset value to 1
		nd$ret.value = nd$ret.value.map(d=>1);
		let nd$grad = backward( nd$ret, nd$ret );
		return [nd$grad, nd$ret];
	}
	return wrapper;
}

Autograd.backward = backward;