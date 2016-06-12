var winston      = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var path         = require('path');
var mkdirp       = require('mkdirp');


var config = require('config');
var logUrl = path.join(__dirname, config.get('logSavePath'));
var env = process.env.NODE_ENV || 'development';

var fileDebug = logUrl + env + '-debug.log';
var fileError = logUrl + env + '-error.log';

mkdirp.sync(logUrl);

var logger = new (winston.Logger)({
    transports : [
       new (winstonDaily)({name : 'debug-file', level : 'debug', filename : fileDebug, prepend : true}),
       new (winstonDaily)({name : 'error-file', level : 'error', filename : fileError, prepend : true})
    ],
    exitOnError : false

});

module.exports = logger;

