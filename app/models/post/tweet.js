/**
 * Created by jinwyp on 3/18/2016.
 */


/**
 * Module dependencies
 */

var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;



/**
 * Mongoose schema
 */


var TweetSchema = new Schema({
    post: ObjectId,
    date: {type: Date, default: Date.now},
    author: {type: String},
    content: String
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



module.exports = mongoose.model('Tweet', TweetSchema);
