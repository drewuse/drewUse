var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var itemData = require('../models/item_model');
var Long = require('mongodb').Long;
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
mongoose.connect('mongodb+srv://jcruz:MJVMFPbhxFyNTe7h@cluster0.ksozamc.mongodb.net/?retryWrites=true&w=majority');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'listingImages'
});

const imageParser = multer({ storage: storage });

/* get sellers page. */
router.get('/', checkAuthentication, function(req, res, next) {
  res.render('sellForm', {title: 'DrewUse', currentSession: req.session});
});

// post request to create listings
router.post('/insert', imageParser.single('image'),  /* this middleware processes the image, adds it to cloudinary, and sends the access parameters in the req object */ (req, res) => {
  var current_millies = new Date().getTime();
  var current_timestamp = Long.fromNumber(current_millies);
  var date = new Date(current_millies);
  var dateReadable = date.toString();
  // Parse form values
  var condition;
  switch (req.body.condition) {
    case 'new': 
      condition = 'New';
      break;
    case 'used-vg': 
      condition = 'Used (Very Good)';
      break;
    case 'used-gd':
      condition = 'Used (Good)'
      break;
    case 'used-ac': 
      condition = 'Used (Acceptable)';
      break;
  }
  var booktype;
  switch (req.body.booktype) {
    case 'textbook':
      booktype = 'Textbook';
      break;
    case 'course-rr':
      booktype = 'Course Required Reading';
      break;
    case 'other':
      booktype = 'non-textbook';
      break;
  }
  // Populate DB schema
  var item = {
    title: req.body.title,
    price: req.body.price,
    imgs: null,
    datePosted: current_timestamp,
    datePostedComputed: dateReadable,
    // TODO: Add support for multiple images
    image_url: req.file.url,
    image_public_id: req.file.public_id,
    // imgs:[{
    //   url: req.file.url,
    //   public_id: req.file.public_id,
    // }],
    condition: condition,
    booktype: booktype,
    description: req.body.description ? req.body.description : '',
    dateSold: null,
    postedBy: req.session.passport.user._json.email,
    boughtBy: null,
    transactionDate: null,
    priceSoldAt: null,
    sold: false
  };
  var data = new itemData(item);
  data.save();

  // require('../models/sellerModel').find().then(doc => {
  //   console.log('ddd');
  //   console.log(doc);
  // })

  res.redirect('/');
});

//authenticate a user is logged in
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
      req.session.authorigin = 'sell';
      res.redirect('/auth/google/callback')
    }
}

module.exports = router;
