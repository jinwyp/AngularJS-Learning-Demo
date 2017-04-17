/**
 * Created by jinwyp on 6/12/16.
 */


var validator = require('validator');
var code = require('./validationCode.js');

var ValidationError = require('../errors/ValidationError.js');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError.js');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError.js');

var businessMessageTypeList = require('../models/modelConstant').businessMessageTypeList ;


function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}


function throw409 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext) ){
        return isNext(new ValidationError(code, message, field) );
    }else{
        throw (new ValidationError(code, message, field))
    }
}

function throw401 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext) ){
        return isNext(new UnauthenticatedAccessError(code, message, field) );
    }else{
        throw (new UnauthenticatedAccessError(code, message, field))
    }
}

function throw403 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext) ){
        return isNext(new UnauthorizedAccessError(code, message, field) );
    }else{
        throw (new UnauthorizedAccessError(code, message, field))
    }
}








var validation = {
    username : function (username, next){
        if (!validator.isLength(username, 4, 30))  return throw409(code.user.usernameWrong.code, code.user.usernameWrong.message, code.user.usernameWrong.field, next);
    },
    userPassword : function (password, next){
        if (!validator.isLength(password, 6, 30)) return throw409(code.user.passwordWrong.code, code.user.passwordWrong.message, code.user.passwordWrong.field, next);
    },
    userEmail : function (email, next){
        if (!validator.isEmail(email)) return throw409(code.user.emailWrong.code, code.user.emailWrong.message, code.user.emailWrong.field, next);
    },
    userMobile : function (mobile, next){
        if (!validator.isMobilePhone(mobile, 'zh-CN')) return throw409(code.user.mobileWrong.code, code.user.mobileWrong.message, code.user.mobileWrong.field, next);
    },

    usernameExist : function (user, next){
        if (user) return throw409(code.user.usernameExist.code, code.user.usernameExist.message, code.user.usernameExist.field, next);
    },
    userEmailExist : function (user, next){
        if (user) return throw409(code.user.emailExist.code, code.user.emailExist.message, code.user.emailExist.field, next);
    },
    userMobileExist : function (user, next){
        if (user) return throw409(code.user.mobileExist.code, code.user.mobileExist.message, code.user.mobileExist.field, next);
    },


    userNotFound : function (user, next){
        if (!user) return throw401(code.user.userNotFound.code,code.user.userNotFound.message, code.user.userNotFound.field, next);
    },

    userUnauthorized : function (){
        return throw401(code.user.passwordNotMatch.code, code.user.passwordNotMatch.message, code.user.passwordNotMatch.field);
    },


    businessMessageType : function (type, next){
        if (businessMessageTypeList.indexOf(type) === -1) return throw409(code.user.businessMessageTypeWrong.code, code.user.businessMessageTypeWrong.message, code.user.businessMessageTypeWrong.field);
    },

    SMScode : function (smsCode, next){
        if (!smsCode ) return throw409(code.user.SMSCodeLengthWrong.code, code.user.SMSCodeLengthWrong.message, code.user.SMSCodeLengthWrong.field);
    },
    SMScodeNotFound : function (smsCode, next){
        if (!smsCode) return throw409(code.user.SMSCodeNotFound.code, code.user.SMSCodeNotFound.message, code.user.SMSCodeNotFound.field);
    },
    SMScodeExpired : function (isExpired, next){
        if (isExpired) return throw409(code.user.SMSCodeExpired.code, code.user.SMSCodeExpired.message, code.user.SMSCodeExpired.field);
    },




    token : function (token, next){
        if (!validator.isLength(token, 100, 200)) return throw409(code.token.tokenLengthWrong.code, code.token.tokenLengthWrong.message, code.token.tokenLengthWrong.field, next);
    },

    tokenNotFound : function (token, next){
        if (!token) return throw401(code.token.tokenNotFound.code, code.token.tokenNotFound.message, code.token.tokenNotFound.field, next);
    },
    tokenUserNotFound : function (user, next){
        if (!user) return throw401(code.token.userNotFound.code, code.token.userNotFound.message, code.token.userNotFound.field, next);
    },
    tokenDecodeWrong : function (token, next){
        if (!token) return throw401(code.token.tokenDecodeWrong.code, code.token.tokenDecodeWrong.message, code.token.tokenDecodeWrong.field, next);
    },
    tokenExpired : function (tokenIsExpired, next){
        if (tokenIsExpired) return throw401(code.token.tokenExpired.code, code.token.tokenExpired.message, code.token.tokenExpired.field, next);
    }

};



module.exports = validation;