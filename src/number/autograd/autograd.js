"use strict";
const nd = require('../ndarray');
const Ops  = require('../operators');
const Number = require('../number');

const deepClone = (data)=> data?JSON.parse(JSON.stringify(data)):null;

const Autograd = {};

if (typeof module !== 'undefined') {
  module.exports   = Autograd;
} 
if (typeof window !== 'undefined') {
  window.Autograd = Autograd;
}

const NoGrad = true;

const backward = (nd$child, nd$pDiff, debug)=>{
  const grad = nd$child.grad;
  
  if(debug){
    console.warn('backward', debug);  
    console.table(debug);
    console.warn(grad);
    debug.level += 1;
  }
  if(grad == null){
    return nd$pDiff;
  } 
  else{
    let _grad = grad.map( g => {
          if(g===false) { return null }
          if(g.bw===null || g.vjp===null) {
            nd$pDiff.vid = g.vid;
            return nd$pDiff;
          } else {
            console.warn( Ops.T(g.vjp).shape, nd$pDiff.shape );
            // let nd$diff = Ops.dot(Ops.T(nd$pDiff),g.vjp, NoGrad);
            let nd$diff;
            if(g.elementWise){
              nd$diff = Ops.mul( nd$pDiff, g.vjp, NoGrad );
            }
            else{
              if(g.order == 0){
                nd$diff = Ops.dot( nd$pDiff, Ops.T(g.vjp), NoGrad );  
              }
              else{
                nd$diff = Ops.dot( Ops.T(g.vjp), nd$pDiff, NoGrad );    
              }
            }
            
            return backward( g.bw, nd$diff, deepClone(debug) ); 
          }
        })
        .filter( d=>d )
        .reduce( (ss,d)=>{
          if(d.length){
            return [...ss,...d];  
          }
          else{
            return [...ss,d];  
          }
        }, [] );
    return _grad;
  }
}

Autograd.grad = function(func){
  const wrapper = (...inputs)=>{
    for( let [nd$0, c] of nd.enummerate(inputs) ) {
      if(Number().isNumber(nd$0) && nd$0.grad !== false){
        nd$0.grad = [{ vid: c, bw: null, vjp:null}];
      }
    }
    let nd$ret   = func(...inputs);
    //reset value to 1
    nd$ret.value = nd$ret.value.map(d=>1);
    
    let debug    = {level:0}
    let _nds$grad     = backward( nd$ret, nd$ret , debug);
    let _nds$gradSum  = _nds$grad.reduce((ss,g)=>{
        const _vid = g.vid;
        // console.warn(_vid, ss[_vid]);
        if(ss[_vid]){  
          ss[_vid] = Ops.add(ss[_vid], g, NoGrad);  
        } 
        else {  
          ss[_vid] = g;  
        }
        return ss;
      },{})
    let nds$grad = Object.values( _nds$gradSum );
    // console.table( nds$grad );
    return [nds$grad, nd$ret];
  }
  return wrapper;
}

Autograd.backward = backward;