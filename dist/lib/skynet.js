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

const Net = __webpack_require__(152);
const Helper = __webpack_require__(153);
const Numberjs = __webpack_require__(91);

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

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(71);
var nb = __webpack_require__(91);
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

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(71);
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
// module.exports = Immutable;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(71);
var Helper = __webpack_require__(153);
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
// Log('[statTest] range')
// s = new Date();
// Log(range(0,1000,1).length === 1000);
// r = new Date() - s;
// Log('[endTest] runtime '+r+' ms');

//*Immutable function*
const reverse = arr => arr.slice().reverse();
const set = (arr, i, key, value) => {
    let arrNew = arr.slice();
    const idx = remapIndex(i, arrNew.length);
    if (key) {
        arrNewkey[idx].key = value;
    } else {
        arrNewkey[idx] = value;
    }
    return arrNew;
};
const get = (arr, i, key) => key ? arr.slice(i, i + 1)[0][key] : arr.slice(i, i + 1)[0];
const getFirst = (arr, key) => key ? arr.slice(0, 1)[0][key] : arr.slice(0, 1)[0];
const getLast = (arr, key) => key ? arr.slice(-1)[0][key] : arr.slice(-1)[0];
const clone = refValue => {
    return refValue instanceof Array ? Object.assign([], refValue) : Object.assign({}, refValue);
};

const validateShape = (shapeA, shapeB) => {
    if ('' + shapeA !== '' + shapeB) {
        throw Error('shape not consistent');
    }
};

const getVolume = shape => shape.reduce((a, b) => a * b);
const ShAndVol = shape => {
    vol = reverse(shape).reduce((cs, d, i, sh) => cs.concat(i > 0 ? getLast(cs) * sh[i - 1] : 1), []).reverse();
    return shape.map((d, i) => {
        return { sp: d, vol: vol[i] };
    });
};
// Log('[statTest] ShAndVol')
// s = new Date();
// Log(ShAndVol([2,2,3])); //
// r = new Date() - s;
// Log('[endTest] runtime '+r+' ms')

const remapIndex = (idx, s) => {
    idx = idx > -1 ? idx : s + idx;
    if (idx < 0 || idx >= s) {
        throw Error('index invalid');
    } else {
        return idx;
    }
};
// Log('[statTest] remapIndex')
// s = new Date();
// Log(remapIndex(0,4)); //0
// Log(remapIndex(-5,4)); //error
// r = new Date() - s;
// Log(`[endTest] runtime ${r} ms`)

const remapSelect = (sval, shape) => {
    //numpy like selector
    vsp = sval.split(',');
    if (vsp.length > shape.length) {
        throw Error('selector is not consitent with shape');
    }
    select = shape.map((s, i) => {
        let v = i < vsp.length ? vsp[i] : ':';
        if (v === ':') {
            return true;
        } else {
            return remapIndex(+v, s);
        }
    });
    return select.map(d => d === true ? d : range(d, d + 1, 1));
};
// Log('[statTest] remapSelect')
// s = new Date();
// Log(remapSelect('-1,:,2',[5,3,4])); //[[4],true,[2]]
// Log(remapSelect('-1',[5,3,4])); //[[4],true,[2]]
// r = new Date() - s;
// Log('[endTest] runtime '+r+' ms');
const isSelected = (idx, selector) => selector.reduce((f, s, i) => f && (s === true ? true : s.indexOf(idx[i]) > -1), true);

// Log('[statTest] isSelected')
// s = new Date();
// Log(isSelected([0],[[1,2]])); //false
// Log(isSelected([1],[[1,2]])); //true
// Log(isSelected([1],[true]));  //true
// r = new Date() - s;
// Log('[endTest] runtime '+r+' ms')

function* indexGenerator(shape, selector, counter) {
    let i = 0,
        c = 0,
        vl = ShAndVol(shape),
        vol = getVolume(shape);
    selector = selector ? selector : [true];
    for (; i < vol; i++) {
        idx = vl.map(o => (i / o.vol | 0) % o.sp);
        if (isSelected(idx, selector)) {
            if (!counter) {
                yield idx;
            } else {
                yield { 'c': c, 'idx': idx };
                c += 1;
            }
        }
    }
}

Log('[statTest] indexGenerator');
s = new Date();
for (let idx of indexGenerator([2, 3], false, true)) {
    console.log(idx);
}
for (let idx of indexGenerator([2, 3], [[0]])) {
    Log(idx);
}
for (let idx of indexGenerator([2, 3], [[0]], true)) {
    Log(idx);
}
r = new Date() - s;
Log('[endTest] runtime ' + r + ' ms');

Selector = {
    get: function (d, selectString) {
        console.log(d);
        value = d.v, shape = d.s;
        selector = remapSelect(selectString, shape);
        console.log('selectMaped', selector);
        shapeNew = selector.map((d, i) => d === true ? shape[i] : d.length);
        console.log(shapeNew);
        valueNew = new Float32Array(getVolume(shapeNew));
        for (let px in indexGenerator(shape, selector, true)) {
            idx = px.idx, c = px.c;
            vx = reverse(idx).reduce((v, d, i) => v + d * shape[i]);
            valueNew[c] = value[vx];
        }
        return new numberjs(shapeNew, valueNew);
    },
    set: function (d, selectString, v) {
        let value = d[0],
            shape = d[1];
        select = convertSelector(select, shape);
        console.log(a, idxs, v);
    }
};

function numberjs(shape, value) {
    // TODO: support more than 2d array
    this.shape = clone(shape);
    console.log(this.shape);
    this.volume = getVolume(shape);
    this.value = value || new Float32Array(this.volume);
    this.version = 0.1;
    this.v = new Proxy({ v: this.value, s: this.shape }, Selector);
}

numberjs.prototype.tolist = function () {
    let list = reverse(this.shape).reduce((l, s) => {
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

numberjs.prototype.dot = function (A, B) {
    //currently only support 2 dim
    for (axis in rangeGenerator(A.shape[0])) {}
};

function Numberjs(shape, value) {
    return new numberjs(shape, value);
}
module.exports = Numberjs;

/***/ })

},[151]);
});
//# sourceMappingURL=skynet.js.map