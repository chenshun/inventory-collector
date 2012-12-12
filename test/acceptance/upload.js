var conn = require('../support/connection')();

describe('#Upload acceptance', function(){
	it('Should success upload data', function(done) {
		var json = {
	    "cmd": 10,
	    "IMSI": "404685505601234",
	    "data": "会员：张三 电话：13912345678 消费金额：100元"
		};
		conn.json(json, done);
	})
})