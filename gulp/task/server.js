/**
 * Created by jinwyp on 7/21/15.
 */


var gulp        = require("gulp");
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload  = browserSync.reload;



// nodemon 的配置
var nodemonConfig = {
    "watch": [
        "core"
    ],
    script : 'core/bin/www',
    ext: 'js json',
    ignore : [
        ".git",
        "core/public/**",
        "core/views/**",
        "node_modules/**"
    ],
    // nodeArgs: ['--debug'],
    env    : {
        "NODE_ENV": "development",
        "DEBUG": "core:*"
    }
};




/********************  使用nodemon 自动重启服务器  ********************/
gulp.task('nodemon', function() {
    var called = false;
    return nodemon(nodemonConfig)
        .on('start', function(){
            if (!called){
                callled = true;
                cb()
            }
        })
        .on('restart', function () {
            //setTimeout(function () {
            //    reload({ stream: false });
            //}, 3000);
            console.log('-------------------- Nodejs server restarted! --------------------');
        })
        .once('quit', function(){
            console.log('-------------------- Nodejs server stopped! --------------------');
            process.exit();
        });
});


/********************  使用 browser-sync 自动刷新页面  ********************/
gulp.task('browsersync', ['nodemon'], function() {
	browserSync.init({
        files: ["core/public/**/*.css", "core/public/**/*.html", "core/views/**/*.*"],
        browser: ["google chrome", "firefox"],
        proxy: "http://localhost:8088",
        port: 8089,
        ui : {
            port:4000,
            weinre : {port:4001}
        },
        notify : true,
        open : false
	});
});
