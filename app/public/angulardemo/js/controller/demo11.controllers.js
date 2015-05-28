

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo11Controller', demo11Controller);

    demo11Controller.$inject = ['$location', '$routeParams', 'common', 'dataservice'];

    function demo11Controller($http) {
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




    function PostCtrl($scope) {
        $scope.posts = [{id: 1, name: 'tech'},
            {id: 2, name: 'news'},
            {id: 3, name: 'sports'},
            {id: 4, name: 'health'}];

        $scope.css = {show : false};

        $scope.showdiv = function(){
            this.css = {show:true};
//            this.css.show = true;

            console.log(this.css.show,$scope.css.show);
        };
        $scope.hidediv = function(){
            this.css = {show:false};
//            this.css.show = false;
            console.log(this.css.show,$scope.css.show);
        };
    }

    //function PostCtrl2222($scope ) {
    //    $scope.posts = [{id: 1, name: 'tech'},
    //        {id: 2, name: 'news'},
    //        {id: 3, name: 'sports'},
    //        {id: 4, name: 'health'}];
    //
    //    $scope.changecolor = function(index){
    //        $scope.cssSelected = index;
    //    };
    //}

})();




