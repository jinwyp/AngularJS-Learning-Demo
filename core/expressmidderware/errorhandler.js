var debug        = require('debug')('core:errorhandler');

var PrettyErrorLib = require('pretty-error');
var PrettyError = new PrettyErrorLib();
PrettyError.skipNodeFiles(); // this will skip events.js and http.js and similar core node files, this will skip node.js, path.js, event.js, etc.
PrettyError.skipPackage('express', 'mongoose'); // this will skip all the trace lines about express` core and sub-modules

var PageNotFoundError = require('../errors/PageNotFoundError');
var SystemError = require('../errors/SystemError');


exports.PageNotFoundMiddleware = function(req, res, next) {
    next(new PageNotFoundError('404' , 'Page Not Found'));
};




exports.DevelopmentHandlerMiddleware = function(err, req, res, next) {
    var newErr = null;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message, err);
        newErr.stack = err.stack;
    }else{
        newErr = err;
    }

    res.status(newErr.status);

    debug(PrettyError.render(newErr));
    // debug(err.stack);
    // debug(JSON.stringify(newError, null, 4));

    // console.log(req.is('application/json'));

    var resError = {
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        status: newErr.status,
        code: newErr.code,
        field: newErr.field,
        stack: newErr.stack,
        error: newErr
    };


    var type = req.accepts('html', 'json', 'text');

    // Security Header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');


    if (type === 'text'){
        res.setHeader('Content-Type', 'text/plain');
        return res.json(resError);
    }

    if (req.is('application/json') && req.xhr || req.get('Content-Type') === 'application/json' ){
        return res.json(resError);
    }else{
        return res.render('error', resError);
    }
};





exports.ProductionHandlerMiddleware = function(err, req, res, next) {
    var newErr = null;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message, err);
        newErr.stack = err.stack;
    }else{
        newErr = err;
    }

    res.status(newErr.status);

    var resError = {
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        code: newErr.code,
        field: newErr.field
    };

    if (req.is('application/json') && req.xhr || req.get('Content-Type') === 'application/json'){
        return res.json(resError);
    }else{
        return res.render('error', resError);
    }
};



// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){
    var newError = null;

    if (typeof error.type === 'undefined'){
        newError = new SystemError(500, error.message, error);
        newError.stack = error.stack;
    }else{
        newError = error;
    }

    debug('5XX UncaughtException: ', JSON.stringify(newError, null, 4));
    process.exit(1);
});



// To render unhandled rejections created in BlueBird:
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p){
   debug('5XX UnhandledRejection Promise: ', reason);
});



// While PrettyError.start() works out of the box with when.js` unhandled rejections,
// now that wer'e manually rendering errors, we have to instead use npmjs.org/packages/pretty-monitor
// to handle when.js rejections.
