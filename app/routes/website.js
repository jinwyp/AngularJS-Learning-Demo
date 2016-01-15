var express = require('express');
var website = express.Router();


var jwt = require("express-jwt");
var jwtCheck = jwt({
    secret: 'shhhhhhared-secret'
});


/* GET home page. */

website.get('/', function(req, res, next) {
  res.redirect('/angular');
});



website.get('/angular', jwtCheck, function(req, res, next) {
  res.render('angulardemo/index', { title: 'Express' });
});

website.get('/angular/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});





module.exports = website;
