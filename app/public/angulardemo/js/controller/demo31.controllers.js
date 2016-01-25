

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo31Controller', demo31Controller);

    demo31Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo31Controller($http, $log, $scope, $timeout) {

        /* jshint validthis: true */
        var vm = this;
        $scope.vm = vm;  // For $scope.$watch


        /**********  Data Binding For CSS style   **********/
        vm.css = {
        };


        /**********  Data Binding For ViewModel  **********/
        vm.data = {
            firstName : 'aaa',
            lastName : '',
            fullName : ''
        };


        /**********  Event Center  **********/
        vm.event = {
        };




        /**********  App Init  **********/
        var app = {
            init : function(){

                $http.get('/api/users').then(function(result){
                    alert(result.data);
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
