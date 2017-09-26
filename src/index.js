const Helper = require('./skynet_helper');
const Net    = require('./skynet_net');
const Skynet  = {};
Skynet.helper = Helper;
Skynet.net = Net;

if (typeof module !== 'undefined') {
	module.exports = Skynet;
}
if (typeof window !== 'undefined') {
	window.Skynet = Skynet;
}
