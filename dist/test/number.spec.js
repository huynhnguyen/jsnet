const chai = require('chai');
const nd 	 = require('../src/numb/ndarray');
const Numb = require('../src/numb/numb');

describe('Numb', function() {
  describe('ndarray', function(){
    describe('index remap', function(){
      it('"0,0" => 0,0', function(){ 
        let selector = nd.remapSelect('0,0',[2,2]);
        chai.expect(''+selector).to.equal('0,0');
  	  })
  	  it('":,1" => [[0,2,1],0]', function(){ 
  	  	//TODO: this test seems to be not easy to read
        let selector = nd.remapSelect(':,0',[2,2]);
        chai.expect(''+selector[0]).to.equal('0,2,1');
        chai.expect(''+selector[1]).to.equal('0');
  	  })
    })
    describe('get space', function(){
      it('[3]=>[1]', function(){
    	chai.expect(''+nd.getSpace([10])).to.equal('1');		
      })
      it('[2,2,2]=>[4,2,1]', function(){
        chai.expect(''+nd.getSpace([2,2,2])).to.equal('4,2,1');
      })
    })
    describe('index generator', function(){
      it('generate from 0 to 3 step 1', function(){ 
        let o$idx = [], o$vx = [];
        for(px of nd.indexGenerator( [[0,2,1]], 
        		nd.getSpace([2]) )){
          //TODO: investigate why idx not return without string transform
        	o$idx = [ ...o$idx, '' + px.idx ];
        	o$vx  = [ ...o$vx, px.vx ];
        }
        chai.expect( o$idx[0] ).to.equal( '0' );
        chai.expect( o$idx[1] ).to.equal( '1' );
        chai.expect( '' + o$vx ).to.equal( '0,1' );
      })
      it('generate from 0 to 3 step 1 (x2 axis)', function(){ 
        let o$idx = [], o$vx = [];
        for(let px of nd.indexGenerator( [[0,2,1], [0,2,1]], 
        		nd.getSpace([2, 2]) )){
        	o$idx = [ ...o$idx, '' + px.idx ];
        	o$vx  = [ ...o$vx, px.vx ];
        }
        chai.expect( '' + o$idx[0] ).to.equal( '0,0' );
        chai.expect( '' + o$idx[1] ).to.equal( '0,1' );
        chai.expect( '' + o$idx[2] ).to.equal( '1,0' );
        chai.expect( '' + o$idx[3] ).to.equal( '1,1' );
        chai.expect( '' + o$vx  ).to.equal( '0,1,2,3' );
      });
      it('generate for axes [0]', function(){
        let o$idx = [];
        for(px of nd.axisGenerator([0], [2,2])){
          o$idx = [ ...o$idx, px ];
        }
        chai.expect( '' + o$idx[0] ).to.equal( '0,:' );
        chai.expect( '' + o$idx[1] ).to.equal( '1,:' );
      });
    });
  });
  describe('basic test for numb', function() {
    var nA = Numb([  [0,1],
    	                 [2,3]  ]);
    it('should return the correct shape', function() {
      chai.expect(nA.shape.join(',')).to.equal('2,2');
    });
    it('shoule return the correct value', function() {
      chai.expect(''+nA.v['0,0'].tolist()).to.equal('0');
      chai.expect(''+nA.v['0,1'].tolist()).to.equal('1');
      chai.expect(''+nA.v['1,0'].tolist()).to.equal('2');
      chai.expect(''+nA.v['1,1'].tolist()).to.equal('3');
      chai.expect(''+nA.v['0,:'].tolist()).to.equal('0,1');
      chai.expect(''+nA.v[':,0'].tolist()).to.equal('0,2');
      // chai.expect(''+nA.v['1,2'].tolist()).to.throw();
    });
  });
});
