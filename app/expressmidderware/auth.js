var config = require('config');
var tokenConfig = config.get('userlogin');

var jsonwebtoken = require("jsonwebtoken");

var MUserToken = require('../models/user/usertoken.js');

var ValidatonError = require('../errors/ValidationError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');




exports.loginToken = function (options) {
    return function (req, res, next) {

        // var tokenFieldNmae = 'Authorization'; // http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer-04
        var tokenFieldName = 'X-Access-Token';

        function getToken(tokenString){

            if (tokenString && tokenString.length > 0){
                var part = tokenString.split('Bearer ');
                if (part.length === 2) {
                    return part[1];
                }
            }

            return null;
        }

        var token = getToken(req.get(tokenFieldName));

        if (!token){
            token = getToken(req.body[tokenFieldName]) || getToken(req.query[tokenFieldName]) || getToken(req.cookies[tokenFieldName]);
        }

        if (!token){
            return next(new UnauthorizedAccessError(ValidatonError.code.token.tokenNotFound, "User Unauthorized, token not found", "X-Access-Token"));
        }


        jsonwebtoken.verify(token, tokenConfig.jwtTokenSecret, function (err, decode) {
            console.log(err);

            if (err) {
                return next(new UnauthorizedAccessError(ValidatonError.code.token.tokenDecodeWrong, "User Unauthorized, token wrong", "X-Access-Token"));
            }

            console.log(decode);

            return next();



            // exports.retrieve(token, function (err, data) {
            //
            //     if (err) {
            //         req.user = undefined;
            //         return next(new UnauthorizedAccessError("invalid_token", data));
            //     }
            //
            //     req.user = data;
            //
            //
            // });

        });


    };

};
