/**
 * Created by JinWYP on 7/15/16.
 */


var path = require('path');
var config = {
    // 入口文件配置
    entry:{
        'main': './main.js'
        //'othter': './othter.js',
    },
    // 入口文件输出配置
    output:{
        path:'../../dist',
        filename:'bundle.js'
    },

    resolve: {
        // 自动补全后缀
        extensions: ['', '.js', '.jsx', '.json', '.scss']
    }
};
module.exports = config;
