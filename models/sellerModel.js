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
  // Book details (possible TODO: change some to ENUMs?)
  condition: String,  // non-optional
  book_type: String,  // non-optional
  course_num: String, // not Number because may be alphanumeric
  course_name: String,
  course_subject: String,
  course_professor: String,
  ISBN_code: Number,
  // Sold info
  dateSold: Date,
  boughtBy: String,
  transactionDate: Date,
  priceSoldAt: Number,
  sold: Boolean
},{collection:'listings'});


var itemData = mongoose.model('itemData', itemDataSchema);

module.exports = itemData;
