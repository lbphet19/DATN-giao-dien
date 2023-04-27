const winston = require('winston')
const logger = winston.createLogger({
	level: process.env.LOG_LEVEL | 'info',
	format: winston.format.combine(winston.format.simple(), winston.format.splat()),
	transports: [
		new winston.transports.File({filename: 'combined.log'})
	]
})
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(winston.format.simple(), winston.format.splat()),
	}))
}

module.exports = logger
