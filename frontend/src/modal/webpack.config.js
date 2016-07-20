/**
 * Created by JinWYP on 7/15/16.
 */


var path              = require('path');
var webpack           = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
    replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}
var api = heredoc(function () {
    /*
     avalon的弹出层组件
     1.  isShow: 用于控制显示与否
     2.  title: 标题
     3.  content: 内容，这个是一个非常复杂的HTML结构
     4.  onOk
     5:  onCancel

     使用
     兼容IE6-8
     ```
     <xmp ms-widget="[{is:'ms-modal'}, @config]">
     <p>弹窗的内容</p>
     <p>弹窗的内容</p>
     <p>弹窗的内容结束!</p>
     </xmp>
     ```
     只支持现代浏览器(IE9+)
     ```
     <ms-modal ms-widget="@config">
     <p>弹窗的内容</p>
     <p>弹窗的内容</p>
     <p>弹窗的内容结束!</p>
     </ms-modal>
     ```
     */
});

var config = {
    // 入口文件配置
    entry:{
        'index': './index.js'
        //'othter': './othter.js',
    },
    // 入口文件输出配置
    output:{
        path:'../../dist',
        publicPath : '/dist/', //用户webpack dev server的路径 “path”仅仅告诉Webpack结果存储在哪里，然而“publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
        filename:'[name].js',
        libraryTarget: 'umd',
        library: 'avalon'
    },

    resolve: {
        // 自动补全后缀
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: "style!css", // 打包在html页面内 style标签内
                loader: ExtractTextPlugin.extract("style", "css")   // 单独打包，并用link引入
            },

            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style", "css!sass")   // 单独打包，并用link引入
            },

            {
                test: /\.(ttf|eot|svg|woff2?)((\?|#)[^\'\"]+)?$/,
                loader: 'url-loader?name=[name].[ext]'}
        ]
    },


    // 插件
    plugins: [

        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({ name : "common", minChunks:1, chunks:['avalon2']}),
        new webpack.BannerPlugin('弹出层组件 by 司徒正美\n' + api)
        //new ExtractTextPlugin("styles.css")
    ]

};

module.exports = config;

