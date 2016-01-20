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

var validator = require('validator');
var bcrypt = require("bcryptjs");



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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
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
    newUser : function (user){
        if (!validator.isEmail(user.email))  throw new Error("Field validation error,  email format wrong");

        if (!validator.isLength(user.username, 6, 30))  throw new Error("Field validation error,  username length must be 6-30");

        return false;
    }
};


UserSchema.statics.validateNewUser = validation.newUser;



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
