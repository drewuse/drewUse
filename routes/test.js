var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
// var itemData = require('../models/sellerModel');
// var options = require('../options');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


// mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("API working");
});




module.exports = router;
