var express = require('express');
var api = express.Router();

var movieController = require('../controllers/movie.js');
var userController = require('../controllers/user/user.js');



var jwt = require("express-jwt");
var jwtCheck = jwt({
    secret: 'shhhhhhared-secret'
});



api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);




/* GET users listing. */
api.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});


api.post('/user/signup', userController.signUp);
api.post('/user/login', userController.login);






module.exports = api;
