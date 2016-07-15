/**
 * Created by JinWYP on 7/15/16.
 */


var avalon = require('avalon2');
//require('./style.scss');
//require('text!./template.html');

avalon.component('ms-modal', {
    template: '<div>1111</div>',
    defaults: {
        title:'modal',
        isShow: true,
        cbProxy: function(ok){

        }
    },
    soleSlot: 'content'
})
