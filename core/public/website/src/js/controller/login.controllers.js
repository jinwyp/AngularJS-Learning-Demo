

(function() {
    'use strict';


    /* Controllers */

    angular.module('websiteApp').controller('loginController', loginController);

    loginController.$inject = ['$window', 'Logger', 'User'];

    function loginController($window, Logger, User) {

        /* jshint validthis: true */
        var vm = this;

        /**********  Data Binding For CSS style   **********/
        vm.css = {
            currentDeleteIcon : -1,
            currentSelected : -1,
            loginFormErrorMessage : 0

        };


        /**********  Data Binding For ViewModel  **********/
        vm.data = {
            newUser : {
                username : '',
                password : ''
            }
        };


        /**********  Event Center  **********/
        vm.event = {
            login : login,
            logout : logout
        };


        function login(form){

            if (form.$invalid) {
                form.username.$setDirty();
                form.password.$setDirty();
                return ;
            }

            User.login(vm.data.newUser).then(function(data){
                console.log(data);
                $window.location.href = '/';
            }).catch(function(err){
                if (err && err.data && err.data.code){
                    vm.css.loginFormErrorMessage = err.data.code;
                }
                Logger.errorXHR(err);
            });
        }


        function logout(){

            User.logout().then(function(data){
                console.log(data);
                $window.location.href = '/';
            }).catch(function(err){
                Logger.errorXHR(err);
            });

        }





        /**********  App Init  **********/

        function appInit (){

        }

        function appReRun(){

        }

        appInit();

    }



})();
