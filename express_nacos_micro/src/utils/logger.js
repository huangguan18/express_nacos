import winston from 'winston';
import { format } from 'winston';
import expressWinston from 'express-winston';
import {application_config} from '../config/application_config.js';

const log_label = application_config.application_name;

const { combine, timestamp, label, printf, prettyPrint, json } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const accesslogger = expressWinston.logger({
    format: combine(
        label({ label: log_label }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, label, timestamp, meta }) => {
            return `${timestamp} [${label}] ${level}: ${message} | ${JSON.stringify(meta)}`;
        })
    ),
    transports: [
        new (winston.transports.Console)({ 'timestamp': true }),
        new (winston.transports.File)({
            filename: './logs/access.log',
            timestamp: true,
            maxsize: 5242880,
            maxFiles: 10
        })
    ]
});

const errorlogger = winston.createLogger({
    format: combine(
        label({ label: log_label }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
    ),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: './logs/error.log',
            timestamp: true,
            maxsize: 5242880,
            maxFiles: 10
        })
    ]
});

const nacoslogger = winston.createLogger({
    format: combine(
        label({ label: log_label }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat
    ),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: './logs/nacos.log',
            timestamp: true,
            maxsize: 5242880,
            maxFiles: 2
        })
    ]
});


// const accesslogger = winston.createLogger({
//     transports: [
//         new (winston.transports.Console)(),
//         new (winston.transports.File)({
//             filename: './logs/access.log',
//             timestamp: 'true',
//             maxsize: 10485760,
//             maxFiles: 10
//         })
//     ]
// });

// accesslogger.stream = {
//     write: function (message, encoding) {
//         accesslogger.info(message);
//     }
// };

const logger = winston.createLogger({
    format: combine(
        label({ label: log_label }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${JSON.stringify(message)}`;
        })
    ),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: './logs/business.log',
            timestamp: true,
            maxsize: 5242880,
            maxFiles: 10
        })
    ]
});

export default logger;
export { accesslogger, errorlogger, nacoslogger };