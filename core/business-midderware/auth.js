var config = require('config');
var tokenConfig = config.get('userlogin');

var jsonwebtoken = require("jsonwebtoken");

var MUserToken = require('../models/user/usertoken.js');


var checker = require('../business-libs/dataChecker.js');






exports.loginToken = function (options) {
    return function (req, res, next) {

        // var tokenFieldNmae = 'Authorization'; // http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer-04
        var tokenFieldName = tokenConfig.tokenFieldName || 'X-Access-Token';

        function getToken(tokenString){

            if (tokenString && tokenString.length > 0){
                var part = tokenString.split('Bearer ');
                if (part.length === 2) {
                    return part[1];
                }
            }

            return null;
        }

        var token = getToken(req.get(tokenFieldName)); // Get Token From Header

        if (!token){
            token = req.body[tokenFieldName] || req.query[tokenFieldName] || req.cookies[tokenFieldName];
        }

        res.locals.user = null;

        if (options && options.goNextWithoutLogin){
            return next();
        }

        checker.tokenNotFound(token, next);


        jsonwebtoken.verify(token, tokenConfig.jwtTokenSecret, function (err, decode) {

            if (err) {
                if (err.name === 'TokenExpiredError'){
                    return checker.tokenExpired(true, next);
                }
                return checker.tokenDecodeWrong(null, next);
            }

            // console.log(decode);

            MUserToken.getUserFromToken(decode._id, token, function (err, resultUser) {
                if (err) return next(err);

                req.user = resultUser;
                res.locals.user = resultUser;
                return next();
            });
        });

    };

};
