"use strict";
const nd = require('./ndarray');
const Numb = require('./Numb');

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