
(function() {
  'use strict';



  /* Filters */

  angular.module('angularDemoApp').filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);


})();
