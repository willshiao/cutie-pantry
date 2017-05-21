'use strict';

const mongoose = require('../lib/db');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  username: String,
  name: String,
  location: String,
  quantity: String,
  expiryDate: Date,
});

module.exports = mongoose.model('Item', ItemSchema);
