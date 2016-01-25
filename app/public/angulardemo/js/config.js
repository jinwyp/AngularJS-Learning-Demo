
(function() {
    'use strict';

    angular.module('myApp').value('version', '0.1');



    angular.module('myApp').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

})();
