var _ = require('underscore');
var Helper = require('./skynet_helper');
Log = Helper().logger;

function *rangeGenerator(start, end, step){
    let i = start, e = end, st = step;
    for(; i < e; i += st){
        yield i;
    }
}

const range = (start, end, step)=>{
    let _range = [];
    const s = start, e = end, st = step|1; 
    for(let v of rangeGenerator(s, e, st)){
        _range.push(v);
    }
    return _range;
}

const validateShape = (shapeA, shapeB)=>{
    if(''+shapeA !== ''+shapeB){
        throw Error('shape not consistent');
    }
}

const clone = (refValue)=>{
    return (refValue instanceof Array)?
        Object.assign([],refValue):Object.assign({},refValue);
}

const getVolume = (shape)=>{
    return shape.reduce((a,b)=>a*b);
}

const convertSelector = (vals,shape)=>{
    let converted;
    if(typeof vals === 'number'){
        converted = shape.map(d=>null);
        converted[0] = (vals>0)?vals:shape[0] + vals;
    }
    if(typeof vals === 'string'){
        converted = vals.split(',').map((v,i)=>{
            if(v!==''){ return +v>0?+v:+v+shape[i]}
            else{ return null }
        });
    }
    return converted;
}

Selector = {
  get:function(d, select){
    let value = d[0], shape = d[1];
    console.log(d,idxs);
  },
  set:function(d, select,v){
    let value = d[0], shape = d[1];
    console.log(a,idxs,v);
  }
}

function numberjs(shape, value){
    // TODO: support more than 2d array
    this.shape  = clone(shape);
    this.volume = getVolume(shape);
    // this.mulup = size.map((d,i)=> i>0?size[i] + size[i-1]:size[i]);
    this.value   = value || new Float32Array(this.volume);
    this.version = 0.1;

}

numberjs.prototype.tolist = function(){
    Log(this.value);
    let list = this.shape.reverse().reduce((l,s)=>{
      ll = l.reduce(
        (d,v)=>{
          d.tmp.push(v);
          if(d.tmp.length===s){
            d.t.push(d.tmp);
            d.tmp = [];
          }
          return d;
        },{t:[],tmp:[]});
      return ll.t;
    }, this.value)[0];
    return list;
}

numberjs.prototype.reshape = function(newShape){
    validateShape(this.shape, newShape);    
    this.shape = clone(newShape);
    return this;
};

numberjs.prototype.tanh = (a)=>{
    let val = a.value.map(d=>Math.tanh(d));
    return new numberjs(a.shape,val);
}

numberjs.prototype.relu = (a)=>{
    throw 'not implement';
};

numberjs.prototype.sigmoid = (a)=>{
    val = a.value.map(d=>0.5*(Math.tanh(d)+1.0));
    return new numberjs(a.shape,val);
}

numberjs.prototype.transpose = function(){
    this.shape = this.shape.reverse(); 
    return 'transpose';
}
const vecMapping = (vA, vB, ops)=>{
    validateShape(vA.shape, vB.shape);
    return vA.map((d,i)=>ops(vA[i],yB[i]));
}

const numMapping = (vA, n, ops)=>{
    return vA.map((d,i)=>ops(vA,n));
}

const validateOps = (objA, objB)=>{
    if(   objA instanceof 'numberjs' 
       && objB instanceof 'numberjs' ){
        return vecMapping;
    }
    if(   objA instanceof 'numberjs' 
       && objB instanceof 'number' ){
        return numMapping;
    }
    throw Error('invalide objet input');
}

numberjs.prototype.add = (a,b)=>{
    const addOp   = (d1,d2)=>d1+d2;
    const mapping = validateOps(a,b);
    let value = mapping(a, b, addOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.minus = (a,b)=>{
    const minusOp = (d1,d2)=>d1-d2;
    const mapping = validateOps(a,b);
    let value = mapping(a, b, minusOp);
    return new numberjs(a.shape, value);
};

numberjs.prototype.mul = (a,b)=>{
    const mulOp   = (d1,d2)=>d1*d2;
    const mapping = validateOps(a,b);
    let value = mapping(a, b, mulOp);        
    return new numberjs(a.shape, value);  
};

numberjs.prototype.div = (a,b)=>{
    const divOp   = (d1,d2)=>d1/d2;
    const mapping = validateOps(a,b);
    let value = mapping(a, b, divOp);     
    return new numberjs(a.shape, value);
};

numberjs.prototype.get = function(idxs){
    return 0;
};

numberjs.prototype.set = function(idxs, value){
    return 0;
};

numberjs.prototype.dot = function(A,B){
    //currently only support 2 dim
    for(axis in rangeGenerator(A.shape[0])){

    }
};


function Numberjs(shape, value){
    return new numberjs(shape, value);
}
module.exports = Numberjs;