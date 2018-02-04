const chai = require('chai');
const nd 	 = require('../src/number/ndarray');

describe('ndarray', function() {
 //  descibe('ndarray', function(){
	// describe('index remap', function(){
	// 	it('shold return correct remap', function(){
			
	// 	});
	// });
 //  });  	
  describe('earth', function(){
    describe('singapre', function(){
      it('birds should fly', function(){ /** ... */ })
    })
    describe('malaysia', function(){
      it('birds should soar', function(){ /** ... */ })
    })
  })
  describe('basic test for number', function() {
    var nA = Number([[0,1],[2,3]]);
    it('should return the correct shape', function() {
      chai.expect(nA.shape.join(',')).to.equal('2,2');
    });
    it('shoule return the correct value', function() {
      console.log(nA.v['0,0'])
      chai.expect(nA.v['0,0']).to.equal(0);
    });
  });
});