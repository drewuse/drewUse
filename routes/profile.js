var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var profileData = require('../models/profileModel');
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


// render the postings owned by user (rendering all for now since there is no login)


// render user



// post request to delete listings



// post request to edit listings



module.exports = router;
