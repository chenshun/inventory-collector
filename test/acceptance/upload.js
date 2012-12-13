var conn = require('../support/connection')();
var json = require('../json/command');

describe('#Upload acceptance', function(){
	it('Should success upload data', function(done) {
		conn.json(json.upload, done);
	})
})