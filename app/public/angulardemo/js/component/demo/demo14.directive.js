

(function() {
    'use strict';


    /* Directives */

    /* recommended */
    /* demo14.directive.js */

    /**
     * @desc order directive that is specific to the order module at a company named Acme
     * @example <div my-nav-bar></div>
     */


    angular.module('myApp').directive('myNavBar', [myNavBarComponent]);


    function myNavBarComponent() {

        var directive = {
            restrict: 'EA',
            templateUrl: 'js/component/demo/demo14_tpl.html',
            scope: {
                data : '='
            },

            link: function (scope, element, attrs) {
                console.log(scope.dateSource);
                scope.css = {
                    editStatus : false,
                    currentMenuIndex : -1,
                    currentMenu : {}
                };


                scope.editMenuButton = function(index){
                    scope.css.currentMenuIndex = index;
                    scope.css.editStatus = true;
                };

                scope.saveEditMenuButton = function(){
                    scope.cssshowmenu = true;
                };
                scope.deleteMenuButton = function(){
                    scope.cssshowmenu = true;

                    for(var i = scope.menulist.length-1; i >= 0; i--){
                        if (scope.menulist[i].id == scope.menu.id) {
//                            console.log(i, scope.menulist[i].id, scope.menu.id, scope.menulist);
                            scope.menulist.splice(i, 1);
                            element.remove();
                            break;
                        }
                    }
                };


            }
        };


        return directive;

    };


    angular.module('myApp').directive('addMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'tpl_demo10_add.html',
            scope: false,
            link: function (scope, elem, attrs) {
                scope.maxmenu = Number(attrs.maxmemu);
                console.log(Number(attrs.maxmemu));
                scope.newmemu = {id:100, name:"" };
                scope.cssshowmenu = true;
                scope.cssshowbox = true;

                if(scope.menulist.length >= scope.maxmenu){
                    scope.cssshowbox = false;
                }

                scope.addMenuButton = function(){
                    scope.cssshowmenu = false;
                };

                scope.saveNewMenuButton = function(){
                    scope.cssshowmenu = true;
                    scope.menulist.push(angular.copy(scope.newmemu));
                    if(scope.menulist.length >= scope.maxmenu){
                        scope.cssshowbox = false;
                    }
                };

            }
        };
    });

})();



