var express = require('express');
var website = express.Router();





/* GET home page. */

website.get('/', function(req, res, next) {
  res.redirect('/angular');
});



website.get('/angular', function(req, res, next) {
  res.render('angulardemo/index', { title: 'Express' });
});

website.get('/angular/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});




module.exports = website;
