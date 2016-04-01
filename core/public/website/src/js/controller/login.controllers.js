

(function() {
    'use strict';


    /* Controllers */

    angular.module('websiteApp').controller('loginController', loginController);

    loginController.$inject = ['Logger', 'User'];

    function loginController(Logger, User) {

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
            hideArticleDeleteIcon : hideArticleDeleteIcon,
            clickArticle : clickArticle
        };


        function login(form){

            if (form.$invalid) {
                return ;
            }

            User.login(vm.data.newUser).then(function(data){
                console.log(data);
            }).catch(function(err){
                if (err && err.data && err.data.code){
                    vm.css.loginFormErrorMessage = err.data.code;
                }
                Logger.errorXHR(err);
            });

        }

        function hideArticleDeleteIcon(){

            vm.css.currentDeleteIcon = -1;

        }

        function clickArticle(currentIndex){

            vm.css.currentSelected = currentIndex;

        }




        /**********  App Init  **********/

        function appInit (){

        }

        function appReRun(){

        }

        appInit();

    }



})();
