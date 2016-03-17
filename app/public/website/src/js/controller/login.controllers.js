

(function() {
    'use strict';


    /* Controllers */

    angular.module('websiteApp').controller('loginController', loginController);

    loginController.$inject = ['$http'];

    function loginController($http) {

        /* jshint validthis: true */
        var vm = this;

        /**********  Data Binding For CSS style   **********/
        vm.css = {
            currentDeleteIcon : -1,
            currentSelected : -1
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

            $http.post('/api/user/login', vm.data.newUser).then(function(response){
                alert(response.data.accessToken);
                console.log(response.data);
            }).catch(function(err){
                console.log(err.data);
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
