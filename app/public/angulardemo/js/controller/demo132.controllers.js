

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo132Controller', demo132Controller);

    demo132Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo132Controller($http, $log, $scope, $timeout) {

        /* jshint validthis: true */


        /**********  Data Binding For CSS style   **********/
        $scope.css = {
        };


        /**********  Data Binding For ViewModel  **********/
        $scope.data = {
            firstName : 'aaa',
            lastName : '',
            fullName : ''
        };


        /**********  Event Center  **********/
        $scope.event = {
        };




        /**********  App Init  **********/
        var app = {
            init : function(){

                $scope.$watch('data.firstName + data.lastName', function(newValue, oldValue) {
                    $scope.data.fullName = $scope.data.firstName + ' ' + $scope.data.lastName;
                });

/*
                //Beginning with AngularJS 1.1.5 you can use $watchCollection
                $scope.$watchCollection('[item1, item2]', function(newValues){
                    // do stuff here
                    // newValues contains the new values of the observed collection array
                });
*/

            },
            reRun : function(){

            }
        };


        app.init();


    }


})();




