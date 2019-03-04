var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DrewUse', success:req.session.success, errors:req.session.errors});
  req.session.errors=null;

});

router.post('/submit', function(req,res,next){
  // Check validity
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min:4}).equals(req.body.confirmPassword);
  var errors= req.validationErrors();
  if (errors){
    req.session.errors= errors;
    req.session.success= false;
  }else{
    req.session.success=true;
  }
  res.redirect('/');
});
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
