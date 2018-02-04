"use strict";
const getShape  = (arr)=>(typeof arr === 'number')?
	null:[arr.length].concat(getShape(arr[0])).filter(d=>d);

const getSpace = (shape)=>shape.length==0?
		1:shape.reduceRight(
			(ss,d,i,shape)=>(i==shape.length-1)?
				[1]:[ ss[0]*shape[i+1],...ss],[]
		)

// shape = [4,3,4];
// console.log(getSpace(shape));

const getVolume = (shape)=>shape.length==0?
		[]:shape.reduce((a,b)=>a*b);

const clone = (refValue)=>{
  return (refValue instanceof Array)?
  	Object.assign([],refValue):Object.assign({},refValue);
}

const remapIndex = (idx,sh)=>{
  idx = (idx>-1)?idx:sh + idx
  if(idx <0 || idx >= sh){ throw Error('index invalid'); }
  else{ return idx; }
}

const remapSelect = (sval, shape)=>{
  //numpy like selector
  const vsp = typeof sval === 'string'?sval.split(','):
    shape.map(d=>':');
  if(vsp.length > shape.length){ throw Error('selector is not consitent with shape ') }
  const select = shape.map((sh,i)=>{
    const v = (i<vsp.length)?vsp[i]:':';
    if(''+(+v)==='NaN') { 
    	//check if v is a number or not
      let [l,h,st] = v.split(':');
      st = st? +st:1;
      l  = l ? +l:(st>0)?0:sh-1;
      h  = h ? +h:(st>0)?sh:0;
      let check = [];
      check.push( (h>sh)?`IndexError: ${h} higher than ${sh}`:null );
      check.push( (st<0&&h>l)?`IndexError: if st < 0, ${l} higher than ${h}`:null );
      if(check.filter(d=>d).length){  throw Error(''+check);  }
      return [l,h,st];
    }
    else { 
      return remapIndex(+v,sh); 
    } 
  });
  return select;
}

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

function *_indexGenerator(_selector, space, axis, idx){
  	let [l,h,s] = _selector;
  	while(l < h){
  	  idx[axis] = l;	
      yield {idx:idx,vx:idx.reduce((s,d,i)=>s+d*space[i],0)};
      l += s;
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
	'clone': clone,
	'remapSelect':remapSelect,
	'indexGenerator': indexGenerator,
	'_indexGenerator': _indexGenerator,
	'enummerate': enummerate,
	'ravel':ravel
}
module.exports = ndarray;
