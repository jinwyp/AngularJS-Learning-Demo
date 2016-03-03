var config = require('config');
var tokenConfig = config.get('userlogin');

var tokenFieldName = tokenConfig.tokenFieldName || 'X-Access-Token';
var TOKEN_EXPIRATION_SEC = 1000 * 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay;

var MUser = require('../../models/user/user.js');
var MUserToken = require('../../models/user/usertoken.js');





/**
 * User Sign Up
 */
exports.signUp = function (req, res, next) {

    MUser.validation.username(req.body.username);
    MUser.validation.userPassword(req.body.password);

    MUser.signUp(req.body).then(function(resultUser){

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

    MUser.validation.userPassword(req.body.password);


    MUser.login(req.body).then(function(resultUser){
        // console.log(resultUser);

        return MUserToken.getToken(resultUser, req);

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

    res.status(200).send({message: 'Logout success'});

};




/**
 * User Info
 */
exports.userInfo = function (req, res, next) {

    // MUser.validateNewUser(req.body);

    return res.status(200).json({ok:'ok'});


};
