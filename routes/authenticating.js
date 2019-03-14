var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

/* GET google auth . */

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user);
    res.json(req.user);
  }
);



module.exports = router;
