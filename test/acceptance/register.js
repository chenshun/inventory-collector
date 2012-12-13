var conn = require('../support/connection')();
var json = require('../json/command');

describe('#Register acceptance', function(){
	it('Should success register IMSI & IMEI', function(done) {
		conn.json(json.register, done);
	})
})