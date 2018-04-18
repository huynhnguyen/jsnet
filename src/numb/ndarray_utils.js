"use strict";

const clone = (refValue)=>{
  return (refValue instanceof Array)?
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
const validateIndex = (idx, size)=>{
  if(idx <= -size || idx >= size){ throw Error(`index ${idx} is invalid with ${size}`); }
}
const validateIndexRange = (l, h, st, size)=>{
  if( (st > 0 && l > h) && (st > 0 && l > h) ){
    throw Error(` index range ${l}, ${h}, ${st} is invalid with ${size}`)
  }
}

const utils = {
  'int'  : int,
  'float': float,
  'clone': clone,
  'validateIndex': validateIndex,
  'validateIndexRange': validateIndexRange
}
module.exports = utils;