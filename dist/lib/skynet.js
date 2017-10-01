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

const Net = __webpack_require__(552);
const Helper = __webpack_require__(91);
const Numberjs = __webpack_require__(553);

const Skynet = {};
Skynet.helper = Helper;
Skynet.net = Net;
Skynet.nb = Numberjs;

if (true) {
	module.exports = Skynet;
}
if (typeof window !== 'undefined') {
	window.Skynet = Skynet;
}

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(58);
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

var _ = __webpack_require__(58);
var Helper = __webpack_require__(91);
Log = Helper().logger;

function* rangeGenerator(start, end, step) {
    let i = start,
        e = end,
        st = step;
    for (; i < e; i += st) {
        yield i;
    }
}

const range = (start, end, step) => {
    let _range = [];
    const s = start,
          e = end,
          st = step | 1;
    for (let v of rangeGenerator(s, e, st)) {
        _range.push(v);
    }
    return _range;
};

const validateShape = (shapeA, shapeB) => {
    if ('' + shapeA !== '' + shapeB) {
        throw Error('shape not consistent');
    }
};

const clone = refValue => {
    return refValue instanceof Array ? Object.assign([], refValue) : Object.assign({}, refValue);
};

const getVolume = shape => {
    return shape.reduce((a, b) => a * b);
};

const convertSelector = (vals, shape) => {
    let converted;
    if (typeof vals === 'number') {
        converted = shape.map(d => null);
        converted[0] = vals > 0 ? vals : shape[0] + vals;
    }
    if (typeof vals === 'string') {
        converted = vals.split(',').map((v, i) => {
            if (v !== '') {
                return +v > 0 ? +v : +v + shape[i];
            } else {
                return null;
            }
        });
    }
    return converted;
};

Selector = {
    get: function (d, select) {
        let value = d[0],
            shape = d[1];
        console.log(d, idxs);
    },
    set: function (d, select, v) {
        let value = d[0],
            shape = d[1];
        console.log(a, idxs, v);
    }
};

function numberjs(shape, value) {
    // TODO: support more than 2d array
    this.shape = clone(shape);
    this.volume = getVolume(shape);
    // this.mulup = size.map((d,i)=> i>0?size[i] + size[i-1]:size[i]);
    this.value = value || new Float32Array(this.volume);
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

numberjs.prototype.reshape = function (newShape) {
    validateShape(this.shape, newShape);
    this.shape = clone(newShape);
    return this;
};

numberjs.prototype.tanh = a => {
    let val = a.value.map(d => Math.tanh(d));
    return new numberjs(a.shape, val);
};

numberjs.prototype.relu = a => {
    throw 'not implement';
};

numberjs.prototype.sigmoid = a => {
    val = a.value.map(d => 0.5 * (Math.tanh(d) + 1.0));
    return new numberjs(a.shape, val);
};

numberjs.prototype.transpose = function () {
    this.shape = this.shape.reverse();
    return 'transpose';
};
const vecMapping = (vA, vB, ops) => {
    validateShape(vA.shape, vB.shape);
    return vA.map((d, i) => ops(vA[i], yB[i]));
};

const numMapping = (vA, n, ops) => {
    return vA.map((d, i) => ops(vA, n));
};

const validateOps = (objA, objB) => {
    if (objA instanceof 'numberjs' && objB instanceof 'numberjs') {
        return vecMapping;
    }
    if (objA instanceof 'numberjs' && objB instanceof 'number') {
        return numMapping;
    }
    throw Error('invalide objet input');
};

numberjs.prototype.add = (a, b) => {
    const addOp = (d1, d2) => d1 + d2;
    const mapping = validateOps(a, b);
    let value = mapping(a, b, addOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.minus = (a, b) => {
    const minusOp = (d1, d2) => d1 - d2;
    const mapping = validateOps(a, b);
    let value = mapping(a, b, minusOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.mul = (a, b) => {
    const mulOp = (d1, d2) => d1 * d2;
    const mapping = validateOps(a, b);
    let value = mapping(a, b, mulOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.div = (a, b) => {
    const divOp = (d1, d2) => d1 / d2;
    const mapping = validateOps(a, b);
    let value = mapping(a, b, divOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.get = function (idxs) {
    return 0;
};

numberjs.prototype.set = function (idxs, value) {
    return 0;
};

numberjs.prototype.dot = function (A, B) {
    //currently only support 2 dim
    for (axis in rangeGenerator(A.shape[0])) {}
};

function Numberjs(shape, value) {
    return new numberjs(shape, value);
}
module.exports = Numberjs;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(58);
var math = __webpack_require__(92);
var Array;
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