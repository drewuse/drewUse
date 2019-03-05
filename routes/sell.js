var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


// post request to create listings


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sell', {title: 'DrewUse'});
});

module.exports = router;
