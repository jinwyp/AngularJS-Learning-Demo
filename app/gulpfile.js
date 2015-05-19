/**
 * Created by jinwyp on 5/19/15.
 */


'use strict';

//引入 gulp 和 nodemon livereload 插件
var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');


// 文件的路径
var paths = {
    base: 'public/',
    client: {
        js : ['public/angulardemo/**/*.js', 'public/angularslide/**/*.js'],
        sass : []
    },
    server: {
        index: 'bin/www',
        viewsTpl : 'views/**'
    }
};


// nodemon 的配置
var nodemonConfig = {
    script : paths.server.index,
    ignore : [
        "tmp/**",
        "public/**",
        "views/**"
    ],
    env    : {
        "NODE_ENV": "development"
    }
};

/********************  监视JS文件的变化 并用jshint 检查语法 注: jshint 可能会伤害你的感情  ********************/
gulp.task('jshint',function(){
    return gulp.src(paths.client.js)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});


/********************  使用nodemon 自动重启服务器  ********************/
gulp.task('nodemon', function() {
    return nodemon(nodemonConfig);
});


/********************  当客户端被监听的文件改变时，刷新浏览器  ********************/
gulp.task('livereload', function() {
    livereload.listen();
    var server = livereload();
    return gulp.watch(paths.client.sass, function(event) {
        server.changed(event.path);
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.client.js, ['jshint']);
});






// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'nodemon', 'livereload']);
