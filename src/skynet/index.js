const Net = require('./skynet_net');
const Helper = require('./skynet_helper');
const Numbjs  = require('./skynet_Numbjs');
const Ultils = require('./') 
const Skynet  = {};
Skynet.helper = Helper;
Skynet.net = Net;
Skynet.nb = Numbjs;
// Skynet.ultils = Ultils;

if (typeof module !== 'undefined') {
	module.exports = Skynet;
}
if (typeof window !== 'undefined') {
	window.Skynet = Skynet;
}
