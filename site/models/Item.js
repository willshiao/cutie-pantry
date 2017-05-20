'use strict';

const mongoose = require('../lib/db');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user: String,
  name: String,
  barcode: String,
  location: String,
  quantity: String,
  expiryDate: Date,
});

module.exports = mongoose.model('Item', ItemSchema);
