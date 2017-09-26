var math = require('mathjs');
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

function numberjs(size){
	this.shape = Object.assign([],size);
	this.volum = size.reduce((a,b)=>a+b);
	this.value = new Float32Array(this.volum);
	this.version = 0.1;
}

numberjs.prototype.tolist = function(){
	Log(this.shape.reverse());
	// const v = this.volum,
	// 	  r = this.shape[0],
	// 	  c = this.shape[1];
	// let ret = [];
	// for(let tr = 0, tc = 0, travel = 0;
	// 		travel < this.volum;
	// 		tr += 1, tc += 0|(tr/r), //increasing 
	// 		tr %= r, tc %= c)
	return 'tolist';
}

numberjs.prototype.transpose = (size)=>{
	r = 2,c = 3;
	// for(let xr=0, xc=0, yr=0, yc=0, counter=0;
	//     counter<r*c; 
	//     xc+=1,xr + \=0|(xc/c),xr%=r,xc%=c,
	//     yr+=1, yc+=0|(yr/r), yr%=r,yc%=c){
	//     counter += 1;
	//     console.log(xr,xc,va[xr*c + xc]);
	//     console.log(yr,yc,va[yr*c + yc]);
	//     [va[xr*c + xc], va[yr*c + yc]] = [va[yr*c + yc], va[xr*c + xc]];  
	//     console.log(va[xr*c + xc], va[yr*c + yc]);
	//     // console.log(`[${xr}${xc}]: ${va[xr*c + xc]}`);
	//   }
	return 'transpose';
}

numberjs.prototype.get = function(argument){
	return 0;
};

numberjs.prototype.dot = function(A,B){
	return 'dot' 
};
module.exports = numberjs;