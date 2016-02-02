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

var config = require('config');
var tokenConfig = config.get('userlogin');

var jsonwebtoken = require("jsonwebtoken");

var TOKEN_EXPIRATION_SEC = 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay; // 1 day
var TOKEN_EXPIRATION_SEC_RememberMe = 60 * 60 * 24 * tokenConfig.jwtTokenExpireDay * 6;
var TOKEN_EXPIRATION_DAY_RememberMe = tokenConfig.jwtTokenExpireDay * 6; // 1 day





/**
 * Mongoose schema
 */




var UserTokenSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    accessToken: { type: String, required: true },

    expireDate: { type: Date, required: true },

    ip: { type: String },
    userAgent: { type: String}


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

var validation = {
    newUser : function (user){
        if (!validator.isEmail(user.email))  throw new Error("Field validation error,  email format wrong");

        if (!validator.isLength(user.username, 6, 30))  throw new Error("Field validation error,  username length must be 6-30");

        return false;
    }
};


UserTokenSchema.statics.validateNewUser = validation.newUser;




UserTokenSchema.statics.createToken = function(user, req){

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

        ip: req.ip,
        userAgent: ""

    };
    console.log("token: ", newToken);

    var decoded = jsonwebtoken.decode(token);
    console.log("decoded: ", decoded);

    // data.token_exp = decoded.exp;
    // data.token_iat = decoded.iat;

   return UserToken.create(newToken);
};






/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




UserTokenSchema.methods.comparePassword = function (passw) {


};





/**
 * Register Model
 */

var UserToken = mongoose.model("UserToken", UserTokenSchema);
module.exports = UserToken;
