nd = require('../src/numb/ndarray'); 
s  = [ 1,2,3,4 ];
s2 = nd.shape( s );
console.log( 's2', s2 );
v = s2;
console.log( 'v', v );
v = v.reverse();
console.log( 'v', v, s2[-1], s2[3] );

console.log( nd.remapSelect('1,1,1',[2,3,2]) );

console.log( nd.remapSelect('1:2,1:2,1:2',[2,3,2]) );
