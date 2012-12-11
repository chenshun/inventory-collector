var config = require('config.js').config;

var redis = require('redis');
var redisClient = redis.createClient(config.redis.port, config.redis.host);
var logger = require('log4js').getLogger('Commands');

exports = module.exports = function(connection) {
	switch(connection.packet.cmd) {
		case 10:
		logger.debug('%s upload:%s',connection.packet.IMSI,connection.packet.data);
		redisClient.get(connection.packet.IMSI, function (err, reply) {
			logger.info('Before: %s', reply.toString());
			redisClient.append(connection.packet.IMSI, connection.packet.data);
			redisClient.get(connection.packet.IMSI, function (err, reply) {
				logger.info('After: %s', reply.toString());
				connection.end();
			})
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