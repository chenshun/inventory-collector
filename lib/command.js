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

var register = function(packet, next) {
	var key = 'sim:'+packet.IMSI;

	redisClient.hgetall(key, redis.print);
	var registerDone = function(err, reply) {
		redis.print(err, reply);
		redisClient.hgetall(key, function(err, obj) {
			redis.print(err, obj);
			if(next) next(err);
		});
	};	
	
	var now = new Date().getTime();
	if(packet.IMEI) {
		logger.trace('IMSI:%s regiter with IMEI:%s',packet.IMSI,packet.IMEI);
		redisClient.hmset(key, 'IMEI', packet.IMEI, 'lastActiveTime', now, registerDone);
	} else {
		logger.debug(now);
		logger.trace('IMSI:%s heart beat',packet.IMSI);
		redisClient.hmset(key, 'lastActiveTime', now, registerDone);
	}
};

var upload = function(packet, next) {
	logger.trace('IMSI:%s upload:%s',packet.IMSI,packet.data);

	var key = 'inventory:'+packet.IMSI;
	redisClient.lrange(key, 0, -1, redis.print);
	redisClient.lpush(key, packet.data, function(err, reply) {
		redis.print(err, reply);				
		redisClient.lrange(key, 0, -1, function (err, list) {
			redis.print(err, list);
			if(next) next(err);
		});
	});
};

var restrictToRegister = function(packet, next) {
	logger.debug('restrict registered imsi');

	var key = 'sim:'+packet.IMSI;
	redisClient.hget(key, 'lastActiveTime', function(err, reply) {
		if(err) return next(err);
		var now = new Date();
		var out = new Date();
		out.setTime(parseInt(reply)+config.heartbeat_interval);
		if(now > out) return next(new Error('heart break'));
		return next();
	});
};

var command = module.exports = {};

command.stack = {
	'10': [restrictToRegister, upload, register],
	'20': [register],
	'22': [register],
};

command.handle = function(packet, out) {
	var stack = this.stack[packet.cmd];
	var index = 0;
	
	function next(err) {
		var layer;
		
		layer = stack[index++];
		if(!layer || err) {
			if(out) return out(err);
			return;
		}
		
		try {
			layer(packet, next);
		} catch(e) {
			next(e);
		}
	}
	
	next();
};