/**
 * Created by jinwyp on 7/21/15.
 */


var gulp        = require("gulp");
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var browserSyncReload  = browserSync.reload;



// nodemon 的配置
var nodemonConfig = {
    script : 'core/bin/www',
    ext    : 'js json',
    watch  : [
        "core"
    ],
    ignore : [
        "core/public/**",
        "core/views/**"
    ],

    env : {
        "NODE_ENV" : "development",
        "DEBUG"    : "core:*"
    }
};




/********************  使用nodemon 自动重启服务器  ********************/
gulp.task('nodemon', function(endTask) {
    var called = false;
    return nodemon(nodemonConfig)
        .on('start', function(){
            if (!called){
                called = true;
                endTask()
            }
        })
        .on('restart', function () {
            //setTimeout(function () {
            //    browserSyncReload({ stream: false });
            //}, 3000);
            console.log('-------------------- Node.js server restarted! --------------------');
        })
        .once('crash', function(){
            console.log('-------------------- Node.js server crashed! --------------------');
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
