let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemDataSchema= new Schema({
  title: {type: String, required:true},
  description: String,
  price: Number,
  imgs: Array,
  datePosted: Number,
  datePostedComputed: String,
  dateSold: Date,
  postedBy: String,
  boughtBy: String,
  transactionDate: Date,
  priceSoldAt: Number,
  sold: Boolean
},{collection:'listings'});

var itemData = mongoose.model('itemData', itemDataSchema);

module.exports = itemData;
