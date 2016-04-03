var express = require('express');
var website = express.Router();

var auth = require('../expressmidderware/auth.js');




/* GET home page. before Login */

website.get('/', auth.loginToken({goNextWithoutLogin:true}), function(req, res, next) {
  res.render('website/index', { title: '欢迎来到杰酷,一个面向未来的网站' });
});

website.get('/web/signup', auth.loginToken({goNextWithoutLogin:true}), function(req, res, next) {
    res.render('website/signup', { title: '注册'});
});

website.get('/web/signin', auth.loginToken({goNextWithoutLogin:true}), function(req, res, next) {
    res.render('website/login', { title: '登陆'});
});


/* GET home page. after Login */

website.get('/web/userhome', auth.loginToken(), function(req, res, next) {
    res.render('website/index', { title: '用户中心' });
});







website.get('/angular', function(req, res, next) {
  res.render('angulardemo/index', { title: '轻松学习Angular JS' });
});

website.get('/angular/demo', function(req, res, next) {
  res.render('angulardemo/demo', { title: 'Express' });
});




module.exports = website;
