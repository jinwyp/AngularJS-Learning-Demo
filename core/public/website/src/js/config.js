
(function() {
    'use strict';

    angular.module('websiteApp').value('version', '0.1');



    angular.module('websiteApp').config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

})();
