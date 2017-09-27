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

var _ = __webpack_require__(71);
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

function numberjs(shape, value) {
	// TODO: support more than 2d array
	this.shape = Object.assign([], shape);
	this.volum = shape.reduce((a, b) => a * b);
	// this.mulup = size.map((d,i)=> i>0?size[i] + size[i-1]:size[i]);
	this.value = value || new Float32Array(this.volum);
	this.version = 0.1;
}

numberjs.prototype.tolist = function () {
	Log(this.value);
	let list = this.shape.reverse().reduce((l, s) => {
		ll = l.reduce((d, v) => {
			d.tmp.push(v);
			if (d.tmp.length === s) {
				d.t.push(d.tmp);
				d.tmp = [];
			}
			return d;
		}, { t: [], tmp: [] });
		return ll.t;
	}, this.value)[0];
	return list;
};

numberjs.prototype.tanh = a => {
	val = a.value.map(d => Math.tanh(d));
	return new numberjs(a.shape, val);
};
numberjs.prototype.relu = a => {
	return null;
};
numberjs.prototype.sigmoid = a => {
	val = a.value.map(d => 0.5 * (Math.tanh(d) + 1.0));
	return new numberjs(a.shape, val);
};

numberjs.prototype.transpose = () => {

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