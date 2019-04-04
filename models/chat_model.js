let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatDataSchema= new Schema({
  // Initial info
  users:[{name:String}],
  messages:[{message:String, byWho: String, timestamp:Date}],
  dateChatCreated: Date,
  dateChatStartedBy: String
},{collection:'chats'});


var chatData = mongoose.model('chats', chatDataSchema);

module.exports = chatData;
