/**
 * Created by jinwyp on 7/8/15.
 */
'use strict';

var movieModel = require('../models/movie.js');


exports.campaignSingleInfo = function(req, res, next){

    //var validationErrors = campaignModel.campaignIdValidations(req);
    //
    //if(validationErrors){
    //    return res.status(400).send( {message: validationErrors} );
    //}

    movieModel.find({}).exec().then(function(resultCampaign){
        if(!resultCampaign){
            return res.status(400).send( {message: "campaign doesn't exist."});
        }

        return res.status(200).send(resultCampaign);

    })

};





exports.addCampaign = function(req, res, next){
    //var validationErrors = campaignModel.updateValidations(req);
    //
    //if(validationErrors){
    //    return res.status(400).send( {message: validationErrors} );
    //}

    var newCampaign = {
        name        : '11',
        description : '11',
        location    : '11',
        matchDate   : '',
        activated   : ''

    };

    movieModel.create(newCampaign, function (err, small) {
        if (err) return handleError(err);
        return res.status(200).send(small);
    })

};

