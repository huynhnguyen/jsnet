"use strict";
//T.T javascript OMG!!!
const clone = (refValue)=>{
  return ( Array.isArray(refValue) )?
    Object.assign([],refValue):Object.assign({},refValue);
}

const int = (s)=>{
  let i = Number.parseInt(s);
  if( isNaN(i) ){ throw Error(`fail to convert ${s} to int`) }
  return i;
}

const float = (s)=>{
  let f = Number.parseFloat(s);
  if( isNaN(f) ){ throw Error(`fail to convert ${s} to float`) }  
  return f;
}

//check type
const isArray = (v)=>{ Array.isArray(v) }
const isNumber = (s)=> !Number.isNaN(+s);
const isArrayBuffer = (v)=>{
	return 	v.length !== undefined
		&& v.BYTES_PER_ELEMENT==4 }

const utils = {
  'int': int,
  'float': float,
  'isArray': isArray,
  'isArrayBuffer': isArrayBuffer, 
  'isNumber': isNumber
}
module.exports = utils;