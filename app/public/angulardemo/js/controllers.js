

(function() {
    'use strict';


    /* Controllers */

    angular.module('myApp').controller('demo11Controller', function($scope, $rootScope, $http) {
        $scope.menulist =[
            {id:1, name:"Menu11"},
            {id:2, name:"Menu22"},
            {id:3, name:"Menu33"}
        ];

        $http({method: 'GET', url: 'http://localhost/api/publisher/sites/1/footermenus'}).
        success(function(data, status, headers, config) {
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    });


    angular.module('myApp').controller('MyCtrl2', [function() {

    }]);


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

    function PostCtrl2($scope ) {
        $scope.posts = [{id: 1, name: 'tech'},
            {id: 2, name: 'news'},
            {id: 3, name: 'sports'},
            {id: 4, name: 'health'}];

        $scope.changecolor = function(index){
            $scope.cssSelected = index;
        };
    }

})();




