var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var profileData = require('../models/profileModel');
var authenticate = require('./authenticating');


mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

// get request from profile
  // extends to get request and post request to listings
/* gets profile page.(render posting owned by user and user profile)*/
router.get('/',checkAuthentication, function(req, res, next) {
  itemData.find({postedBy:req.session.passport.user._json.email}).sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('profile', { title: 'DrewUse', items:doc, currentSession: req.session});
    });
    console.log("You have accessed the protected endpoint!");
});

// post request to delete listings
router.get('/deleteItem/:id', function(req,res,next){
    var id = req.params.id;
    itemData.findByIdAndRemove(id).exec();
    res.redirect('/profile');
});

router.get('/modifyItem/:id', function(req,res,next){
    var item={
      sold: true
    };
    var id = req.params.id;
    itemData.updateOne({ _id: id}, {$set:{sold:true}}).exec();
      console.log('Item updated');
      res.redirect('/profile');
});

router.get('/validatingUser', function(req,res,next){
  console.log(req.session.passport.user._json.email);
  profileData.count({ email: req.session.passport.user._json.email })
  .then((count) => {
    if (count > 0) {
      console.log('Email exists.');
      res.redirect('/');
    } else {
      console.log('Email does not exist.');
      res.redirect('/');
    }
  });
});

//authenticate a user is logged in
function checkAuthentication(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      res.redirect('/auth/google/callback')
    }
}
// post request to edit listings



module.exports = router;
