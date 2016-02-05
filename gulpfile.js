
'use strict';

//gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browsersync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minimist = require('minimist');

gulp.task('bundle', function() {
  browserify({
    entries: ['./src/main.jsx'],
    extensions: ['.jsx', '.es6'],
    debug: true
  }).transform(babelify, {
    presets: ['es2015', 'react', 'stage-2'],
    extensions: ['.jsx', '.es6']
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: ['./dist/']
    },
    open: false
  });
});

gulp.task('default', ['server', 'bundle'], function() {
  gulp.watch('./src/**/*.jsx', ['bundle']);
  gulp.watch('./dist/**/*', function() {
    browsersync.reload();
  });
  console.log(process.env.NODE_ENV);
});

