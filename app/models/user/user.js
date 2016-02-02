/**
 * Created by jinwyp on 7/8/15.
 */


/**
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// var mongooseTimestamps = require('mongoose-timestamp');
mongoose.Promise = require('bluebird');
Promise = require('bluebird');

var validator = require('validator');
var bcrypt = require("bcryptjs");

var ValidatonError = require('../../errors/ValidationError');
var UnauthorizedAccessError = require('../../errors/UnauthorizedAccessError');



/**
 * Mongoose schema
 */

 var encryptPassword = function (password) {
     var salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(password, salt);
 };


var UserSchema = new Schema({

    username: { type: String, unique: true, trim: true},
    mobile: { type: String, unique: true},
    email: { type: String, unique: true, lowercase: true, trim: true },

    password: { type: String, required: true, default: '123456', set : encryptPassword},


    firstName: { type: String, trim: true},
    lastName: { type: String, trim: true },
    fullName: { type: String, trim: true}


}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});

/**
 * Mongoose plugin
 */

 // UserSchema.plugin(mongooseTimestamps);



/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


 //
 // UserSchema.pre('save', function (next) {
 //     var user = this;
 //     if (this.isModified('password') || this.isNew) {
 //         bcrypt.genSalt(10, function (err, salt) {
 //             if (err) {
 //                 return next(err);
 //             }
 //             bcrypt.hash(user.password, salt, function (err, hash) {
 //                 if (err) {
 //                     return next(err);
 //                 }
 //                 user.password = hash;
 //                 next();
 //             });
 //         });
 //     } else {
 //         return next();
 //     }
 // });




/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */

var validation = {
    username : function (username){
        if (!validator.isLength(username, 4, 30))  throw new ValidatonError(ValidatonError.code.user.usernameWrong, "Field validation error,  username length must be 4-30", "username");
    },
    userPassword : function (password){
        if (!validator.isLength(password, 6, 30))  throw new ValidatonError(ValidatonError.code.user.passwordWrong, "Field validation error,  password length must be 6-30", "password");
    },
    userEmail : function (email){
        if (!validator.isEmail(email))  throw new ValidatonError(ValidatonError.code.user.emailWrong, "Field validation error, Email format wrong", "email");
    },
    userMobile : function (mobile){
        if (!validator.isMobilePhone(mobile, 'zh-CN'))  throw new ValidatonError(ValidatonError.code.user.mobileWrong, "Field validation error, mobile number format wrong", "mobile");
    },


    usernameExist : function (user){
        if (user){
            throw new ValidatonError(ValidatonError.code.user.usernameExist, "Field validation error,  username already exist", "username");
        }
    },
    userEmailExist : function (user){
        if (user){
            throw new ValidatonError(ValidatonError.code.user.emailExist, "Field validation error,  Email already exist", "email");
        }

    },
    userMobileExist : function (user){
        if (user){
            throw new ValidatonError(ValidatonError.code.user.mobileExist, "Field validation error,  mobile number already exist", "mobile");
        }
    },


    usernameNotFound : function (user){
        if (!user){
            throw new UnauthorizedAccessError(ValidatonError.code.user.usernameNotFound, "User Unauthorized, user not found", "username");
        }
    },

    userUnauthorized : function (){
        throw new UnauthorizedAccessError(ValidatonError.code.user.passwordNotMatch, "User Unauthorized, password not match", "password" );
    }
};


UserSchema.statics.validation = validation;







