var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();
var options = require('../options');

var dbLoginData={
  username: options.storageConfig.username,
  password: options.storageConfig.password
}

var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect(dbConnect);


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
