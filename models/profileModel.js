let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileDataSchema= new Schema({
  username: {type: String, required:true},
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  email: String,
  img: Array,
  itemsListed: Array,
  itemsSold: Array,
  itemsInterestedIn: Array,
  ItemsBought: Array
},{collection:'profiles'});

var profileData = mongoose.model('profileData', profileDataSchema);

module.exports = profileData;
