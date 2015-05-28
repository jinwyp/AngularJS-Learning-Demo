

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo13Controller', demo13Controller);

    demo13Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo13Controller($http, $log, $scope, $timeout) {

        /* jshint validthis: true */
        var vm = this;

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

                $scope.$watch('vm.data', function(newValue, oldValue) {
                    $log.info('vm.name was %s', newValue);

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

    function demoxxxController($scope, $rootScope, $http) {
        $scope.menulist =[
            {id:1, name:"Menu11"},
            {id:2, name:"Menu22"},
            {id:3, name:"Menu33"}
        ];

        $http({method: 'GET', url: 'http://localhost/api/publisher/sites/1/footermenus'}).success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

})();




