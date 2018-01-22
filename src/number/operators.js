"use strict";
const nd = require('./ndarray');
const GradOps = require('./autograd/gradOps');
const Number = require('./number');

const Operators = {}

if (typeof module !== 'undefined') {
  module.exports   = Operators;
} 
if (typeof window !== 'undefined') {
  window.Operators = Operators;
}

Operators.dot = (nbA,nbB, stopGrad, prefix)=>{
  stopGrad = stopGrad?stopGrad:false;
  const _dot$1d = (sA, sB, nS)=>{
    let newShape = [1], newValue = new Float32Array(1);
    for(let v = 0; v < nS; v++){
      newValue[0] += nbA.value[v]*nbB.value[v];  
    }
    return Number(newValue, newShape);
  }
  const _dot$2d = (sA, sB, nS, pA, pB)=>{
    let newShape = [ sA[0],sB[1] ];
    let newValue = new Float32Array( nd.getVolume(newShape) );
    const selector = newShape.map(d=>[0,d,1]);
    for(let px of nd.indexGenerator(selector, nd.getSpace(newShape) ) ){
      let aVx  = 0, bVx = 0, vx = px.vx, r = px.idx[0], c = px.idx[1];
      for(let v = 0; v < nS; v += 1){
        aVx = r*pA[0] + v;
        bVx = c + v*pB[0];
        newValue[vx] += nbA.value[aVx]*nbB.value[bVx];
      }
    } 
    return Number(newValue, newShape);
  }
  const _checkShapeThenRun = (ndA, ndB)=>{
    const sA = nbA.shape, sB = nbB.shape;
    const pA = nbA.space, pB = nbB.space;
    if(sA.length==1 && sB.length==1){
      const nS = sA[0]===sB[0]?sA[0]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      return _dot$1d(sA, sB, nS);
    }
    else if(sA.length==2 && sA.length==2){
      const nS = sA[1]===sB[0]?sA[1]:null;
      return _dot$2d(sA, sB, nS, pA, pB);
    }
    else if(sA.length>2 && sB.length ==2){
      const sA$l = sA.length;
      const nS = sA[sA$l - 1]===sB[0]?sA[sA$l - 1]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      let newShape = [ ...sA.slice(0,-1), sB[1] ];
      let newValue = new Float32Array( nd.getVolume(newShape) );
      let ret = Number(newValue, newShape);   
      console.log('newShape', newShape);
      let selector = sA.map((d,i)=>(i < (sA$l - 2))?[0,d,1]:d);
      let leftSelect;
      for(let px of nd.indexGenerator(selector, sA)){
        leftSelect = px.idx.slice(0,-2).join(',') + ',:,:';
        console.warn('loop', leftSelect);
        console.warn(ndA[leftSelect]);
        let _innerRet = Operators.dot(ndA[leftSelect], ndB);
        ret[leftSelect] = _innerRet;
      }
    }
    else if(sA.length>2 && sB.length >2){
      throw Error( 'not implement' );
    }
    else{
      throw Error( 'shape not consitent' );
    }
  }

  let ret = _checkShapeThenRun(nbA, nbB);
  
  // if(stopGrad===false && GradOps.dot){
  //   console.warn('go there')
  //   ret = GradOps.dot(ret, [nbA,nbB]);
  // }
  return ret;
};


Operators.T = (nbA, stopGrad)=>{
  // validateDotShape(a.shape,b.shape);
  stopGrad = stopGrad?stopGrad:false;
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

Operators.pow = (nd, hat, stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  let newValue = nd.value.map(d=>Math.pow(d,hat));
  let ret = Number(newValue, nd.shape);
  if(stopGrad===false && GradOps.pow){
    ret = GradOps.pow(ret, nd, hat);
  }
  console.warn(ret);
  return ret;
}

Operators.exp = (nd, stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  let newValue = nd.value.map(d=>Math.exp(d));
  let ret      = Number(newValue, nd.shape);
  if(nd.grad){
    ret.grad = [{ father: nd.grad, 
      vjp_op: (x)=>Math.exp(x) }]
  }
  return ret;
}

Operators.tanh = (nd, stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  let newValue = nd.value.map(d=>Math.tanh(d));
  let ret      = Number(newValue, nd.shape);
  if(GradOps.tanh){
    ret = GradOps.tanh(ret, nd);
  }
  return ret;
}

Operators.sigmoid = (nd,stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  let newValue = nd.value.map(d=>0.5*(Math.tanh(d)+1.0));

  return Number(newValue, nd.shape);
}

Operators.relu = (nd,stopGrad)=>{
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
  // console.warn(typeof nbA, typeof valB);
  if( Number().isNumber(nbA) && typeof valB === 'number' ){
    return numMapping;
  }
  if( Number().isNumber(nbA) && Number().isNumber(valB) ){
    return vecMapping;
  }
  throw Error('invalide object type');
}

Operators.add = (a,b,stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  const addOp   = (d1,d2)=>d1+d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, addOp);
  let ret = Number(newValue, a.shape);
  if(stopGrad===false && GradOps.add){
    ret = GradOps.add(ret, [a,b]);
  }
  return ret;
};

Operators.minus = (a,b,stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  const minusOp = (d1,d2)=>d1-d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, minusOp);
  let ret = Number(newValue, a.shape);
  if(stopGrad===false && GradOps.minus){
    ret = GradOps.minus(ret, [a,b]);
  }
  return ret;
};

Operators.mul = (a,b,stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  const mulOp   = (d1,d2)=>d1*d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, mulOp);        
  return Number(newValue, a.shape);  
};

Operators.div = (a,b,stopGrad)=>{
  stopGrad = stopGrad?stopGrad:false;
  const divOp   = (d1,d2)=>d1/d2;
  const mapping = validateOps(a,b);
  let newValue  = mapping(a, b, divOp);     
  return Number(newValue, a.shape);
};