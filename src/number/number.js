"use strict";
const nd = require('./ndarray');

const Selector = {
  get:function(d, selectString){
    let value = d.v, shape = d.sh, space = d.sp; 
    let selector = nd.remapSelect(selectString, shape);
    let shapeNew = selector.map( (d)=>(d[2])?0|((d[1]-d[0])/d[2]):1 );
    let valueNew = new Float32Array(nd.getVolume(shapeNew));
    console.log(selectString, selector, shapeNew)
    for(let [px,c] of nd.enummerate( nd.indexGenerator(selector, 
                                        nd.getSpace(shape) ) ) ){
      const idx = px.idx, vx = px.vx;
      valueNew[c] = value[vx]; 
    }
    return new number(valueNew, shapeNew);
  },
  set:function(d, selectString, newValue){
    let value = d.v, shape = d.sh, space = d.sp; 
    selector = nd.remapSelect(selectString, shape);
    const getAtFunc = (value)=>{
      if(typeof value === 'number'){ return {getAt:(counter)=>value}; }
      if(value instanceof Array){
        //TODO: implement check shape
        let valueFlatten = ravel(value);
        return {getAt:(counter)=>value[counter]};
      }
      if(value instanceof numberjs){
        //TODO: implement check shape
        let v = value.value;
        return {getAt:(counter)=>v[counter]};
      }
    }
    func = getAtFunc(newValue);
    for(let px of nb.enummerate(nb.indexGenerator(selector, space))){
      let idx = px.idx, c = px.c;
      vx  = reverse(idx).reduce((v,d,i)=>v+d*shape[i]);
      // Log([vx, newValue]);
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