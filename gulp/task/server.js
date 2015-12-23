/**
 * Created by jinwyp on 7/21/15.
 */


var gulp =    require("gulp");
var nodemon = require('gulp-nodemon');





// nodemon 的配置
var nodemonConfig = {
    script : 'app/bin/www',
    ext: 'js json',
    ignore : [
        "app/tmp/**",
        "app/public/**",
        "app/views/**",
        ".git",
        "node_modules/**"
    ],
    // nodeArgs: ['--debug'],
    env    : {
        "NODE_ENV": "development",
        "DEBUG": "app:*"
    }
};




/********************  使用nodemon 自动重启服务器  ********************/
gulp.task('nodemon', function() {
    return nodemon(nodemonConfig);
});
