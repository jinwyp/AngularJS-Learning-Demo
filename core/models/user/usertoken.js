/**
 * Created by jinwyp on 2/2/2016.
 */


/**
 * Module dependencies
 */

var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
 // var mongooseTimestamps = require('mongoose-timestamp');

mongoose.Promise = Promise;

var validator = require('validator');
var moment = require('moment');
var ipaddr = require('ipaddr.js');


var config = require('config');
var tokenConfig = config.get('userlogin');

var jsonwebtoken = require("jsonwebtoken");

var TOKEN_EXPIRATION_SEC = 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay;
var TOKEN_EXPIRATION_SEC_RememberMe = 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay * 6;
var TOKEN_EXPIRATION_DAY_RememberMe = tokenConfig.jwtTokenExpireDay * 6;

var ValidatonError = require('../../errors/ValidationError');
var UnauthenticatedAccessError = require('../../errors/UnauthenticatedAccessError');

var MUser = require('./user.js');




/**
 * Mongoose schema
 */


var UserTokenSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    accessToken: { type: String, required: true },
    accessToken_iat : { type: Number },
    accessToken_exp : { type: Number },

    expireDate: { type: Date, required: true },

    ipv4: { type: String },
    ipv6: { type: String },
    userAgent: { type: String},
    deviceType: { type: String}


}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});

/**
 * Mongoose plugin
 */









/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */






/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */


var constantDeviceType = {
    pc : 'pc',
    mobilephone : 'mobilephone',
    tablet : 'tablet'
};
UserTokenSchema.statics.constantDeviceType = constantDeviceType;


var validation = {
    token : function (token){
        if (!validator.isLength(token, 100, 200))  throw new ValidatonError(ValidatonError.code.token.tokenLengthWrong, "Field validation error,  accessToken length must be 4-30", "accessToken");
    },

    tokenNotFound : function (token){
        if (!token){
            throw new UnauthenticatedAccessError(ValidatonError.code.token.tokenNotFound, "User Unauthorized, token not found", "X-Access-Token");
        }
    },

    tokenDecodeWrong : function (token){
        if (!token){
            throw new UnauthenticatedAccessError(ValidatonError.code.token.tokenDecodeWrong, "User Unauthorized, token wrong", "X-Access-Token");
        }
    }
};

UserTokenSchema.statics.validation = validation;





UserTokenSchema.statics.getToken = function(user, req){

    var payload = {
        _id: user._id
    };

    var token  = jsonwebtoken.sign(payload, tokenConfig.jwtTokenSecret, {
        expiresIn: TOKEN_EXPIRATION_SEC
    });


    var newToken = {
        user: user._id,
        // username: user.username,
        // access: resultUser.access,

        accessToken: token,

        expireDate : moment().add(tokenConfig.jwtTokenExpireDay, 'days'),

        userAgent: req.get('User-Agent'),
        deviceType : constantDeviceType.pc

    };

    if (ipaddr.IPv4.isValid(req.ip)) {
        // ipString is IPv4
        newToken.ipv4 = req.ip;
    } else if (ipaddr.IPv6.isValid(req.ip)) {
        newToken.ipv6 = req.ip;
        var currentIP = ipaddr.IPv6.parse(req.ip);

        if (currentIP.isIPv4MappedAddress()) {
            // ip.toIPv4Address().toString() is IPv4
            newToken.ipv4 = currentIP.toIPv4Address().toString();
        } else {
            // ipString is IPv6
        }
    } else {
        // ipString is invalid
    }

    // desktop, tv, tablet, phone, bot or car
    if (req.device.type === 'phone') newToken.deviceType = constantDeviceType.mobilephone;
    if (req.device.type === 'tablet') newToken.deviceType = constantDeviceType.tablet;

    var decoded = jsonwebtoken.decode(token);
    newToken.accessToken_iat = decoded.iat;
    newToken.accessToken_exp = decoded.exp;

    return UserToken.findOneAndUpdate({user:user._id, deviceType:newToken.deviceType}, newToken, {upsert:true, new:true}).exec();
};



UserTokenSchema.statics.removeToken = function(token){

    return UserToken.findOneAndRemove({accessToken:token}).exec();

};



UserTokenSchema.statics.getUserFromToken = function(userid, token, callback){

    UserToken.findOne({ user: userid, accessToken: token }, function (err, resultToken) {
        if (err) return callback(err);

        if (!resultToken) {
            return callback(new UnauthenticatedAccessError(ValidatonError.code.token.tokenNotFound, "User Unauthorized, token not found", "X-Access-Token"));
        }

        if (resultToken.isExpired()){
            return callback(new UnauthenticatedAccessError(ValidatonError.code.token.tokenExpired, "User Unauthorized, token expired", "X-Access-Token"));
        }

        MUser.findOne({ _id: resultToken.user }, function (err, resultUser) {
            if (err) return callback(err);

            if (!resultUser) {
                return callback(new UnauthenticatedAccessError(ValidatonError.code.token.userNotFound, "User Unauthorized, user not found", "X-Access-Token"));
            }

            return callback(null, resultUser);
        });
    });


};





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




UserTokenSchema.methods.isExpired = function () {
    var date = moment(this.expireDate);
    return moment().isAfter(date);
};





/**
 * Register Model
 */

var UserToken = mongoose.model("UserToken", UserTokenSchema);
module.exports = UserToken;
