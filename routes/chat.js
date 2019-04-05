var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');
var chatData = require('../models/chat_model');
var bodyParser = require('body-parser')
var $ = require("jquery");
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();




mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');


router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json());

/* GET home page. */
router.get('/' , function(req, res, next) {
  chatData.find({users:
                  {$elemMatch :
                    {
                    email: req.session.passport.user._json.email
                    }
                  }
                }
                ).sort({ dateChatCreated: -1 }).then(function(doc) {
  res.render('chat', { title: 'DrewUse', currentSession: req.session, chats:doc});
  });
});

router.post('/newMessage', function(req,res){
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  var chat ={
    users:[{email: req.session.passport.user._json.email},{email: req.body.selectedPersonSelling} ],
    dateChatCreated: current_timestamp,
    dateChatCreatedComputed: dateReadable,
    dateChatStartedBy: req.session.passport.user._json.email,
    selectedImageUrl: req.body.selectedImageUrl,
    selectedPostTitle: req.body.selectedPostTitle,
    selectedPersonSelling: req.body.selectedPersonSelling
  }
  var data = new chatData(chat);
  data.save();
  res.redirect('/chat');
});

// displays messages information when thread selected
router.post('/showMessages', function(req, res, next){
  console.log();
})

module.exports = router;
