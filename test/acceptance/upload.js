var net = require('net');

var log4js = require('log4js');
var logger = log4js.getLogger('Upload');

if (process.env.SERVER_HOST === '127.0.0.1') {
	var app = require('../..');
}

var config = {
	host: process.env.SERVER_HOST||'127.0.0.1',
	port:	parseInt(process.env.INVENTORY_COLLECTOR_PORT)||9000
};

var json = {
  "cmd": 10,
  "IMSI": "404685505601234",
  "data": "会员：张三 电话：13912345678 消费金额：100元"
};

describe('#Upload acceptance', function(){
	it('Should success upload data', function(done) {
		var client = net.connect(config,
			function() { //'connect' listener
			  logger.info('client connected');
				client.write(JSON.stringify(json));
				client.end();
		});

		client.on('data', function(data) {
		  logger.info(data.toString());
		});

		client.on('end', function() {
		  logger.debug('client disconnected');
			done();
		});
	})
})