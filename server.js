var net = require('net');
var config = require('config.js').config;

var commands = require('./lib/commands.js');
var logger = require('log4js').getLogger('Server');

var options = {
	allowHalfOpen: (process.env.NODE_ENV!='production')
};

var server = net.createServer(options,function(c) { //'connection' listener
  logger.debug('server connected from:%s:%d', c.remoteAddress, c.remotePort);
	var buffer ='';
	c.setEncoding('utf8');

	c.on('data', function(data) {
		buffer += data;
	});

  c.on('end', function() {
		c.packet = JSON.parse(buffer);
		commands(c);
  });
	
  // c.write('200\r\n');
  // c.pipe(c);
});

server.listen(config.port, function() { //'listening' listener
  logger.info('server bound on Port:%d', config.port);
});