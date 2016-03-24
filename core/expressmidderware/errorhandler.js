var debug        = require('debug')('core:errorhandler');

var PrettyErrorLib = require('pretty-error');
var PrettyError = new PrettyErrorLib();
PrettyError.skipNodeFiles(); // this will skip events.js and http.js and similar core node files, this will skip node.js, path.js, event.js, etc.
PrettyError.skipPackage('express', 'mongoose'); // this will skip all the trace lines about express` core and sub-modules

var PageNotFoundError = require('../errors/PageNotFoundError');



exports.PageNotFoundMiddleware = function(req, res, next) {
    next(new PageNotFoundError('404' , 'Page Not Found'));
};




exports.DevelopmentHandlerMiddleware = function(err, req, res, next) {
    res.status(err.status || 500);

    var newError = {
        type : err.type,
        name : err.name,
        message: err.message,
        status: err.status,
        code: err.code,
        field: err.field,
        stack: err.stack,
        error: err
    };

    debug(PrettyError.render(err));
    // debug(err.stack);
    // debug(JSON.stringify(newError, null, 4));

    // console.log(req.is('application/json'));

    if (req.is('application/json') && req.xhr || req.get('Content-Type') === 'application/json' ){
        return res.json(newError);
    }else{
        return res.render('error', newError);
    }
};





exports.ProductionHandlerMiddleware = function(err, req, res, next) {
    res.status(err.status || 500);

    var newError = {
        name : err.name,
        message: err.message,
        code: err.code,
        field: err.field
    };

    if (req.is('application/json') && req.xhr){
        return res.json(newError);
    }else{
        return res.render('error', newError);
    }
};



// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){
    var newError = {
        type : err.type,
        name : err.name,
        message: err.message,
        status: err.status,
        code: err.code,
        field: err.field,
        stack: err.stack,
        error: err
    };

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
