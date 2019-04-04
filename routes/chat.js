var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');
var chatData = require('../models/chat_model');
var bodyParser = require('body-parser')
var $ = require("jquery");



mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


// var Message = mongoose.model('Message',{
//   name : String,
//   message : String
// })


/* GET home page. */
router.get('/' ,function(req, res, next) {
  res.render('chat', { title: 'DrewUse', currentSession: req.session});
});

router.get('/newMessage', function(req,res,next){
  res.render("chat",{ title: 'DrewUse', currentSession: req.session});
  console.log("starting a new message with")
})


module.exports = router;
