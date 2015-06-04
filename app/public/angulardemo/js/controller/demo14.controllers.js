

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo14Controller', demo14Controller);

    demo14Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo14Controller($http, $log, $scope, $timeout) {

        /* jshint validthis: true */
        var vm = this;
        $scope.vm = vm;  // For $scope.$watch


        /**********  Data Binding For CSS style   **********/
        vm.css = {
        };


        /**********  Data Binding For ViewModel  **********/
        vm.data = {
            menulist : [
                {id:1, name:"Menu11"},
                {id:2, name:"Menu22"},
                {id:3, name:"Menu33"},
                {id:4, name:"Menu44"},
                {id:5, name:"Menu55"}
            ]
        };


        /**********  Event Center  **********/
        vm.event = {

        };




        /**********  App Init  **********/
        var app = {
            init : function(){

                this.getMenuList();

            },
            reRun : function(){

            },
            getMenuList : function(){

                //$http(
                //    {
                //        method: 'GET',
                //        url: 'http://localhost/angulardemoapi/menulist'
                //    }
                //).success(function(data, status, headers, config) {
                //    console.log(data);
                //
                //}).error(function(data, status, headers, config) {
                //    // called asynchronously if an error occurs
                //    // or server returns response with an error status.
                //
                //});

            }
        };


        app.init();


    }



})();




