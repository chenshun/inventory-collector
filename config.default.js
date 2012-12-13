/**
 * config
 */

exports.config = {
	name: 'inventory-collector',
	description: 'Extensivepro inventory collector service',

	host: process.env.SERVER_HOST||'127.0.0.1', 
	port: parseInt(process.env.INVENTORY_COLLECTOR_PORT)||9000,
	timeout: 30000,//milliseconds
	heartbreat_interval: 1800*1000,

  redis: {
		port: process.env.REDIS_PORT||6379,
		host: process.env.REDIS_HOST||"127.0.0.1"
  },
	log:{
		level:{
			development:'TRACE',
			test:'TRACE',
			production:'TRACE',
		}
	}
};