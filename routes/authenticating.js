var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
const passport = require('passport');
var profileData = require('../models/profileModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

// Set up passport strategy
passport.use(new GoogleStrategy(
  {
    clientID: '174920512610-2pbh1jrusvbg79p86fndi1nkuf104i8q.apps.googleusercontent.com',
    clientSecret: '5rpSupc69NVmSdKyf7ALetV5',
    callbackURL: "/auth/google/callback",
    scope: ['email'],
  },
  // This is a "verify" function required by all Passport strategies
  (accessToken, refreshToken, profile, cb) => {
    // console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
    return cb(null, profile);
  },
));

/* GET google auth . */
router.get('/',
  passport.authenticate('google', { failureRedirect: '/', session: true, hd: 'drew.edu' }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:');
    // let user = profileData.findOne({"email": req.session.passport.user._json.email});

  res.redirect("/auth/google/callback/validateUser");
}
);

router.get('/validateUser', function(req,res,next){
  console.log(req.session.passport.user._json.email);
  profileData.count({ email: req.session.passport.user._json.email })
  .then((count) => {
    if (count > 0) {
      console.log('Email exists.');
    } else {
      console.log('Email does not exist.');
    }
    console.log(req.session.authorigin);
    if (typeof req.session.authorigin !== 'undefined') {
      res.redirect(`/${req.session.authorigin}`);
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
