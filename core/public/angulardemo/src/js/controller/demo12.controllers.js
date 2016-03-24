

(function() {
    'use strict';


    /* Controllers */

    angular.module('angularDemoApp').controller('demo12Controller', demo12Controller);

    demo12Controller.$inject = ['$http', '$log', '$scope', '$timeout'];

    function demo12Controller($http, $log, $scope, $timeout) {

        /* jshint validthis: true */
        var vm = this;


        /**********  Data Binding For CSS style   **********/
        vm.css = {
        };


        /**********  Data Binding For ViewModel  **********/
        vm.data = {
            setTimeOutMessage : '这里的文字2秒后应该改变',
            setTimeOutMessage2 : '这里的文字2秒后应该改变',
            angularTimeOutMessage : '这里的文字2秒后应该改变'
        };



        /**********  Event Center  **********/
        vm.event = {
            changeSetTimeOutMessage : changeSetTimeOutMessage,
            changeSetTimeOutMessage2 : changeSetTimeOutMessage2,
            changeAngularTimeOutMessage : changeAngularTimeOutMessage
        };


        function changeSetTimeOutMessage(){

            setTimeout(function () {
                vm.data.setTimeOutMessage = '文字已改变';  // 这里是非AngularJS 的世界, unaware of update to $scope
            }, 2000);
        }


        function changeSetTimeOutMessage2(){

            setTimeout(function () {
                vm.data.setTimeOutMessage2 = '文字已改变';
                $scope.$apply(); // 这里是非AngularJS 的世界, unaware of update to $scope, 使用$scope.$apply() 更新
            }, 2000);

/*
            setTimeout(function () {
                $scope.$apply(function () {
                    vm.data.setTimeOutMessage = '文字已改变';
                });
            }, 2000);
*/
        }

        function changeAngularTimeOutMessage(){

            $timeout(function() {
                vm.data.angularTimeOutMessage = '文字已改变';
            }, 2000);

        }




        /**********  App Init  **********/
        var app = {
            init : function(){

            },
            reRun : function(){

            }
        };


        app.init();


    }



})();
