
(function() {
    'use strict';

    // Declare app level module which depends on filters, and services
    angular.module('websiteApp', ['ngStorage']);



    var combostr = function(arr){

        if (arr.length <= 1) {
            return arr;
        }
        return arr.reduce(function(previousValue, currentValue, currentIndex, array){
            if (currentIndex % 2){

                if (currentIndex === arr.length -1 ){
                    return previousValue.toString() + currentValue.toString();
                }
                return previousValue.toString() + currentValue.toString() + '-';
            }else{

                return previousValue.toString() + currentValue.toString();
            }

        })


    };

    //console.log(combostr([1,2,3,4,5,6,7,8]));


    var qs = function (arr){
        if (arr.length <=1){
            return arr;
        }

        var pivotIndex = Math.floor(arr.length / 2 );

        var pivot = arr.splice(pivot, 1)[0];

        console.log(pivot);

        var left = [];
        var right = [];

        for (var i=0; i < arr.length; i++){

            if (arr[i] < pivot){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }

        return qs(left).concat(pivot, qs(right));

    };

    console.log(qs([1,3,1,6,8,4]));


})();



