var express = require('express');
//var db = require('./db');
var mysql = require('mysql');
//var generic_pool = require('generic-pool');
//var MySQLPool = require("mysql-pool").MySQLPool;
//var appSchema = require('./node_modules/app.schema.js');

var port = 8080;


/*var connection = mysql.createConnection({
  host     : 'localhost',
  port	   : '3306',
  user     : 'root',
  password : 'admin',
  database : 'dev_test',
});*/

var connection = mysql.createConnection({
  host     : 'localhost',
  port	   : '3306',
  user     : 'root',
  password : '1234',
  database : 'foodonomix',
  multipleStatements : true
});


/*
var pool = generic_pool.Pool({
    name: 'mysql',
    max: 10,
    create: function(callback) {
        new mysql.Database({
            hostname: 'localhost',
            user: 'root',
            password: 'password',
            database: 'database'
        }).connect(function(err, server) {
            callback(err, this);
        });
    },
    destroy: function(db) {
        db.disconnect();
    }
});
*/

var restServer = express.createServer(


express.bodyParser(),
express.router(function(restApp) {

	//var models = appSchema.getModels();
	
	restApp.get('/listdata', function(req, res) { 
		
		connection.query('select * from itembrand; select * from itemtype; select * from shops; select * from shoplocation;', function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//res.send(rows);
			res.json({listdata : {itembrand : rows[0], itemtype : rows[1], shops : rows[2] , shoplocation : rows[3]}});
		});
	});
	
	

/*
	restApp.get('/shoppinglist/:id?', function(req, res) {

		if(req.params.id){
			console.log(req.params.id);
		}
	
		connection.query('select * from shoppinglistitems where shoppinglistitemid = '+ req.params.id, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			console.log('Query result: ', rows);
			res.send(rows);
			
		});
	});
	*/
	
	restApp.get('/shops/:id?', function(req, res) {

		var arg = '';
		if(req.params.id){
			console.log(req.params.id);
			arg = 'where shopid = ' + req.params.id;
		}
	
		connection.query('select * from shops ' + arg, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//console.log('Get ok: ', rows);
			res.json({shops: rows});
			
			//connection.end();
			
		});
	});
	
	
	restApp.post('/shop', function(req, res) {
	
		console.log("restApp.post");
		console.log("req.body.name: " + req.body.name);
		console.log("req.body.location: " + req.body.location);
		
		var query = connection.query('INSERT INTO shops SET ?', req.body, function(err, result) {
		
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			
			console.log("post ok: " + query.sql);
			res.send("Post OK");
		    //connection.end();
		});
		
	});
	
	
	
	restApp.get('/itembrand/:id?', function(req, res) { 

		var arg = '';
		if(req.params.id){
			console.log(req.params.id);
			arg = 'where brandid = ' + req.params.id;
		}
	
		connection.query('select * from itembrand ' + arg, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//res.send(rows);
			res.json({itembrand: rows});
		});
	});
	
	
	restApp.post('/itembrand', function(req, res) {
	
		console.log("restApp.post");
		console.log("req.body.name: " + req.body.name);
		
		var query = connection.query('INSERT INTO itembrand SET ?', req.body, function(err, result) {
		
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			
			console.log("post ok: " + query.sql);
			res.send("Post OK");
		});
		
	});
	
	
	
	
	
	restApp.get('/itemtype/:id?', function(req, res) {

		var arg = '';
		if(req.params.id){
			console.log(req.params.id);
			arg = 'where itemtypeid = ' + req.params.id;
		}
	
		connection.query('select * from itemtype ' + arg, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//res.send(rows);
			res.json({itemtype: rows});
		});
	});
	
	
	
	restApp.post('/itemtype', function(req, res) {
	
		console.log("restApp.post");
		console.log("req.body.name: " + req.body.name);
		console.log("req.body.brandid: " + req.body.brandid);
		
		var query = connection.query('INSERT INTO itemtype SET ?', req.body, function(err, result) {
		
		    if (err) {
				console.log('err: ', err);
				throw err;
			}
			
			console.log("post ok: " + query.sql);
			res.send("Post OK");
		});
		
	});
	
	
	
	
	
	
	restApp.get('/shoppinglist/:id?', function(req, res) {

		var arg = '';
		if(req.params.id){
			console.log(req.params.id);
			arg = 'where shopid = ' + req.params.id;
		}
	
		connection.query('select * from shoppinglist ' + arg, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//console.log('Get ok: ', rows);
			//res.send(rows);
			res.json({shoppinglist: rows});
						
		});
	});
	
	
	restApp.post('/shoppinglist', function(req, res) {
	
		console.log("restApp.post");
		console.log("req.body.name: " + req.body.listuser);
		console.log("req.body.name: " + req.body.listdate);
		
		var query = connection.query('INSERT INTO shoppinglist SET ?', req.body, function(err, result) {
		
		    if (err) {
				console.log('err: ', err);
				throw err;
			}
			
			console.log("post ok: " + query.sql);
			//res.send("Post OK");
			//res.sendStatus(200);
			res.send(200);
		});
		
	});
	
	
	
	restApp.get('/shoppinglistitem/:id?', function(req, res) {

		var arg = '';
		
		if(req.params.id){
			console.log("req.params.id: " + req.params.id);
			arg = 'where shoppinglistid = ' + req.params.id;
			console.log("arg: " + arg);
		}
	
		connection.query('select shoppinglistitemid, itemtypeid, null, priceid, null, null from shoppinglistitems ' + arg, function(err, rows, fields) {
			
			if (err) {
				console.log('err: ', err);
				throw err;
			}
			  
			//console.log('Get ok: ', rows);
			//res.send(rows);
			res.json({shoppinglistitem: rows});
			
			//connection.end();
			
		});
	});



	restApp['delete']('/record/:par', function(req, res) {

		console.log("restApp['delete']");
/*
		var name = req.params.par;
		console.log("par: " + name);

		models.Record.find({name : name}, function(err, record)
		{

		if(!record){
		res.send({error: 'no record found.'});
		return;
		}

		if(err){
		res.send({error: error});	
		}
		else{

		for (var i = 0; i < record.length; i++)
		{
		record[i].remove();
		}

		res.send({result : 'record deleted'});
		}
		});
		*/
	});
})).listen(port);

console.log('server started and listening on port: ' + port);