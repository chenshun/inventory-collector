/**
 * config
 */

exports.config = {
	name: 'inventory-collector',
	description: 'Extensivepro inventory collector service',

	evn:'development',
	host: process.env.SERVER_HOST||'127.0.0.1', 
	port: parseInt(process.env.INVENTORY_COLLECTOR_PORT)||9000,

  redis: {
		port: process.env.REDIS_PORT||6379,
		host: process.env.REDIS_HOST||"127.0.0.1"
  }
};