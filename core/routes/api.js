var express = require('express');
var api = express.Router();

var auth = require('../business-middleware/auth.js');
var verifySMS = require('../business-middleware/verifysms.js');

var movieController = require('../controllers/movie.js');
var userController = require('../controllers/user/user.js');






api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);







api.post('/user/verify/sms', userController.userSendVerifySMS);
api.post('/user/verify/email', userController.userSendVerifyEmail);

api.post('/user/signup', verifySMS(), userController.signUp);
api.post('/user/login', userController.login);
api.post('/user/logout', userController.logout);




api.get('/user/info', auth.loginToken(), userController.userInfo);






module.exports = api;
