var should = require('should');
var command = require('../lib/command');
var json = require('./json/command');

describe('#Commands Unit Test', function(){
	describe('##Upload', function(){
		it('Should success upload data', function(done) {
			command.handle(json.upload, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
	describe('##Register', function(){
		it('Should success register IMSI & IMEI', function(done) {
			command.handle(json.register, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
	describe('##Heart beat', function(){
		it('Should success beart beat as IMSI', function(done) {
			command.handle(json.heartbeat, function(err) {
				should.not.exist(err)
				done()
			})
		})
	})
})