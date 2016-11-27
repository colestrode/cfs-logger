'use strict'

const winston = require('winston')

// log levels: error, warn, info, verbose, debug, silly
module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      // handle logging uncaughtException
      handleExceptions: true,
      humanReadableUnhandledException: true,
      formatter: (options) => {
        // Return string will be passed to logger.
        let message = (options.message ? options.message : '')
        const now = new Date().toISOString()

        if (options.meta) {
          if (options.meta.stack) {
            const stack = options.meta.stack
            message += `\n${stack.join ? stack.join('\n') : stack}`
          } else if (Object.keys(options.meta).length) {
            message += `\n${JSON.stringify(options.meta, null, 2)}`
          }
        }

        return `${options.level.toUpperCase()} ${now} ${message}`
      }
    })
  ]
})
