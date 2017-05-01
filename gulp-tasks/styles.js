const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');
const gsgc = require('gulp-sass-generate-contents');

module.exports = function(gulp, config) {

  gulp.task('gulp-sass-generate-contents', function () {
    return gulp.src(config.itcss)
    .pipe(gsgc(config.src + config.styles + 'main.scss'), {forceComments: false })
    .pipe(gulp.dest(config.src + config.styles));
  });

  gulp.task('sass', function () {
    return gulp.src(config.src + config.styles + 'main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cssmin())
      .pipe(gulp.dest(config.dest));
  });

  gulp.task('styles', gulp.series('gulp-sass-generate-contents', 'sass'));
};