// TODO: 注册验证邮箱是否有效的邮箱
// TODO: 注册验证手机号是否有效
UserSchema.statics.signUp = function(user){

    validation.username(user.username);
    validation.userPassword(user.password);

    var newUser = {};

    if (typeof user.email !== "undefined"){
        validation.userEmail(user.email);
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.email = user.email;
    }

    if (typeof user.mobile !== "undefined"){
        validation.userMobile(user.mobile);
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.mobile = user.mobile;
    }

    if(typeof user.email === "undefined" && typeof user.mobile === "undefined"){
        validation.userEmail(user.email);
    }


    return User.findOne({username : user.username}).exec().then(function(resultUserWithUsername){

        validation.usernameExist(resultUserWithUsername);


        if (user.email && user.mobile){

            return Promise.all([
                User.findOne({email:user.email}).exec(),
                User.findOne({mobile:user.mobile}).exec()
            ]).spread(function(resultUserWithEmail, resultUserWithMobile){

                validation.userEmailExist(resultUserWithEmail);
                validation.userMobileExist(resultUserWithMobile);
                return User.create(newUser);
            });

        }else if (user.email){
            return User.findOne({email:user.email}).exec().then(function(resultUserWithEmail){
                validation.userEmailExist(resultUserWithEmail);
                return User.create(newUser);
            });

        }else if (user.mobile){
            return User.findOne({mobile:user.mobile}).exec().then(function(resultUserWithMobile){
                validation.userMobileExist(resultUserWithMobile);
                return User.create(newUser);
            });
        }

    });
};





UserSchema.statics.login = function(user){

    query = {};
    validation.userPassword(user.password);

    if (validator.isMobilePhone(user.username, 'zh-CN')){
        query.mobile = user.username;
    }else if (validator.isEmail(user.username)){
        query.email = user.username;
    }else{
        validation.username(user.username);
        query.username = user.username;
    }

    return User.findOne(query).exec().then(function(resultUser){

        validation.usernameNotFound(resultUser);

        if (!resultUser.comparePassword(user.password)){
            validation.userUnauthorized();
        }

        return resultUser;

    });
};





//
//campaignSchema.statics.updateValidations = function(req){
//
//    req.sanitize('activated').toBoolean();
//
//    req.checkBody('name', 'Campaign name should be 2-50 characters').notEmpty().len(2, 50);
//    req.checkBody('description', 'Campaign description should be 2-10000 characters').notEmpty().len(2, 10000);
//
//    req.checkBody('activated', 'Campaign activated should Boolean true or false').notEmpty();
//
//    return req.validationErrors();
//};
//
//
//campaignSchema.statics.searchQueryValidations = function(req){
//    if (req.query.keyword) {
//        req.checkQuery('keyword', 'Campaign name should be 2-500 characters').optional().len(2, 500);
//    }
//    req.checkQuery('activated', 'Campaign activated should Boolean true or false').optional();
//
//    return req.validationErrors();
//};
//
//campaignSchema.statics.addSeminarValidations = function(req){
//
//    req.assert('seminarId', 'Seminar ID should be 5-9 characters').notEmpty().len(5, 9);
//    req.assert('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);
//
//    return req.validationErrors();
//};
//
//
//campaignSchema.statics.addTeamValidations = function(req){
//    req.checkBody('username', 'Username should be 6-20 characters').notEmpty().len(6, 20);
//    //req.checkBody('teamId', 'Team ID should be 24 characters').notEmpty().len(24, 24);
//    req.checkBody('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);
//
//    return req.validationErrors();
//};
//
//campaignSchema.statics.removeTeamValidations = function(req){
//    req.checkBody('teamId', 'Team ID should be 24 characters').notEmpty().len(24, 24);
//    req.checkBody('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);
//
//    return req.validationErrors();
//};
//
//
//campaignSchema.statics.campaignIdValidations = function(req){
//    req.assert('campaignId', 'Campaign ID should be 24 characters').notEmpty().len(24, 24);
//
//    return req.validationErrors();
//};







/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




UserSchema.methods.comparePassword = function (passw) {

    return bcrypt.compareSync(passw, this.password);
};


UserSchema.methods.comparePasswordCB = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};


UserSchema.methods.encryptPassword = encryptPassword;



/**
 * Register Model
 */

var User = mongoose.model("User", UserSchema);
module.exports = User;
