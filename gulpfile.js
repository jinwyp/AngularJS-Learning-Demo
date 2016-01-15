/**
 * Created by jinwyp on 5/19/15.
 */

 /**
   gulpfile.js
   ===========
   Rather than manage one giant configuration file responsible
   for creating multiple tasks, each task has been broken out into
   its own file in gulpfile.js/tasks. Any files in that directory get
   automatically required below.
   To add a new task, simply add a new task file that directory.
   gulpfile.js/tasks/default.js specifies the default set of tasks to run
   when you run `gulp`.
 */




var gulp       = require("gulp");
var requireDir = require('require-dir');
var env        = process.env.NODE_ENV || 'development';

 // Require all tasks in gulp/tasks, including subfolders
 requireDir('./gulp/task', { recurse: true });







// The default task (called when you run `gulp` from cli)
//
gulp.task('default', ['minifyjs', 'watch', 'compass', 'nodemon' ]);
