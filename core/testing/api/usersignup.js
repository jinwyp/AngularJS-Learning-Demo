var expect = require('chai').expect;
var request = require("request");

var simple = require('../userdata.js');


describe('Test Case', function () {
    it('should respond equal 1', function () {
        expect(1).to.equal(1);
    });
});




describe("API Get User SignUP SMS", function() {

    var url = simple.path.api + "user/verify/sms";

    //
    //
    // before(function(done) {
    //     request.post({url:url, form: postUserData}, function(error, response, body) {
    //         var result = JSON.parse(body);
    //         token.Authorization = token.Authorization + result.access_token;
    //         //console.log(token.Authorization);
    //         done();
    //     });
    // });


    it("returns status 200", function(done) {

        request.post({url:url, json: simple.userSMS }, function(error, response, body) {

            expect(response.statusCode).to.equal(200);
            expect(body.code).to.be.a('string');
            // expect(body._id.length).to.above(23);
            done();
        });
    });


});
