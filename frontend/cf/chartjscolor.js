"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.chartjscolor = function (array, color1, color2, value) {
  var arr = array;
  var colorarr = [];
  arr.forEach((element) => {
    if (element < value) {
      colorarr.push(color2);
    } else if (element > value) {
      colorarr.push(color1);
    } else if (element == value) {
      colorarr.push(color2);
    }
  });

  return colorarr;
};
