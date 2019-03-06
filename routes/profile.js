var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var itemData = require('../models/profileModel');
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


// get request from profile
  // extends to get request and post request to listings


/* gets profile page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'DrewUse'});
});




module.exports = router;
