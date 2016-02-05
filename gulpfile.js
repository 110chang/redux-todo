
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

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' } // NODE_ENVに指定がなければ開発モードをデフォルトにする
};

// コマンドラインの入力を解析
var options = minimist(process.argv.slice(2), knownOptions);
var isProduction = (options.env === 'production') ? true : false;

//console.log('[build env]', options.env, '[is production]', isProduction);

gulp.task('bundle', function() {
  var b = browserify({
    entries: ['./src/main.jsx'],
    extensions: ['.jsx', '.es6'],
    debug: true//!isProduction
  }).transform(babelify, {
    presets: ['es2015', 'react', 'stage-2'],
    extensions: ['.jsx', '.es6']
  })

  if (isProduction) {
    b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
      .pipe(browsersync.stream());
  } else {
    b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(browsersync.stream());
  }
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
});

