var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

var Schema = mongoose.Schema;

var userDataSchema= new Schema({
  username: {type: String, required:true},
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  img: Array,
  itemsListed: Array,
  itemsSold: Array,
  itemsInterestedIn: Array,
  ItemsBought: Array
});

// get request from profile
  // extends to get request and post request to listings


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'DrewUse'});
});

// router.post('/submit', function(req,res,next){
//
// });
// get request example
// router.get('/test/:id', function(req,res, next){
//   res.render('test', {output:req.params.id});
// });
//
// post request example
// router.post('/test/submit', function(req,res,next){
//   var id= req.body.id;
//   res.redirect("/test/"+ id);
// });



module.exports = router;
