
var MUser = require('../../models/user/user.js');



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
        console.log(resultUser)
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
