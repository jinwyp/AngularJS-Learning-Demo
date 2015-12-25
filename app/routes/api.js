var express = require('express');
var api = express.Router();

var movieController = require('../controllers/movie.js');




api.get('/movie', movieController.campaignSingleInfo);
api.get('/movieadd', movieController.addCampaign);

/* GET users listing. */
api.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = api;
