"use strict";
const nd = require('./ndarray');

const Selector = {
  get:function(d, selectString){
    let value = d.v, shape = d.sh, space = d.sp; 
    let selector = nd.remapSelect(selectString, shape);
    let shapeNew = selector.map( (d)=>(d[2])?0|((d[1]-d[0])/d[2]):null )
                    .filter(d=>d);
    shapeNew = shapeNew.length == 0?[1]:shapeNew;
    let valueNew = new Float32Array(nd.getVolume(shapeNew));
    // console.warn('get',selectString, selector, shapeNew)
    for(let [px,c] of nd.enummerate( nd.indexGenerator(selector, 
                                        nd.getSpace(shape) ) ) ){
      const idx = px.idx, vx = px.vx;
      // console.warn(idx, vx);
      valueNew[c] = value[vx]; 
    }
    return new number(valueNew, shapeNew);
  },
  set:function(d, selectString, newValue){
    let value = d.v, shape = d.sh, space = d.sp; 
    const selector = nd.remapSelect(selectString, shape);
    const getAtFunc = (newValue)=>{
      if(typeof newValue === 'number'){ return {getAt:(counter)=>newValue}; }
      if(newValue instanceof Array){
        //TODO: implement check shape
        let valueFlatten = nd.ravel(newValue);
        return {getAt:(counter)=>valueFlatten[counter]};
      }
      if(newValue.type === 'Number'){
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
function number(value, shape){
  if(shape) {
    this.shape  = nd.clone(shape);
    this.volume = nd.getVolume(this.shape);
    this.space  = nd.getSpace(this.shape);
    this.value  = value;
  }
  else if(value){
    const _shape  = nd.getShape(value);
    this.shape    = nd.clone(_shape);
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
    //TODO: this is op instance
    this.grad = null;
  }
  this.type = 'Number'
  this.v = new Proxy({v:this.value, sh:this.shape, sp: this.space}, Selector);
}


function Number(value, shape){
  return new number(value, shape);
}

if (typeof module !== 'undefined') {
  module.exports = Number;
} 
if (typeof window !== 'undefined') {
  window.Number = Number;
}

number.prototype.isNumber = (nd)=>{
  return (nd.type === 'Number')?true:false   
};

number.prototype.reshape = function(newShape){
  const newVolume = nd.getVolume(newShape);
  if(newVolume !== this.volume){
    throw Error('shape is not consistent');
  }
  return new number(this.value, newShape);
};

number.prototype.tolist = function(){
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
  return list;
}