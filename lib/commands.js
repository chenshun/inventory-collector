var config = require('config.js').config;

var redis = require('redis');
var redisClient = redis.createClient(config.redis.port, config.redis.host);
var logger = require('log4js').getLogger('Commands');
logger.setLevel(config.log.level[process.env.NODE_ENV]);

redis.print = function(err, reply) {
	if(err) {
		logger.error(err);
	} else {
		logger.trace(reply);
	}
};

var register = function(packet, done) {
	var key = 'sim:'+packet.IMSI;

	redisClient.hgetall(key, redis.print);
	var registerDone = function(err, reply) {
		redis.print(err, reply);
		redisClient.hgetall(key, function(err, obj) {
			redis.print(err, obj);
			done();
		});
	};	
	if(packet.IMEI) {
		redisClient.hmset(key, 'IMEI', packet.IMEI, 'lastActiveTime', new Date(), registerDone);
	} else {
		redisClient.hmset(key, 'lastActiveTime', new Date(), registerDone);
	}
};

exports = module.exports = function(connection) {
	switch(connection.packet.cmd) {
		case 10: {
			logger.trace('%s upload:%s',connection.packet.IMSI,connection.packet.data);

			var key = 'inventory:'+connection.packet.IMSI;
			redisClient.lrange(key, 0, -1, redis.print);
			redisClient.lpush(key, connection.packet.data, function(err, reply) {
				redis.print(err, reply);				
				redisClient.lrange(key, 0, -1, function (err, list) {
					redis.print(err, list);
					connection.end();
				});
			});
		}
		break;
		
		case 20: {
			logger.debug('%s register:%s',connection.packet.IMSI,connection.packet.IMEI);
			register(connection.packet, function() {
				connection.end();
			});
		}
		break;
		
		case 22: {
			logger.debug('%s heart breat:%s',connection.packet.IMSI);
			register(connection.packet, function() {
				connection.end();
			});
		}
		break;
	};
};