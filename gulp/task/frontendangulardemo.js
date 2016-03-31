/**
 * Created by jinwyp on 7/21/15.
 */



var gulp       = require("gulp");

var livereload = require('gulp-livereload');

var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');

var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var uglifyJS = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');

var ngTemplateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inject = require('gulp-inject');




// 前端文件的路径
var paths = {
    base: 'core/public/',
    client: {
        js : ['core/public/angulardemo/src/js/**/*.js'],
        //js2 : ['public/angulardemo/src/js/**/*.js', 'public/angularslide/js/**/*.js'],
        sass : ['core/public/angulardemo/src/css/sass/**/*.scss'],
        css : ['core/public/angulardemo/src/css/stylesheets/*.css'],
        dist : 'core/public/angulardemo/dist'
    },
    server: {
        viewsTpl : 'views/angulardemo/**'
    }
};



// Compass 文件的路径
var compassConfig = {
    css : 'core/public/angulardemo/src/css/stylesheets',
    sass : 'core/public/angulardemo/src/css/sass',
    image : 'core/public/angulardemo/src/css/images',
    style : 'expanded',  //The output style for the compiled css. One of: nested, expanded, compact, or compressed.
    comments : false
};


/********************  监视Sass文件变化 生成CSS样式文件  ********************/
gulp.task('compassAngularDemo', function() {

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
gulp.task('minifycssAngularDemo', function() {

    return gulp.src(paths.client.css)
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.client.dist));
    // .pipe(livereload());
});









/********************  监视JS文件的变化 并用jshint 检查语法 注: jshint 可能会伤害你的感情  ********************/
gulp.task('jshintAngularDemo',function(){
    return gulp.src(paths.client.js)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});


/********************  监视JS文件的变化 Minify JavaScript with UglifyJS2  ********************/
gulp.task('minifyjsAngularDemo', ['jshintAngularDemo'], function(){
    gulp.src(paths.client.js)
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest(paths.client.dist));
});





/********************  当客户端被监听的文件改变时，刷新浏览器  ********************/
gulp.task('watchAngularDemo', function() {
    //  livereload.listen();
     gulp.watch(paths.client.js, ['minifyjsAngularDemo']);
     gulp.watch(paths.client.sass, ['compassAngularDemo']);
     gulp.watch(paths.client.css, ['minifycssAngularDemo']);
});
