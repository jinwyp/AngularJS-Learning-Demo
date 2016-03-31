var config = require('config');
var tokenConfig = config.get('userlogin');

var tokenFieldName = tokenConfig.tokenFieldName || 'X-Access-Token';
var TOKEN_EXPIRATION_SEC = 1000 * 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay;

var model = require('../../libs/requiredir')('../../models');






/**
 * User Send Verify Message by SMS / Email
 */
exports.userSendVerifyMessage = function (req, res, next) {

    if (req.body.mobile){
        model.userregistration.validation.userMobile(req.body.mobile);
    }else{
        model.userregistration.validation.userEmail(req.body.email);
    }

    model.userregistration.validation.messageType(req.body.messageType);

    req.body.sendType = model.userregistration.constantSendType.sms;

    model.userregistration.sendMessage(req.body, req).then(function(result){
        return res.status(200).json({code:result.code});
    })
    .catch(next);


};




/**
 * User Sign Up
 */
exports.signUp = function (req, res, next) {

    model.user.validation.username(req.body.username);
    model.user.validation.userPassword(req.body.password);

    model.user.signUp(req.body).then(function(resultUser){

        return res.status(200).json(resultUser);

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







/**
 * User Login
 */
exports.login = function (req, res, next) {

    model.user.validation.userPassword(req.body.password);


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



/**
 * User Logout
 */
exports.logout = function (req, res, next) {

    res.clearCookie(tokenFieldName);


    // if(config.domain){
    //     res.clearCookie('express.sid', {domain: '.'+config.domain});
    // }

    model.usertoken.removeToken(req.body.token).then(function(resultToken){

        if (resultToken){
            return res.status(200).send({message: 'Logout success, Token Deleted'});
        }else{
            return res.status(200).send({message: 'Logout success, Token not found'});
        }

    })
    .catch(next);



};




/**
 * User Info
 */
exports.userInfo = function (req, res, next) {

    // model.user.validateNewUser(req.body);

    return res.status(200).json(req.user);


};
