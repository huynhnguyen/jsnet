"use strict";
const nd = require('./ndarray');
const Numb = require('./numb');

const Operators = {};

Operators.dot = (nbA,nbB)=>{
  const _dot$1d = (sA, sB, nS)=>{
    let newShape = [1], newValue = new Float32Array(1);
    for(let v = 0; v < nS; v++){
      newValue[0] += nbA.value[v]*nbB.value[v];  
    }
    return Numb(newValue, newShape);
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
    return Numb(newValue, newShape);
  }
  const _checkShapeThenRun2 = (ndA, ndB)=>{
    const sA = nbA.shape, sB = nbB.shape;
    const pA = nbA.space, pB = nbB.space;
    if(sA.length == 1 && sB.length == 1){
      const nS = sA[0]===sB[0]?sA[0]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      return _dot$1d(sA, sB, nS);
    }
    else if(sA.length == 2 && sA.length == 2){
      const nS = sA[1]===sB[0]?sA[1]:null;
      return _dot$2d(sA, sB, nS, pA, pB);
    }
    else if(sA.length > 2 && sB.length == 2){
      const sA$l = sA.length;
      const nS = sA[sA$l - 1]===sB[0]?sA[sA$l - 1]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      let newShape = [ ...sA.slice(0,-1), sB[1] ];
      let newValue = new Float32Array( nd.getVolume(newShape) );
      let ret = Numb(newValue, newShape);   
      // console.log('newShape', newShape);
      let selector = sA.map((d,i)=>(i < (sA$l - 2))?[0,d,1]:d);
      let leftSelect;
      for(let px of nd.indexGenerator(selector, sA)){
        leftSelect = px.idx.slice(0,-2).join(',') + ',:,:';
        // console.warn('loop', leftSelect);
        // console.warn(ndA.v[leftSelect]);
        let _innerRet = Operators.dot(ndA.v[leftSelect], ndB);
        // console.warn(_innerRet);
        ret.v[leftSelect] = _innerRet;
      }
      return ret;
    }
    // else if(sA.length == 2 && sB.length == 2){
    //   const sA$l = sA.length;
    //   const nS = sA[sA$l - 1]===sB[0]?sA[sA$l - 1]:null;
    //   if(nS===null){ throw Error( 'shape not consitent' ) }  
    //   let newShape = [ ...sA.slice(0,-1), sB[1] ];
    //   let newValue = new Float32Array( nd.getVolume(newShape) );
    //   let ret = Numb(newValue, newShape);   
    //   // console.log('newShape', newShape);
    //   let selector = sA.map((d,i)=>(i < (sA$l - 2))?[0,d,1]:d);
    //   let leftSelect;
    //   for(let px of nd.indexGenerator(selector, sA)){
    //     leftSelect = px.idx.slice(0,-2).join(',') + ',:,:';
    //     // console.warn('loop', leftSelect);
    //     // console.warn(ndA.v[leftSelect]);
    //     let _innerRet = Operators.dot(ndA.v[leftSelect], ndB);
    //     // console.warn(_innerRet);
    //     ret.v[leftSelect] = _innerRet;
    //   }
    //   return ret;
    // }
    else if(sA.length > 2 && sB.length > 2){
      const sA$l = sA.length, sB$l = sB.length;
      const nS = sA[sA$l - 1]===sB[sB$l - 2]?sA[sA$l - 1]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      let newShape = [  ...sA.slice(0,-1), 
                        ...sB.slice(0,-2), 
                        ...sB.slice(-1)   ];
      let newValue = new Float32Array( nd.getVolume(newShape) );
      let ret = Numb(newValue, newShape);   
      // console.log('newShape', newShape);
      let leftSelector  = sA.map((d,i)=>(i<(sA$l-2))?[0,d,1]:d);
      let rightSelector = sB.map((d,i)=>(i<(sB$l-2))?[0,d,1]:d);
      let leftSelect, rightSelect, select;
      for(let lpx of nd.indexGenerator(leftSelector, sA)){
        leftSelect = lpx.idx.slice(0,-2).join(',');
        for(let rpx of nd.indexGenerator(rightSelector, sB)){
          rightSelect = rpx.idx.slice(0,-2).join(',');
          select = leftSelect +',:,' + rightSelect + ',:';
          // console.warn('loop', leftSelect, rightSelect, select);  
          let _innerRet = Operators.dot(ndA.v[leftSelect], 
                                      ndB.v[rightSelect]);
          // console.warn(_innerRet);
          ret.v[select] = _innerRet;
        }
      }
      return ret;
    }
    else{
      throw Error( 'shape not consitent' );
    }
  }

  const _checkShapeThenRun = (nbA, nbB)=>{
    const sA = nbA.shape, sB = nbB.shape;
    const pA = nbA.space, pB = nbB.space;
    if(sA.length == 1 && sB.length == 1){
      const nS = sA[0]===sB[0]?sA[0]:null;
      if(nS===null){ throw Error( 'shape not consitent' ) }  
      return _dot$1d(sA, sB, nS);
    }
    else if(sA.length == 2 && sA.length == 2){
      const nS = sA[1]===sB[0]?sA[1]:null;
      return _dot$2d(sA, sB, nS, pA, pB);
    }
  }

  let ret = _checkShapeThenRun2(nbA, nbB);
  return ret;
};


