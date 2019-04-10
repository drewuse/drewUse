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



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))


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





router.post('/messages/getInfo', (req, res) => {
  console.log(req.body.threadId);
  chatData.find({_id: req.body.threadId})
    .then(function(doc) {
      console.log(doc);
      res.render('chat', { title: 'DrewUse', currentSession: req.session, chatMessages:doc});
    })

})

// chatData.find({_id: req.body.threadId})
//   .then(function(doc) {
//     res.render('chat', { title: 'DrewUse', currentSession: req.session, chatMessages:doc});
//   })


// router.get('/messages/getInfo', (req, res) => {
//   var threadId= res.get('threadId')
//   console.log(threadId);
//   chatData.find({_id:"5cad5ab604972513ad33d371"})
//     .then(function(doc) {
//   res.send(doc);
//   });
// });


router.post('/messages',async (req, res) => {
  console.log("post messages route");
  console.log(req.body);
  chatData.update({ _id: req.body.threadId}, {$push:{messages:[{message:req.body.message, byWho:req.body.senderName}]}}).exec();
  res.io.emit('message', req.body);

})


module.exports = router;
