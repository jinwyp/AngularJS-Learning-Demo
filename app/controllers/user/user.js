
var MUser = require('../../models/user/user.js');
var MUserToken = require('../../models/user/usertoken.js');



/**
 * User Sign Up
 */
exports.signUp = function (req, res, next) {

    // MUser.validateNewUser(req.body);

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

    // MUser.validateNewUser(req.body);


    MUser.login(req.body).then(function(resultUser){
        // console.log(resultUser);

        return MUserToken.createToken(resultUser, req);

    }).then(function(resultToken){

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
 * User Info
 */
exports.userInfo = function (req, res, next) {

    // MUser.validateNewUser(req.body);

    return res.status(200).json({ok:'ok'});


};
