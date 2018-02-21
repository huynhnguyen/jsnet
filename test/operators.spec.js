const chai = require('chai');
const Numb = require('../src/numb/numb');
const Op = require('../src/numb/operators');
describe('Operators', function() {
  let nbA = Numb([[0,1],[1,2]]);
  let nbB = Numb([[1,2],[3,4]]);
  let nbC  = Numb([[1,2,3,4,5,6,7,8,9,10,11,12]]);

  describe('dimension change', function(){
    // it(' concat([A,B], axis=0) = 1', function(){
    //   let nd$C = Op.mean(nbA);
    //   chai.expect(''+nd$C.tolist()).to.equal('1');
    // });
    it(' mean(A) = 1', function(){
      let nd$M1 = Op.mean(nbA);
      let nd$M2 = Op.mean(nbC.reshape([2,3,2]));
      chai.expect(''+nd$M1.tolist()).to.equal('1');
      chai.expect(''+nd$M2.tolist()).to.equal('6.5');
    });
    it(' dot(A,B) = [[3,4],[7,10]]', function(){
      let nd$C = Op.dot(nbA, nbB);
      chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    });

    // it(' dot(A$3d,B$3d) = [[[3,4],[7,10]]]', function(){
    //   let nd$C = Op.dot(nbA, nbB);
    //   chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
    // });
  });
  // let nd$G = Numb([[Math.pi() ]])
  // describe('non-linear ops', function(){
  //   it(' tanh(A) = ', function(){
  //     let nd$C = Op.dot(nbA, nbB);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  //   it(' sin(A) = ', function(){
  //     let nd$C = Op.dot(nbA, nbB);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  //   it(' cos(A) = ', function(){
  //     let nd$C = Op.dot(nbA, nbB);
  //     chai.expect(''+nd$C.tolist()).to.equal('3,4,7,10');
  //   });
  // })
  describe('basic ops', function(){
    it(' B / B = [[1,1],[1,1]]', function(){
      let nd$C = Op.div(nbB, nbB);
      chai.expect(''+nd$C.tolist()).to.equal('1,1,1,1');
    });
    it(' A * B = [[0,2],[3,8]]', function(){
      let nd$C = Op.mul(nbA, nbB);
      chai.expect(''+nd$C.tolist()).to.equal('0,2,3,8');
    });
    let nd$1 = Numb([1]);
    it(' A * [1] = A', function(){
      let nd$C = Op.mul(nbA, nd$1);
      chai.expect(''+nd$C.tolist()).to.equal('0,1,1,2');
    });
    it(' A - B = [[-1,-1],[-2,-2]]', function(){
      let nd$C = Op.minus(nbA, nbB);
      chai.expect(''+nd$C.tolist()).to.equal('-1,-1,-2,-2');
    });
    it(' A + B = [[1,3],[4,6]]', function(){
      let nd$C = Op.add(nbA, nbB);
      chai.expect(''+nd$C.tolist()).to.equal('1,3,4,6');
    }); 
    it('transpose should return in correct value', function (){
      let nbT$B = Op.T(nbB);
      chai.expect( ''+nbT$B.tolist()  ).to.equal('1,3,2,4');
      let nbT$C1 = Op.T(nbC.reshape([2,3,2]));
      chai.expect( ''+nbT$C1.tolist() ).to.equal('1,7,3,9,5,11,2,8,4,10,6,12');
      let nbT$C2 = Op.T(nbC.reshape([2,3,2]),[0,2,1]);
      chai.expect( ''+nbT$C2.tolist() ).to.equal('1,3,5,2,4,6,7,9,11,8,10,12');
    });
  });
});