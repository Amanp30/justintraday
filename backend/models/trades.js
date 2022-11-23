const mongoose = require('mongoose');

const tradesSchema = new mongoose.Schema({
  "stock": {
    "type": "String"
  },
  "action": {
    "type": "String"
  },
  "timeframe": {
    "type": "String"
  },
  "entrydate": {
    "type": "Date"
  },
  "quantity": {
    "type": "Number"
  },
  "entryprice": {
    "type": "Number"
  },
  "exitdate": {
    "type": "Date"
  },
  "exitprice": {
    "type": "Number"
  },
  "profitloss": {
    "type": "Number"
  },
  "fees": {
    "type": "Number"
  }

});

module.exports = mongoose.model('trade', tradesSchema);