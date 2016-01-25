

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo131Controller', demo131Controller);

    demo131Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo131Controller($http, $log, $scope, $timeout) {

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

                $scope.$watch('vm.data.firstName + vm.data.lastName', function(newValue, oldValue) {
                    vm.data.fullName = vm.data.firstName + ' ' + vm.data.lastName;
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
