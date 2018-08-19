"use strict";
const U = require('./ndarray_utils');
const T = require('./type');

const range = (fr, to, st=1)=>{
  let ret = [];
  if( st > 0 ){
    for(let c = fr; c <  to; c+=st ){ ret = [...ret, c]; }  
  }
  else{
    for(let c = fr; c >= to; c+=st ){ ret = [...ret, c]; }  
  }
  return ret;
}

const pIndex = (idx, size) => (idx>-1)?idx:size + idx 

const remapIndex = (idx,size) => {
  U.validateIndex(idx, size);
  return pIndex(idx, size);
}

const remapIndexRange = (sRange, size)=>{
  const getRangeFromString = (sRange, size)=>{
    let mm = sRange.match(/^:$|(-?\d+)?:?(-?\d+)?:?(-?\d+)?/);
    let [m, fr, to, st] = mm?mm:[0,0,0,0];//if match fail, return all zero
    if( m === ':' ){ [fr, to, st] = [0,size,1]; }
    else{
      st = st?T.int(st):1; 
      fr = fr?pIndex(T.int(fr), size):(st>0)?0:(size - 1);
      to = to?pIndex(T.int(to), size):(st>0)?size:0;
    }
    return [fr, to, st];  
  }
  let [fr, to, st] = getRangeFromString(sRange, size);
  U.validateIndexRange(fr, to, st, size);
  return [fr, to, st];
}


const remapSelect = (sval, shape)=>{
  //numpy like selector
  const vsp = sval.split(',');
  const select = shape.map( (size, i)=>{
    let idxRange = vsp[i]?vsp[i]:`0:${size}:1`;
    return T.isNumber(idxRange)?
      remapIndex(idxRange, size):remapIndexRange(idxRange, size);
  });
  return select;
}

const shapeSelector = {
    get: function(s, sel){
        const checkTypeThenRun = (s, sel)=>{
          if( typeof sel === 'symbol' || sel.match(/[a-z]/) ){ return s[sel]; }
          if( T.isNumber(sel) ){//T.T javascript 
            let pIdx = remapIndex(sel, s.length);
            return s[pIdx];
          }
          else{
            let [fr, to, st] = remapIndexRange(sel, s.length);
            let ret = range(fr, to, st).map(d=>s[d]);
            return ret;
          }
        }
        let ret = checkTypeThenRun(s, sel);
        return Array.isArray(ret)?shape(ret):ret;
    },
    set: function(s,sel,val){
        sel = T.int(sel) >= 0?sel:s.length + T.int(sel);
        s[sel] = val;
        return s;
    }
}

const shape = (sh)=>{
  let _sh = sh.slice();
  return new Proxy( _sh, shapeSelector );
}

const getShape  = (arr)=>(Array.isArray(arr))?
  [arr.length, ...getShape(arr[0])].filter(d=>d):[null];

const getSpace = (shape)=>shape.length==0?
		1:shape.reduceRight(
			(ss,d,i,shape)=>(i==shape.length-1)?
        [1]:[ ss[0]*shape[i+1],...ss],[]
		)

const getShapeFromSelector = (selector)=>{
  return selector.map((idxRange,i)=>{
          if(idxRange.length){
            let [fr, to, st] = idxRange;
            return st>0?Math.floor((to - fr)/st):Math.floor((1 + to - fr)/st);
          }
          else{ return 0; }
        }).filter(d=>d);//remove zero
}

const getVolume = (shape)=>shape.length==0?0:shape.reduce((a,b)=>a*b);
const getVolumIndex = (idx, space)=>idx.reduce((s,d,i)=>s+d*space[i],0); 

function *indexGenerator(selector, shape){
  let space = getSpace( shape );
  let rselector = selector
    .map(d=>T.isArray(d)?d:[d, d+1, 1]).reverse();
  console.log(rselector);
  let index = selector.map(d=>d[0]);
  let ridx = [], _idx = [];
  for(let axis of rselector.map((d,i)=>i)){
    console.log( axis, rselector );
    ridx = index.slice();
    for(let ix of range(...selector) ){
      ridx[axis] = ix;
      _idx = ridx.slice().reverse();
      console.log( _idx );
      yield { idx: _idx.join(), vx: getVolumIndex(_idx, space) }
    }
  }
}

function *axisGenerator(axesSelector, shape, axis, idx){
  axis = axis | 0;
  if(idx === undefined){
    idx = shape.map((d,i)=> (axesSelector.indexOf(i) === -1)?-1:0);
  };
  while( idx[axis] < shape[axis] ){
    if( axis+1 < shape.length ){ 
      yield *axisGenerator(axesSelector,shape,axis+1,idx.slice()); 
    }
    else{ yield idx.map(d=>d==-1?':':d); }
    idx[axis] = idx[axis]==-1?shape[axis]:idx[axis]+1;
  }
}

function *enummerate(generator){
  let i = 0;
  for(let v of generator){
    yield [v, i];
    i+=1;
  }
}

const ravel = (a) => a.reduce((s,a)=>{
		return (a instanceof Array)?s.concat(ravel(a)):s.concat(a)
	},[]);


const ndarray = {
	'getShape' : getShape,
	'getSpace' : getSpace,
	'getVolume': getVolume,
  'getShapeFromSelector': getShapeFromSelector,
  'getVolumIndex': getVolumIndex,
	'remapSelect': remapSelect,
	'indexGenerator': indexGenerator,
  'axisGenerator': axisGenerator,
	'enummerate': enummerate,
	'ravel':ravel,
  'range':range,
  'shape':shape,
}
module.exports = ndarray;
