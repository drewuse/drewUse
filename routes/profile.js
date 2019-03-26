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
  itemData.find({postedBy:req.session.passport.user._json.email, sold:false}).sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('profile', { title: 'DrewUse', items:doc, currentSession: req.session});
    });
    console.log("You have accessed the selling link!");
});

router.get('/sold', function(req,res,next){
  itemData.find({postedBy:req.session.passport.user._json.email, sold:true}).sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('profile', { title: 'DrewUse', items:doc, currentSession: req.session});
    });
    console.log("You have accessed the sold link!");
});

router.get('/bought', function(req,res,next){
  itemData.find({boughtBy:req.session.passport.user._json.email}).sort( { datePosted: -1 } )
    .then(function(doc) {
      res.render('profile', { title: 'DrewUse', items:doc, currentSession: req.session});
    });
    console.log("You have accessed the bought link!");
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

//authenticate a user is logged in
function checkAuthentication(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      req.session.authorigin = 'profile';
      res.redirect('/auth/google/callback')
    }
}
// post request to edit listings

router.get('/validateUser', function(req, res, next) {
  var fields = req.session.passport.user._json
  var username = /[^@]+/.exec(fields.email);
  profileData.findOneAndUpdate(
    {username: username}, // query
    { username: username, // update fields
      firstName: fields.given_name,
      lastName: fields.family_name,
      img: fields.picture,
      email: fields.email
    },
    {upsert: true}, // upsert -- insert if !exists, update if exists
    (err, doc) => {
      if (err) {
        console.log(`User Validation: Error ${err}`)
      } else {
        console.log(`User Validation: Complete.\nRedirecting back to ${req.session.authorigin}`)
        if (typeof req.session.authorigin !== 'undefined') {
          res.redirect(`/${req.session.authorigin}`);
        } else {
          res.redirect('/');
        }
      }
    }
  );
});



module.exports = router;
