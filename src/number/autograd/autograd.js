"use strict";
const nd = require('../ndarray');
const Ops  = require('../operators');
const Number = require('../number');
const GradOps = require('./gradOps');


const deepClone = (data)=> data?JSON.parse(JSON.stringify(data)):null;

const Autograd = {};

if (typeof module !== 'undefined') {
  module.exports   = Autograd;
} 
if (typeof window !== 'undefined') {
  window.Autograd = Autograd;
}

const chainDebug = (outputGrad, inputGrads, debug)=>{
  if(debug){
    let indent = '\t';
    for(let i = 0; i< debug; i++){
      indent += '\t';
    }
    debug.level += 1;
    console.warn( indent, '[level]', debug.level );  
    console.warn( indent, '[output]', outputGrad.value );
    if(inputGrads){
      for(let g of inputGrads){
        if(g.bw){
          console.warn( indent,'[inputs]', g.vid, g.bw.value );   
        } 
      }
    }
    else{
      console.warn(indent, '[end of chain]');
    }
  }
}
const backward = (outputGrad, inputGrads, debug)=>{
  chainDebug(outputGrad, inputGrads, debug);
  const filterAndFlatten = (g)=>{
    return g.filter( d=>d )
      .reduce( (ss,d)=>{ return [...ss,...(d.length?d:[d])]; }, [] );
  }
  const runVJP = (outputGrad, nb, vjp)=>{
    // console.warn(vjp);
    return vjp?vjp(outputGrad, nb):outputGrad;
  }
  const runTransformBW = (outputGrad, inputGrads, transform)=>{
    console.warn('transform', outputGrad.transformRet)
    return transform?transform(outputGrad, inputGrads): outputGrad;
  }
  const runBackWard = (outputGrad, inputGrads)=>{
    if(inputGrads){
      let bwNb = runTransformBW(outputGrad, inputGrads, outputGrad.transformRet); 
      let preGrads = inputGrads.map( (g, idx) => {
                let bw = g.bw, vjp = g.vjp, vid = g.vid;
                let bwGrad = runVJP(bwNb, bw, vjp);
                bwGrad.vid = vid;
                if(bw){///recursive  
                  return backward( bwGrad, bw.grad, deepClone(debug) ); 
                }
                else{ return bwGrad; }
              } );
      let postGrads = filterAndFlatten(preGrads);
      return postGrads;
    } 
    else{
      return outputGrad;
    }
  }
  let ret = runBackWard(outputGrad, inputGrads);
  // console.warn( ret );
  return ret;
}

Autograd.Operators = {};
for(let opName in Ops){
  const _OpFunc = Ops[opName];
  const appendGradOp = (...inputs)=>{
    let stopGrad = false;
    const [ last ] = inputs.slice(-1);
    if(typeof last === 'boolean'){
      stopGrad = last;//either true or false
      inputs = inputs.slice(0,-1);
    }
    let ret = _OpFunc(...inputs);
    if(stopGrad === true){
      return ret;
    }
    else{
      if(GradOps[opName] === undefined){
        throw Error(`gradOp[${opName}] Not implement`);
      }
      ret = GradOps[opName](ret, ...inputs);
      return ret;
    }
  }
  Autograd.Operators[opName] = appendGradOp
}

Autograd.grad = function(func){
  const wrapper = (...inputs)=>{
    for( let [nd$0, c] of nd.enummerate(inputs) ) {
      if(Number().isNumber(nd$0) && nd$0.grad !== false){
        nd$0.grad = [{ vid: c, bw: null, vjp:null}];
      }
    }
    let nd$out   = func(...inputs);
    nd$out.value = nd$out.value.map(d=>1);//reset value to 1
    let debug = { level:0 };
    let _nds$grad = backward( nd$out, nd$out.grad, debug);
    let _nds$gradSum  = _nds$grad.reduce((ss,g)=>{
        const _vid = g.vid;
        ss[_vid] = ss[_vid]?Ops.add(ss[_vid], g, NoGrad):g;  
        return ss;
      },{})
    // console.warn( _nds$gradSum );
    let nds$grad = Object.values( _nds$gradSum );
    // console.warn( nds$grad );
    return nds$grad;
  }
  return wrapper;
}

Autograd.backward = backward;