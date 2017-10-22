const Net = require('./skynet_net');
const Helper = require('./skynet_helper');
const Numberjs  = require('./skynet_numberjs');

const Skynet  = {};
Skynet.helper = Helper;
Skynet.net = Net;
Skynet.nb = Numberjs;

if (typeof module !== 'undefined') {
	module.exports = Skynet;
}
if (typeof window !== 'undefined') {
	window.Skynet = Skynet;
}
