var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var options = require('../options');

var dbLoginData={
  username: options.storageConfig.username,
  password: options.storageConfig.password
}

var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect(dbConnect);

/* GET home page. */
router.get('/', function(req, res, next) {
  itemData.find().sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('index', { title: 'DrewUse', items:doc});
    });
});




module.exports = router;
