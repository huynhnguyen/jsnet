/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    concat = require('gulp-concat');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('test', function() {
  return gulp.src('test/NetSpec.js')
    .pipe(jasmine());
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['src/js/**/*.js','src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// copy html files
gulp.task('copy-html', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// concat js scripts
gulp.task('copy-script', function() {
  gulp.src(['src/js/**/*.js','src/js/*.js'])
  	.pipe(concat())
  	.pipe(gulp.dest('dist/js/jsnet.js'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(['src/js/**/*.js','src/js/*.js','src/*.html'], 
  		['jshint','test','copy-html','copy-script']);
});
