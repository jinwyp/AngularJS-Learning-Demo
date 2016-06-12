var model = require('../libs/requiredir')('../models');


exports = module.exports = function verifySMSMiddleware(options) {

    // get options
    var opts = options || {};

    return function errorHandler(req, res, next){

        model.userregistration.verifySMSCode(req.body).then(function(resultCode){

            req.userSMSCode = resultCode;
            next();
            return null;
        })
        .catch(next);


    };

};
