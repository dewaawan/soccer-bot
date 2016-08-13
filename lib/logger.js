'use strict';

require('dotenv').config();

const moment  = require('moment');
const winston = require('winston');
const Mail    = require('winston-mail').Mail;

let logger = null;
const now  = moment();

if (process.env.NODE_ENV === "production") {
    // On production, log to logger.log file and send email upon error
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                filename: __dirname + '/../logger.log',
                name: 'logger.log',
            }),
            new (winston.transports.Mail)({
                level: 'error',
                subject: 'Soccer Bot Error Report (' + now.utc().format().toString() + ')',
                formatter: function(options) {
                    return `${options.level} - ${now.utc().format().toString()} (${now.format('LLLL Z').toString()})\n\n${(options.message !== undefined ? options.message : '')}`;
                },
                to: process.env.ERROR_TO,
                from: process.env.ERROR_LOGIN,
                host: process.env.ERROR_HOST,
                port: Number(process.env.ERROR_PORT),
                username: process.env.ERROR_LOGIN,
                password: process.env.ERROR_PASSWORD,
                ssl: true
            })
        ]
    });
} else {
    // Not on production, simply log to console
    logger = new (winston.Logger)({
        transports: [ new (winston.transports.Console) ]
    });
}

module.exports = logger;
