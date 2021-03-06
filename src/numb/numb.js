"use strict";
const nd = require('./ndarray');
const U = require('./numb_utils');
const T = require('./type');

const NumSelector = {
  get:function(d, selectString){
    const checkTypeThenRun = (s, sel)=>{
      if( typeof sel === 'symbol' || sel.match(/[a-z]/) ){ return s[sel]; }
      let value = d.value, shape = d.shape, space = d.space; 
      let selector = nd.remapSelect(selectString, shape);
      let newShape = nd.getShapeFromSelector(selector);
      let newValue = new Float32Array(newShape);
      console.log( newValue, newShape, selector );
      for(let [px,c] of 
            nd.enummerate( nd.indexGenerator(selector, nd.getSpace(shape) ) ) ){
        const idx = px.idx, vx = px.vx;
        newValue[c] = value[vx]; 
      }
      return Number(newValue, newShape);
    }
    // let value = d.value, shape = d.shape, space = d.space; 
    // let selector = nd.remapSelect(selectString, shape);
    // let shapeNew = selector.map( (d)=>(d[2])?0|((d[1]-d[0])/d[2]):null )
    //                 .filter(d=>d);
    // shapeNew = shapeNew.length == 0?[1]:shapeNew;
    // let valueNew = new Float32Array(nd.getVolume(shapeNew));
    return checkTypeThenRun(d, selectString);
  },
  set:function(d, selectString, newValue){
    let value = d.value, shape = d.shape, space = d.space; 
    const selector = nd.remapSelect(selectString, shape);
    const getAtFunc = (newValue)=>{
      if( typeof newValue === 'number' ){ return {getAt:(counter)=>newValue}; }
      if(newValue instanceof Array){
        //TODO: implement check shape
        let valueFlatten = nd.ravel(newValue);
        return {getAt:(counter)=>valueFlatten[counter]};
      }
      if(newValue.type === 'Numb'){
        //TODO: implement check shape
        let v = newValue.value;
        return {getAt:(counter)=>v[counter]};
      }
    }
    const func = getAtFunc(newValue);
    for(let [px, c] of nd.enummerate(nd.indexGenerator(selector, space))){
      let idx = px.idx, vx = px.vx;
      value[vx] = func.getAt(c);
    }
    return d;
  }
}
function numb(value, shape){
  if(shape) {
    this.shape  = nd.shape(shape);
    this.volume = nd.getVolume(this.shape);
    this.space  = nd.getSpace(this.shape);
    if(!Number.isNaN(+value)){ this.value.map((d)=>d = fvalue); }
    else{ this.value  = value; }
  }
  else if(value.length){
    this.shape  = nd.shape( nd.getShape(value) );
    this.volume = nd.getVolume(this.shape);
    this.space  = nd.getSpace(this.shape);
    this.value  = new Float32Array(this.volume);
    const selector = this.shape.map(d=>[0,d,1]);
    for( let [px,c] of nd.enummerate(nd.indexGenerator(selector, this.space)) ){
      let idx = px.idx, vx = px.vx;
      this.value[c] = idx.reduce((v,i)=>v[i],value);
    }
  }
  else{
    //TODO: check if value if valid
    throw Error('not support type');
  }
  this.type = 'Numb';
}


function Numb(value, shape=null){
  return new Proxy( new numb(value, shape), NumSelector);
}

if (typeof module !== 'undefined') {
  module.exports = Numb;
} 
if (typeof window !== 'undefined') {
  window.Numb = Numb;
}

Numb.isNumb = (nb)=>{
  return (nb.type === 'Numb')?true:false   
};

numb.prototype.reshape = function(newShape){
  const newVolume = nd.getVolume(newShape);
  if(newVolume !== this.volume){
    throw Error('shape is not consistent');
  }
  return new numb(this.value, newShape);
};

numb.prototype.print = function(){
  let list = this.shape.slice().reverse().reduce((l,s)=>{
    let ll = l.reduce((d,v)=>{
              d.tmp.push(v);
              if(d.tmp.length===s)  {
                d.t.push(d.tmp);
                d.tmp = [];  }
              return d;
            },{t:[],tmp:[]});
    return ll.t;
  }, this.value)[0];
  console.log(list);
}