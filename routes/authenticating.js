var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
    console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
    return cb(null, profile);
  },
));

/* GET google auth . */
router.get('/',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user);
    res.json(req.user);
  }
);



module.exports = router;
