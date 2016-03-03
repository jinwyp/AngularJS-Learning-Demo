var config = require('config');
var tokenConfig = config.get('userlogin');

var jsonwebtoken = require("jsonwebtoken");

var MUserToken = require('../models/user/usertoken.js');
var MUser = require('../models/user/user.js');

var ValidatonError = require('../errors/ValidationError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');




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

        if (!token){
            return next(new UnauthorizedAccessError(ValidatonError.code.token.tokenNotFound, "User Unauthorized, token not found", "X-Access-Token"));
        }


        jsonwebtoken.verify(token, tokenConfig.jwtTokenSecret, function (err, decode) {

            if (err) {
                if (err.name === 'TokenExpiredError'){
                    return next(new UnauthorizedAccessError(ValidatonError.code.token.tokenExpired, "User Unauthorized, token expired", "X-Access-Token"));
                }

                return next(new UnauthorizedAccessError(ValidatonError.code.token.tokenDecodeWrong, "User Unauthorized, token wrong", "X-Access-Token"));
            }

            // console.log(decode);

            MUserToken.getUserFromToken(decode._id, token, function (err, resultUser) {
                if (err) return next(err);

                req.user = resultUser;
                return next();
            });

        });


    };

};
