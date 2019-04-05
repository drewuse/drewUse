let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatDataSchema= new Schema({
  // Initial info
  users:[{email:String}],
  messages:[{message:String, byWho: String, timestamp:Date}],
  dateChatCreated: Number,
  dateChatCreatedComputed: String,
  dateChatStartedBy: String,
  selectedImageUrl: String,
  selectedPostTitle: String,
  selectedPersonSelling: String
},{collection:'chats'});


var chatData = mongoose.model('chats', chatDataSchema);

module.exports = chatData;
