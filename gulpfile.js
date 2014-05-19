var gulp = require('gulp');
var less = require('gulp-less');
var jekyll = require('gulp-jekyll');
var serve = require('gulp-serve');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

gulp.task('compile LESS', function() {  
  gulp.src(['css/styles.less'])
    .pipe( less() )
    .pipe( prefix() )
    .pipe( gulp.dest('css/') );
});

gulp.task('jekyll', function() {
  require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'});
});

gulp.task('dev server', serve('_site'));

gulp.task('default', ['compile LESS', 'jekyll', 'dev server'], function(){
  gulp.watch('css/*.less', ['compile LESS']);
  gulp.watch([
    '*.html', 
    '_layouts/*', 
    '_posts/*',
    'css/*.css'
  ], ['jekyll'] );
});