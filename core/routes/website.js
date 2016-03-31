var express = require('express');
var website = express.Router();





/* GET home page. */

website.get('/', function(req, res, next) {
  res.render('website/index', { title: '欢迎来到杰酷,一个面向未来的网站' });
});

website.get('/web/signin', function(req, res, next) {
    res.render('website/login', { title: '登陆' });
});

website.get('/web/signup', function(req, res, next) {
    res.render('website/signup', { title: '注册' });
});




website.get('/angular', function(req, res, next) {
  res.render('angulardemo/index', { title: '轻松学习Angular JS' });
});

website.get('/angular/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});




module.exports = website;
