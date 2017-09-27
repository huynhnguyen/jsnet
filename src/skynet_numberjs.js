var _ = require('underscore');
var Helper = require('./skynet_helper')
Log = Helper().logger;

const reindexing = (idx,volume)=>{
  idx = + idx;//to number
  idx = (idx < 0)? idx+volume:idx;
  if(idx < 0 || idx > volume){
    console.error(`oop! not consistent
    idx: ${idx} with volum ${volume}`)
  }
  return idx;
}

function numberjs(shape, value){
	// TODO: support more than 2d array
	this.shape = Object.assign([],shape);
	this.volum = shape.reduce((a,b)=>a*b);
	// this.mulup = size.map((d,i)=> i>0?size[i] + size[i-1]:size[i]);
	this.value = value || new Float32Array(this.volum);
	this.version = 0.1;
}

numberjs.prototype.tolist = function(){
	Log(this.value);
	let list = this.shape.reverse().reduce((l,s)=>{
	  ll = l.reduce(
	    (d,v)=>{
	      d.tmp.push(v);
	      if(d.tmp.length===s){
	        d.t.push(d.tmp);
	        d.tmp = [];
	      }
	      return d;
	    },{t:[],tmp:[]});
	  return ll.t;
	}, this.value)[0];
	return list;
}

numberjs.prototype.tanh = (a)=>{
	val = a.value.map(d=>Math.tanh(d));
	return new numberjs(a.shape,val);
}
numberjs.prototype.relu = (a)=>{
	return null;	
};
numberjs.prototype.sigmoid = (a)=>{
	val = a.value.map(d=>0.5*(Math.tanh(d)+1.0));
	return new numberjs(a.shape,val);
}

numberjs.prototype.transpose = ()=>{
	
	return 'transpose';
}

numberjs.prototype.get = function(argument){
	return 0;
};

numberjs.prototype.dot = function(A,B){
	return 'dot' 
};
module.exports = numberjs;