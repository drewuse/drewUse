var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


/* GET home page. */
router.get('/' ,function(req, res, next) {
  // Filter based on requests code
  results = itemData;
  if (req.query.condition) {
  	results = results.find({condition:req.query.condition});
  }
  results.find({sold:false}).sort( { datePosted: -1 } )
  	.then(function(doc) {
      res.render('index', { title: 'DrewUse', items:doc, currentSession: req.session});
    });
});




module.exports = router;
