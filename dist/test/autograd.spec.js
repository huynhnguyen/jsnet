const chai = require('chai');
const Numb = require('../src/numb/numb');
const Autograd = require('../src/numb/autograd/autograd');
const Op = Autograd.Operators;
describe('autograd', function() {
  let nd$A = Numb([[0,1],[1,2]]);
  let nd$B = Numb([[1,2],[3,4]]);
  const gradOpt$2 = (func, nbA, nbB)=>{
    let grad = Autograd.grad( func );
    return grad(nbA,nbB);
  }
  const gradOpt$1 = (func, ndA)=>{
    let grad = Autograd.grad( func );
    return grad(ndA);
  }
  const gradOpt$1wC = (func, ndA, constant)=>{
    let grad = Autograd.grad( func );
    return grad(ndA, constant);
  }
  describe('dimension change', function(){    
    it(' grad mean(A) = 1/4*A', function(){
      let nds$grad = gradOpt$1( Op.mean, nd$A );
      chai.expect(''+nds$grad[0].tolist())
        .to.equal('0.25,0.25,0.25,0.25');
    });

    it(' grad dot(A, B) = [],[]', function(){
      let nd$grad = gradOpt$2( Op.dot, nd$A.reshape([1,2,2]), nd$B.reshape([1,2,2]) );
      chai.expect(''+nd$grad[0].tolist())
        .to.equal('0.25,0.25,0.25,0.25');
    });

  });
  // let nd$G = Numb([[Math.pi() ]])
  describe('non-linear ops', function(){
    it(' grad pow(A,2) = 2*A', function(){
      let nds$grad = gradOpt$1wC( Op.pow, nd$A, 2 );
      chai.expect(''+nds$grad[0].tolist())
        .to.equal('0,2,2,4');
    });
    // it(' sin(A) = ', function(){
    //   let nd$C = Op.dot(nd$A, nd$B);
    //   chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    // });
    // it(' cos(A) = ', function(){
    //   let nd$C = Op.dot(nd$A, nd$B);
    //   chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    // });
  })
  describe('basic ops', function(){
    // it(' B / B = [[1,1],[1,1]]', function(){
    //   let nd$C = Op.div(nd$B, nd$B);
    //   chai.expect( '' + nd$C.tolist() ).to.equal('1,1,1,1');
    // });
    // it(' A * B = [[0,2],[3,8]]', function(){
    //   let nd$C = Op.mul(nd$A, nd$B);
    //   chai.expect( '' + nd$C.tolist() ).to.equal('0,2,3,8');
    // });
    // it(' A - B = [[-1,-1],[-2,-2]]', function(){
    //   let nd$C = Op.minus(nd$A, nd$B);
    //   chai.expect( '' + nd$C.tolist() ).to.equal('-1,-1,-2,-2');
    // });
    // it(' A + B = [[1,3],[4,6]]', function(){
    //   let nd$C = Op.add(nd$A, nd$B);
    //   chai.expect( '' + nd$C.tolist() ).to.equal('1,3,4,6');
    // }); 
  });
});