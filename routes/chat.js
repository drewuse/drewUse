var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');
var chatData = require('../models/chat_model');
var bodyParser = require('body-parser')
var $ = require("jquery");
var Long = require('mongodb').Long;
var querystring = require('querystring');




mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

var root_socket_ids = [];
var user_socket_ids = [];


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))


/* GET home page. */
router.get('/', checkAuthentication, setupSocketListeners, function(req, res, next) {
  // Setup chat data and render chat page
  preselectedThread = req.query.preselectedThread ? req.query.preselectedThread : '';
  chatData.find({allParticipants:
                  {$elemMatch :
                    {
                    email: req.session.passport.user._json.email
                    }
                  }
                }
                ).populate('item').sort({ dateChatCreated: -1 }).then(function(doc) {
    res.render('chat', { title: 'DrewUse', currentSession: req.session, chats:doc, preselectedThread:preselectedThread});
  });
});

function setupSocketListeners(req, res, next) {
  // Setup socket.io connections for real-time chat
  var io = req.app.get('socketio');
  // io.on('connection', (socket) => {
  //   // Prevent duplicate emits by removing the connection listeners for any subsequent connections with the same ID
  //   /* This hack was inspired by this SO answer: https://stackoverflow.com/a/43685951 */
  //   root_socket_ids.push(socket.id);
  //   if (root_socket_ids[root_socket_ids.length-1] === socket.id) {
  //     io.removeAllListeners('connection');
  //   }

  //   console.log('reached here');

  //   // // test two-way socket connection
  //   // console.log('Emitting from chat.js ...');
  //   // socket.emit('hi');
  //   // socket.on('send to chat.js', (data) => {
  //   //   console.log('socket event recd from client in chat.js');
  //   // });
  // })

  // Initialize namespace for user
  // var x = io.of('/hello');
  // x.on('connect', socket => {
  //   console.log('hhhdhdhdhdh');
  //   // socket.on('hey', (d) => {
  //   //   console.log('ppppppp');
  //   // })
  // })

  var username = req.session.passport.user._json.email.match(/[^@]+/)[0];
  var userSocket = io.of(`/${username}`);
  userSocket.on('connect', socket => {
    // Prevent duplicate emits by removing the connection listeners for any subsequent connections with the same ID
    /* This hack was inspired by this SO answer: https://stackoverflow.com/a/43685951 */
    user_socket_ids.push(socket.id);
    if (user_socket_ids[user_socket_ids.length-1] === socket.id) {
      userSocket.removeAllListeners('connect');
    }
    console.log(`User ${req.session.passport.user._json.email} namespace connected.`);

    // Add send-message listener
    socket.on('newMessage', message => {
      var {byWho:sender, recipient, message:body, thread} = message;
      recipientUsername = recipient.match(/[^@]+/)[0];
      // Add message to DB
      var current_millies = new Date().getTime();
      var current_timestamp = Long.fromNumber(current_millies);
      chatData.update({ _id: thread}, {$push:{messages:[{message:body, byWho:sender, timestamp: current_timestamp}]}}).exec();
      // Emit to both participants' socket namespaces
      io.of(`/${username}`).emit('newMessage', message);
      io.of(`/${recipientUsername}`).emit('newMessage', message);
    });

    // Add get-thread listener
    socket.on('getThread', threadId => {
      chatData.find({_id: threadId})
        .then(doc => {
          userSocket.emit('displayThread', doc[0]);
        });
    });

  })

  next();
}

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
