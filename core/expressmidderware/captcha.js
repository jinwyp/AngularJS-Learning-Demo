var ccap = require('ccap')();//Instantiated ccap class
exports.generateCaptcha = function(req, res, next) {

    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    Captcha.createQ({txt: txt})
    .then(function(captcha) {
        res.cookie('captcha-id', captcha._id.toString());
        res.removeHeader('content-type');
        res.end(buf);
        console.log(txt);
    })
    .fail(next)
    .done();
};
