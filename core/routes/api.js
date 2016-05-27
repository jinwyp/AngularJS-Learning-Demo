var express = require('express');
var api = express.Router();

var auth = require('../expressmidderware/auth.js');
var verifySMS = require('../expressmidderware/verifysms.js');

var movieController = require('../controllers/movie.js');
var userController = require('../controllers/user/user.js');






api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);







api.post('/user/verify/sms', userController.userSendVerifySMS);
api.post('/user/verify/email', userController.userSendVerifyEmail);

api.post('/user/signup', verifySMS(), userController.signUp);
api.post('/user/login', userController.login);
api.post('/user/logout', userController.logout);





/* GET users listing. */
api.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

api.get('/user/info', auth.loginToken(), userController.userInfo);






module.exports = api;
