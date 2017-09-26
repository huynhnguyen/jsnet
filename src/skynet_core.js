let _ = require('underscore');
const Helper = require('./skynet_helper');
const Log = 1;

const Skynet = ()=>{
	let layers = [];
	let params = [];
	const init_net = (layes)=>{
		_.map((l)=>{
			console.log(l);
		}, layers);
	}
	return {
		init_net:  [,
		get_params:'',
		set_params:'',
		predict:'',
		solver:'',
	}
}
module.exports = Skynet;