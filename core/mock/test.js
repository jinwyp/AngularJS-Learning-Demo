/**
 * Created by jinwyp on 5/27/16.
 */

var nock = require('nock');

var scope = nock('http://localhost:8088/');

scope.get('/api/users').times(2).reply(200, {user:'ok'});

console.log('mock ok');


