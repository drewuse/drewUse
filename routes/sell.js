var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/sellerModel');
var Long = require('mongodb').Long;
var current_millies = new Date().getTime();
// For photo upload and storage
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
// var options = require('../options');

// var dbLoginData={
//   username: options.storageConfig.username,
//   password: options.storageConfig.password
// }
//
// var dbConnect='mongodb://'+dbLoginData.username+':'+dbLoginData.password+"@ds127802.mlab.com:27802/"+dbLoginData.username;

// Cloudinary init
// TODO: Store these credentials in a config file
cloudinary.config({
  cloud_name: 'drewused',
  api_key: '566515953594887',
  api_secret: 'NBU12-uwOLFZTqSziNSxYHyLrDo'
});

// Mongoose init
// TODO: Store these credentials in a config file
mongoose.connect('mongodb://heroku_v3r3b96l:rdihvrpq58acjbaole0f7jbo7c@ds127802.mlab.com:27802/heroku_v3r3b96l');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'listingImages'
});
const parser = multer({ storage: storage });
const multerMiddleware = parser.single('image');

/* get sellers page. */
router.get('/', function(req, res, next) {
  res.render('sell', {title: 'DrewUse'});
});

// post request to create listings
router.post('/insert' /* multerMiddleware /* this middleware processes the image, adds it to cloudinary, and sends the access parameters in the req object */ , (req, res) => {
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  var item = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    datePosted: current_timestamp,
    datePostedComputed: dateReadable,
    // TODO: Add support for multiple images
    // image_url: req.file.url, 
    // image_public_id: req.file.public_id,
    // imgs:[{
    //   url: req.file.url,
    //   public_id: req.file.public_id,
    // }],
    // postedBy: , /* TODO: retrieve from database */
  };
  console.log(item);
  var data = new itemData(item);
  data.save();

  require('../models/sellerModel').find().then(doc => {
    console.log('ddd');
    console.log(doc);
  })

  res.redirect('/');
});

module.exports = router;
