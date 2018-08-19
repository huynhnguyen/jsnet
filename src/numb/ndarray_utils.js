"use strict";

const clone = (refValue)=>{
  return ( Array.isArray(refValue) )?
    Object.assign([],refValue):Object.assign({},refValue);
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
  'clone': clone,
  'validateIndex': validateIndex,
  'validateIndexRange': validateIndexRange
}
module.exports = utils;