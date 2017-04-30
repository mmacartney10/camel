var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, paths) {
  gulp.task('scripts:vendor', function() {
    gulp.src(paths.src + paths.scripts + '/vendor/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dest + paths.scripts))
  });

  gulp.task('scripts:common', function() {
    gulp.src(paths.src + paths.scripts + '/common/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('common.bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dest + paths.scripts))
  });

  gulp.task('scripts', ['scripts:vendor', 'scripts:common']);
};
