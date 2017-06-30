'use strict';

const
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso'),
  uglify = require('gulp-uglify');
  
gulp.task('indexCss', () => {
  gulp.src('src/index/index.css')
    .pipe(csso())
    .pipe(gulp.dest('public/index/'))
});

gulp.task('anwserCss', () => {
  gulp.src('src/anwser/anwser.css')
    .pipe(csso())
    .pipe(gulp.dest('public/anwser/'));
});

gulp.task('anwserAgainCss', () => {
  gulp.src('src/anwserAgain/anwserAgain.css')
    .pipe(csso())
    .pipe(gulp.dest('public/anwserAgain/'));
});

gulp.task('adminCss', () => {
  gulp.src('src/admin/admin.css')
    .pipe(csso())
    .pipe(gulp.dest('public/admin/'));
});

gulp.task('anwserJS', () => {
  gulp.src([
    'src/vendor/fetch.js',
    'src/anwser/anwser.js'
  ])
  .pipe(concat('anwser.js'))
  .pipe(gulp.dest('public/anwser/'));
});

gulp.task('anwserAgainJS', () => {
  gulp.src([
    'src/vendor/fetch.js',
    'src/anwserAgain/anwserAgain.js'
  ])
  .pipe(concat('anwserAgain.js'))
  .pipe(gulp.dest('public/anwserAgain/'));
});

gulp.task('watch', function() {
    gulp.watch('src/index/*.css', ['indexCss']);
    gulp.watch('src/anwser/*.css', ['anwserCss']);
    gulp.watch('src/anwserAgain/*.css', ['anwserAgainCss']);
    gulp.watch('src/admin/*.css', ['adminCss']);
    
    gulp.watch('src/anwser/*.js', ['anwserJS']);
    gulp.watch('src/anwserAgain/*.js', ['anwserAgainJS']);
});

gulp.task('default', ['indexCss', 'anwserCss', 'anwserAgainCss', 'adminCss', 'anwserJS', 'anwserAgainJS', 'watch']);
