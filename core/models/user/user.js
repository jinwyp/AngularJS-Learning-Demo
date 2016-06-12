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
var bcrypt = require("bcryptjs");

var checker = require('../../business-libs/dataChecker.js');



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


var fields = "-__v -password";
UserSchema.statics.find99 = function(query){
    return User.find(query).select(fields).exec();
};
UserSchema.statics.find1 = function(query){
    return User.findOne(query).select(fields).exec();
};









// TODO: 注册验证邮箱是否有效的邮箱
// TODO: 注册验证手机号是否有效
UserSchema.statics.signUp = function(user){

    checker.username(user.username);
    checker.userPassword(user.password);

    var newUser = {};

    if (typeof user.email !== "undefined" && user.email){
        checker.userEmail(user.email);
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.email = user.email;
    }

    if (typeof user.mobile !== "undefined" && user.mobile){
        checker.userMobile(user.mobile);
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.mobile = user.mobile;
    }

    if(typeof newUser.username === "undefined"){
        checker.userEmail(user.email);
    }


    return User.findOne({username : user.username}).exec().then(function(resultUserWithUsername){

        checker.usernameExist(resultUserWithUsername);

        if (user.email && user.mobile){

            return Promise.all([
                User.findOne({email:user.email}).exec(),
                User.findOne({mobile:user.mobile}).exec()
            ]).spread(function(resultUserWithEmail, resultUserWithMobile){

                checker.userEmailExist(resultUserWithEmail);
                checker.userMobileExist(resultUserWithMobile);
                return User.create(newUser);
            });

        }else if (user.email){
            return User.findOne({email:user.email}).exec().then(function(resultUserWithEmail){
                checker.userEmailExist(resultUserWithEmail);
                return User.create(newUser);
            });

        }else if (user.mobile){
            return User.findOne({mobile:user.mobile}).exec().then(function(resultUserWithMobile){
                checker.userMobileExist(resultUserWithMobile);
                return User.create(newUser);
            });
        }

    });
};





UserSchema.statics.login = function(user){

    query = {};
    checker.userPassword(user.password);

    if (validator.isMobilePhone(user.username, 'zh-CN')){
        query.mobile = user.username;
    }else if (validator.isEmail(user.username)){
        query.email = user.username;
    }else{
        checker.username(user.username);
        query.username = user.username;
    }

    return User.findOne(query).exec().then(function(resultUser){

        checker.userNotFound(resultUser);

        if (!resultUser.comparePassword(user.password)){
            checker.userUnauthorized();
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
