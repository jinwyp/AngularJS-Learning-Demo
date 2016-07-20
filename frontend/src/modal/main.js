/**
 * Created by JinWYP on 7/15/16.
 */


var avalon = require('avalon2')

require('./stylesheets/style.scss');

avalon.component('ms-modal', {
    template: require('html!./template.html'),
    defaults: {
        title: 'modal',
        isShow: false,
        cbProxy: function (ok) {
            var cbName = ok ? 'onOk': 'onCancel'
            if (this.hasOwnProperty(cbName)) {
                var ret = this[cbName]()
                if (ret !== false || (ret && typeof ret.next === 'function')) {
                    this.isShow = false
                }
            } else {
                this.isShow = false
            }
        },
        onReady: function(){
            var el = this.$element;
            el.style.display = 'none'//强制阻止动画发生

            this.$watch('isShow', function(a){
                if(a){
                    document.body.style.overflow = 'hidden'
                }else{
                    document.body.style.overflow = ''
                }
            })
        }
    },
    soleSlot: 'content'
})


