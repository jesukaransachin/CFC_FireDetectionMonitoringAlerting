var express = require('express');
var cfenv = require('cfenv');
var app = express();
var request = require('request');
var Cloudant = require('cloudant');
app.use(express.static(__dirname + '/public'));

var cloudant_url = "https://02c1be39-46eb-4173-a52d-561a9642e640-bluemix:32403805cb4714ca83a70cf23c700caf4bd7afd44de71294056fa9736dd032ae@02c1be39-46eb-4173-a52d-561a9642e640-bluemix.cloudant.com";

//Connect using cloudant npm and URL obtained from previous step
var cloudant = Cloudant({url: cloudant_url});
//Edit this variable value to change name of database.
var dbname = 'weatherforecast';
var db;
var count=0;
db = cloudant.db.use(dbname);

setInterval(function(){
var url = "https://b157aa5e-708c-4665-9d2e-0e9f64c4bcb0:3NnNr2Jw2V@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/45.42/75.69/forecast/daily/10day.json?units=m&language=en-US";
 request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				var data1 = body;
				count++;
				count > 5 ? data1.isFire = 0 : data1.isFire = 1 ;
				 var dbUrl = cloudant_url + "/weatherforecast";
				  request({
				 url: dbUrl,
				 json: true
				}, function (error, response, body) {
				db.insert(data1, function(err, data){
					if (!err)
					{
						console.log("Added new name");
						// name_string="{\"added\":\"Yes\"}";
						// res.contentType('application/json'); //res.contentType and res.send is added inside every block as code returns immediately
						// res.send(JSON.parse(name_string));
					}
					else
					{
						console.log("Error inserting into DB " + err);
						// name_string="{\"added\":\"DB insert error\"}";
						// res.contentType('application/json');
						// res.send(JSON.parse(name_string));

					}
				});
		});
			})
// 			});	
console.log('Running every 10 minutes');
},600000);

var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});