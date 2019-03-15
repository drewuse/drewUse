let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemDataSchema= new Schema({
  // Initial info
  title: {type: String, required:true},
  description: String,
  price: Number,
  image_url: String,
  image_public_id: String,
  // TODO: Add support for multiple images
  // imgs: [{
  //   url: String,
  //   public_id: String,
  // }],
  datePosted: Number,
  datePostedComputed: String,
  postedBy: String,
  // Sold info
  dateSold: Date,
  boughtBy: String,
  transactionDate: Date,
  priceSoldAt: Number
}, {collection:'listings'});

var itemData = mongoose.model('itemData', itemDataSchema);

module.exports = itemData;
