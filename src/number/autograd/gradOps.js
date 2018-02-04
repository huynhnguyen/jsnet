const Number = require('../number');
const GradOps = {}
if (typeof module !== 'undefined') {
  module.exports   = GradOps;
} 
if (typeof window !== 'undefined') {
  window.GradOps  = GradOps;
}


GradOps.tanh = (ret, nd)=>{
  if(nd.grad){
      const vjp_op = (x)=>1 - Math.pow(Math.tanh(x),2);
      ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
                    vjp: Number(nd.value.map(d=>vjp_op(d)), nd.shape)} ]
  }
  return ret;
}

GradOps.add = (ret, nds)=>{
  ret.grad = nds.map((nd,i)=>{
			if(nd.grad){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Number(nd.value.map(d=>1), nd.shape)}
			}
	  })
	  .filter(d=>d);	
  return ret;
}

GradOps.minus = (ret, nds)=>{
  ret.grad = nds.map((nd,i)=>{
			if(nd.grad && i == 0){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Number(nd.value.map(d=>1), nd.shape)}
			}
			if(nd.grad && i == 1){
			  return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
			           vjp: Number(nd.value.map(d=>-1), nd.shape)}
			}
	  })
	  .filter(d=>d);	
  return ret;
}

GradOps.dot = (ret, nds)=>{
	let [nd$0, nd$1] = nds; 
  const nd0_grad = ()=>{

  }
  const nd1_grad = ()=>{

  }
  ret.grad = nds.map((nd,i)=>{
			if(nd.grad){
				if(i == 0){
			  	return { bw: nd, vid: nd.grad[0].vid, vjp: nd$1, 
			  			 elementWise: false, order: i }
			  }
			  else{
			  	return { bw: nd, vid: nd.grad[0].vid, vjp: nd$0,
			  			 elementWise: false, order: i }
			  }
			}
	  })
	  .filter(d=>d);	
  return ret;
}

GradOps.pow = (ret, nd, hat)=>{
  // console.warn('GradOps.pow', hat);
  // console.warn(nd);
  if(nd.grad){
      const vjp_op = (x)=>hat*x;
      ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
                    vjp: Number(nd.value.map(d=>vjp_op(d)), nd.shape)} ]
  }
  return ret;
}

GradOps.mean = (ret, nb)=>{
  if(nb.grad){
      ret.grad = [{ bw: nb, vid: nb.grad[0].vid, 
                    vjp: (tracedGrad, nb)=>{
                      const _length = nb.value.length;
                      const vjp_op = (x)=> 1.0/_length;
                      return Number(nb.value.map(d=>vjp_op(d)), nb.shape)
                    } }];
  }
  return ret;
}