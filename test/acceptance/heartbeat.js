var conn = require('../support/connection')();
var json = require('../json/command');

describe('#Heartbeat acceptance', function(){
	it('Should success Heartbeat with IMSI', function(done) {
		conn.json(json.heartbeat, done);
	})
})