

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo11Controller', demo11Controller);

    demo11Controller.$inject = ['$http'];

    function demo11Controller($http) {

        /* jshint validthis: true */
        var vm = this;

        /**********  Data Binding For CSS style   **********/
        vm.css = {
            currentDeleteIcon : -1,
            currentSelected : -1
        };


        /**********  Data Binding For ViewModel  **********/
        vm.data = {
            searchText : '',
            articles : [
                {id: 1, title: 'today news'},
                {id: 2, title: 'sports news'},
                {id: 3, title: 'health news'},
                {id: 4, title: 'tech news'}
            ]
        };


        /**********  Event Center  **********/
        vm.event = {
            showArticleDeleteIcon : showArticleDeleteIcon,
            hideArticleDeleteIcon : hideArticleDeleteIcon,
            clickArticle : clickArticle
        };


        function showArticleDeleteIcon(currentIndex){

            vm.css.currentDeleteIcon = currentIndex;

        }

        function hideArticleDeleteIcon(){

            vm.css.currentDeleteIcon = -1;

        }

        function clickArticle(currentIndex){

            vm.css.currentSelected = currentIndex;

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




