var conn = require('../support/connection')();

describe('#Heartbeat acceptance', function(){
	it('Should success Heartbeat with IMSI', function(done) {
		var json = {
	    "cmd": 22,
	    "IMSI": "404685505601234"
		};
		conn.json(json, done);
	})
})