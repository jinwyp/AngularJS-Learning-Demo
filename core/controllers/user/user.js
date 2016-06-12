var config = require('config');
var tokenConfig = config.get('userlogin');

var tokenFieldName = tokenConfig.tokenFieldName || 'X-Access-Token';
var TOKEN_EXPIRATION_SEC = 1000 * 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay;

var model = require('../../libs/requiredir')('../../models');

var checker = require('../../business-libs/dataChecker.js');





/**
 * User Send Verify Message by SMS
 */
exports.userSendVerifySMS = function (req, res, next) {

    checker.userMobile(req.body.mobile);
    checker.businessMessageType(req.body.messageType);

    req.body.sendType = model.userregistration.constantSendType.sms;

    model.userregistration.sendMessage(req.body, req).then(function(result){
        return res.status(200).json({code:result.code});
    })
    .catch(next);
};


/**
 * User Send Verify Message by Email
 */
exports.userSendVerifyEmail = function (req, res, next) {

    checker.userEmail(req.body.email);
    checker.businessMessageType(req.body.messageType);

    req.body.sendType = model.userregistration.constantSendType.email;

    model.userregistration.sendMessage(req.body, req).then(function(result){
        return res.status(200).json({code:result.code});
    })
    .catch(next);
};



/**
 * User Sign Up
 */
exports.signUp = function (req, res, next) {

    checker.username(req.body.username);
    checker.userPassword(req.body.password);

    if (req.userSMSCode){

        model.user.signUp(req.body).then(function(resultUser){
            resultUser.password = undefined;
            console.log(resultUser.password);
            return res.status(200).json(resultUser);
        })
        .catch(next);

    }else {
        model.user.signUp(req.body).then(function(resultUser){
            resultUser.password = undefined;
            return res.status(200).json(resultUser);
        })
        .catch(next);
    }


};







/**
 * User Login
 */
exports.login = function (req, res, next) {

    checker.userPassword(req.body.password);

    model.user.login(req.body).then(function(resultUser){
        // console.log(resultUser);


        return model.usertoken.getToken(resultUser, req);

    }).then(function(resultToken){
        res.cookie(tokenFieldName, resultToken.accessToken, { maxAge: TOKEN_EXPIRATION_SEC, httpOnly: true });
        return res.status(200).json(resultToken);

      // Remove sensitive data before login
    //   user.password = undefined;
    //   user.salt = undefined;
      //
    //   req.login(user, function (err) {
    //     if (err) {
    //       res.status(400).send(err);
    //     } else {
    //       res.json(user);
    //     }
    //   });
    })
    .catch(next);

};





/*
 * User Logout
 */
exports.logout = function (req, res, next) {

    var token = req.body.accessToken || req.cookies[tokenFieldName];

    res.clearCookie(tokenFieldName);

    // if(config.domain){
    //     res.clearCookie('express.sid', {domain: '.'+config.domain});
    // }
    if (token){
        model.usertoken.removeToken(token).then(function(resultToken){

            if (resultToken){
                return res.status(200).send({message: 'Logout success, Token Deleted'});
            }else{
                return res.status(200).send({message: 'Logout success, Token not found'});
            }

        })
        .catch(next);
    }else{
        return res.status(200).send({message: 'Logout success, Token not passed'});
    }

};




/**
 * User Info
 */
exports.userInfo = function (req, res, next) {

    // model.user.validateNewUser(req.body);
    model.user.find99({}).then(function(result){
        return res.status(200).json(result);
    })
    .catch(next);



};
