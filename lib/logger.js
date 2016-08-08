'use strict';

require('dotenv').config();

const winston = require('winston');

let logger = null;

if (process.env.NODE_ENV === "production") {
    logger = new (winston.Logger)({
        transports: [ new (winston.transports.File)({ filename: __dirname + '/../logger.log' }) ]
    });
} else {
    logger = new (winston.Logger)({
        transports: [ new (winston.transports.Console) ]
    });
}

module.exports = logger;
