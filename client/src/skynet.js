'use strict'
const skynet = 

if (typeof module !== 'undefined') {
	module.exports = skynet;
}
if (typeof window !== 'undefined') {
	window.GPU = skynet;
}