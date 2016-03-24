/**
 * Created by jinwyp on 7/21/15.
 */


var gulp        = require("gulp");
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync').create();




// nodemon 的配置
var nodemonConfig = {
    "watch": [
        "core"
    ],
    script : 'core/bin/www',
    ext: 'js json',
    ignore : [
        "core/tmp/**",
        "core/public/**",
        "core/views/**",
        ".git",
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
    return nodemon(nodemonConfig).on('restart', function () {
        console.log('-------------------- Nodejs server restarted! --------------------');
    });
});


/********************  使用 browser-sync 自动刷新页面  ********************/
gulp.task('browsersync', ['nodemon'], function() {
	browserSync.init({
		proxy: "http://localhost:8088",
        files: ["core/public/**/*.css", "core/public/**/*.html", "core/views/**/*.*"],
        browser: ["google chrome", "firefox"],
        port: 8089,
	});
});
