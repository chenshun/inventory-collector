var should = require('should');
var commands = require('../lib/commands');
var json = require('./json/commands');

describe('#Commands Unit Test', function(){
	describe('##Upload', function(){
		it('Should success upload data', function(done) {
			commands(json.upload, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
	describe('##Register', function(){
		it('Should success register IMSI & IMEI', function(done) {
			commands(json.register, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
	describe('##Heart beat', function(){
		it('Should success beart beat as IMSI', function(done) {
			commands(json.heartbeat, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
})