

var path = {
    local : 'http://localhost:8088/',
    production : 'http://localhost:8088/'
};

path.api = path.local + 'api/';
path.website = path.local + 'website/';




var userSignupSMS = {
    "messageType": "signup",
    "mobile": "13564568304" //汤圣罡
};

var userSignupEmail = {
    "messageType": "signup",
    "email": "jinwyp@163.com" //汤圣罡
};


var newUser = {
    "grant_type": "password",
    "username": "18621870070", //汤圣罡
    "password": "xwcook789",
    "deviceToken": "0a8b9e7cbe68616cd5470e4c8abb4c1a3f4ba2bee4ca113ff02ae2c325948b8a",
    "couponcode": "XWSALES003"
};




module.exports = {
    path : path,
    user : newUser,
    userSMS : userSignupSMS,
    userEmail : userSignupEmail,
};
