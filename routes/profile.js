var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var profileData = require('../models/profileModel');
var options = require('../options');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;


mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');



// get request from profile
  // extends to get request and post request to listings

/* gets profile page.(render posting owned by user and user profile)*/
router.get('/', function(req, res, next) {
  itemData.find().sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('profile', { title: 'DrewUse', items:doc});
    });
});

// render user



// post request to delete listings
router.get('/deleteItem/:id', function(req,res,next){
    var id = req.params.id;
    itemData.findByIdAndRemove(id).exec();
    res.redirect('/profile');
});


// post request to edit listings



module.exports = router;
