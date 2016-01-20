
var MUser = require('../../models/user/user.js');



/**
 * Signup
 */
exports.signUp = function (req, res, next) {

  if (MUser.validateNewUser(req.body)) MUser.validateNewUser(req.body);


  MUser.create(req.body).then(function(resultUser){
      console.log(resultUser);
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
