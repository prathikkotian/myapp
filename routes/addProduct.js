var express = require('express');
var router = express.Router();
var isNull = require('is-null-or-empty');
var connection = require('./connection');

/* adding a new product */
router.post('/', function(req, res, next) {
var session;
  session = req.session;
	if(session.uniqueID){
		if(session.role == 'admin'){
			var asin = req.body.asin;
			var productName = req.body.productName;
			var productDescription = req.body.productDescription;
			var group = req.body.group;
			var record = [asin, productName, productDescription, group];

			if(isNull(asin) || isNull(productName) || isNull(productDescription) || isNull(group)){
				res.json({
					"message":"The input you provided is not valid"
				});		
			}else{		
				connection.getConnection(function(err, connection){
					if(err) throw err
					var sql = "insert into products (asin, product_name, product_description, groups) values (?)";
					connection.query(sql, [record], function (err, rows, fields) {
						if (err && err.code == 'ER_DUP_ENTRY') {
							res.json({
								"message":"The input you provided is not valid"
							});	
						}else if(err && err.code != 'ER_DUP_ENTRY'){
							throw err
						}else{
							res.json({
								"message":productName+" was successfully added to the system"
							});
						}
						connection.release();
					});
				});
			}
		}else{
			res.json({
			"message":"You must be an admin to perform this action"
			});
		}
	}else{
		res.json({
			"message":"You are not currently logged in"
		});
	}

});
module.exports = router;
