'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, $rootScope, $http) {
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

  })
  .controller('MyCtrl2', [function() {

  }]);