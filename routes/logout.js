var express = require('express');
var router = express.Router();


/* Logout of the application. */
router.post('/', function(req, res, next) {
var session;
  session = req.session;
  if(session.uniqueID){
	req.session.destroy();
	res.json({
		"message":"You have been successfully logged out"
	});
  }else{
	res.json({
		"message":"You are not currently logged in"
	});
  }
});

module.exports = router;
