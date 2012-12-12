var config = require('config.js').config;

var redis = require('redis');
var redisClient = redis.createClient(config.redis.port, config.redis.host);
var logger = require('log4js').getLogger('Commands');
logger.setLevel(config.log.level[process.env.NODE_ENV]);

exports = module.exports = function(connection) {
	switch(connection.packet.cmd) {
		case 10:
		logger.trace('%s upload:%s',connection.packet.IMSI,connection.packet.data);
		redisClient.lrange(connection.packet.IMSI, 0, -1, function (err, list) {
			if(err) logger.error(err);
			if(list) {
				logger.trace('Before: %s', list);
			}
		})
		redisClient.lpush(connection.packet.IMSI, connection.packet.data);
		redisClient.lrange(connection.packet.IMSI, 0, -1, function (err, list) {
			if(err) logger.error(err);
			if(list) {
				logger.trace('After: %s', list);
			}
			connection.end();
		})
		break;
		
		case 20:
		logger.debug('%s register:%s',connection.packet.IMSI,connection.packet.IMEI);
		break;
		
		case 22:
		logger.debug('%s heart breat:%s',connection.packet.IMSI);
		break;
	};
};