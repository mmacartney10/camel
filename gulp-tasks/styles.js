var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

module.exports = function(gulp, paths) {
  gulp.task('styles', function () {
    gulp.src(paths.src + paths.styles + '/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.dest + paths.styles));
  });
};
