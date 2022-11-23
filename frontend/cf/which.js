"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const _ = require("lodash");

exports.which = function (data, mv) {
  //var arr = [1, 2, 3, 6, 9, -8, -7, 0, 56, -45];
  var arr = data;

  var thevalue = mv;
  var greater = [];
  var lesser = [];
  var zero = [];
  var greatercount = Number();
  var lessercount = Number();
  var zerocount = Number();

  arr.forEach((element) => {
    if (element < thevalue) {
      lesser.push(element);
      lessercount = lessercount + 1;
    } else if (element > thevalue) {
      greater.push(element);
      greatercount = greatercount + 1;
    } else if (element == thevalue) {
      zero.push(element);
      zerocount = zerocount + 1;
    }
  });

  var sumgreater = _.sum(greater);
  var sumlesser = _.sum(lesser);
  var whole = _.sum(arr);

  return [
    {
      more: sumgreater,
      less: sumlesser,
      morecount: greatercount,
      lesscount: lessercount,
      zeros: zerocount,
      whole: whole,
    },
  ];
};
