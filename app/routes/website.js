var express = require('express');
var website = express.Router();





/* GET home page. */

website.get('/', function(req, res, next) {
  res.redirect('/angular');
});

website.get('/web/login', function(req, res, next) {
    res.render('website/login', { title: '登陆' });
});





website.get('/angular', function(req, res, next) {
  res.render('angulardemo/index', { title: '轻松学习Angular JS' });
});

website.get('/angular/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});




module.exports = website;
