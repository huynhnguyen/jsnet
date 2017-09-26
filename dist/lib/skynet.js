(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("skynet", [], factory);
	else if(typeof exports === 'object')
		exports["skynet"] = factory();
	else
		root["skynet"] = factory();
})(this, function() {
return webpackJsonpskynet([0],{

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

const Helper = __webpack_require__(92);
const Net = __webpack_require__(552);
const Skynet = {};
Skynet.helper = Helper;
Skynet.net = Net;

if (true) {
	module.exports = Skynet;
}
if (typeof window !== 'undefined') {
	window.Skynet = Skynet;
}

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(71);
var nb = __webpack_require__(553);
// var Helper = require('./skynet_helper')
// Log = Helper().logger;

function net() {
	this.params = [];
}

net.prototype.tanh = function (argument) {
	let grad = [];
	// params = W + b
	// var func = params
	// let W = params[:]; 
	// let b = params[-1];
	// return math.dot(X,w)
	return [0, 1, 1, 0];
};

net.prototype.sigmoid = function (size) {
	this.params = new nb(size);
	// fw = params[:]
	// bw = 
	return { 'params': this.params };
};
function Net() {
	return new net();
}
module.exports = Net;

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

var math = __webpack_require__(72);
var Helper = __webpack_require__(92);
Log = Helper().logger;

const reindexing = (idx, volume) => {
	idx = +idx; //to number
	idx = idx < 0 ? idx + volume : idx;
	if (idx < 0 || idx > volume) {
		console.error(`oop! not consistent
    idx: ${idx} with volum ${volume}`);
	}
	return idx;
};

function numberjs(size) {
	this.shape = Object.assign([], size);
	this.volum = size.reduce((a, b) => a + b);
	this.value = new Float32Array(this.volum);
	this.version = 0.1;
}

numberjs.prototype.tolist = function () {
	Log(this.shape.reverse());
	// const v = this.volum,
	// 	  r = this.shape[0],
	// 	  c = this.shape[1];
	// let ret = [];
	// for(let tr = 0, tc = 0, travel = 0;
	// 		travel < this.volum;
	// 		tr += 1, tc += 0|(tr/r), //increasing 
	// 		tr %= r, tc %= c)
	return 'tolist';
};

numberjs.prototype.transpose = size => {
	r = 2, c = 3;
	// for(let xr=0, xc=0, yr=0, yc=0, counter=0;
	//     counter<r*c; 
	//     xc+=1,xr + \=0|(xc/c),xr%=r,xc%=c,
	//     yr+=1, yc+=0|(yr/r), yr%=r,yc%=c){
	//     counter += 1;
	//     console.log(xr,xc,va[xr*c + xc]);
	//     console.log(yr,yc,va[yr*c + yc]);
	//     [va[xr*c + xc], va[yr*c + yc]] = [va[yr*c + yc], va[xr*c + xc]];  
	//     console.log(va[xr*c + xc], va[yr*c + yc]);
	//     // console.log(`[${xr}${xc}]: ${va[xr*c + xc]}`);
	//   }
	return 'transpose';
};

numberjs.prototype.get = function (argument) {
	return 0;
};

numberjs.prototype.dot = function (A, B) {
	return 'dot';
};
module.exports = numberjs;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(71);
var math = __webpack_require__(72);

const Helper = () => {
	/**
 * print the log to console with option type
 * 
 *
 * @param {String} msg message to print
 * @param {String} msgType message type refer to ```const Type```
 * @see Helper#Logger
 */
	const Logger = (msg, msgType) => {
		msgType = msgType | 'info';
		const Display = {
			'info': console.log,
			'warn': console.warn,
			'error': console.error
		};
		try {
			Display[msgType](msg);
		} catch (e) {
			Display['info'](msg);
		}
	};
	return {
		sayhello: () => {
			return 'xin chao 2';
		},
		logger: Logger
	};
};
module.exports = Helper;
// (function(lib) {
//   "use strict";
//   if (typeof module === "undefined" || typeof module.exports === "undefined") {
//     window.convnetjs = lib; // in ordinary browser attach library to window
//   } else {
//     module.exports = lib; // in nodejs
//   }
// })(skynet);

/***/ })

},[151]);
});
//# sourceMappingURL=skynet.js.map