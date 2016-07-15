/**
 * Created by JinWYP on 7/15/16.
 */


var avalon = require('avalon2');

require('./index');

avalon.define({
    $id: 'test',
    show: function(){
        this.config.isShow = true
    },
    config: {
        isShow: false,
        onCancel: function(){
            alert('cancel')
        },
        onOk: function(){
            alert('ok')
        },
        title:'这是测试'
    }
})

module.exports = avalon;