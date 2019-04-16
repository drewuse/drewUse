let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemData = require('../models/item_model');

var chatDataSchema= new Schema({
  // Initial info
  item: { type: Schema.Types.ObjectId, ref: 'itemData'},
  interestedBuyer: String,
  seller: String,
  messages:[{message:String, byWho: String, timestamp:Number}],
  allParticipants:[{email:String}],
  dateChatCreated: Number,
  dateChatCreatedComputed: String
},{collection:'chats'});


var chatData = mongoose.model('chats', chatDataSchema);

module.exports = chatData;
