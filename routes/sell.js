var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();
var options = require('../options');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


/* get sellers page. */
router.get('/', function(req, res, next) {
  res.render('sell', {title: 'DrewUse'});
});

// post request to create listings
router.post('/insert', function(req, res, next) {
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  var item = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    datePosted: current_timestamp,
    datePostedComputed: dateReadable
  };
  var data = new itemData(item);
  data.save();

  res.redirect('/');
});

module.exports = router;
