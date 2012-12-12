var net = require('net');

var log4js = require('log4js');
var logger = log4js.getLogger('Connection');

if (process.env.SERVER_HOST === '127.0.0.1') {
	var app = require('../..');
}

function connection() {
	var conn = new Connection();
	return conn;
};

function Connection() {
	this.options = {
		host:process.env.SERVER_HOST||'127.0.0.1',
		port:parseInt(process.env.INVENTORY_COLLECTOR_PORT)||9000
	};
};

Connection.prototype.json = function(json, done) {
	var client = net.connect(this.options,
		function() { //'connect' listener
		  logger.info('client connected');
			client.write(JSON.stringify(json));
			client.end();
	});

	client.on('end', function() {
	  logger.info('client disconnected');
		if(done) done();
	});
};

if (typeof module !== "undefined" && module.exports) {
	logger.debug('exports');
	module.exports = connection;
}
