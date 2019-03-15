var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();
// var options = require('../options');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


/* get sellers page. */
router.get('/', checkAuthentication, function(req, res, next) {
  res.render('sell', {title: 'DrewUse'});
});

// post request to create listings
router.post('/insert', function(req, res, next) {
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  var item = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imgs: null,
    datePosted: current_timestamp,
    datePostedComputed: dateReadable,
    dateSold: null,
    postedBy: req.session.passport.user._json.email,
    boughtBy: null,
    transactionDate: null,
    priceSoldAt: null
  };
  var data = new itemData(item);
  data.save();

  res.redirect('/');
});

//authenticate a user is logged in
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      res.status(403).json({
       message: 'must be logged in to continue',
     });
    }
}

module.exports = router;
