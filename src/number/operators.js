"use strict";
const nd = require('./ndarray');
const Number = require('./number');

const Operators = {}

if (typeof module !== 'undefined') {
  module.exports   = Operators;
} 
if (typeof window !== 'undefined') {
  window.Operators = Operators;
}

Operators.dot = function(nbA,nbB){
    const sA = nbA.shape, sB = nbB.shape;
    const pA = nbA.space, pB = nbB.space;

    if( sA.length==1 && sB.length==1){
      let newShape = [1];
      let newValue = new Float32Array(1);
      const nS = sA[0]===sB[0]?sA[0]:null;
      if(nS===null){ throw Error('shape not consitent') }  
      for(let v = 0; v < nS;v++){
        newValue[0] += nbA.value[v]*nbB.value[v];  
      }
      return Number(newValue, newShape);
    }
    let newShape = sA.slice(0,-1).concat( sB.slice(-1) );
    let newValue = new Float32Array(nd.getVolume(newShape));
    const selector = newShape.map(d=>[0,d,1]);

    const Aaxis = sA.length-1, Baxis = sB.length-2;
    const nS = sA[Aaxis]===sB[Baxis]?sA[Aaxis]:null;
    if(nS===null){ throw Error('shape not consitent') }
    for(let px of nd.indexGenerator(selector, nd.getSpace(newShape) ) ){
      let idx  = px.idx, vx = px.vx;
      let adx  = idx.slice(), bdx = idx.slice();
      let aV$_ = adx.reduce((s,d,i)=>(i==Aaxis)?s:s+d*pA[i], 0);
      let bV$_ = bdx.reduce((s,d,i)=>(i==Baxis)?s:s+d*pB[i], 0);
      let aVx  = 0, bVx = 0;
      for(let v = 0; v < nS; v += 1){
        aVx = aV$_ + v*pA[Aaxis];
        bVx = bV$_ + v*pB[Baxis];
        newValue[vx] += nbA.value[aVx]*nbB.value[bVx];
      }
  }
  return Number(newValue, newShape);
};

Operators.T = (nbA)=>{
    // validateDotShape(a.shape,b.shape);
    const sA = nbA.shape, space = nbA.space;
    let newShape = sA.slice().reverse();
    let newValue = new Float32Array(nd.getVolume(newShape));
    const selector = newShape.map(d=>[0,d,1]);
    for( let px of nd.indexGenerator(selector, nd.getSpace(newShape)) ){
      const idx = px.idx, vx = px.vx;
      const rvx = idx.slice().reverse().reduce((s,d,i)=>s+d*space[i],0);
      newValue[vx] = nbA.value[rvx];
  }
  return Number(newValue, newShape);
};

Operators.pow = (nd, hat)=>{
  let newValue = nd.value.map(d=>Math.pow(d,hat));
  return Number(newValue, nd.shape);
}

Operators.exp = (nd)=>{
  let newValue = nd.value.map(d=>Math.exp(d));
  let ret      = Number(newValue, nd.shape);
  if(nd.grad){
    ret.grad = [{ father: nd.grad, 
      vjp_op: (x)=>Math.exp(x) }]
  }
  return ret;
}

Operators.tanh = (nd)=>{
  let newValue = nd.value.map(d=>Math.tanh(d));
  let ret      = Number(newValue, nd.shape);
  if(nd.grad){
    const vjp_op = (x)=>1 - Math.pow(Math.tanh(x),2)
    ret.grad = [{ bw: nd, vid: nd.vid,
                  vjp: Number(nd.value.map(d=>vjp_op(d)), nd.shape)}]
  }
  return ret;
}

Operators.sigmoid = (nd)=>{
  let newValue = nd.value.map(d=>0.5*(Math.tanh(d)+1.0));

  return Number(newValue, nd.shape);
}

Operators.relu = (a)=>{
  throw Error('not implement');
};

const validateOps = (nbA, valB)=>{
  const vecMapping = (ndA, ndB, ops)=>{
    let vA = ndA.value, vB = ndB.value;
    return vA.map((d,i)=>ops(vA[i], vB[i]));
  }

  const numMapping = (ndA, vB, ops)=>{
    let vA = ndA.value;
    return vA.map((d,i)=>ops(d,vB));
  }
  console.warn(typeof nbA, typeof valB);
  if( Number().isNumber(nbA) && typeof valB === 'number' ){
    return numMapping;
  }
  if( Number().isNumber(nbA) && Number().isNumber(valB) ){
    return vecMapping;
  }
  throw Error('invalide object type');
}

Operators.add = (a,b)=>{
  
  const addOp   = (d1,d2)=>d1+d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, addOp);
  return Number(newValue, a.shape);
};

Operators.minus = (a,b)=>{
  const minusOp = (d1,d2)=>d1-d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, minusOp);
  return Number(newValue, a.shape);
};

Operators.mul = (a,b)=>{
  const mulOp   = (d1,d2)=>d1*d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, mulOp);        
  return Number(newValue, a.shape);  
};

Operators.div = (a,b)=>{
  const divOp   = (d1,d2)=>d1/d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, divOp);     
  return Number(newValue, a.shape);
};