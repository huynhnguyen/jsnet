const chai = require('chai');
const Number = require('../src/number/number');
const Op = require('../src/number/operators');
describe('Operators', function() {
  let nd$A = Number([[0,1],[1,2]]);
  let nd$B = Number([[1,2],[3,4]]);

  describe('dimension change', function(){
    // it(' concat([A,B], axis=0) = 1', function(){
    //   let nd$C = Op.mean(nd$A);
    //   chai.expect(''+nd$C.tolist()).to.equal('1');
    // });
    it(' mean(A) = 1', function(){
      let nd$C = Op.mean(nd$A);
      chai.expect(''+nd$C.tolist()).to.equal('1');
    });
    it(' dot(A,B) = [[3,4],[7,10]]', function(){
      let nd$C = Op.dot(nd$A, nd$B);
      chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    });

    // it(' dot(A$3d,B$3d) = [[[3,4],[7,10]]]', function(){
    //   let nd$C = Op.dot(nd$A, nd$B);
    //   chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    // });
  });
  // let nd$G = Number([[Math.pi() ]])
  // describe('non-linear ops', function(){
  //   it(' tanh(A) = ', function(){
  //     let nd$C = Op.dot(nd$A, nd$B);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  //   it(' sin(A) = ', function(){
  //     let nd$C = Op.dot(nd$A, nd$B);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  //   it(' cos(A) = ', function(){
  //     let nd$C = Op.dot(nd$A, nd$B);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  // })
  describe('basic ops', function(){
    it(' B / B = [[1,1],[1,1]]', function(){
      let nd$C = Op.div(nd$B, nd$B);
      chai.expect(''+nd$C.tolist()).to.equal('1,1,1,1');
    });
    it(' A * B = [[0,2],[3,8]]', function(){
      let nd$C = Op.mul(nd$A, nd$B);
      chai.expect(''+nd$C.tolist()).to.equal('0,2,3,8');
    });
    let nd$1 = Number([1]);
    it(' A * [1] = A', function(){
      let nd$C = Op.mul(nd$A, nd$1);
      chai.expect(''+nd$C.tolist()).to.equal('0,1,1,2');
    });
    it(' A - B = [[-1,-1],[-2,-2]]', function(){
      let nd$C = Op.minus(nd$A, nd$B);
      chai.expect(''+nd$C.tolist()).to.equal('-1,-1,-2,-2');
    });
    it(' A + B = [[1,3],[4,6]]', function(){
      let nd$C = Op.add(nd$A, nd$B);
      chai.expect(''+nd$C.tolist()).to.equal('1,3,4,6');
    }); 
  });
});