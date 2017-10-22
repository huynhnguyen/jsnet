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
Operators.prototype.dotF = function(nbA,nbB){
  // validateDotShape(a.shape,b.shape);
  const sA = nbA.shape, sB = nbB.shape;
  let newShape = sA.slice(0,-1).concat(sB.slice(-1))
  let newValue = new Float32Array(nd.getVolume(newShape));
  const selector = newShape.map(d=>[0,d,1]);
  for(let [px,c] of nd.enummerate( nd.indexGenerator(selector, nd.getSpace(newShape)) ) ){
      // const idx = px.idx, vx = px.vx;
      // let aSelector = idx.map((d,i,_idx)=>(i != _idx.length-1)?d:[0,sA[i],1]);
      // let bSelector = idx.map((d,i,_idx)=>(i != _idx.length-2)?d:[0,sB[i],1]);
      // // console.log(idx,vx,aSelector,bSelector);
      // let aV = [],bV = [];
      // for( let apx of nd.indexGenerator(aSelector, nbA.space) ){
      //   // Log(['aLog', ''+apx.idx, apx.c, a.value[apx.vx]]);
      //   aV.push(nbA.value[apx.vx]);
      // };
      // for( let bpx of nd.indexGenerator(bSelector, nbB.space) ){
      //   // Log(['bLog', ''+bpx.idx, bpx.c, b.value[bpx.vx]]);
      //   bV.push(nbB.value[bpx.vx]);
      // };
      // newValue[c] = aV.reduce((tt,a,i)=>tt+aV[i]*bV[i],0);
  }
  return Number(newValue, newShape);
};
Operators.dot = function(nbA,nbB){
    // validateDotShape(a.shape,b.shape);
    const sA = nbA.shape, sB = nbB.shape;
    let newShape = sA.slice(0,-1).concat(sB.slice(-1))
    let newValue = new Float32Array(nd.getVolume(newShape));
    // console.log(['newShape', newShape]);
    // console.log(nbA.value, nbA.space);
    // console.log(nbB.value, nbB.space);
    
    const selector = newShape.map(d=>[0,d,1]);
    for(let [px,c] of nd.enummerate( nd.indexGenerator(selector, nd.getSpace(newShape)) ) ){
      const idx = px.idx, vx = px.vx;
      let aSelector = idx.map((d,i,_idx)=>(i != _idx.length-1)?d:[0,sA[i],1]);
      let bSelector = idx.map((d,i,_idx)=>(i != _idx.length-2)?d:[0,sB[i],1]);
      let aV = [],bV = [];
      for( let apx of nd.indexGenerator(aSelector, nbA.space) ){
        aV.push(nbA.value[apx.vx]);
      };
      for( let bpx of nd.indexGenerator(bSelector, nbB.space) ){
        bV.push(nbB.value[bpx.vx]);
      };
      newValue[c] = aV.reduce((tt,a,i)=>tt+aV[i]*bV[i],0);
  }
  return Number(newValue, newShape);
};

Operators.T = function(nbA){
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