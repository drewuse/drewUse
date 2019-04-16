var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');
var chatData = require('../models/chat_model');
var bodyParser = require('body-parser')
var $ = require("jquery");
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();
var querystring = require('querystring');




mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))


/* GET home page. */
router.get('/', checkAuthentication, function(req, res, next) {
  preselectedThread = req.query.preselectedThread ? req.query.preselectedThread : '';
  chatData.find({allParticipants:
                  {$elemMatch :
                    {
                    email: req.session.passport.user._json.email
                    }
                  }
                }
                ).populate('item').sort({ dateChatCreated: -1 }).then(function(doc) {
    res.render('chat', { title: 'DrewUse', currentUser: req.session.passport.user._json.email, chats:doc, preselectedThread:preselectedThread});
  });
});

router.post('/newMessage', checkAuthentication, function(req,res){
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  var chat = {
    item: mongoose.Types.ObjectId(req.body.itemId),
    seller: req.body.seller,
    interestedBuyer: req.session.passport.user._json.email,
    allParticipants:[ {email: req.session.passport.user._json.email}, {email: req.body.seller} ],
    dateChatCreated: current_timestamp,
    dateChatCreatedComputed: dateReadable
  }
  var data = new chatData(chat);
  data.save((err, doc) => {
    res.redirect('/chat?' + querystring.stringify({'preselectedThread':doc.id}));
  });
});


router.post('/messages/getInfo', checkAuthentication, (req, res) => {
  console.log(req.body.threadId);
  chatData.find({_id: req.body.threadId})
    .then(function(doc) {
      // console.log(doc);
      res.io.emit('allMessages', doc);
    });

});


router.post('/messages', checkAuthentication, async (req, res) => {
  var current_timestamp = Long.fromNumber(current_millies);
  console.log("post messages route");
  console.log(req.body);
  chatData.update({ _id: req.body.threadId}, {$push:{messages:[{message:req.body.message, byWho:req.body.senderName, timestamp: current_timestamp}]}}).exec();
  res.io.emit('message', req.body);

})

//authenticate a user is logged in
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      req.session.authorigin = 'chat';
      res.redirect('/auth/google/callback')
    }
}


module.exports = router;
