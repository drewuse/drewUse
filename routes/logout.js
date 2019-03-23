var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.session.destroy(function(e){
        req.logout();
        res.redirect('/');
    });
});


module.exports = router;
