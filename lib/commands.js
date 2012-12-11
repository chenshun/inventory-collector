var config = require('config.js').config;

var redis = require('redis');
var redisClient = redis.createClient(config.redis.port, config.redis.host);
var logger = require('log4js').getLogger('Commands');

exports = module.exports = function(packet) {
	switch(packet.cmd) {
		case 10:
		logger.debug('%s upload:%s',packet.IMSI,packet.data);
		break;
		
		case 20:
		logger.debug('%s register:%s',packet.IMSI,packet.IMEI);
		break;
		
		case 22:
		logger.debug('%s heart breat:%s',packet.IMSI);
		break;
	};
};