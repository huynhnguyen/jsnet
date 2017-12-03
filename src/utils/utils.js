"use strict";
const nd = require('./ndarray');
const Number = require('./number');

const Utils = {}

if (typeof module !== 'undefined') {
  module.exports   = Utils;
} 
if (typeof window !== 'undefined') {
  window.Utils = Utils;
}

Utils.print = () => {
	console.warn(' print function ')
}