Operators.T = (nbA, axis)=>{
  // validateDotShape(a.shape,b.shape);
  const sA = nbA.shape;
  let newShape = sA.slice(), rAxisMap;//mapping from T axis to origin axis
  axis = axis?axis:null;
  if( axis ){
    [newShape, rAxisMap ] = newShape.reduce((ss_ridx,d,i)=>{
      let [ss, raxis ] = ss_ridx;
      ss[ axis.indexOf(i) ] = d;
      raxis[ axis.indexOf(i) ] = i;
      return [ss, raxis];
    },[axis.slice(),{}])
  }
  else{
    newShape = newShape.reverse();
  }
  if( nd.getVolume(newShape) !== nd.getVolume(sA) ){ throw Error('shape not consistent') };
  let newValue = new Float32Array(nd.getVolume(newShape));
  const selector = newShape.map(d=>[0,d,1]);
  const space = nbA.space;
  for( let px of nd.indexGenerator(selector, nd.getSpace(newShape)) ){
    const idx = px.idx, vx = px.vx;
    let  ridx = idx.slice();
    if( axis ){ //TODO: improve this code
      ridx = ridx.reduce((ss,d,i)=>{
        ss[ rAxisMap[i] ] = d;
        return ss;
      }, idx.slice());
    }
    else{  ridx = ridx.reverse();  }
    const rvx = ridx.reduce((s,d,i)=>s+d*space[i],0);
    newValue[vx] = nbA.value[rvx];
  }
  return Numb(newValue, newShape);
};

Operators.pow = (nd, hat )=>{
  let newValue = nd.value.map(d=>Math.pow(d,hat));
  let ret = Numb(newValue, nd.shape);
  return ret;
}

Operators.exp = (nd )=>{
  let newValue = nd.value.map(d=>Math.exp(d));
  let ret      = Numb(newValue, nd.shape);
  return ret;
}

Operators.tanh = (nd )=>{
  let newValue = nd.value.map(d=>Math.tanh(d));
  let ret      = Numb(newValue, nd.shape);
  return ret;
}

Operators.sigmoid = (nd)=>{
  throw Error('not implement');
  return Numb(newValue, nd.shape);
}

Operators.relu = (nd,)=>{
  throw Error('not implement');
};

const validateOps = (nbA, valB)=>{
  const vecMapping = (nbA, nbB, ops)=>{
    let vA = nbA.value, vB = nbB.value;
    return vA.map((d,i)=>ops(vA[i], vB[i]));
  }

  const numMapping = (nbA, vB, ops)=>{
    let vA = nbA.value;
    return vA.map((d,i)=>ops(d,vB));
  }
  const numMapping$2case1 = (nbA, nbB, ops)=>{
    let vA = nbA.value;
    return vA.map((d,i)=>ops(d,nbB.value[0]));
  }
  const numMapping$2case2 = (nbA, nbB, ops)=>{
    let vB = nbB.value;
    return vB.map((d,i)=>ops(d,nbA.value[0]));
  }
  // console.warn(typeof nbA, typeof valB);
  if( Numb().isNumb(nbA) && typeof valB === 'numb' ){
    return [numMapping, nbA.shape];
  }
  if( Numb().isNumb(nbA) && Numb().isNumb(valB) ){
    let nbB = valB;
    if(nbB.value.length == 1){
      return [numMapping$2case1, nbA.shape];
    }
    else if(nbA.value.length == 1){
      return [numMapping$2case2, nbB.shape];
    }
    else{
      return [vecMapping, nbA.shape];
    }
  }
  throw Error('invalide object type');
}

Operators.add = (a,b)=>{
  const addOp   = (d1,d2)=>d1+d2;
  const [mapping, newShape] = validateOps(a,b);
  let newValue  = mapping(a, b, addOp);
  let ret = Numb(newValue, newShape);
  return ret;
};

Operators.minus = (a,b)=>{
  const minusOp = (d1,d2)=>d1-d2;
  const [mapping, newShape] = validateOps(a,b);
  let newValue  = mapping(a, b, minusOp);
  let ret = Numb(newValue, newShape);
  return ret;
};

Operators.mul = (a,b)=>{
  const mulOp   = (d1,d2)=>d1*d2;
  const [mapping, newShape] = validateOps(a,b);
  let newValue  = mapping(a, b, mulOp);
  return Numb(newValue, newShape);  
};

Operators.div = (a,b)=>{
  const divOp   = (d1,d2)=>d1/d2;
  const [mapping, newShape] = validateOps(a,b);
  let newValue  = mapping(a, b, divOp);     
  return Numb(newValue, newShape);
};

Operators.mean = (nbA, axis)=>{
  //TODO: implement for axis selector
  axis = axis?axis:null;
  let ret;
  if(axis === null){
    const ll = nbA.value.length;
    let newShape = [1];
    let newValue = new Float32Array( nd.getVolume(newShape) );
    newValue[0] = nbA.value.reduce((s,v)=>s += v, 0)/ll;
    ret = Numb( newValue, newShape );
  }
  else{
    let [newShape, selector] = nbA.shape.map((d,i)=> i!==axis?0:[0,d,1]);
    // for( px of nd.axisGenerator([0,2],nd.getSpace()) ){
    //   let idx = pdx.idx; 

    // }
    ret = Numb(newValue, newShape);
  }
  return ret;  
}

Operators.reduce = (nbA, aixs)=>{

}

if (typeof module !== 'undefined') {
  module.exports   = Operators;
} 
if (typeof window !== 'undefined') {
  window.Operators = Operators;
}