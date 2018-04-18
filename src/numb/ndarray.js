"use strict";
const U = require('./ndarray_utils');

const pIndex = (idx, size) => (idx>-1)?idx:size + idx 

const remapIndex = (idx,size) => {
  U.validateIndex(idx, size);
  return pIndex(idx, size);
}

const remapSelect = (sval, shape)=>{
  //numpy like selector
  const vsp = sval.split(',');
  const select = shape.map( (size, i)=>{
    let v = (i<vsp.length)?vsp[i]:`0:${size}:1`;
    console.log('v', v)
    if( Number.isNaN(v) ) { 
      console.log( 's',  v.split(':') );
      // let [l,h,st] = v.split(':').map(d=>{ return Number(d) });
      st = st?st:1;
      U.validateIndexRange(l, h, st, size);
      return [l, h, st];
    }
    else { 
      return remapIndex( Number(v), size ); 
    } 
  });
  return select;
}

const shapeSelector = {
    get: function(s, sel){
        if( typeof sel !== 'symbol' && Number(sel)){
          let psel = remapIndex( Number(sel), s.length );
          return s.slice()[psel];  
        }
        else{
          return s.slice()[sel];
        }
    },
    set: function(s,sel,val){
        sel = Number(sel) >= 0?sel:s.length + Number(sel);
        s[sel] = val;
        return s;
    }
}

const shape = (sh)=>{
    let _sh = sh.slice();
    return new Proxy(_sh,shapeSelector);
}

const getShape  = (arr)=>(Array.isArray(arr))?
  [arr.length, ...getShape(arr[0])].filter(d=>d):[null];

const getSpace = (shape)=>shape.length==0?
		1:shape.reduceRight(
			(ss,d,i,shape)=>(i==shape.length-1)?
        [1]:[ ss[0]*shape[i+1],...ss],[]
		)

const getVolume = (shape)=>shape.length==0?[]:shape.reduce((a,b)=>a*b);
const getVolumIndex = (idx, space)=> idx.reduce((s,d,i)=>s+d*space[i],0); 

function *indexGenerator(selector, space, axis, idx){
  axis = axis | 0;
  idx = (idx)?idx:selector.map(()=>0);
  const l = selector[axis][0]|selector[axis],
        h = selector[axis][1]?selector[axis][1]:l+1,
        s = selector[axis][2]?selector[axis][2]:1;
  idx[axis] = l;
  while(s>0?(idx[axis] < h):false){
    if(axis+1<selector.length){
      yield *indexGenerator(selector,space,axis+1,idx);
      idx[axis] += s;
    }
    else{
      yield {idx:idx,vx:idx.reduce((s,d,i)=>s+d*space[i],0)};
      idx[axis] += s;
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

const range = (l, h, st)=>{
  st = st?st:1;
  [l, h] = h?[l,h]:[0,l];
  for(let c = l; c < h; c += st){ 
      console.warn(c)
      ret = [...ret, c]; }
  return ret;
}

const ndarray = {
	'getShape' : getShape,
	'getSpace' : getSpace,
	'getVolume': getVolume,
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
