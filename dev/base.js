nd = require('../src/numb/ndarray');
Numb = require('../src/numb/numb');
Autograd = require('../src/numb/autograd/autograd');
Ops  = require('../src/numb/operators');
GradOps = require('../src/numb/autograd/gradOps');

v = new Float32Array(6)
a = Numb([1,2,3,4,5,6],[2,3])
b = Numb([1,2,3,4,5,6],[2,3])
c = Ops.add(a,b)
console.log(c)