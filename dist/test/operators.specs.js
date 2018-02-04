const chai = require('chai');
const Number = require('../src/number/number');
const Op = require('../src/number/operators');
describe('Operators', function() {
  let nd$A = Number([[0,1],[1,2]]);
  let nd$B = Number([[1,2],[3,4]]);
  describe('add', function(){
  	it(' A + B = [[1,3],[4,6]]', function(){
  		let nd$C = Op.add(nd$A, nd$B);
  		chai.expect(''+nd$C.tolist()).to.equal('1,3,4,6');
  	})	
  }
}