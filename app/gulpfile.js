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

var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var uglifyJS = require('gulp-uglify');
var minifyHtml = require("gulp-minify-html");

var ngTemplateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inject = require('gulp-inject');




// 文件的路径
var paths = {
    base: 'public/',
    client: {
        js : ['public/angulardemo/js/**/*.js'],
        //js2 : ['public/angulardemo/js/**/*.js', 'public/angularslide/js/**/*.js'],
        sass : ['public/angulardemo/css/sass/**/*.scss'],
        css : ['public/angulardemo/css/stylesheets/*.css'],
        dist : 'public/angulardemo/dist'
    },
    server: {
        index: 'bin/www',
        viewsTpl : 'views/**'
    }
};

// Compass 文件的路径
var compassConfig ={
    css : 'public/angulardemo/css/stylesheets',
    sass : 'public/angulardemo/css/sass',
    image : 'public/angulardemo/css/images',
    style : 'expanded',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
    comments : false
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




/********************  监视Sass文件变化 生成CSS样式文件  ********************/
gulp.task('compass', function() {

    return gulp.src(paths.client.sass)
    .pipe(compass(compassConfig))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest(compassConfig.css));

    //var server = livereload();
    //return gulp.watch(paths.client.css, function(event) {
    //    server.changed(event.path);
    //});
});



/********************  监视CSS文件变化 压缩CSS样式文件  ********************/
gulp.task('minifycss', function() {

    return gulp.src(paths.client.css)
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss(
        {
            keepBreaks:false,
            keepSpecialComments:0 //* for keeping all (default), 1 for keeping first one only, 0 for removing all
        }
    ))
    .pipe(gulp.dest(paths.client.dist))
    .pipe(livereload());
});



/********************  监视JS文件的变化 并用jshint 检查语法 注: jshint 可能会伤害你的感情  ********************/
gulp.task('jshint',function(){
    return gulp.src(paths.client.js)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});



/********************  监视JS文件的变化 Minify JavaScript with UglifyJS2  ********************/
gulp.task('minifyjs', ['jshint'], function(){
    gulp.src(paths.client.js)
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest(paths.client.dist))
});



/********************  当客户端被监听的文件改变时，刷新浏览器  ********************/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.client.js, ['minifyjs']);
    gulp.watch(paths.client.sass, ['compass']);
    gulp.watch(paths.client.css, ['minifycss']);
});



/********************  使用nodemon 自动重启服务器  ********************/
gulp.task('nodemon', function() {
    return nodemon(nodemonConfig);
});









// The default task (called when you run `gulp` from cli)
gulp.task('default', ['minifyjs', 'watch', 'compass', 'nodemon' ]);
