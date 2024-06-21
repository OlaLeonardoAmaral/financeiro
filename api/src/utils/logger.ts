const pino = require('pino');

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
        mensageFormat: '{levelLabel} - {pid} - url:{req.url}'
    }
})

export { logger }