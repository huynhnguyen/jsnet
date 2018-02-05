webpackHotUpdateskynet(0,{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

const Number = __webpack_require__(0);
const nd = __webpack_require__(1);
const Operators = __webpack_require__(2);
const Op = Operators;
const GradOps = {};

if (true) {
  module.exports = GradOps;
}
if (typeof window !== 'undefined') {
  window.GradOps = GradOps;
}

GradOps.tanh = (ret, nd) => {
  if (nd.grad) {
    const vjp_op = x => 1 - Math.pow(Math.tanh(x), 2);
    ret.grad = [{ bw: nd, vid: nd.grad[0].vid, elementWise: true,
      vjp: Number(nd.value.map(d => vjp_op(d)), nd.shape) }];
  }
  return ret;
};

GradOps.add = (ret, nds) => {
  ret.grad = nds.map((nd, i) => {
    if (nd.grad) {
      return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
        vjp: Number(nd.value.map(d => 1), nd.shape) };
    }
  }).filter(d => d);
  return ret;
};

GradOps.minus = (ret, nds) => {
  ret.grad = nds.map((nd, i) => {
    if (nd.grad && i == 0) {
      return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
        vjp: Number(nd.value.map(d => 1), nd.shape) };
    }
    if (nd.grad && i == 1) {
      return { bw: nd, vid: nd.grad[0].vid, elementWise: true,
        vjp: Number(nd.value.map(d => -1), nd.shape) };
    }
  }).filter(d => d);
  return ret;
};

GradOps.dot = (ret, nbs) => {
  const nd0_grad = (ret, nd$0) => {
    let sR = ret.shape,
        s$0 = nd$0.shape;
    let pR = ret.space,
        p$0 = nd$0.space;
    if (s$0.length == 1) {} else if (s$0.length == 2) {} else if (s$0.length > 2) {}
  };
  const nd1_grad = (ret, nd$1) => {
    let sR = ret.shape,
        s$0 = nd$1.shape;
    let pR = ret.space,
        p$0 = nd$1.space;
    if (s$1.length == 1) {} else if (s$1.length == 2) {} else if (s$1.length > 2) {}
  };
  const transformRet = (ret, nb$0, nb$1) => {
    let rS = ret.shape,
        nb$0Shape = nb$0.shape,
        nb$1Shape = nb$1.shape;
    let leftSelector, rightSelector;
    if (nb$0Shape.length > 2) {
      leftSelector = nb$0.shape.slice(0, -2);
    }
    if (nb$1Shape.length > 2) {
      rightSelector = nb$0.shape.slice(0, -2);
    }
    selector = leftSelector + ret.shape.slice(-2) + rightSelector + ret.shape.slice(-1);
    for (let px of nb.inbexGenerator(selector, nb.getSpace())) return ret;
  };
  ret.transformRet = transformRet;
  ret.grad = nbs.map((nb, i) => {
    if (nb.grad) {
      if (i == 0) {
        return [{ bw: nb, vid: nb.grad[0].vid, vjp: nb0_grad }];
      } else {
        return [{ bw: nb, vid: nb.grad[0].vid, vjp: nb1_grad }];
      }
    }
  }).filter(d => d);
  return ret;
};

GradOps.pow = (ret, nb, hat) => {
  if (nb.grad) {
    const pow_grad = (bwGrad, nb) => {
      return Op.mul(bwGrad, Op.mul(nb, hat));
    };
    ret.grad = [{ bw: nb, vid: nb.grad[0].vid, vjp: pow_grad }];
  }
  return ret;
};

GradOps.mean = (ret, nb, axis) => {
  if (nb.grad) {
    ret.grad = [{ bw: nb, vid: nb.grad[0].vid,
      vjp: (bwGrad, nb) => {
        const _length = nb.value.length;
        const vjp_op = x => 1.0 / _length;
        return Number(nb.value.map(d => vjp_op(d)), nb.shape);
      } }];
  }
  return ret;
};

/***/ })

})
//# sourceMappingURL=hot-update.js.map