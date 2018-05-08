'use strict';

var request = require('request');
var fs = require('fs');
var path = require("path");

describe('The PubServer API', function() {
    it('should respond to a GET request at /api/servers/', function(done) {
		request.get(
			{
				'url': 'http://localhost:8080/api/servers/',
				'json': true
			},
			function(err,res,body) {
				expect(res.statusCode).toBe(200);
				expect(body.name).toEqual('PubServer');
				done();
			}
		);
	});
	
    it('should respond to a POST request at /api/servers/', function(done) {

		var jFileData = JSON.parse(fs.readFileSync(path.join(__dirname,'input.json'), 'utf8'));
		request.post(
			{
				'url': 'http://localhost:8080/api/servers/',
				'json': true,
				'headers': {
					"content-type": "application/json",
				},
				'body': jFileData
			},
			function(err,res,body) {
				console.log("BODY:"+body);
				expect(res.statusCode).toBe(200);
				expect(body).toEqual('Succeeded');
				done();
			}
		);
	});

});