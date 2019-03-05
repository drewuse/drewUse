var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

// get request all listings 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DrewUse'});
});



module.exports = router;
