const Numb = require('../numb');
const nd = require('../ndarray');
const Operators = require('../operators');
const Op = Operators;
const GradOps = {};

if (typeof module !== 'undefined') {
  module.exports  = GradOps;
} 
if (typeof window !== 'undefined') {
  window.GradOps  = GradOps;
}


GradOps.tanh = (ret, nd)=>{
  if(nd.grad){
      const vjp_op = (x)=>1 - Math.pow(Math.tanh(x),2);
      ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
                    vjp: Numb(nd.value.map(d=>vjp_op(d)), nd.shape)} ]
  }
  return ret;
}

GradOps.add = (ret, nds)=>{
  ret.grad = nds.map((nd,i)=>{
			if(nd.grad){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Numb(nd.value.map(d=>1), nd.shape)}
			}
	  })
	  .filter(d=>d);	
  return ret;
}

GradOps.minus = (ret, nds)=>{
  ret.grad = nds.map((nd,i)=>{
			if(nd.grad && i == 0){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Numb(nd.value.map(d=>1), nd.shape)}
			}
			if(nd.grad && i == 1){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Numb(nd.value.map(d=>-1), nd.shape)}
			}
	  })
	  .filter(d=>d);	
  return ret;
}

GradOps.dot = (ret, nbA, nbB)=>{
  let nbs = [nbA, nbB];
  const nbA_grad = (ret, nbA)=>{
      let _sh = nbA.shape.map((d,i)=>i);
      let Taxis = [..._sh.slice(0,-2), ..._sh.slice(-1), ..._sh.slice(-2,-1)];
      let retGrad = Ops.dot(Ops.T(nbA, Taxis), ret); 
      return Ops.T(retGrad, Taxis);
  }
  
  const nbB_grad = (ret, nbB)=>{
      let _sh = nbA.shape.map((d,i)=>i);
      let Taxis = [..._sh.slice(0,-2), ..._sh.slice(-1), ..._sh.slice(-2,-1)];
      let retGrad = Ops.dot(Ops.T(nbA, Taxis), ret); 
      return retGrad;
  }

  const transformRet = ( ret, op_inputs )=>{
    let rS = ret.shape.slice();
    let nbA = op_inputs[0], nbB = op_inputs[1];
    if(rS.length <= 2){
        return ret;
    }
    else{
//         console.warn(op_inputs, nbA, nbB);
        let AShLen  = nbA.shape.length, BShLen = nbB.shape.length;
        let _selAxis = [AShLen>2?(AShLen-2):0, rS.length - 1];
        let [selAxis, newShape] = rS.reduce((ss,d,i)=>{
                 if(_selAxis.indexOf(i)==-1){ ss[0] = [...ss[0],i] }
                 else{ ss[1] = [...ss[1],d] }
                 return ss;
            },[[],[]]);
        let newValue = new Float32Array(nd.getVolume(newShape));
        let reformedRet = Numb(newValue, newShape );  
        for(idx of nd.axisGenerator(selAxis, ret.shape)){
            reformedRet = Ops.add(reformedRet, ret.v[idx]) 
        }
//         console.warn(reformedRet)
        return reformedRet;
    }       
  }
  ret.transformRet = transformRet;
  ret.grad = nbs.map((nb, i)=>{
      const _bw  = nb.grad?nb:null;
      const _vjp = (i===0)?nbA_grad:nbB_grad;
      const _vid = 0;//nb.grad[0].vid;
      return { bw: _bw, vid: _vid, vjp: _vjp, op_inputs: nbs };
  });
  return ret;
}

GradOps.pow = (ret, nb, hat)=>{
  if(nb.grad){
      const pow_grad = (bwGrad, nb)=>{
        return Op.mul( bwGrad, Op.mul(nb, hat) )
      }
      ret.grad = [{ bw: nb, vid: nb.grad[0].vid, vjp: pow_grad, op_inputs: [nb, hat] }];
  }
  return ret;
}

GradOps.mean = (ret, nb, axis)=>{
  if(nb.grad){
      ret.grad = [{ bw: nb, vid: nb.grad[0].vid, 
                    vjp: (bwGrad, nb)=>{
                      const _length = nb.value.length;
                      const vjp_op = (x)=> 1.0/_length;
                      return Numb(nb.value.map(d=>vjp_op(d)), nb.shape)
                    } }];
  }
  return ret;
}