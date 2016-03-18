var express = require('express');
var api = express.Router();

var auth = require('../expressmidderware/auth.js');

var movieController = require('../controllers/movie.js');
var userController = require('../controllers/user/user.js');



var jwt = require("express-jwt");
var jwtCheck = jwt({
    secret: 'shhhhhhared-secret',
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        } else if (req.cookies && req.cookies['X-Access-Token']) {
            return req.cookies['X-Access-Token'];
        }
    return null;
  }
});



api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);







api.post('/user/signup', userController.signUp);
api.post('/user/login', userController.login);
api.post('/user/logout', userController.logout);



/* GET users listing. */
api.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

api.get('/user/info', jwtCheck, userController.userInfo);






module.exports = api;
