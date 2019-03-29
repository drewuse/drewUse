var express = require('express');
var router = express.Router();
// const qb = require('quickblox');
const path = require('path');

// var qb_credentials = {
// 	appId: 76302,
// 	authKey: 'nmnW5YLNZ2HyzM3',
// 	authSecret: 'mTGU5u5D4wEsTEF'
// };

router.get('/', (req, res, next) => {
    // res.render(path.join(__dirname, '..', 'react-chat', 'build', 'index.html'));
    res.render('chat');
});

// router.get('/', (req, res, next) => {
// 	qb.init(qb_credentials.appId, qb_credentials.authKey, qb_credentials.authSecret);
// 	console.log('inited');
// 	qb.createSession((err, results) => {
		
// 	});
// });

module.exports = router;