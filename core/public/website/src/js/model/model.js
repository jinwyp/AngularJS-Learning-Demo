
(function() {
  'use strict';


  /* Services Model */


// Demonstrate how to register services
// In this case it is a simple value service.

  angular.module('websiteApp').factory('User', userService);

  userService.$inject = ['$http'];

  function userService($http) {
      return {
          login: login
      };

      function login(user) {
          return $http.post('/api/user/login', user)
              .then(getUserLogin);
            //   .catch(Logger.errorXHR);

          function getUserLogin(response) {
              return response.data;
          }
      }
  }
})();
