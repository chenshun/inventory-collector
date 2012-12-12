var conn = require('../support/connection')();

describe('#Register acceptance', function(){
	it('Should success register IMSI & IMEI', function(done) {
		var json = {
	    "cmd": 20,
	    "IMSI": "404685505601234",
	    "IMEI": "490154203237518"
		};
		conn.json(json, done);
	})
})