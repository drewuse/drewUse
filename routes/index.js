var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

console.log(itemData);

/* GET home page. */
router.get('/', function(req, res, next) {
  itemData.find().sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('index', { title: 'DrewUse', items:doc});
    });
});




module.exports = router;
