

(function() {
    'use strict';


    /* Directives */

    /* recommended */
    /* demo14.directive.js */

    /**
     * @desc order directive that is specific to the order module at a company named Acme
     * @example <div my-nav-bar></div>
     */


    angular.module('websiteApp').directive('dragbox', dragBox);
    dragBox.$inject = ['$document', '$interval'];

    function dragBox($document) {

        var directive = {
            restrict: 'A',

            link: linkFunc
        };

        return directive;


        function linkFunc (scope, element, attr) {
            var startX = 0, startY = 0, x = 215, y = -48;

            element.css({
                position: 'relative',
                // border: '1px solid red',
                // backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                console.log(event.pageX, event.pageY);
                console.log(element.offset().left, element.offset().top, element.offset().bottom);
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }

    }



})();


