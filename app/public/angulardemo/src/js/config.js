
(function() {
    'use strict';

    angular.module('angularDemoApp').value('version', '0.1');



    angular.module('angularDemoApp').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

})();
