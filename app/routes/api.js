var express = require('express');
var api = express.Router();

var movieController = require('../controllers/movie.js');
var userController = require('../controllers/user/user.js');





api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);




/* GET users listing. */
api.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});


api.post('/user', userController.signUp);






module.exports = api;
